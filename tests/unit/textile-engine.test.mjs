/* ==========================================================================
   TEXTILE ENGINE — Unit Tests (Vitest)
   Comprehensive test suite for the Indian Textiles & Handloom Heritage
   Explorer engine. Covers all public methods, filtering, search, analytics,
   and rendering helpers.

   Test Coverage Target: 100% statement and branch coverage for
   TextileEngine class and exported pure functions.
   ========================================================================== */

import { describe, it, expect, beforeEach } from 'vitest';
import {
    RegionalFabric,
    WeavingTechnique,
    MasterArtisan,
    TextileEngine,
    FABRICS,
    TECHNIQUES,
    ARTISANS,
    renderFabricCard,
    renderTechniqueCard,
    renderArtisanCard,
    renderStateChart,
    renderMaterialChart,
    renderCategoryChart,
    renderTimeline,
} from '../../frontend/indian-textiles-handloom-heritage/textile-engine.js';

/* ======================================================================
   MODEL CONSTRUCTION TESTS
   ====================================================================== */

describe('RegionalFabric', () => {
    it('should create a fabric with all properties', () => {
        const f = new RegionalFabric('Test', 'silk', 'TN', 'Desc', ['feat1'], ['tag1']);
        expect(f.name).toBe('Test');
        expect(f.material).toBe('silk');
        expect(f.origin).toBe('TN');
        expect(f.description).toBe('Desc');
        expect(f.features).toEqual(['feat1']);
        expect(f.tags).toEqual(['tag1']);
        expect(f.type).toBe('fabric');
    });

    it('should default features and tags to empty array', () => {
        const f = new RegionalFabric('X', 'cotton', 'UP', 'D');
        expect(f.features).toEqual([]);
        expect(f.tags).toEqual([]);
    });
});

describe('WeavingTechnique', () => {
    it('should create a technique with all properties', () => {
        const t = new WeavingTechnique('Test', 'weaving', 'UP', 'Advanced', 'Desc', ['tag1']);
        expect(t.name).toBe('Test');
        expect(t.category).toBe('weaving');
        expect(t.origin).toBe('UP');
        expect(t.complexity).toBe('Advanced');
        expect(t.description).toBe('Desc');
        expect(t.tags).toEqual(['tag1']);
        expect(t.type).toBe('technique');
    });

    it('should default tags to empty array', () => {
        const t = new WeavingTechnique('X', 'dyeing', 'GJ', 'Beginner', 'D');
        expect(t.tags).toEqual([]);
    });
});

describe('MasterArtisan', () => {
    it('should create an artisan with all properties', () => {
        const a = new MasterArtisan('Test', 'weaving', 'Silk', 'TN', '1960–present', 'Desc', '🧵', 'Padma Shri');
        expect(a.name).toBe('Test');
        expect(a.specialty).toBe('weaving');
        expect(a.craft).toBe('Silk');
        expect(a.origin).toBe('TN');
        expect(a.period).toBe('1960–present');
        expect(a.description).toBe('Desc');
        expect(a.emoji).toBe('🧵');
        expect(a.award).toBe('Padma Shri');
        expect(a.type).toBe('artisan');
        expect(a.tags).toEqual(['weaving', 'Silk', 'TN']);
    });

    it('should default emoji and award', () => {
        const a = new MasterArtisan('X', 'dyeing', 'Dye', 'GJ', '1970–present', 'D');
        expect(a.emoji).toBe('🧵');
        expect(a.award).toBe('None listed');
    });
});

/* ======================================================================
   TEXTILE ENGINE — DATA ACCESSOR TESTS
   ====================================================================== */

describe('TextileEngine - Data Accessors', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    it('should return all fabrics', () => {
        expect(engine.getFabrics()).toHaveLength(FABRICS.length);
    });

    it('should return all techniques', () => {
        expect(engine.getTechniques()).toHaveLength(TECHNIQUES.length);
    });

    it('should return all artisans', () => {
        expect(engine.getArtisans()).toHaveLength(ARTISANS.length);
    });

    it('should return combined items', () => {
        expect(engine.getAllItems()).toHaveLength(FABRICS.length + TECHNIQUES.length + ARTISANS.length);
    });

    it('should return correct stats', () => {
        const stats = engine.getStats();
        expect(stats.fabrics).toBe(FABRICS.length);
        expect(stats.techniques).toBe(TECHNIQUES.length);
        expect(stats.artisans).toBe(ARTISANS.length);
        expect(stats.states).toBeGreaterThan(0);
    });

    it('should return copies, not references', () => {
        const f1 = engine.getFabrics();
        const f2 = engine.getFabrics();
        expect(f1).not.toBe(f2);
        expect(f1).toEqual(f2);
    });
});

