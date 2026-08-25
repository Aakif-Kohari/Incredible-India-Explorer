import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// transport-route-planner.js is a browser IIFE (window.TransportPlanner),
// not an ES module, so it's loaded and evaluated the same way the
// existing trip-planner.test.js loads js-modules/trip-planner.js.
const plannerCode = readFileSync(
  resolve(__dirname, '../../frontend/transport-route-planner/transport-route-planner.js'),
  'utf-8'
);
new Function(plannerCode)();
const TransportPlanner = globalThis.TransportPlanner;

const {
  CITIES,
  haversineKm,
  findCity,
  estimateLeg,
  generateRoutes,
  rankRoutes,
  getMockLiveStatus,
  formatDuration,
  formatCost
} = TransportPlanner;

describe('findCity', () => {
  it('finds a known city by id', () => {
    expect(findCity('delhi')).toBeTruthy();
    expect(findCity('delhi').name).toBe('Delhi');
  });

  it('returns null for an unknown city id', () => {
    expect(findCity('atlantis')).toBeNull();
  });
});

describe('haversineKm', () => {
  it('returns 0 for identical points', () => {
    const city = CITIES[0];
    expect(haversineKm(city, city)).toBeCloseTo(0, 5);
  });

  it('returns a plausible distance between Delhi and Agra (~180-240km)', () => {
    const delhi = findCity('delhi');
    const agra = findCity('agra');
    const km = haversineKm(delhi, agra);
    expect(km).toBeGreaterThan(150);
    expect(km).toBeLessThan(260);
  });
});

describe('estimateLeg', () => {
  it('returns null for walking distances beyond the walking cap', () => {
    expect(estimateLeg('walk', 50)).toBeNull();
  });

  it('returns null for train legs under the minimum distance', () => {
    expect(estimateLeg('train', 5)).toBeNull();
  });

  it('produces a sane leg estimate for a short bus ride', () => {
    const leg = estimateLeg('bus', 5);
    expect(leg).not.toBeNull();
    expect(leg.mode).toBe('bus');
    expect(leg.durationMin).toBeGreaterThan(0);
    expect(leg.cost).toBeGreaterThan(0);
  });

  it('walking legs have zero cost', () => {
    const leg = estimateLeg('walk', 1);
    expect(leg.cost).toBe(0);
  });
});

describe('generateRoutes', () => {
  it('throws for unknown city ids', () => {
    expect(() => generateRoutes('delhi', 'atlantis')).toThrow();
  });

  it('throws when origin and destination are the same', () => {
    expect(() => generateRoutes('delhi', 'delhi')).toThrow();
  });

  it('generates at least one route for a short in-city-scale hop', () => {
    // Two close cities won't exist in the dataset, but a long-distance
    // pair should still produce viable train/cab route options.
    const routes = generateRoutes('delhi', 'agra');
    expect(routes.length).toBeGreaterThan(0);
    routes.forEach((r) => {
      expect(r.totalDurationMin).toBeGreaterThan(0);
      expect(r.totalCost).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(r.legs)).toBe(true);
    });
  });

  it('does not include a pure walking route for long inter-city distances', () => {
    const routes = generateRoutes('delhi', 'mumbai');
    const walkOnly = routes.find((r) => r.id === 'walk-direct');
    expect(walkOnly).toBeUndefined();
  });
});

describe('rankRoutes', () => {
  const routes = generateRoutes('delhi', 'agra');

  it('returns an empty array for empty input', () => {
    expect(rankRoutes([], 'cost')).toEqual([]);
  });

  it('sorts routes best-first by descending score', () => {
    const ranked = rankRoutes(routes, 'balanced');
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].score).toBeGreaterThanOrEqual(ranked[i].score);
    }
  });

  it('ranks the cheapest route highest under the "cost" preference', () => {
    const ranked = rankRoutes(routes, 'cost');
    const cheapest = [...routes].sort((a, b) => a.totalCost - b.totalCost)[0];
    expect(ranked[0].totalCost).toBe(cheapest.totalCost);
  });

  it('ranks the fastest route highest under the "time" preference', () => {
    const ranked = rankRoutes(routes, 'time');
    const fastest = [...routes].sort((a, b) => a.totalDurationMin - b.totalDurationMin)[0];
    expect(ranked[0].totalDurationMin).toBe(fastest.totalDurationMin);
  });

  it('ranks the least-walking route highest under the "walking" preference', () => {
    const ranked = rankRoutes(routes, 'walking');
    const leastWalk = [...routes].sort((a, b) => a.totalWalkingKm - b.totalWalkingKm)[0];
    expect(ranked[0].totalWalkingKm).toBe(leastWalk.totalWalkingKm);
  });
});

describe('getMockLiveStatus', () => {
  it('returns a status object with a level and label', () => {
    const status = getMockLiveStatus('bus', Date.now());
    expect(status).toHaveProperty('level');
    expect(status).toHaveProperty('label');
    expect(status).toHaveProperty('delayMin');
  });

  it('is deterministic for the same mode and timestamp bucket', () => {
    const now = Date.now();
    expect(getMockLiveStatus('metro', now)).toEqual(getMockLiveStatus('metro', now));
  });
});

describe('formatDuration / formatCost', () => {
  it('formats minutes under an hour plainly', () => {
    expect(formatDuration(45)).toBe('45 min');
  });

  it('formats durations over an hour with hours and minutes', () => {
    expect(formatDuration(125)).toBe('2h 5m');
  });

  it('formats zero cost as Free', () => {
    expect(formatCost(0)).toBe('Free');
  });

  it('formats nonzero cost with the rupee symbol', () => {
    expect(formatCost(150)).toBe('₹150');
  });
});