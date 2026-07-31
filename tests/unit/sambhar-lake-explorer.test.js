import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSambharLakeData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/sambhar-lake-explorer/sambhar-lake-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SAMBHAR_LAKE_INFO, ECOLOGY_HYDROLOGY, WILDLIFE_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Sambhar Lake Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSambharLakeData();
    });

    describe('SAMBHAR_LAKE_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.SAMBHAR_LAKE_INFO.id).toBe('sambhar-lake-explorer');
            expect(data.SAMBHAR_LAKE_INFO.name).toContain('Sambhar');
            expect(data.SAMBHAR_LAKE_INFO.ramsarYear).toBe(1990);
            expect(data.SAMBHAR_LAKE_INFO.ramsarSiteNo).toBe(464);
            expect(data.SAMBHAR_LAKE_INFO.state).toBe('Rajasthan');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SAMBHAR_LAKE_INFO.quickStats)).toBe(true);
            expect(data.SAMBHAR_LAKE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains saltProduction, flamingos, ramsarSite, history, geography, and wildlife', () => {
            expect(data.ECOLOGY_HYDROLOGY.saltProduction).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.flamingos).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.ramsarSite).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.history).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.geography).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.wildlife).toBeDefined();
        });
    });

    describe('WILDLIFE_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.WILDLIFE_SPECIES)).toBe(true);
            expect(data.WILDLIFE_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Greater Flamingo', () => {
            const flamingo = data.WILDLIFE_SPECIES.find(b => b.id === 'greater-flamingo');
            expect(flamingo).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const sambharCard = wetlandsData.wetlands.find(w => w.id === 'sambhar-lake');
            expect(sambharCard).toBeDefined();
            expect(sambharCard.exploreUrl).toBe('../sambhar-lake-explorer/index.html');
        });
    });
});
