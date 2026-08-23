/**
 * indian-cinema-timeline.test.js
 * Unit tests for Animated Timeline: Evolution of Indian Cinema.
 * Validates dataset milestone count (at least 8, contains 10), verified dates,
 * era filtering logic, filmstrip scroll calculations, and summary statistics.
 */

import { describe, it, expect } from 'vitest';
import {
  CINEMA_MILESTONES,
  CINEMA_ERAS,
  filterMilestonesByEra,
  calculateFilmstripOffset,
  getActiveFrameIndex,
  getTimelineStats
} from '../../frontend/indian-cinema-timeline/script.js';

describe('Indian Cinema Milestones Dataset Integrity', () => {
  it('contains at least 8 verified milestones (has 10)', () => {
    expect(CINEMA_MILESTONES.length).toBeGreaterThanOrEqual(8);
    expect(CINEMA_MILESTONES.length).toBe(10);
  });

  it('verifies chronological order of years from 1913 to 2022', () => {
    expect(CINEMA_MILESTONES[0].year).toBe(1913);
    expect(CINEMA_MILESTONES[CINEMA_MILESTONES.length - 1].year).toBe(2022);

    for (let i = 0; i < CINEMA_MILESTONES.length - 1; i++) {
      expect(CINEMA_MILESTONES[i].year).toBeLessThanOrEqual(CINEMA_MILESTONES[i + 1].year);
    }
  });

  it('every milestone contains required verified fields', () => {
    CINEMA_MILESTONES.forEach((m, idx) => {
      expect(m, `Milestone ${idx} missing id`).toHaveProperty('id');
      expect(m, `Milestone ${idx} missing year`).toHaveProperty('year');
      expect(m, `Milestone ${idx} missing title`).toHaveProperty('title');
      expect(m, `Milestone ${idx} missing era`).toHaveProperty('era');
      expect(m, `Milestone ${idx} missing industry`).toHaveProperty('industry');
      expect(m, `Milestone ${idx} missing pioneer`).toHaveProperty('pioneer');
      expect(m, `Milestone ${idx} missing summary`).toHaveProperty('summary');
      expect(m, `Milestone ${idx} missing details`).toHaveProperty('details');
      expect(m, `Milestone ${idx} missing significance`).toHaveProperty('significance');
      expect(m, `Milestone ${idx} missing svgIcon`).toHaveProperty('svgIcon');

      expect(typeof m.title).toBe('string');
      expect(m.title.trim().length).toBeGreaterThan(0);
      expect(typeof m.summary).toBe('string');
      expect(m.summary.trim().length).toBeGreaterThan(0);
    });
  });

  it('does not contain copyrighted image paths (uses SVG icons)', () => {
    CINEMA_MILESTONES.forEach((m) => {
      expect(m).not.toHaveProperty('image');
      expect(m).not.toHaveProperty('posterUrl');
      expect(typeof m.svgIcon).toBe('string');
    });
  });
});

describe('Era Filtering & Helper Functions', () => {
  it('returns all milestones when filter is "All Eras"', () => {
    const result = filterMilestonesByEra(CINEMA_MILESTONES, 'All Eras');
    expect(result.length).toBe(CINEMA_MILESTONES.length);
  });

  it('filters milestones correctly by era name', () => {
    const silent = filterMilestonesByEra(CINEMA_MILESTONES, 'Silent Era');
    expect(silent.length).toBe(1);
    expect(silent[0].year).toBe(1913);

    const goldenAge = filterMilestonesByEra(CINEMA_MILESTONES, 'Golden Age');
    expect(goldenAge.length).toBe(1);
    expect(goldenAge[0].year).toBe(1951);
  });

  it('calculates filmstrip horizontal scroll offset correctly', () => {
    expect(calculateFilmstripOffset(0, 1000, 3000)).toBe(0);
    expect(calculateFilmstripOffset(50, 1000, 3000)).toBe(-1000);
    expect(calculateFilmstripOffset(100, 1000, 3000)).toBe(-2000);
  });

  it('calculates active frame index based on scroll percentage', () => {
    expect(getActiveFrameIndex(0, 10)).toBe(0);
    expect(getActiveFrameIndex(25, 10)).toBe(2);
    expect(getActiveFrameIndex(99, 10)).toBe(9);
    expect(getActiveFrameIndex(100, 10)).toBe(9);
  });

  it('computes timeline statistics correctly', () => {
    const stats = getTimelineStats(CINEMA_MILESTONES);
    expect(stats.totalMilestones).toBe(10);
    expect(stats.yearSpan).toBe('1913 - 2022');
    expect(stats.erasCount).toBeGreaterThanOrEqual(8);
  });
});
