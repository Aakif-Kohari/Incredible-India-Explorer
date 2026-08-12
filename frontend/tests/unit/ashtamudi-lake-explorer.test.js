import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadAshtamudiLakeData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/ashtamudi-lake-explorer/ashtamudi-lake-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { ASHTAMUDI_LAKE_INFO, ECOLOGY_HYDROLOGY, WILDLIFE_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Ashtamudi Lake Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadAshtamudiLakeData();
    });

    describe('ASHTAMUDI_LAKE_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.ASHTAMUDI_LAKE_INFO.id).toBe('ashtamudi-lake-explorer');
            expect(data.ASHTAMUDI_LAKE_INFO.name).toContain('Ashtamudi');
            expect(data.ASHTAMUDI_LAKE_INFO.ramsarYear).toBe(2002);
            expect(data.ASHTAMUDI_LAKE_INFO.ramsarSiteNo).toBe(1214);
            expect(data.ASHTAMUDI_LAKE_INFO.state).toBe('Kerala');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.ASHTAMUDI_LAKE_INFO.quickStats)).toBe(true);
            expect(data.ASHTAMUDI_LAKE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains ramsarSite, backwaters, houseboats, mangroves, fisheries, and birdlife', () => {
            expect(data.ECOLOGY_HYDROLOGY.ramsarSite).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.backwaters).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.houseboats).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.mangroves).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.fisheries).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.birdlife).toBeDefined();
        });
    });

    describe('WILDLIFE_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.WILDLIFE_SPECIES)).toBe(true);
            expect(data.WILDLIFE_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Stork-billed Kingfisher', () => {
            const kingfisher = data.WILDLIFE_SPECIES.find(b => b.id === 'stork-billed-kingfisher');
            expect(kingfisher).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const ashtamudiCard = wetlandsData.wetlands.find(w => w.id === 'ashtamudi-lake');
            expect(ashtamudiCard).toBeDefined();
            expect(ashtamudiCard.exploreUrl).toBe('../ashtamudi-lake-explorer/index.html');
        });
    });
});
