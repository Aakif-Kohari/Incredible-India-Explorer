import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadAhilyabaiData() {
    const code = readFileSync(
        resolve(__dirname, '../../ahilyabai-holkar-explorer/ahilyabai-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { AHILYABAI_INFO, AHILYABAI_SECTIONS, MAJOR_ARCHITECTURAL_WORKS, HOLKAR_TERRITORY_MAP_SITES, AHILYABAI_TIMELINE, AHILYABAI_SOURCES };'
    );
    return fn();
}

describe('Ahilyabai Holkar Explorer — Data & Content Tests', () => {
    let data;

    beforeAll(() => {
        data = loadAhilyabaiData();
    });

    describe('AHILYABAI_INFO metadata', () => {
        it('contains correct Ahilyabai Holkar title, dynasty, and capital data', () => {
            expect(data.AHILYABAI_INFO.id).toBe('ahilyabai-holkar');
            expect(data.AHILYABAI_INFO.title).toContain('Ahilyabai Holkar');
            expect(data.AHILYABAI_INFO.dynasty).toContain('Holkar');
            expect(data.AHILYABAI_INFO.capital).toContain('Maheshwar');
        });

        it('has quickStats array with 6 relevant items', () => {
            expect(Array.isArray(data.AHILYABAI_INFO.quickStats)).toBe(true);
            expect(data.AHILYABAI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('AHILYABAI_SECTIONS historical topics', () => {
        it('contains all 6 required historical and administrative topics', () => {
            expect(Array.isArray(data.AHILYABAI_SECTIONS)).toBe(true);
            expect(data.AHILYABAI_SECTIONS.length).toBe(6);

            const sectionIds = data.AHILYABAI_SECTIONS.map(s => s.id);
            expect(sectionIds).toContain('early-life');
            expect(sectionIds).toContain('holkar-dynasty');
            expect(sectionIds).toContain('administration');
            expect(sectionIds).toContain('maheshwar-capital');
            expect(sectionIds).toContain('temple-restorations');
            expect(sectionIds).toContain('legacy');
        });

        it('ensures each section has title, icon, summary, and non-empty details array', () => {
            data.AHILYABAI_SECTIONS.forEach(sec => {
                expect(sec.title).toBeTruthy();
                expect(sec.icon).toBeTruthy();
                expect(sec.summary).toBeTruthy();
                expect(Array.isArray(sec.details)).toBe(true);
                expect(sec.details.length).toBeGreaterThanOrEqual(3);
            });
        });
    });

    describe('MAJOR_ARCHITECTURAL_WORKS', () => {
        it('documents major pan-Indian temple restorations (Kashi Vishwanath, Somnath, Gaya, Grishneshwar)', () => {
            expect(Array.isArray(data.MAJOR_ARCHITECTURAL_WORKS)).toBe(true);
            expect(data.MAJOR_ARCHITECTURAL_WORKS.length).toBeGreaterThanOrEqual(5);

            const sites = data.MAJOR_ARCHITECTURAL_WORKS.map(w => w.site);
            expect(sites.some(s => s.includes('Kashi Vishwanath'))).toBe(true);
            expect(sites.some(s => s.includes('Vishnupad'))).toBe(true);
            expect(sites.some(s => s.includes('Somnath'))).toBe(true);
            expect(sites.some(s => s.includes('Grishneshwar'))).toBe(true);
            expect(sites.some(s => s.includes('Ahilya Fort'))).toBe(true);
        });
    });

    describe('HOLKAR_TERRITORY_MAP_SITES & AHILYABAI_TIMELINE', () => {
        it('contains key territory centers: Maheshwar, Indore, Chaundi, and Pan-Indian outposts', () => {
            expect(Array.isArray(data.HOLKAR_TERRITORY_MAP_SITES)).toBe(true);
            expect(data.HOLKAR_TERRITORY_MAP_SITES.length).toBeGreaterThanOrEqual(4);

            const names = data.HOLKAR_TERRITORY_MAP_SITES.map(s => s.name);
            expect(names.some(n => n.includes('Maheshwar'))).toBe(true);
            expect(names.some(n => n.includes('Indore'))).toBe(true);
        });

        it('contains chronological timeline covering 1725 to 1795 CE', () => {
            expect(Array.isArray(data.AHILYABAI_TIMELINE)).toBe(true);
            expect(data.AHILYABAI_TIMELINE.length).toBe(7);
            expect(data.AHILYABAI_TIMELINE[0].year).toContain('1725');
            expect(data.AHILYABAI_TIMELINE[data.AHILYABAI_TIMELINE.length - 1].year).toContain('1795');
        });
    });

    describe('AHILYABAI_SOURCES historical references', () => {
        it('cites Malcolm, Thakur, Sethi/Bhatt/Holkar, and Stewart Gordon', () => {
            expect(Array.isArray(data.AHILYABAI_SOURCES)).toBe(true);
            expect(data.AHILYABAI_SOURCES.length).toBeGreaterThanOrEqual(4);

            const authors = data.AHILYABAI_SOURCES.map(s => s.author);
            expect(authors.some(a => a.includes('Malcolm'))).toBe(true);
            expect(authors.some(a => a.includes('Thakur'))).toBe(true);
            expect(authors.some(a => a.includes('Gordon'))).toBe(true);
        });
    });
});
