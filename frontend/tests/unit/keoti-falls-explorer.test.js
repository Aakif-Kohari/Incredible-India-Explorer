import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKeotiData() {
    const code = readFileSync(
        resolve(__dirname, '../../keoti-falls-explorer/keoti-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KEOTI_INFO, HEIGHT_COMPARISONS, SEASONAL_DATA, NEARBY_ATTRACTIONS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Keoti Falls Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKeotiData();
    });

    describe('KEOTI_INFO metadata', () => {
        it('contains correct Keoti Falls location and height attributes', () => {
            expect(data.KEOTI_INFO.id).toBe('keoti-falls');
            expect(data.KEOTI_INFO.title).toContain('Keoti Falls');
            expect(data.KEOTI_INFO.height).toContain('98 Meters');
            expect(data.KEOTI_INFO.waterSource).toContain('Mahana River');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.KEOTI_INFO.quickStats)).toBe(true);
            expect(data.KEOTI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('HEIGHT_COMPARISONS & SEASONAL_DATA', () => {
        it('contains height comparisons and seasonal flow data', () => {
            expect(Array.isArray(data.HEIGHT_COMPARISONS)).toBe(true);
            expect(data.HEIGHT_COMPARISONS.length).toBeGreaterThanOrEqual(4);
            const keoti = data.HEIGHT_COMPARISONS.find(h => h.name === 'Keoti Falls');
            expect(keoti).toBeDefined();
            expect(keoti.heightMeters).toBe(98);

            expect(Array.isArray(data.SEASONAL_DATA)).toBe(true);
            expect(data.SEASONAL_DATA.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('NEARBY_ATTRACTIONS & REFERENCES', () => {
        it('contains nearby circuit attractions and references', () => {
            expect(Array.isArray(data.NEARBY_ATTRACTIONS)).toBe(true);
            expect(data.NEARBY_ATTRACTIONS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
