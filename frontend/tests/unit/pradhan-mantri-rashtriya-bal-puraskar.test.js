/**
 * pradhan-mantri-rashtriya-bal-puraskar.test.js
 * Unit tests for Pradhan Mantri Rashtriya Bal Puraskar Explorer dataset and module.
 * Validates history, categories, eligibility, selection process, ceremony, winners, timeline, and facts.
 */

import { describe, it, expect } from 'vitest';
import {
  AWARD_ENCYCLOPEDIA,
  getAwardDetailsByKey,
  searchAwardsAndRecipients,
  filterAwardsByCategory
} from '../../frontend/js-modules/national-awards.js';

describe("Pradhan Mantri Rashtriya Bal Puraskar Explorer Dataset", () => {
  it("contains the 'pradhan-mantri-rashtriya-bal-puraskar' dataset entry", () => {
    const entry = AWARD_ENCYCLOPEDIA['pradhan-mantri-rashtriya-bal-puraskar'];
    expect(entry).toBeDefined();
    expect(entry.id).toBe('pradhan-mantri-rashtriya-bal-puraskar');
    expect(entry.name).toContain('Pradhan Mantri Rashtriya Bal Puraskar');
    expect(entry.category).toBe('children');
    expect(entry.establishedYear).toBe('1996');
  });

  it("contains all required dataset sections (Eligibility, History, Medal Design, Winners, Facts)", () => {
    const award = getAwardDetailsByKey('pradhan-mantri-rashtriya-bal-puraskar');
    expect(award).not.toBeNull();

    expect(award.eligibility).toBeTruthy();
    expect(award.history).toBeTruthy();
    expect(award.medalDesign).toBeTruthy();
    expect(Array.isArray(award.notableWinners)).toBe(true);
    expect(award.notableWinners.length).toBeGreaterThanOrEqual(4);
    expect(Array.isArray(award.interestingFacts)).toBe(true);
    expect(award.interestingFacts.length).toBeGreaterThanOrEqual(3);
  });

  it("includes notable child achievers in dataset", () => {
    const award = getAwardDetailsByKey('pradhan-mantri-rashtriya-bal-puraskar');
    const winnerNames = award.notableWinners.map(w => w.name);
    
    expect(winnerNames.some(n => n.includes('Prasiddhi Singh'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Gitanjali Rao'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Vyom Ahuja'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Anand Krishna Mishra'))).toBe(true);
  });

  it("searches and filters Pradhan Mantri Rashtriya Bal Puraskar accurately", () => {
    const searchResult = searchAwardsAndRecipients('Pradhan Mantri Rashtriya Bal Puraskar');
    expect(searchResult.length).toBeGreaterThanOrEqual(1);
    expect(searchResult.some(a => a.id === 'pradhan-mantri-rashtriya-bal-puraskar')).toBe(true);

    const winnerResult = searchAwardsAndRecipients('Gitanjali Rao');
    expect(winnerResult.length).toBeGreaterThanOrEqual(1);
    expect(winnerResult[0].id).toBe('pradhan-mantri-rashtriya-bal-puraskar');

    const childrenAwards = filterAwardsByCategory('children');
    expect(childrenAwards.some(a => a.id === 'pradhan-mantri-rashtriya-bal-puraskar')).toBe(true);
  });
});
