/**
 * partition-1947.test.js
 * Unit tests for Scrollytelling: Partition of India, 1947 dataset integrity,
 * editorial neutrality verification, non-graphic content scanner, demographic statistics, and search helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  editorialNote,
  demographicStats,
  radcliffeRegions,
  partitionTimeline,
  getTimelineEventById,
  filterTimelineEvents,
  verifyNeutralityAndNonGraphicContent
} from '../../frontend/partition-1947/partition-1947.js';

const REQUIRED_TIMELINE_FIELDS = [
  'id',
  'date',
  'title',
  'phase',
  'description',
  'historicalSignificance'
];

describe('Editorial Framing & Neutrality Verification', () => {
  it('contains an official editorial note emphasizing factual & respectful framing', () => {
    expect(editorialNote).toBeDefined();
    expect(editorialNote.title).toContain('Editorial Note');
    expect(editorialNote.content).toContain('factual');
    expect(editorialNote.content).toContain('respectful');
  });

  it('scans all timeline content for absence of restricted graphic/sensational terms', () => {
    const check = verifyNeutralityAndNonGraphicContent(partitionTimeline);
    expect(check.isNeutral).toBe(true);
    expect(check.violations).toEqual([]);
  });
});

describe('Sourced Demographic & Migration Statistics', () => {
  it('contains verified population displacement figures', () => {
    expect(demographicStats.totalDisplaced).toContain('14');
    expect(demographicStats.totalDisplacedNumeric).toBeGreaterThan(10000000);
    expect(demographicStats.migratedToIndia).toContain('7.2');
    expect(demographicStats.migratedToPakistan).toContain('7.2');
  });

  it('provides official historical sources and census citations', () => {
    expect(Array.isArray(demographicStats.sources)).toBe(true);
    expect(demographicStats.sources.length).toBeGreaterThanOrEqual(3);
    const sourceText = demographicStats.sources.join(' ').toLowerCase();
    expect(sourceText).toContain('census of india 1951');
    expect(sourceText).toContain('unhcr');
  });
});

describe('Radcliffe Boundary Commission Regions', () => {
  it('covers Punjab and Bengal boundary commissions', () => {
    expect(radcliffeRegions.length).toBe(2);
    const names = radcliffeRegions.map(r => r.name.toLowerCase());
    expect(names.some(n => n.includes('punjab'))).toBe(true);
    expect(names.some(n => n.includes('bengal'))).toBe(true);
  });
});

describe('Timeline Events Dataset Integrity', () => {
  it('contains at least 7 verified chronological events', () => {
    expect(partitionTimeline.length).toBeGreaterThanOrEqual(7);
  });

  it('every timeline event contains required properties with valid text', () => {
    partitionTimeline.forEach((event, index) => {
      REQUIRED_TIMELINE_FIELDS.forEach(field => {
        expect(event, `Timeline event at index ${index} missing field ${field}`).toHaveProperty(field);
        expect(typeof event[field]).toBe('string');
        expect(event[field].trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('all timeline event IDs are unique', () => {
    const ids = partitionTimeline.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Timeline Query Helpers', () => {
  it('retrieves timeline event by ID or date', () => {
    const event = getTimelineEventById('t-1947-06');
    expect(event).toBeDefined();
    expect(event.title).toContain('Mountbatten Plan');

    const indEvent = getTimelineEventById('August 14–15, 1947');
    expect(indEvent).toBeDefined();
    expect(indEvent.title).toContain('Independence');
  });

  it('filters timeline events by search query (e.g. Radcliffe or Resettlement)', () => {
    const radcliffeRes = filterTimelineEvents('Radcliffe');
    expect(radcliffeRes.length).toBeGreaterThan(0);

    const pactRes = filterTimelineEvents('Nehru-Liaquat');
    expect(pactRes.length).toBeGreaterThan(0);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterTimelineEvents('NonExistentPartitionEventXYZ');
    expect(res).toEqual([]);
  });
});
