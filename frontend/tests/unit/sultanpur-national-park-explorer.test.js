import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSultanpurData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/sultanpur-national-park-explorer/sultanpur-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SULTANPUR_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Sultanpur National Park & Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSultanpurData();
    });

    describe('SULTANPUR_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.SULTANPUR_INFO.id).toBe('sultanpur-national-park');
            expect(data.SULTANPUR_INFO.name).toContain('Sultanpur');
            expect(data.SULTANPUR_INFO.ramsarYear).toBe(2021);
            expect(data.SULTANPUR_INFO.ramsarSiteNo).toBe(2459);
            expect(data.SULTANPUR_INFO.state).toBe('Haryana');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SULTANPUR_INFO.quickStats)).toBe(true);
            expect(data.SULTANPUR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, hydrology, history, and status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.hydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.history).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of waterfowl species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Bar-headed Goose and Black-necked Stork', () => {
            const goose = data.BIRD_SPECIES.find(b => b.id === 'bar-headed-goose');
            const stork = data.BIRD_SPECIES.find(b => b.id === 'black-necked-stork');
            expect(goose).toBeDefined();
            expect(stork).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const sultanpurCard = wetlandsData.wetlands.find(w => w.id === 'sultanpur-national-park');
            expect(sultanpurCard).toBeDefined();
            expect(sultanpurCard.exploreUrl).toBe('../sultanpur-national-park-explorer/index.html');
        });
    });
});
