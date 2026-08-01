/**
 * ati-vishisht-seva-medal.test.js
 * Unit tests for Ati Vishisht Seva Medal Explorer dataset and module.
 * Validates history, eligibility, medal design, armed forces service, selection process, awardees, and timeline.
 */

import { describe, it, expect } from 'vitest';
import {
  AWARD_ENCYCLOPEDIA,
  getAwardDetailsByKey,
  searchAwardsAndRecipients,
  filterAwardsByCategory
} from '../../js-modules/national-awards.js';

describe("Ati Vishisht Seva Medal Explorer Dataset", () => {
  it("contains the 'ati-vishisht-seva-medal' dataset entry", () => {
    const entry = AWARD_ENCYCLOPEDIA['ati-vishisht-seva-medal'];
    expect(entry).toBeDefined();
    expect(entry.id).toBe('ati-vishisht-seva-medal');
    expect(entry.name).toContain('Ati Vishisht Seva Medal');
    expect(entry.category).toBe('gallantry');
    expect(entry.establishedYear).toBe('1960');
  });

  it("contains all required dataset sections (Eligibility, History, Medal Design, Winners, Facts)", () => {
    const award = getAwardDetailsByKey('ati-vishisht-seva-medal');
    expect(award).not.toBeNull();

    expect(award.eligibility).toBeTruthy();
    expect(award.history).toBeTruthy();
    expect(award.medalDesign).toBeTruthy();
    expect(Array.isArray(award.notableWinners)).toBe(true);
    expect(award.notableWinners.length).toBeGreaterThanOrEqual(4);
    expect(Array.isArray(award.interestingFacts)).toBe(true);
    expect(award.interestingFacts.length).toBeGreaterThanOrEqual(3);
  });

  it("includes notable military leaders across Army, Navy, and Air Force in dataset", () => {
    const award = getAwardDetailsByKey('ati-vishisht-seva-medal');
    const winnerNames = award.notableWinners.map(w => w.name);
    
    expect(winnerNames.some(n => n.includes('Bipin Rawat'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Manoj Pande'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Karambir Singh'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Bhadauria'))).toBe(true);
  });

  it("searches and filters Ati Vishisht Seva Medal accurately", () => {
    const searchResult = searchAwardsAndRecipients('Ati Vishisht Seva Medal');
    expect(searchResult.length).toBeGreaterThanOrEqual(1);
    expect(searchResult.some(a => a.id === 'ati-vishisht-seva-medal')).toBe(true);

    const winnerResult = searchAwardsAndRecipients('Manoj Pande');
    expect(winnerResult.length).toBeGreaterThanOrEqual(1);
    expect(winnerResult[0].id).toBe('ati-vishisht-seva-medal');

    const gallantryAwards = filterAwardsByCategory('gallantry');
    expect(gallantryAwards.some(a => a.id === 'ati-vishisht-seva-medal')).toBe(true);
  });
});
