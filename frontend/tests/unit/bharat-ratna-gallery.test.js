/**
 * bharat-ratna-gallery.test.js
 * Unit tests for Bharat Ratna Interactive Gallery module.
 * Validates dataset completeness, required properties (portrait, year, contribution, category),
 * non-partisan framing, filtering algorithms, and statistics helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  BHARAT_RATNA_RECIPIENTS,
  filterRecipients,
  getBharatRatnaStats
} from '../../frontend/bharat-ratna-gallery/bharat-ratna-gallery.js';

describe('Bharat Ratna Recipients Dataset Integrity', () => {
  it('contains comprehensive recipient records from 1954 to 2024', () => {
    expect(BHARAT_RATNA_RECIPIENTS.length).toBeGreaterThanOrEqual(45);

    const years = BHARAT_RATNA_RECIPIENTS.map(r => r.year);
    expect(Math.min(...years)).toBe(1954);
    expect(Math.max(...years)).toBe(2024);
  });

  it('every recipient contains required properties (id, name, year, decade, category, portrait, contribution, biography)', () => {
    BHARAT_RATNA_RECIPIENTS.forEach((r, idx) => {
      expect(r, `Recipient at index ${idx} missing id`).toHaveProperty('id');
      expect(r, `Recipient at index ${idx} missing name`).toHaveProperty('name');
      expect(r, `Recipient at index ${idx} missing year`).toHaveProperty('year');
      expect(r, `Recipient at index ${idx} missing decade`).toHaveProperty('decade');
      expect(r, `Recipient at index ${idx} missing category`).toHaveProperty('category');
      expect(r, `Recipient at index ${idx} missing portrait`).toHaveProperty('portrait');
      expect(r, `Recipient at index ${idx} missing contribution`).toHaveProperty('contribution');
      expect(r, `Recipient at index ${idx} missing biography`).toHaveProperty('biography');
      expect(r, `Recipient at index ${idx} missing posthumous`).toHaveProperty('posthumous');

      expect(typeof r.name).toBe('string');
      expect(r.name.trim().length).toBeGreaterThan(0);
      expect(typeof r.contribution).toBe('string');
      expect(r.contribution.trim().length).toBeGreaterThan(0);
      expect(typeof r.portrait).toBe('string');
      expect(r.portrait.trim().length).toBeGreaterThan(0);
    });
  });

  it('maintains objective, neutral, and educational tone', () => {
    const prohibitedWords = ['corrupt', 'fraudulent', 'useless', 'illegal'];
    BHARAT_RATNA_RECIPIENTS.forEach(r => {
      const text = `${r.name} ${r.contribution} ${r.biography}`.toLowerCase();
      prohibitedWords.forEach(w => {
        expect(text).not.toContain(w);
      });
    });
  });
});

describe('Bharat Ratna Gallery Helper Functions', () => {
  it('filters recipients by category correctly', () => {
    const science = filterRecipients(BHARAT_RATNA_RECIPIENTS, 'Science & Tech', 'all', '');
    expect(science.length).toBeGreaterThan(0);
    science.forEach(r => expect(r.category).toBe('Science & Tech'));

    const sports = filterRecipients(BHARAT_RATNA_RECIPIENTS, 'Sports', 'all', '');
    expect(sports.length).toBe(1);
    expect(sports[0].name).toBe('Sachin Tendulkar');
  });

  it('filters recipients by decade correctly', () => {
    const fifties = filterRecipients(BHARAT_RATNA_RECIPIENTS, 'all', '1950s', '');
    expect(fifties.length).toBeGreaterThan(0);
    fifties.forEach(r => expect(r.decade).toBe('1950s'));

    const twenties = filterRecipients(BHARAT_RATNA_RECIPIENTS, 'all', '2020s', '');
    expect(twenties.length).toBe(5);
    twenties.forEach(r => expect(r.decade).toBe('2020s'));
  });

  it('searches recipients by keyword query', () => {
    const kalam = filterRecipients(BHARAT_RATNA_RECIPIENTS, 'all', 'all', 'Abdul Kalam');
    expect(kalam.length).toBe(1);
    expect(kalam[0].name).toContain('Abdul Kalam');

    const mangeshkar = filterRecipients(BHARAT_RATNA_RECIPIENTS, 'all', 'all', 'Mangeshkar');
    expect(mangeshkar.length).toBe(1);
    expect(mangeshkar[0].name).toContain('Lata Mangeshkar');
  });

  it('calculates dashboard summary statistics accurately', () => {
    const stats = getBharatRatnaStats(BHARAT_RATNA_RECIPIENTS);
    expect(stats.totalRecipients).toBeGreaterThanOrEqual(45);
    expect(stats.firstAwardYear).toBe(1954);
    expect(stats.latestAwardYear).toBe(2024);
    expect(stats.posthumousCount).toBeGreaterThan(0);
  });
});