/* ======================================================================
   TEXTILE ENGINE — SEARCH TESTS
   ====================================================================== */

describe('TextileEngine - Search', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    it('should return true for empty query', () => {
        expect(engine.matchesSearch(engine.getFabrics()[0], '')).toBe(true);
        expect(engine.matchesSearch(engine.getFabrics()[0], '   ')).toBe(true);
    });

    it('should match by name', () => {
        const f = engine.getFabrics()[0];
        expect(engine.matchesSearch(f, f.name.toLowerCase())).toBe(true);
    });

    it('should match by material', () => {
        const f = engine.getFabrics()[0];
        expect(engine.matchesSearch(f, f.material)).toBe(true);
    });

    it('should match by origin', () => {
        const f = engine.getFabrics()[0];
        expect(engine.matchesSearch(f, f.origin.toLowerCase())).toBe(true);
    });

    it('should match by tag', () => {
        const f = engine.getFabrics()[0];
        if (f.tags.length > 0) {
            expect(engine.matchesSearch(f, f.tags[0].toLowerCase())).toBe(true);
        }
    });

    it('should match multi-term queries', () => {
        const f = engine.getFabrics().find(fa => fa.material === 'silk' && fa.origin.includes('UP'));
        if (f) {
            expect(engine.matchesSearch(f, 'silk varanasi')).toBe(true);
        }
    });

    it('should not match absent terms', () => {
        expect(engine.matchesSearch(engine.getFabrics()[0], 'zzzznonexistent')).toBe(false);
    });

    it('should searchItems across an array', () => {
        const results = engine.searchItems(engine.getFabrics(), 'silk');
        expect(results.length).toBeGreaterThan(0);
        expect(results.every(f => f.material === 'silk' || f.description.toLowerCase().includes('silk') || f.tags.some(t => t.toLowerCase() === 'silk'))).toBe(true);
    });
});

/* ======================================================================
   TEXTILE ENGINE — FILTER TESTS
   ====================================================================== */

