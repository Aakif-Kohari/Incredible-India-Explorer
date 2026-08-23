/**
 * bharatpur-beach.test.js
 * Unit tests for the Bharatpur Beach (Neil Island) page.
 * Validates required sections, key content, accessibility,
 * and the gallery structure per issue #2953.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/bharatpur-beach', file),
        'utf-8'
    );
}

describe('Bharatpur Beach — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and badges', () => {
        expect(html).toContain('class="hero-section"');
        expect(html).toContain('<h1');
        expect(html).toContain('Bharatpur Beach');
        expect(html).toContain('Neil Island');
        expect(html).toContain('Shaheed Dweep');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['geo-heading', 'overview-heading', 'marine-heading', 'panel-activities', 'panel-nearby', 'panel-visitor', 'gallery-heading'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Location & Geographical Profile', 'Beach Overview', 'Marine Environment', 'Activities', 'Nearby Attractions', 'Visitor Info', 'Gallery'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key location and marine details', () => {
        expect(html).toContain('Andaman');
        expect(html).toContain('Port Blair');
        expect(html).toContain('coral');
        expect(html).toContain('lagoon');
        expect(html).toContain('snorkeling');
        expect(html).toContain('Glass-Bottom Boat');
        expect(html).toContain('Rani Jhansi Marine National Park');
        expect(html).toContain('Natural Bridge');
        expect(html).toContain('Laxmanpur');
        expect(html).toContain('Sitapur');
    });

    it('has a semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(5);
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
        expect(html).toContain('../app.js');
        expect(html).toContain('script.js');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude"');
        expect(html).toContain('"longitude"');
    });

    it('contains a gallery with lazy-loaded images and lightbox wiring', () => {
        expect(html).toContain('bharatpur-gallery');
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
        expect(html).toContain('October');
    });
});

describe('Bharatpur Beach — Styles and Scripts', () => {
    it('style.css defines a hero and responsive layout', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.hero-section');
        expect(css).toContain('@media');
        expect(css).toContain('.gallery-grid');
        expect(css).toContain('.light-theme');
        expect(css).toContain('.hub-tabs');
    });

    it('script.js wires the tabs, gallery filters, lightbox and theme toggle', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('hub-tab-btn');
        expect(js).toContain('filter-btn');
        expect(js).toContain('lightbox-modal');
        expect(js).toContain('Escape');
        expect(js).toContain('theme-toggle');
    });
});