import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadChandBibiData() {
    const code = readFileSync(
        resolve(__dirname, '../../chand-bibi-explorer/chand-bibi-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { CHAND_BIBI_INFO, CHAND_BIBI_SECTIONS, DECCAN_MAP_SITES, CHAND_BIBI_TIMELINE, CHAND_BIBI_SOURCES };'
    );
    return fn();
}

describe('Chand Bibi Explorer — Data & Content Tests', () => {
    let data;

    beforeAll(() => {
        data = loadChandBibiData();
    });

    describe('CHAND_BIBI_INFO metadata', () => {
        it('contains correct Chand Bibi title, dynasty, and regency data', () => {
            expect(data.CHAND_BIBI_INFO.id).toBe('chand-bibi');
            expect(data.CHAND_BIBI_INFO.title).toContain('Chand Bibi');
            expect(data.CHAND_BIBI_INFO.dynasty).toContain('Nizam Shahi');
            expect(data.CHAND_BIBI_INFO.dynasty).toContain('Adil Shahi');
            expect(data.CHAND_BIBI_INFO.titles).toContain('Defender of Ahmadnagar');
        });

        it('has quickStats array with 6 relevant items', () => {
            expect(Array.isArray(data.CHAND_BIBI_INFO.quickStats)).toBe(true);
            expect(data.CHAND_BIBI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('CHAND_BIBI_SECTIONS historical topics', () => {
        it('contains all 6 required historical and analytical topics', () => {
            expect(Array.isArray(data.CHAND_BIBI_SECTIONS)).toBe(true);
            expect(data.CHAND_BIBI_SECTIONS.length).toBe(6);

            const sectionIds = data.CHAND_BIBI_SECTIONS.map(s => s.id);
            expect(sectionIds).toContain('early-life');
            expect(sectionIds).toContain('bijapur-connection');
            expect(sectionIds).toContain('ahmadnagar-politics');
            expect(sectionIds).toContain('mughal-siege');
            expect(sectionIds).toContain('fort-defence');
            expect(sectionIds).toContain('legend-vs-history');
        });

        it('ensures each section has title, icon, summary, and non-empty details array', () => {
            data.CHAND_BIBI_SECTIONS.forEach(sec => {
                expect(sec.title).toBeTruthy();
                expect(sec.icon).toBeTruthy();
                expect(sec.summary).toBeTruthy();
                expect(Array.isArray(sec.details)).toBe(true);
                expect(sec.details.length).toBeGreaterThanOrEqual(3);
            });
        });
    });

    describe('DECCAN_MAP_SITES & CHAND_BIBI_TIMELINE', () => {
        it('contains key Deccan centers: Ahmadnagar, Bijapur, Golconda, Berar', () => {
            expect(Array.isArray(data.DECCAN_MAP_SITES)).toBe(true);
            expect(data.DECCAN_MAP_SITES.length).toBeGreaterThanOrEqual(4);

            const names = data.DECCAN_MAP_SITES.map(s => s.name);
            expect(names.some(n => n.includes('Ahmadnagar'))).toBe(true);
            expect(names.some(n => n.includes('Bijapur'))).toBe(true);
            expect(names.some(n => n.includes('Golconda'))).toBe(true);
        });

        it('contains chronological timeline covering 1550 to 1599 CE', () => {
            expect(Array.isArray(data.CHAND_BIBI_TIMELINE)).toBe(true);
            expect(data.CHAND_BIBI_TIMELINE.length).toBe(6);
            expect(data.CHAND_BIBI_TIMELINE[0].year).toContain('1550');
            expect(data.CHAND_BIBI_TIMELINE[data.CHAND_BIBI_TIMELINE.length - 1].year).toContain('1599');
        });
    });

    describe('CHAND_BIBI_SOURCES historical references', () => {
        it('cites contemporary (Firishta, Akbarnama) and modern scholarly references', () => {
            expect(Array.isArray(data.CHAND_BIBI_SOURCES)).toBe(true);
            expect(data.CHAND_BIBI_SOURCES.length).toBeGreaterThanOrEqual(4);

            const authors = data.CHAND_BIBI_SOURCES.map(s => s.author);
            expect(authors.some(a => a.includes('Firishta'))).toBe(true);
            expect(authors.some(a => a.includes("Abu'l-Fazl"))).toBe(true);
            expect(authors.some(a => a.includes('Eaton'))).toBe(true);
        });
    });
});
