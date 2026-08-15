// seasonal-recommend-engine.js
// -----------------------------------------------------------------------------
// AI-powered (rule-based) Dynamic Seasonal Travel Recommendation Engine.
// Implements issue #773: month-aware, weather-aware, festival-aware
// destination ranking on top of the existing preference engine
// (js-modules/travel/travel-recommend.js, issue #185) and the curated
// festival dataset (js-modules/event-data.js, issue #? Smart Event Discovery).
//
// Design goals (see docs/SEASONAL_RECOMMENDATION_ENGINE.md for the full
// write-up of the architecture and ranking methodology):
//   - No backend / no paid weather API required, consistent with the rest
//     of this project (see weather-service.js's Open-Meteo note, and
//     event-recommendation-engine.js's month-window festival model).
//   - Pure functions only, no DOM/localStorage access, so the ranking
//     logic can be unit tested directly in Node (see
//     tests/unit/seasonal-recommend-engine.test.js).
//   - Reuses TRAVEL_DESTINATIONS (travel-recommend-data.js) and
//     eventData.events (event-data.js) rather than introducing a third,
//     divergent dataset.
//
// Ranking methodology, in short:
//   1. Each calendar month maps to a canonical Indian travel season
//      (winter / summer / monsoon) via MONTH_SEASON.
//   2. A destination's fit for that season starts from its curated
//      `seasons` tag (already used by the existing preference engine),
//      then gets adjusted by a small set of category risk rules (e.g.
//      beach/island destinations are downgraded in the monsoon even if
//      not explicitly tagged, since cyclone/rough-sea risk is a
//      well-known seasonal hazard) to produce a 0-3 "climate fit" score
//      and a human label (Peak / Good / Off-season / Avoid).
//   3. Festivals from event-data.js whose recurring month window covers
//      the requested month, and whose state falls within the
//      destination's region, are attached as a bonus + surfaced in the
//      explanation.
//   4. Interest/budget preference scoring is layered on top (same
//      weighting spirit as travel-recommend.js) so results stay
//      personalized, not just seasonal.
//   5. Destinations scored "Avoid" are excluded from the primary list and
//      offered as candidates for `getAlternatives()` instead, matched by
//      shared interest tags against destinations that score well that
//      month.
// -----------------------------------------------------------------------------

