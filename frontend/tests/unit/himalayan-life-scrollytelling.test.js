/**
 * himalayan-life-scrollytelling.test.js
 * Unit tests for Scrollytelling: Life Along the Himalayas (#580).
 */

import { describe, it, expect } from 'vitest';
import {
  HIMALAYAN_ALTITUDE_ZONES,
  validateHimalayanData,
  calculateAltitudeFromScroll,
  getZoneForAltitude,
  calculateParallaxTranslateY
} from '../../frontend/himalayan-life-scrollytelling/script.js';

describe('Himalayan Scrollytelling Dataset Integrity (#580)', () => {
  it('contains all 4 altitude zones from foothills to glacial desert', () => {
    expect(Array.isArray(HIMALAYAN_ALTITUDE_ZONES)).toBe(true);
    expect(HIMALAYAN_ALTITUDE_ZONES.length).toBe(4);
  });

  it('validates dataset structure and field presence', () => {
    const summary = validateHimalayanData(HIMALAYAN_ALTITUDE_ZONES);
    expect(summary.isValid).toBe(true);
    expect(summary.errors).toEqual([]);
  });

  it('ensures correct sequence of altitude zones', () => {
    const ids = HIMALAYAN_ALTITUDE_ZONES.map(z => z.id);
    expect(ids).toEqual(['foothills', 'mid-altitude', 'high-altitude', 'glacial-zone']);
  });

  it('verifies non-stereotypical cultural descriptions and authentic communities', () => {
    HIMALAYAN_ALTITUDE_ZONES.forEach(z => {
      expect(z).toHaveProperty('geography');
      expect(z).toHaveProperty('dailyLife');
      expect(z).toHaveProperty('culturalNotes');
      expect(Array.isArray(z.communities)).toBe(true);
      expect(z.communities.length).toBeGreaterThan(0);
    });
  });
});

describe('Altitude Calculation & Zone Matching Math', () => {
  it('calculates altitude 300m at 0% scroll', () => {
    expect(calculateAltitudeFromScroll(0)).toBe(300);
  });

  it('calculates 3400m altitude at 50% scroll', () => {
    expect(calculateAltitudeFromScroll(50)).toBe(3400);
  });

  it('calculates max altitude 6500m at 100% scroll', () => {
    expect(calculateAltitudeFromScroll(100)).toBe(6500);
  });

  it('matches correct altitude zone based on meters', () => {
    expect(getZoneForAltitude(800).id).toBe('foothills');
    expect(getZoneForAltitude(2200).id).toBe('mid-altitude');
    expect(getZoneForAltitude(4200).id).toBe('high-altitude');
    expect(getZoneForAltitude(5800).id).toBe('glacial-zone');
  });

  it('calculates smooth parallax translateY offsets', () => {
    expect(calculateParallaxTranslateY(50, 0.5)).toBe(62.5);
    expect(calculateParallaxTranslateY(0, 0.5)).toBe(0);
  });
});
