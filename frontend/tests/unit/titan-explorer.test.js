import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTitanData() {
    const code = readFileSync(
        resolve(__dirname, '../../titan-explorer/titan-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { TITAN_INFO, WATCH_COLLECTIONS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Titan Watchmaking Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadTitanData();
    });

    describe('TITAN_INFO metadata', () => {
        it('contains correct Titan brand metadata and founding year 1984', () => {
            expect(data.TITAN_INFO.id).toBe('titan-watches');
            expect(data.TITAN_INFO.title).toContain('Titan');
            expect(data.TITAN_INFO.foundedYear).toBe('1984 CE');
            expect(data.TITAN_INFO.engineeringFeat).toContain('Titan Edge');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.TITAN_INFO.quickStats)).toBe(true);
            expect(data.TITAN_INFO.quickStats.length).toBe(6);
        });
    });

    describe('WATCH_COLLECTIONS & HOROLOGICAL FEATS', () => {
        it('contains Titan Edge, Raga, Fastrack, and Nebula collections', () => {
            expect(Array.isArray(data.WATCH_COLLECTIONS)).toBe(true);
            expect(data.WATCH_COLLECTIONS.length).toBeGreaterThanOrEqual(4);

            const edge = data.WATCH_COLLECTIONS.find(c => c.name.includes('Edge'));
            expect(edge).toBeDefined();

            const raga = data.WATCH_COLLECTIONS.find(c => c.name.includes('Raga'));
            expect(raga).toBeDefined();
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains watch design evolution timeline and reference citations', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
