/**
 * calangute-beach.test.js
 * Unit tests for the Calangute Beach (North Goa) page.
 * Validates required sections, key content, accessibility,
 * map reference, and gallery structure per issue #2955.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/calangute-beach', file),
        'utf-8'
    );
}

describe('Calangute Beach — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and badges', () => {
        expect(html).toContain('class="hero-section"');
        expect(html).toContain('<h1');
        expect(html).toContain('Calangute Beach');
        expect(html).toContain('North Goa');
        expect(html).toContain('Arabian Sea');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['geo-heading', 'overview-heading', 'marine-heading', 'culture-heading', 'panel-activities', 'panel-nearby', 'panel-visitor', 'gallery-heading'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Location & Geographical Profile', 'Beach Overview', 'Marine Environment', 'Local Coastal Culture', 'Activities', 'Nearby Attractions', 'Visitor Info', 'Gallery'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key location and coastal culture details', () => {
        expect(html).toContain('Goa');
        expect(html).toContain('Panaji');
        expect(html).toContain('Calangute');
        expect(html).toContain('Queen of Beaches');
        expect(html).toContain('shack');
        expect(html).toContain('feni');
        expect(html).toContain('Carnival');
        expect(html).toContain('St. Alex');
        expect(html).toContain('Baga');
        expect(html).toContain('Candolim');
        expect(html).toContain('Fort Aguada');
    });

    it('has a semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('uses HTTPS OG image URLs', () => {
        const ogImages = html.match(/property="og:image" content="([^"]*)"/g) || [];
        expect(ogImages.length).toBeGreaterThanOrEqual(1);
        ogImages.forEach(tag => {
            expect(tag).toMatch(/https:\/\//);
        });
    });

    it('links the shared navigation and core scripts', () => {
        expect(html).toContain('../../styles.css');
        expect(html).toContain('../pages-common.css');
        expect(html).toContain('../js-modules/config.js');
        expect(html).toContain('../app.js');
        expect(html).toContain('script.js');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude"');
        expect(html).toContain('"longitude"');
    });

    it('includes a map/location reference with Leaflet', () => {
        expect(html).toContain('calangute-map');
        expect(html).toContain('leaflet@1.9.4');
        expect(html).toContain('OpenStreetMap');
        expect(html).toContain('aria-label="Interactive map');
    });

    it('contains a gallery with lazy-loaded images and lightbox wiring', () => {
        expect(html).toContain('calangute-gallery');
        expect(html).toContain('lightbox-modal');
        expect(html).toContain('loading="lazy"');
        const lazyImgs = (html.match(/loading="lazy"/g) || []).length;
        const imgs = (html.match(/<img[\s>]/g) || []).length;
        expect(lazyImgs).toBeGreaterThanOrEqual(imgs - 1);
    });

    it('includes image attribution for the gallery', () => {
        expect(html).toContain('Unsplash');
        expect(html).toContain('attribution');
    });

    it('includes a quick stats ribbon with key specifications', () => {
        expect(html).toContain('hero-stats-ribbon');
        expect(html).toContain('Best Season');
        expect(html).toContain('November');
    });
});

describe('Calangute Beach — Styles and Scripts', () => {
    it('style.css defines a hero, map and responsive layout', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.hero-section');
        expect(css).toContain('@media');
        expect(css).toContain('.gallery-grid');
        expect(css).toContain('.light-theme');
        expect(css).toContain('.hub-tabs');
        expect(css).toContain('.calangute-map');
    });

    it('script.js wires the tabs, gallery filters, lightbox, map and theme toggle', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('hub-tab-btn');
        expect(js).toContain('filter-btn');
        expect(js).toContain('lightbox-modal');
        expect(js).toContain('Escape');
        expect(js).toContain('theme-toggle');
        expect(js).toContain('L.map');
        expect(js).toContain('L.tileLayer');
        expect(js).toContain('L.marker');
    });
});
