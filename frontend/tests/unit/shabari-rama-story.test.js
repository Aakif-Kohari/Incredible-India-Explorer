import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadShabariData() {
    const code = readFileSync(
        resolve(__dirname, '../../shabari-rama-story/shabari-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SHABARI_INFO, STORY_CHAPTERS, DEVOTIONAL_THEMES, REFERENCES };'
    );
    return fn();
}

describe('Shabari and Rama Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadShabariData();
    });

    describe('SHABARI_INFO metadata', () => {
        it('contains correct Shabari metadata, Matanga ashram, and Pampa Sarovar', () => {
            expect(data.SHABARI_INFO.id).toBe('shabari-rama-story');
            expect(data.SHABARI_INFO.title).toContain('Shabari and Rama');
            expect(data.SHABARI_INFO.hermitage).toContain('Matanga');
            expect(data.SHABARI_INFO.sacredOffering).toContain('Ber');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SHABARI_INFO.quickStats)).toBe(true);
            expect(data.SHABARI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & DEVOTIONAL_THEMES', () => {
        it('contains 5 chronological story chapters and Navadha Bhakti discourse', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const berries = data.STORY_CHAPTERS.find(c => c.chapter.includes('Berries') || c.title.includes('Berries'));
            expect(berries).toBeDefined();

            expect(Array.isArray(data.DEVOTIONAL_THEMES)).toBe(true);
            const navadha = data.DEVOTIONAL_THEMES.find(t => t.theme.includes('Navadha Bhakti'));
            expect(navadha).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Aranya Kanda and Ramcharitmanas citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
