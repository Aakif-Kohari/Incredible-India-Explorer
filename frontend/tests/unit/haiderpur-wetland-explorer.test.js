import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadHaiderpurData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/haiderpur-wetland-explorer/haiderpur-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { HAIDERPUR_INFO, ECOLOGY_HYDROLOGY, FAUNA_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Haiderpur Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadHaiderpurData();
    });

    describe('HAIDERPUR_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.HAIDERPUR_INFO.id).toBe('haiderpur-wetland');
            expect(data.HAIDERPUR_INFO.name).toContain('Haiderpur');
            expect(data.HAIDERPUR_INFO.ramsarYear).toBe(2021);
            expect(data.HAIDERPUR_INFO.ramsarSiteNo).toBe(2463);
            expect(data.HAIDERPUR_INFO.state).toBe('Uttar Pradesh');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.HAIDERPUR_INFO.quickStats)).toBe(true);
            expect(data.HAIDERPUR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, hydrology, biodiversity, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.hydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.biodiversity).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('FAUNA_SPECIES catalog', () => {
        it('is a non-empty array of fauna species', () => {
            expect(Array.isArray(data.FAUNA_SPECIES)).toBe(true);
            expect(data.FAUNA_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Swamp Deer (Barasingha) and Sarus Crane', () => {
            const deer = data.FAUNA_SPECIES.find(b => b.id === 'swamp-deer');
            const crane = data.FAUNA_SPECIES.find(b => b.id === 'sarus-crane');
            expect(deer).toBeDefined();
            expect(crane).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const haiderpurCard = wetlandsData.wetlands.find(w => w.id === 'haiderpur-wetland');
            expect(haiderpurCard).toBeDefined();
            expect(haiderpurCard.exploreUrl).toBe('../haiderpur-wetland-explorer/index.html');
        });
    });
});
