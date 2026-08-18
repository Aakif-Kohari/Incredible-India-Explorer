/**
 * ragas-time-explainer.test.js
 * Unit tests for How Indian Classical Ragas Work (Time-of-Day Theory) dataset integrity,
 * prahars clock calculations, raga time associations (>=5 ragas), original text verification, and search filters.
 */

import { describe, it, expect } from 'vitest';
import {
  prahars,
  musicologyPillars,
  ragas,
  getRagaById,
  getRagasByPrahar,
  calculateClockAngle,
  filterRagas
} from '../../frontend/ragas-time-explainer/ragas-time-explainer.js';

const REQUIRED_RAGA_FIELDS = [
  'id',
  'name',
  'praharId',
  'timePeriod',
  'thaat',
  'vadi',
  'samvadi',
  'moodRasa',
  'swaraStructure',
  'textDescription',
  'icon'
];

describe('Samaya Chakra & Prahars Clock Math', () => {
  it('contains 8 Prahars spanning the full 24-hour solar cycle', () => {
    expect(prahars.length).toBe(8);
  });

  it('calculates correct clock angles for 8 Prahars', () => {
    expect(calculateClockAngle(0, 8)).toBe(0);
    expect(calculateClockAngle(2, 8)).toBe(90);
    expect(calculateClockAngle(4, 8)).toBe(180);
    expect(calculateClockAngle(6, 8)).toBe(270);
  });
});

describe('Ragas Dataset Integrity & Time-of-Day Associations', () => {
  it('contains at least 5 sourced ragas with time associations (contains 6)', () => {
    expect(ragas.length).toBeGreaterThanOrEqual(5);
  });

  it('every raga contains required fields with valid musicological text', () => {
    ragas.forEach((raga, index) => {
      REQUIRED_RAGA_FIELDS.forEach(field => {
        expect(raga, `Raga at index ${index} missing field ${field}`).toHaveProperty(field);
        expect(typeof raga[field]).toBe('string');
        expect(raga[field].trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('all raga IDs are unique', () => {
    const ids = ragas.map(r => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('relies strictly on original text descriptions (no copyrighted audio/notation URLs)', () => {
    ragas.forEach(raga => {
      expect(raga.textDescription).toBeDefined();
      expect(raga.textDescription.length).toBeGreaterThan(20);
      // Ensure no external MP3/WAV links are used
      expect(raga.textDescription.toLowerCase()).not.toContain('.mp3');
      expect(raga.textDescription.toLowerCase()).not.toContain('.wav');
    });
  });
});

describe('Raga Query & Filter Helpers', () => {
  it('retrieves raga profile by ID or name', () => {
    const bhairav = getRagaById('raga-bhairav');
    expect(bhairav).toBeDefined();
    expect(bhairav.name).toBe('Raga Bhairav');

    const yaman = getRagaById('Yaman');
    expect(yaman).toBeDefined();
    expect(yaman.id).toBe('raga-yaman');
  });

  it('retrieves ragas by Prahar ID', () => {
    const morningRagas = getRagasByPrahar('p1');
    expect(morningRagas.length).toBeGreaterThan(0);
    expect(morningRagas[0].id).toBe('raga-bhairav');

    const duskRagas = getRagasByPrahar('p5');
    expect(duskRagas.length).toBeGreaterThan(0);
    expect(duskRagas[0].id).toBe('raga-yaman');
  });

  it('filters ragas by search query (e.g. Komal Re or Midnight)', () => {
    const searchRes = filterRagas('Komal Re');
    expect(searchRes.length).toBeGreaterThan(0);

    const midnightRes = filterRagas('Midnight');
    expect(midnightRes.length).toBeGreaterThan(0);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterRagas('NonExistentRagaXYZ');
    expect(res).toEqual([]);
  });
});
