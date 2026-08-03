import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadVellodeData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/vellode-wetland-explorer/vellode-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { VELLODE_INFO, ECOLOGY_HYDROLOGY, INTERESTING_FACTS, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Vellode Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadVellodeData();
    });

    describe('VELLODE_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.VELLODE_INFO.id).toBe('vellode-wetland');
            expect(data.VELLODE_INFO.name).toContain('Vellode');
            expect(data.VELLODE_INFO.ramsarYear).toBe(2022);
            expect(data.VELLODE_INFO.ramsarSiteNo).toBe(2482);
            expect(data.VELLODE_INFO.state).toBe('Tamil Nadu');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.VELLODE_INFO.quickStats)).toBe(true);
            expect(data.VELLODE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY & INTERESTING_FACTS', () => {
        it('contains overview, hydrology, history, and status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.hydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.history).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });

        it('contains interesting facts array', () => {
            expect(Array.isArray(data.INTERESTING_FACTS)).toBe(true);
            expect(data.INTERESTING_FACTS.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Spot-billed Pelican and Oriental Darter', () => {
            const pelican = data.BIRD_SPECIES.find(b => b.id === 'spot-billed-pelican');
            const darter = data.BIRD_SPECIES.find(b => b.id === 'oriental-darter');
            expect(pelican).toBeDefined();
            expect(darter).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const vellodeCard = wetlandsData.wetlands.find(w => w.id === 'vellode-wetland');
            expect(vellodeCard).toBeDefined();
            expect(vellodeCard.exploreUrl).toBe('../vellode-wetland-explorer/index.html');
        });
    });
});
