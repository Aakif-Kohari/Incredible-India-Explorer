import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadManjushaData() {
    const code = readFileSync(
        resolve(__dirname, '../../manjusha-painting-explorer/manjusha-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MANJUSHA_INFO, MATERIALS_AND_METHOD, TRADITIONAL_MOTIFS, MYTH_STORIES, ARTISAN_COMMUNITY, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Manjusha Painting Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadManjushaData();
    });

    describe('MANJUSHA_INFO metadata', () => {
        it('contains correct Manjusha metadata and GI tag', () => {
            expect(data.MANJUSHA_INFO.id).toBe('manjusha-painting');
            expect(data.MANJUSHA_INFO.title).toContain('Manjusha');
            expect(data.MANJUSHA_INFO.originRegion).toContain('Bihar');
            expect(data.MANJUSHA_INFO.giTagStatus).toContain('GI');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MANJUSHA_INFO.quickStats)).toBe(true);
            expect(data.MANJUSHA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('MATERIALS_AND_METHOD & TRADITIONAL_MOTIFS', () => {
        it('contains process steps and traditional motifs', () => {
            expect(Array.isArray(data.MATERIALS_AND_METHOD)).toBe(true);
            expect(data.MATERIALS_AND_METHOD.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.TRADITIONAL_MOTIFS)).toBe(true);
            expect(data.TRADITIONAL_MOTIFS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('MYTH_STORIES', () => {
        it('contains Bihula–Bishari mythology stories', () => {
            expect(Array.isArray(data.MYTH_STORIES)).toBe(true);
            expect(data.MYTH_STORIES.length).toBeGreaterThanOrEqual(3);
            expect(data.MYTH_STORIES.some(s => s.title.includes('Bihula'))).toBe(true);
        });
    });

    describe('ARTISAN_COMMUNITY', () => {
        it('contains artisan community details', () => {
            expect(data.ARTISAN_COMMUNITY.title).toBeDefined();
            expect(data.ARTISAN_COMMUNITY.description).toContain('Bhagalpur');
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
