import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadGolcondaData() {
    const code = readFileSync(
        resolve(__dirname, '../../golconda-fort-explorer/golconda-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { GOLCONDA_INFO, ARCHITECTURAL_SECTIONS, HISTORIC_SIEGES, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Golconda Fort Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadGolcondaData();
    });

    describe('GOLCONDA_INFO metadata', () => {
        it('contains correct Golconda Fort metadata and Qutb Shahi dynasty', () => {
            expect(data.GOLCONDA_INFO.id).toBe('golconda-fort');
            expect(data.GOLCONDA_INFO.title).toContain('Golconda Fort');
            expect(data.GOLCONDA_INFO.location).toContain('Hyderabad');
            expect(data.GOLCONDA_INFO.dynasty).toContain('Qutb Shahi');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.GOLCONDA_INFO.quickStats)).toBe(true);
            expect(data.GOLCONDA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ARCHITECTURAL_SECTIONS & HISTORIC_SIEGES', () => {
        it('contains acoustic system, diamond vaults, and 1687 Mughal siege', () => {
            expect(Array.isArray(data.ARCHITECTURAL_SECTIONS)).toBe(true);
            expect(data.ARCHITECTURAL_SECTIONS.length).toBeGreaterThanOrEqual(4);

            const acoustics = data.ARCHITECTURAL_SECTIONS.find(s => s.name.includes('Acoustic'));
            expect(acoustics).toBeDefined();

            expect(Array.isArray(data.HISTORIC_SIEGES)).toBe(true);
            expect(data.HISTORIC_SIEGES[0].year).toBe('1687 CE');
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
