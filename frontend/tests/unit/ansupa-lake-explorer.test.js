import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadAnsupaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/ansupa-lake-explorer/ansupa-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { ANSUPA_INFO, ECOLOGY_HYDROLOGY, BIRD_FLORA_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Ansupa Lake Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadAnsupaData();
    });

    describe('ANSUPA_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.ANSUPA_INFO.id).toBe('ansupa-lake');
            expect(data.ANSUPA_INFO.name).toBe('Ansupa Lake');
            expect(data.ANSUPA_INFO.ramsarYear).toBe(2022);
            expect(data.ANSUPA_INFO.ramsarSiteNo).toBe(2487);
            expect(data.ANSUPA_INFO.state).toBe('Odisha');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.ANSUPA_INFO.quickStats)).toBe(true);
            expect(data.ANSUPA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, oxbow hydrology, aquatic flora, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.oxbowHydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.aquaticFlora).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_FLORA_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.BIRD_FLORA_SPECIES)).toBe(true);
            expect(data.BIRD_FLORA_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Cotton Pygmy Goose and Indian Sacred Lotus', () => {
            const goose = data.BIRD_FLORA_SPECIES.find(b => b.id === 'cotton-pygmy-goose');
            const lotus = data.BIRD_FLORA_SPECIES.find(b => b.id === 'indian-lotus');
            expect(goose).toBeDefined();
            expect(lotus).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const ansupaCard = wetlandsData.wetlands.find(w => w.id === 'ansupa-lake');
            expect(ansupaCard).toBeDefined();
            expect(ansupaCard.exploreUrl).toBe('../ansupa-lake-explorer/index.html');
        });
    });
});
