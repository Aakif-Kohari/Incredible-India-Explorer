/**
 * ganges-scrollytelling.test.js
 * Unit tests for Scrollytelling: Journey of the Ganges.
 * Validates 6 narrative stops dataset integrity, source-to-sea elevation drop,
 * distance progression, active stop index calculation, and river stats.
 */

import { describe, it, expect } from 'vitest';
import {
  GANGES_STOPS,
  getActiveStopIndex,
  calculateRiverPathProgress,
  getGangesStats
} from '../../frontend/ganges-scrollytelling/ganges-scrollytelling.js';

describe('Ganges Scrollytelling Dataset Integrity', () => {
  it('contains at least 5 narrative stops along the river (contains 6)', () => {
    expect(GANGES_STOPS.length).toBeGreaterThanOrEqual(5);
    expect(GANGES_STOPS.length).toBe(6);
  });

  it('verifies source-to-sea elevation drop from 4,100m at origin down to 0m at delta', () => {
    expect(GANGES_STOPS[0].elevationMeters).toBe(4100);
    expect(GANGES_STOPS[GANGES_STOPS.length - 1].elevationMeters).toBe(0);

    for (let i = 0; i < GANGES_STOPS.length - 1; i++) {
      expect(GANGES_STOPS[i].elevationMeters).toBeGreaterThanOrEqual(GANGES_STOPS[i + 1].elevationMeters);
    }
  });

  it('verifies monotonic increase of distance from 0 km to 2,525 km', () => {
    expect(GANGES_STOPS[0].distanceKm).toBe(0);
    expect(GANGES_STOPS[GANGES_STOPS.length - 1].distanceKm).toBe(2525);

    for (let i = 0; i < GANGES_STOPS.length - 1; i++) {
      expect(GANGES_STOPS[i].distanceKm).toBeLessThan(GANGES_STOPS[i + 1].distanceKm);
    }
  });

  it('every stop contains required fields and non-empty content', () => {
    GANGES_STOPS.forEach((stop, idx) => {
      expect(stop, `Stop at index ${idx} missing id`).toHaveProperty('id');
      expect(stop, `Stop at index ${idx} missing name`).toHaveProperty('name');
      expect(stop, `Stop at index ${idx} missing location`).toHaveProperty('location');
      expect(stop, `Stop at index ${idx} missing elevation`).toHaveProperty('elevation');
      expect(stop, `Stop at index ${idx} missing distanceKm`).toHaveProperty('distanceKm');
      expect(stop, `Stop at index ${idx} missing summary`).toHaveProperty('summary');
      expect(stop, `Stop at index ${idx} missing details`).toHaveProperty('details');
      expect(stop, `Stop at index ${idx} missing culturalNote`).toHaveProperty('culturalNote');

      expect(typeof stop.name).toBe('string');
      expect(stop.name.trim().length).toBeGreaterThan(0);
      expect(typeof stop.summary).toBe('string');
      expect(stop.summary.trim().length).toBeGreaterThan(0);
      expect(typeof stop.details).toBe('string');
      expect(stop.details.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('Active Stop Index Calculation', () => {
  const dummyOffsets = [
    { id: 'stop-1', top: 0, height: 400 },
    { id: 'stop-2', top: 450, height: 400 },
    { id: 'stop-3', top: 900, height: 400 },
    { id: 'stop-4', top: 1350, height: 400 },
    { id: 'stop-5', top: 1800, height: 400 },
    { id: 'stop-6', top: 2250, height: 400 }
  ];

  it('returns index 0 when scroll is near top', () => {
    expect(getActiveStopIndex(0, dummyOffsets)).toBe(0);
  });

  it('returns index 2 when scrolled to middle stop', () => {
    // With viewportMiddle = 1000 + 240 = 1240 -> past top 900
    expect(getActiveStopIndex(1000, dummyOffsets)).toBe(2);
  });

  it('handles empty offsets array safely', () => {
    expect(getActiveStopIndex(100, [])).toBe(0);
  });
});

describe('River Path Progress Math', () => {
  it('calculates 0% for origin stop (index 0)', () => {
    expect(calculateRiverPathProgress(0, 6)).toBe(0);
  });

  it('calculates 60% for middle stop (index 3 of 6 stops)', () => {
    expect(calculateRiverPathProgress(3, 6)).toBe(60);
  });

  it('calculates 100% for final delta stop (index 5 of 6 stops)', () => {
    expect(calculateRiverPathProgress(5, 6)).toBe(100);
  });

  it('bounds out-of-range stop indices safely', () => {
    expect(calculateRiverPathProgress(10, 6)).toBe(100);
    expect(calculateRiverPathProgress(-2, 6)).toBe(0);
  });
});

describe('Ganges River Stats', () => {
  it('returns accurate summary statistics for the Ganges River', () => {
    const stats = getGangesStats(GANGES_STOPS);
    expect(stats.totalStops).toBe(6);
    expect(stats.totalLengthKm).toBe(2525);
    expect(stats.originElevation).toContain('4,100 m');
    expect(stats.seaElevation).toContain('0 m');
    expect(stats.statesTraversed).toEqual(['Uttarakhand', 'Uttar Pradesh', 'Bihar', 'Jharkhand', 'West Bengal']);
  });
});
