/* ==========================================================================
   PERFORMANCE ENGINE — Unit Tests (Vitest)
   Comprehensive test suite for the Indian Classical Performances Explorer
   engine. Covers all public methods, filtering pipelines, search logic,
   analytics computations, and rendering helpers.

   Test Coverage Target: 100% statement and branch coverage for
   PerformanceEngine class and exported pure functions.

   Testing Approach:
   - Unit tests for each engine method in isolation
   - Edge cases: empty queries, no-match filters, boundary values
   - Render function output validation (HTML structure checks)
   - Analytics computation correctness
   ========================================================================== */

import { describe, it, expect, beforeEach } from 'vitest';
import {
    ClassicalRaga,
    ClassicalDanceForm,
    ClassicalPerformer,
    PerformanceEngine,
    RAGAS,
    DANCE_FORMS,
    PERFORMERS,
    renderRagaCard,
    renderDanceCard,
    renderPerformerCard,
    renderStateChart,
    renderMoodChart,
    renderTraditionChart,
    renderTimeline,
} from '../../frontend/indian-classical-performances/performance-engine.js';

/* ======================================================================
   MODEL CONSTRUCTION TESTS
   ====================================================================== */

describe('ClassicalRaga', () => {
    it('should create a raga with all properties', () => {
        const raga = new ClassicalRaga('Test', 'peaceful', 'Evening', 'North', ['Sitar'], 'Desc', ['tag1']);
        expect(raga.name).toBe('Test');
        expect(raga.mood).toBe('peaceful');
        expect(raga.timeOfDay).toBe('Evening');
        expect(raga.origin).toBe('North');
        expect(raga.instruments).toEqual(['Sitar']);
        expect(raga.description).toBe('Desc');
        expect(raga.tags).toEqual(['tag1']);
        expect(raga.type).toBe('raga');
    });

    it('should default tags to empty array', () => {
        const raga = new ClassicalRaga('X', 'devotional', 'Morning', 'South', ['Veena'], 'D');
        expect(raga.tags).toEqual([]);
    });
});

describe('ClassicalDanceForm', () => {
    it('should create a dance form with all properties', () => {
        const dance = new ClassicalDanceForm('Test', 'classical', 'TN', 'Ancient', ['Mudras'], 'Desc', ['tag1']);
        expect(dance.name).toBe('Test');
        expect(dance.tradition).toBe('classical');
        expect(dance.origin).toBe('TN');
        expect(dance.era).toBe('Ancient');
        expect(dance.features).toEqual(['Mudras']);
        expect(dance.description).toBe('Desc');
        expect(dance.tags).toEqual(['tag1']);
        expect(dance.type).toBe('dance');
    });

    it('should default tags to empty array', () => {
        const dance = new ClassicalDanceForm('X', 'folk', 'GJ', 'Medieval', [], 'D');
        expect(dance.tags).toEqual([]);
    });
});

