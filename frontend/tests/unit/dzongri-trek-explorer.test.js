import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDzongriData() {
    const code = readFileSync(
        resolve(__dirname, '../../dzongri-trek-explorer/dzongri-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { DZONGRI_INFO, TRAIL_CAMPSITES, MOUNTAIN_VISTAS, REFERENCES };'
    );
    return fn();
}

describe('Dzongri Trek Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadDzongriData();
    });

    describe('DZONGRI_INFO metadata', () => {
        it('contains correct Dzongri Trek metadata and max altitude 4,250m', () => {
            expect(data.DZONGRI_INFO.id).toBe('dzongri-trek');
            expect(data.DZONGRI_INFO.title).toContain('Dzongri');
            expect(data.DZONGRI_INFO.region).toContain('Sikkim');
            expect(data.DZONGRI_INFO.maxAltitude).toContain('4,250 Meters');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.DZONGRI_INFO.quickStats)).toBe(true);
            expect(data.DZONGRI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TRAIL_CAMPSITES & DZONGRI TOP PANORAMA', () => {
        it('contains Yuksom, Tshoka, Dzongri Top, and Mt. Kanchenjunga', () => {
            expect(Array.isArray(data.TRAIL_CAMPSITES)).toBe(true);
            expect(data.TRAIL_CAMPSITES.length).toBeGreaterThanOrEqual(4);

            const top = data.TRAIL_CAMPSITES.find(c => c.day.includes('Dzongri Top'));
            expect(top).toBeDefined();

            expect(Array.isArray(data.MOUNTAIN_VISTAS)).toBe(true);
            const kanchen = data.MOUNTAIN_VISTAS.find(v => v.peak.includes('Kanchenjunga'));
            expect(kanchen).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains trekking and eco-conservation citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
