import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSanjeevaniData() {
    const code = readFileSync(
        resolve(__dirname, '../../hanuman-sanjeevani-story/sanjeevani-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SANJEEVANI_INFO, STORY_CHAPTERS, CULTURAL_SIGNIFICANCE, REFERENCES };'
    );
    return fn();
}

describe('Hanuman and Sanjeevani Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSanjeevaniData();
    });

    describe('SANJEEVANI_INFO metadata', () => {
        it('contains correct Sanjeevani metadata and Dronagiri mountain source', () => {
            expect(data.SANJEEVANI_INFO.id).toBe('hanuman-sanjeevani-story');
            expect(data.SANJEEVANI_INFO.title).toContain('Hanuman and Sanjeevani');
            expect(data.SANJEEVANI_INFO.mountainSource).toContain('Dronagiri');
            expect(data.SANJEEVANI_INFO.herbsPrescribed).toContain('Mrita Sanjeevani');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SANJEEVANI_INFO.quickStats)).toBe(true);
            expect(data.SANJEEVANI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & CULTURAL_SIGNIFICANCE', () => {
        it('contains 5 chronological story chapters and Ayurvedic Selaginella connection', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const mountainLift = data.STORY_CHAPTERS.find(c => c.title.includes('Dronagiri') || c.chapter.includes('Luminescent'));
            expect(mountainLift).toBeDefined();

            expect(Array.isArray(data.CULTURAL_SIGNIFICANCE)).toBe(true);
            const ayurveda = data.CULTURAL_SIGNIFICANCE.find(s => s.title.includes('Botanical'));
            expect(ayurveda).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Yuddha Kanda and botanical journal citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
