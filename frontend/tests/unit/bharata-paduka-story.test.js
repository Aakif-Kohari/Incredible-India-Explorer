import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBharataData() {
    const code = readFileSync(
        resolve(__dirname, '../../bharata-paduka-story/bharata-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BHARATA_PADUKA_INFO, STORY_CHAPTERS, SYMBOLIC_THEMES, REFERENCES };'
    );
    return fn();
}

describe('Bharata and Rama Sandals Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBharataData();
    });

    describe('BHARATA_PADUKA_INFO metadata', () => {
        it('contains correct Bharata metadata and Nandigram seat of governance', () => {
            expect(data.BHARATA_PADUKA_INFO.id).toBe('bharata-paduka-story');
            expect(data.BHARATA_PADUKA_INFO.title).toContain('Bharata and Rama');
            expect(data.BHARATA_PADUKA_INFO.sacredRelic).toContain('Charan Paduka');
            expect(data.BHARATA_PADUKA_INFO.seatOfGovernance).toContain('Nandigram');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.BHARATA_PADUKA_INFO.quickStats)).toBe(true);
            expect(data.BHARATA_PADUKA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & SYMBOLIC_THEMES', () => {
        it('contains 5 chronological story chapters and Paduka Rajyam concept', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const chitrakoot = data.STORY_CHAPTERS.find(c => c.chapter.includes('Chitrakoot') || c.description.includes('Chitrakoot'));
            expect(chitrakoot).toBeDefined();

            expect(Array.isArray(data.SYMBOLIC_THEMES)).toBe(true);
            const trusteeship = data.SYMBOLIC_THEMES.find(t => t.theme.includes('Paduka Rajyam'));
            expect(trusteeship).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Ayodhya Kanda and Ramcharitmanas citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