(function (root) {
  'use strict';

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Canonical Indian travel season per calendar month (1-12).
  // winter: Nov-Feb, summer: Mar-Jun, monsoon: Jul-Sep, post-monsoon eases
  // back toward winter in Oct (treated as winter-adjacent/"any").
  const MONTH_SEASON = {
    1: 'winter', 2: 'winter', 3: 'summer', 4: 'summer', 5: 'summer',
    6: 'summer', 7: 'monsoon', 8: 'monsoon', 9: 'monsoon',
    10: 'winter', 11: 'winter', 12: 'winter'
  };

  // Region -> states, used to loosely associate a destination with the
  // festivals in event-data.js that are relevant to it. This is an
  // approximation (regions span multiple states) consistent with the
  // month-window approximation event-recommendation-engine.js already
  // uses for festival dates.
  const REGION_STATES = {
    north: ['Ladakh', 'Punjab', 'Delhi', 'Uttar Pradesh', 'Madhya Pradesh'],
    west: ['Rajasthan', 'Gujarat', 'Goa', 'Maharashtra'],
    south: ['Tamil Nadu', 'Kerala', 'Telangana', 'Karnataka'],
    east: ['West Bengal', 'Odisha', 'Bihar'],
    northeast: ['Assam', 'Nagaland', 'Meghalaya', 'Sikkim'],
    islands: ['Andaman and Nicobar Islands', 'Lakshadweep']
  };

  // Category risk rules: tags that should be downgraded when the
  // requested month falls in a given canonical season, unless the
  // destination is explicitly tagged for that season already.
  // severity: how many points to subtract from the base climate score.
  const RISK_RULES = [
    {
      season: 'monsoon',
      tags: ['beaches', 'islands'],
      severity: 3,
      note: 'Coastal areas can see heavy rain, rough seas, and cyclone risk during the monsoon.'
    },
    {
      season: 'monsoon',
      tags: ['wildlife'],
      severity: 3,
      note: 'Many national parks and tiger reserves close or restrict safaris during the monsoon breeding season.'
    },
    {
      season: 'monsoon',
      tags: ['desert'],
      severity: 1,
      note: 'Desert regions are less scenic and roads can be affected by intermittent monsoon showers.'
    },
    {
      season: 'summer',
      tags: ['desert'],
      severity: 2,
      note: 'Daytime temperatures can be extreme, making outdoor sightseeing difficult.'
    }
  ];

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function monthSeason(month) {
    return MONTH_SEASON[month] || 'winter';
  }

  /**
   * Computes a 0-3 "climate fit" score + label + note for a destination in
   * a given month. Pure function.
   */
  function computeMonthScore(dest, month) {
    const season = monthSeason(month);
    const seasons = dest.seasons || [];
    let score = seasons.includes('year-round') ? 2 : (seasons.includes(season) ? 3 : 1);
    let note = seasons.includes(season)
      ? `${dest.name} is in its recommended ${season} window.`
      : `${month >= 1 ? MONTH_NAMES[month - 1] : ''} falls outside ${dest.name}'s typical best season.`;

    RISK_RULES.forEach((rule) => {
      if (rule.season !== season) return;
      if (seasons.includes(season)) return; // explicit season tag overrides the generic risk rule
      const hasRiskyTag = (dest.tags || []).some((t) => rule.tags.includes(t));
      if (!hasRiskyTag) return;
      if (score - rule.severity < score) {
        score -= rule.severity;
        note = rule.note;
      }
    });

    score = clamp(Math.round(score), 0, 3);

    const label = score >= 3 ? 'Peak season'
      : score === 2 ? 'Good time to visit'
      : score === 1 ? 'Off-season \u2014 possible but less ideal'
      : 'Avoid \u2014 unfavorable conditions expected';

    return { score, label, note };
  }

  /** Festivals (from event-data.js's `events` array) relevant to a destination in a given month. */
  function getFestivalsForDestination(dest, month, events) {
    const states = REGION_STATES[dest.region] || [];
    if (!states.length || !Array.isArray(events)) return [];
    return events.filter((e) => {
      if (!states.includes(e.state)) return false;
      return monthInRange(month, e.startMonth, e.endMonth);
    });
  }

  /** True if `month` (1-12) falls within a possibly year-wrapping [start, end] range. */
  function monthInRange(month, start, end) {
    if (typeof start !== 'number' || typeof end !== 'number') return false;
    if (start <= end) return month >= start && month <= end;
    return month >= start || month <= end; // wraps across year-end, e.g. Nov-Feb
  }

  /** Interest + budget preference score, independent of season (season is scored separately). */
  function scorePreferences(dest, prefs) {
    let score = 0;
    const matched = [];
    (prefs.interests || []).forEach((tag) => {
      if ((dest.tags || []).includes(tag)) {
        score += 2;
        matched.push(tag);
      }
    });
    if (prefs.budget && prefs.budget !== 'any' && dest.budget === prefs.budget) {
      score += 1;
    }
    return { score, matched };
  }

  /**
   * Ranks destinations for a specific travel month, blending seasonal
   * climate fit, festival bonus, and interest/budget preferences.
   * Destinations scored "Avoid" for the month are excluded from the
   * primary list (see getAlternatives to still surface options for them).
   *
   * @param {Array} destinations  TRAVEL_DESTINATIONS-shaped array
   * @param {number} month        1-12
   * @param {Object} [prefs]      { interests: string[], budget: string }
   * @param {Array} [events]      eventData.events-shaped array
   * @param {Object} [opts]       { limit }
   */
  function rankDestinationsForMonth(destinations, month, prefs, events, opts) {
    prefs = prefs || {};
    opts = opts || {};
    const limit = opts.limit || 8;

    const scored = destinations.map((dest) => {
      const climate = computeMonthScore(dest, month);
      const festivals = getFestivalsForDestination(dest, month, events);
      const pref = scorePreferences(dest, prefs);
      const total = climate.score * 2 + pref.score + (festivals.length ? 1.5 : 0);
      return { dest, climate, festivals, matchedInterests: pref.matched, total };
    });

    return scored
      .filter((entry) => entry.climate.score > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
  }

  /**
   * Suggests alternative destinations for a place that scores poorly in
   * the requested month, matched by shared interest tags among
   * destinations that score well (>=2) that month.
   */
  function getAlternatives(dest, destinations, month, limit) {
    const shareTags = new Set(dest.tags || []);
    return destinations
      .filter((d) => d.id !== dest.id)
      .map((d) => {
        const overlap = (d.tags || []).filter((t) => shareTags.has(t)).length;
        const climate = computeMonthScore(d, month);
        return { dest: d, overlap, climate };
      })
      .filter((x) => x.overlap > 0 && x.climate.score >= 2)
      .sort((a, b) => (b.overlap - a.overlap) || (b.climate.score - a.climate.score))
      .slice(0, limit || 3)
      .map((x) => x.dest);
  }

  /** Human-readable "why this was recommended" sentence for a ranked entry. */
  function buildSeasonalReason(entry) {
    const parts = [entry.climate.note];
    if (entry.festivals.length) {
      const names = entry.festivals.map((f) => f.name);
      const list = names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0];
      parts.push(`${list} also fall${names.length === 1 ? 's' : ''} in this window.`);
    }
    if (entry.matchedInterests.length) {
      parts.push(`Matches your interest in ${entry.matchedInterests.join(', ')}.`);
    }
    return parts.join(' ');
  }

  /**
   * Seasonal travel insights dashboard summary for a given month: how many
   * destinations are at their peak / off-season / to be avoided, plus the
   * festivals happening that month across all regions (deduped).
   */
  function getSeasonalInsights(destinations, month, events) {
    let peak = 0, good = 0, off = 0, avoid = 0;
    destinations.forEach((d) => {
      const s = computeMonthScore(d, month).score;
      if (s === 3) peak++;
      else if (s === 2) good++;
      else if (s === 1) off++;
      else avoid++;
    });

    const festivalMap = new Map();
    (events || []).forEach((e) => {
      if (monthInRange(month, e.startMonth, e.endMonth) && !festivalMap.has(e.id)) {
        festivalMap.set(e.id, e);
      }
    });
    const festivals = Array.from(festivalMap.values()).sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    return {
      month,
      monthName: MONTH_NAMES[month - 1],
      peakCount: peak,
      goodCount: good,
      offSeasonCount: off,
      avoidCount: avoid,
      totalDestinations: destinations.length,
      festivals
    };
  }

  const engine = {
    MONTH_NAMES,
    MONTH_SEASON,
    REGION_STATES,
    monthSeason,
    monthInRange,
    computeMonthScore,
    getFestivalsForDestination,
    scorePreferences,
    rankDestinationsForMonth,
    getAlternatives,
    buildSeasonalReason,
    getSeasonalInsights
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = engine;
  }
  if (typeof window !== 'undefined') {
    window.SeasonalRecommendEngine = engine;
  }
})(typeof window !== 'undefined' ? window : globalThis);
