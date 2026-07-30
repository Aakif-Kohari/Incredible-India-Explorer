/**
 * monsoon-farming-cycle.test.js
 * Unit tests for Animated Explainer: How the Monsoon Farming Cycle Works (#581).
 */

import { describe, it, expect } from 'vitest';
import {
  SEASONS_DATA,
  CROPS_DATA,
  IRRIGATION_METHODS,
  validateFarmingCycleData,
  filterCropsBySeason,
  calculateCalendarRotationAngle
} from '../../frontend/monsoon-farming-cycle/script.js';

describe('Monsoon Farming Cycle Dataset Integrity (#581)', () => {
  it('contains Kharif, Rabi, and Zaid agricultural seasons', () => {
    expect(SEASONS_DATA).toHaveProperty('kharif');
    expect(SEASONS_DATA).toHaveProperty('rabi');
    expect(SEASONS_DATA).toHaveProperty('zaid');
  });

  it('represents at least 6 crops with verified season data', () => {
    expect(Array.isArray(CROPS_DATA)).toBe(true);
    expect(CROPS_DATA.length).toBeGreaterThanOrEqual(6);
  });

  it('validates crop dataset field structure', () => {
    const summary = validateFarmingCycleData(CROPS_DATA, SEASONS_DATA);
    expect(summary.isValid).toBe(true);
    expect(summary.errors).toEqual([]);
  });

  it('ensures every crop has sowing/harvest timing, rainfall, and major states', () => {
    CROPS_DATA.forEach(crop => {
      expect(crop).toHaveProperty('name');
      expect(crop).toHaveProperty('sowing');
      expect(crop).toHaveProperty('harvest');
      expect(crop).toHaveProperty('rainfallReq');
      expect(crop).toHaveProperty('majorStates');
      expect(crop.majorStates.length).toBeGreaterThan(0);
    });
  });
});

describe('Crop Filtering & Rotation Math', () => {
  it('filters crops accurately by season key', () => {
    const kharifCrops = filterCropsBySeason('kharif');
    expect(kharifCrops.length).toBeGreaterThan(0);
    kharifCrops.forEach(c => expect(c.season).toBe('kharif'));

    const rabiCrops = filterCropsBySeason('rabi');
    expect(rabiCrops.length).toBeGreaterThan(0);
    rabiCrops.forEach(c => expect(c.season).toBe('rabi'));
  });

  it('returns all crops when filter is "all" or missing', () => {
    const all = filterCropsBySeason('all');
    expect(all.length).toBe(CROPS_DATA.length);
  });

  it('calculates calendar wheel rotation angle for month indices (0-11)', () => {
    expect(calculateCalendarRotationAngle(0)).toBe(0);
    expect(calculateCalendarRotationAngle(6)).toBe(180);
    expect(calculateCalendarRotationAngle(3)).toBe(90);
  });

  it('clamps rotation angles for out of bounds month indices', () => {
    expect(calculateCalendarRotationAngle(-2)).toBe(0);
    expect(calculateCalendarRotationAngle(15)).toBe(330);
  });
});
