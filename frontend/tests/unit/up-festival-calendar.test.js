/**
 * up-festival-calendar.test.js
 * Unit tests for Uttar Pradesh Festival Calendar dataset integrity,
 * mandatory festivals coverage, month filters, city lookups, and search functions.
 */

import { describe, it, expect } from 'vitest';
import {
  festivals,
  months,
  getFestivalById,
  getFestivalsByMonth,
  getFestivalsByCity,
  filterFestivals
} from '../../frontend/up-festival-calendar/up-festival-calendar.js';

const REQUIRED_FESTIVAL_FIELDS = [
  'id',
  'name',
  'month',
  'monthIndex',
  'city',
  'locationCoords',
  'duration',
  'significance',
  'description',
  'rituals',
  'highlights',
  'icon',
  'imageBadge',
  'colorTheme'
];

const MANDATORY_FESTIVAL_IDS = [
  'dev_deepawali',
  'lathmar_holi',
  'ram_navami',
  'janmashtami',
  'ganga_mahotsav',
  'kumbh_mela',
  'magh_mela'
];

describe('UP Festival Calendar Dataset Integrity', () => {
  it('contains at least 12 festivals covering all 12 calendar months', () => {
    expect(festivals.length).toBeGreaterThanOrEqual(12);
  });

  it('contains all mandatory specified UP festivals', () => {
    const ids = festivals.map(f => f.id.toLowerCase());
    MANDATORY_FESTIVAL_IDS.forEach(expectedId => {
      expect(ids, `Missing mandatory festival ${expectedId}`).toContain(expectedId);
    });
  });

  it('every festival object contains all required fields with valid types', () => {
    festivals.forEach((f, index) => {
      REQUIRED_FESTIVAL_FIELDS.forEach(field => {
        expect(f, `Festival at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'rituals' || field === 'highlights') {
          expect(Array.isArray(f[field])).toBe(true);
          expect(f[field].length).toBeGreaterThan(0);
        } else if (field === 'monthIndex') {
          expect(typeof f.monthIndex).toBe('number');
          expect(f.monthIndex).toBeGreaterThanOrEqual(1);
          expect(f.monthIndex).toBeLessThanOrEqual(12);
        } else if (field === 'locationCoords') {
          expect(typeof f.locationCoords.x).toBe('number');
          expect(typeof f.locationCoords.y).toBe('number');
        } else {
          expect(typeof f[field]).toBe('string');
          expect(f[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all festival IDs are unique', () => {
    const ids = festivals.map(f => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Festival Query Helpers', () => {
  it('retrieves festival profile by ID or name', () => {
    const f1 = getFestivalById('dev_deepawali');
    expect(f1).toBeDefined();
    expect(f1.name).toContain('Dev Deepawali');
    expect(f1.city).toBe('Varanasi');

    const f2 = getFestivalById('Janmashtami');
    expect(f2).toBeDefined();
    expect(f2.id).toBe('janmashtami');
  });

  it('retrieves festivals occurring in a specific month by index or name', () => {
    const novFestivals = getFestivalsByMonth(11);
    expect(novFestivals.length).toBeGreaterThan(0);
    const ids = novFestivals.map(f => f.id);
    expect(ids).toContain('dev_deepawali');

    const marFestivals = getFestivalsByMonth('March');
    expect(marFestivals.length).toBeGreaterThan(0);
    expect(marFestivals[0].id).toBe('lathmar_holi');
  });

  it('retrieves festivals celebrated in a specific city', () => {
    const prayagrajFests = getFestivalsByCity('Prayagraj');
    expect(prayagrajFests.length).toBeGreaterThanOrEqual(2); // Magh Mela & Kumbh Mela
  });
});

describe('Search & Filter Helpers', () => {
  it('filters festivals by search query (e.g. Diyas or Barsana)', () => {
    const searchRes = filterFestivals('Diyas');
    expect(searchRes.length).toBeGreaterThan(0);
    expect(searchRes[0].id).toBe('dev_deepawali');
  });

  it('filters festivals by month and city combined', () => {
    const res = filterFestivals('', 'January', 'Prayagraj');
    expect(res.length).toBeGreaterThanOrEqual(2);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterFestivals('NonExistentFestivalXYZ');
    expect(res).toEqual([]);
  });
});
