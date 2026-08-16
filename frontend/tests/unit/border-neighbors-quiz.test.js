/**
 * border-neighbors-quiz.test.js
 * Unit tests for Border Neighbors Quiz data integrity, border symmetry,
 * partial-credit scoring logic, option generation, and performance metrics.
 */

import { describe, it, expect } from 'vitest';
import {
  STATE_ADJACENCY_MAP,
  calculatePartialCredit,
  generateQuestionOptions,
  verifyBorderSymmetry,
  summarizeQuizPerformance
} from '../../frontend/border-neighbors-quiz/border-neighbors-quiz.js';

describe('Border Neighbors Dataset Integrity', () => {
  it('covers at least 10 states at launch (contains 29 states)', () => {
    const keys = Object.keys(STATE_ADJACENCY_MAP);
    expect(keys.length).toBeGreaterThanOrEqual(10);
    expect(keys.length).toBe(29);
  });

  it('every state has required fields (id, name, capital, region, neighbors)', () => {
    Object.keys(STATE_ADJACENCY_MAP).forEach(key => {
      const state = STATE_ADJACENCY_MAP[key];
      expect(state).toHaveProperty('id');
      expect(state).toHaveProperty('name');
      expect(state).toHaveProperty('capital');
      expect(state).toHaveProperty('region');
      expect(state).toHaveProperty('neighbors');

      expect(typeof state.id).toBe('string');
      expect(typeof state.name).toBe('string');
      expect(typeof state.capital).toBe('string');
      expect(typeof state.region).toBe('string');
      expect(Array.isArray(state.neighbors)).toBe(true);

      expect(state.neighbors.length).toBeGreaterThan(0);
    });
  });

  it('verifies complete land border symmetry across all states', () => {
    const symmetry = verifyBorderSymmetry(STATE_ADJACENCY_MAP);
    expect(symmetry.isValid).toBe(true);
    expect(symmetry.errors).toEqual([]);
  });
});

describe('Partial-Credit Scoring Logic', () => {
  it('returns 100% score and isPerfect true for perfect selection', () => {
    // Maharashtra (MH) neighbors: GJ, MP, CT, TS, KA, GA (6 neighbors)
    const res = calculatePartialCredit('MH', ['GJ', 'MP', 'CT', 'TS', 'KA', 'GA']);
    expect(res.scorePercentage).toBe(100);
    expect(res.earnedPoints).toBe(100);
    expect(res.isPerfect).toBe(true);
    expect(res.tp.length).toBe(6);
    expect(res.fp.length).toBe(0);
    expect(res.fn.length).toBe(0);
  });

  it('awards partial credit when some correct neighbors are selected without false choices', () => {
    // Rajasthan (RJ) has 5 neighbors: PB, HR, UP, MP, GJ
    // Selecting 4 out of 5: score = Math.round((4 / 5) * 100) = 80%
    const res = calculatePartialCredit('RJ', ['PB', 'HR', 'UP', 'MP']);
    expect(res.scorePercentage).toBe(80);
    expect(res.earnedPoints).toBe(80);
    expect(res.isPerfect).toBe(false);
    expect(res.tp.length).toBe(4);
    expect(res.fn.length).toBe(1);
    expect(res.fn).toContain('GJ');
  });

  it('applies penalty for false positive choices', () => {
    // Goa (GA) has 2 neighbors: MH, KA
    // User selects MH (correct), KA (correct), and TN (false positive)
    // Raw score = 2 - 0.5 * 1 = 1.5 -> (1.5 / 2) * 100 = 75%
    const res = calculatePartialCredit('GA', ['MH', 'KA', 'TN']);
    expect(res.scorePercentage).toBe(75);
    expect(res.tp.length).toBe(2);
    expect(res.fp.length).toBe(1);
    expect(res.fp).toContain('TN');
    expect(res.isPerfect).toBe(false);
  });

  it('floors score at 0% for excessive wrong choices', () => {
    // Kerala (KL) has 2 neighbors: KA, TN
    // User selects 0 correct and 4 wrong choices (e.g., UP, MP, RJ, GJ)
    const res = calculatePartialCredit('KL', ['UP', 'MP', 'RJ', 'GJ']);
    expect(res.scorePercentage).toBe(0);
    expect(res.earnedPoints).toBe(0);
    expect(res.tp.length).toBe(0);
    expect(res.fp.length).toBe(4);
  });

  it('handles empty selection gracefully', () => {
    const res = calculatePartialCredit('TN', []);
    expect(res.scorePercentage).toBe(0);
    expect(res.earnedPoints).toBe(0);
    expect(res.tp.length).toBe(0);
    expect(res.fn.length).toBe(3); // KL, KA, AP
  });

  it('handles invalid or missing target state ID', () => {
    const resNull = calculatePartialCredit(null, ['MH']);
    expect(resNull.scorePercentage).toBe(0);
    expect(resNull.targetStateName).toBe('Unknown');

    const resInvalid = calculatePartialCredit('INVALID', ['MH']);
    expect(resInvalid.scorePercentage).toBe(0);
  });
});

describe('Question Options Generator', () => {
  it('includes all actual neighbors in the options list', () => {
    const options = generateQuestionOptions('UP', 8);
    const actualNeighbors = STATE_ADJACENCY_MAP.UP.neighbors;
    const optionIds = options.map(o => o.id);

    actualNeighbors.forEach(nId => {
      expect(optionIds).toContain(nId);
    });
  });

  it('flags correctly whether each option is a neighbor or distractor', () => {
    const options = generateQuestionOptions('GJ', 8);
    const actualNeighbors = new Set(STATE_ADJACENCY_MAP.GJ.neighbors);

    options.forEach(opt => {
      if (actualNeighbors.has(opt.id)) {
        expect(opt.isNeighbor).toBe(true);
      } else {
        expect(opt.isNeighbor).toBe(false);
      }
    });
  });

  it('returns empty array for invalid state ID', () => {
    const options = generateQuestionOptions('INVALID_STATE');
    expect(options).toEqual([]);
  });
});

describe('Quiz Performance Summarizer', () => {
  it('calculates average score, total points, grade, and badge correctly', () => {
    const results = [
      calculatePartialCredit('MH', ['GJ', 'MP', 'CT', 'TS', 'KA', 'GA']), // 100%
      calculatePartialCredit('GA', ['MH', 'KA']),                         // 100%
      calculatePartialCredit('KL', ['KA']),                               // 50%
      calculatePartialCredit('TN', ['KL', 'KA', 'AP'])                   // 100%
    ];

    const summary = summarizeQuizPerformance(results);
    expect(summary.totalQuestions).toBe(4);
    expect(summary.averageScore).toBe(88);
    expect(summary.totalEarnedPoints).toBe(350);
    expect(summary.totalPossiblePoints).toBe(400);
    expect(summary.perfectQuestions).toBe(3);
    expect(summary.grade).toBe('A');
    expect(summary.badge).toBe('Cartography Whiz');
  });

  it('handles empty results array gracefully', () => {
    const summary = summarizeQuizPerformance([]);
    expect(summary.totalQuestions).toBe(0);
    expect(summary.averageScore).toBe(0);
    expect(summary.grade).toBe('N/A');
    expect(summary.badge).toBe('Novice Traveler');
  });
});
