import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPointCalimereData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/point-calimere-wetland-explorer/point-calimere-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { POINT_CALIMERE_INFO, COASTAL_ECOLOGY, BIRD_MIGRATION, WILDLIFE_SPECIES, INTERESTING_FACTS, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Point Calimere Wetland Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadPointCalimereData();
    });

    describe('POINT_CALIMERE_INFO metadata', () => {
        it('contains correct wetland metadata and status', () => {
            expect(data.POINT_CALIMERE_INFO.id).toBe('point-calimere');
            expect(data.POINT_CALIMERE_INFO.name).toContain('Point Calimere');
            expect(data.POINT_CALIMERE_INFO.ramsarYear).toBe(2002);
            expect(data.POINT_CALIMERE_INFO.ramsarSiteNo).toBe(1210);
            expect(data.POINT_CALIMERE_INFO.state).toBe('Tamil Nadu');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.POINT_CALIMERE_INFO.quickStats)).toBe(true);
            expect(data.POINT_CALIMERE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('COASTAL_ECOLOGY & BIRD_MIGRATION', () => {
        it('contains overview, coastal habitats, mangroves, migration, and conservation status', () => {
            expect(data.COASTAL_ECOLOGY.overview).toBeDefined();
            expect(data.COASTAL_ECOLOGY.coastalHabitats).toBeDefined();
            expect(data.COASTAL_ECOLOGY.mangroves).toBeDefined();
            expect(data.COASTAL_ECOLOGY.birdMigration).toBeDefined();
            expect(data.COASTAL_ECOLOGY.conservationStatus).toBeDefined();
        });

        it('contains bird migration cards describing the Central Asian Flyway', () => {
            expect(Array.isArray(data.BIRD_MIGRATION)).toBe(true);
            expect(data.BIRD_MIGRATION.length).toBeGreaterThanOrEqual(4);
            expect(data.BIRD_MIGRATION.some(m => m.title.includes('Central Asian Flyway'))).toBe(true);
        });
    });

    describe('WILDLIFE_SPECIES catalog', () => {
        it('is a non-empty array of species', () => {
            expect(Array.isArray(data.WILDLIFE_SPECIES)).toBe(true);
            expect(data.WILDLIFE_SPECIES.length).toBeGreaterThanOrEqual(6);
        });

        it('includes Greater Flamingo, Lesser Flamingo and Blackbuck', () => {
            const flamingo = data.WILDLIFE_SPECIES.find(s => s.id === 'greater-flamingo');
            const lesserFlamingo = data.WILDLIFE_SPECIES.find(s => s.id === 'lesser-flamingo');
            const blackbuck = data.WILDLIFE_SPECIES.find(s => s.id === 'blackbuck');
            expect(flamingo).toBeDefined();
            expect(lesserFlamingo).toBeDefined();
            expect(blackbuck).toBeDefined();
        });
    });

    describe('INTERESTING_FACTS', () => {
        it('contains interesting facts array with at least 3 items', () => {
            expect(Array.isArray(data.INTERESTING_FACTS)).toBe(true);
            expect(data.INTERESTING_FACTS.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in WETLANDS_DATA landing page dataset', () => {
            const wetlandsData = loadWetlandsLandingData();
            const pointCalimereCard = wetlandsData.wetlands.find(w => w.id === 'point-calimere');
            expect(pointCalimereCard).toBeDefined();
            expect(pointCalimereCard.exploreUrl).toBe('../point-calimere-wetland-explorer/index.html');
        });
    });
});
