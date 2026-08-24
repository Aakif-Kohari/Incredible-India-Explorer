/* ==========================================================================
   SPICE ENGINE — Unit Tests (Vitest)
   ========================================================================== */
import { describe, it, expect, beforeEach } from 'vitest';
import { Spice, Cuisine, CulinaryTechnique, SpiceEngine, SPICES, CUISINES, TECHNIQUES, TIMELINE,
    renderSpiceCard, renderCuisineCard, renderTechniqueCard, renderFlavorChart, renderRegionChart,
    renderMethodChart, renderTimeline } from '../../frontend/indian-spices-culinary-heritage/spice-engine.js';

describe('Spice', () => {
    it('should create with all properties', () => {
        const s = new Spice('Turmeric', 'earthy', 'TN', 'Desc', ['Curry'], ['tag1']);
        expect(s.name).toBe('Turmeric'); expect(s.flavor).toBe('earthy'); expect(s.type).toBe('spice');
    });
    it('should default uses and tags', () => {
        const s = new Spice('X', 'warm', 'UP', 'D');
        expect(s.uses).toEqual([]); expect(s.tags).toEqual([]);
    });
});

describe('Cuisine', () => {
    it('should create with all properties', () => {
        const c = new Cuisine('Punjabi', 'mixed', 'Punjab', 'Desc', ['Butter Chicken'], ['tag1']);
        expect(c.name).toBe('Punjabi'); expect(c.vegType).toBe('mixed'); expect(c.type).toBe('cuisine');
    });
    it('should default signature and tags', () => {
        const c = new Cuisine('X', 'veg', 'GJ', 'D');
        expect(c.signature).toEqual([]); expect(c.tags).toEqual([]);
    });
});

describe('CulinaryTechnique', () => {
    it('should create with all properties', () => {
        const t = new CulinaryTechnique('Tadka', 'cooking', 'Pan India', 'Desc', ['Step 1'], ['tag1']);
        expect(t.name).toBe('Tadka'); expect(t.method).toBe('cooking'); expect(t.type).toBe('technique');
    });
    it('should default steps and tags', () => {
        const t = new CulinaryTechnique('X', 'preservation', 'RJ', 'D');
        expect(t.steps).toEqual([]); expect(t.tags).toEqual([]);
    });
});

describe('SpiceEngine - Accessors', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('should return all data', () => {
        expect(engine.getSpices()).toHaveLength(SPICES.length);
        expect(engine.getCuisines()).toHaveLength(CUISINES.length);
        expect(engine.getTechniques()).toHaveLength(TECHNIQUES.length);
    });
    it('should return combined items', () => {
        expect(engine.getAllItems()).toHaveLength(SPICES.length + CUISINES.length + TECHNIQUES.length);
    });
    it('should return correct stats', () => {
        const s = engine.getStats();
        expect(s.spices).toBe(SPICES.length); expect(s.cuisines).toBe(CUISINES.length);
        expect(s.techniques).toBe(TECHNIQUES.length); expect(s.regions).toBeGreaterThan(0);
    });
    it('should return copies', () => {
        expect(engine.getSpices()).not.toBe(engine.getSpices());
    });
});

describe('SpiceEngine - Search', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('should match empty query', () => expect(engine.matchesSearch(engine.getSpices()[0], '')).toBe(true));
    it('should match by name', () => { const s = engine.getSpices()[0]; expect(engine.matchesSearch(s, s.name.toLowerCase())).toBe(true); });
    it('should match by flavor', () => { const s = engine.getSpices()[0]; expect(engine.matchesSearch(s, s.flavor)).toBe(true); });
    it('should match by origin', () => { const s = engine.getSpices()[0]; expect(engine.matchesSearch(s, s.origin.toLowerCase())).toBe(true); });
    it('should match multi-term', () => { const s = engine.getSpices().find(x => x.name === 'Turmeric'); expect(engine.matchesSearch(s, 'turmeric earthy')).toBe(true); });
    it('should not match absent', () => expect(engine.matchesSearch(engine.getSpices()[0], 'zzznope')).toBe(false));
    it('should searchItems', () => { expect(engine.searchItems(engine.getSpices(), 'turmeric').length).toBeGreaterThan(0); });
});

describe('SpiceEngine - Filtering', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('should filter spices by flavor', () => {
        expect(engine.filterSpicesByFlavor('all')).toHaveLength(SPICES.length);
        const w = engine.filterSpicesByFlavor('warm');
        expect(w.length).toBeGreaterThan(0); expect(w.every(s => s.flavor === 'warm')).toBe(true);
    });
    it('should filter cuisines by vegType', () => {
        expect(engine.filterCuisinesByVegType('all')).toHaveLength(CUISINES.length);
        const v = engine.filterCuisinesByVegType('veg');
        expect(v.length).toBeGreaterThan(0); expect(v.every(c => c.vegType === 'veg')).toBe(true);
    });
    it('should filter techniques by method', () => {
        expect(engine.filterTechniquesByMethod('all')).toHaveLength(TECHNIQUES.length);
        const m = engine.filterTechniquesByMethod('cooking');
        expect(m.length).toBeGreaterThan(0); expect(m.every(t => t.method === 'cooking')).toBe(true);
    });
});

