import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadManyavarData() {
    const code = readFileSync(
        resolve(__dirname, '../../manyavar-explorer/manyavar-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MANYAVAR_INFO, FASHION_CATEGORIES, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Manyavar Ethnic Fashion Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadManyavarData();
    });

    describe('MANYAVAR_INFO metadata', () => {
        it('contains correct Manyavar metadata and founding year 1999', () => {
            expect(data.MANYAVAR_INFO.id).toBe('manyavar-fashion');
            expect(data.MANYAVAR_INFO.title).toContain('Manyavar');
            expect(data.MANYAVAR_INFO.foundedYear).toBe('1999 CE');
            expect(data.MANYAVAR_INFO.founder).toContain('Ravi Modi');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MANYAVAR_INFO.quickStats)).toBe(true);
            expect(data.MANYAVAR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('FASHION_CATEGORIES & BRAND SILHOUETTES', () => {
        it('contains Sherwanis, Kurta Jacket sets, and Mohey bridal couture', () => {
            expect(Array.isArray(data.FASHION_CATEGORIES)).toBe(true);
            expect(data.FASHION_CATEGORIES.length).toBeGreaterThanOrEqual(4);

            const sherwani = data.FASHION_CATEGORIES.find(c => c.name.includes('Sherwani'));
            expect(sherwani).toBeDefined();

            const mohey = data.FASHION_CATEGORIES.find(c => c.name.includes('Mohey'));
            expect(mohey).toBeDefined();
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains brand evolution timeline and reference citations', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
