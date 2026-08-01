/**
 * presidents-police-medal.test.js
 * Unit tests for President's Police Medal Explorer dataset and module.
 * Validates history, eligibility, medal design, categories, selection process, notable recipients, and facts.
 */

import { describe, it, expect } from 'vitest';
import {
  AWARD_ENCYCLOPEDIA,
  getAwardDetailsByKey,
  searchAwardsAndRecipients,
  filterAwardsByCategory
} from '../../js-modules/national-awards.js';

describe("President's Police Medal Explorer Dataset", () => {
  it("contains the 'presidents-police-medal' dataset entry", () => {
    const entry = AWARD_ENCYCLOPEDIA['presidents-police-medal'];
    expect(entry).toBeDefined();
    expect(entry.id).toBe('presidents-police-medal');
    expect(entry.name).toContain("President's Police Medal");
    expect(entry.category).toBe('gallantry');
    expect(entry.establishedYear).toBe('1951');
  });

  it("contains all required dataset sections (Eligibility, History, Medal Design, Winners, Facts)", () => {
    const award = getAwardDetailsByKey('presidents-police-medal');
    expect(award).not.toBeNull();

    expect(award.eligibility).toBeTruthy();
    expect(award.history).toBeTruthy();
    expect(award.medalDesign).toBeTruthy();
    expect(Array.isArray(award.notableWinners)).toBe(true);
    expect(award.notableWinners.length).toBeGreaterThanOrEqual(4);
    expect(Array.isArray(award.interestingFacts)).toBe(true);
    expect(award.interestingFacts.length).toBeGreaterThanOrEqual(3);
  });

  it("includes notable police leaders and hero recipients in dataset", () => {
    const award = getAwardDetailsByKey('presidents-police-medal');
    const winnerNames = award.notableWinners.map(w => w.name);
    
    expect(winnerNames.some(n => n.includes('Ajit Doval'))).toBe(true);
    expect(winnerNames.some(n => n.includes('K. P. S. Gill'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Hemant Karkare'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Tukaram Omble'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Kiran Bedi'))).toBe(true);
  });

  it("searches and filters President's Police Medal accurately", () => {
    const searchResult = searchAwardsAndRecipients('President\'s Police Medal');
    expect(searchResult.length).toBeGreaterThanOrEqual(1);
    expect(searchResult.some(a => a.id === 'presidents-police-medal')).toBe(true);

    const winnerResult = searchAwardsAndRecipients('Tukaram Omble');
    expect(winnerResult.length).toBeGreaterThanOrEqual(1);
    expect(winnerResult[0].id).toBe('presidents-police-medal');

    const gallantryAwards = filterAwardsByCategory('gallantry');
    expect(gallantryAwards.some(a => a.id === 'presidents-police-medal')).toBe(true);
  });
});
