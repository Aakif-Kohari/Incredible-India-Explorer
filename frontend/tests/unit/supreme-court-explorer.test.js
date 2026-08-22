/**
 * supreme-court-explorer.test.js
 * Unit tests for Supreme Court Educational Portal.
 * Validates history timeline integrity, CJI timeline, landmark judgment filtering,
 * constitutional powers, and court hierarchy levels.
 */

import { describe, it, expect } from 'vitest';
import {
  SC_HISTORY,
  CJI_TIMELINE,
  LANDMARK_JUDGMENTS,
  CONSTITUTIONAL_POWERS,
  COURT_HIERARCHY_LEVELS,
  filterJudgments,
  getSupremeCourtStats
} from '../../frontend/supreme-court-explorer/script.js';

describe('Supreme Court History & CJI Datasets', () => {
  it('contains historical milestones starting from 1937 Federal Court', () => {
    expect(SC_HISTORY.length).toBeGreaterThanOrEqual(4);
    expect(SC_HISTORY[0].year).toBe('1937');
    expect(SC_HISTORY[1].year).toBe('1950');
  });

  it('contains CJI timeline including H.J. Kania and milestone judges', () => {
    expect(CJI_TIMELINE.length).toBeGreaterThanOrEqual(4);
    expect(CJI_TIMELINE[0].name).toContain('Kania');
  });
});

describe('Landmark Judgments Database & Filters', () => {
  it('contains key constitutional cases (Kesavananda, Maneka Gandhi, Puttaswamy)', () => {
    expect(LANDMARK_JUDGMENTS.length).toBeGreaterThanOrEqual(5);

    const names = LANDMARK_JUDGMENTS.map(j => j.caseName);
    expect(names.some(n => n.includes('Kesavananda'))).toBe(true);
    expect(names.some(n => n.includes('Puttaswamy'))).toBe(true);
    expect(names.some(n => n.includes('Maneka Gandhi'))).toBe(true);
  });

  it('filters landmark judgments by query search', () => {
    const privacy = filterJudgments(LANDMARK_JUDGMENTS, 'privacy', 'All Categories');
    expect(privacy.length).toBe(1);
    expect(privacy[0].caseName).toContain('Puttaswamy');

    const kesavananda = filterJudgments(LANDMARK_JUDGMENTS, '1973', 'All Categories');
    expect(kesavananda.length).toBe(1);
    expect(kesavananda[0].caseName).toContain('Kesavananda');
  });

  it('filters landmark judgments by category filter', () => {
    const gender = filterJudgments(LANDMARK_JUDGMENTS, '', 'Gender Justice & Rights');
    expect(gender.length).toBe(1);
    expect(gender[0].caseName).toContain('Vishaka');
  });
});

describe('Constitutional Jurisdiction & Hierarchy Tiers', () => {
  it('defines 4 core jurisdiction types (Original, Writ, Appellate, Advisory)', () => {
    expect(CONSTITUTIONAL_POWERS.length).toBe(4);
    const types = CONSTITUTIONAL_POWERS.map(p => p.type);
    expect(types).toContain('Original Jurisdiction');
    expect(types).toContain('Writ Jurisdiction');
    expect(types).toContain('Appellate Jurisdiction');
    expect(types).toContain('Advisory Jurisdiction');
  });

  it('defines 4 tiers of judicial hierarchy from Supreme Court to Munsiff Courts', () => {
    expect(COURT_HIERARCHY_LEVELS.length).toBe(4);
    expect(COURT_HIERARCHY_LEVELS[0].level).toBe(1);
    expect(COURT_HIERARCHY_LEVELS[0].title).toContain('Supreme Court');
    expect(COURT_HIERARCHY_LEVELS[3].level).toBe(4);
  });

  it('computes Supreme Court stats summary accurately', () => {
    const stats = getSupremeCourtStats();
    expect(stats.sanctionedJudges).toBe(34);
    expect(stats.inaugurationDate).toContain('1950');
    expect(stats.constitutionalArticle).toBe('Article 124');
  });
});
