import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadChannapatnaData() {
    const code = readFileSync(
        resolve(__dirname, '../../channapatna-toys-explorer/channapatna-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { CHANNAPATNA_INFO, HISTORY_CHAPTERS, CRAFTING_PROCESS, SUSTAINABLE_MATERIALS, TRADITIONAL_DESIGNS, ARTISAN_COMMUNITY, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Channapatna Toys Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadChannapatnaData();
    });

    describe('CHANNAPATNA_INFO metadata', () => {
        it('contains correct Channapatna metadata and GI tag', () => {
            expect(data.CHANNAPATNA_INFO.id).toBe('channapatna-toys');
            expect(data.CHANNAPATNA_INFO.title).toContain('Channapatna');
            expect(data.CHANNAPATNA_INFO.originRegion).toContain('Karnataka');
            expect(data.CHANNAPATNA_INFO.giTagStatus).toContain('GI');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.CHANNAPATNA_INFO.quickStats)).toBe(true);
            expect(data.CHANNAPATNA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('HISTORY_CHAPTERS & CRAFTING_PROCESS', () => {
        it('contains history chapters and crafting process steps', () => {
            expect(Array.isArray(data.HISTORY_CHAPTERS)).toBe(true);
            expect(data.HISTORY_CHAPTERS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.CRAFTING_PROCESS)).toBe(true);
            expect(data.CRAFTING_PROCESS.length).toBeGreaterThanOrEqual(5);
        });
    });

    describe('SUSTAINABLE_MATERIALS & TRADITIONAL_DESIGNS', () => {
        it('contains sustainable materials and traditional designs', () => {
            expect(Array.isArray(data.SUSTAINABLE_MATERIALS)).toBe(true);
            expect(data.SUSTAINABLE_MATERIALS.length).toBeGreaterThanOrEqual(3);
            expect(Array.isArray(data.TRADITIONAL_DESIGNS)).toBe(true);
            expect(data.TRADITIONAL_DESIGNS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('ARTISAN_COMMUNITY', () => {
        it('contains artisan community details', () => {
            expect(data.ARTISAN_COMMUNITY.title).toBeDefined();
            expect(data.ARTISAN_COMMUNITY.description).toContain('Channapatna');
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
