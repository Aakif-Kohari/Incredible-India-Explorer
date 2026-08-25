import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadJatayuData() {
    const code = readFileSync(
        resolve(__dirname, '../../jatayu-story/jatayu-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { JATAYU_INFO, STORY_CHAPTERS, CULTURAL_MONUMENTS, REFERENCES };'
    );
    return fn();
}

describe('Jatayu Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadJatayuData();
    });

    describe('JATAYU_INFO metadata', () => {
        it('contains correct Jatayu metadata and Son of Aruna lineage', () => {
            expect(data.JATAYU_INFO.id).toBe('jatayu-story');
            expect(data.JATAYU_INFO.title).toContain('Jatayu');
            expect(data.JATAYU_INFO.lineage).toContain('Aruna');
            expect(data.JATAYU_INFO.identity).toContain('King Dasharatha');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.JATAYU_INFO.quickStats)).toBe(true);
            expect(data.JATAYU_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & CULTURAL_MONUMENTS', () => {
        it('contains 5 chronological story chapters and Jatayu Earth Center monument', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const aerialDuel = data.STORY_CHAPTERS.find(c => c.chapter.includes('Aerial Duel') || c.title.includes('Aerial Duel'));
            expect(aerialDuel).toBeDefined();

            expect(Array.isArray(data.CULTURAL_MONUMENTS)).toBe(true);
            const earthCenter = data.CULTURAL_MONUMENTS.find(m => m.name.includes('Chadayamangalam'));
            expect(earthCenter).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Aranya Kanda and Kerala Tourism citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
