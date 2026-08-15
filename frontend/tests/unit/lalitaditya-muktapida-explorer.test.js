import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadLalitadityaData() {
    const code = readFileSync(
        resolve(__dirname, '../../lalitaditya-muktapida-explorer/lalitaditya-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { LALITADITYA_INFO, MARTAND_SUN_TEMPLE, CAMPAIGNS_AND_HISTORIOGRAPHY, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Lalitaditya Muktapida Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadLalitadityaData();
    });

    describe('LALITADITYA_INFO metadata', () => {
        it('contains correct Lalitaditya metadata and Karkota dynasty', () => {
            expect(data.LALITADITYA_INFO.id).toBe('lalitaditya-muktapida');
            expect(data.LALITADITYA_INFO.title).toContain('Lalitaditya');
            expect(data.LALITADITYA_INFO.dynasty).toContain('Karkota');
            expect(data.LALITADITYA_INFO.monumentalLegacy).toContain('Martand Sun Temple');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.LALITADITYA_INFO.quickStats)).toBe(true);
            expect(data.LALITADITYA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('MARTAND_SUN_TEMPLE & CAMPAIGNS', () => {
        it('contains Martand temple details and campaign historiography', () => {
            expect(data.MARTAND_SUN_TEMPLE.title).toContain('Martand');
            expect(Array.isArray(data.MARTAND_SUN_TEMPLE.highlights)).toBe(true);
            expect(data.MARTAND_SUN_TEMPLE.highlights.length).toBeGreaterThanOrEqual(4);

            expect(Array.isArray(data.CAMPAIGNS_AND_HISTORIOGRAPHY)).toBe(true);
            expect(data.CAMPAIGNS_AND_HISTORIOGRAPHY.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains reign timeline and reference sources', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
