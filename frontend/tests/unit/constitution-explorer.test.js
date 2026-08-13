/**
 * constitution-explorer.test.js
 * Unit tests for Interactive Constitution Explorer.
 * Validates Preamble keywords, Fundamental Rights categories, Fundamental Duties count,
 * 12 Schedules integrity, Key Amendments dataset, live search functionality, and statistics.
 */

import { describe, it, expect } from 'vitest';
import {
  PREAMBLE_KEYWORDS,
  FUNDAMENTAL_RIGHTS,
  FUNDAMENTAL_DUTIES,
  DIRECTIVE_PRINCIPLES,
  CONSTITUTION_SCHEDULES,
  KEY_AMENDMENTS,
  searchConstitutionData,
  getConstitutionStats
} from '../../frontend/constitution-explorer/script.js';

describe('Preamble & Fundamental Rights Dataset Integrity', () => {
  it('contains 9 core Preamble keywords (Sovereign, Socialist, Secular, etc.)', () => {
    expect(PREAMBLE_KEYWORDS.length).toBe(9);
    const terms = PREAMBLE_KEYWORDS.map(k => k.term);
    expect(terms).toContain('SOVEREIGN');
    expect(terms).toContain('SOCIALIST');
    expect(terms).toContain('SECULAR');
    expect(terms).toContain('DEMOCRATIC');
    expect(terms).toContain('REPUBLIC');
  });

  it('contains 6 core Fundamental Rights categories', () => {
    expect(FUNDAMENTAL_RIGHTS.length).toBe(6);

    const categories = FUNDAMENTAL_RIGHTS.map(r => r.category);
    expect(categories).toContain('Right to Equality');
    expect(categories).toContain('Right to Freedom');
    expect(categories).toContain('Right to Constitutional Remedies');
  });
});

describe('Duties, Schedules & Amendments Integrity', () => {
  it('contains 11 Fundamental Duties under Article 51A', () => {
    expect(FUNDAMENTAL_DUTIES.length).toBe(11);
    expect(FUNDAMENTAL_DUTIES[10].article).toContain('51A(k)');
  });

  it('contains 12 Schedules detailing constitutional subjects', () => {
    expect(CONSTITUTION_SCHEDULES.length).toBe(12);
    expect(CONSTITUTION_SCHEDULES[7].subject).toContain('22 Officially recognized');
    expect(CONSTITUTION_SCHEDULES[9].subject).toContain('Anti-Defection Law');
  });

  it('contains major landmark amendments (1st, 42nd, 44th, 73rd, 86th, 101st, 106th)', () => {
    expect(KEY_AMENDMENTS.length).toBeGreaterThanOrEqual(7);
    const names = KEY_AMENDMENTS.map(a => a.number);
    expect(names.some(n => n.includes('42nd'))).toBe(true);
    expect(names.some(n => n.includes('86th'))).toBe(true);
    expect(names.some(n => n.includes('106th'))).toBe(true);
  });
});

describe('Live Search & Stats Functions', () => {
  it('searches across rights, duties, schedules, and amendments by query', () => {
    const searchResult = searchConstitutionData('education');
    expect(searchResult.rights.length).toBeGreaterThanOrEqual(1);
    expect(searchResult.duties.length).toBeGreaterThanOrEqual(1);

    const scheduleResult = searchConstitutionData('languages');
    expect(scheduleResult.schedules.length).toBe(1);
    expect(scheduleResult.schedules[0].number).toBe(8);
  });

  it('returns all items when search query is empty', () => {
    const all = searchConstitutionData('');
    expect(all.rights.length).toBe(FUNDAMENTAL_RIGHTS.length);
    expect(all.duties.length).toBe(FUNDAMENTAL_DUTIES.length);
    expect(all.schedules.length).toBe(CONSTITUTION_SCHEDULES.length);
    expect(all.amendments.length).toBe(KEY_AMENDMENTS.length);
  });

  it('computes constitution statistics correctly', () => {
    const stats = getConstitutionStats();
    expect(stats.enforcedDate).toBe('26 January 1950');
    expect(stats.schedulesCount).toBe(12);
    expect(stats.fundamentalDutiesCount).toBe(11);
    expect(stats.recognizedLanguages).toBe(22);
  });
});
