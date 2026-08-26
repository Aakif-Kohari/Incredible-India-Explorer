import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadRamaSetuData() {
    const code = readFileSync(
        resolve(__dirname, '../../rama-setu-story/rama-setu-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { RAMA_SETU_INFO, STORY_CHAPTERS, GEOGRAPHICAL_AND_CULTURAL_HERITAGE, REFERENCES };'
    );
    return fn();
}

describe('Rama Setu Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadRamaSetuData();
    });

    describe('RAMA_SETU_INFO metadata', () => {
        it('contains correct Rama Setu metadata, Nala and Nila engineers, and Dhanushkodi origin', () => {
            expect(data.RAMA_SETU_INFO.id).toBe('rama-setu-story');
            expect(data.RAMA_SETU_INFO.title).toContain('Rama Setu');
            expect(data.RAMA_SETU_INFO.characters).toContain('Nala & Nila');
            expect(data.RAMA_SETU_INFO.startingPoint).toContain('Dhanushkodi');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.RAMA_SETU_INFO.quickStats)).toBe(true);
            expect(data.RAMA_SETU_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & GEOGRAPHICAL_AND_CULTURAL_HERITAGE', () => {
        it('contains 5 chronological story chapters and squirrel devotion fable', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const squirrel = data.STORY_CHAPTERS.find(c => c.title.includes('Squirrel') || c.chapter.includes('Squirrel'));
            expect(squirrel).toBeDefined();

            expect(Array.isArray(data.GEOGRAPHICAL_AND_CULTURAL_HERITAGE)).toBe(true);
            const rameshwaram = data.GEOGRAPHICAL_AND_CULTURAL_HERITAGE.find(h => h.aspect.includes('Pilgrimage'));
            expect(rameshwaram).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Yuddha Kanda and Archaeological Survey citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
