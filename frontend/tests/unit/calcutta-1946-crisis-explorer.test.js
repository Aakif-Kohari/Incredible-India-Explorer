/**
 * calcutta-1946-crisis-explorer.test.js
 * Unit tests for the 1946 Calcutta Crisis Explorer page.
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
        resolve(__dirname, '../../calcutta-1946-crisis-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(resolve(__dirname, '../../../index.html'), 'utf-8');
}

function readSearchIndex() {
    return readFileSync(resolve(__dirname, '../../search-index.js'), 'utf-8');
}

describe('1946 Calcutta Crisis Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="cc-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('1946 Calcutta Crisis');
        expect(html).toContain('Great Calcutta Killings');
        expect(html).toContain('Road to Partition');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'overview',
            'calcutta',
            'direct-action',
            'events',
            'map',
            'spread',
            'impact',
            'response',
            'reactions',
            'bengal',
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
            'Political Background',
            'Direct Action Day',
            'Calcutta Context',
            'Events of August 1946',
            'Spread of Violence',
            'Human Impact',
            'Administrative Response',
            'Political Reactions',
            'Wider Bengal',
            'Historical',
            'Timeline',
            'References'
        ].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains key historical details and figures', () => {
        expect(html).toContain('16 Aug 1946');
        expect(html).toContain('Muhammad Ali Jinnah');
        expect(html).toContain('Cabinet Mission');
        expect(html).toContain('Suhrawardy');
        expect(html).toContain('Lahore Resolution');
        expect(html).toContain('Noakhali');
        expect(html).toContain('Bihar');
        expect(html).toContain('Gandhi');
    });

    it('presents sensitive material respectfully', () => {
        expect(html).toContain('A note on sensitivity');
        expect(html).toContain('solemn');
        expect(html).toContain('respectfully');
        expect(html).toContain('honouring the human cost');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(10);
    });

    it('includes interactive features: map, timeline, spread visualization, and political context', () => {
        expect(html).toContain('id="cc-calcutta-map"');
        expect(html).toContain('id="cc-interactive-timeline"');
        expect(html).toContain('cc-spread-chain');
        expect(html).toContain('Political Background');
        expect(html).toContain('cc-map-detail');
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
        expect(html).toContain('Chatterji');
        expect(html).toContain('Wolpert');
        expect(html).toContain('Yasmin Khan');
    });
});

describe('1946 Calcutta Crisis Explorer — Assets', () => {
    it('includes a non-empty stylesheet themed for the subject', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.cc-hero');
        expect(css).toContain('.cc-map');
        expect(css).toContain('.cc-timeline');
        expect(css).toContain('.cc-spread-chain');
    });

    it('includes a valid interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('activateTab');
        expect(js).toContain('initCalcuttaMap');
        expect(js).toContain('CC_MAP_POINTS');
        expect(js).toContain('initTimeline');
        expect(js).toContain('initThemeToggle');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('1946 Calcutta Crisis — Landing Page Integration', () => {
    it('is listed under "Road to Partition" in the landing page navigation', () => {
        const index = readLandingPage();
        const dropdownStart = index.indexOf('Road to Partition ▾');
        expect(dropdownStart).toBeGreaterThan(-1);
        const dropdown = index.slice(dropdownStart, dropdownStart + 900);
        expect(dropdown).toContain('calcutta-1946-crisis-explorer/index.html');
        expect(dropdown).toContain('1946 Calcutta Crisis');
    });

    it('is added to the global search index under Road to Partition', () => {
        const search = readSearchIndex();
        expect(search).toContain('1946 Calcutta Crisis Explorer');
        expect(search).toContain('Road to Partition');
        expect(search).toContain('frontend/calcutta-1946-crisis-explorer/index.html');    });
});
