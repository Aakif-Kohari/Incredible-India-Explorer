/**
 * decimal-number-system-explorer.test.js
 * Unit tests for Decimal Number System Explorer.
 * Validates data integrity for DECIMAL_EXPLORER_INFO, DECIMAL_TIMELINE,
 * DECIMAL_IMPACT, DECIMAL_REFERENCES, DECIMAL_QUIZ, and computational helpers
 * calculatePlaceValue and numberToRoman exported from script.js.
 */

import { describe, it, expect } from 'vitest';
import {
    DECIMAL_EXPLORER_INFO,
    DECIMAL_TIMELINE,
    DECIMAL_IMPACT,
    DECIMAL_REFERENCES,
    DECIMAL_QUIZ,
    calculatePlaceValue,
    numberToRoman,
} from '../../frontend/decimal-number-system-explorer/script.js';

describe('Decimal Number System Explorer — Data Integrity & Logic', () => {
    describe('DECIMAL_EXPLORER_INFO metadata', () => {
        it('contains correct id and name', () => {
            expect(DECIMAL_EXPLORER_INFO.id).toBe('decimal-number-system');
            expect(DECIMAL_EXPLORER_INFO.name).toBe('Decimal Place-Value System');
        });

        it('identifies base 10 and origin as India', () => {
            expect(DECIMAL_EXPLORER_INFO.base).toBe(10);
            expect(DECIMAL_EXPLORER_INFO.origin).toContain('India');
        });

        it('includes Laplace quote attesting to Indian origin', () => {
            expect(DECIMAL_EXPLORER_INFO.laplaceQuote).toMatch(/ingenious method of expressing all numbers/i);
        });

        it('has at least 4 core concepts listed', () => {
            expect(Array.isArray(DECIMAL_EXPLORER_INFO.coreConcepts)).toBe(true);
            expect(DECIMAL_EXPLORER_INFO.coreConcepts.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('DECIMAL_TIMELINE dataset', () => {
        it('contains at least 5 timeline milestones', () => {
            expect(Array.isArray(DECIMAL_TIMELINE)).toBe(true);
            expect(DECIMAL_TIMELINE.length).toBeGreaterThanOrEqual(5);
        });

        it('every timeline entry has required fields', () => {
            DECIMAL_TIMELINE.forEach((item, idx) => {
                expect(item, `Timeline ${idx} missing id`).toHaveProperty('id');
                expect(item, `Timeline ${idx} missing period`).toHaveProperty('period');
                expect(item, `Timeline ${idx} missing era`).toHaveProperty('era');
                expect(item, `Timeline ${idx} missing title`).toHaveProperty('title');
                expect(item, `Timeline ${idx} missing description`).toHaveProperty('description');
                expect(typeof item.title).toBe('string');
                expect(item.title.trim().length).toBeGreaterThan(0);
            });
        });

        it('includes Aryabhata and Brahmagupta eras', () => {
            const aryabhata = DECIMAL_TIMELINE.find(t => t.era.includes('Aryabhata'));
            const brahmagupta = DECIMAL_TIMELINE.find(t => t.era.includes('Brahmagupta'));
            expect(aryabhata).toBeDefined();
            expect(brahmagupta).toBeDefined();
        });
    });

    describe('DECIMAL_IMPACT dataset', () => {
        it('contains at least 4 global impact cards', () => {
            expect(Array.isArray(DECIMAL_IMPACT)).toBe(true);
            expect(DECIMAL_IMPACT.length).toBeGreaterThanOrEqual(4);
        });

        it('every impact card has icon, title, and description', () => {
            DECIMAL_IMPACT.forEach((card, idx) => {
                expect(card, `Impact card ${idx} missing id`).toHaveProperty('id');
                expect(card, `Impact card ${idx} missing icon`).toHaveProperty('icon');
                expect(card, `Impact card ${idx} missing title`).toHaveProperty('title');
                expect(card, `Impact card ${idx} missing description`).toHaveProperty('description');
            });
        });
    });

    describe('DECIMAL_REFERENCES dataset', () => {
        it('contains at least 4 references', () => {
            expect(Array.isArray(DECIMAL_REFERENCES)).toBe(true);
            expect(DECIMAL_REFERENCES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Laplace and Al-Biruni sources', () => {
            const laplace = DECIMAL_REFERENCES.find(r => r.source.includes('Laplace'));
            const albiruni = DECIMAL_REFERENCES.find(r => r.source.includes('Al-Biruni'));
            expect(laplace).toBeDefined();
            expect(albiruni).toBeDefined();
        });
    });

    describe('DECIMAL_QUIZ dataset', () => {
        it('contains at least 4 quiz questions', () => {
            expect(Array.isArray(DECIMAL_QUIZ)).toBe(true);
            expect(DECIMAL_QUIZ.length).toBeGreaterThanOrEqual(4);
        });

        it('every quiz item has valid question, 4 options, and correct index', () => {
            DECIMAL_QUIZ.forEach((q, idx) => {
                expect(q, `Quiz ${idx} missing question`).toHaveProperty('question');
                expect(Array.isArray(q.options), `Quiz ${idx} options not array`).toBe(true);
                expect(q.options.length).toBe(4);
                expect(typeof q.correct).toBe('number');
                expect(q.correct).toBeGreaterThanOrEqual(0);
                expect(q.correct).toBeLessThan(4);
                expect(q).toHaveProperty('explanation');
            });
        });
    });

    describe('calculatePlaceValue function', () => {
        it('returns null for invalid inputs', () => {
            expect(calculatePlaceValue('')).toBeNull();
            expect(calculatePlaceValue('abc')).toBeNull();
        });

        it('correctly calculates place values for 98765', () => {
            const res = calculatePlaceValue(98765);
            expect(res).not.toBeNull();
            expect(res.intPartStr).toBe('98765');
            expect(res.breakdown.length).toBe(5);

            // Check 10^4 column (9 * 10000 = 90000)
            const tenThousandsCol = res.breakdown[0];
            expect(tenThousandsCol.digit).toBe(9);
            expect(tenThousandsCol.power).toBe(4);
            expect(tenThousandsCol.multiplier).toBe(10000);
            expect(tenThousandsCol.contribution).toBe(90000);

            // Check 10^0 column (5 * 1 = 5)
            const unitsCol = res.breakdown[4];
            expect(unitsCol.digit).toBe(5);
            expect(unitsCol.power).toBe(0);
            expect(unitsCol.multiplier).toBe(1);
            expect(unitsCol.contribution).toBe(5);
        });

        it('handles numbers with zeroes correctly (e.g. 1008)', () => {
            const res = calculatePlaceValue(1008);
            expect(res.breakdown.length).toBe(4);
            expect(res.breakdown[1].digit).toBe(0); // Hundreds
            expect(res.breakdown[1].contribution).toBe(0);
            expect(res.breakdown[2].digit).toBe(0); // Tens
            expect(res.breakdown[2].contribution).toBe(0);
        });
    });

    describe('numberToRoman function', () => {
        it('correctly converts integers to Roman numerals', () => {
            expect(numberToRoman(1)).toBe('I');
            expect(numberToRoman(4)).toBe('IV');
            expect(numberToRoman(9)).toBe('IX');
            expect(numberToRoman(2888)).toBe('MMDCCCLXXXVIII');
            expect(numberToRoman(3999)).toBe('MMMCMXCIX');
        });

        it('handles invalid or out-of-range numbers gracefully', () => {
            expect(numberToRoman(0)).toContain('N/A');
            expect(numberToRoman(-5)).toContain('N/A');
            expect(numberToRoman(4000)).toContain('N/A');
            expect(numberToRoman('abc')).toContain('N/A');
        });
    });
});
