import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMenalData() {
    const code = readFileSync(
        resolve(__dirname, '../../menal-falls-explorer/menal-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MENAL_INFO, NATURE_HERITAGE_SPOTS, SEASONAL_DATA, NEARBY_ATTRACTIONS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Menal Falls Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMenalData();
    });

    describe('MENAL_INFO metadata', () => {
        it('contains correct Menal Falls location, height, and heritage dynasty', () => {
            expect(data.MENAL_INFO.id).toBe('menal-falls');
            expect(data.MENAL_INFO.title).toContain('Menal Falls');
            expect(data.MENAL_INFO.waterfallHeight).toContain('45 Meters');
            expect(data.MENAL_INFO.heritageDynasty).toContain('Chahamana');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MENAL_INFO.quickStats)).toBe(true);
            expect(data.MENAL_INFO.quickStats.length).toBe(6);
        });
    });

    describe('NATURE_HERITAGE_SPOTS & SEASONAL_DATA', () => {
        it('contains nature and heritage spots connecting waterfall and temples', () => {
            expect(Array.isArray(data.NATURE_HERITAGE_SPOTS)).toBe(true);
            expect(data.NATURE_HERITAGE_SPOTS.length).toBeGreaterThanOrEqual(4);

            const temple = data.NATURE_HERITAGE_SPOTS.find(s => s.id === 'mahanaleshwar-temple');
            expect(temple).toBeDefined();
            expect(temple.category).toBe('Heritage Site');

            expect(Array.isArray(data.SEASONAL_DATA)).toBe(true);
            expect(data.SEASONAL_DATA.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('NEARBY_ATTRACTIONS & REFERENCES', () => {
        it('contains nearby attractions and references', () => {
            expect(Array.isArray(data.NEARBY_ATTRACTIONS)).toBe(true);
            expect(data.NEARBY_ATTRACTIONS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
