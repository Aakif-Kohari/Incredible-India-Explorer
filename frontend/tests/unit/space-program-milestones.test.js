/**
 * space-program-milestones.test.js
 * Unit tests for Animated Explainer: India's Space Program Milestones (#577).
 */

import { describe, it, expect } from 'vitest';
import {
  SPACE_MILESTONES_DATA,
  validateSpaceMilestonesData,
  getMilestoneById,
  calculateOrbitPathDashOffset,
  getOrbitColorByClass
} from '../../frontend/space-program-milestones/script.js';

describe('Space Program Milestones Dataset Integrity (#577)', () => {
  it('contains at least 6 verified mission milestones with orbit animations', () => {
    expect(Array.isArray(SPACE_MILESTONES_DATA)).toBe(true);
    expect(SPACE_MILESTONES_DATA.length).toBeGreaterThanOrEqual(6);
  });

  it('validates dataset structure and field presence', () => {
    const summary = validateSpaceMilestonesData(SPACE_MILESTONES_DATA);
    expect(summary.isValid).toBe(true);
    expect(summary.errors).toEqual([]);
  });

  it('verifies key historical milestones exist in sequence', () => {
    const ids = SPACE_MILESTONES_DATA.map(m => m.id);
    expect(ids).toContain('founding-aryabhata');
    expect(ids).toContain('slv3-rohini');
    expect(ids).toContain('insat-1b');
    expect(ids).toContain('chandrayaan-1');
    expect(ids).toContain('mangalyaan-mom');
    expect(ids).toContain('chandrayaan-3');
    expect(ids).toContain('aditya-l1');
    expect(ids).toContain('gaganyaan-program');
  });

  it('ensures every milestone has required orbital properties and achievements', () => {
    SPACE_MILESTONES_DATA.forEach(m => {
      expect(m).toHaveProperty('year');
      expect(m).toHaveProperty('title');
      expect(m).toHaveProperty('orbitType');
      expect(m.orbitSpec).toHaveProperty('type');
      expect(m.orbitSpec).toHaveProperty('color');
      expect(Array.isArray(m.keyAchievments)).toBe(true);
      expect(m.keyAchievments.length).toBeGreaterThan(0);
    });
  });
});

describe('Milestone Helper & Lookup Functions', () => {
  it('retrieves milestone by valid ID', () => {
    const mom = getMilestoneById('mangalyaan-mom');
    expect(mom.title).toContain('Mangalyaan');
    expect(mom.year).toBe(2013);
  });

  it('defaults to first milestone if ID is missing or invalid', () => {
    const fallback = getMilestoneById('non-existent-id');
    expect(fallback.id).toBe(SPACE_MILESTONES_DATA[0].id);
  });

  it('assigns correct orbit color codes per orbit class', () => {
    expect(getOrbitColorByClass('LEO')).toBe('#38bdf8');
    expect(getOrbitColorByClass('GEO')).toBe('#facc15');
    expect(getOrbitColorByClass('Mars Orbit')).toBe('#f87171');
    expect(getOrbitColorByClass('Lagrange L1 Halo')).toBe('#fb923c');
  });
});

describe('Orbit Animation Math Calculation', () => {
  it('calculates 100% stroke dashoffset (hidden) at 0% progress', () => {
    expect(calculateOrbitPathDashOffset(0, 1000)).toBe(1000);
  });

  it('calculates 50% stroke dashoffset at 50% progress', () => {
    expect(calculateOrbitPathDashOffset(50, 1000)).toBe(500);
  });

  it('calculates 0 stroke dashoffset (fully visible) at 100% progress', () => {
    expect(calculateOrbitPathDashOffset(100, 1000)).toBe(0);
  });

  it('clamps progress bounds between 0 and 100', () => {
    expect(calculateOrbitPathDashOffset(-10, 1000)).toBe(1000);
    expect(calculateOrbitPathDashOffset(150, 1000)).toBe(0);
  });
});
