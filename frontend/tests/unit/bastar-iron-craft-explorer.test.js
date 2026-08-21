import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBastarData() {
    const code = readFileSync(
        resolve(__dirname, '../../bastar-iron-craft-explorer/bastar-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BASTAR_INFO, PROCESS_STEPS, TRADITIONAL_DESIGNS, ARTISAN_SPOTLIGHT, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Bastar Iron Craft Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBastarData();
    });

    describe('BASTAR_INFO metadata', () => {
        it('contains correct Bastar Iron Craft metadata and GI tag', () => {
            expect(data.BASTAR_INFO.id).toBe('bastar-iron-craft');
            expect(data.BASTAR_INFO.title).toContain('Bastar Iron Craft');
            expect(data.BASTAR_INFO.originRegion).toContain('Chhattisgarh');
            expect(data.BASTAR_INFO.giTagStatus).toContain('GI');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.BASTAR_INFO.quickStats)).toBe(true);
            expect(data.BASTAR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('PROCESS_STEPS & TRADITIONAL_DESIGNS', () => {
        it('contains manufacturing steps and traditional motifs', () => {
            expect(Array.isArray(data.PROCESS_STEPS)).toBe(true);
            expect(data.PROCESS_STEPS.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.TRADITIONAL_DESIGNS)).toBe(true);
            expect(data.TRADITIONAL_DESIGNS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('ARTISAN_SPOTLIGHT', () => {
        it('contains artisan community details', () => {
            expect(data.ARTISAN_SPOTLIGHT.title).toBeDefined();
            expect(data.ARTISAN_SPOTLIGHT.description).toContain('Kondagaon');
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
