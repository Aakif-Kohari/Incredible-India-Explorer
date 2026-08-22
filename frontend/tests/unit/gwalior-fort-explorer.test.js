import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadGwaliorData() {
    const code = readFileSync(
        resolve(__dirname, '../../gwalior-fort-explorer/gwalior-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { GWALIOR_INFO, PALACES_AND_TEMPLES, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Gwalior Fort Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadGwaliorData();
    });

    describe('GWALIOR_INFO metadata', () => {
        it('contains correct Gwalior Fort metadata and location in Madhya Pradesh', () => {
            expect(data.GWALIOR_INFO.id).toBe('gwalior-fort');
            expect(data.GWALIOR_INFO.title).toContain('Gwalior Fort');
            expect(data.GWALIOR_INFO.location).toContain('Madhya Pradesh');
            expect(data.GWALIOR_INFO.baburEpithet).toContain('Pearl');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.GWALIOR_INFO.quickStats)).toBe(true);
            expect(data.GWALIOR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('PALACES_AND_TEMPLES & JAIN SCULPTURES', () => {
        it('contains Man Mandir Palace, Teli Ka Mandir, Sas Bahu, and Gopachal Jain statues', () => {
            expect(Array.isArray(data.PALACES_AND_TEMPLES)).toBe(true);
            expect(data.PALACES_AND_TEMPLES.length).toBeGreaterThanOrEqual(5);

            const manMandir = data.PALACES_AND_TEMPLES.find(p => p.name.includes('Man Mandir'));
            expect(manMandir).toBeDefined();

            const jain = data.PALACES_AND_TEMPLES.find(p => p.name.includes('Gopachal'));
            expect(jain).toBeDefined();
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
