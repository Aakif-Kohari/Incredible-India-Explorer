/**
 * union-territory-sorter.test.js
 * Unit tests for Union Territory Sorter dataset validation (28 states + 8 UTs),
 * classification checking, shuffling, and score calculation.
 */

import { describe, it, expect } from 'vitest';
import {
  REGIONS_DATASET,
  validateDataset,
  checkClassification,
  shuffleDataset,
  calculateSorterScore
} from '../../frontend/union-territory-sorter/union-territory-sorter.js';

describe('Union Territory Sorter Dataset Integrity', () => {
  it('contains exactly 36 regions in total', () => {
    expect(REGIONS_DATASET.length).toBe(36);
  });

  it('validates exactly 28 states and 8 union territories', () => {
    const summary = validateDataset(REGIONS_DATASET);
    expect(summary.isValid).toBe(true);
    expect(summary.statesCount).toBe(28);
    expect(summary.utCount).toBe(8);
    expect(summary.totalCount).toBe(36);
    expect(summary.duplicateIds).toEqual([]);
  });

  it('every entry has non-empty required fields (id, name, type, capital, info)', () => {
    REGIONS_DATASET.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('capital');
      expect(item).toHaveProperty('info');

      expect(typeof item.id).toBe('string');
      expect(typeof item.name).toBe('string');
      expect(typeof item.capital).toBe('string');
      expect(typeof item.info).toBe('string');
      expect(['state', 'ut']).toContain(item.type);

      expect(item.id.trim().length).toBeGreaterThan(0);
      expect(item.name.trim().length).toBeGreaterThan(0);
      expect(item.capital.trim().length).toBeGreaterThan(0);
    });
  });

  it('all 8 Union Territories are correctly cataloged', () => {
    const expectedUtIds = ['AN', 'CH', 'DH', 'DL', 'JK', 'LA', 'LD', 'PY'];
    const actualUtIds = REGIONS_DATASET.filter(r => r.type === 'ut').map(r => r.id);

    expect(actualUtIds.length).toBe(8);
    expectedUtIds.forEach(utId => {
      expect(actualUtIds).toContain(utId);
    });
  });
});

describe('Classification Logic', () => {
  it('correctly classifies Jammu and Kashmir as a Union Territory', () => {
    const resCorrect = checkClassification('JK', 'ut');
    expect(resCorrect.isValidRegion).toBe(true);
    expect(resCorrect.isCorrect).toBe(true);
    expect(resCorrect.expectedType).toBe('ut');

    const resWrong = checkClassification('JK', 'state');
    expect(resWrong.isCorrect).toBe(false);
  });

  it('correctly classifies Maharashtra as a State', () => {
    const resCorrect = checkClassification('MH', 'state');
    expect(resCorrect.isCorrect).toBe(true);
    expect(resCorrect.expectedType).toBe('state');

    const resWrong = checkClassification('MH', 'ut');
    expect(resWrong.isCorrect).toBe(false);
  });

  it('handles case-insensitivity and whitespace in target choices', () => {
    expect(checkClassification('DL', ' UT ').isCorrect).toBe(true);
    expect(checkClassification('RJ', ' STATE ').isCorrect).toBe(true);
  });

  it('returns invalid region result for non-existent region ID', () => {
    const res = checkClassification('INVALID_ID', 'state');
    expect(res.isValidRegion).toBe(false);
    expect(res.isCorrect).toBe(false);
    expect(res.expectedType).toBeNull();
  });
});

describe('Deck Shuffling', () => {
  it('returns a new array of 36 items without mutating original dataset', () => {
    const shuffled = shuffleDataset(REGIONS_DATASET);
    expect(shuffled.length).toBe(36);
    expect(shuffled).not.toBe(REGIONS_DATASET);

    const originalIds = REGIONS_DATASET.map(r => r.id).sort();
    const shuffledIds = shuffled.map(r => r.id).sort();
    expect(shuffledIds).toEqual(originalIds);
  });
});

describe('Sorter Scoring Engine', () => {
  it('calculates perfect score, grade S, and speed bonus for 36/36 in 90 seconds', () => {
    const res = calculateSorterScore(36, 36, 90);
    expect(res.accuracyPct).toBe(100);
    expect(res.basePoints).toBe(3600);
    expect(res.speedBonus).toBeGreaterThan(0);
    expect(res.grade).toBe('S');
    expect(res.title).toBe('Master Geographer');
  });

  it('calculates Grade A for 75% accuracy (27/36 correct)', () => {
    const res = calculateSorterScore(27, 36, 120);
    expect(res.accuracyPct).toBe(75);
    expect(res.grade).toBe('A');
    expect(res.title).toBe('Regional Scholar');
  });

  it('handles 0 correct answers gracefully', () => {
    const res = calculateSorterScore(0, 36, 150);
    expect(res.accuracyPct).toBe(0);
    expect(res.totalScore).toBe(0);
    expect(res.grade).toBe('C');
    expect(res.title).toBe('Explorer Trainee');
  });

  it('safely bounds out-of-range counts', () => {
    const resOver = calculateSorterScore(50, 36, 10);
    expect(resOver.correctCount).toBe(36);

    const resUnder = calculateSorterScore(-5, 36, 10);
    expect(resUnder.correctCount).toBe(0);
  });
});
