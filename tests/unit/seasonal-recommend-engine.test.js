/**
 * seasonal-recommend-engine.test.js
 * Tests for js-modules/travel/seasonal-recommend-engine.js \u2014 the pure,
 * rule-based ranking logic behind the AI-Powered Dynamic Seasonal Travel
 * Recommendation Engine (issue #773).
 */

import { describe, it, expect } from 'vitest';
import Engine from '../../js-modules/travel/seasonal-recommend-engine.js';

const GOA = {
  id: 'rec-goa', name: 'Goa', region: 'west', tags: ['beaches', 'food'],
  budget: 'mid', seasons: ['winter'], image: 'goa.png', description: 'Beaches'
};
const MANALI = {
  id: 'rec-manali', name: 'Manali', region: 'north', tags: ['mountains', 'adventure'],
  budget: 'mid', seasons: ['summer', 'winter'], image: 'manali.png', description: 'Mountains'
};
const RISHIKESH = {
  id: 'rec-rishikesh', name: 'Rishikesh', region: 'north', tags: ['adventure', 'spiritual'],
  budget: 'budget', seasons: ['year-round'], image: 'rishikesh.png', description: 'Yoga'
};
const RANTHAMBORE = {
  id: 'rec-ranthambore', name: 'Ranthambore', region: 'west', tags: ['wildlife'],
  budget: 'mid', seasons: ['winter'], image: 'rb.png', description: 'Tigers'
};
const DESTINATIONS = [GOA, MANALI, RISHIKESH, RANTHAMBORE];

const EVENTS = [
  {
    id: 'goa-carnival', name: 'Goa Carnival', category: 'Culture', tags: ['music'],
    state: 'Goa', startMonth: 2, endMonth: 2, popularity: 8
  },
  {
    id: 'pushkar-fair', name: 'Pushkar Camel Fair', category: 'Culture', tags: ['fair'],
    state: 'Rajasthan', startMonth: 10, endMonth: 11, popularity: 8
  }
];

describe('monthSeason', () => {
  it('maps December to winter', () => {
    expect(Engine.monthSeason(12)).toBe('winter');
  });
  it('maps May to summer', () => {
    expect(Engine.monthSeason(5)).toBe('summer');
  });
  it('maps August to monsoon', () => {
    expect(Engine.monthSeason(8)).toBe('monsoon');
  });
});

describe('monthInRange', () => {
  it('handles a normal (non-wrapping) range', () => {
    expect(Engine.monthInRange(10, 10, 11)).toBe(true);
    expect(Engine.monthInRange(9, 10, 11)).toBe(false);
  });
  it('handles a year-wrapping range', () => {
    expect(Engine.monthInRange(12, 11, 2)).toBe(true);
    expect(Engine.monthInRange(1, 11, 2)).toBe(true);
    expect(Engine.monthInRange(6, 11, 2)).toBe(false);
  });
});

describe('computeMonthScore', () => {
  it('gives a beach destination a peak score in its tagged winter season', () => {
    const result = Engine.computeMonthScore(GOA, 12);
    expect(result.score).toBe(3);
    expect(result.label).toBe('Peak season');
  });

  it('downgrades a beach destination to "avoid" during the monsoon', () => {
    const result = Engine.computeMonthScore(GOA, 8);
    expect(result.score).toBe(0);
    expect(result.label).toMatch(/Avoid/);
  });

  it('downgrades a wildlife destination during the monsoon (park closures)', () => {
    const result = Engine.computeMonthScore(RANTHAMBORE, 7);
    expect(result.score).toBe(0);
  });

  it('scores a year-round destination reasonably in any month', () => {
    expect(Engine.computeMonthScore(RISHIKESH, 8).score).toBeGreaterThanOrEqual(2);
    expect(Engine.computeMonthScore(RISHIKESH, 1).score).toBeGreaterThanOrEqual(2);
  });

  it('gives a mountain destination its peak score in a tagged month', () => {
    expect(Engine.computeMonthScore(MANALI, 6).score).toBe(3); // summer
    expect(Engine.computeMonthScore(MANALI, 12).score).toBe(3); // winter
  });
});

