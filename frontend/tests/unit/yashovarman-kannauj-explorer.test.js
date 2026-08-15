import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadYashovarmanData() {
    const code = readFileSync(
        resolve(__dirname, '../../yashovarman-kannauj-explorer/yashovarman-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { YASHOVARMAN_INFO, COURT_LITERATURE, HISTORICAL_SOURCES, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Yashovarman of Kannauj Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadYashovarmanData();
    });

    describe('YASHOVARMAN_INFO metadata', () => {
        it('contains correct Yashovarman metadata and Kannauj capital', () => {
            expect(data.YASHOVARMAN_INFO.id).toBe('yashovarman-kannauj');
            expect(data.YASHOVARMAN_INFO.title).toContain('Yashovarman');
            expect(data.YASHOVARMAN_INFO.capital).toContain('Kannauj');
            expect(data.YASHOVARMAN_INFO.courtScholars).toContain('Bhavabhuti');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.YASHOVARMAN_INFO.quickStats)).toBe(true);
            expect(data.YASHOVARMAN_INFO.quickStats.length).toBe(6);
        });
    });

    describe('COURT_LITERATURE & HISTORICAL_SOURCES', () => {
        it('contains court scholars and historical evidence sources', () => {
            expect(Array.isArray(data.COURT_LITERATURE)).toBe(true);
            expect(data.COURT_LITERATURE.length).toBeGreaterThanOrEqual(2);

            const bhavabhuti = data.COURT_LITERATURE.find(s => s.scholar === 'Bhavabhuti');
            expect(bhavabhuti).toBeDefined();
            expect(bhavabhuti.works).toContain('Malatimadhava');

            expect(Array.isArray(data.HISTORICAL_SOURCES)).toBe(true);
            expect(data.HISTORICAL_SOURCES.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains reign timeline and reference citations', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
