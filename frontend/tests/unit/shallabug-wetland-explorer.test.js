import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadShallabugData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/shallabug-wetland-explorer/shallabug-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SHALLABUG_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Shallabug Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadShallabugData();
    });

    describe('SHALLABUG_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.SHALLABUG_INFO.id).toBe('shallabug-wetland');
            expect(data.SHALLABUG_INFO.name).toContain('Shallabug');
            expect(data.SHALLABUG_INFO.ramsarYear).toBe(2022);
            expect(data.SHALLABUG_INFO.ramsarSiteNo).toBe(2490);
            expect(data.SHALLABUG_INFO.state).toBe('Jammu & Kashmir');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SHALLABUG_INFO.quickStats)).toBe(true);
            expect(data.SHALLABUG_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, marsh ecology, community livelihood, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.marshEcology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.communityLivelihood).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of migratory bird species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Eurasian Wigeon and Garganey', () => {
            const wigeon = data.BIRD_SPECIES.find(b => b.id === 'eurasian-wigeon');
            const garganey = data.BIRD_SPECIES.find(b => b.id === 'garganey');
            expect(wigeon).toBeDefined();
            expect(garganey).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const shallabugCard = wetlandsData.wetlands.find(w => w.id === 'shallabug-wetland');
            expect(shallabugCard).toBeDefined();
            expect(shallabugCard.exploreUrl).toBe('../shallabug-wetland-explorer/index.html');
        });
    });
});
