import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadZodiacData() {
    const code = readFileSync(
        resolve(__dirname, '../../jahangir-zodiac-coins-explorer/zodiac-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { JAHANGIR_INFO, ZODIAC_SIGNS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Jahangir Zodiac Coins Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadZodiacData();
    });

    describe('JAHANGIR_INFO metadata', () => {
        it('contains correct Jahangir Zodiac coins metadata', () => {
            expect(data.JAHANGIR_INFO.id).toBe('jahangir-zodiac-coins');
            expect(data.JAHANGIR_INFO.title).toContain('Jahangir');
            expect(data.JAHANGIR_INFO.reignPeriod).toContain('1605');
            expect(data.JAHANGIR_INFO.primaryMints).toContain('Agra');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.JAHANGIR_INFO.quickStats)).toBe(true);
            expect(data.JAHANGIR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ZODIAC_SIGNS array', () => {
        it('contains all 12 astrological zodiac signs', () => {
            expect(Array.isArray(data.ZODIAC_SIGNS)).toBe(true);
            expect(data.ZODIAC_SIGNS.length).toBe(12);

            const aries = data.ZODIAC_SIGNS.find(z => z.id === 'aries');
            expect(aries).toBeDefined();
            expect(aries.reverseInscription).toContain('Agra');

            const leo = data.ZODIAC_SIGNS.find(z => z.id === 'leo');
            expect(leo).toBeDefined();
            expect(leo.symbol).toContain('Lion');
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains historical timeline events and references', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
