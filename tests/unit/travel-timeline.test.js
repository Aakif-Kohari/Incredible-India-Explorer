/**
 * travel-timeline.test.js
 * Unit tests for the Travel Timeline engine (travel-timeline.js).
 *
 * Loads the plain-script module the same way it ships in the browser
 * (no bundler / ES module wrapper — see trip-planner.test.js for the same
 * pattern) and exercises the public window.TravelTimeline API: trip
 * CRUD, chronological ordering, filtering/search, stats, and export.
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const moduleCode = readFileSync(resolve(__dirname, '../../frontend/travel-timeline/travel-timeline.js'), 'utf-8');

function loadTravelTimeline() {
    // Re-evaluate the module fresh for each test so its internal state
    // (page-rendering listeners) doesn't leak, then hand back the API.
    new Function(moduleCode)();
    return globalThis.TravelTimeline || window.TravelTimeline;
}

describe('TravelTimeline engine', () => {
    let TravelTimeline;

    beforeEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';
        TravelTimeline = loadTravelTimeline();
    });

    describe('validation', () => {
        it('requires a title and a valid start date', () => {
            expect(TravelTimeline.validateTrip({})).toContain('Title is required');
            expect(TravelTimeline.validateTrip({ title: 'Trip' })).toContain('A valid start date is required');
        });

        it('rejects an end date before the start date', () => {
            const errors = TravelTimeline.validateTrip({
                title: 'Trip', startDate: '2026-05-10', endDate: '2026-05-01'
            });
            expect(errors).toContain('End date cannot be before start date');
        });

        it('rejects an out-of-range rating', () => {
            const errors = TravelTimeline.validateTrip({
                title: 'Trip', startDate: '2026-05-01', rating: 9
            });
            expect(errors).toContain('Rating must be between 1 and 5');
        });

        it('accepts a minimal valid trip', () => {
            expect(TravelTimeline.validateTrip({ title: 'Trip', startDate: '2026-05-01' })).toEqual([]);
        });
    });

    describe('duration calculation', () => {
        it('treats a single-day trip (no end date) as 1 day', () => {
            expect(TravelTimeline.computeDurationDays('2026-05-01', '')).toBe(1);
        });

        it('computes an inclusive day count across a date range', () => {
            expect(TravelTimeline.computeDurationDays('2026-05-01', '2026-05-05')).toBe(5);
        });
    });

    describe('CRUD operations', () => {
        it('adds a trip and persists it to localStorage', () => {
            const trip = TravelTimeline.addTrip({
                title: 'Golden Triangle', state: 'Uttar Pradesh', category: 'heritage',
                startDate: '2026-01-10', endDate: '2026-01-14'
            });

            expect(trip.id).toBeTruthy();
            expect(trip.durationDays).toBe(5);
            expect(TravelTimeline.getTrips()).toHaveLength(1);

            const stored = JSON.parse(localStorage.getItem('india-explorer-travel-timeline'));
            expect(stored).toHaveLength(1);
            expect(stored[0].title).toBe('Golden Triangle');
        });

        it('throws when adding an invalid trip', () => {
            expect(() => TravelTimeline.addTrip({ title: '' })).toThrow();
        });

        it('updates an existing trip', () => {
            const trip = TravelTimeline.addTrip({ title: 'Kerala Backwaters', startDate: '2026-02-01' });
            const updated = TravelTimeline.updateTrip(trip.id, { rating: 5, notes: 'Unforgettable houseboat stay' });

            expect(updated.rating).toBe(5);
            expect(updated.notes).toBe('Unforgettable houseboat stay');
            expect(updated.title).toBe('Kerala Backwaters');
        });

        it('returns null when updating a trip that does not exist', () => {
            expect(TravelTimeline.updateTrip('missing-id', { rating: 4 })).toBeNull();
        });

        it('deletes a trip', () => {
            const trip = TravelTimeline.addTrip({ title: 'Leh Ladakh', startDate: '2026-06-01' });
            expect(TravelTimeline.deleteTrip(trip.id)).toBe(true);
            expect(TravelTimeline.getTrips()).toHaveLength(0);
            expect(TravelTimeline.deleteTrip(trip.id)).toBe(false);
        });

        it('returns trips sorted chronologically regardless of insertion order', () => {
            TravelTimeline.addTrip({ title: 'Later trip', startDate: '2026-08-01' });
            TravelTimeline.addTrip({ title: 'Earlier trip', startDate: '2025-03-01' });
            TravelTimeline.addTrip({ title: 'Middle trip', startDate: '2025-12-01' });

            const titles = TravelTimeline.getTrips().map((t) => t.title);
            expect(titles).toEqual(['Earlier trip', 'Middle trip', 'Later trip']);
        });
    });

    describe('filtering and search', () => {
        beforeEach(() => {
            TravelTimeline.addTrip({
                title: 'Taj Mahal Weekend', state: 'Uttar Pradesh', category: 'heritage',
                startDate: '2025-11-01', endDate: '2025-11-03',
                destinationNames: ['Agra']
            });
            TravelTimeline.addTrip({
                title: 'Himalayan Trek', state: 'Himachal Pradesh', category: 'mountains',
                startDate: '2026-06-15', endDate: '2026-06-20',
                notes: 'Snow-capped peaks and cold mornings'
            });
            TravelTimeline.addTrip({
                title: 'Goa Beach Escape', state: 'Goa', category: 'beaches',
                startDate: '2026-06-01', endDate: '2026-06-04'
            });
        });

        it('filters by year', () => {
            expect(TravelTimeline.filterTrips({ year: 2025 })).toHaveLength(1);
            expect(TravelTimeline.filterTrips({ year: 2026 })).toHaveLength(2);
        });

        it('filters by state', () => {
            const result = TravelTimeline.filterTrips({ state: 'Goa' });
            expect(result).toHaveLength(1);
            expect(result[0].title).toBe('Goa Beach Escape');
        });

        it('filters by category', () => {
            expect(TravelTimeline.filterTrips({ category: 'mountains' })).toHaveLength(1);
        });

        it('searches across title, notes, and destinations', () => {
            expect(TravelTimeline.filterTrips({ query: 'agra' })).toHaveLength(1);
            expect(TravelTimeline.filterTrips({ query: 'snow-capped' })).toHaveLength(1);
            expect(TravelTimeline.filterTrips({ query: 'nonexistent-place' })).toHaveLength(0);
        });

        it('combines multiple filters', () => {
            const result = TravelTimeline.filterTrips({ year: 2026, category: 'beaches' });
            expect(result).toHaveLength(1);
            expect(result[0].title).toBe('Goa Beach Escape');
        });

        it('lists distinct years and states for filter dropdowns', () => {
            expect(TravelTimeline.getYears()).toEqual([2026, 2025]);
            expect(TravelTimeline.getStates()).toEqual(['Goa', 'Himachal Pradesh', 'Uttar Pradesh']);
        });
    });

    describe('stats', () => {
        it('summarizes trip count, total days, states, and average rating', () => {
            TravelTimeline.addTrip({
                title: 'Trip A', state: 'Goa', startDate: '2026-01-01', endDate: '2026-01-03', rating: 4
            });
            TravelTimeline.addTrip({
                title: 'Trip B', state: 'Kerala', startDate: '2026-02-01', endDate: '2026-02-05', rating: 5
            });

            const stats = TravelTimeline.getStats();
            expect(stats.totalTrips).toBe(2);
            expect(stats.totalDays).toBe(3 + 5);
            expect(stats.statesVisited).toBe(2);
            expect(stats.avgRating).toBe(4.5);
        });

        it('returns null average rating when no trips are rated', () => {
            TravelTimeline.addTrip({ title: 'Trip A', startDate: '2026-01-01' });
            expect(TravelTimeline.getStats().avgRating).toBeNull();
        });
    });

    describe('export', () => {
        it('exports valid JSON containing every trip', () => {
            TravelTimeline.addTrip({ title: 'Trip A', startDate: '2026-01-01' });
            TravelTimeline.addTrip({ title: 'Trip B', startDate: '2026-02-01' });

            const { filename, mimeType, content } = TravelTimeline.exportTimeline('json');
            expect(filename).toBe('travel-timeline.json');
            expect(mimeType).toBe('application/json');
            expect(JSON.parse(content)).toHaveLength(2);
        });

        it('exports CSV with a header row and one row per trip', () => {
            TravelTimeline.addTrip({ title: 'Trip A', startDate: '2026-01-01' });
            TravelTimeline.addTrip({ title: 'Trip, B', startDate: '2026-02-01' });

            const { filename, mimeType, content } = TravelTimeline.exportTimeline('csv');
            const lines = content.split('\n');
            expect(filename).toBe('travel-timeline.csv');
            expect(mimeType).toBe('text/csv');
            expect(lines[0]).toBe('title,state,category,startDate,endDate,durationDays,rating,notes');
            expect(lines).toHaveLength(3);
            expect(lines[2]).toContain('"Trip, B"');
        });
    });
});
