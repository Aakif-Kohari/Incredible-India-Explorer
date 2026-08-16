import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadHygamData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/hygam-wetland-explorer/hygam-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { HYGAM_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, INTERESTING_FACTS, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Hygam Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadHygamData();
    });

    describe('HYGAM_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.HYGAM_INFO.id).toBe('hygam-wetland');
            expect(data.HYGAM_INFO.name).toContain('Hygam');
            expect(data.HYGAM_INFO.ramsarYear).toBe(2022);
            expect(data.HYGAM_INFO.ramsarSiteNo).toBe(2489);
            expect(data.HYGAM_INFO.state).toBe('Jammu & Kashmir');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.HYGAM_INFO.quickStats)).toBe(true);
            expect(data.HYGAM_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY & INTERESTING_FACTS', () => {
        it('contains overview, hydrology, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.hydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });

        it('contains interesting facts array', () => {
            expect(Array.isArray(data.INTERESTING_FACTS)).toBe(true);
            expect(data.INTERESTING_FACTS.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of migratory bird species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Mallard and Northern Pintail', () => {
            const mallard = data.BIRD_SPECIES.find(b => b.id === 'mallard');
            const pintail = data.BIRD_SPECIES.find(b => b.id === 'northern-pintail');
            expect(mallard).toBeDefined();
            expect(pintail).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const hygamCard = wetlandsData.wetlands.find(w => w.id === 'hygam-wetland');
            expect(hygamCard).toBeDefined();
            expect(hygamCard.exploreUrl).toBe('../hygam-wetland-explorer/index.html');
        });
    });
});
