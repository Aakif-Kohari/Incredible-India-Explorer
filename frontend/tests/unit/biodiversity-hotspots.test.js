/**
 * biodiversity-hotspots.test.js
 * Unit tests for Animated Infographic: India's Biodiversity Hotspots (#579).
 */

import { describe, it, expect } from 'vitest';
import {
  BIODIVERSITY_HOTSPOTS_DATA,
  validateBiodiversityData,
  getHotspotById,
  calculateHotspotPriorityScore
} from '../../frontend/biodiversity-hotspots/script.js';

describe('Biodiversity Hotspots Dataset Integrity (#579)', () => {
  it('covers all 4 globally recognized hotspots in India', () => {
    expect(Array.isArray(BIODIVERSITY_HOTSPOTS_DATA)).toBe(true);
    expect(BIODIVERSITY_HOTSPOTS_DATA.length).toBe(4);
  });

  it('validates dataset field completeness', () => {
    const summary = validateBiodiversityData(BIODIVERSITY_HOTSPOTS_DATA);
    expect(summary.isValid).toBe(true);
    expect(summary.errors).toEqual([]);
  });

  it('contains the four expected hotspot IDs', () => {
    const ids = BIODIVERSITY_HOTSPOTS_DATA.map(h => h.id);
    expect(ids).toContain('himalaya');
    expect(ids).toContain('western-ghats');
    expect(ids).toContain('indo-burma');
    expect(ids).toContain('sundaland-nicobar');
  });

  it('ensures every hotspot has endemic species, threats, and criteria', () => {
    BIODIVERSITY_HOTSPOTS_DATA.forEach(h => {
      expect(h).toHaveProperty('name');
      expect(h).toHaveProperty('statesCovered');
      expect(h.ecologicalCriteria).toHaveProperty('endemicPlants');
      expect(h.ecologicalCriteria).toHaveProperty('habitatLossPercent');
      expect(Array.isArray(h.keyFloraFauna)).toBe(true);
      expect(h.keyFloraFauna.length).toBeGreaterThanOrEqual(4);
      expect(Array.isArray(h.threats)).toBe(true);
      expect(h.threats.length).toBeGreaterThan(0);
    });
  });
});

describe('Hotspot Helper & Calculation Math', () => {
  it('retrieves hotspot by valid ID', () => {
    const wg = getHotspotById('western-ghats');
    expect(wg.name).toContain('Western Ghats');
    expect(wg.statesCovered).toContain('Kerala');
  });

  it('defaults to first hotspot if invalid ID provided', () => {
    const fallback = getHotspotById('unknown');
    expect(fallback.id).toBe('himalaya');
  });

  it('calculates ecological priority score correctly', () => {
    // 75% loss, 3160 endemic plants -> lossScore = 75, endemicBonus = 31.6 -> 75*0.7 + 31.6*0.3 = 52.5 + 9.48 = 61.98 -> 62
    const score = calculateHotspotPriorityScore(75, 3160);
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThanOrEqual(100);
  });
});
