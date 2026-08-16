import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadIlahiData() {
    const code = readFileSync(
        resolve(__dirname, '../../akbar-ilahi-coinage-explorer/ilahi-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { AKBAR_INFO, COIN_TYPES, ILAHI_MONTHS, INSCRIPTION_HOTSPOTS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe("Akbar's Ilahi Coinage Explorer — Data Tests", () => {
    let data;

    beforeAll(() => {
        data = loadIlahiData();
    });

    describe('AKBAR_INFO metadata', () => {
        it('contains correct Akbar Ilahi coinage attributes', () => {
            expect(data.AKBAR_INFO.id).toBe('akbar-ilahi-coinage');
            expect(data.AKBAR_INFO.title).toContain('Akbar');
            expect(data.AKBAR_INFO.motto).toContain('Allahu Akbar');
            expect(data.AKBAR_INFO.reformYear).toContain('1585');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.AKBAR_INFO.quickStats)).toBe(true);
            expect(data.AKBAR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('COIN_TYPES & ILAHI_MONTHS', () => {
        it('contains representative coins and all 12 solar Ilahi months', () => {
            expect(Array.isArray(data.COIN_TYPES)).toBe(true);
            expect(data.COIN_TYPES.length).toBeGreaterThanOrEqual(3);

            expect(Array.isArray(data.ILAHI_MONTHS)).toBe(true);
            expect(data.ILAHI_MONTHS.length).toBe(12);

            const farwardin = data.ILAHI_MONTHS.find(m => m.name === 'Farwardin');
            expect(farwardin).toBeDefined();
        });
    });

    describe('INSCRIPTION_HOTSPOTS & TIMELINE', () => {
        it('contains inscription hotspots and historical timeline', () => {
            expect(Array.isArray(data.INSCRIPTION_HOTSPOTS)).toBe(true);
            expect(data.INSCRIPTION_HOTSPOTS.length).toBeGreaterThanOrEqual(3);
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('REFERENCES', () => {
        it('has non-empty references list', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
