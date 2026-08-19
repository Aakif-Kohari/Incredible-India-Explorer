import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadChittorgarhData() {
    const code = readFileSync(
        resolve(__dirname, '../../chittorgarh-fort-explorer/chittorgarh-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { CHITTORGARH_INFO, ICONIC_MONUMENTS, HISTORIC_SIEGES, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Chittorgarh Fort Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadChittorgarhData();
    });

    describe('CHITTORGARH_INFO metadata', () => {
        it('contains correct Chittorgarh Fort metadata and Mewar dynasty', () => {
            expect(data.CHITTORGARH_INFO.id).toBe('chittorgarh-fort');
            expect(data.CHITTORGARH_INFO.title).toContain('Chittorgarh Fort');
            expect(data.CHITTORGARH_INFO.location).toContain('Rajasthan');
            expect(data.CHITTORGARH_INFO.unescoStatus).toContain('UNESCO');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.CHITTORGARH_INFO.quickStats)).toBe(true);
            expect(data.CHITTORGARH_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ICONIC_MONUMENTS & HISTORIC_SIEGES', () => {
        it('contains Vijay Stambh, Kirti Stambh, Padmini Palace and 3 historic sieges', () => {
            expect(Array.isArray(data.ICONIC_MONUMENTS)).toBe(true);
            expect(data.ICONIC_MONUMENTS.length).toBeGreaterThanOrEqual(5);

            const vijay = data.ICONIC_MONUMENTS.find(m => m.name.includes('Vijay Stambh'));
            expect(vijay).toBeDefined();
            expect(vijay.height).toContain('37.2 Meters');

            expect(Array.isArray(data.HISTORIC_SIEGES)).toBe(true);
            expect(data.HISTORIC_SIEGES.length).toBe(3);
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains history timeline and reference citations', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
