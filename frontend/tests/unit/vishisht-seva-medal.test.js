/**
 * vishisht-seva-medal.test.js
 * Unit tests for Vishisht Seva Medal Explorer dataset and module.
 * Validates history, eligibility, medal design, distinguished service, selection process, awardees, and timeline.
 */

import { describe, it, expect } from 'vitest';
import {
  AWARD_ENCYCLOPEDIA,
  getAwardDetailsByKey,
  searchAwardsAndRecipients,
  filterAwardsByCategory
} from '../../frontend/js-modules/national-awards.js';

describe("Vishisht Seva Medal Explorer Dataset", () => {
  it("contains the 'vishisht-seva-medal' dataset entry", () => {
    const entry = AWARD_ENCYCLOPEDIA['vishisht-seva-medal'];
    expect(entry).toBeDefined();
    expect(entry.id).toBe('vishisht-seva-medal');
    expect(entry.name).toContain('Vishisht Seva Medal');
    expect(entry.category).toBe('gallantry');
    expect(entry.establishedYear).toBe('1960');
  });

  it("contains all required dataset sections (Eligibility, History, Medal Design, Winners, Facts)", () => {
    const award = getAwardDetailsByKey('vishisht-seva-medal');
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
    const award = getAwardDetailsByKey('vishisht-seva-medal');
    const winnerNames = award.notableWinners.map(w => w.name);
    
    expect(winnerNames.some(n => n.includes('Naravane'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Rodrigues'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Dhanoa'))).toBe(true);
    expect(winnerNames.some(n => n.includes('Cardozo'))).toBe(true);
  });

  it("searches and filters Vishisht Seva Medal accurately", () => {
    const searchResult = searchAwardsAndRecipients('Vishisht Seva Medal');
    expect(searchResult.length).toBeGreaterThanOrEqual(1);
    expect(searchResult.some(a => a.id === 'vishisht-seva-medal')).toBe(true);

    const winnerResult = searchAwardsAndRecipients('Cardozo');
    expect(winnerResult.length).toBeGreaterThanOrEqual(1);
    expect(winnerResult[0].id).toBe('vishisht-seva-medal');

    const gallantryAwards = filterAwardsByCategory('gallantry');
    expect(gallantryAwards.some(a => a.id === 'vishisht-seva-medal')).toBe(true);
  });
});