describe('TextileEngine - Filtering', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    describe('Fabric material filter', () => {
        it('should return all when "all"', () => {
            expect(engine.filterFabricsByMaterial('all')).toHaveLength(FABRICS.length);
        });

        it('should filter silk fabrics', () => {
            const silk = engine.filterFabricsByMaterial('silk');
            expect(silk.length).toBeGreaterThan(0);
            expect(silk.every(f => f.material === 'silk')).toBe(true);
        });

        it('should filter cotton fabrics', () => {
            const cotton = engine.filterFabricsByMaterial('cotton');
            expect(cotton.length).toBeGreaterThan(0);
            expect(cotton.every(f => f.material === 'cotton')).toBe(true);
        });

        it('should filter wool fabrics', () => {
            const wool = engine.filterFabricsByMaterial('wool');
            expect(wool.length).toBeGreaterThan(0);
            expect(wool.every(f => f.material === 'wool')).toBe(true);
        });

        it('should filter blend fabrics', () => {
            const blend = engine.filterFabricsByMaterial('blend');
            expect(blend.length).toBeGreaterThan(0);
            expect(blend.every(f => f.material === 'blend')).toBe(true);
        });

        it('should return empty for non-existent material', () => {
            expect(engine.filterFabricsByMaterial('nylon')).toHaveLength(0);
        });
    });

    describe('Technique category filter', () => {
        it('should return all when "all"', () => {
            expect(engine.filterTechniquesByCategory('all')).toHaveLength(TECHNIQUES.length);
        });

        it('should filter weaving techniques', () => {
            const weaving = engine.filterTechniquesByCategory('weaving');
            expect(weaving.length).toBeGreaterThan(0);
            expect(weaving.every(t => t.category === 'weaving')).toBe(true);
        });

        it('should filter dyeing techniques', () => {
            const dyeing = engine.filterTechniquesByCategory('dyeing');
            expect(dyeing.length).toBeGreaterThan(0);
            expect(dyeing.every(t => t.category === 'dyeing')).toBe(true);
        });

        it('should filter embroidery techniques', () => {
            const embroidery = engine.filterTechniquesByCategory('embroidery');
            expect(embroidery.length).toBeGreaterThan(0);
            expect(embroidery.every(t => t.category === 'embroidery')).toBe(true);
        });

        it('should filter printing techniques', () => {
            const printing = engine.filterTechniquesByCategory('printing');
            expect(printing.length).toBeGreaterThan(0);
            expect(printing.every(t => t.category === 'printing')).toBe(true);
        });
    });

    describe('Artisan specialty filter', () => {
        it('should return all when "all"', () => {
            expect(engine.filterArtisansBySpecialty('all')).toHaveLength(ARTISANS.length);
        });

        it('should filter weaving artisans', () => {
            const weaving = engine.filterArtisansBySpecialty('weaving');
            expect(weaving.length).toBeGreaterThan(0);
            expect(weaving.every(a => a.specialty === 'weaving')).toBe(true);
        });

        it('should filter dyeing artisans', () => {
            const dyeing = engine.filterArtisansBySpecialty('dyeing');
            expect(dyeing.length).toBeGreaterThan(0);
            expect(dyeing.every(a => a.specialty === 'dyeing')).toBe(true);
        });

        it('should filter embroidery artisans', () => {
            const embroidery = engine.filterArtisansBySpecialty('embroidery');
            expect(embroidery.length).toBeGreaterThan(0);
            expect(embroidery.every(a => a.specialty === 'embroidery')).toBe(true);
        });
    });
});

/* ======================================================================
   TEXTILE ENGINE — SORTING TESTS
   ====================================================================== */

describe('TextileEngine - Sorting', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    it('should sort by name ascending', () => {
        const sorted = engine.sortItems(engine.getFabrics(), 'name-asc');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].name.localeCompare(sorted[i - 1].name)).toBeGreaterThanOrEqual(0);
        }
    });

    it('should sort by name descending', () => {
        const sorted = engine.sortItems(engine.getFabrics(), 'name-desc');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].name.localeCompare(sorted[i - 1].name)).toBeLessThanOrEqual(0);
        }
    });

    it('should sort by origin', () => {
        const sorted = engine.sortItems(engine.getFabrics(), 'origin');
        expect(sorted).toHaveLength(FABRICS.length);
    });

    it('should sort by period (artisans)', () => {
        const sorted = engine.sortItems(engine.getArtisans(), 'period');
        expect(sorted).toHaveLength(ARTISANS.length);
    });

    it('should use default sort for unknown key', () => {
        const sorted = engine.sortItems(engine.getFabrics(), 'unknown');
        expect(sorted).toHaveLength(FABRICS.length);
    });
});

/* ======================================================================
   TEXTILE ENGINE — COMBINED FILTER PIPELINE TESTS
   ====================================================================== */

describe('TextileEngine - Combined Pipeline', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    it('should get filtered fabrics with default state', () => {
        expect(engine.getFilteredFabrics()).toHaveLength(FABRICS.length);
    });

    it('should get filtered techniques with default state', () => {
        expect(engine.getFilteredTechniques()).toHaveLength(TECHNIQUES.length);
    });

    it('should get filtered artisans with default state', () => {
        expect(engine.getFilteredArtisans()).toHaveLength(ARTISANS.length);
    });

    it('should narrow results when search is set', () => {
        engine.setSearchQuery('Banarasi');
        expect(engine.getFilteredFabrics().length).toBeGreaterThanOrEqual(1);
        expect(engine.getFilteredFabrics().length).toBeLessThan(FABRICS.length);
    });

    it('should narrow results when material filter is set', () => {
        engine.setFabricMaterialFilter('wool');
        const filtered = engine.getFilteredFabrics();
        expect(filtered.length).toBeLessThan(FABRICS.length);
        expect(filtered.every(f => f.material === 'wool')).toBe(true);
    });
});

