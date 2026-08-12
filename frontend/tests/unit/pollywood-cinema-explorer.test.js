/**
 * pollywood-cinema-explorer.test.js
 * Unit tests for Pollywood Cinema Explorer.
 * Validates data integrity for POLLYWOOD_CINEMA_INFO, POLLYWOOD_FILMS, POLLYWOOD_ARTISTS,
 * POLLYWOOD_TIMELINE, POLLYWOOD_GALLERY, and POLLYWOOD_REFERENCES exported from script.js.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPollywoodData() {
    const code = readFileSync(resolve(__dirname, '../../pollywood-cinema-explorer/script.js'), 'utf-8');
    // Strip the DOMContentLoaded block / router hook so it doesn't throw in Node/JSDOM
    const stripped = code.replace(/document\.addEventListener[\s\S]*$/, '');
    const fn = new Function(
        stripped +
            '\nreturn { POLLYWOOD_CINEMA_INFO, POLLYWOOD_FILMS, POLLYWOOD_ARTISTS, POLLYWOOD_TIMELINE, POLLYWOOD_GALLERY, POLLYWOOD_REFERENCES };'
    );
    return fn();
}

describe('Pollywood Cinema Explorer — Data Integrity', () => {
    let data;

    beforeAll(() => {
        data = loadPollywoodData();
    });

    describe('POLLYWOOD_CINEMA_INFO metadata', () => {
        it('contains correct id and name', () => {
            expect(data.POLLYWOOD_CINEMA_INFO.id).toBe('pollywood-cinema');
            expect(data.POLLYWOOD_CINEMA_INFO.name).toContain('Pollywood');
        });

        it('identifies correct language and region', () => {
            expect(data.POLLYWOOD_CINEMA_INFO.language).toBe('Punjabi');
            expect(data.POLLYWOOD_CINEMA_INFO.region).toContain('Punjab');
        });

        it('references Eighth Schedule correctly', () => {
            expect(data.POLLYWOOD_CINEMA_INFO.schedule).toContain('Eighth Schedule');
        });

        it('has at least 3 cultural roots listed', () => {
            expect(Array.isArray(data.POLLYWOOD_CINEMA_INFO.culturalRoots)).toBe(true);
            expect(data.POLLYWOOD_CINEMA_INFO.culturalRoots.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('POLLYWOOD_FILMS dataset', () => {
        it('contains exactly 6 notable film entries', () => {
            expect(Array.isArray(data.POLLYWOOD_FILMS)).toBe(true);
            expect(data.POLLYWOOD_FILMS.length).toBe(6);
        });

        it('every film entry has required fields: id, title, year, genre, significance', () => {
            data.POLLYWOOD_FILMS.forEach((film, idx) => {
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

        it('first film is from the 1930s (pioneer era)', () => {
            const pioneer = data.POLLYWOOD_FILMS[0];
            expect(pioneer.year).toBe(1935);
        });

        it('films are in chronological order', () => {
            for (let i = 0; i < data.POLLYWOOD_FILMS.length - 1; i++) {
                expect(data.POLLYWOOD_FILMS[i].year).toBeLessThanOrEqual(data.POLLYWOOD_FILMS[i + 1].year);
            }
        });
    });

    describe('POLLYWOOD_ARTISTS dataset', () => {
        it('contains at least 4 pioneering artists', () => {
            expect(Array.isArray(data.POLLYWOOD_ARTISTS)).toBe(true);
            expect(data.POLLYWOOD_ARTISTS.length).toBeGreaterThanOrEqual(4);
        });

        it('every artist has id, name, role, and contribution fields', () => {
            data.POLLYWOOD_ARTISTS.forEach((artist, idx) => {
                expect(artist, `Artist ${idx} missing id`).toHaveProperty('id');
                expect(artist, `Artist ${idx} missing name`).toHaveProperty('name');
                expect(artist, `Artist ${idx} missing role`).toHaveProperty('role');
                expect(artist, `Artist ${idx} missing contribution`).toHaveProperty('contribution');
                expect(typeof artist.name).toBe('string');
                expect(artist.name.trim().length).toBeGreaterThan(0);
            });
        });

        it('includes Diljit Dosanjh as a key artist', () => {
            const diljit = data.POLLYWOOD_ARTISTS.find(a => a.name.includes('Diljit Dosanjh'));
            expect(diljit).toBeDefined();
            expect(diljit.role).toContain('Actor');
        });
    });

    describe('POLLYWOOD_TIMELINE dataset', () => {
        it('contains exactly 5 timeline eras', () => {
            expect(Array.isArray(data.POLLYWOOD_TIMELINE)).toBe(true);
            expect(data.POLLYWOOD_TIMELINE.length).toBe(5);
        });

        it('every timeline entry has id, period, era, and description', () => {
            data.POLLYWOOD_TIMELINE.forEach((entry, idx) => {
                expect(entry, `Timeline ${idx} missing id`).toHaveProperty('id');
                expect(entry, `Timeline ${idx} missing period`).toHaveProperty('period');
                expect(entry, `Timeline ${idx} missing era`).toHaveProperty('era');
                expect(entry, `Timeline ${idx} missing description`).toHaveProperty('description');
                expect(typeof entry.era).toBe('string');
                expect(entry.era.trim().length).toBeGreaterThan(0);
            });
        });

        it('first era is the 1930s-1940s Lahore hub period', () => {
            expect(data.POLLYWOOD_TIMELINE[0].period).toContain('1930');
        });

        it('last era references global reach or modern resurgence', () => {
            const last = data.POLLYWOOD_TIMELINE[data.POLLYWOOD_TIMELINE.length - 1];
            expect(last.description).toMatch(/global|resurgence|crossover/i);
        });
    });

    describe('POLLYWOOD_GALLERY dataset', () => {
        it('has exactly 4 gallery items', () => {
            expect(Array.isArray(data.POLLYWOOD_GALLERY)).toBe(true);
            expect(data.POLLYWOOD_GALLERY.length).toBe(4);
        });

        it('every gallery item has id, title, and subtitle', () => {
            data.POLLYWOOD_GALLERY.forEach((item, idx) => {
                expect(item, `Gallery ${idx} missing id`).toHaveProperty('id');
                expect(item, `Gallery ${idx} missing title`).toHaveProperty('title');
                expect(item, `Gallery ${idx} missing subtitle`).toHaveProperty('subtitle');
            });
        });
    });

    describe('POLLYWOOD_REFERENCES dataset', () => {
        it('contains at least 4 references', () => {
            expect(Array.isArray(data.POLLYWOOD_REFERENCES)).toBe(true);
            expect(data.POLLYWOOD_REFERENCES.length).toBeGreaterThanOrEqual(4);
        });

        it('every reference has id, source, and title', () => {
            data.POLLYWOOD_REFERENCES.forEach((ref, idx) => {
                expect(ref, `Reference ${idx} missing id`).toHaveProperty('id');
                expect(ref, `Reference ${idx} missing source`).toHaveProperty('source');
                expect(ref, `Reference ${idx} missing title`).toHaveProperty('title');
            });
        });

        it('includes NFAI as a reference source', () => {
            const nfai = data.POLLYWOOD_REFERENCES.find(
                r => r.source.includes('NFAI') || r.source.includes('National Film Archive')
            );
            expect(nfai).toBeDefined();
        });
    });
});
