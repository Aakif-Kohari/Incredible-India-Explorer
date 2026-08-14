import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBhimlatData() {
    const code = readFileSync(
        resolve(__dirname, '../../bhimlat-falls-explorer/bhimlat-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BHIMLAT_INFO, HEIGHT_COMPARISONS, SEASONAL_DATA, NEARBY_ATTRACTIONS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Bhimlat Falls Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBhimlatData();
    });

    describe('BHIMLAT_INFO metadata', () => {
        it('contains correct Bhimlat Falls location, height, and Pandava legend attributes', () => {
            expect(data.BHIMLAT_INFO.id).toBe('bhimlat-falls');
            expect(data.BHIMLAT_INFO.title).toContain('Bhimlat Falls');
            expect(data.BHIMLAT_INFO.height).toContain('60 Meters');
            expect(data.BHIMLAT_INFO.legendHero).toContain('Bhima');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.BHIMLAT_INFO.quickStats)).toBe(true);
            expect(data.BHIMLAT_INFO.quickStats.length).toBe(6);
        });
    });

    describe('HEIGHT_COMPARISONS & SEASONAL_DATA', () => {
        it('contains height comparisons and seasonal flow data', () => {
            expect(Array.isArray(data.HEIGHT_COMPARISONS)).toBe(true);
            expect(data.HEIGHT_COMPARISONS.length).toBeGreaterThanOrEqual(4);

            const bhimlat = data.HEIGHT_COMPARISONS.find(h => h.name === 'Bhimlat Falls');
            expect(bhimlat).toBeDefined();
            expect(bhimlat.heightMeters).toBe(60);

            expect(Array.isArray(data.SEASONAL_DATA)).toBe(true);
            expect(data.SEASONAL_DATA.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('NEARBY_ATTRACTIONS & REFERENCES', () => {
        it('contains nearby Bundi attractions and references', () => {
            expect(Array.isArray(data.NEARBY_ATTRACTIONS)).toBe(true);
            expect(data.NEARBY_ATTRACTIONS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
