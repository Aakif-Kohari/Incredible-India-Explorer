/**
 * junagarh-fort-explorer.test.js
 * Unit tests for the Junagarh Fort Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and the gallery structure per issue #2749.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/junagarh-fort-explorer', file),
        'utf-8'
    );
}

describe('Junagarh Fort Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="junagarh-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Junagarh Fort');
        expect(html).toContain('Bikaner, Rajasthan');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'history', 'fortifications', 'palaces', 'courtyards', 'interiors', 'influences', 'timeline', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Introduction', 'History and Raja Rai Singh', 'Fortifications', 'Royal Palaces', 'Courtyards', 'Decorative Interiors', 'Architectural Influences', 'Historical Timeline', 'Interesting Facts', 'Gallery'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Raja Rai Singh');
        expect(html).toContain('1589');
        expect(html).toContain('1594');
        expect(html).toContain('Chintamani');
        expect(html).toContain('Ganga Singh');
        expect(html).toContain('Suraj Pol');
        expect(html).toContain('Chand Pol');
        expect(html).toContain('Chandra Mahal');
        expect(html).toContain('Karan Mahal');
        expect(html).toContain('Anup Mahal');
        expect(html).toContain('Phool Mahal');
        expect(html).toContain('Badal Mahal');
        expect(html).toContain('red sandstone');
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
        expect(html).toContain('../js-modules/storage.js');
        expect(html).toContain('journey.js');
        expect(html).toContain('script.js');
        expect(html).toContain('page-progress');
    });

    it('includes a journey bookmark button for the monument', () => {
        expect(html).toContain('journey-bookmark-btn');
        expect(html).toContain('data-bookmark-id="junagarh-fort-main"');
        expect(html).toContain('Save to Journey');
    });

    it('contains a gallery with lazy-loaded images and modal wiring', () => {
        expect(html).toContain('junagarh-gallery-grid');
        expect(html).toContain('junagarh-modal');
        expect(html).toContain('loading="lazy"');
        const lazyImgs = (html.match(/loading="lazy"/g) || []).length;
        const imgs = (html.match(/<img[\s>]/g) || []).length;
        expect(lazyImgs).toBeGreaterThanOrEqual(imgs - 1);
    });

    it('contains a historical timeline with key dates', () => {
        expect(html).toContain('junagarh-timeline');
        expect(html).toContain('1589');
        expect(html).toContain('1961');
        expect(html).toContain('junagarh-timeline-item');
    });

    it('references documented sources', () => {
        expect(html).toContain('Department of Archaeology');
        expect(html).toContain('References');
    });
});

describe('Junagarh Fort Explorer — Styles and Scripts', () => {
    it('style.css defines a hero and responsive layout', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.junagarh-hero');
        expect(css).toContain('@media');
        expect(css).toContain('.junagarh-gallery-grid');
        expect(css).toContain('.light-theme');
        expect(css).toContain('.junagarh-timeline');
    });

    it('script.js wires the gallery modal and journey bookmark', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('junagarh-modal');
        expect(js).toContain('Journey.toggle');
        expect(js).toContain("id: 'junagarh-fort-main'");
        expect(js).toContain('Escape');
        expect(js).toContain('btn-scroll-top');
    });
});
