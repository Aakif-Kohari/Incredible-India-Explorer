/**
 * language-diversity-map.test.js
 * Unit tests for Data Viz: Language Diversity Map (Animated Reveal) (#582).
 */

import { describe, it, expect } from 'vitest';
import {
  CENSUS_YEAR,
  LANGUAGE_REVEAL_LAYERS,
  CLASSICAL_LANGUAGES,
  validateLanguageData,
  getLanguagesUpToLayer,
  countAccumulatedLanguages
} from '../../frontend/language-diversity-map/script.js';

describe('Language Diversity Map Dataset Integrity (#582)', () => {
  it('notes official Census of India data year (2011)', () => {
    expect(CENSUS_YEAR).toBe(2011);
  });

  it('contains at least 3 progressive reveal layers', () => {
    expect(Array.isArray(LANGUAGE_REVEAL_LAYERS)).toBe(true);
    expect(LANGUAGE_REVEAL_LAYERS.length).toBeGreaterThanOrEqual(3);
  });

  it('validates language dataset structure across all layers', () => {
    const summary = validateLanguageData(LANGUAGE_REVEAL_LAYERS);
    expect(summary.isValid).toBe(true);
    expect(summary.errors).toEqual([]);
  });

  it('includes top 5 scheduled languages in Layer 1', () => {
    const layer1 = LANGUAGE_REVEAL_LAYERS[0];
    expect(layer1.languages.length).toBe(5);
    const names = layer1.languages.map(l => l.name);
    expect(names).toContain('Hindi');
    expect(names).toContain('Bengali');
    expect(names).toContain('Marathi');
    expect(names).toContain('Telugu');
    expect(names).toContain('Tamil');
  });

  it('ensures every language entry has speaker counts, script, family, and regions', () => {
    LANGUAGE_REVEAL_LAYERS.forEach(layer => {
      layer.languages.forEach(lang => {
        expect(lang).toHaveProperty('name');
        expect(lang).toHaveProperty('speakers');
        expect(lang).toHaveProperty('family');
        expect(lang).toHaveProperty('script');
        expect(lang).toHaveProperty('regions');
        expect(lang.regions.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Layer Accumulation & Reveal Logic', () => {
  it('accumulates 5 languages for Layer 1', () => {
    const layer1Langs = getLanguagesUpToLayer(1);
    expect(layer1Langs.length).toBe(5);
  });

  it('accumulates 12 languages for Layer 2 (5 + 7)', () => {
    const layer2Langs = getLanguagesUpToLayer(2);
    expect(layer2Langs.length).toBe(12);
  });

  it('accumulates 22 languages for Layer 3 (5 + 7 + 10)', () => {
    const layer3Langs = getLanguagesUpToLayer(3);
    expect(layer3Langs.length).toBe(22);
  });

  it('clamps layer boundaries to valid range 1-3', () => {
    expect(countAccumulatedLanguages(0)).toBe(5);
    expect(countAccumulatedLanguages(10)).toBe(22);
  });
});
