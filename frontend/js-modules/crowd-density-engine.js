/**
 * js-modules/crowd-density-engine.js
 *
 * Pure, DOM-free logic for the Real-Time Crowd Density Prediction & Smart
 * Visit Scheduling feature. Consumes destination/holiday/alternative
 * records shaped like js-modules/crowd-density-data.js and:
 *  - predicts a 0-100 crowd score + Low/Moderate/High level for a
 *    destination on a given date, blending day-of-week, holiday
 *    proximity, seasonality, and (optionally) a weather forecast
 *  - recommends the least-crowded visiting hours for that day
 *  - builds a multi-day forecast for trend visualization
 *  - suggests nearby, currently-less-crowded alternative attractions
 *  - optimizes a multi-stop itinerary by re-ordering/re-dating stops
 *    within a flexibility window to avoid predicted peak days
 *  - incorporates simple user feedback to nudge future predictions
 *    (bounded exponential moving average, no ML training required)
 *
 * Kept DOM/localStorage/network-free so it can be unit tested directly
 * (see tests/unit/crowd-density-engine.test.js). The service layer
 * (js-modules/crowd-density-service.js) is responsible for supplying the
 * curated dataset, fetching live weather, persisting feedback, and
 * refreshing predictions on an interval.
 *
 * Note on precision: like trip-data.js/event-data.js, this is a
 * rule-based estimator, not a trained ML model or a live sensor feed —
 * see docs/CROWD_DENSITY_PREDICTION.md for the full methodology and its
 * limitations.
 */

const LEVELS = [
  { key: "low", label: "Low", emoji: "🟢", max: 35 },
  { key: "moderate", label: "Moderate", emoji: "🟡", max: 65 },
  { key: "high", label: "High", emoji: "🔴", max: Infinity }
];

/** Default relative hourly crowd shape (0-1) by site type, 24 values for hours 0-23. */
const HOURLY_PATTERNS = {
  monument: [0.05, 0.03, 0.02, 0.02, 0.03, 0.08, 0.2, 0.4, 0.6, 0.8, 0.95, 1, 0.95, 0.85, 0.75, 0.65, 0.55, 0.4, 0.25, 0.15, 0.1, 0.07, 0.05, 0.05],
  spiritual: [0.15, 0.08, 0.05, 0.05, 0.3, 0.7, 0.9, 0.7, 0.5, 0.4, 0.4, 0.45, 0.5, 0.45, 0.4, 0.45, 0.55, 0.75, 1, 0.9, 0.6, 0.35, 0.2, 0.15],
  hillstation: [0.05, 0.03, 0.02, 0.02, 0.03, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95, 1, 0.95, 0.9, 0.85, 0.8, 0.7, 0.55, 0.35, 0.2, 0.1, 0.07, 0.05],
  beach: [0.05, 0.03, 0.02, 0.02, 0.02, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.7, 0.85, 1, 0.95, 0.8, 0.6, 0.35, 0.2, 0.1, 0.07],
  wildlife: [0.1, 0.05, 0.03, 0.05, 0.4, 0.9, 1, 0.85, 0.55, 0.3, 0.2, 0.15, 0.1, 0.1, 0.15, 0.3, 0.6, 0.85, 0.7, 0.3, 0.15, 0.1, 0.08, 0.08]
};
const DEFAULT_PATTERN_KEY = "monument";

