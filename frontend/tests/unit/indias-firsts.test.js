/**
 * indias-firsts.test.js
 * Unit tests for India's "Firsts" Encyclopedia dataset integrity,
 * mandatory items coverage (Satellite, Woman PM, Metro, IIT, High Court, Nobel Laureate, National Park),
 * chronological timeline sorting, interactive quiz engine evaluation, and search filters.
 */

import { describe, it, expect } from 'vitest';
import {
  indiasFirstsData,
  firstsQuizQuestions,
  getFirstById,
  filterFirsts,
  getTimelineFirsts,
  evaluateQuizAnswer
} from '../../frontend/indias-firsts/indias-firsts.js';

const MANDATORY_FIRST_IDS = [
  'first-satellite',
  'first-woman-pm',
  'first-metro',
  'first-iit',
  'first-high-court',
  'first-nobel-laureate',
  'first-national-park'
];

describe('Indias Firsts Dataset Coverage & Mandatory Examples', () => {
  it('contains at least 7 major firsts (contains 10)', () => {
    expect(indiasFirstsData.length).toBeGreaterThanOrEqual(7);
  });

  it('includes all mandatory firsts from issue description', () => {
    const ids = indiasFirstsData.map(i => i.id.toLowerCase());
    MANDATORY_FIRST_IDS.forEach(mandatoryId => {
      expect(ids).toContain(mandatoryId);
    });
  });

  it('every item contains required fields with valid details', () => {
    indiasFirstsData.forEach((item, index) => {
      expect(item, `Item at index ${index} missing id`).toHaveProperty('id');
      expect(item, `Item at index ${index} missing title`).toHaveProperty('title');
      expect(item, `Item at index ${index} missing name`).toHaveProperty('name');
      expect(item, `Item at index ${index} missing year`).toHaveProperty('year');
      expect(item, `Item at index ${index} missing category`).toHaveProperty('category');
      expect(item, `Item at index ${index} missing description`).toHaveProperty('description');
      expect(item, `Item at index ${index} missing details`).toHaveProperty('details');

      expect(typeof item.year).toBe('number');
      expect(item.year).toBeGreaterThan(1800);
      expect(item.year).toBeLessThan(2030);
    });
  });

  it('all item IDs are unique', () => {
    const ids = indiasFirstsData.map(i => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Chronological Timeline Engine', () => {
  it('sorts firsts chronologically from earliest to latest', () => {
    const timeline = getTimelineFirsts();
    expect(timeline.length).toBe(indiasFirstsData.length);
    expect(timeline[0].year).toBe(1853); // Bombay to Thane Train

    for (let i = 0; i < timeline.length - 1; i++) {
      expect(timeline[i].year).toBeLessThanOrEqual(timeline[i + 1].year);
    }
  });
});

describe('Quiz Mode & Answer Evaluation Engine', () => {
  it('contains at least 5 multiple-choice quiz questions with 4 options each', () => {
    expect(firstsQuizQuestions.length).toBeGreaterThanOrEqual(5);
    firstsQuizQuestions.forEach((q, index) => {
      expect(q, `Quiz question ${index} missing question`).toHaveProperty('question');
      expect(q, `Quiz question ${index} missing options`).toHaveProperty('options');
      expect(q, `Quiz question ${index} missing correctIndex`).toHaveProperty('correctIndex');
      expect(q, `Quiz question ${index} missing explanation`).toHaveProperty('explanation');

      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    });
  });

  it('evaluates quiz answers correctly for right and wrong options', () => {
    // Q0: Aryabhata is index 1
    const correctRes = evaluateQuizAnswer(0, 1);
    expect(correctRes.isCorrect).toBe(true);
    expect(correctRes.explanation).toContain('Aryabhata');

    const wrongRes = evaluateQuizAnswer(0, 0);
    expect(wrongRes.isCorrect).toBe(false);
    expect(wrongRes.correctOption).toBe('Aryabhata');
  });

  it('returns invalid object for out-of-range question index', () => {
    const res = evaluateQuizAnswer(99, 0);
    expect(res.isCorrect).toBe(false);
  });
});

describe('Query & Search Filters', () => {
  it('retrieves item profile by ID or partial name', () => {
    const satellite = getFirstById('first-satellite');
    expect(satellite).toBeDefined();
    expect(satellite.name).toBe('Aryabhata');

    const tagore = getFirstById('Tagore');
    expect(tagore).toBeDefined();
    expect(tagore.id).toBe('first-nobel-laureate');
  });

  it('filters firsts by search query (e.g. Kharagpur or Indira)', () => {
    const iitRes = filterFirsts('Kharagpur');
    expect(iitRes.length).toBe(1);
    expect(iitRes[0].name).toBe('IIT Kharagpur');

    const indiraRes = filterFirsts('Indira');
    expect(indiraRes.length).toBeGreaterThan(0);
  });

  it('filters firsts by category tag', () => {
    const scienceRes = filterFirsts('', 'science');
    expect(scienceRes.length).toBeGreaterThanOrEqual(2);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterFirsts('NonExistentFirstXYZ');
    expect(res).toEqual([]);
  });
});
