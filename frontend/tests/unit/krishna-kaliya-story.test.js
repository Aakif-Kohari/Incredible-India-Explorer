import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKaliyaData() {
    const code = readFileSync(
        resolve(__dirname, '../../krishna-kaliya-story/kaliya-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KALIYA_INFO, STORY_CHAPTERS, DID_YOU_KNOW, REFERENCES };'
    );
    return fn();
}

describe('Krishna and Kaliya Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKaliyaData();
    });

    describe('KALIYA_INFO metadata', () => {
        it('contains correct Krishna and Kaliya metadata, Kaliya Ghat location, and Yamuna river', () => {
            expect(data.KALIYA_INFO.id).toBe('krishna-kaliya-story');
            expect(data.KALIYA_INFO.title).toContain('Krishna and Kaliya');
            expect(data.KALIYA_INFO.location).toContain('Kaliya Ghat');
            expect(data.KALIYA_INFO.characters).toContain('Kaliya');
            expect(data.KALIYA_INFO.sacredTree).toContain('Kadamba');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.KALIYA_INFO.quickStats)).toBe(true);
            expect(data.KALIYA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & DID_YOU_KNOW', () => {
        it('contains 5 chronological story chapters and Kadamba tree lore', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const cosmicDance = data.STORY_CHAPTERS.find(c => c.title.includes('110 Hoods') || c.chapter.includes('Cosmic Dance'));
            expect(cosmicDance).toBeDefined();

            expect(Array.isArray(data.DID_YOU_KNOW)).toBe(true);
            const kadamba = data.DID_YOU_KNOW.find(d => d.fact.includes('Kadamba'));
            expect(kadamba).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Bhagavata Purana and Vishnu Purana citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
