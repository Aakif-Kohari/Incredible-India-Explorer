import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSikhData() {
    const code = readFileSync(
        resolve(__dirname, '../../sikh-empire-coinage-explorer/sikh-coin-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SIKH_INFO, COIN_EXAMPLES, INSCRIPTION_BREAKDOWN, SIKH_MINTS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Sikh Empire Coinage Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSikhData();
    });

    describe('SIKH_INFO metadata', () => {
        it('contains correct Sikh Empire coinage metadata and sacred motto', () => {
            expect(data.SIKH_INFO.id).toBe('sikh-empire-coinage');
            expect(data.SIKH_INFO.title).toContain('Sikh Empire');
            expect(data.SIKH_INFO.ruler).toContain('Ranjit Singh');
            expect(data.SIKH_INFO.sacredMotto).toContain('Deg Tegh Fateh');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SIKH_INFO.quickStats)).toBe(true);
            expect(data.SIKH_INFO.quickStats.length).toBe(6);
        });
    });

    describe('COIN_EXAMPLES & INSCRIPTION_BREAKDOWN', () => {
        it('contains representative Nanakshahi coins and inscription decoder entries', () => {
            expect(Array.isArray(data.COIN_EXAMPLES)).toBe(true);
            expect(data.COIN_EXAMPLES.length).toBeGreaterThanOrEqual(4);

            const lahore = data.COIN_EXAMPLES.find(c => c.id === 'lahore-nanakshahi-rupee');
            expect(lahore).toBeDefined();
            expect(lahore.metal).toContain('Silver');

            expect(Array.isArray(data.INSCRIPTION_BREAKDOWN)).toBe(true);
            expect(data.INSCRIPTION_BREAKDOWN.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('SIKH_MINTS & REFERENCES', () => {
        it('contains imperial mints and reference works', () => {
            expect(Array.isArray(data.SIKH_MINTS)).toBe(true);
            expect(data.SIKH_MINTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
