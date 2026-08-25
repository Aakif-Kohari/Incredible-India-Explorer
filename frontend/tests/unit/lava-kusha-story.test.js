import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadLavaKushaData() {
    const code = readFileSync(
        resolve(__dirname, '../../lava-kusha-story/lava-kusha-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { LAVA_KUSHA_INFO, STORY_CHAPTERS, CULTURAL_SIGNIFICANCE, REFERENCES };'
    );
    return fn();
}

describe('Lava and Kusha Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadLavaKushaData();
    });

    describe('LAVA_KUSHA_INFO metadata', () => {
        it('contains correct Lava and Kusha metadata and Valmiki mentorship', () => {
            expect(data.LAVA_KUSHA_INFO.id).toBe('lava-kusha-story');
            expect(data.LAVA_KUSHA_INFO.title).toContain('Lava and Kusha');
            expect(data.LAVA_KUSHA_INFO.mentor).toContain('Valmiki');
            expect(data.LAVA_KUSHA_INFO.birthplace).toContain('Valmiki Ashram');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.LAVA_KUSHA_INFO.quickStats)).toBe(true);
            expect(data.LAVA_KUSHA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STORY_CHAPTERS & CULTURAL_SIGNIFICANCE', () => {
        it('contains 5 chronological story chapters and Kushilava bardic tradition', () => {
            expect(Array.isArray(data.STORY_CHAPTERS)).toBe(true);
            expect(data.STORY_CHAPTERS.length).toBe(5);

            const ashwamedha = data.STORY_CHAPTERS.find(c => c.chapter.includes('Ashwamedha'));
            expect(ashwamedha).toBeDefined();

            expect(Array.isArray(data.CULTURAL_SIGNIFICANCE)).toBe(true);
            const bard = data.CULTURAL_SIGNIFICANCE.find(s => s.title.includes('Kushilava'));
            expect(bard).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Uttara Kanda and Bhavabhuti citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
