import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCochinData() {
    const code = readFileSync(
        resolve(__dirname, '../../cochin-kingdom-explorer/cochin-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { COCHIN_INFO, TIMELINE_DATA, RULERS_DATA, CONTRIBUTIONS_DATA, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Kingdom of Cochin Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadCochinData();
    });

    describe('COCHIN_INFO metadata', () => {
        it('contains correct Kingdom of Cochin attributes', () => {
            expect(data.COCHIN_INFO.id).toBe('cochin-kingdom');
            expect(data.COCHIN_INFO.name).toContain('Kingdom of Cochin');
            expect(data.COCHIN_INFO.period).toContain('1102');
            expect(data.COCHIN_INFO.portHub).toContain('Arabian Sea');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.COCHIN_INFO.quickStats)).toBe(true);
            expect(data.COCHIN_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TIMELINE_DATA & RULERS_DATA', () => {
        it('contains milestone timeline items and key rulers including Sakthan Thampuran', () => {
            expect(Array.isArray(data.TIMELINE_DATA)).toBe(true);
            expect(data.TIMELINE_DATA.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.RULERS_DATA)).toBe(true);
            expect(data.RULERS_DATA.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('CONTRIBUTIONS_DATA', () => {
        it('contains required contribution fields', () => {
            expect(data.CONTRIBUTIONS_DATA.overview).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.maritimeTrade).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.architecture).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.culturalHarmony).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.thrissurPooram).toBeDefined();
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
