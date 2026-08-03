import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSurinsarMansarData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/surinsar-mansar-lakes-explorer/surinsar-mansar-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code +
            '\nreturn { SM_INFO, TWIN_LAKE_ECOSYSTEM, RAMSAR_DETAILS, RELIGIOUS_IMPORTANCE, WILDLIFE_SPECIES, BIRD_SPECIES, LOCAL_LEGENDS, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Surinsar-Mansar Lakes Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSurinsarMansarData();
    });

    describe('SM_INFO metadata', () => {
        it('contains correct wetland metadata and Ramsar status', () => {
            expect(data.SM_INFO.id).toBe('surinsar-mansar-lakes');
            expect(data.SM_INFO.name).toBe('Surinsar-Mansar Lakes');
            expect(data.SM_INFO.ramsarYear).toBe(2005);
            expect(data.SM_INFO.ramsarSiteNo).toBe(1573);
            expect(data.SM_INFO.state).toBe('Jammu & Kashmir');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SM_INFO.quickStats)).toBe(true);
            expect(data.SM_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TWIN_LAKE_ECOSYSTEM', () => {
        it('covers both lakes and hydrology', () => {
            expect(data.TWIN_LAKE_ECOSYSTEM.overview).toBeDefined();
            expect(data.TWIN_LAKE_ECOSYSTEM.surinsarProfile).toContain('Surinsar');
            expect(data.TWIN_LAKE_ECOSYSTEM.mansarProfile).toContain('Mansar');
            expect(data.TWIN_LAKE_ECOSYSTEM.hydrology).toBeDefined();
        });
    });

    describe('RAMSAR_DETAILS', () => {
        it('documents criteria and threats', () => {
            expect(data.RAMSAR_DETAILS.summary).toContain('8 November 2005');
            expect(Array.isArray(data.RAMSAR_DETAILS.criteria)).toBe(true);
            expect(data.RAMSAR_DETAILS.criteria.length).toBeGreaterThanOrEqual(3);
            expect(Array.isArray(data.RAMSAR_DETAILS.threats)).toBe(true);
            expect(data.RAMSAR_DETAILS.conservation).toBeDefined();
        });
    });

    describe('Species catalogs', () => {
        it('wildlife covers the CITES-listed turtles and the medusa', () => {
            const flap = data.WILDLIFE_SPECIES.find(s => s.id === 'indian-flapshell-turtle');
            const soft = data.WILDLIFE_SPECIES.find(s => s.id === 'indian-softshell-turtle');
            const medusa = data.WILDLIFE_SPECIES.find(s => s.id === 'mansariella-medusa');
            expect(flap).toBeDefined();
            expect(soft).toBeDefined();
            expect(medusa).toBeDefined();
        });

        it('birdlife includes the key wintering waterfowl', () => {
            const coot = data.BIRD_SPECIES.find(b => b.id === 'common-coot');
            const pochard = data.BIRD_SPECIES.find(b => b.id === 'common-pochard');
            const tufted = data.BIRD_SPECIES.find(b => b.id === 'tufted-duck');
            expect(coot).toBeDefined();
            expect(pochard).toBeDefined();
            expect(tufted).toBeDefined();
        });
    });

    describe('Mythology, map hotspots and gallery', () => {
        it('includes local legends', () => {
            expect(Array.isArray(data.LOCAL_LEGENDS)).toBe(true);
            expect(data.LOCAL_LEGENDS.length).toBeGreaterThanOrEqual(3);
        });

        it('has map hotspots and gallery images', () => {
            expect(Array.isArray(data.MAP_HOTSPOTS)).toBe(true);
            expect(data.MAP_HOTSPOTS.length).toBeGreaterThanOrEqual(3);
            expect(data.MAP_HOTSPOTS.find(s => s.id === 'mansar-lake')).toBeDefined();
            expect(Array.isArray(data.GALLERY_IMAGES)).toBe(true);
            expect(data.GALLERY_IMAGES.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const smCard = wetlandsData.wetlands.find(w => w.id === 'surinsar-mansar-lakes');
            expect(smCard).toBeDefined();
            expect(smCard.ramsarSiteNo).toBe(1573);
            expect(smCard.state).toBe('Jammu & Kashmir');
            expect(smCard.exploreUrl).toBe('../surinsar-mansar-lakes-explorer/index.html');
        });
    });
});
