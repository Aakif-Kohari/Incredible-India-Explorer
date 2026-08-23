/**
 * mehrangarh-fort-explorer.test.js
 * Unit tests for the Mehrangarh Fort Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and the gallery structure per issue #2748.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/mehrangarh-fort-explorer', file),
        'utf-8'
    );
}

describe('Mehrangarh Fort Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="mehrangarh-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Mehrangarh Fort');
        expect(html).toContain('Jodhpur, Rajasthan');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'origins', 'defensive', 'palaces', 'museum', 'interiors', 'history', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Introduction', 'Rao Jodha and the Fort', 'Defensive Architecture', 'Royal Palaces', 'Museum and Collections', 'Decorative Interiors', 'Historical Importance', 'Interesting Facts', 'Gallery'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Rao Jodha');
        expect(html).toContain('1459');
        expect(html).toContain('Bhakurcheeria');
        expect(html).toContain('Moti Mahal');
        expect(html).toContain('Phool Mahal');
        expect(html).toContain('Sheesh Mahal');
        expect(html).toContain('Takhat Vilas');
        expect(html).toContain('Loha Pol');
        expect(html).toContain('Jai Pol');
        expect(html).toContain('Fateh Pol');
        expect(html).toContain('Dedh Kamgra Pol');
        expect(html).toContain('museum');
        expect(html).toContain('howdah');
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
        expect(html).toContain('data-bookmark-id="mehrangarh-fort-main"');
        expect(html).toContain('Save to Journey');
    });

    it('contains a gallery with lazy-loaded images and modal wiring', () => {
        expect(html).toContain('mehrangarh-gallery-grid');
        expect(html).toContain('mehrangarh-modal');
        expect(html).toContain('loading="lazy"');
        const lazyImgs = (html.match(/loading="lazy"/g) || []).length;
        const imgs = (html.match(/<img[\s>]/g) || []).length;
        expect(lazyImgs).toBeGreaterThanOrEqual(imgs - 1);
    });

    it('links to the related Jodhpur-Marwar explorer page', () => {
        expect(html).toContain('../Jodhpur-Marwar/JodhpurMarwar.html');
    });

    it('references documented sources', () => {
        expect(html).toContain('Mehrangarh Museum Trust');
        expect(html).toContain('References');
    });
});

describe('Mehrangarh Fort Explorer — Styles and Scripts', () => {
    it('style.css defines a hero and responsive layout', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.mehrangarh-hero');
        expect(css).toContain('@media');
        expect(css).toContain('.mehrangarh-gallery-grid');
        expect(css).toContain('.light-theme');
    });

    it('script.js wires the gallery modal and journey bookmark', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('mehrangarh-modal');
        expect(js).toContain('Journey.toggle');
        expect(js).toContain('Escape');
        expect(js).toContain('btn-scroll-top');
    });
});