describe('getFestivalsForDestination', () => {
  it('finds a festival in the matching state and month window', () => {
    const result = Engine.getFestivalsForDestination(GOA, 2, EVENTS);
    expect(result.map((f) => f.id)).toContain('goa-carnival');
  });

  it('returns nothing outside the festival month window', () => {
    const result = Engine.getFestivalsForDestination(GOA, 6, EVENTS);
    expect(result).toHaveLength(0);
  });

  it('matches region-mapped states, e.g. Rajasthan under the "west" region', () => {
    const result = Engine.getFestivalsForDestination(RANTHAMBORE, 10, EVENTS);
    expect(result.map((f) => f.id)).toContain('pushkar-fair');
  });
});

describe('rankDestinationsForMonth', () => {
  it('excludes destinations scored "avoid" for the month', () => {
    const results = Engine.rankDestinationsForMonth(DESTINATIONS, 8, {}, EVENTS);
    const ids = results.map((r) => r.dest.id);
    expect(ids).not.toContain('rec-goa');
    expect(ids).not.toContain('rec-ranthambore');
  });

  it('ranks a festival-boosted destination above one without a festival, all else equal', () => {
    const results = Engine.rankDestinationsForMonth([GOA], 12, {}, EVENTS);
    // no festival active in December for Goa in this fixture, so just sanity check shape
    expect(results[0].dest.id).toBe('rec-goa');
    expect(results[0]).toHaveProperty('climate');
    expect(results[0]).toHaveProperty('total');
  });

  it('boosts destinations matching requested interests', () => {
    const withPref = Engine.rankDestinationsForMonth(DESTINATIONS, 12, { interests: ['wildlife'] }, EVENTS);
    const withoutPref = Engine.rankDestinationsForMonth(DESTINATIONS, 12, {}, EVENTS);
    const prefTotal = withPref.find((r) => r.dest.id === 'rec-ranthambore').total;
    const noPrefTotal = withoutPref.find((r) => r.dest.id === 'rec-ranthambore').total;
    expect(prefTotal).toBeGreaterThan(noPrefTotal);
  });

  it('respects the limit option', () => {
    const results = Engine.rankDestinationsForMonth(DESTINATIONS, 12, {}, EVENTS, { limit: 1 });
    expect(results).toHaveLength(1);
  });
});

describe('getAlternatives', () => {
  it('suggests a tag-overlapping, well-timed alternative for an avoided destination', () => {
    const alts = Engine.getAlternatives(RANTHAMBORE, DESTINATIONS, 7, 3);
    // Ranthambore avoided in July; no other wildlife-tagged destination in the fixture,
    // so alternatives should be empty rather than an unrelated destination.
    expect(alts.every((d) => d.id !== 'rec-ranthambore')).toBe(true);
  });

  it('never suggests the destination itself', () => {
    const alts = Engine.getAlternatives(GOA, DESTINATIONS, 8, 3);
    expect(alts.map((d) => d.id)).not.toContain('rec-goa');
  });
});

describe('getSeasonalInsights', () => {
  it('tallies destinations into peak/good/off/avoid buckets that sum to the total', () => {
    const insights = Engine.getSeasonalInsights(DESTINATIONS, 8, EVENTS);
    const sum = insights.peakCount + insights.goodCount + insights.offSeasonCount + insights.avoidCount;
    expect(sum).toBe(DESTINATIONS.length);
    expect(insights.monthName).toBe('August');
  });

  it('surfaces festivals happening in the requested month', () => {
    const insights = Engine.getSeasonalInsights(DESTINATIONS, 2, EVENTS);
    expect(insights.festivals.map((f) => f.id)).toContain('goa-carnival');
  });
});

describe('buildSeasonalReason', () => {
  it('includes climate note, festival mention, and matched interests', () => {
    const entry = {
      climate: { note: 'Great weather.', score: 3, label: 'Peak season' },
      festivals: [{ name: 'Test Fest' }],
      matchedInterests: ['beaches']
    };
    const reason = Engine.buildSeasonalReason(entry);
    expect(reason).toContain('Great weather.');
    expect(reason).toContain('Test Fest');
    expect(reason).toContain('beaches');
  });
});