/* ======================================================================
   TEXTILE ENGINE — ANALYTICS TESTS
   ====================================================================== */

describe('TextileEngine - Analytics', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    it('should compute state distribution', () => {
        const dist = engine.getStateDistribution();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist.length).toBeLessThanOrEqual(8);
        expect(dist[0].count).toBeGreaterThanOrEqual(dist[1]?.count || 0);
    });

    it('should compute material distribution', () => {
        const dist = engine.getMaterialDistribution();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist.every(d => d.count > 0)).toBe(true);
    });

    it('should compute category breakdown', () => {
        const dist = engine.getCategoryBreakdown();
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
   TEXTILE ENGINE — STATE MANAGEMENT TESTS
   ====================================================================== */

describe('TextileEngine - State Management', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    it('should update search query', () => {
        engine.setSearchQuery('test');
        expect(engine.state.searchQuery).toBe('test');
    });

    it('should update category filter', () => {
        engine.setCategoryFilter('fabric');
        expect(engine.state.categoryFilter).toBe('fabric');
    });

    it('should update fabric material filter', () => {
        engine.setFabricMaterialFilter('silk');
        expect(engine.state.fabricMaterialFilter).toBe('silk');
    });

    it('should update technique category filter', () => {
        engine.setTechniqueCategoryFilter('weaving');
        expect(engine.state.techniqueCategoryFilter).toBe('weaving');
    });

    it('should update artisan specialty filter', () => {
        engine.setArtisanSpecialtyFilter('dyeing');
        expect(engine.state.artisanSpecialtyFilter).toBe('dyeing');
    });

    it('should update sort by', () => {
        engine.setSortBy('name-desc');
        expect(engine.state.sortBy).toBe('name-desc');
    });

    it('should reset all filters', () => {
        engine.setSearchQuery('test');
        engine.setFabricMaterialFilter('silk');
        engine.setTechniqueCategoryFilter('weaving');
        engine.setArtisanSpecialtyFilter('dyeing');
        engine.resetFilters();
        expect(engine.state.searchQuery).toBe('');
        expect(engine.state.fabricMaterialFilter).toBe('all');
        expect(engine.state.techniqueCategoryFilter).toBe('all');
        expect(engine.state.artisanSpecialtyFilter).toBe('all');
        expect(engine.state.sortBy).toBe('name-asc');
    });
});

/* ======================================================================
   TEXTILE ENGINE — HELPER METHOD TESTS
   ====================================================================== */

describe('TextileEngine - Helper Methods', () => {
    let engine;

    beforeEach(() => {
        engine = new TextileEngine();
    });

    it('should return correct badge class for material', () => {
        expect(engine.getBadgeClass('silk')).toBe('badge-silk');
        expect(engine.getBadgeClass('cotton')).toBe('badge-cotton');
        expect(engine.getBadgeClass('wool')).toBe('badge-wool');
        expect(engine.getBadgeClass('blend')).toBe('badge-blend');
    });

    it('should return correct badge class for category', () => {
        expect(engine.getBadgeClass('weaving')).toBe('badge-weaving');
        expect(engine.getBadgeClass('dyeing')).toBe('badge-dyeing');
        expect(engine.getBadgeClass('embroidery')).toBe('badge-embroidery');
        expect(engine.getBadgeClass('printing')).toBe('badge-printing');
    });

    it('should return correct badge class for specialty', () => {
        expect(engine.getBadgeClass('design')).toBe('badge-design');
    });

    it('should return default badge class for unknown value', () => {
        expect(engine.getBadgeClass('unknown')).toBe('badge-weaving');
    });

    it('should return correct chart colors', () => {
        expect(engine.getChartColor(0)).toBe('saffron');
        expect(engine.getChartColor(1)).toBe('green');
        expect(engine.getChartColor(2)).toBe('gold');
        expect(engine.getChartColor(3)).toBe('blue');
        expect(engine.getChartColor(4)).toBe('saffron');
    });

    it('should return correct material dot colors', () => {
        expect(engine.getMaterialDotColor('silk')).toBe('#fb923c');
        expect(engine.getMaterialDotColor('cotton')).toBe('#fb7185');
        expect(engine.getMaterialDotColor('wool')).toBe('#38bdf8');
        expect(engine.getMaterialDotColor('blend')).toBe('#a855f7');
        expect(engine.getMaterialDotColor('unknown')).toBe('#94a3b8');
    });

    it('should return correct category dot colors', () => {
        expect(engine.getCategoryDotColor('weaving')).toBe('#FFB01F');
        expect(engine.getCategoryDotColor('dyeing')).toBe('#4ade80');
        expect(engine.getCategoryDotColor('embroidery')).toBe('#fb7185');
        expect(engine.getCategoryDotColor('printing')).toBe('#a78bfa');
        expect(engine.getCategoryDotColor('unknown')).toBe('#94a3b8');
    });
});

/* ======================================================================
   RENDER FUNCTION TESTS
   ====================================================================== */

describe('Render Functions', () => {
    const sampleFabric = new RegionalFabric('TestFabric', 'silk', 'TN', 'A test fabric.', ['feat1'], ['tag1']);
    const sampleTechnique = new WeavingTechnique('TestTechnique', 'weaving', 'UP', 'Advanced', 'A test technique.', ['tag1']);
    const sampleArtisan = new MasterArtisan('TestArtisan', 'weaving', 'Silk', 'TN', '1960–present', 'A test artisan.', '🧵', 'Padma Shri');

    it('renderFabricCard should return HTML with fabric name', () => {
        const html = renderFabricCard(sampleFabric);
        expect(html).toContain('TestFabric');
        expect(html).toContain('silk');
        expect(html).toContain('feat1');
    });

    it('renderTechniqueCard should return HTML with technique name', () => {
        const html = renderTechniqueCard(sampleTechnique);
        expect(html).toContain('TestTechnique');
        expect(html).toContain('weaving');
        expect(html).toContain('Advanced');
    });

    it('renderArtisanCard should return HTML with artisan name', () => {
        const html = renderArtisanCard(sampleArtisan);
        expect(html).toContain('TestArtisan');
        expect(html).toContain('weaving');
        expect(html).toContain('🧵');
        expect(html).toContain('Padma Shri');
    });

    it('renderStateChart should return bar chart HTML', () => {
        const data = [{ state: 'TN', count: 3 }, { state: 'UP', count: 2 }];
        const html = renderStateChart(data);
        expect(html).toContain('TN');
        expect(html).toContain('UP');
        expect(html).toContain('chart-bar-fill');
    });

    it('renderMaterialChart should return material rows HTML', () => {
        const data = [{ material: 'silk', count: 5 }, { material: 'cotton', count: 3 }];
        const html = renderMaterialChart(data);
        expect(html).toContain('Silk');
        expect(html).toContain('Cotton');
    });

    it('renderCategoryChart should return category rows HTML', () => {
        const data = [{ category: 'weaving', count: 5 }, { category: 'dyeing', count: 3 }];
        const html = renderCategoryChart(data);
        expect(html).toContain('Weaving');
        expect(html).toContain('Dyeing');
    });

    it('renderTimeline should return timeline entries HTML', () => {
        const data = [{ year: '1920s', text: 'Test event.' }];
        const html = renderTimeline(data);
        expect(html).toContain('1920s');
        expect(html).toContain('Test event.');
    });
});

/* ======================================================================
   CONFIG OVERRIDE TESTS
   ====================================================================== */

describe('TextileEngine - Config Overrides', () => {
    it('should accept custom datasets via config', () => {
        const customFabrics = [new RegionalFabric('Custom', 'silk', 'TN', 'D')];
        const customTechniques = [new WeavingTechnique('Custom', 'weaving', 'UP', 'Advanced', 'D')];
        const customArtisans = [new MasterArtisan('Custom', 'weaving', 'Silk', 'TN', '2000–present', 'D')];
        const eng = new TextileEngine({
            fabrics: customFabrics,
            techniques: customTechniques,
            artisans: customArtisans,
        });
        expect(eng.getFabrics()).toHaveLength(1);
        expect(eng.getTechniques()).toHaveLength(1);
        expect(eng.getArtisans()).toHaveLength(1);
        expect(eng.getStats().fabrics).toBe(1);
    });
});
