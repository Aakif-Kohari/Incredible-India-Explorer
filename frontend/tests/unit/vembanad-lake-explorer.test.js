import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadVembanadLakeData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/vembanad-lake-explorer/vembanad-lake-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { VEMBANAD_LAKE_INFO, ECOLOGY_HYDROLOGY, WILDLIFE_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Vembanad Lake Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadVembanadLakeData();
    });

    describe('VEMBANAD_LAKE_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.VEMBANAD_LAKE_INFO.id).toBe('vembanad-lake-explorer');
            expect(data.VEMBANAD_LAKE_INFO.name).toContain('Vembanad');
            expect(data.VEMBANAD_LAKE_INFO.ramsarYear).toBe(2002);
            expect(data.VEMBANAD_LAKE_INFO.ramsarSiteNo).toBe(1215);
            expect(data.VEMBANAD_LAKE_INFO.state).toBe('Kerala');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.VEMBANAD_LAKE_INFO.quickStats)).toBe(true);
            expect(data.VEMBANAD_LAKE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains geography, ramsarSite, kumarakomSanctuary, backwaterTourism, houseboats, mangroves, fisheries, and interestingFacts', () => {
            expect(data.ECOLOGY_HYDROLOGY.geography).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.ramsarSite).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.kumarakomSanctuary).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.backwaterTourism).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.houseboats).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.mangroves).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.fisheries).toBeDefined();
            expect(Array.isArray(data.ECOLOGY_HYDROLOGY.interestingFacts)).toBe(true);
            expect(data.ECOLOGY_HYDROLOGY.interestingFacts.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('WILDLIFE_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.WILDLIFE_SPECIES)).toBe(true);
            expect(data.WILDLIFE_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Pearl Spot (Karimeen)', () => {
            const pearlSpot = data.WILDLIFE_SPECIES.find(b => b.id === 'pearl-spot');
            expect(pearlSpot).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const vembanadCard = wetlandsData.wetlands.find(w => w.id === 'vembanad-lake');
            expect(vembanadCard).toBeDefined();
            expect(vembanadCard.exploreUrl).toBe('../vembanad-lake-explorer/index.html');
        });
    });
});
