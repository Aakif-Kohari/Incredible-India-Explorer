/**
 * national-awards.test.js
 * Unit tests for Indian National Awards Explorer module.
 * Validates dataset completeness across Civilian, Gallantry, Sports, and Literature awards,
 * ensuring all 5 required sections (Eligibility, History, Medal design, Winners, Interesting facts) are present.
 */

import { describe, it, expect } from 'vitest';
import {
  AWARD_ENCYCLOPEDIA,
  filterAwardsByCategory,
  searchAwardsAndRecipients,
  getAwardDetailsByKey
} from '../../js-modules/national-awards.js';

describe('National Awards Encyclopedia Dataset Completeness', () => {
  it('contains entries for all required Civilian, Gallantry, Sports, and Literature awards', () => {
    const keys = Object.keys(AWARD_ENCYCLOPEDIA);

    // Civilian Awards
    expect(keys).toContain('bharat-ratna');
    expect(keys).toContain('padma-vibhushan');
    expect(keys).toContain('padma-bhushan');
    expect(keys).toContain('padma-shri');

    // Gallantry Awards
    expect(keys).toContain('param-vir-chakra');
    expect(keys).toContain('maha-vir-chakra');
    expect(keys).toContain('vir-chakra');
    expect(keys).toContain('ashoka-chakra');
    expect(keys).toContain('kirti-chakra');
    expect(keys).toContain('shaurya-chakra');

    // Sports Awards
    expect(keys).toContain('khel-ratna');
    expect(keys).toContain('arjuna-award');
    expect(keys).toContain('dronacharya-award');

    // Literature Awards
    expect(keys).toContain('jnanpith-award');
    expect(keys).toContain('sahitya-akademi-award');
    // Children Awards
    expect(keys).toContain('national-bravery-awards');
  });

  it('every award entry contains all 5 required sections (Eligibility, History, Medal design, Winners, Interesting facts)', () => {
    Object.values(AWARD_ENCYCLOPEDIA).forEach(award => {
      expect(award, `Award ${award.name} missing id`).toHaveProperty('id');
      expect(award, `Award ${award.name} missing name`).toHaveProperty('name');
      expect(award, `Award ${award.name} missing category`).toHaveProperty('category');
      expect(award, `Award ${award.name} missing eligibility`).toHaveProperty('eligibility');
      expect(award, `Award ${award.name} missing history`).toHaveProperty('history');
      expect(award, `Award ${award.name} missing medalDesign`).toHaveProperty('medalDesign');
      expect(award, `Award ${award.name} missing notableWinners`).toHaveProperty('notableWinners');
      expect(award, `Award ${award.name} missing interestingFacts`).toHaveProperty('interestingFacts');

      // Validate string lengths & array items
      expect(award.eligibility.trim().length).toBeGreaterThan(15);
      expect(award.history.trim().length).toBeGreaterThan(15);
      expect(award.medalDesign.trim().length).toBeGreaterThan(15);
      expect(Array.isArray(award.notableWinners)).toBe(true);
      expect(award.notableWinners.length).toBeGreaterThan(0);
      expect(Array.isArray(award.interestingFacts)).toBe(true);
      expect(award.interestingFacts.length).toBeGreaterThan(0);
    });
  });

  it('maintains non-partisan, neutral, and educational tone', () => {
    const prohibitedWords = ['corrupt', 'worthless', 'scam', 'fraudulent'];
    Object.values(AWARD_ENCYCLOPEDIA).forEach(award => {
      const fullText = `${award.name} ${award.eligibility} ${award.history} ${award.medalDesign}`.toLowerCase();
      prohibitedWords.forEach(w => {
        expect(fullText).not.toContain(w);
      });
    });
  });
});

describe('National Awards Helper & Filter Logic', () => {
  it('filters awards correctly by category', () => {
    const civilian = filterAwardsByCategory('civilian');
    expect(civilian.length).toBe(4);
    civilian.forEach(a => expect(a.category).toBe('civilian'));

    const gallantry = filterAwardsByCategory('gallantry');
    expect(gallantry.length).toBe(6);
    gallantry.forEach(a => expect(a.category).toBe('gallantry'));

    const sports = filterAwardsByCategory('sports');
    expect(sports.length).toBe(3);
    sports.forEach(a => expect(a.category).toBe('sports'));

    const literature = filterAwardsByCategory('literature');
    expect(literature.length).toBe(2);
    literature.forEach(a => expect(a.category).toBe('literature'));
  });

  it('searches awards and recipient names accurately', () => {
    const paramSearch = searchAwardsAndRecipients('Param Vir Chakra');
    expect(paramSearch.length).toBeGreaterThanOrEqual(1);
    expect(paramSearch[0].id).toBe('param-vir-chakra');

    const winnerSearch = searchAwardsAndRecipients('Vikram Batra');
    expect(winnerSearch.length).toBeGreaterThanOrEqual(1);
    expect(winnerSearch[0].id).toBe('param-vir-chakra');

    const jnanpithSearch = searchAwardsAndRecipients('Jnanpith');
    expect(jnanpithSearch.length).toBeGreaterThanOrEqual(1);
    expect(jnanpithSearch[0].id).toBe('jnanpith-award');
  });

  it('retrieves single award details by key correctly', () => {
    const ratna = getAwardDetailsByKey('bharat-ratna');
    expect(ratna).not.toBeNull();
    expect(ratna.name).toBe('Bharat Ratna');

    const nonexistent = getAwardDetailsByKey('unknown-award');
    expect(nonexistent).toBeNull();
  });
});
