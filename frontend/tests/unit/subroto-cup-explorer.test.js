import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSubrotoData() {
    const code = readFileSync(
        resolve(__dirname, '../../subroto-cup-explorer/subroto-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SUBROTO_INFO, AGE_CATEGORIES, FAMOUS_ALUMNI, PLAYER_PIPELINE, REFERENCES };'
    );
    return fn();
}

describe('Subroto Cup Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSubrotoData();
    });

    describe('SUBROTO_INFO metadata', () => {
        it('contains correct Subroto Cup metadata and founding year 1960', () => {
            expect(data.SUBROTO_INFO.id).toBe('subroto-cup');
            expect(data.SUBROTO_INFO.title).toContain('Subroto Cup');
            expect(data.SUBROTO_INFO.foundedYear).toBe('1960 CE');
            expect(data.SUBROTO_INFO.namesake).toContain('Subroto Mukerjee');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SUBROTO_INFO.quickStats)).toBe(true);
            expect(data.SUBROTO_INFO.quickStats.length).toBe(6);
        });
    });

    describe('AGE_CATEGORIES & FAMOUS_ALUMNI', () => {
        it('contains U-14, U-17 age divisions and famous alumni like Sunil Chhetri', () => {
            expect(Array.isArray(data.AGE_CATEGORIES)).toBe(true);
            expect(data.AGE_CATEGORIES.length).toBeGreaterThanOrEqual(3);

            expect(Array.isArray(data.FAMOUS_ALUMNI)).toBe(true);
            const chhetri = data.FAMOUS_ALUMNI.find(a => a.name.includes('Chhetri'));
            expect(chhetri).toBeDefined();
        });
    });

    describe('PLAYER_PIPELINE & REFERENCES', () => {
        it('contains youth player pipeline steps and reference citations', () => {
            expect(Array.isArray(data.PLAYER_PIPELINE)).toBe(true);
            expect(data.PLAYER_PIPELINE.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
