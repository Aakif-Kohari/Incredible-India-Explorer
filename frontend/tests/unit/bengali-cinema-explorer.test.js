/**
 * bengali-cinema-explorer.test.js
 * Unit tests for Bengali Cinema Explorer datasets.
 * Validates data integrity for BENGALI_CINEMA_INFO, BENGALI_FILMS, BENGALI_FILMMAKERS,
 * BENGALI_TIMELINE, BENGALI_GALLERY, and BENGALI_REFERENCES exported from script.js.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBengaliData() {
    const code = readFileSync(resolve(__dirname, '../../bengali-cinema-explorer/script.js'), 'utf-8');
    // Strip the DOMContentLoaded block / router hook so it doesn't throw in Node/JSDOM
    const stripped = code.replace(/document\.addEventListener\("app:route-changed"[\s\S]*$/, '');
    const fn = new Function(
        stripped +
            '\nreturn { BENGALI_CINEMA_INFO, BENGALI_FILMS, BENGALI_FILMMAKERS, BENGALI_TIMELINE, BENGALI_GALLERY, BENGALI_REFERENCES };'
    );
    return fn();
}

describe('Bengali Cinema Explorer — Data Integrity', () => {
    let data;

    beforeAll(() => {
        data = loadBengaliData();
    });

    describe('BENGALI_CINEMA_INFO metadata', () => {
        it('contains correct id and name', () => {
            expect(data.BENGALI_CINEMA_INFO.id).toBe('bengali-cinema');
            expect(data.BENGALI_CINEMA_INFO.name).toContain('Bengali');
        });

        it('identifies correct language and region', () => {
            expect(data.BENGALI_CINEMA_INFO.language).toBe('Bengali');
            expect(data.BENGALI_CINEMA_INFO.region).toContain('West Bengal');
        });

        it('references Eighth Schedule correctly', () => {
            expect(data.BENGALI_CINEMA_INFO.schedule).toContain('Eighth Schedule');
        });

        it('has at least 3 cultural roots listed', () => {
            expect(Array.isArray(data.BENGALI_CINEMA_INFO.culturalRoots)).toBe(true);
            expect(data.BENGALI_CINEMA_INFO.culturalRoots.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('BENGALI_FILMS dataset', () => {
        it('contains exactly 6 notable film entries', () => {
            expect(Array.isArray(data.BENGALI_FILMS)).toBe(true);
            expect(data.BENGALI_FILMS.length).toBe(6);
        });

        it('every film entry has required fields: id, title, year, genre, significance', () => {
            data.BENGALI_FILMS.forEach((film, idx) => {
                expect(film, `Film ${idx} missing id`).toHaveProperty('id');
                expect(film, `Film ${idx} missing title`).toHaveProperty('title');
                expect(film, `Film ${idx} missing year`).toHaveProperty('year');
                expect(film, `Film ${idx} missing genre`).toHaveProperty('genre');
                expect(film, `Film ${idx} missing significance`).toHaveProperty('significance');
                expect(typeof film.title).toBe('string');
                expect(film.title.trim().length).toBeGreaterThan(0);
                expect(typeof film.year).toBe('number');
            });
        });

        it('first film is from 1955 (Pather Panchali)', () => {
            const pioneer = data.BENGALI_FILMS[0];
            expect(pioneer.year).toBe(1955);
            expect(pioneer.title).toBe('Pather Panchali');
        });

        it('films are in chronological order', () => {
            for (let i = 0; i < data.BENGALI_FILMS.length - 1; i++) {
                expect(data.BENGALI_FILMS[i].year).toBeLessThanOrEqual(data.BENGALI_FILMS[i + 1].year);
            }
        });
    });

    describe('BENGALI_FILMMAKERS dataset', () => {
        it('contains at least 4 legendary filmmakers', () => {
            expect(Array.isArray(data.BENGALI_FILMMAKERS)).toBe(true);
            expect(data.BENGALI_FILMMAKERS.length).toBeGreaterThanOrEqual(4);
        });

        it('every filmmaker has id, name, role, and contribution fields', () => {
            data.BENGALI_FILMMAKERS.forEach((maker, idx) => {
                expect(maker, `Filmmaker ${idx} missing id`).toHaveProperty('id');
                expect(maker, `Filmmaker ${idx} missing name`).toHaveProperty('name');
                expect(maker, `Filmmaker ${idx} missing role`).toHaveProperty('role');
                expect(maker, `Filmmaker ${idx} missing contribution`).toHaveProperty('contribution');
                expect(typeof maker.name).toBe('string');
                expect(maker.name.trim().length).toBeGreaterThan(0);
            });
        });

        it('includes Satyajit Ray as a key director', () => {
            const ray = data.BENGALI_FILMMAKERS.find(m => m.name.includes('Satyajit Ray'));
            expect(ray).toBeDefined();
            expect(ray.role).toContain('Director');
        });
    });

    describe('BENGALI_TIMELINE dataset', () => {
        it('contains exactly 5 timeline eras', () => {
            expect(Array.isArray(data.BENGALI_TIMELINE)).toBe(true);
            expect(data.BENGALI_TIMELINE.length).toBe(5);
        });

        it('every timeline entry has id, period, era, and description', () => {
            data.BENGALI_TIMELINE.forEach((entry, idx) => {
                expect(entry, `Timeline ${idx} missing id`).toHaveProperty('id');
                expect(entry, `Timeline ${idx} missing period`).toHaveProperty('period');
                expect(entry, `Timeline ${idx} missing era`).toHaveProperty('era');
                expect(entry, `Timeline ${idx} missing description`).toHaveProperty('description');
                expect(typeof entry.era).toBe('string');
                expect(entry.era.trim().length).toBeGreaterThan(0);
            });
        });

        it('first era is the 1910s-1920s silent era', () => {
            expect(data.BENGALI_TIMELINE[0].period).toContain('1910');
        });

        it('last era references modern digital or literary resurgence', () => {
            const last = data.BENGALI_TIMELINE[data.BENGALI_TIMELINE.length - 1];
            expect(last.description).toMatch(/digital|literary|resurgence/i);
        });
    });

    describe('BENGALI_GALLERY dataset', () => {
        it('has exactly 4 gallery items', () => {
            expect(Array.isArray(data.BENGALI_GALLERY)).toBe(true);
            expect(data.BENGALI_GALLERY.length).toBe(4);
        });

        it('every gallery item has id, title, and subtitle', () => {
            data.BENGALI_GALLERY.forEach((item, idx) => {
                expect(item, `Gallery ${idx} missing id`).toHaveProperty('id');
                expect(item, `Gallery ${idx} missing title`).toHaveProperty('title');
                expect(item, `Gallery ${idx} missing subtitle`).toHaveProperty('subtitle');
            });
        });
    });

    describe('BENGALI_REFERENCES dataset', () => {
        it('contains at least 4 references', () => {
            expect(Array.isArray(data.BENGALI_REFERENCES)).toBe(true);
            expect(data.BENGALI_REFERENCES.length).toBeGreaterThanOrEqual(4);
        });

        it('every reference has id, source, and title', () => {
            data.BENGALI_REFERENCES.forEach((ref, idx) => {
                expect(ref, `Reference ${idx} missing id`).toHaveProperty('id');
                expect(ref, `Reference ${idx} missing source`).toHaveProperty('source');
                expect(ref, `Reference ${idx} missing title`).toHaveProperty('title');
            });
        });

        it('includes Satyajit Ray as a reference source', () => {
            const rayRef = data.BENGALI_REFERENCES.find(r => r.source.includes('Satyajit Ray'));
            expect(rayRef).toBeDefined();
        });
    });
});
