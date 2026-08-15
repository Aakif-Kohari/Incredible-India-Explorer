import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSatkosiaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/satkosia-gorge-wetlands-explorer/satkosia-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SATKOSIA_INFO, ECOLOGY_HYDROLOGY, INTERESTING_FACTS, SPECIES_CATALOG, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Satkosia Gorge Wetlands Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSatkosiaData();
    });

    describe('SATKOSIA_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.SATKOSIA_INFO.id).toBe('satkosia-gorge-wetland');
            expect(data.SATKOSIA_INFO.name).toContain('Satkosia');
            expect(data.SATKOSIA_INFO.ramsarYear).toBe(2022);
            expect(data.SATKOSIA_INFO.ramsarSiteNo).toBe(2468);
            expect(data.SATKOSIA_INFO.state).toBe('Odisha');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SATKOSIA_INFO.quickStats)).toBe(true);
            expect(data.SATKOSIA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY & INTERESTING_FACTS', () => {
        it('contains overview, gorge hydrology, crocodile conservation, and status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.gorgeHydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.crocodileConservation).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });

        it('contains interesting facts array', () => {
            expect(Array.isArray(data.INTERESTING_FACTS)).toBe(true);
            expect(data.INTERESTING_FACTS.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('SPECIES_CATALOG', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.SPECIES_CATALOG)).toBe(true);
            expect(data.SPECIES_CATALOG.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Gharial and Mugger Crocodile', () => {
            const gharial = data.SPECIES_CATALOG.find(b => b.id === 'gharial');
            const mugger = data.SPECIES_CATALOG.find(b => b.id === 'mugger-crocodile');
            expect(gharial).toBeDefined();
            expect(mugger).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const satkosiaCard = wetlandsData.wetlands.find(w => w.id === 'satkosia-gorge-wetland');
            expect(satkosiaCard).toBeDefined();
            expect(satkosiaCard.exploreUrl).toBe('../satkosia-gorge-wetlands-explorer/index.html');
        });
    });
});
