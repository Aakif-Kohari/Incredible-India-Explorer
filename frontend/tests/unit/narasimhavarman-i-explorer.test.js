import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadNarasimhavarmanData() {
    const code = readFileSync(
        resolve(__dirname, '../../narasimhavarman-i-explorer/narasimhavarman-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { NARASIMHAVARMAN_INFO, MAMALLAPURAM_MONUMENTS, VATAPI_CAMPAIGN, FOREIGN_RELATIONS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Narasimhavarman I Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadNarasimhavarmanData();
    });

    describe('NARASIMHAVARMAN_INFO metadata', () => {
        it('contains correct Narasimhavarman I metadata and Pallava dynasty', () => {
            expect(data.NARASIMHAVARMAN_INFO.id).toBe('narasimhavarman-i');
            expect(data.NARASIMHAVARMAN_INFO.title).toContain('Narasimhavarman I');
            expect(data.NARASIMHAVARMAN_INFO.dynasty).toContain('Pallava');
            expect(data.NARASIMHAVARMAN_INFO.titles).toContain('Mamalla');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.NARASIMHAVARMAN_INFO.quickStats)).toBe(true);
            expect(data.NARASIMHAVARMAN_INFO.quickStats.length).toBe(6);
        });
    });

    describe('MAMALLAPURAM_MONUMENTS & VATAPI_CAMPAIGN', () => {
        it('contains Pancha Rathas, Descent of Ganges, and Vatapi conquest details', () => {
            expect(Array.isArray(data.MAMALLAPURAM_MONUMENTS)).toBe(true);
            expect(data.MAMALLAPURAM_MONUMENTS.length).toBeGreaterThanOrEqual(3);

            const rathas = data.MAMALLAPURAM_MONUMENTS.find(m => m.title.includes('Pancha Rathas'));
            expect(rathas).toBeDefined();

            expect(Array.isArray(data.VATAPI_CAMPAIGN)).toBe(true);
            expect(data.VATAPI_CAMPAIGN.length).toBeGreaterThanOrEqual(4);
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
