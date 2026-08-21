/**
 * dogri-cinema-explorer.test.js
 * Unit tests for Dogri Cinema Explorer.
 * Validates data integrity for DOGRI_CINEMA_INFO, DOGRI_FILMS, DOGRI_ARTISTS,
 * DOGRI_TIMELINE, DOGRI_GALLERY, and DOGRI_REFERENCES exported from script.js.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDogriData() {
    const code = readFileSync(resolve(__dirname, '../../dogri-cinema-explorer/script.js'), 'utf-8');
    // Strip the DOMContentLoaded block so it doesn't throw in Node
    const stripped = code.replace(/document\.addEventListener\s*\(\s*['"]DOMContentLoaded['"][\s\S]*$/, '');
    const fn = new Function(
        stripped +
            '\nreturn { DOGRI_CINEMA_INFO, DOGRI_FILMS, DOGRI_ARTISTS, DOGRI_TIMELINE, DOGRI_GALLERY, DOGRI_REFERENCES };'
    );
    return fn();
}

describe('Dogri Cinema Explorer — Data Integrity', () => {
    let data;

    beforeAll(() => {
        data = loadDogriData();
    });

    describe('DOGRI_CINEMA_INFO metadata', () => {
        it('contains correct id and name', () => {
            expect(data.DOGRI_CINEMA_INFO.id).toBe('dogri-cinema');
            expect(data.DOGRI_CINEMA_INFO.name).toBe('Dogri Cinema');
        });

        it('identifies correct language and region', () => {
            expect(data.DOGRI_CINEMA_INFO.language).toBe('Dogri');
            expect(data.DOGRI_CINEMA_INFO.region).toContain('Jammu');
        });

        it('references Eighth Schedule correctly', () => {
            expect(data.DOGRI_CINEMA_INFO.schedule).toContain('Eighth Schedule');
        });

        it('has at least 3 cultural roots listed', () => {
            expect(Array.isArray(data.DOGRI_CINEMA_INFO.culturalRoots)).toBe(true);
            expect(data.DOGRI_CINEMA_INFO.culturalRoots.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('DOGRI_FILMS dataset', () => {
        it('contains exactly 6 notable film entries', () => {
            expect(Array.isArray(data.DOGRI_FILMS)).toBe(true);
            expect(data.DOGRI_FILMS.length).toBe(6);
        });

        it('every film entry has required fields: id, title, year, genre, significance', () => {
            data.DOGRI_FILMS.forEach((film, idx) => {
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

        it('first film is from the 1980s (pioneer era)', () => {
            const pioneer = data.DOGRI_FILMS[0];
            expect(pioneer.year).toBeGreaterThanOrEqual(1980);
            expect(pioneer.year).toBeLessThan(1990);
        });

        it('films are in approximate chronological order', () => {
            for (let i = 0; i < data.DOGRI_FILMS.length - 1; i++) {
                expect(data.DOGRI_FILMS[i].year).toBeLessThanOrEqual(data.DOGRI_FILMS[i + 1].year);
            }
        });
    });

    describe('DOGRI_ARTISTS dataset', () => {
        it('contains at least 4 pioneering artists', () => {
            expect(Array.isArray(data.DOGRI_ARTISTS)).toBe(true);
            expect(data.DOGRI_ARTISTS.length).toBeGreaterThanOrEqual(4);
        });

        it('every artist has id, name, role, and contribution fields', () => {
            data.DOGRI_ARTISTS.forEach((artist, idx) => {
                expect(artist, `Artist ${idx} missing id`).toHaveProperty('id');
                expect(artist, `Artist ${idx} missing name`).toHaveProperty('name');
                expect(artist, `Artist ${idx} missing role`).toHaveProperty('role');
                expect(artist, `Artist ${idx} missing contribution`).toHaveProperty('contribution');
                expect(typeof artist.name).toBe('string');
                expect(artist.name.trim().length).toBeGreaterThan(0);
            });
        });

        it('includes Padma Sachdev as a cultural icon', () => {
            const padma = data.DOGRI_ARTISTS.find(a => a.name.includes('Padma Sachdev'));
            expect(padma).toBeDefined();
            expect(padma.contribution).toMatch(/Sahitya Akademi/i);
        });
    });

    describe('DOGRI_TIMELINE dataset', () => {
        it('contains exactly 5 timeline eras', () => {
            expect(Array.isArray(data.DOGRI_TIMELINE)).toBe(true);
            expect(data.DOGRI_TIMELINE.length).toBe(5);
        });

        it('every timeline entry has id, period, era, and description', () => {
            data.DOGRI_TIMELINE.forEach((entry, idx) => {
                expect(entry, `Timeline ${idx} missing id`).toHaveProperty('id');
                expect(entry, `Timeline ${idx} missing period`).toHaveProperty('period');
                expect(entry, `Timeline ${idx} missing era`).toHaveProperty('era');
                expect(entry, `Timeline ${idx} missing description`).toHaveProperty('description');
                expect(typeof entry.era).toBe('string');
                expect(entry.era.trim().length).toBeGreaterThan(0);
            });
        });

        it('first era is the 1960s–1970s cultural roots period', () => {
            expect(data.DOGRI_TIMELINE[0].period).toContain('1960');
        });

        it('last era references digital/OTT platforms', () => {
            const last = data.DOGRI_TIMELINE[data.DOGRI_TIMELINE.length - 1];
            expect(last.description).toMatch(/OTT|digital|streaming/i);
        });
    });

    describe('DOGRI_GALLERY dataset', () => {
        it('has exactly 4 gallery items', () => {
            expect(Array.isArray(data.DOGRI_GALLERY)).toBe(true);
            expect(data.DOGRI_GALLERY.length).toBe(4);
        });

        it('every gallery item has id, title, and subtitle', () => {
            data.DOGRI_GALLERY.forEach((item, idx) => {
                expect(item, `Gallery ${idx} missing id`).toHaveProperty('id');
                expect(item, `Gallery ${idx} missing title`).toHaveProperty('title');
                expect(item, `Gallery ${idx} missing subtitle`).toHaveProperty('subtitle');
            });
        });
    });

    describe('DOGRI_REFERENCES dataset', () => {
        it('contains at least 4 references', () => {
            expect(Array.isArray(data.DOGRI_REFERENCES)).toBe(true);
            expect(data.DOGRI_REFERENCES.length).toBeGreaterThanOrEqual(4);
        });

        it('every reference has id, source, and title', () => {
            data.DOGRI_REFERENCES.forEach((ref, idx) => {
                expect(ref, `Reference ${idx} missing id`).toHaveProperty('id');
                expect(ref, `Reference ${idx} missing source`).toHaveProperty('source');
                expect(ref, `Reference ${idx} missing title`).toHaveProperty('title');
            });
        });

        it('includes NFAI as a reference', () => {
            const nfai = data.DOGRI_REFERENCES.find(
                r => r.source.includes('NFAI') || r.source.includes('National Film Archive')
            );
            expect(nfai).toBeDefined();
        });
    });
});
