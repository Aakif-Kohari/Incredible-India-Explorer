/**
 * border-explorer.test.js
 * Unit tests for India's Border Explorer dataset integrity,
 * mandatory neighbors coverage, checkpoint & force validation,
 * comparison engine, search filters, and length aggregation.
 */

import { describe, it, expect } from 'vitest';
import {
  bordersData,
  getBorderById,
  filterBorders,
  getBordersByLength,
  getTotalBorderLength,
  getAllBorderForces,
  getAllBorderingStates,
  compareBorders
} from '../../frontend/border-explorer/border-explorer.js';

const MANDATORY_COUNTRIES = [
  "Pakistan", "China", "Nepal", "Bhutan", "Bangladesh", "Myanmar", "Sri Lanka"
];

describe('Border Explorer Dataset Coverage', () => {
  it('contains all 7 neighboring countries', () => {
    expect(bordersData.length).toBe(7);
    const countries = bordersData.map(b => b.country);
    MANDATORY_COUNTRIES.forEach(c => {
      expect(countries).toContain(c);
    });
  });

  it('every border record has all required fields', () => {
    bordersData.forEach((item, idx) => {
      expect(item, `Item ${idx} missing id`).toHaveProperty('id');
      expect(item, `Item ${idx} missing country`).toHaveProperty('country');
      expect(item, `Item ${idx} missing borderName`).toHaveProperty('borderName');
      expect(item, `Item ${idx} missing borderLength`).toHaveProperty('borderLength');
      expect(item, `Item ${idx} missing borderForce`).toHaveProperty('borderForce');
      expect(item, `Item ${idx} missing majorCheckpoints`).toHaveProperty('majorCheckpoints');
      expect(item, `Item ${idx} missing importantTowns`).toHaveProperty('importantTowns');
      expect(item, `Item ${idx} missing borderingStates`).toHaveProperty('borderingStates');
      expect(item, `Item ${idx} missing description`).toHaveProperty('description');
      expect(item, `Item ${idx} missing geographicFeatures`).toHaveProperty('geographicFeatures');

      expect(typeof item.borderLength).toBe('number');
      expect(item.borderLength).toBeGreaterThan(0);
      expect(Array.isArray(item.majorCheckpoints)).toBe(true);
      expect(item.majorCheckpoints.length).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(item.importantTowns)).toBe(true);
      expect(item.importantTowns.length).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(item.borderingStates)).toBe(true);
      expect(item.borderingStates.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('every checkpoint has name, state, type, and description', () => {
    bordersData.forEach(item => {
      item.majorCheckpoints.forEach((cp, cpIdx) => {
        expect(cp, `Checkpoint ${cpIdx} of ${item.country} missing name`).toHaveProperty('name');
        expect(cp, `Checkpoint ${cpIdx} of ${item.country} missing state`).toHaveProperty('state');
        expect(cp, `Checkpoint ${cpIdx} of ${item.country} missing type`).toHaveProperty('type');
        expect(cp, `Checkpoint ${cpIdx} of ${item.country} missing description`).toHaveProperty('description');
      });
    });
  });

  it('all border IDs are unique', () => {
    const ids = bordersData.map(b => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Border Length Aggregation & Sorting', () => {
  it('calculates total border length correctly', () => {
    const total = getTotalBorderLength();
    const manual = bordersData.reduce((s, b) => s + b.borderLength, 0);
    expect(total).toBe(manual);
    expect(total).toBeGreaterThan(14000); // India's total is ~15,000+ km
  });

  it('sorts borders by length descending', () => {
    const sorted = getBordersByLength();
    expect(sorted.length).toBe(bordersData.length);
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].borderLength).toBeGreaterThanOrEqual(sorted[i + 1].borderLength);
    }
    expect(sorted[0].country).toBe("Bangladesh"); // 4,096 km — longest
  });
});

describe('Border Forces & Bordering States', () => {
  it('returns all unique border forces', () => {
    const forces = getAllBorderForces();
    expect(forces.length).toBeGreaterThanOrEqual(4);
    expect(forces).toContain("Border Security Force (BSF)");
    expect(forces).toContain("Indo-Tibetan Border Police (ITBP)");
    expect(forces).toContain("Sashastra Seema Bal (SSB)");
    expect(forces).toContain("Assam Rifles");
  });

  it('returns all unique bordering states', () => {
    const states = getAllBorderingStates();
    expect(states.length).toBeGreaterThanOrEqual(10);
  });
});

describe('Search & Filter Functions', () => {
  it('retrieves border by ID', () => {
    const pak = getBorderById('india-pakistan');
    expect(pak).toBeDefined();
    expect(pak.country).toBe('Pakistan');
  });

  it('retrieves border by country name', () => {
    const nepal = getBorderById('Nepal');
    expect(nepal).toBeDefined();
    expect(nepal.borderName).toContain('Open Border');
  });

  it('filters by search query matching checkpoint names', () => {
    const results = filterBorders('Wagah');
    expect(results.length).toBe(1);
    expect(results[0].country).toBe('Pakistan');
  });

  it('filters by search query matching bordering state', () => {
    const results = filterBorders('Sikkim');
    expect(results.length).toBeGreaterThanOrEqual(2); // China, Bhutan, Nepal
  });

  it('returns all when query is empty', () => {
    const all = filterBorders('');
    expect(all.length).toBe(7);
  });

  it('returns empty array when query matches nothing', () => {
    const empty = filterBorders('NonExistentXYZ123');
    expect(empty).toEqual([]);
  });
});

describe('Country Comparison Engine', () => {
  it('compares two borders and returns correct structure', () => {
    const result = compareBorders('india-pakistan', 'india-china');
    expect(result).not.toBeNull();
    expect(result.countries).toEqual(['Pakistan', 'China']);
    expect(result.borderLengths[0]).toBe(3323); // Pakistan
    expect(result.borderLengths[1]).toBe(3488); // China
    expect(result.longerBorder).toBe('China');
    expect(result.borderForces.length).toBe(2);
  });

  it('returns null when an invalid ID is given', () => {
    const result = compareBorders('india-pakistan', 'nonexistent');
    expect(result).toBeNull();
  });
});
