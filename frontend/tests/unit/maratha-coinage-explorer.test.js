import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMarathaData() {
    const code = readFileSync(
        resolve(__dirname, '../../maratha-coinage-explorer/maratha-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MARATHA_INFO, COIN_TYPES, SCRIPT_DECODER_ITEMS, SYMBOL_HOTSPOTS, TERRITORY_MAP_REGIONS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Maratha Coinage Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMarathaData();
    });

    describe('MARATHA_INFO metadata', () => {
        it('contains correct Maratha coinage attributes', () => {
            expect(data.MARATHA_INFO.id).toBe('maratha-coinage');
            expect(data.MARATHA_INFO.title).toContain('Maratha Coinage');
            expect(data.MARATHA_INFO.period).toContain('1674');
            expect(data.MARATHA_INFO.primaryScripts).toContain('Devanagari');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MARATHA_INFO.quickStats)).toBe(true);
            expect(data.MARATHA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('COIN_TYPES & SCRIPT_DECODER_ITEMS', () => {
        it('contains major Maratha coin types including Gold Hon & Shivrai', () => {
            expect(Array.isArray(data.COIN_TYPES)).toBe(true);
            expect(data.COIN_TYPES.length).toBeGreaterThanOrEqual(4);
            const hon = data.COIN_TYPES.find(c => c.id === 'gold-hon');
            expect(hon).toBeDefined();
            expect(hon.obverseText).toContain('शिव');

            expect(Array.isArray(data.SCRIPT_DECODER_ITEMS)).toBe(true);
            expect(data.SCRIPT_DECODER_ITEMS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('SYMBOL_HOTSPOTS, TERRITORIES & TIMELINE', () => {
        it('contains sacred symbols, territory regions, and historical timeline', () => {
            expect(Array.isArray(data.SYMBOL_HOTSPOTS)).toBe(true);
            expect(data.SYMBOL_HOTSPOTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.TERRITORY_MAP_REGIONS)).toBe(true);
            expect(data.TERRITORY_MAP_REGIONS.length).toBeGreaterThanOrEqual(4);
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
