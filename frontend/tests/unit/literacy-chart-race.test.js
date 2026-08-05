/**
 * literacy-chart-race.test.js
 * Unit tests for Data Viz: Literacy Rate Growth by State (Animated Bar-Chart Race) dataset integrity,
 * decennial census years (>=3 years), ranking & interpolation math, sourcing disclaimers, and search filters.
 */

import { describe, it, expect } from 'vitest';
import {
  censusYears,
  stateLiteracyData,
  sourcingDisclaimer,
  getRankedStatesByYear,
  interpolateYearData,
  calculateLiteracyGrowth,
  filterStatesData
} from '../../frontend/literacy-chart-race/literacy-chart-race.js';

describe('Census Years & Dataset Integrity', () => {
  it('contains at least 3 decennial census years (contains 7 years: 1951–2011)', () => {
    expect(censusYears.length).toBeGreaterThanOrEqual(3);
    expect(censusYears).toEqual([1951, 1961, 1971, 1981, 1991, 2001, 2011]);
  });

  it('contains literacy rates across all census years for 18 states/national entries', () => {
    expect(stateLiteracyData.length).toBeGreaterThanOrEqual(15);
    stateLiteracyData.forEach(item => {
      expect(item).toHaveProperty('state');
      expect(item).toHaveProperty('region');
      expect(item).toHaveProperty('flag');
      expect(item).toHaveProperty('rates');

      censusYears.forEach(year => {
        expect(item.rates).toHaveProperty(year.toString());
        expect(typeof item.rates[year]).toBe('number');
        expect(item.rates[year]).toBeGreaterThan(0);
        expect(item.rates[year]).toBeLessThanOrEqual(100);
      });
    });
  });
});

describe('Sourcing Disclaimer & Disclaimer Notice', () => {
  it('contains mandatory census data sourcing and "as of latest census" disclaimer', () => {
    expect(sourcingDisclaimer).toBeDefined();
    expect(sourcingDisclaimer.text.toLowerCase()).toContain('census of india');
    expect(sourcingDisclaimer.disclaimer.toLowerCase()).toContain('as of census 2011');
  });
});

describe('Bar Chart Race Ranking & Interpolation Engine', () => {
  it('returns sorted ranked list of states for a given census year', () => {
    const ranked2011 = getRankedStatesByYear(2011);
    expect(ranked2011.length).toBe(stateLiteracyData.length);
    // Kerala should be #1 in 2011
    expect(ranked2011[0].state).toBe('Kerala');
    expect(ranked2011[0].rate).toBe(94.00);

    // Verify descending order sorting
    for (let i = 0; i < ranked2011.length - 1; i++) {
      expect(ranked2011[i].rate).toBeGreaterThanOrEqual(ranked2011[i + 1].rate);
    }
  });

  it('interpolates values between startYear and endYear for smooth bar race steps', () => {
    const midStep = interpolateYearData(1951, 1961, 0.5);
    expect(midStep.length).toBe(stateLiteracyData.length);

    // Check Kerala midpoint (1951: 47.18%, 1961: 55.08% -> mid: ~51.13%)
    const keralaMid = midStep.find(s => s.state === 'Kerala');
    expect(keralaMid).toBeDefined();
    expect(keralaMid.rate).toBeCloseTo(51.13, 1);
  });

  it('calculates total literacy growth from 1951 to 2011 correctly', () => {
    // Kerala 47.18% to 94.00% = +46.82%
    const keralaGrowth = calculateLiteracyGrowth(47.18, 94.00);
    expect(keralaGrowth).toBe(46.82);

    // National 18.33% to 74.04% = +55.71%
    const natGrowth = calculateLiteracyGrowth(18.33, 74.04);
    expect(natGrowth).toBe(55.71);
  });
});

describe('Search & Region Filter Helper', () => {
  it('filters state literacy data by query or region', () => {
    const northeastRes = filterStatesData('Northeast');
    expect(northeastRes.length).toBeGreaterThan(0);
    expect(northeastRes.some(s => s.state === 'Mizoram')).toBe(true);

    const keralaRes = filterStatesData('Kerala');
    expect(keralaRes.length).toBe(1);
  });

  it('returns empty array when query matches nothing', () => {
    const res = filterStatesData('NonExistentStateXYZ');
    expect(res).toEqual([]);
  });
});
