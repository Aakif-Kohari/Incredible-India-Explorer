import { describe, it, expect, beforeEach } from 'vitest';
import { CrowdDensityEngine } from '../../js-modules/crowd-density-engine.js';

const destinations = [
  { id: 'agra', name: 'Taj Mahal, Agra', state: 'Uttar Pradesh', popularity: 10, siteType: 'monument', peakMonths: [10, 11, 12, 1, 2, 3] },
  { id: 'jaipur', name: 'Amber Fort, Jaipur', state: 'Rajasthan', popularity: 9, siteType: 'monument', peakMonths: [10, 11, 12, 1, 2, 3] },
  { id: 'goa', name: 'Baga Beach, Goa', state: 'Goa', popularity: 9, siteType: 'beach', peakMonths: [11, 12, 1] }
];

const holidays = [
  { name: 'Diwali', date: '2026-11-08', scope: 'national', impact: 1.0 },
  { name: 'Ganesh Chaturthi', date: '2026-09-14', scope: 'regional', states: ['Maharashtra'], impact: 1.0 }
];

const nearbyAlternatives = {
  agra: [{ id: 'jaipur', distanceKm: 240 }]
};

function buildEngine() {
  return new CrowdDensityEngine({ destinations, holidays, nearbyAlternatives });
}

describe('CrowdDensityEngine.predictCrowdLevel', () => {
  let engine;
  beforeEach(() => {
    engine = buildEngine();
  });

  it('returns null for an unknown destination', () => {
    expect(engine.predictCrowdLevel('atlantis', '2026-07-27')).toBeNull();
  });

  it('returns null for an invalid date', () => {
    expect(engine.predictCrowdLevel('agra', 'not-a-date')).toBeNull();
  });

  it('scores a weekday in the off-season lower than a weekend holiday in-season', () => {
    // 2026-11-08 is a Sunday and Diwali, and November is in Agra's peak season.
    const highDay = engine.predictCrowdLevel('agra', '2026-11-08');
    // 2026-07-14 is a Tuesday with no holiday, and July is outside Agra's peak season.
    const lowDay = engine.predictCrowdLevel('agra', '2026-07-14');
    expect(highDay.score).toBeGreaterThan(lowDay.score);
    expect(highDay.level.key).toBe('high');
    expect(lowDay.level.key).not.toBe('high');
  });

  it('applies regional holidays only within the matching state', () => {
    const maharashtraDest = [{ id: 'mumbai', name: 'Gateway of India', state: 'Maharashtra', popularity: 8, siteType: 'monument', peakMonths: [] }];
    const localEngine = new CrowdDensityEngine({ destinations: [...destinations, ...maharashtraDest], holidays, nearbyAlternatives });
    const affected = localEngine.predictCrowdLevel('mumbai', '2026-09-14');
    const unaffected = localEngine.predictCrowdLevel('agra', '2026-09-14'); // Monday, not in UP
    expect(affected.factors.holiday).toBeGreaterThan(0);
    expect(unaffected.factors.holiday).toBe(0);
  });

  it('keeps the score within 0-100 bounds', () => {
    const result = engine.predictCrowdLevel('agra', '2026-11-08', { weather: { condition: 'clear' } });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('applies a negative weather factor for rain', () => {
    const clear = engine.predictCrowdLevel('agra', '2026-07-14', { weather: { condition: 'clear' } });
    const rain = engine.predictCrowdLevel('agra', '2026-07-14', { weather: { condition: 'rain' } });
    expect(rain.score).toBeLessThan(clear.score);
  });
});

describe('CrowdDensityEngine.levelForScore', () => {
  it('classifies scores into low/moderate/high buckets', () => {
    expect(CrowdDensityEngine.levelForScore(10).key).toBe('low');
    expect(CrowdDensityEngine.levelForScore(50).key).toBe('moderate');
    expect(CrowdDensityEngine.levelForScore(90).key).toBe('high');
  });
});

describe('CrowdDensityEngine.getBestVisitingHours', () => {
  it('returns quiet hours sorted chronologically and the busiest hour', () => {
    const engine = buildEngine();
    const result = engine.getBestVisitingHours('agra', '2026-07-14', { limit: 3 });
    expect(result.recommendedHours).toHaveLength(3);
    const hourValues = result.recommendedHours.map((h) => h.hour);
    expect(hourValues).toEqual([...hourValues].sort((a, b) => a - b));
    expect(result.busiestHour.relativeCrowd).toBe(100);
  });

  it('returns null for an unknown destination', () => {
    const engine = buildEngine();
    expect(engine.getBestVisitingHours('atlantis', '2026-07-14')).toBeNull();
  });
});

describe('CrowdDensityEngine.getForecast', () => {
  it('builds a forecast of the requested length', () => {
    const engine = buildEngine();
    const forecast = engine.getForecast('agra', '2026-07-13', 5);
    expect(forecast).toHaveLength(5);
    expect(forecast[0].date).toBe('2026-07-13');
    expect(forecast[4].date).toBe('2026-07-17');
  });
});

describe('CrowdDensityEngine.suggestAlternatives', () => {
  it('only suggests alternatives predicted less crowded than the primary destination', () => {
    const engine = buildEngine();
    const alternatives = engine.suggestAlternatives('agra', '2026-11-08');
    for (const alt of alternatives) {
      expect(alt.prediction.score).toBeLessThan(engine.predictCrowdLevel('agra', '2026-11-08').score);
    }
  });

  it('returns an empty array when there are no configured alternatives', () => {
    const engine = buildEngine();
    expect(engine.suggestAlternatives('goa', '2026-11-08')).toEqual([]);
  });
});

describe('CrowdDensityEngine.optimizeItinerary', () => {
  it('leaves non-high stops untouched', () => {
    const engine = buildEngine();
    const result = engine.optimizeItinerary([{ destinationId: 'agra', date: '2026-07-14' }]);
    expect(result[0].suggestion).toBeNull();
  });

  it('suggests a lower-scoring nearby date for a predicted-high stop', () => {
    const engine = buildEngine();
    const result = engine.optimizeItinerary([{ destinationId: 'agra', date: '2026-11-08' }], { flexibilityDays: 2 });
    expect(result[0].prediction.level.key).toBe('high');
    if (result[0].suggestion) {
      expect(result[0].suggestion.predictedScore).toBeLessThan(result[0].prediction.score);
    }
  });
});

describe('CrowdDensityEngine feedback', () => {
  it('nudges future predictions toward reported actual crowd levels', () => {
    const engine = buildEngine();
    const before = engine.predictCrowdLevel('agra', '2026-07-14').score;
    engine.recordFeedback('agra', before, before + 20);
    const after = engine.predictCrowdLevel('agra', '2026-07-14').score;
    expect(after).toBeGreaterThan(before);
  });

  it('clamps the adjustment to +/-15', () => {
    const engine = buildEngine();
    for (let i = 0; i < 20; i++) {
      engine.recordFeedback('agra', 0, 100, { weight: 1 });
    }
    expect(engine.getFeedbackAdjustment('agra')).toBeLessThanOrEqual(15);
  });

  it('restores persisted adjustments via loadFeedbackAdjustments', () => {
    const engine = buildEngine();
    engine.loadFeedbackAdjustments({ agra: 12 });
    expect(engine.getFeedbackAdjustment('agra')).toBe(12);
  });
});
