import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost/' });
global.document = dom.window.document;
global.window = dom.window;

const {
    SINGALILA_TREK_DATA,
    renderTrekFacts,
    renderEcosystemFeatures,
    renderViewpoints,
    renderRouteStages,
    renderNearbyDestinations,
    renderGallery,
    renderImageCredits
} = await import('../../singalila-ridge-trek/script.js');

describe('SINGALILA_TREK_DATA', () => {
    it('has core trek identity fields', () => {
        expect(SINGALILA_TREK_DATA.name).toBe('Singalila Ridge Trek');
        expect(SINGALILA_TREK_DATA.state).toBe('West Bengal');
        expect(SINGALILA_TREK_DATA.maxAltitude).toContain('3,636 m');
        expect(SINGALILA_TREK_DATA.startingPoint).toContain('Manebhanjan');
        expect(SINGALILA_TREK_DATA.difficulty).toMatch(/Easy/i);
    });

    it('includes eight trek facts', () => {
        expect(SINGALILA_TREK_DATA.facts).toHaveLength(8);
        const titles = SINGALILA_TREK_DATA.facts.map(f => f.title);
        expect(titles).toContain('Maximum Altitude');
        expect(titles).toContain('Best Season');
        expect(titles).toContain('Permits');
    });

    it('describes six forest ecosystem and biodiversity features', () => {
        expect(SINGALILA_TREK_DATA.ecosystemFeatures).toHaveLength(6);
        const titles = SINGALILA_TREK_DATA.ecosystemFeatures.map(f => f.title);
        expect(titles).toContain('Forest Ecosystem');
        expect(titles).toContain('Flora — Rhododendron Country');
        expect(titles).toContain('Fauna — Realm of the Red Panda');
    });

    it('lists major viewpoints including Sandakphu and Phalut', () => {
        expect(SINGALILA_TREK_DATA.viewpoints).toHaveLength(6);
        const names = SINGALILA_TREK_DATA.viewpoints.map(v => v.name);
        expect(names.some(n => n.includes('Sandakphu'))).toBe(true);
        expect(names.some(n => n.includes('Phalut'))).toBe(true);
    });

    it('defines six route stages in ascending order', () => {
        const steps = SINGALILA_TREK_DATA.routeStages.map(s => s.step);
        expect(steps).toEqual([1, 2, 3, 4, 5, 6]);
        expect(SINGALILA_TREK_DATA.routeStages[0].stage).toContain('Manebhanjan');
        expect(SINGALILA_TREK_DATA.routeStages.at(-1).stage).toContain('Rimbik');
    });

    it('suggests nearby destinations', () => {
        expect(SINGALILA_TREK_DATA.nearbyDestinations.length).toBeGreaterThanOrEqual(4);
        const titles = SINGALILA_TREK_DATA.nearbyDestinations.map(d => d.title);
        expect(titles).toContain('Darjeeling');
    });

    it('provides eight credited gallery images over HTTPS', () => {
        expect(SINGALILA_TREK_DATA.gallery).toHaveLength(8);
        for (const item of SINGALILA_TREK_DATA.gallery) {
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
        renderTrekFacts(SINGALILA_TREK_DATA.facts, container);
        expect(container.querySelectorAll('.fact-card')).toHaveLength(8);
        expect(container.textContent).toContain('West Bengal');
    });

    it('renders ecosystem feature cards with title and text', () => {
        renderEcosystemFeatures(SINGALILA_TREK_DATA.ecosystemFeatures, container);
        expect(container.querySelectorAll('.feature-card')).toHaveLength(6);
        expect(container.textContent).toContain('red panda');
    });

    it('renders viewpoint cards with names and details', () => {
        renderViewpoints(SINGALILA_TREK_DATA.viewpoints, container);
        expect(container.querySelectorAll('.viewpoint-card')).toHaveLength(6);
        expect(container.textContent).toContain('Sandakphu (3,636 m)');
    });

    it('renders route stage cards with badges and highlights', () => {
        renderRouteStages(SINGALILA_TREK_DATA.routeStages, container);
        expect(container.querySelectorAll('.route-step-card')).toHaveLength(6);
        expect(container.querySelector('[data-step="3"] .step-stage').textContent).toContain('Sandakphu');
    });

    it('renders nearby destination cards', () => {
        renderNearbyDestinations(SINGALILA_TREK_DATA.nearbyDestinations, container);
        const expected = SINGALILA_TREK_DATA.nearbyDestinations.length;
        expect(container.querySelectorAll('.nearby-card')).toHaveLength(expected);
        expect(container.textContent).toContain('Darjeeling');
    });

    it('renders gallery figures with images, captions, and credits', () => {
        renderGallery(SINGALILA_TREK_DATA.gallery, container);
        expect(container.querySelectorAll('.gallery-card')).toHaveLength(8);
        expect(container.querySelectorAll('img.gallery-img')).toHaveLength(8);
        expect(container.querySelectorAll('.gallery-credit')).toHaveLength(8);
    });

    it('renders image credit list items with source links', () => {
        renderImageCredits(SINGALILA_TREK_DATA.gallery, container);
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
