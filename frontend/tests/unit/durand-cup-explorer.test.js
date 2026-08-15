import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDurandData() {
    const code = readFileSync(
        resolve(__dirname, '../../durand-cup-explorer/durand-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { DURAND_INFO, THREE_TROPHIES, SUCCESSFUL_CLUBS, HISTORIC_VENUES, TOURNAMENT_MILESTONES, REFERENCES };'
    );
    return fn();
}

describe('Durand Cup Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadDurandData();
    });

    describe('DURAND_INFO metadata', () => {
        it('contains correct Durand Cup metadata and founding year 1888', () => {
            expect(data.DURAND_INFO.id).toBe('durand-cup');
            expect(data.DURAND_INFO.title).toContain('Durand Cup');
            expect(data.DURAND_INFO.foundedYear).toBe('1888 CE');
            expect(data.DURAND_INFO.founder).toContain('Durand');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.DURAND_INFO.quickStats)).toBe(true);
            expect(data.DURAND_INFO.quickStats.length).toBe(6);
        });
    });

    describe('THREE_TROPHIES & SUCCESSFUL_CLUBS', () => {
        it('contains 3 iconic trophies and Mohun Bagan / East Bengal champions data', () => {
            expect(Array.isArray(data.THREE_TROPHIES)).toBe(true);
            expect(data.THREE_TROPHIES.length).toBe(3);

            expect(Array.isArray(data.SUCCESSFUL_CLUBS)).toBe(true);
            const bagan = data.SUCCESSFUL_CLUBS.find(c => c.club.includes('Mohun Bagan'));
            expect(bagan).toBeDefined();
            expect(bagan.titles).toBe(17);
        });
    });

    describe('HISTORIC_VENUES & REFERENCES', () => {
        it('contains historic venues and reference citations', () => {
            expect(Array.isArray(data.HISTORIC_VENUES)).toBe(true);
            expect(data.HISTORIC_VENUES.length).toBeGreaterThanOrEqual(3);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
