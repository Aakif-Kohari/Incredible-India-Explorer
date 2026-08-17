import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEastKolkataData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/east-kolkata-wetlands-explorer/east-kolkata-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { EAST_KOLKATA_INFO, ECOLOGY_HYDROLOGY, WILDLIFE_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('East Kolkata Wetlands Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadEastKolkataData();
    });

    describe('EAST_KOLKATA_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.EAST_KOLKATA_INFO.id).toBe('east-kolkata-wetlands-explorer');
            expect(data.EAST_KOLKATA_INFO.name).toContain('East Kolkata');
            expect(data.EAST_KOLKATA_INFO.ramsarYear).toBe(2002);
            expect(data.EAST_KOLKATA_INFO.ramsarSiteNo).toBe(1208);
            expect(data.EAST_KOLKATA_INFO.state).toBe('West Bengal');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.EAST_KOLKATA_INFO.quickStats)).toBe(true);
            expect(data.EAST_KOLKATA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains unescoRecognition, ramsarSite, wastewaterManagement, fisheries, biodiversity, and localLivelihood', () => {
            expect(data.ECOLOGY_HYDROLOGY.unescoRecognition).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.ramsarSite).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.wastewaterManagement).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.fisheries).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.biodiversity).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.localLivelihood).toBeDefined();
        });
    });

    describe('WILDLIFE_SPECIES catalog', () => {
        it('is a non-empty array of wetland species', () => {
            expect(Array.isArray(data.WILDLIFE_SPECIES)).toBe(true);
            expect(data.WILDLIFE_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Fishing Cat', () => {
            const fishingCat = data.WILDLIFE_SPECIES.find(b => b.id === 'fishing-cat');
            expect(fishingCat).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const kolkataCard = wetlandsData.wetlands.find(w => w.id === 'east-kolkata-wetlands');
            expect(kolkataCard).toBeDefined();
            expect(kolkataCard.exploreUrl).toBe('../east-kolkata-wetlands-explorer/index.html');
        });
    });
});
