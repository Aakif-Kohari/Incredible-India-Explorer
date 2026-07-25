/**
 * constitution-timeline.test.js
 * Unit tests for Animated Timeline: Evolution of the Indian Constitution.
 * Validates dataset integrity, chronological ordering, neutral framing, era filtering,
 * and scroll progress calculation logic.
 */

import { describe, it, expect } from 'vitest';
import {
  CONSTITUTION_MILESTONES,
  filterMilestones,
  calculateTimelineProgress,
  getMilestoneStats
} from '../../frontend/constitution-timeline/constitution-timeline.js';

describe('Constitution Timeline Dataset Integrity', () => {
  it('contains at least 8 verified constitutional milestones (contains 11)', () => {
    expect(CONSTITUTION_MILESTONES.length).toBeGreaterThanOrEqual(8);
    expect(CONSTITUTION_MILESTONES.length).toBe(11);
  });

  it('verifies strict chronological ordering of all milestones', () => {
    for (let i = 0; i < CONSTITUTION_MILESTONES.length - 1; i++) {
      const currentDate = new Date(CONSTITUTION_MILESTONES[i].date);
      const nextDate = new Date(CONSTITUTION_MILESTONES[i + 1].date);
      expect(currentDate.getTime()).toBeLessThanOrEqual(nextDate.getTime());
    }
  });

  it('every milestone contains required fields (id, date, displayDate, title, era, summary, details, keyFigures)', () => {
    CONSTITUTION_MILESTONES.forEach((m, idx) => {
      expect(m, `Milestone at index ${idx} missing id`).toHaveProperty('id');
      expect(m, `Milestone at index ${idx} missing date`).toHaveProperty('date');
      expect(m, `Milestone at index ${idx} missing displayDate`).toHaveProperty('displayDate');
      expect(m, `Milestone at index ${idx} missing title`).toHaveProperty('title');
      expect(m, `Milestone at index ${idx} missing era`).toHaveProperty('era');
      expect(m, `Milestone at index ${idx} missing summary`).toHaveProperty('summary');
      expect(m, `Milestone at index ${idx} missing details`).toHaveProperty('details');
      expect(m, `Milestone at index ${idx} missing keyFigures`).toHaveProperty('keyFigures');

      expect(typeof m.title).toBe('string');
      expect(m.title.trim().length).toBeGreaterThan(0);
      expect(typeof m.summary).toBe('string');
      expect(m.summary.trim().length).toBeGreaterThan(0);
      expect(typeof m.details).toBe('string');
      expect(m.details.trim().length).toBeGreaterThan(0);

      expect(Array.isArray(m.keyFigures)).toBe(true);
      expect(m.keyFigures.length).toBeGreaterThan(0);
    });
  });

  it('maintains objective, neutral framing without partisan language', () => {
    const nonPartisanKeywords = ['adopted', 'enacted', 'amendment', 'article', 'parliament', 'committee', 'republic'];
    const biasedWords = ['corrupt', 'illegal', 'scam', 'tyrannical', 'heroic'];

    CONSTITUTION_MILESTONES.forEach(m => {
      const fullText = `${m.title} ${m.summary} ${m.details}`.toLowerCase();

      // Ensure no biased emotional commentary exists
      biasedWords.forEach(word => {
        expect(fullText).not.toContain(word);
      });
    });
  });
});

describe('Milestone Filtering Engine', () => {
  it('filters milestones by era category correctly', () => {
    const foundational = filterMilestones(CONSTITUTION_MILESTONES, 'foundational');
    expect(foundational.length).toBe(4);
    foundational.forEach(m => expect(m.era).toBe('foundational'));

    const amendments = filterMilestones(CONSTITUTION_MILESTONES, 'amendments');
    expect(amendments.length).toBe(4);
    amendments.forEach(m => expect(m.era).toBe('amendments'));

    const modern = filterMilestones(CONSTITUTION_MILESTONES, 'modern');
    expect(modern.length).toBe(3);
    modern.forEach(m => expect(m.era).toBe('modern'));
  });

  it('filters milestones by search query keyword', () => {
    const ambedkarSearch = filterMilestones(CONSTITUTION_MILESTONES, 'all', 'Ambedkar');
    expect(ambedkarSearch.length).toBe(1);
    expect(ambedkarSearch[0].id).toBe('m2');

    const gstSearch = filterMilestones(CONSTITUTION_MILESTONES, 'all', 'GST');
    expect(gstSearch.length).toBe(1);
    expect(gstSearch[0].id).toBe('m10');
  });

  it('returns all milestones when era is all and search is empty', () => {
    const all = filterMilestones(CONSTITUTION_MILESTONES, 'all', '');
    expect(all.length).toBe(11);
  });
});

describe('Scroll Progress Math', () => {
  it('computes 0% when scrollTop is 0', () => {
    expect(calculateTimelineProgress(0, 2000, 1000)).toBe(0);
  });

  it('computes 50% when scrolled halfway', () => {
    expect(calculateTimelineProgress(500, 2000, 1000)).toBe(50);
  });

  it('computes 100% when scrolled to bottom', () => {
    expect(calculateTimelineProgress(1000, 2000, 1000)).toBe(100);
  });

  it('handles zero or negative scroll height gracefully', () => {
    expect(calculateTimelineProgress(100, 500, 500)).toBe(100);
    expect(calculateTimelineProgress(0, 0, 0)).toBe(100);
  });
});

describe('Milestone Stats Aggregator', () => {
  it('returns correct stats breakdown for the dataset', () => {
    const stats = getMilestoneStats(CONSTITUTION_MILESTONES);
    expect(stats.total).toBe(11);
    expect(stats.foundationalCount).toBe(4);
    expect(stats.amendmentsCount).toBe(4);
    expect(stats.modernCount).toBe(3);
    expect(stats.startDate).toBe('December 9, 1946');
    expect(stats.endDate).toBe('Present Day');
  });
});
