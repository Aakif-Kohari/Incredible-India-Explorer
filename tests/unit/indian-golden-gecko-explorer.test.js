import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadGeckoData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/indian-golden-gecko-explorer/gecko-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { GECKO_INFO, TAXONOMY_DATA, ECOLOGY_BEHAVIOUR, INTERESTING_FACTS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Indian Golden Gecko Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadGeckoData();
    });

    describe('GECKO_INFO metadata', () => {
        it('contains correct species metadata and Eastern Ghats endemism', () => {
            expect(data.GECKO_INFO.id).toBe('indian-golden-gecko');
            expect(data.GECKO_INFO.scientificName).toBe('Calodactylodes aureus');
            expect(data.GECKO_INFO.endemicRegion).toContain('Eastern Ghats');
            expect(data.GECKO_INFO.protectionStatus).toContain('Schedule I');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.GECKO_INFO.quickStats)).toBe(true);
            expect(data.GECKO_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TAXONOMY_DATA', () => {
        it('contains valid taxonomy classification', () => {
            expect(data.TAXONOMY_DATA.class).toBe('Reptilia');
            expect(data.TAXONOMY_DATA.family).toBe('Gekkonidae');
            expect(data.TAXONOMY_DATA.genus).toBe('Calodactylodes');
        });
    });

    describe('ECOLOGY_BEHAVIOUR', () => {
        it('contains required sections', () => {
            expect(data.ECOLOGY_BEHAVIOUR.introduction).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.distribution).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.habitat).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.behaviour).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.conservation).toBeDefined();
        });
    });

    describe('INTERESTING_FACTS & GALLERY', () => {
        it('has non-empty facts and gallery images', () => {
            expect(Array.isArray(data.INTERESTING_FACTS)).toBe(true);
            expect(data.INTERESTING_FACTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.GALLERY_IMAGES)).toBe(true);
            expect(data.GALLERY_IMAGES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
