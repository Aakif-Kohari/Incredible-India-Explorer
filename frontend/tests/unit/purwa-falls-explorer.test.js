import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPurwaData() {
    const code = readFileSync(
        resolve(__dirname, '../../purwa-falls-explorer/purwa-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { PURWA_INFO, HEIGHT_COMPARISONS, SEASONAL_DATA, NEARBY_ATTRACTIONS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Purwa Falls Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadPurwaData();
    });

    describe('PURWA_INFO metadata', () => {
        it('contains correct Purwa Falls location, height, and Tamas River source', () => {
            expect(data.PURWA_INFO.id).toBe('purwa-falls');
            expect(data.PURWA_INFO.title).toContain('Purwa Falls');
            expect(data.PURWA_INFO.waterfallHeight).toContain('70 Meters');
            expect(data.PURWA_INFO.riverSource).toContain('Tamas River');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.PURWA_INFO.quickStats)).toBe(true);
            expect(data.PURWA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('HEIGHT_COMPARISONS & SEASONAL_DATA', () => {
        it('contains height comparisons and seasonal flow data', () => {
            expect(Array.isArray(data.HEIGHT_COMPARISONS)).toBe(true);
            expect(data.HEIGHT_COMPARISONS.length).toBeGreaterThanOrEqual(4);

            const purwa = data.HEIGHT_COMPARISONS.find(h => h.name === 'Purwa Falls');
            expect(purwa).toBeDefined();
            expect(purwa.heightMeters).toBe(70);

            expect(Array.isArray(data.SEASONAL_DATA)).toBe(true);
            expect(data.SEASONAL_DATA.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('NEARBY_ATTRACTIONS & REFERENCES', () => {
        it('contains nearby Rewa circuit attractions and references', () => {
            expect(Array.isArray(data.NEARBY_ATTRACTIONS)).toBe(true);
            expect(data.NEARBY_ATTRACTIONS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
