import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadAhalyaData() {
    const code = readFileSync(
        resolve(__dirname, '../../ahalyas-redemption-story/ahalya-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { AHALYA_INFO, STORY_CHAPTERS, LITERARY_INTERPRETATIONS, REFERENCES };'
    );
    return fn();
}

describe('Ahalya Redemption Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadAhalyaData();
    });

    describe('AHALYA_INFO metadata', () => {
        it('contains correct Ahalya metadata and Sage Gautama hermitage', () => {
            expect(data.AHALYA_INFO.id).toBe('ahalyas-redemption-story');
            expect(data.AHALYA_INFO.title).toContain('Ahalya');
            expect(data.AHALYA_INFO.characters).toContain('Gautama Maharishi');
            expect(data.AHALYA_INFO.characters).toContain('Vishwamitra');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.AHALYA_INFO.quickStats)).toBe(true);
            expect(data.AHALYA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & LITERARY_INTERPRETATIONS', () => {
        it('contains 5 chronological story chapters and multiple literary traditions', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const moksha = data.STORY_CHAPTERS.find(c => c.title.includes('Moksha'));
            expect(moksha).toBeDefined();

            expect(Array.isArray(data.LITERARY_INTERPRETATIONS)).toBe(true);
            const valmiki = data.LITERARY_INTERPRETATIONS.find(i => i.tradition.includes('Valmiki'));
            expect(valmiki).toBeDefined();
            const tulsidas = data.LITERARY_INTERPRETATIONS.find(i => i.tradition.includes('Tulsidas'));
            expect(tulsidas).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Bala Kanda and Ramcharitmanas citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
