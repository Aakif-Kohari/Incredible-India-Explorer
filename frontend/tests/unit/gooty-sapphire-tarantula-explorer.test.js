import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTarantulaData() {
    const code = readFileSync(
        resolve(__dirname, '../../gooty-sapphire-tarantula-explorer/tarantula-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { TARANTULA_INFO, TAXONOMY_DATA, ECOLOGY_BEHAVIOUR, INTERESTING_FACTS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Gooty Sapphire Ornamental Tarantula Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadTarantulaData();
    });

    describe('TARANTULA_INFO metadata', () => {
        it('contains correct species metadata and Andhra Pradesh endemism', () => {
            expect(data.TARANTULA_INFO.id).toBe('gooty-sapphire-tarantula');
            expect(data.TARANTULA_INFO.scientificName).toBe('Poecilotheria metallica');
            expect(data.TARANTULA_INFO.endemicRegion).toContain('Andhra Pradesh');
            expect(data.TARANTULA_INFO.iucnStatus).toContain('Critically Endangered');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.TARANTULA_INFO.quickStats)).toBe(true);
            expect(data.TARANTULA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TAXONOMY_DATA', () => {
        it('contains valid arachnid taxonomy classification', () => {
            expect(data.TAXONOMY_DATA.class).toBe('Arachnida');
            expect(data.TAXONOMY_DATA.family).toBe('Theraphosidae');
            expect(data.TAXONOMY_DATA.genus).toBe('Poecilotheria');
        });
    });

    describe('ECOLOGY_BEHAVIOUR', () => {
        it('contains required sections', () => {
            expect(data.ECOLOGY_BEHAVIOUR.introduction).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.distribution).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.habitat).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.lifeCycle).toBeDefined();
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