describe('SpiceEngine - Sorting', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('should sort asc', () => { const s = engine.sortItems(engine.getSpices(), 'name-asc'); expect(s).toHaveLength(SPICES.length); });
    it('should sort desc', () => { const s = engine.sortItems(engine.getSpices(), 'name-desc'); expect(s).toHaveLength(SPICES.length); });
    it('should sort by origin', () => { const s = engine.sortItems(engine.getSpices(), 'origin'); expect(s).toHaveLength(SPICES.length); });
    it('should use default', () => { const s = engine.sortItems(engine.getSpices(), 'x'); expect(s).toHaveLength(SPICES.length); });
});

describe('SpiceEngine - Pipelines', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('should return all with defaults', () => {
        expect(engine.getFilteredSpices()).toHaveLength(SPICES.length);
        expect(engine.getFilteredCuisines()).toHaveLength(CUISINES.length);
        expect(engine.getFilteredTechniques()).toHaveLength(TECHNIQUES.length);
    });
    it('should narrow with search', () => { engine.setSearchQuery('turmeric'); expect(engine.getFilteredSpices().length).toBeLessThan(SPICES.length); });
    it('should narrow with filter', () => { engine.setSpiceFlavorFilter('warm'); expect(engine.getFilteredSpices().length).toBeLessThan(SPICES.length); });
});

describe('SpiceEngine - Analytics', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('should compute flavor dist', () => { const d = engine.getFlavorDistribution(); expect(d.length).toBeGreaterThan(0); });
    it('should compute region spread', () => { const d = engine.getRegionSpread(); expect(d.length).toBeGreaterThan(0); expect(d.length).toBeLessThanOrEqual(8); });
    it('should compute method breakdown', () => { const d = engine.getMethodBreakdown(); expect(d.length).toBeGreaterThan(0); });
    it('should return timeline', () => { const t = engine.getTimeline(); expect(t.length).toBeGreaterThan(0); });
});

describe('SpiceEngine - State', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('should set and reset', () => {
        engine.setSearchQuery('test'); engine.setSpiceFlavorFilter('warm'); engine.setCuisineVegFilter('veg');
        engine.setTechniqueMethodFilter('cooking'); engine.setSortBy('name-desc'); engine.setCategoryFilter('spice');
        engine.resetFilters();
        expect(engine.state.searchQuery).toBe(''); expect(engine.state.spiceFlavorFilter).toBe('all');
        expect(engine.state.cuisineVegFilter).toBe('all'); expect(engine.state.sortBy).toBe('name-asc');
    });
});

describe('SpiceEngine - Helpers', () => {
    let engine;
    beforeEach(() => { engine = new SpiceEngine(); });
    it('badge class', () => { expect(engine.getBadgeClass('warm')).toBe('badge-warm'); expect(engine.getBadgeClass('x')).toBe('badge-warm'); });
    it('chart color', () => { expect(engine.getChartColor(0)).toBe('saffron'); expect(engine.getChartColor(4)).toBe('saffron'); });
    it('flavor dot', () => { expect(engine.getFlavorDotColor('warm')).toBe('#fb923c'); expect(engine.getFlavorDotColor('x')).toBe('#94a3b8'); });
    it('method dot', () => { expect(engine.getMethodDotColor('cooking')).toBe('#ff9933'); expect(engine.getMethodDotColor('x')).toBe('#94a3b8'); });
});

describe('Render Functions', () => {
    const s = new Spice('Test', 'warm', 'TN', 'D', ['U'], ['tag1']);
    const c = new Cuisine('Test', 'veg', 'GJ', 'D', ['Dish'], ['tag1']);
    const t = new CulinaryTechnique('Test', 'cooking', 'UP', 'D', ['Step'], ['tag1']);
    it('renderSpiceCard', () => { const h = renderSpiceCard(s); expect(h).toContain('Test'); expect(h).toContain('warm'); });
    it('renderCuisineCard', () => { const h = renderCuisineCard(c); expect(h).toContain('Test'); expect(h).toContain('veg'); });
    it('renderTechniqueCard', () => { const h = renderTechniqueCard(t); expect(h).toContain('Test'); expect(h).toContain('cooking'); });
    it('renderFlavorChart', () => { expect(renderFlavorChart([{flavor:'warm',count:3}])).toContain('Warm'); });
    it('renderRegionChart', () => { expect(renderRegionChart([{region:'TN',count:3},{region:'UP',count:2}])).toContain('TN'); });
    it('renderMethodChart', () => { expect(renderMethodChart([{method:'cooking',count:5}])).toContain('Cooking'); });
    it('renderTimeline', () => { expect(renderTimeline([{year:'1920',text:'T'}])).toContain('1920'); });
});

describe('Config Overrides', () => {
    it('should accept custom data', () => {
        const e = new SpiceEngine({ spices: [new Spice('X','warm','TN','D')], cuisines: [new Cuisine('X','veg','GJ','D')], techniques: [new CulinaryTechnique('X','cooking','UP','D')] });
        expect(e.getSpices()).toHaveLength(1); expect(e.getCuisines()).toHaveLength(1); expect(e.getTechniques()).toHaveLength(1);
    });
});
