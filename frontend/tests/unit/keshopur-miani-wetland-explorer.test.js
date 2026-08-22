import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKeshopurMianiData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/keshopur-miani-wetland-explorer/keshopur-miani-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KESHOPUR_MIANI_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Keshopur-Miani Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKeshopurMianiData();
    });

    describe('KESHOPUR_MIANI_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.KESHOPUR_MIANI_INFO.id).toBe('keshopur-miani-wetland');
            expect(data.KESHOPUR_MIANI_INFO.name).toContain('Keshopur-Miani');
            expect(data.KESHOPUR_MIANI_INFO.ramsarYear).toBe(2019);
            expect(data.KESHOPUR_MIANI_INFO.ramsarSiteNo).toBe(2408);
            expect(data.KESHOPUR_MIANI_INFO.state).toBe('Punjab');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.KESHOPUR_MIANI_INFO.quickStats)).toBe(true);
            expect(data.KESHOPUR_MIANI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, wetland ecology, community fisheries, and conservation status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.wetlandEcology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.communityFisheries).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of bird species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Sarus Crane and Common Teal', () => {
            const sarusCrane = data.BIRD_SPECIES.find(b => b.id === 'sarus-crane');
            const commonTeal = data.BIRD_SPECIES.find(b => b.id === 'common-teal');
            expect(sarusCrane).toBeDefined();
            expect(commonTeal).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const keshopurCard = wetlandsData.wetlands.find(w => w.id === 'keshopur-miani-wetland');
            expect(keshopurCard).toBeDefined();
            expect(keshopurCard.exploreUrl).toBe('../keshopur-miani-wetland-explorer/index.html');
        });
    });
});