describe('ClassicalPerformer', () => {
    it('should create a performer with all properties', () => {
        const p = new ClassicalPerformer('Test', 'vocal', 'Sitar', 'Delhi, DL', '1920-2012', 'Desc', '🎤');
        expect(p.name).toBe('Test');
        expect(p.discipline).toBe('vocal');
        expect(p.instrument).toBe('Sitar');
        expect(p.origin).toBe('Delhi, DL');
        expect(p.period).toBe('1920-2012');
        expect(p.description).toBe('Desc');
        expect(p.emoji).toBe('🎤');
        expect(p.type).toBe('performer');
        expect(p.tags).toEqual(['vocal', 'Sitar', 'Delhi, DL']);
    });

    it('should default emoji to musical note', () => {
        const p = new ClassicalPerformer('X', 'dance', 'Kathak', 'UP', '1990-present', 'D');
        expect(p.emoji).toBe('🎵');
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — DATA ACCESSOR TESTS
   ====================================================================== */

describe('PerformanceEngine - Data Accessors', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    it('should return all ragas from getRagas()', () => {
        expect(engine.getRagas()).toHaveLength(RAGAS.length);
    });

    it('should return all dances from getDances()', () => {
        expect(engine.getDances()).toHaveLength(DANCE_FORMS.length);
    });

    it('should return all performers from getPerformers()', () => {
        expect(engine.getPerformers()).toHaveLength(PERFORMERS.length);
    });

    it('should return combined items from getAllItems()', () => {
        const all = engine.getAllItems();
        expect(all).toHaveLength(RAGAS.length + DANCE_FORMS.length + PERFORMERS.length);
    });

    it('should return correct stats from getStats()', () => {
        const stats = engine.getStats();
        expect(stats.ragas).toBe(RAGAS.length);
        expect(stats.dances).toBe(DANCE_FORMS.length);
        expect(stats.performers).toBe(PERFORMERS.length);
        expect(stats.states).toBeGreaterThan(0);
    });

    it('should return copies, not references', () => {
        const ragas1 = engine.getRagas();
        const ragas2 = engine.getRagas();
        expect(ragas1).not.toBe(ragas2);
        expect(ragas1).toEqual(ragas2);
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — SEARCH TESTS
   ====================================================================== */

describe('PerformanceEngine - Search', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    it('should return true for empty query', () => {
        const raga = engine.getRagas()[0];
        expect(engine.matchesSearch(raga, '')).toBe(true);
        expect(engine.matchesSearch(raga, '   ')).toBe(true);
    });

    it('should match by name', () => {
        const raga = engine.getRagas()[0];
        expect(engine.matchesSearch(raga, raga.name.toLowerCase())).toBe(true);
    });

    it('should match by description', () => {
        const raga = engine.getRagas()[0];
        const word = raga.description.split(' ')[0].toLowerCase();
        expect(engine.matchesSearch(raga, word)).toBe(true);
    });

    it('should match by origin', () => {
        const raga = engine.getRagas()[0];
        expect(engine.matchesSearch(raga, raga.origin.toLowerCase())).toBe(true);
    });

    it('should match by tag', () => {
        const raga = engine.getRagas()[0];
        if (raga.tags.length > 0) {
            expect(engine.matchesSearch(raga, raga.tags[0].toLowerCase())).toBe(true);
        }
    });

    it('should match multi-term queries', () => {
        const raga = engine.getRagas().find(r => r.origin === 'North India' && r.mood === 'peaceful');
        expect(engine.matchesSearch(raga, 'yaman peaceful')).toBe(true);
    });

    it('should not match when term is absent', () => {
        const raga = engine.getRagas()[0];
        expect(engine.matchesSearch(raga, 'zzzznonexistent')).toBe(false);
    });

    it('should searchItems across an array', () => {
        const results = engine.searchItems(engine.getRagas(), 'yaman');
        expect(results.length).toBeGreaterThanOrEqual(1);
        expect(results.every(r => r.name.toLowerCase().includes('yaman') || r.description.toLowerCase().includes('yaman') || r.tags.some(t => t.toLowerCase().includes('yaman')))).toBe(true);
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — FILTER TESTS
   ====================================================================== */

describe('PerformanceEngine - Filtering', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    describe('Raga mood filter', () => {
        it('should return all ragas when mood is "all"', () => {
            expect(engine.filterRagasByMood('all')).toHaveLength(RAGAS.length);
        });

        it('should filter ragas by specific mood', () => {
            const peaceful = engine.filterRagasByMood('peaceful');
            expect(peaceful.length).toBeGreaterThan(0);
            expect(peaceful.every(r => r.mood === 'peaceful')).toBe(true);
        });

        it('should return empty for non-existent mood', () => {
            expect(engine.filterRagasByMood('nonexistent')).toHaveLength(0);
        });
    });

    describe('Dance tradition filter', () => {
        it('should return all dances when tradition is "all"', () => {
            expect(engine.filterDancesByTradition('all')).toHaveLength(DANCE_FORMS.length);
        });

        it('should filter by classical tradition', () => {
            const classical = engine.filterDancesByTradition('classical');
            expect(classical.length).toBeGreaterThan(0);
            expect(classical.every(d => d.tradition === 'classical')).toBe(true);
        });

        it('should filter by folk tradition', () => {
            const folk = engine.filterDancesByTradition('folk');
            expect(folk.length).toBeGreaterThan(0);
            expect(folk.every(d => d.tradition === 'folk')).toBe(true);
        });

        it('should filter by tribal tradition', () => {
            const tribal = engine.filterDancesByTradition('tribal');
            expect(tribal.length).toBeGreaterThan(0);
            expect(tribal.every(d => d.tradition === 'tribal')).toBe(true);
        });
    });

    describe('Performer discipline filter', () => {
        it('should return all performers when discipline is "all"', () => {
            expect(engine.filterPerformersByDiscipline('all')).toHaveLength(PERFORMERS.length);
        });

        it('should filter by vocal discipline', () => {
            const vocal = engine.filterPerformersByDiscipline('vocal');
            expect(vocal.length).toBeGreaterThan(0);
            expect(vocal.every(p => p.discipline === 'vocal')).toBe(true);
        });

        it('should filter by instrumental discipline', () => {
            const inst = engine.filterPerformersByDiscipline('instrumental');
            expect(inst.length).toBeGreaterThan(0);
            expect(inst.every(p => p.discipline === 'instrumental')).toBe(true);
        });

        it('should filter by dance discipline', () => {
            const dance = engine.filterPerformersByDiscipline('dance');
            expect(dance.length).toBeGreaterThan(0);
            expect(dance.every(p => p.discipline === 'dance')).toBe(true);
        });
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — SORTING TESTS
   ====================================================================== */

describe('PerformanceEngine - Sorting', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    it('should sort by name ascending', () => {
        const sorted = engine.sortItems(engine.getRagas(), 'name-asc');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].name.localeCompare(sorted[i - 1].name)).toBeGreaterThanOrEqual(0);
        }
    });

    it('should sort by name descending', () => {
        const sorted = engine.sortItems(engine.getRagas(), 'name-desc');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].name.localeCompare(sorted[i - 1].name)).toBeLessThanOrEqual(0);
        }
    });

    it('should sort by origin', () => {
        const sorted = engine.sortItems(engine.getRagas(), 'origin');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].origin.localeCompare(sorted[i - 1].origin)).toBeGreaterThanOrEqual(0);
        }
    });

    it('should sort by period (performers)', () => {
        const sorted = engine.sortItems(engine.getPerformers(), 'period');
        expect(sorted).toHaveLength(PERFORMERS.length);
    });

    it('should use default sort for unknown sort key', () => {
        const sorted = engine.sortItems(engine.getRagas(), 'unknown-key');
        expect(sorted).toHaveLength(RAGAS.length);
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — COMBINED FILTER PIPELINE TESTS
   ====================================================================== */

describe('PerformanceEngine - Combined Filter Pipeline', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    it('should get filtered ragas with default state', () => {
        expect(engine.getFilteredRagas()).toHaveLength(RAGAS.length);
    });

    it('should get filtered dances with default state', () => {
        expect(engine.getFilteredDances()).toHaveLength(DANCE_FORMS.length);
    });

    it('should get filtered performers with default state', () => {
        expect(engine.getFilteredPerformers()).toHaveLength(PERFORMERS.length);
    });

    it('should narrow results when search is set', () => {
        engine.setSearchQuery('Yaman');
        const ragas = engine.getFilteredRagas();
        expect(ragas.length).toBeGreaterThanOrEqual(1);
        expect(ragas.length).toBeLessThan(RAGAS.length);
    });

    it('should narrow results when mood filter is set', () => {
        engine.setRagaMoodFilter('melancholic');
        const ragas = engine.getFilteredRagas();
        expect(ragas.length).toBeLessThan(RAGAS.length);
        expect(ragas.every(r => r.mood === 'melancholic')).toBe(true);
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — ANALYTICS TESTS
   ====================================================================== */

describe('PerformanceEngine - Analytics', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    it('should compute state distribution', () => {
        const dist = engine.getStateDistribution();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist.length).toBeLessThanOrEqual(8);
        expect(dist[0].count).toBeGreaterThanOrEqual(dist[1]?.count || 0);
    });

    it('should compute mood distribution', () => {
        const dist = engine.getMoodDistribution();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist.every(d => d.count > 0)).toBe(true);
    });

    it('should compute tradition breakdown', () => {
        const dist = engine.getTraditionBreakdown();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist.every(d => d.count > 0)).toBe(true);
    });

    it('should compute timeline', () => {
        const timeline = engine.getTimeline();
        expect(timeline.length).toBeGreaterThan(0);
        expect(timeline[0]).toHaveProperty('year');
        expect(timeline[0]).toHaveProperty('text');
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — STATE MANAGEMENT TESTS
   ====================================================================== */

describe('PerformanceEngine - State Management', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    it('should update search query', () => {
        engine.setSearchQuery('test');
        expect(engine.state.searchQuery).toBe('test');
    });

    it('should update category filter', () => {
        engine.setCategoryFilter('raga');
        expect(engine.state.categoryFilter).toBe('raga');
    });

    it('should update raga mood filter', () => {
        engine.setRagaMoodFilter('romantic');
        expect(engine.state.ragaMoodFilter).toBe('romantic');
    });

    it('should update dance tradition filter', () => {
        engine.setDanceTraditionFilter('folk');
        expect(engine.state.danceTraditionFilter).toBe('folk');
    });

    it('should update performer discipline filter', () => {
        engine.setPerformerDisciplineFilter('vocal');
        expect(engine.state.performerDisciplineFilter).toBe('vocal');
    });

    it('should update sort by', () => {
        engine.setSortBy('name-desc');
        expect(engine.state.sortBy).toBe('name-desc');
    });

    it('should reset all filters', () => {
        engine.setSearchQuery('test');
        engine.setRagaMoodFilter('romantic');
        engine.setDanceTraditionFilter('folk');
        engine.resetFilters();
        expect(engine.state.searchQuery).toBe('');
        expect(engine.state.ragaMoodFilter).toBe('all');
        expect(engine.state.danceTraditionFilter).toBe('all');
        expect(engine.state.performerDisciplineFilter).toBe('all');
        expect(engine.state.sortBy).toBe('name-asc');
    });
});

/* ======================================================================
   PERFORMANCE ENGINE — HELPER METHOD TESTS
   ====================================================================== */

describe('PerformanceEngine - Helper Methods', () => {
    let engine;

    beforeEach(() => {
        engine = new PerformanceEngine();
    });

    it('should return correct badge class for mood', () => {
        expect(engine.getBadgeClass('devotional')).toBe('badge-devotional');
        expect(engine.getBadgeClass('romantic')).toBe('badge-romantic');
        expect(engine.getBadgeClass('energetic')).toBe('badge-energetic');
        expect(engine.getBadgeClass('peaceful')).toBe('badge-peaceful');
        expect(engine.getBadgeClass('melancholic')).toBe('badge-melancholic');
    });

    it('should return correct badge class for tradition', () => {
        expect(engine.getBadgeClass('classical')).toBe('badge-classical');
        expect(engine.getBadgeClass('folk')).toBe('badge-folk');
        expect(engine.getBadgeClass('tribal')).toBe('badge-tribal');
    });

    it('should return correct badge class for discipline', () => {
        expect(engine.getBadgeClass('vocal')).toBe('badge-vocal');
        expect(engine.getBadgeClass('instrumental')).toBe('badge-instrumental');
        expect(engine.getBadgeClass('dance')).toBe('badge-dance');
    });

    it('should return default badge class for unknown value', () => {
        expect(engine.getBadgeClass('unknown')).toBe('badge-classical');
    });

    it('should return correct chart colors', () => {
        expect(engine.getChartColor(0)).toBe('saffron');
        expect(engine.getChartColor(1)).toBe('green');
        expect(engine.getChartColor(2)).toBe('gold');
        expect(engine.getChartColor(3)).toBe('blue');
        expect(engine.getChartColor(4)).toBe('saffron'); // wraps
    });

    it('should return correct mood dot colors', () => {
        expect(engine.getMoodDotColor('devotional')).toBe('#a78bfa');
        expect(engine.getMoodDotColor('romantic')).toBe('#fb7185');
        expect(engine.getMoodDotColor('energetic')).toBe('#fb923c');
        expect(engine.getMoodDotColor('peaceful')).toBe('#4ade80');
        expect(engine.getMoodDotColor('melancholic')).toBe('#38bdf8');
        expect(engine.getMoodDotColor('unknown')).toBe('#94a3b8');
    });

    it('should return correct tradition colors', () => {
        expect(engine.getTraditionColor('classical')).toBe('#FFB01F');
        expect(engine.getTraditionColor('folk')).toBe('#4ade80');
        expect(engine.getTraditionColor('tribal')).toBe('#fbbf24');
        expect(engine.getTraditionColor('unknown')).toBe('#94a3b8');
    });
});

/* ======================================================================
   RENDER FUNCTION TESTS
   ====================================================================== */

describe('Render Functions', () => {
    const sampleRaga = new ClassicalRaga('TestRaga', 'peaceful', 'Evening', 'North', ['Sitar'], 'A test raga.', ['tag1']);
    const sampleDance = new ClassicalDanceForm('TestDance', 'classical', 'TN', 'Ancient', ['Mudras'], 'A test dance.', ['tag1']);
    const samplePerformer = new ClassicalPerformer('TestPerformer', 'vocal', 'Sitar', 'Delhi, DL', '1920-2012', 'A test performer.', '🎤');

    it('renderRagaCard should return HTML with raga name', () => {
        const html = renderRagaCard(sampleRaga);
        expect(html).toContain('TestRaga');
        expect(html).toContain('peaceful');
        expect(html).toContain('tag1');
    });

    it('renderDanceCard should return HTML with dance name', () => {
        const html = renderDanceCard(sampleDance);
        expect(html).toContain('TestDance');
        expect(html).toContain('classical');
        expect(html).toContain('Mudras');
    });

    it('renderPerformerCard should return HTML with performer name', () => {
        const html = renderPerformerCard(samplePerformer);
        expect(html).toContain('TestPerformer');
        expect(html).toContain('vocal');
        expect(html).toContain('🎤');
    });

    it('renderStateChart should return bar chart HTML', () => {
        const data = [{ state: 'TN', count: 3 }, { state: 'UP', count: 2 }];
        const html = renderStateChart(data);
        expect(html).toContain('TN');
        expect(html).toContain('UP');
        expect(html).toContain('chart-bar-fill');
    });

    it('renderMoodChart should return mood rows HTML', () => {
        const data = [{ mood: 'peaceful', count: 2 }, { mood: 'energetic', count: 1 }];
        const html = renderMoodChart(data);
        expect(html).toContain('Peaceful');
        expect(html).toContain('Energetic');
    });

    it('renderTraditionChart should return tradition rows HTML', () => {
        const data = [{ tradition: 'classical', count: 5 }, { tradition: 'folk', count: 3 }];
        const html = renderTraditionChart(data);
        expect(html).toContain('Classical');
        expect(html).toContain('Folk');
    });

    it('renderTimeline should return timeline entries HTML', () => {
        const data = [{ year: '1920s', text: 'Test event.' }];
        const html = renderTimeline(data);
        expect(html).toContain('1920s');
        expect(html).toContain('Test event.');
    });
});

/* ======================================================================
   CONFIG OVERRIDE TESTS (for test isolation)
   ====================================================================== */

describe('PerformanceEngine - Config Overrides', () => {
    it('should accept custom datasets via config', () => {
        const customRagas = [new ClassicalRaga('Custom', 'peaceful', 'Evening', 'X', [], 'D')];
        const customDances = [new ClassicalDanceForm('Custom', 'classical', 'Y', 'Z', [], 'D')];
        const customPerformers = [new ClassicalPerformer('Custom', 'vocal', 'V', 'W', '2000-present', 'D')];
        const eng = new PerformanceEngine({
            ragas: customRagas,
            dances: customDances,
            performers: customPerformers,
        });
        expect(eng.getRagas()).toHaveLength(1);
        expect(eng.getDances()).toHaveLength(1);
        expect(eng.getPerformers()).toHaveLength(1);
        expect(eng.getStats().ragas).toBe(1);
    });
});
