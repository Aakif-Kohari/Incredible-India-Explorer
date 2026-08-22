import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadWadhvanaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/wadhvana-wetland-explorer/wadhvana-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { WADHNAVANA_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Wadhvana Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadWadhvanaData();
    });

    describe('WADHNAVANA_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.WADHNAVANA_INFO.id).toBe('wadhvana-wetland');
            expect(data.WADHNAVANA_INFO.name).toBe('Wadhvana Wetland');
            expect(data.WADHNAVANA_INFO.ramsarYear).toBe(2021);
            expect(data.WADHNAVANA_INFO.ramsarSiteNo).toBe(2454);
            expect(data.WADHNAVANA_INFO.state).toBe('Gujarat');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.WADHNAVANA_INFO.quickStats)).toBe(true);
            expect(data.WADHNAVANA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, hydrology, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.hydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of bird species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Ferruginous Duck and Greylag Goose', () => {
            const ferruginousDuck = data.BIRD_SPECIES.find(b => b.id === 'ferruginous-duck');
            const greylagGoose = data.BIRD_SPECIES.find(b => b.id === 'greylag-goose');
            expect(ferruginousDuck).toBeDefined();
            expect(greylagGoose).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const wadhvanaCard = wetlandsData.wetlands.find(w => w.id === 'wadhvana-wetland');
            expect(wadhvanaCard).toBeDefined();
            expect(wadhvanaCard.exploreUrl).toBe('../wadhvana-wetland-explorer/index.html');
        });
    });
});
