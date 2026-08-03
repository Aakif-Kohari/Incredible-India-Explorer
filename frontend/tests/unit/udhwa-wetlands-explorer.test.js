import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadUdhwaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/udhwa-wetlands-explorer/udhwa-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { UDHWA_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Udhwa Wetlands Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadUdhwaData();
    });

    describe('UDHWA_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.UDHWA_INFO.id).toBe('udhwa-wetlands');
            expect(data.UDHWA_INFO.name).toContain('Udhwa');
            expect(data.UDHWA_INFO.ramsarYear).toBe(2024);
            expect(data.UDHWA_INFO.ramsarSiteNo).toBe(2510);
            expect(data.UDHWA_INFO.state).toBe('Jharkhand');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.UDHWA_INFO.quickStats)).toBe(true);
            expect(data.UDHWA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, lakes hydrology, biodiversity, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.lakesHydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.biodiversity).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of migratory bird species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Tufted Duck and Northern Pintail', () => {
            const duck = data.BIRD_SPECIES.find(b => b.id === 'tufted-duck');
            const pintail = data.BIRD_SPECIES.find(b => b.id === 'northern-pintail');
            expect(duck).toBeDefined();
            expect(pintail).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const udhwaCard = wetlandsData.wetlands.find(w => w.id === 'udhwa-wetlands');
            expect(udhwaCard).toBeDefined();
            expect(udhwaCard.exploreUrl).toBe('../udhwa-wetlands-explorer/index.html');
        });
    });
});
