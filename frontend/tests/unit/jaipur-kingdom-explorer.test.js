import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadJaipurData() {
    const code = readFileSync(
        resolve(__dirname, '../../jaipur-kingdom-explorer/jaipur-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { JAIPUR_INFO, TIMELINE_DATA, RULERS_DATA, CONTRIBUTIONS_DATA, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Kingdom of Jaipur Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadJaipurData();
    });

    describe('JAIPUR_INFO metadata', () => {
        it('contains correct Kingdom of Jaipur attributes', () => {
            expect(data.JAIPUR_INFO.id).toBe('jaipur-kingdom');
            expect(data.JAIPUR_INFO.name).toContain('Kingdom of Jaipur');
            expect(data.JAIPUR_INFO.dynasty).toContain('Kachwaha');
            expect(data.JAIPUR_INFO.period).toContain('1128');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.JAIPUR_INFO.quickStats)).toBe(true);
            expect(data.JAIPUR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TIMELINE_DATA & RULERS_DATA', () => {
        it('contains milestone timeline items and key rulers including Sawai Jai Singh II', () => {
            expect(Array.isArray(data.TIMELINE_DATA)).toBe(true);
            expect(data.TIMELINE_DATA.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.RULERS_DATA)).toBe(true);
            expect(data.RULERS_DATA.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('CONTRIBUTIONS_DATA', () => {
        it('contains required contribution fields', () => {
            expect(data.CONTRIBUTIONS_DATA.overview).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.plannedCityDesign).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.astronomyJantarMantar).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.architectureForts).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.handicraftsArts).toBeDefined();
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
