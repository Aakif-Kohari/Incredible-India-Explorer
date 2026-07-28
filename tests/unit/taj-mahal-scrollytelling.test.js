/**
 * taj-mahal-scrollytelling.test.js
 * Unit tests for Scrollytelling: The Making of the Taj Mahal.
 * Validates construction stage data integrity, material origins,
 * active scroll stage index logic, material filtering, and myth flagging.
 */

import { describe, it, expect } from 'vitest';
import {
  TAJ_BUILD_STAGES,
  TAJ_MATERIALS_ORIGINS,
  HISTORICAL_MYTHS_FLAGGED,
  getActiveStageIndex,
  filterMaterials,
  getTajConstructionStats
} from '../../frontend/taj-mahal-scrollytelling/script.js';

describe('Taj Mahal Construction Stages Dataset Integrity', () => {
  it('contains 6 chronological construction build-up stages', () => {
    expect(TAJ_BUILD_STAGES.length).toBe(6);
  });

  it('verifies progress percentages ascend from foundation to completion (16% to 100%)', () => {
    expect(TAJ_BUILD_STAGES[0].progressPercentage).toBe(16);
    expect(TAJ_BUILD_STAGES[TAJ_BUILD_STAGES.length - 1].progressPercentage).toBe(100);

    for (let i = 0; i < TAJ_BUILD_STAGES.length - 1; i++) {
      expect(TAJ_BUILD_STAGES[i].progressPercentage).toBeLessThan(TAJ_BUILD_STAGES[i + 1].progressPercentage);
    }
  });

  it('every build stage contains required architectural properties', () => {
    TAJ_BUILD_STAGES.forEach((stage, idx) => {
      expect(stage, `Stage ${idx} missing id`).toHaveProperty('id');
      expect(stage, `Stage ${idx} missing stepNumber`).toHaveProperty('stepNumber');
      expect(stage, `Stage ${idx} missing title`).toHaveProperty('title');
      expect(stage, `Stage ${idx} missing theme`).toHaveProperty('theme');
      expect(stage, `Stage ${idx} missing summary`).toHaveProperty('summary');
      expect(stage, `Stage ${idx} missing details`).toHaveProperty('details');
      expect(stage, `Stage ${idx} missing materials`).toHaveProperty('materials');

      expect(Array.isArray(stage.materials)).toBe(true);
      expect(stage.materials.length).toBeGreaterThan(0);
    });
  });
});

describe('Material Sourcing Dataset & Search Filter', () => {
  it('contains at least 6 verified material origins across Asia', () => {
    expect(TAJ_MATERIALS_ORIGINS.length).toBeGreaterThanOrEqual(6);
  });

  it('filters materials accurately by search query', () => {
    const marble = filterMaterials(TAJ_MATERIALS_ORIGINS, 'marble');
    expect(marble.length).toBe(1);
    expect(marble[0].stone).toContain('White Marble');

    const tibet = filterMaterials(TAJ_MATERIALS_ORIGINS, 'Tibet');
    expect(tibet.length).toBe(1);
    expect(tibet[0].stone).toBe('Turquoise');
  });

  it('returns all materials when search query is empty', () => {
    expect(filterMaterials(TAJ_MATERIALS_ORIGINS, '').length).toBe(TAJ_MATERIALS_ORIGINS.length);
  });
});

describe('Flagged Historical Myths', () => {
  it('contains flagged disputed claims with clear warning verdicts', () => {
    expect(HISTORICAL_MYTHS_FLAGGED.length).toBeGreaterThanOrEqual(3);

    HISTORICAL_MYTHS_FLAGGED.forEach((m) => {
      expect(m).toHaveProperty('claim');
      expect(m).toHaveProperty('verdict');
      expect(m).toHaveProperty('explanation');
      expect(m.verdict).toContain('DISPUTED');
    });
  });
});

describe('Scroll Stage Index Calculation & Stats', () => {
  it('calculates active stage index based on scroll percentage', () => {
    expect(getActiveStageIndex(0, 6)).toBe(0);
    expect(getActiveStageIndex(30, 6)).toBe(1);
    expect(getActiveStageIndex(50, 6)).toBe(3);
    expect(getActiveStageIndex(99, 6)).toBe(5);
  });

  it('computes construction statistics correctly', () => {
    const stats = getTajConstructionStats();
    expect(stats.workforceEstimate).toContain('20,000');
    expect(stats.chiefArchitect).toBe('Ustad Ahmad Lahori');
    expect(stats.buildStagesCount).toBe(6);
  });
});
