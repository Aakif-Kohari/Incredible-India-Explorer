import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMysoreData() {
    const code = readFileSync(
        resolve(__dirname, '../../mysore-coinage-explorer/mysore-coin-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MYSORE_INFO, COIN_DENOMINATIONS, MAULUDI_CALENDAR_INFO, MINTS_LIST, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Mysore Coinage Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMysoreData();
    });

    describe('MYSORE_INFO metadata', () => {
        it('contains correct Mysore coinage metadata and Tipu Sultan reforms', () => {
            expect(data.MYSORE_INFO.id).toBe('mysore-coinage');
            expect(data.MYSORE_INFO.title).toContain('Mysore');
            expect(data.MYSORE_INFO.keyInnovator).toContain('Tipu Sultan');
            expect(data.MYSORE_INFO.calendarSystem).toContain('Mauludi');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MYSORE_INFO.quickStats)).toBe(true);
            expect(data.MYSORE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('COIN_DENOMINATIONS & MINTS_LIST', () => {
        it('contains celestial named coins and imperial mints', () => {
            expect(Array.isArray(data.COIN_DENOMINATIONS)).toBe(true);
            expect(data.COIN_DENOMINATIONS.length).toBeGreaterThanOrEqual(4);

            const ahmadi = data.COIN_DENOMINATIONS.find(c => c.id === 'ahmadi-mohur');
            expect(ahmadi).toBeDefined();
            expect(ahmadi.metal).toContain('Gold');

            expect(Array.isArray(data.MINTS_LIST)).toBe(true);
            expect(data.MINTS_LIST.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains historical timeline and references', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
