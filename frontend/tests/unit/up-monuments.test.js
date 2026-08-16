/**
 * up-monuments.test.js
 * Unit tests for Famous Monuments Explorer dataset integrity,
 * coverage of mandatory monuments, historical era filters, and search functions.
 */

import { describe, it, expect } from 'vitest';
import {
  monuments,
  monumentEras,
  getMonumentById,
  getMonumentsByEra,
  getMonumentsByCity,
  filterMonuments
} from '../../frontend/up-monuments/up-monuments.js';

const REQUIRED_MONUMENT_FIELDS = [
  'id',
  'name',
  'city',
  'builtYear',
  'builtBy',
  'era',
  'style',
  'materials',
  'unesco',
  'icon',
  'description',
  'architectureDetails',
  'galleryImages'
];

const MANDATORY_MONUMENT_IDS = [
  'taj_mahal',
  'agra_fort',
  'fatehpur_sikri',
  'bara_imambara',
  'chota_imambara',
  'rumi_darwaza',
  'jhansi_fort'
];

describe('Famous Monuments Dataset Integrity', () => {
  it('contains at least 7 iconic Uttar Pradesh monuments', () => {
    expect(monuments.length).toBeGreaterThanOrEqual(7);
  });

  it('contains all 7 mandatory specified monuments', () => {
    const ids = monuments.map(m => m.id.toLowerCase());
    MANDATORY_MONUMENT_IDS.forEach(expectedId => {
      expect(ids, `Missing mandatory monument ${expectedId}`).toContain(expectedId);
    });
  });

  it('every monument object contains all required fields with valid types', () => {
    monuments.forEach((m, index) => {
      REQUIRED_MONUMENT_FIELDS.forEach(field => {
        expect(m, `Monument at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'unesco') {
          expect(typeof m.unesco).toBe('boolean');
        } else if (field === 'architectureDetails') {
          expect(typeof m.architectureDetails).toBe('object');
          expect(m.architectureDetails).toHaveProperty('keyStructures');
          expect(Array.isArray(m.architectureDetails.keyStructures)).toBe(true);
        } else if (field === 'galleryImages') {
          expect(Array.isArray(m.galleryImages)).toBe(true);
          expect(m.galleryImages.length).toBeGreaterThan(0);
        } else {
          expect(typeof m[field]).toBe('string');
          expect(m[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all monument IDs are unique', () => {
    const ids = monuments.map(m => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Monument Query Helpers', () => {
  it('retrieves monument profile by ID or name', () => {
    const taj = getMonumentById('taj_mahal');
    expect(taj).toBeDefined();
    expect(taj.name).toBe('Taj Mahal');
    expect(taj.city).toBe('Agra');

    const imambara = getMonumentById('Bara Imambara');
    expect(imambara).toBeDefined();
    expect(imambara.id).toBe('bara_imambara');
  });

  it('retrieves monuments filtered by historical era', () => {
    const mughalMonuments = getMonumentsByEra('Mughal Era');
    expect(mughalMonuments.length).toBeGreaterThanOrEqual(3);
    const ids = mughalMonuments.map(m => m.id);
    expect(ids).toContain('taj_mahal');
    expect(ids).toContain('agra_fort');

    const awadhiMonuments = getMonumentsByEra('Awadhi');
    expect(awadhiMonuments.length).toBeGreaterThanOrEqual(3);
  });

  it('retrieves monuments filtered by city', () => {
    const agraMonuments = getMonumentsByCity('Agra');
    expect(agraMonuments.length).toBeGreaterThanOrEqual(3);

    const lucknowMonuments = getMonumentsByCity('Lucknow');
    expect(lucknowMonuments.length).toBeGreaterThanOrEqual(3);
  });
});

describe('Search & Filter Helpers', () => {
  it('filters monuments by search query (e.g. Shah Jahan or Bhool Bhulaiya)', () => {
    const searchRes1 = filterMonuments('Shah Jahan');
    expect(searchRes1.length).toBeGreaterThan(0);
    expect(searchRes1[0].id).toBe('taj_mahal');

    const searchRes2 = filterMonuments('Bhool Bhulaiya');
    expect(searchRes2.length).toBeGreaterThan(0);
    expect(searchRes2[0].id).toBe('bara_imambara');
  });

  it('filters monuments by era and city combined', () => {
    const res = filterMonuments('', 'Mughal', 'Agra');
    expect(res.length).toBeGreaterThanOrEqual(3);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterMonuments('NonExistentMonumentXYZ');
    expect(res).toEqual([]);
  });
});
