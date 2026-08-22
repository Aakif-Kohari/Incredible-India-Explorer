import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPalaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/pala-wetland-explorer/pala-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { PALA_INFO, ECOLOGY_HYDROLOGY, BIRD_FISH_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
    );
    return fn();
}

function loadWetlandsLandingData() {
    let code = readFileSync(
        resolve(__dirname, '../../frontend/wetlands/wetlands-data.js'),
        'utf-8'
    );
    code = code.replace(/export\s+const\s+/g, 'const ');
    const fn = new Function(code + '\nreturn WETLANDS_DATA;');
    return fn();
}

describe('Pala Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadPalaData();
    });

    describe('PALA_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.PALA_INFO.id).toBe('pala-wetland');
            expect(data.PALA_INFO.name).toBe('Pala Wetland');
            expect(data.PALA_INFO.ramsarYear).toBe(2021);
            expect(data.PALA_INFO.ramsarSiteNo).toBe(2460);
            expect(data.PALA_INFO.state).toBe('Mizoram');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.PALA_INFO.quickStats)).toBe(true);
            expect(data.PALA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, freshwater ecology, legend, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.freshwaterEcology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.legend).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_FISH_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.BIRD_FISH_SPECIES)).toBe(true);
            expect(data.BIRD_FISH_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes White-winged Wood Duck and Great Hornbill', () => {
            const woodDuck = data.BIRD_FISH_SPECIES.find(b => b.id === 'white-winged-wood-duck');
            const hornbill = data.BIRD_FISH_SPECIES.find(b => b.id === 'great-hornbill');
            expect(woodDuck).toBeDefined();
            expect(hornbill).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const palaCard = wetlandsData.wetlands.find(w => w.id === 'pala-wetland');
            expect(palaCard).toBeDefined();
            expect(palaCard.exploreUrl).toBe('../pala-wetland-explorer/index.html');
        });
    });
});
