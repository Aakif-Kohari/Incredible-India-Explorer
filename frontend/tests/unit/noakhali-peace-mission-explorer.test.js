/**
 * noakhali-peace-mission-explorer.test.js
 * Unit tests for Gandhi's Noakhali Peace Mission Explorer page.
 * Validates required sections, historical content, sensitivity,
 * accessibility, interactive features, and landing page integration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../noakhali-peace-mission-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(resolve(__dirname, '../../search-index.js'), 'utf-8');
}

describe('Noakhali Peace Mission Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="np-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Noakhali Peace Mission');
        expect(html).toContain('Road to Partition');
        expect(html).toContain('Gandhi');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'overview',
            'violence',
            'arrival',
            'villages',
            'meetings',
            'outreach',
            'reactions',
            'route',
            'tensions',
            'efforts',
            'significance',
            'timeline',
            'references'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required historical topics', () => {
        [
            'Bengal Political Context',
            'Noakhali Violence',
            "Gandhi's Arrival",
            'Villages Visited',
            'Peace Meetings',
            'Community Outreach',
            'Local Reactions',
            'Partition Tensions',
            'Continued Peace Efforts',
            'Historical Significance',
            'Timeline',
            'References'
        ].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains key historical details and figures', () => {
        expect(html).toContain('6 Nov 1946');
        expect(html).toContain('Chandpur');
        expect(html).toContain('Ramganj');
        expect(html).toContain('Dattapara');
        expect(html).toContain('Do or Die');
        expect(html).toContain('Noakhali');
        expect(html).toContain('Bihar');
        expect(html).toContain('October 1946');
        expect(html).toContain('Suhrawardy');
        expect(html).toContain('Calcutta');
    });

    it('presents sensitive material respectfully', () => {
        expect(html).toContain('A note on sensitivity');
        expect(html).toContain('respect');
        expect(html).toContain('care');
        expect(html).toContain('never on graphic detail');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(10);
    });

    it('includes interactive features: route map, village markers, timeline, and peace milestones', () => {
        expect(html).toContain('id="np-route-map"');
        expect(html).toContain('id="np-interactive-timeline"');
        expect(html).toContain('np-map-detail');
        expect(html).toContain('Peace Meetings');
        expect(html).toContain('milestones');
    });

    it('links the shared stylesheet, page stylesheet, Leaflet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
        expect(html).toContain('leaflet');
    });

    it('references reliable historical sources', () => {
        expect(html).toContain('britannica.com');
        expect(html).toContain('wikipedia.org');
        expect(html).toContain('Pyarelal');
        expect(html).toContain('Guha');
        expect(html).toContain('Yasmin Khan');
        expect(html).toContain('Chatterji');
    });
});

describe('Noakhali Peace Mission Explorer — Assets', () => {
    it('includes a non-empty stylesheet themed for the subject', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.np-hero');
        expect(css).toContain('.np-map');
        expect(css).toContain('.np-timeline');
        expect(css).toContain('.np-route-line');
    });

    it('includes a valid interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('activateTab');
        expect(js).toContain('initRouteMap');
        expect(js).toContain('NP_ROUTE_POINTS');
        expect(js).toContain('initTimeline');
        expect(js).toContain('initThemeToggle');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('L.polyline');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Noakhali Peace Mission — Integration', () => {
    it('is grouped under "Road to Partition" in the explorer page navigation', () => {
        const html = readExplorerFile('index.html');
        const dropdownStart = html.indexOf('Road to Partition ▾');
        expect(dropdownStart).toBeGreaterThan(-1);
        const dropdown = html.slice(dropdownStart, dropdownStart + 900);
        expect(dropdown).toContain("Gandhi's Noakhali Peace Mission");
        expect(dropdown).toContain('calcutta-1946-crisis-explorer/index.html');
    });

    it('is added to the global search index under Road to Partition', () => {
        const search = readSearchIndex();
        expect(search).toContain('Noakhali Peace Mission Explorer');
        expect(search).toContain('Road to Partition');
        expect(search).toContain('frontend/noakhali-peace-mission-explorer/index.html');
    });

    it('is pre-cached for offline support', () => {
        const sw = readFileSync(resolve(__dirname, '../../sw.js'), 'utf-8');
        const offline = readFileSync(resolve(__dirname, '../../offline.html'), 'utf-8');
        expect(sw).toContain('./noakhali-peace-mission-explorer/index.html');
        expect(sw).toContain('./noakhali-peace-mission-explorer/style.css');
        expect(sw).toContain('./noakhali-peace-mission-explorer/script.js');
        expect(offline).toContain('/frontend/noakhali-peace-mission-explorer/');
    });
});
