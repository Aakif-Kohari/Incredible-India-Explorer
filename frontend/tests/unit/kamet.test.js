import { describe, it, expect, beforeEach } from 'vitest';
import { 
    KAMET_DATA, 
    renderKametFacts, 
    renderKametRoutes, 
    renderKametGallery, 
    renderKametAttractions 
} from '../../frontend/kamet/script.js';

describe('Mount Kamet Explorer Page', () => {
    it('contains accurate mountain metadata for Mount Kamet', () => {
        expect(KAMET_DATA.name).toBe('Kamet');
        expect(KAMET_DATA.title).toBe('Mount Kamet');
        expect(KAMET_DATA.elevation).toBe('7,756 m');
        expect(KAMET_DATA.elevationFt).toBe('25,446 ft');
        expect(KAMET_DATA.state).toBe('Uttarakhand');
        expect(KAMET_DATA.district).toBe('Chamoli');
        expect(KAMET_DATA.range).toContain('Garhwal');
        expect(KAMET_DATA.firstAscent).toBe('June 21, 1931');
    });

    it('defines subsidiary peaks and glacier systems', () => {
        expect(Array.isArray(KAMET_DATA.subsidiaryPeaks)).toBe(true);
        expect(KAMET_DATA.subsidiaryPeaks.length).toBeGreaterThanOrEqual(3);
        const peakNames = KAMET_DATA.subsidiaryPeaks.map(p => p.name);
        expect(peakNames).toContain('Abi Gamin');
        expect(peakNames).toContain('Mukut Parbat');
        expect(peakNames).toContain('Mana Peak');

        expect(Array.isArray(KAMET_DATA.glaciers)).toBe(true);
        expect(KAMET_DATA.glaciers.length).toBeGreaterThanOrEqual(2);
        expect(KAMET_DATA.glaciers).toContain('East Kamet Glacier');
    });

    it('contains fast facts grid data', () => {
        expect(Array.isArray(KAMET_DATA.facts)).toBe(true);
        expect(KAMET_DATA.facts.length).toBeGreaterThanOrEqual(6);

        KAMET_DATA.facts.forEach(fact => {
            expect(fact).toHaveProperty('title');
            expect(fact).toHaveProperty('value');
            expect(fact).toHaveProperty('description');
            expect(fact).toHaveProperty('icon');
        });
    });

    it('contains step-by-step route breakdown including Meade\'s Col', () => {
        expect(Array.isArray(KAMET_DATA.routes)).toBe(true);
        expect(KAMET_DATA.routes.length).toBe(4);

        const meadesColStep = KAMET_DATA.routes.find(r => r.stage.includes("Meade's Col"));
        expect(meadesColStep).toBeDefined();
        expect(meadesColStep.altitude).toContain('7,130 m');
    });

    it('contains gallery items and nearby attractions', () => {
        expect(Array.isArray(KAMET_DATA.gallery)).toBe(true);
        expect(KAMET_DATA.gallery.length).toBeGreaterThanOrEqual(3);

        expect(Array.isArray(KAMET_DATA.nearbyAttractions)).toBe(true);
        expect(KAMET_DATA.nearbyAttractions.length).toBeGreaterThanOrEqual(5);

        const attrNames = KAMET_DATA.nearbyAttractions.map(a => a.name);
        expect(attrNames).toContain('Niti Valley');
        expect(attrNames).toContain('Mana Village');
        expect(attrNames).toContain('Badrinath Temple');
    });

    describe('DOM Rendering Helpers', () => {
        let container;

        beforeEach(() => {
            container = document.createElement('div');
        });

        it('renders facts cards into HTML container', () => {
            renderKametFacts(KAMET_DATA.facts, container);
            expect(container.children.length).toBe(KAMET_DATA.facts.length);
            expect(container.innerHTML).toContain('7,756 m');
        });

        it('renders route step cards into HTML container', () => {
            renderKametRoutes(KAMET_DATA.routes, container);
            expect(container.children.length).toBe(KAMET_DATA.routes.length);
            expect(container.innerHTML).toContain("Meade's Col");
        });

        it('renders gallery cards into HTML container', () => {
            renderKametGallery(KAMET_DATA.gallery, container);
            expect(container.children.length).toBe(KAMET_DATA.gallery.length);
        });

        it('renders attractions cards into HTML container', () => {
            renderKametAttractions(KAMET_DATA.nearbyAttractions, container);
            expect(container.children.length).toBe(KAMET_DATA.nearbyAttractions.length);
            expect(container.innerHTML).toContain('Niti Valley');
        });
    });
});
