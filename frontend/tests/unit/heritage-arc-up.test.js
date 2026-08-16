import { describe, it, expect } from 'vitest';
import { HERITAGE_ARC_DATA, TIMELINE_DATA, renderCityDetails, renderTimeline } from '../../frontend/heritage-arc-up/script.js';

describe('UP Heritage Arc Explorer Logic', () => {
  it('should contain complete dataset for Agra, Lucknow, and Varanasi', () => {
    const keys = Object.keys(HERITAGE_ARC_DATA);
    expect(keys).toEqual(['agra', 'lucknow', 'varanasi']);

    keys.forEach(key => {
      const city = HERITAGE_ARC_DATA[key];
      expect(city).toHaveProperty('id');
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('tagline');
      expect(city).toHaveProperty('themeColor');
      expect(city).toHaveProperty('monuments');
      expect(Array.isArray(city.monuments)).toBe(true);
      expect(city.monuments.length).toBeGreaterThanOrEqual(4);
      expect(Array.isArray(city.cultureFood)).toBe(true);
    });
  });

  it('should render detailed HTML markup for selected city', () => {
    const agraHtml = renderCityDetails('agra');
    expect(agraHtml).toContain('Agra');
    expect(agraHtml).toContain('Taj Mahal');
    expect(agraHtml).toContain('Fatehpur Sikri');

    const lucknowHtml = renderCityDetails('lucknow');
    expect(lucknowHtml).toContain('Lucknow');
    expect(lucknowHtml).toContain('Bara Imambara');

    const varanasiHtml = renderCityDetails('varanasi');
    expect(varanasiHtml).toContain('Varanasi');
    expect(varanasiHtml).toContain('Kashi Vishwanath');
  });

  it('should return empty string for invalid city key', () => {
    expect(renderCityDetails('invalid-city')).toBe('');
  });

  it('should render complete historical timeline data', () => {
    expect(Array.isArray(TIMELINE_DATA)).toBe(true);
    expect(TIMELINE_DATA.length).toBe(4);

    const timelineHtml = renderTimeline();
    expect(timelineHtml).toContain('Spiritual Origins in Kashi & Sarnath');
    expect(timelineHtml).toContain('Architectural Zenith in Agra');
    expect(timelineHtml).toContain('Cultural Flowering of Lucknow');
  });
});
