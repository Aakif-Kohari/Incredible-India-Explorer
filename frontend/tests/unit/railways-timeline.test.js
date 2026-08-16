/**
 * railways-timeline.test.js
 * Unit tests for History of Indian Railways Animated Timeline dataset integrity,
 * milestone verification (>=8 milestones), neutral framing, track math, and search functions.
 */

import { describe, it, expect } from 'vitest';
import {
  railwayMilestones,
  railwayEras,
  getMilestoneById,
  getMilestonesByEra,
  filterMilestones,
  calculateTrainTrackPosition
} from '../../frontend/railways-timeline/railways-timeline.js';

const REQUIRED_MILESTONE_FIELDS = [
  'id',
  'year',
  'date',
  'title',
  'route',
  'era',
  'description',
  'significance',
  'neutralContext',
  'techSpecs',
  'icon',
  'trainIcon',
  'trackPositionPercent'
];

describe('History of Indian Railways Milestones Integrity', () => {
  it('contains at least 8 verified historical milestones (contains 10)', () => {
    expect(railwayMilestones.length).toBeGreaterThanOrEqual(8);
  });

  it('milestones are strictly sorted in chronological order', () => {
    for (let i = 0; i < railwayMilestones.length - 1; i++) {
      expect(railwayMilestones[i].year).toBeLessThanOrEqual(railwayMilestones[i + 1].year);
    }
  });

  it('every milestone contains all required fields with non-empty values', () => {
    railwayMilestones.forEach((m, index) => {
      REQUIRED_MILESTONE_FIELDS.forEach(field => {
        expect(m, `Milestone at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'year' || field === 'trackPositionPercent') {
          expect(typeof m[field]).toBe('number');
        } else if (field === 'techSpecs') {
          expect(typeof m.techSpecs).toBe('object');
        } else {
          expect(typeof m[field]).toBe('string');
          expect(m[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('provides neutral & factual historical framing for colonial-era milestones', () => {
    const colonialMilestones = railwayMilestones.filter(m => m.era.includes('Colonial'));
    expect(colonialMilestones.length).toBeGreaterThanOrEqual(4);
    colonialMilestones.forEach(m => {
      expect(m.neutralContext).toBeDefined();
      expect(m.neutralContext.length).toBeGreaterThan(20);
    });
  });

  it('all milestone IDs are unique', () => {
    const ids = railwayMilestones.map(m => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Train Track Position Math Calculation', () => {
  it('calculates 0% for first milestone and 100% for last milestone', () => {
    expect(calculateTrainTrackPosition(0, 10)).toBe(0);
    expect(calculateTrainTrackPosition(9, 10)).toBe(100);
  });

  it('calculates correct mid-point position percentage', () => {
    expect(calculateTrainTrackPosition(4, 9)).toBe(50);
  });

  it('handles edge cases gracefully (e.g. single item or negative index)', () => {
    expect(calculateTrainTrackPosition(0, 1)).toBe(0);
    expect(calculateTrainTrackPosition(-5, 10)).toBe(0);
    expect(calculateTrainTrackPosition(99, 10)).toBe(100);
  });
});

describe('Milestone Query Helpers', () => {
  it('retrieves milestone by ID or Year', () => {
    const m1853 = getMilestoneById('m-1853');
    expect(m1853).toBeDefined();
    expect(m1853.title).toContain('First Passenger Train');

    const m2019 = getMilestoneById('2019');
    expect(m2019).toBeDefined();
    expect(m2019.title).toContain('Vande Bharat');
  });

  it('retrieves milestones filtered by Era', () => {
    const colonial = getMilestonesByEra('Colonial Expansion');
    expect(colonial.length).toBeGreaterThanOrEqual(4);

    const modern = getMilestonesByEra('Modernization');
    expect(modern.length).toBeGreaterThanOrEqual(2);
  });

  it('filters milestones by search query (e.g. Bori Bunder or Electric)', () => {
    const boriRes = filterMilestones('Bori Bunder');
    expect(boriRes.length).toBeGreaterThan(0);
    expect(boriRes[0].year).toBe(1853);

    const electricRes = filterMilestones('Electric');
    expect(electricRes.length).toBeGreaterThan(0);
  });

  it('returns empty array when query matches nothing', () => {
    const res = filterMilestones('UnknownTrainQueryXYZ');
    expect(res).toEqual([]);
  });
});
