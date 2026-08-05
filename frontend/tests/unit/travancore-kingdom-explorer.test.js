import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTravancoreData() {
    const code = readFileSync(
        resolve(__dirname, '../../travancore-kingdom-explorer/travancore-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { TRAVANCORE_INFO, TIMELINE_DATA, RULERS_DATA, CONTRIBUTIONS_DATA, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Kingdom of Travancore Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadTravancoreData();
    });

    describe('TRAVANCORE_INFO metadata', () => {
        it('contains correct Kingdom of Travancore attributes', () => {
            expect(data.TRAVANCORE_INFO.id).toBe('travancore-kingdom');
            expect(data.TRAVANCORE_INFO.name).toBe('Kingdom of Travancore');
            expect(data.TRAVANCORE_INFO.period).toContain('1729');
            expect(data.TRAVANCORE_INFO.deity).toContain('Lord Padmanabha');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.TRAVANCORE_INFO.quickStats)).toBe(true);
            expect(data.TRAVANCORE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TIMELINE_DATA & RULERS_DATA', () => {
        it('contains milestone timeline items and key rulers', () => {
            expect(Array.isArray(data.TIMELINE_DATA)).toBe(true);
            expect(data.TIMELINE_DATA.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.RULERS_DATA)).toBe(true);
            expect(data.RULERS_DATA.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('CONTRIBUTIONS_DATA', () => {
        it('contains required contribution fields', () => {
            expect(data.CONTRIBUTIONS_DATA.overview).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.militaryNaval).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.architecture).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.educationSocial).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.musicCulture).toBeDefined();
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
