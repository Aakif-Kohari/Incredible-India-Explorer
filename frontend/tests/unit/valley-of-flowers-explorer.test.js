import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadValleyData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/valley-of-flowers-explorer/valley-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { VALLEY_INFO, ECOLOGY_HYDROLOGY, FLORA_FAUNA_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };'
    );
    return fn();
}

function loadNationalParksLandingData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/national-parks-explorer/data.js'),
        'utf-8'
    );
    const fn = new Function(code + '\nreturn NATIONAL_PARKS;');
    return fn();
}

describe('Valley of Flowers National Park Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadValleyData();
    });

    describe('VALLEY_INFO metadata', () => {
        it('contains correct park metadata and UNESCO status', () => {
            expect(data.VALLEY_INFO.id).toBe('valley-of-flowers');
            expect(data.VALLEY_INFO.name).toContain('Valley of Flowers');
            expect(data.VALLEY_INFO.unescoYear).toBe(2005);
            expect(data.VALLEY_INFO.state).toBe('Uttarakhand');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.VALLEY_INFO.quickStats)).toBe(true);
            expect(data.VALLEY_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ECOLOGY_HYDROLOGY', () => {
        it('contains overview, Pushpawati river hydrology, history, and status', () => {
            expect(data.ECOLOGY_HYDROLOGY.overview).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.hydrology).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.history).toBeDefined();
            expect(data.ECOLOGY_HYDROLOGY.conservationStatus).toBeDefined();
        });
    });

    describe('FLORA_FAUNA_SPECIES catalog', () => {
        it('is a non-empty array of alpine flora and fauna species', () => {
            expect(Array.isArray(data.FLORA_FAUNA_SPECIES)).toBe(true);
            expect(data.FLORA_FAUNA_SPECIES.length).toBeGreaterThanOrEqual(4);
        });

        it('includes Himalayan Blue Poppy and Snow Leopard', () => {
            const poppy = data.FLORA_FAUNA_SPECIES.find(b => b.id === 'blue-poppy');
            const leopard = data.FLORA_FAUNA_SPECIES.find(b => b.id === 'snow-leopard');
            expect(poppy).toBeDefined();
            expect(leopard).toBeDefined();
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated in NATIONAL_PARKS_DATA landing page dataset', () => {
            const parksData = loadNationalParksLandingData();
            const valleyCard = parksData.find(w => w.id === 'valley-of-flowers');
            expect(valleyCard).toBeDefined();
            expect(valleyCard.exploreUrl).toBe('../valley-of-flowers-explorer/index.html');
        });
    });
});
