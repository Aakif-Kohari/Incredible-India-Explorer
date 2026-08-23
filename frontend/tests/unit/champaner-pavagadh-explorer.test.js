import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadChampanerData() {
    const code = readFileSync(
        resolve(__dirname, '../../champaner-pavagadh-explorer/champaner-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { CHAMPANER_INFO, MONUMENTAL_STRUCTURES, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Champaner-Pavagadh Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadChampanerData();
    });

    describe('CHAMPANER_INFO metadata', () => {
        it('contains correct Champaner-Pavagadh metadata and UNESCO status', () => {
            expect(data.CHAMPANER_INFO.id).toBe('champaner-pavagadh');
            expect(data.CHAMPANER_INFO.title).toContain('Champaner-Pavagadh');
            expect(data.CHAMPANER_INFO.location).toContain('Gujarat');
            expect(data.CHAMPANER_INFO.unescoStatus).toContain('UNESCO');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.CHAMPANER_INFO.quickStats)).toBe(true);
            expect(data.CHAMPANER_INFO.quickStats.length).toBe(6);
        });
    });

    describe('MONUMENTAL_STRUCTURES & WATER HERITAGE', () => {
        it('contains Jama Masjid, Kalika Mata temple, and helical stepwell', () => {
            expect(Array.isArray(data.MONUMENTAL_STRUCTURES)).toBe(true);
            expect(data.MONUMENTAL_STRUCTURES.length).toBeGreaterThanOrEqual(4);

            const jama = data.MONUMENTAL_STRUCTURES.find(m => m.name.includes('Jama Masjid'));
            expect(jama).toBeDefined();

            const kalika = data.MONUMENTAL_STRUCTURES.find(m => m.name.includes('Kalika Mata'));
            expect(kalika).toBeDefined();

            const vav = data.MONUMENTAL_STRUCTURES.find(m => m.name.includes('Stepwell'));
            expect(vav).toBeDefined();
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
