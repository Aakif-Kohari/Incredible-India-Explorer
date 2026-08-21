/**
 * government-institutions-explorer.test.js
 * Unit tests for Important Government Institutions Explorer.
 * Validates dataset completeness for all 9 required institutions,
 * required fields (Formation, HQ, Head, Responsibilities, Structure, Fun Facts),
 * category filter tabs, search functionality, and statistics helper.
 */

import { describe, it, expect } from 'vitest';
import {
  INSTITUTIONS_DATA,
  INSTITUTION_CATEGORIES,
  filterInstitutions,
  getInstitutionsStats
} from '../../frontend/government-institutions-explorer/script.js';

describe('Government Institutions Dataset Completeness', () => {
  it('contains exactly all 9 required institutions', () => {
    expect(INSTITUTIONS_DATA.length).toBe(9);

    const acronyms = INSTITUTIONS_DATA.map(i => i.acronym);
    expect(acronyms).toContain('RBI');
    expect(acronyms).toContain('SEBI');
    expect(acronyms).toContain('CBI');
    expect(acronyms).toContain('UPSC');
    expect(acronyms).toContain('ECI');
    expect(acronyms).toContain('CAG');
    expect(acronyms).toContain('NITI Aayog');
    expect(acronyms).toContain('FC');
    expect(acronyms).toContain('NHRC');
  });

  it('every institution contains all 6 required detail fields', () => {
    INSTITUTIONS_DATA.forEach((inst, idx) => {
      expect(inst, `Institution ${idx} missing formation`).toHaveProperty('formation');
      expect(inst, `Institution ${idx} missing headquarters`).toHaveProperty('headquarters');
      expect(inst, `Institution ${idx} missing currentHead`).toHaveProperty('currentHead');
      expect(inst, `Institution ${idx} missing responsibilities`).toHaveProperty('responsibilities');
      expect(inst, `Institution ${idx} missing structure`).toHaveProperty('structure');
      expect(inst, `Institution ${idx} missing funFacts`).toHaveProperty('funFacts');

      expect(Array.isArray(inst.responsibilities)).toBe(true);
      expect(inst.responsibilities.length).toBeGreaterThanOrEqual(3);
      expect(Array.isArray(inst.funFacts)).toBe(true);
      expect(inst.funFacts.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('Filter & Search Operations', () => {
  it('filters institutions by search query matching name or acronym', () => {
    const rbi = filterInstitutions(INSTITUTIONS_DATA, 'All Categories', 'rbi');
    expect(rbi.length).toBe(1);
    expect(rbi[0].fullName).toContain('Reserve Bank');

    const deli = filterInstitutions(INSTITUTIONS_DATA, 'All Categories', 'New Delhi');
    expect(deli.length).toBeGreaterThanOrEqual(7);
  });

  it('filters institutions by category tab', () => {
    const constitutional = filterInstitutions(INSTITUTIONS_DATA, 'Constitutional', '');
    expect(constitutional.length).toBe(4);

    const statutory = filterInstitutions(INSTITUTIONS_DATA, 'Statutory', '');
    expect(statutory.length).toBe(3);
  });

  it('computes institution summary stats correctly', () => {
    const stats = getInstitutionsStats();
    expect(stats.totalInstitutions).toBe(9);
    expect(stats.constitutionalCount).toBe(4);
    expect(stats.statutoryCount).toBe(3);
    expect(stats.executiveCount).toBe(2);
  });
});
