import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDeeporBeelData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/deepor-beel-explorer/deepor-beel-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { DEEPOR_BEEL_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Deepor Beel Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadDeeporBeelData();
    });

    describe('DEEPOR_BEEL_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.DEEPOR_BEEL_INFO.id).toBe('deepor-beel-explorer');
            expect(data.DEEPOR_BEEL_INFO.name).toContain('Deepor Beel');
            expect(data.DEEPOR_BEEL_INFO.ramsarYear).toBe(2002);
            expect(data.DEEPOR_BEEL_INFO.ramsarSiteNo).toBe(1207);
            expect(data.DEEPOR_BEEL_INFO.state).toBe('Assam');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.DEEPOR_BEEL_INFO.quickStats)).toBe(true);
            expect(data.DEEPOR_BEEL_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains history, ramsarSite, elephantCorridor, wetlandBirds, fisheries, and biodiversity', () => {
            expect(data.ECOLOGY_HYDROLOGY.history).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.ramsarSite).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.elephantCorridor).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.wetlandBirds).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.fisheries).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.biodiversity).toBeDefined();
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of bird species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Greater Adjutant (Hargila)', () => {
            const hargila = data.BIRD_SPECIES.find(b => b.id === 'greater-adjutant');
            expect(hargila).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const deeporCard = wetlandsData.wetlands.find(w => w.id === 'deepor-beel');
            expect(deeporCard).toBeDefined();
            expect(deeporCard.exploreUrl).toBe('../deepor-beel-explorer/index.html');
        });
    });
});