function toDate(value) {
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function isoDate(date) {
  const d = toDate(date);
  if (!d) return null;
  return d.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const MS_PER_DAY = 86400000;
  return Math.round((new Date(toDate(a)).setHours(0, 0, 0, 0) - new Date(toDate(b)).setHours(0, 0, 0, 0)) / MS_PER_DAY);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export class CrowdDensityEngine {
  /**
   * @param {Object} [options]
   * @param {Array} [options.destinations] Records shaped like crowd-density-data.js's crowdDestinations.
   * @param {Array} [options.holidays] Records shaped like crowd-density-data.js's holidays2026.
   * @param {Object} [options.nearbyAlternatives] Map of destinationId -> [{id, distanceKm}].
   */
  constructor(options = {}) {
    this.destinations = options.destinations || [];
    this.holidays = options.holidays || [];
    this.nearbyAlternatives = options.nearbyAlternatives || {};
    this.destinationsById = new Map(this.destinations.map((d) => [d.id, d]));
    // destinationId -> running feedback adjustment in [-15, 15], nudges the base score.
    this.feedbackAdjustments = new Map();
  }

  static get LEVELS() {
    return LEVELS.slice();
  }

  getDestination(destinationId) {
    return this.destinationsById.get(destinationId) || null;
  }

  /** Maps a 0-100 score to a {key,label,emoji} level descriptor. */
  static levelForScore(score) {
    return LEVELS.find((l) => score <= l.max) || LEVELS[LEVELS.length - 1];
  }

  // --------------------------------------------------------------------
  // Scoring factors
  // --------------------------------------------------------------------

  /** Weekend (Sat/Sun) contribute more footfall than weekdays. */
  dayOfWeekFactor(date) {
    const day = toDate(date).getDay(); // 0=Sun..6=Sat
    return day === 0 || day === 6 ? 25 : 0;
  }

  /**
   * Holidays raise the score based on scope/state match and proximity
   * (the holiday itself, plus a decaying effect on the 1-2 adjacent days
   * to model long-weekend travel). Returns the strongest match's contribution.
   */
  holidayFactor(date, state) {
    let best = 0;
    for (const holiday of this.holidays) {
      const holidayDate = toDate(holiday.date);
      if (!holidayDate) continue;
      if (holiday.scope === "regional" && (!holiday.states || !state || !holiday.states.includes(state))) continue;
      const offset = Math.abs(daysBetween(date, holidayDate));
      if (offset > 2) continue;
      const proximityDecay = offset === 0 ? 1 : offset === 1 ? 0.55 : 0.25;
      const contribution = 30 * (holiday.impact != null ? holiday.impact : 1) * proximityDecay;
      if (contribution > best) best = contribution;
    }
    return best;
  }

  /** In-season destinations run hotter; off-season attractions are quieter. */
  seasonFactor(date, peakMonths) {
    if (!peakMonths || peakMonths.length === 0) return 0;
    const month = toDate(date).getMonth() + 1;
    return peakMonths.includes(month) ? 15 : -10;
  }

  /**
   * Optional weather nudge. `weather` may be null (neutral) or
   * `{ condition: "clear"|"rain"|"extreme", tempC }` as produced by
   * crowd-density-service.js from WeatherService/weather-core.js output.
   */
  weatherFactor(weather) {
    if (!weather || !weather.condition) return 0;
    if (weather.condition === "rain" || weather.condition === "extreme") return -15;
    if (weather.condition === "clear") return 10;
    return 0;
  }

  /** Baseline "typical crowd magnitude" scaled from editorial popularity (1-10). */
  popularityFactor(popularity) {
    return clamp((popularity || 5) * 3, 0, 30);
  }

  // --------------------------------------------------------------------
  // Prediction
  // --------------------------------------------------------------------

  /**
   * Predicts crowd density for a destination on a given date.
   * @param {string} destinationId
   * @param {Date|string} date
   * @param {Object} [options]
   * @param {Object} [options.weather] See weatherFactor().
   * @returns {{destinationId:string,date:string,score:number,level:Object,factors:Object}|null}
   */
  predictCrowdLevel(destinationId, date, options = {}) {
    const destination = this.getDestination(destinationId);
    if (!destination || !toDate(date)) return null;

    const factors = {
      popularity: this.popularityFactor(destination.popularity),
      dayOfWeek: this.dayOfWeekFactor(date),
      holiday: this.holidayFactor(date, destination.state),
      season: this.seasonFactor(date, destination.peakMonths),
      weather: this.weatherFactor(options.weather),
      feedbackAdjustment: this.feedbackAdjustments.get(destinationId) || 0
    };

    const rawScore = Object.values(factors).reduce((sum, v) => sum + v, 0);
    const score = Math.round(clamp(rawScore, 0, 100));
    const level = CrowdDensityEngine.levelForScore(score);

    return { destinationId, date: isoDate(date), score, level, factors };
  }

  /**
   * Ranks each hour of the day by predicted crowd share and returns the
   * quietest hours (default 3) as visiting-time recommendations, plus the
   * single busiest hour to help users deliberately avoid it.
   */
  getBestVisitingHours(destinationId, date, options = {}) {
    const destination = this.getDestination(destinationId);
    if (!destination) return null;
    const limit = options.limit || 3;
    const pattern = HOURLY_PATTERNS[destination.siteType] || HOURLY_PATTERNS[DEFAULT_PATTERN_KEY];

    const hours = pattern.map((weight, hour) => ({ hour, weight }));
    const quietest = [...hours].sort((a, b) => a.weight - b.weight).slice(0, limit).sort((a, b) => a.hour - b.hour);
    const busiest = hours.reduce((max, h) => (h.weight > max.weight ? h : max), hours[0]);

    const formatHour = (h) => {
      const period = h < 12 ? "AM" : "PM";
      const display = h % 12 === 0 ? 12 : h % 12;
      return `${display}:00 ${period}`;
    };

    return {
      destinationId,
      date: isoDate(date),
      recommendedHours: quietest.map((h) => ({ hour: h.hour, label: formatHour(h.hour), relativeCrowd: Math.round(h.weight * 100) })),
      busiestHour: { hour: busiest.hour, label: formatHour(busiest.hour), relativeCrowd: Math.round(busiest.weight * 100) }
    };
  }

  /** Multi-day crowd forecast, e.g. for a trend chart or week-ahead planning. */
  getForecast(destinationId, startDate, days = 7, weatherByDate = {}) {
    const start = toDate(startDate);
    if (!start) return [];
    const results = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setUTCDate(d.getUTCDate() + i);
      const key = isoDate(d);
      const prediction = this.predictCrowdLevel(destinationId, d, { weather: weatherByDate[key] });
      if (prediction) results.push(prediction);
    }
    return results;
  }

  // --------------------------------------------------------------------
  // Alternatives
  // --------------------------------------------------------------------

  /**
   * Suggests nearby alternative attractions that are predicted to be
   * less crowded than `destinationId` on the same date, nearest-first
   * among ties, sorted by predicted score ascending otherwise.
   */
  suggestAlternatives(destinationId, date, options = {}) {
    const limit = options.limit || 3;
    const primary = this.predictCrowdLevel(destinationId, date, options);
    const candidates = this.nearbyAlternatives[destinationId] || [];
    if (!primary || candidates.length === 0) return [];

    const scored = candidates
      .map((candidate) => ({
        candidate,
        prediction: this.predictCrowdLevel(candidate.id, date, options)
      }))
      .filter((entry) => entry.prediction && entry.prediction.score < primary.score);

    scored.sort((a, b) => a.prediction.score - b.prediction.score || a.candidate.distanceKm - b.candidate.distanceKm);

    return scored.slice(0, limit).map((entry) => ({
      destinationId: entry.candidate.id,
      name: (this.getDestination(entry.candidate.id) || {}).name || entry.candidate.id,
      distanceKm: entry.candidate.distanceKm,
      prediction: entry.prediction
    }));
  }

  // --------------------------------------------------------------------
  // Crowd-aware itinerary optimization
  // --------------------------------------------------------------------

  /**
   * Given an ordered itinerary of `{destinationId, date}` stops, flags any
   * stop predicted High and, within `flexibilityDays` (default 2) either
   * direction, proposes the lowest-scoring nearby date for that same stop.
   * Does not reorder stops relative to each other; only suggests
   * re-dating a specific stop.
   * @param {Array<{destinationId:string,date:string|Date}>} stops
   * @param {Object} [options]
   * @param {number} [options.flexibilityDays=2]
   */
  optimizeItinerary(stops, options = {}) {
    const flexibility = options.flexibilityDays != null ? options.flexibilityDays : 2;
    return (stops || []).map((stop) => {
      const current = this.predictCrowdLevel(stop.destinationId, stop.date, options);
      if (!current) return { ...stop, prediction: null, suggestion: null };

      if (current.level.key !== "high") {
        return { ...stop, prediction: current, suggestion: null };
      }

      let best = current;
      const baseDate = toDate(stop.date);
      for (let offset = -flexibility; offset <= flexibility; offset++) {
        if (offset === 0) continue;
        const candidateDate = new Date(baseDate);
        candidateDate.setDate(candidateDate.getDate() + offset);
        const candidate = this.predictCrowdLevel(stop.destinationId, candidateDate, options);
        if (candidate && candidate.score < best.score) best = candidate;
      }

      const suggestion =
        best.date !== current.date
          ? { suggestedDate: best.date, predictedScore: best.score, predictedLevel: best.level, scoreReduction: current.score - best.score }
          : null;

      return { ...stop, prediction: current, suggestion };
    });
  }

  // --------------------------------------------------------------------
  // Feedback (simple bounded EMA, persistence left to the service layer)
  // --------------------------------------------------------------------

  /**
   * Records that the actual observed crowd level differed from the
   * prediction, nudging future predictions for this destination.
   * `actualScore` and `predictedScore` are both 0-100. The adjustment is
   * clamped to +/-15 so a handful of outlier reports can't dominate.
   */
  recordFeedback(destinationId, predictedScore, actualScore, options = {}) {
    const weight = options.weight != null ? options.weight : 0.2;
    const previous = this.feedbackAdjustments.get(destinationId) || 0;
    const error = actualScore - predictedScore;
    const next = clamp(previous + error * weight, -15, 15);
    this.feedbackAdjustments.set(destinationId, next);
    return next;
  }

  getFeedbackAdjustment(destinationId) {
    return this.feedbackAdjustments.get(destinationId) || 0;
  }

  /** Restores previously-persisted adjustments (e.g. loaded from localStorage by the service layer). */
  loadFeedbackAdjustments(entries = {}) {
    for (const [destinationId, value] of Object.entries(entries)) {
      this.feedbackAdjustments.set(destinationId, clamp(value, -15, 15));
    }
  }
}

export const CROWD_ENGINE_INTERNALS = { HOURLY_PATTERNS, LEVELS, toDate, isoDate, daysBetween, clamp };
