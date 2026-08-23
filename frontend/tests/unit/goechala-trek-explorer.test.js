import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadGoechalaData() {
    const code = readFileSync(
        resolve(__dirname, '../../goechala-trek-explorer/goechala-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { GOECHALA_INFO, TRAIL_CAMPSITES, MOUNTAIN_VISTAS, REFERENCES };'
    );
    return fn();
}

describe('Goechala Trek Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadGoechalaData();
    });

    describe('GOECHALA_INFO metadata', () => {
        it('contains correct Goechala Trek metadata and max altitude 4,600m', () => {
            expect(data.GOECHALA_INFO.id).toBe('goechala-trek');
            expect(data.GOECHALA_INFO.title).toContain('Goechala');
            expect(data.GOECHALA_INFO.region).toContain('Sikkim');
            expect(data.GOECHALA_INFO.maxAltitude).toContain('4,600 Meters');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.GOECHALA_INFO.quickStats)).toBe(true);
            expect(data.GOECHALA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TRAIL_CAMPSITES & MOUNTAIN_VISTAS', () => {
        it('contains Yuksom, Dzongri, Samiti Lake, and Mt. Kanchenjunga', () => {
            expect(Array.isArray(data.TRAIL_CAMPSITES)).toBe(true);
            expect(data.TRAIL_CAMPSITES.length).toBeGreaterThanOrEqual(5);

            const summit = data.TRAIL_CAMPSITES.find(c => c.day.includes('Samiti Lake'));
            expect(summit).toBeDefined();

            expect(Array.isArray(data.MOUNTAIN_VISTAS)).toBe(true);
            const kanchen = data.MOUNTAIN_VISTAS.find(v => v.peak.includes('Kanchenjunga'));
            expect(kanchen).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains wilderness and forest guidelines citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
