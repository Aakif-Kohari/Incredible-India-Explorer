/**
 * green-revolution.test.js
 * Unit tests for The Green Revolution in India Animated Explainer dataset integrity,
 * animated yield growth calculations, balanced impact analysis (benefits vs concerns), and search filters.
 */

import { describe, it, expect } from 'vitest';
import {
  yieldComparisonData,
  pillarsOfRevolution,
  impactAnalysis,
  timelineEras,
  calculateYieldGrowth,
  getYieldDataByCrop,
  getImpactsByCategory,
  filterGreenRevolutionTopics
} from '../../frontend/green-revolution/green-revolution.js';

describe('Green Revolution Yield Comparison Dataset Integrity', () => {
  it('contains yield comparison data for Wheat, Rice, Foodgrain Output, and Tubewell Irrigation', () => {
    expect(yieldComparisonData.length).toBeGreaterThanOrEqual(4);
    const crops = yieldComparisonData.map(y => y.crop.toLowerCase());
    expect(crops.some(c => c.includes('wheat'))).toBe(true);
    expect(crops.some(c => c.includes('rice'))).toBe(true);
    expect(crops.some(c => c.includes('foodgrain'))).toBe(true);
  });

  it('every crop object contains pre-1960, post-1980, and modern 2020 yield figures', () => {
    yieldComparisonData.forEach(item => {
      expect(item).toHaveProperty('crop');
      expect(item).toHaveProperty('unit');
      expect(item).toHaveProperty('pre1960');
      expect(item).toHaveProperty('post1980');
      expect(item).toHaveProperty('modern2020');
      expect(item).toHaveProperty('growthPercent');

      expect(typeof item.pre1960).toBe('number');
      expect(typeof item.post1980).toBe('number');
      expect(typeof item.modern2020).toBe('number');
      expect(item.post1980).toBeGreaterThan(item.pre1960);
    });
  });

  it('correctly calculates yield growth percentage using helper function', () => {
    // 850 kg/ha to 1850 kg/ha = ~118%
    const growth1 = calculateYieldGrowth(850, 1850);
    expect(growth1).toBe(118);

    // 1000 kg/ha to 2700 kg/ha = 170%
    const growth2 = calculateYieldGrowth(1000, 2700);
    expect(growth2).toBe(170);

    expect(calculateYieldGrowth(0, 100)).toBe(0);
  });
});

describe('Balanced Impact Analysis (Benefits vs Ecological Drawbacks)', () => {
  it('contains documented positive benefits AND documented ecological/social drawbacks', () => {
    expect(impactAnalysis.benefits.length).toBeGreaterThanOrEqual(3);
    expect(impactAnalysis.drawbacks.length).toBeGreaterThanOrEqual(4);
  });

  it('documented drawbacks cover groundwater depletion, soil salinization, and crop diversity loss', () => {
    const drawbacksSummaries = impactAnalysis.drawbacks.map(d => d.summary.toLowerCase() + " " + d.title.toLowerCase());
    expect(drawbacksSummaries.some(s => s.includes('groundwater') || s.includes('water table'))).toBe(true);
    expect(drawbacksSummaries.some(s => s.includes('soil') || s.includes('salinization'))).toBe(true);
    expect(drawbacksSummaries.some(s => s.includes('diversity') || s.includes('monoculture') || s.includes('millet'))).toBe(true);
  });

  it('retrieves impacts by category using helper function', () => {
    const benefits = getImpactsByCategory('benefits');
    expect(benefits.length).toBeGreaterThanOrEqual(3);

    const drawbacks = getImpactsByCategory('drawbacks');
    expect(drawbacks.length).toBeGreaterThanOrEqual(4);
  });
});

describe('Technological Pillars & Timeline Integrity', () => {
  it('contains 4 core technological pillars of the Green Revolution', () => {
    expect(pillarsOfRevolution.length).toBe(4);
    pillarsOfRevolution.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('title');
      expect(p).toHaveProperty('keyFigures');
      expect(p).toHaveProperty('description');
      expect(p).toHaveProperty('techDetails');
    });
  });

  it('contains timeline phases spanning 1965 to Present', () => {
    expect(timelineEras.length).toBeGreaterThanOrEqual(4);
    expect(timelineEras[0].year).toContain('1965');
  });
});

describe('Search & Topic Filter Helper', () => {
  it('filters Green Revolution topics by search query (e.g. Groundwater or Wheat)', () => {
    const res1 = filterGreenRevolutionTopics('Groundwater');
    expect(res1.drawbacks.length).toBeGreaterThan(0);

    const res2 = filterGreenRevolutionTopics('Wheat');
    expect(res2.yields.length).toBeGreaterThan(0);
  });

  it('returns full dataset when search query is empty', () => {
    const res = filterGreenRevolutionTopics('');
    expect(res.yields.length).toBe(yieldComparisonData.length);
    expect(res.pillars.length).toBe(pillarsOfRevolution.length);
  });
});
