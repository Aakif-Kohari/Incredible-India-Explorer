import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMalabarFrogData() {
    const code = readFileSync(
        resolve(__dirname, '../../malabar-gliding-frog-explorer/malabar-frog-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MALABAR_FROG_INFO, TAXONOMY_DATA, ECOLOGY_BEHAVIOUR, INTERESTING_FACTS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Malabar Gliding Frog Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMalabarFrogData();
    });

    describe('MALABAR_FROG_INFO metadata', () => {
        it('contains correct species metadata and Western Ghats endemism', () => {
            expect(data.MALABAR_FROG_INFO.id).toBe('malabar-gliding-frog');
            expect(data.MALABAR_FROG_INFO.scientificName).toBe('Rhacophorus malabaricus');
            expect(data.MALABAR_FROG_INFO.endemicRegion).toContain('Western Ghats');
            expect(data.MALABAR_FROG_INFO.iucnStatus).toContain('Least Concern');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MALABAR_FROG_INFO.quickStats)).toBe(true);
            expect(data.MALABAR_FROG_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TAXONOMY_DATA', () => {
        it('contains valid amphibian taxonomy classification', () => {
            expect(data.TAXONOMY_DATA.class).toBe('Amphibia');
            expect(data.TAXONOMY_DATA.family).toBe('Rhacophoridae');
            expect(data.TAXONOMY_DATA.genus).toBe('Rhacophorus');
        });
    });

    describe('ECOLOGY_BEHAVIOUR', () => {
        it('contains required sections', () => {
            expect(data.ECOLOGY_BEHAVIOUR.overview).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.distribution).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.habitat).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.behaviour).toBeDefined();
            expect(data.ECOLOGY_BEHAVIOUR.ecologicalImportance).toBeDefined();
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
