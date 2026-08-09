import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadChhauData() {
    const code = readFileSync(
        resolve(__dirname, '../../chhau-masks-explorer/chhau-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { CHHAU_INFO, PROCESS_STEPS, TRADITIONAL_MASKS, ARTISAN_COMMUNITY, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Chhau Masks Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadChhauData();
    });

    describe('CHHAU_INFO metadata', () => {
        it('contains correct Chhau Masks metadata and UNESCO status', () => {
            expect(data.CHHAU_INFO.id).toBe('chhau-masks');
            expect(data.CHHAU_INFO.title).toContain('Chhau Mask');
            expect(data.CHHAU_INFO.originRegion).toContain('Purulia');
            expect(data.CHHAU_INFO.unescoStatus).toContain('UNESCO');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.CHHAU_INFO.quickStats)).toBe(true);
            expect(data.CHHAU_INFO.quickStats.length).toBe(6);
        });
    });

    describe('PROCESS_STEPS & TRADITIONAL_MASKS', () => {
        it('contains mask-making steps and traditional character types', () => {
            expect(Array.isArray(data.PROCESS_STEPS)).toBe(true);
            expect(data.PROCESS_STEPS.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.TRADITIONAL_MASKS)).toBe(true);
            expect(data.TRADITIONAL_MASKS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('ARTISAN_COMMUNITY', () => {
        it('contains artisan village details', () => {
            expect(data.ARTISAN_COMMUNITY.title).toBeDefined();
            expect(data.ARTISAN_COMMUNITY.description).toContain('Charida');
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
