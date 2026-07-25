/**
 * monsoon-explainer.test.js
 * Unit tests for Scientific Animated Explainer: How the Indian Monsoon System Works.
 * Validates scientific IMD dataset integrity, mode switching, phase lookup,
 * and SVG wind path dashoffset calculation math.
 */

import { describe, it, expect } from 'vitest';
import {
  MONSOON_DATA,
  getMonsoonModeData,
  getPhaseDetails,
  calculateWindPathDashOffset,
  validateScientificData
} from '../../frontend/monsoon-explainer/monsoon-explainer.js';

describe('Monsoon Explainer Dataset Integrity', () => {
  it('contains both Southwest (SW) and Northeast (NE) monsoon systems', () => {
    expect(MONSOON_DATA).toHaveProperty('sw');
    expect(MONSOON_DATA).toHaveProperty('ne');
  });

  it('validates dataset structure according to IMD meteorological standards', () => {
    const summary = validateScientificData(MONSOON_DATA);
    expect(summary.isValid).toBe(true);
    expect(summary.errors).toEqual([]);
  });

  it('every mode contains at least 4 distinct phase progression steps', () => {
    ['sw', 'ne'].forEach(mode => {
      const m = MONSOON_DATA[mode];
      expect(Array.isArray(m.phases)).toBe(true);
      expect(m.phases.length).toBeGreaterThanOrEqual(4);

      m.phases.forEach((phase, idx) => {
        expect(phase).toHaveProperty('step');
        expect(phase).toHaveProperty('title');
        expect(phase).toHaveProperty('period');
        expect(phase).toHaveProperty('desc');

        expect(phase.step).toBe(idx + 1);
        expect(phase.title.trim().length).toBeGreaterThan(0);
        expect(phase.desc.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('contains primary air mass branches for both systems', () => {
    expect(MONSOON_DATA.sw.branches.length).toBe(2);
    expect(MONSOON_DATA.ne.branches.length).toBe(2);

    expect(MONSOON_DATA.sw.branches[0].name).toContain('Arabian Sea');
    expect(MONSOON_DATA.sw.branches[1].name).toContain('Bay of Bengal');
  });
});

describe('Mode Switching Logic', () => {
  it('retrieves Southwest monsoon data for sw mode', () => {
    const sw = getMonsoonModeData('sw');
    expect(sw.id).toBe('sw');
    expect(sw.title).toContain('Southwest');
  });

  it('retrieves Northeast monsoon data for ne mode', () => {
    const ne = getMonsoonModeData('ne');
    expect(ne.id).toBe('ne');
    expect(ne.title).toContain('Northeast');
  });

  it('handles uppercase and whitespace input gracefully', () => {
    const ne = getMonsoonModeData(' NE ');
    expect(ne.id).toBe('ne');
  });

  it('defaults to SW monsoon data for invalid or missing mode key', () => {
    const defaultData = getMonsoonModeData('invalid_mode');
    expect(defaultData.id).toBe('sw');
  });
});

describe('Phase Step Lookup', () => {
  it('retrieves correct phase details by 1-based index', () => {
    const phase1 = getPhaseDetails('sw', 1);
    expect(phase1.step).toBe(1);
    expect(phase1.title).toContain('Phase 1');

    const phase4 = getPhaseDetails('ne', 4);
    expect(phase4.step).toBe(4);
    expect(phase4.title).toContain('Phase 4');
  });

  it('safely bounds out-of-range phase indices', () => {
    const phaseOver = getPhaseDetails('sw', 10);
    expect(phaseOver.step).toBe(4);

    const phaseUnder = getPhaseDetails('sw', 0);
    expect(phaseUnder.step).toBe(1);
  });
});

describe('SVG Wind Path Dashoffset Math', () => {
  it('calculates stroke-dashoffset 500 (fully hidden) at 0% progress', () => {
    expect(calculateWindPathDashOffset(0, 500)).toBe(500);
  });

  it('calculates stroke-dashoffset 250 (half visible) at 50% progress', () => {
    expect(calculateWindPathDashOffset(50, 500)).toBe(250);
  });

  it('calculates stroke-dashoffset 0 (fully visible path) at 100% progress', () => {
    expect(calculateWindPathDashOffset(100, 500)).toBe(0);
  });

  it('safely bounds input percentage values between 0 and 100', () => {
    expect(calculateWindPathDashOffset(150, 500)).toBe(0);
    expect(calculateWindPathDashOffset(-20, 500)).toBe(500);
  });
});
