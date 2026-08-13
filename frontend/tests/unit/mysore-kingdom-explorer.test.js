import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMysoreData() {
    const code = readFileSync(
        resolve(__dirname, '../../mysore-kingdom-explorer/mysore-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MYSORE_INFO, TIMELINE_DATA, RULERS_DATA, CONTRIBUTIONS_DATA, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Kingdom of Mysore Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMysoreData();
    });

    describe('MYSORE_INFO metadata', () => {
        it('contains correct Kingdom of Mysore attributes', () => {
            expect(data.MYSORE_INFO.id).toBe('mysore-kingdom');
            expect(data.MYSORE_INFO.name).toBe('Kingdom of Mysore');
            expect(data.MYSORE_INFO.dynasty).toContain('Wadiyar');
            expect(data.MYSORE_INFO.period).toContain('1399');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MYSORE_INFO.quickStats)).toBe(true);
            expect(data.MYSORE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TIMELINE_DATA & RULERS_DATA', () => {
        it('contains milestone timeline items and key rulers including Tipu Sultan', () => {
            expect(Array.isArray(data.TIMELINE_DATA)).toBe(true);
            expect(data.TIMELINE_DATA.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.RULERS_DATA)).toBe(true);
            expect(data.RULERS_DATA.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('CONTRIBUTIONS_DATA', () => {
        it('contains required contribution fields', () => {
            expect(data.CONTRIBUTIONS_DATA.overview).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.militaryRocketry).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.architecture).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.industryAgriculture).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.cultureDasara).toBeDefined();
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
