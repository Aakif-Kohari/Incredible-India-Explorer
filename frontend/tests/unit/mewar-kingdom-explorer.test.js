import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMewarData() {
    const code = readFileSync(
        resolve(__dirname, '../../mewar-kingdom-explorer/mewar-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MEWAR_INFO, TIMELINE_DATA, RULERS_DATA, CONTRIBUTIONS_DATA, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Kingdom of Mewar Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMewarData();
    });

    describe('MEWAR_INFO metadata', () => {
        it('contains correct Kingdom of Mewar attributes', () => {
            expect(data.MEWAR_INFO.id).toBe('mewar-kingdom');
            expect(data.MEWAR_INFO.name).toContain('Kingdom of Mewar');
            expect(data.MEWAR_INFO.dynasty).toContain('Sisodia');
            expect(data.MEWAR_INFO.period).toContain('728');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MEWAR_INFO.quickStats)).toBe(true);
            expect(data.MEWAR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TIMELINE_DATA & RULERS_DATA', () => {
        it('contains milestone timeline items and key rulers including Maharana Pratap', () => {
            expect(Array.isArray(data.TIMELINE_DATA)).toBe(true);
            expect(data.TIMELINE_DATA.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.RULERS_DATA)).toBe(true);
            expect(data.RULERS_DATA.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('CONTRIBUTIONS_DATA', () => {
        it('contains required contribution fields', () => {
            expect(data.CONTRIBUTIONS_DATA.overview).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.fortsAndPalaces).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.waterEngineering).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.vijayStambha).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.rajputResilience).toBeDefined();
        });
    });

    describe('GALLERY_IMAGES & REFERENCES', () => {
        it('has non-empty gallery and references', () => {
            expect(Array.isArray(data.GALLERY_IMAGES)).toBe(true);
            expect(data.GALLERY_IMAGES.length).toBeGreaterThanOrEqual(2);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
