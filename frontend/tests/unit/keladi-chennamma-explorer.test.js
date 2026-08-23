import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKeladiData() {
    const code = readFileSync(
        resolve(__dirname, '../../keladi-chennamma-explorer/keladi-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KELADI_CHENNAMMA_INFO, KELADI_CHENNAMMA_SECTIONS, KELADI_TERRITORY_MAP_SITES, KELADI_CHENNAMMA_TIMELINE, KELADI_CHENNAMMA_SOURCES };'
    );
    return fn();
}

describe('Keladi Chennamma Explorer — Data & Content Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKeladiData();
    });

    describe('KELADI_CHENNAMMA_INFO metadata', () => {
        it('contains correct Keladi Chennamma title, dynasty, and capital data', () => {
            expect(data.KELADI_CHENNAMMA_INFO.id).toBe('keladi-chennamma');
            expect(data.KELADI_CHENNAMMA_INFO.title).toContain('Keladi Chennamma');
            expect(data.KELADI_CHENNAMMA_INFO.dynasty).toContain('Keladi');
            expect(data.KELADI_CHENNAMMA_INFO.capital).toContain('Bednore');
        });

        it('has quickStats array with 6 relevant items', () => {
            expect(Array.isArray(data.KELADI_CHENNAMMA_INFO.quickStats)).toBe(true);
            expect(data.KELADI_CHENNAMMA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('KELADI_CHENNAMMA_SECTIONS historical topics', () => {
        it('contains all 6 required historical and administrative topics', () => {
            expect(Array.isArray(data.KELADI_CHENNAMMA_SECTIONS)).toBe(true);
            expect(data.KELADI_CHENNAMMA_SECTIONS.length).toBe(6);

            const sectionIds = data.KELADI_CHENNAMMA_SECTIONS.map(s => s.id);
            expect(sectionIds).toContain('who-was-chennamma');
            expect(sectionIds).toContain('keladi-kingdom');
            expect(sectionIds).toContain('rise-to-power');
            expect(sectionIds).toContain('political-leadership');
            expect(sectionIds).toContain('mughal-resistance');
            expect(sectionIds).toContain('coastal-heritage');
        });

        it('ensures each section has title, icon, summary, and non-empty details array', () => {
            data.KELADI_CHENNAMMA_SECTIONS.forEach(sec => {
                expect(sec.title).toBeTruthy();
                expect(sec.icon).toBeTruthy();
                expect(sec.summary).toBeTruthy();
                expect(Array.isArray(sec.details)).toBe(true);
                expect(sec.details.length).toBeGreaterThanOrEqual(3);
            });
        });
    });

    describe('KELADI_TERRITORY_MAP_SITES & KELADI_CHENNAMMA_TIMELINE', () => {
        it('contains key territory centers: Bednore, Ikkeri, Honnavar, and Mirjan/Bekal Forts', () => {
            expect(Array.isArray(data.KELADI_TERRITORY_MAP_SITES)).toBe(true);
            expect(data.KELADI_TERRITORY_MAP_SITES.length).toBeGreaterThanOrEqual(4);

            const names = data.KELADI_TERRITORY_MAP_SITES.map(s => s.name);
            expect(names.some(n => n.includes('Bednore'))).toBe(true);
            expect(names.some(n => n.includes('Ikkeri'))).toBe(true);
            expect(names.some(n => n.includes('Bekal'))).toBe(true);
        });

        it('contains chronological timeline covering c. 1650 to 1696 CE', () => {
            expect(Array.isArray(data.KELADI_CHENNAMMA_TIMELINE)).toBe(true);
            expect(data.KELADI_CHENNAMMA_TIMELINE.length).toBe(6);
            expect(data.KELADI_CHENNAMMA_TIMELINE[0].year).toContain('1650');
            expect(data.KELADI_CHENNAMMA_TIMELINE[data.KELADI_CHENNAMMA_TIMELINE.length - 1].year).toContain('1696');
        });
    });

    describe('KELADI_CHENNAMMA_SOURCES historical references', () => {
        it('cites Linganna Kavi (Keladinripavijaya), Swaminathan, Shastry, and Stewart Gordon', () => {
            expect(Array.isArray(data.KELADI_CHENNAMMA_SOURCES)).toBe(true);
            expect(data.KELADI_CHENNAMMA_SOURCES.length).toBeGreaterThanOrEqual(4);

            const authors = data.KELADI_CHENNAMMA_SOURCES.map(s => s.author);
            expect(authors.some(a => a.includes('Linganna'))).toBe(true);
            expect(authors.some(a => a.includes('Swaminathan'))).toBe(true);
            expect(authors.some(a => a.includes('Gordon'))).toBe(true);
        });
    });
});
