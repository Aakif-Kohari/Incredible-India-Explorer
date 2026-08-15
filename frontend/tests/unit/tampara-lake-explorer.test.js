import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTamparaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/tampara-lake-explorer/tampara-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { TAMPARA_INFO, ECOLOGY_HYDROLOGY, BIRD_FISH_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Tampara Lake Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadTamparaData();
    });

    describe('TAMPARA_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.TAMPARA_INFO.id).toBe('tampara-lake');
            expect(data.TAMPARA_INFO.name).toBe('Tampara Lake');
            expect(data.TAMPARA_INFO.ramsarYear).toBe(2022);
            expect(data.TAMPARA_INFO.ramsarSiteNo).toBe(2488);
            expect(data.TAMPARA_INFO.state).toBe('Odisha');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.TAMPARA_INFO.quickStats)).toBe(true);
            expect(data.TAMPARA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, hydrology, fisheries, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.hydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.fisheriesAndEconomy).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_FISH_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.BIRD_FISH_SPECIES)).toBe(true);
            expect(data.BIRD_FISH_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Common Pochard and Rohu Fish', () => {
            const pochard = data.BIRD_FISH_SPECIES.find(b => b.id === 'common-pochard');
            const rohu = data.BIRD_FISH_SPECIES.find(b => b.id === 'labeo-rohita');
            expect(pochard).toBeDefined();
            expect(rohu).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const tamparaCard = wetlandsData.wetlands.find(w => w.id === 'tampara-lake');
            expect(tamparaCard).toBeDefined();
            expect(tamparaCard.exploreUrl).toBe('../tampara-lake-explorer/index.html');
        });
    });
});
