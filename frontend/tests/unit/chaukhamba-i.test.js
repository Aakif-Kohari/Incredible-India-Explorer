import { describe, it, expect, beforeEach } from 'vitest';
import { 
    CHAUKHAMBA_DATA, 
    renderChaukhambaFacts, 
    renderChaukhambaTrek, 
    renderChaukhambaGallery, 
    renderChaukhambaAttractions 
} from '../../frontend/chaukhamba-i/script.js';

describe('Chaukhamba I Mountain Explorer Page', () => {
    it('contains accurate mountain metadata for Chaukhamba I', () => {
        expect(CHAUKHAMBA_DATA.name).toBe('Chaukhamba I');
        expect(CHAUKHAMBA_DATA.title).toBe('Mount Chaukhamba I');
        expect(CHAUKHAMBA_DATA.elevation).toBe('7,138 m');
        expect(CHAUKHAMBA_DATA.elevationFt).toBe('23,419 ft');
        expect(CHAUKHAMBA_DATA.state).toBe('Uttarakhand');
        expect(CHAUKHAMBA_DATA.range).toContain('Garhwal');
        expect(CHAUKHAMBA_DATA.firstAscent).toBe('June 13, 1952');
    });

    it('defines four summits of the massif and glacier systems', () => {
        expect(Array.isArray(CHAUKHAMBA_DATA.massifPeaks)).toBe(true);
        expect(CHAUKHAMBA_DATA.massifPeaks.length).toBe(4);
        
        const peakNames = CHAUKHAMBA_DATA.massifPeaks.map(p => p.name);
        expect(peakNames).toContain('Chaukhamba I');
        expect(peakNames).toContain('Chaukhamba II');
        expect(peakNames).toContain('Chaukhamba III');
        expect(peakNames).toContain('Chaukhamba IV');

        expect(Array.isArray(CHAUKHAMBA_DATA.glaciers)).toBe(true);
        expect(CHAUKHAMBA_DATA.glaciers).toContain('Gangotri Glacier');
        expect(CHAUKHAMBA_DATA.glaciers).toContain('Satopanth Glacier');
    });

    it('contains fast facts grid data', () => {
        expect(Array.isArray(CHAUKHAMBA_DATA.facts)).toBe(true);
        expect(CHAUKHAMBA_DATA.facts.length).toBeGreaterThanOrEqual(6);

        CHAUKHAMBA_DATA.facts.forEach(fact => {
            expect(fact).toHaveProperty('title');
            expect(fact).toHaveProperty('value');
            expect(fact).toHaveProperty('description');
            expect(fact).toHaveProperty('icon');
        });
    });

    it('contains Satopanth Tal & Base Camp trekking guide steps', () => {
        expect(Array.isArray(CHAUKHAMBA_DATA.trekkingInfo)).toBe(true);
        expect(CHAUKHAMBA_DATA.trekkingInfo.length).toBe(4);

        const satopanthStep = CHAUKHAMBA_DATA.trekkingInfo.find(t => t.stage.includes("Satopanth Tal"));
        expect(satopanthStep).toBeDefined();
        expect(satopanthStep.altitude).toBe('4,600 m');
    });

    it('contains gallery items and nearby attractions', () => {
        expect(Array.isArray(CHAUKHAMBA_DATA.gallery)).toBe(true);
        expect(CHAUKHAMBA_DATA.gallery.length).toBeGreaterThanOrEqual(3);

        expect(Array.isArray(CHAUKHAMBA_DATA.nearbyAttractions)).toBe(true);
        expect(CHAUKHAMBA_DATA.nearbyAttractions.length).toBeGreaterThanOrEqual(5);

        const attrNames = CHAUKHAMBA_DATA.nearbyAttractions.map(a => a.name);
        expect(attrNames).toContain('Satopanth Tal');
        expect(attrNames).toContain('Mana Village');
        expect(attrNames).toContain('Badrinath Temple');
        expect(attrNames).toContain('Gaumukh & Gangotri Glacier');
    });

    describe('DOM Rendering Helpers', () => {
        let container;

        beforeEach(() => {
            container = document.createElement('div');
        });

        it('renders facts cards into HTML container', () => {
            renderChaukhambaFacts(CHAUKHAMBA_DATA.facts, container);
            expect(container.children.length).toBe(CHAUKHAMBA_DATA.facts.length);
            expect(container.innerHTML).toContain('7,138 m');
        });

        it('renders trekking step cards into HTML container', () => {
            renderChaukhambaTrek(CHAUKHAMBA_DATA.trekkingInfo, container);
            expect(container.children.length).toBe(CHAUKHAMBA_DATA.trekkingInfo.length);
            expect(container.innerHTML).toContain('Satopanth Tal');
        });

        it('renders gallery cards into HTML container', () => {
            renderChaukhambaGallery(CHAUKHAMBA_DATA.gallery, container);
            expect(container.children.length).toBe(CHAUKHAMBA_DATA.gallery.length);
        });

        it('renders attractions cards into HTML container', () => {
            renderChaukhambaAttractions(CHAUKHAMBA_DATA.nearbyAttractions, container);
            expect(container.children.length).toBe(CHAUKHAMBA_DATA.nearbyAttractions.length);
            expect(container.innerHTML).toContain('Satopanth Tal');
        });
    });
});
