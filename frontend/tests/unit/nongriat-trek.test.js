import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost/' });
global.document = dom.window.document;
global.window = dom.window;

const {
    NGRIAT_TREK_DATA,
    renderTrekFacts,
    renderRootBridges,
    renderWaterfalls,
    renderRouteStages,
    renderNearbyDestinations,
    renderGallery,
    renderImageCredits
} = await import('../../nongriat-trek/script.js');

describe('NGRIAT_TREK_DATA', () => {
    it('has core trek identity fields', () => {
        expect(NGRIAT_TREK_DATA.name).toBe('Nongriat Trek');
        expect(NGRIAT_TREK_DATA.state).toBe('Meghalaya');
        expect(NGRIAT_TREK_DATA.startingPoint).toContain('Tyrna');
        expect(NGRIAT_TREK_DATA.difficulty).toMatch(/Moderate/i);
        expect(NGRIAT_TREK_DATA.bestSeason).toContain('October');
    });

    it('includes eight trek facts covering issue requirements', () => {
        expect(NGRIAT_TREK_DATA.facts).toHaveLength(8);
        const titles = NGRIAT_TREK_DATA.facts.map(f => f.title);
        expect(titles).toContain('Trek Location');
        expect(titles).toContain('Difficulty');
        expect(titles).toContain('Distance');
        expect(titles).toContain('Duration');
        expect(titles).toContain('Best Season');
        expect(titles).toContain('Starting Point');
    });

    it('describes six living root bridge features including the Double-Decker', () => {
        expect(NGRIAT_TREK_DATA.rootBridges).toHaveLength(6);
        const titles = NGRIAT_TREK_DATA.rootBridges.map(b => b.title);
        expect(titles.some(t => t.includes('Double-Decker'))).toBe(true);
        expect(titles).toContain('Jingkieng Jri Heritage');
    });

    it('lists waterfalls and natural pools including Rainbow Falls', () => {
        expect(NGRIAT_TREK_DATA.waterfalls.length).toBeGreaterThanOrEqual(4);
        const names = NGRIAT_TREK_DATA.waterfalls.map(w => w.name);
        expect(names.some(n => n.includes('Rainbow Falls'))).toBe(true);
    });

    it('defines five route stages in ascending order starting at Tyrna', () => {
        const steps = NGRIAT_TREK_DATA.routeStages.map(s => s.step);
        expect(steps).toEqual([1, 2, 3, 4, 5]);
        expect(NGRIAT_TREK_DATA.routeStages[0].stage).toContain('Tyrna');
        expect(NGRIAT_TREK_DATA.routeStages.at(-1).stage).toContain('Return');
    });

    it('suggests nearby attractions', () => {
        expect(NGRIAT_TREK_DATA.nearbyDestinations.length).toBeGreaterThanOrEqual(4);
        const titles = NGRIAT_TREK_DATA.nearbyDestinations.map(d => d.title);
        expect(titles).toContain('Cherrapunji (Sohra)');
        expect(titles).toContain('Nohkalikai Falls');
    });

    it('provides eight credited gallery images over HTTPS', () => {
        expect(NGRIAT_TREK_DATA.gallery).toHaveLength(8);
        for (const item of NGRIAT_TREK_DATA.gallery) {
            expect(item.image.startsWith('https://')).toBe(true);
            expect(item.credit).toContain('Wikimedia Commons');
            expect(item.sourceUrl.startsWith('https://commons.wikimedia.org/')).toBe(true);
        }
    });
});

function createContainer() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
}

describe('render functions', () => {
    let container;

    beforeEach(() => {
        container?.remove();
        container = createContainer();
    });

    it('renders one fact card per fact', () => {
        renderTrekFacts(NGRIAT_TREK_DATA.facts, container);
        expect(container.querySelectorAll('.fact-card')).toHaveLength(8);
        expect(container.textContent).toContain('East Khasi Hills');
    });

    it('renders root bridge cards with title and text', () => {
        renderRootBridges(NGRIAT_TREK_DATA.rootBridges, container);
        expect(container.querySelectorAll('.feature-card')).toHaveLength(6);
        expect(container.textContent).toContain('Double-Decker');
    });

    it('renders waterfall cards with names and details', () => {
        renderWaterfalls(NGRIAT_TREK_DATA.waterfalls, container);
        expect(container.querySelectorAll('.viewpoint-card')).toHaveLength(NGRIAT_TREK_DATA.waterfalls.length);
        expect(container.textContent).toContain('Rainbow Falls');
    });

    it('renders route stage cards with badges and highlights', () => {
        renderRouteStages(NGRIAT_TREK_DATA.routeStages, container);
        expect(container.querySelectorAll('.route-step-card')).toHaveLength(5);
        expect(container.querySelector('[data-step="3"] .step-stage').textContent).toContain('Double-Decker');
    });

    it('renders nearby destination cards', () => {
        renderNearbyDestinations(NGRIAT_TREK_DATA.nearbyDestinations, container);
        const expected = NGRIAT_TREK_DATA.nearbyDestinations.length;
        expect(container.querySelectorAll('.nearby-card')).toHaveLength(expected);
        expect(container.textContent).toContain('Cherrapunji');
    });

    it('renders gallery figures with images, captions, and credits', () => {
        renderGallery(NGRIAT_TREK_DATA.gallery, container);
        expect(container.querySelectorAll('.gallery-card')).toHaveLength(8);
        expect(container.querySelectorAll('img.gallery-img')).toHaveLength(8);
        expect(container.querySelectorAll('.gallery-credit')).toHaveLength(8);
    });

    it('renders image credit list items with source links', () => {
        renderImageCredits(NGRIAT_TREK_DATA.gallery, container);
        expect(container.querySelectorAll('li')).toHaveLength(8);
        expect(container.querySelectorAll('a[target="_blank"]')).toHaveLength(8);
    });

    it('escapes HTML in rendered content', () => {
        renderTrekFacts([{ title: '<script>alert(1)</script>', value: 'x & y', description: '"quoted"', icon: '📍' }], container);
        expect(container.innerHTML).not.toContain('<script>');
        expect(container.innerHTML).toContain('&lt;script&gt;');
        expect(container.innerHTML).toContain('&amp;');
    });
});
