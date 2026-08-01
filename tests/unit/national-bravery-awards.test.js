/**
 * national-bravery-awards.test.js
 * Unit tests for National Bravery Awards Explorer dataset and module.
 * Validates history, purpose, eligibility, award categories, selection process, famous recipients, timeline, and gallery.
 */

import { describe, it, expect } from 'vitest';
import {
  AWARD_ENCYCLOPEDIA,
  getAwardDetailsByKey,
  searchAwardsAndRecipients,
  filterAwardsByCategory
} from '../../js-modules/national-awards.js';

describe("National Bravery Awards Explorer Dataset", () => {
  it("contains the 'national-bravery-awards' dataset entry", () => {
    const entry = AWARD_ENCYCLOPEDIA['national-bravery-awards'];
    expect(entry).toBeDefined();
    expect(entry.id).toBe('national-bravery-awards');
    expect(entry.name).toContain('National Bravery Awards');
    expect(entry.category).toBe('children');
    expect(entry.establishedYear).toBe('1957');
  });

  it("contains all required dataset sections (Eligibility, History, Medal Design, Winners, Facts)", () => {
    const award = getAwardDetailsByKey('national-bravery-awards');
    expect(award).not.toBeNull();

    expect(award.eligibility).toBeTruthy();
    expect(award.history).toBeTruthy();
    expect(award.medalDesign).toBeTruthy();
    expect(Array.isArray(award.notableWinners)).toBe(true);
    expect(award.notableWinners.length).toBeGreaterThanOrEqual(4);
    expect(Array.isArray(award.interestingFacts)).toBe(true);
    expect(award.interestingFacts.length).toBeGreaterThanOrEqual(3);
  });

  it("includes famous child heroes in dataset", () => {
    const award = getAwardDetailsByKey('national-bravery-awards');
    const winnerNames = award.notableWinners.map(w => w.name);
    
    expect(winnerNames.some(n => n.includes('Harish Chandra Mehra'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Geeta Chopra'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Resham Fatima'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Zen Gunratan Sadavarte'))).toBe(true);
  });

  it("searches and filters National Bravery Awards accurately", () => {
    const searchResult = searchAwardsAndRecipients('National Bravery Awards');
    expect(searchResult.length).toBeGreaterThanOrEqual(1);
    expect(searchResult.some(a => a.id === 'national-bravery-awards')).toBe(true);

    const winnerResult = searchAwardsAndRecipients('Harish Chandra Mehra');
    expect(winnerResult.length).toBeGreaterThanOrEqual(1);
    expect(winnerResult[0].id).toBe('national-bravery-awards');

    const childrenAwards = filterAwardsByCategory('children');
    expect(childrenAwards.some(a => a.id === 'national-bravery-awards')).toBe(true);
  });
});
