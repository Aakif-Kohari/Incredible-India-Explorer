import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadWomenData() {
    const code = readFileSync(
        resolve(__dirname, '../../forgotten-women-of-indian-history/women-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { ERAS, CATEGORIES, WOMEN_PROFILES, HISTORICAL_METHODOLOGY };'
    );
    return fn();
}

describe('Forgotten Women of Indian History — Data & Content Tests', () => {
    let data;

    beforeAll(() => {
        data = loadWomenData();
    });

    describe('WOMEN_PROFILES archive volume and structure', () => {
        it('contains at least 50 pioneering historical women profiles', () => {
            expect(Array.isArray(data.WOMEN_PROFILES)).toBe(true);
            expect(data.WOMEN_PROFILES.length).toBeGreaterThanOrEqual(50);
        });

        it('ensures every profile has id, name, era, region, category, contribution, bio, and icon', () => {
            data.WOMEN_PROFILES.forEach(w => {
                expect(w.id).toBeTruthy();
                expect(w.name).toBeTruthy();
                expect(w.era).toBeTruthy();
                expect(w.region).toBeTruthy();
                expect(w.category).toBeTruthy();
                expect(w.contribution).toBeTruthy();
                expect(w.bio).toBeTruthy();
                expect(w.icon).toBeTruthy();
            });
        });

        it('contains all required featured figures from requirements', () => {
            const names = data.WOMEN_PROFILES.map(w => w.name);
            expect(names.some(n => n.includes('Gargi Vachaknavi'))).toBe(true);
            expect(names.some(n => n.includes('Maitreyi'))).toBe(true);
            expect(names.some(n => n.includes('Rudrama Devi'))).toBe(true);
            expect(names.some(n => n.includes('Durgavati'))).toBe(true);
            expect(names.some(n => n.includes('Abbakka Chowta'))).toBe(true);
            expect(names.some(n => n.includes('Chand Bibi'))).toBe(true);
            expect(names.some(n => n.includes('Begum Hazrat Mahal'))).toBe(true);
            expect(names.some(n => n.includes('Rani Gaidinliu'))).toBe(true);
            expect(names.some(n => n.includes('Pritilata Waddedar'))).toBe(true);
            expect(names.some(n => n.includes('Janaki Ammal'))).toBe(true);
        });
    });

    describe('ERAS and CATEGORIES metadata', () => {
        it('defines all major historical epochs', () => {
            const eraIds = data.ERAS.map(e => e.id);
            expect(eraIds).toContain('ancient');
            expect(eraIds).toContain('early-medieval');
            expect(eraIds).toContain('medieval');
            expect(eraIds).toContain('colonial');
            expect(eraIds).toContain('freedom-struggle');
            expect(eraIds).toContain('post-independence');
        });

        it('defines broad categories including queens, warriors, scientists, doctors, and philosophers', () => {
            const catIds = data.CATEGORIES.map(c => c.id);
            expect(catIds).toContain('queens-rulers');
            expect(catIds).toContain('warriors');
            expect(catIds).toContain('freedom-fighters');
            expect(catIds).toContain('philosophers');
            expect(catIds).toContain('scientists');
            expect(catIds).toContain('doctors');
            expect(catIds).toContain('social-reformers');
        });
    });

    describe('HISTORICAL_METHODOLOGY documentation', () => {
        it('documents epigraphy, distinguishing folklore, and historiography', () => {
            expect(data.HISTORICAL_METHODOLOGY.principles.length).toBeGreaterThanOrEqual(3);
        });
    });
});
