import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTarabaiData() {
    const code = readFileSync(
        resolve(__dirname, '../../tarabai-maratha-regent-explorer/tarabai-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { TARABAI_INFO, TARABAI_SECTIONS, TARABAI_TERRITORY_MAP_SITES, TARABAI_TIMELINE, TARABAI_SOURCES };'
    );
    return fn();
}

describe('Tarabai Explorer — Data & Content Tests', () => {
    let data;

    beforeAll(() => {
        data = loadTarabaiData();
    });

    describe('TARABAI_INFO metadata', () => {
        it('contains correct Tarabai title, dynasty, and lineage data', () => {
            expect(data.TARABAI_INFO.id).toBe('tarabai-maratha-regent');
            expect(data.TARABAI_INFO.title).toContain('Tarabai');
            expect(data.TARABAI_INFO.dynasty).toContain('Bhonsle');
            expect(data.TARABAI_INFO.father).toContain('Hambirrao Mohite');
        });

        it('has quickStats array with 6 relevant items', () => {
            expect(Array.isArray(data.TARABAI_INFO.quickStats)).toBe(true);
            expect(data.TARABAI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TARABAI_SECTIONS historical topics', () => {
        it('contains all 6 required historical and strategic topics', () => {
            expect(Array.isArray(data.TARABAI_SECTIONS)).toBe(true);
            expect(data.TARABAI_SECTIONS.length).toBe(6);

            const sectionIds = data.TARABAI_SECTIONS.map(s => s.id);
            expect(sectionIds).toContain('early-life');
            expect(sectionIds).toContain('political-context');
            expect(sectionIds).toContain('regency');
            expect(sectionIds).toContain('mughal-conflict');
            expect(sectionIds).toContain('leadership-strategy');
            expect(sectionIds).toContain('later-career');
        });

        it('ensures each section has title, icon, summary, and non-empty details array', () => {
            data.TARABAI_SECTIONS.forEach(sec => {
                expect(sec.title).toBeTruthy();
                expect(sec.icon).toBeTruthy();
                expect(sec.summary).toBeTruthy();
                expect(Array.isArray(sec.details)).toBe(true);
                expect(sec.details.length).toBeGreaterThanOrEqual(3);
            });
        });
    });

    describe('TARABAI_TERRITORY_MAP_SITES & TARABAI_TIMELINE', () => {
        it('contains key territory centers: Panhala, Satara, Sinhagad/Raigad, and Malwa frontier', () => {
            expect(Array.isArray(data.TARABAI_TERRITORY_MAP_SITES)).toBe(true);
            expect(data.TARABAI_TERRITORY_MAP_SITES.length).toBeGreaterThanOrEqual(4);

            const names = data.TARABAI_TERRITORY_MAP_SITES.map(s => s.name);
            expect(names.some(n => n.includes('Panhala'))).toBe(true);
            expect(names.some(n => n.includes('Satara'))).toBe(true);
            expect(names.some(n => n.includes('Malwa'))).toBe(true);
        });

        it('contains chronological timeline covering 1675 to 1761 CE', () => {
            expect(Array.isArray(data.TARABAI_TIMELINE)).toBe(true);
            expect(data.TARABAI_TIMELINE.length).toBe(7);
            expect(data.TARABAI_TIMELINE[0].year).toContain('1675');
            expect(data.TARABAI_TIMELINE[data.TARABAI_TIMELINE.length - 1].year).toContain('1761');
        });
    });

    describe('TARABAI_SOURCES historical references', () => {
        it('cites Khafi Khan, Jadunath Sarkar, Sardesai, and Stewart Gordon', () => {
            expect(Array.isArray(data.TARABAI_SOURCES)).toBe(true);
            expect(data.TARABAI_SOURCES.length).toBeGreaterThanOrEqual(4);

            const authors = data.TARABAI_SOURCES.map(s => s.author);
            expect(authors.some(a => a.includes('Khafi Khan'))).toBe(true);
            expect(authors.some(a => a.includes('Jadunath Sarkar'))).toBe(true);
            expect(authors.some(a => a.includes('Sardesai'))).toBe(true);
            expect(authors.some(a => a.includes('Gordon'))).toBe(true);
        });
    });
});
