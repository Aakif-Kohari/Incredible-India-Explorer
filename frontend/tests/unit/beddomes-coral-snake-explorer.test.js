import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSnakeData() {
    const code = readFileSync(
        resolve(__dirname, '../../beddomes-coral-snake-explorer/snake-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SNAKE_INFO, ECOLOGICAL_PROFILE, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe("Beddome's Coral Snake Explorer — Data Tests", () => {
    let data;

    beforeAll(() => {
        data = loadSnakeData();
    });

    describe('SNAKE_INFO metadata', () => {
        it('contains correct Beddome\'s Coral Snake taxonomy and attributes', () => {
            expect(data.SNAKE_INFO.id).toBe('beddomes-coral-snake');
            expect(data.SNAKE_INFO.scientificName).toBe('Calliophis beddomei');
            expect(data.SNAKE_INFO.taxonomy.family).toBe('Elapidae');
            expect(data.SNAKE_INFO.endemicRegion).toContain('Western Ghats');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SNAKE_INFO.quickStats)).toBe(true);
            expect(data.SNAKE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGICAL_PROFILE', () => {
        it('contains required ecological attributes and interesting facts', () => {
            expect(data.ECOLOGICAL_PROFILE.overview).toBeDefined();
            expect(data.ECOLOGICAL_PROFILE.distributionAndHabitat).toBeDefined();
            expect(data.ECOLOGICAL_PROFILE.behaviour).toBeDefined();
            expect(data.ECOLOGICAL_PROFILE.diet).toBeDefined();
            expect(data.ECOLOGICAL_PROFILE.reproduction).toBeDefined();
            expect(data.ECOLOGICAL_PROFILE.threatsAndConservation).toBeDefined();
            expect(data.ECOLOGICAL_PROFILE.ecologicalImportance).toBeDefined();
            expect(Array.isArray(data.ECOLOGICAL_PROFILE.interestingFacts)).toBe(true);
            expect(data.ECOLOGICAL_PROFILE.interestingFacts.length).toBeGreaterThanOrEqual(4);
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
