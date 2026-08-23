/**
 * safdarjung-tomb-explorer.test.js
 * Unit tests for the Safdarjung's Tomb Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and the gallery structure per issue #2753.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/safdarjung-tomb-explorer', file),
        'utf-8'
    );
}

describe('Safdarjung\'s Tomb Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="safdarjung-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Safdarjung');
        expect(html).toContain('New Delhi');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'history', 'architecture', 'tomb', 'charbagh', 'structures', 'decorative', 'significance', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Introduction', 'Historical Background', 'Late Mughal Architecture', 'Main Tomb', 'Charbagh', 'Surrounding Structures', 'Decorative', 'Historical Significance', 'Interesting Facts', 'Gallery'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Safdarjung');
        expect(html).toContain('1754');
        expect(html).toContain('Shuja-ud-Daulah');
        expect(html).toContain('Mirza Muqim Abul Mansur Khan');
        expect(html).toContain('wazir');
        expect(html).toContain('charbagh');
        expect(html).toContain('Moti Mahal');
        expect(html).toContain('Jangli Mahal');
        expect(html).toContain('red sandstone');
        expect(html).toContain('marble');
        expect(html).toContain('brass finial');
        expect(html).toContain('octagonal');
        expect(html).toContain('jali');
        expect(html).toContain('Archaeological Survey of India');
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
        expect(html).toContain('data-bookmark-id="safdarjung-tomb-main"');
        expect(html).toContain('Save to Journey');
    });

    it('contains a gallery with lazy-loaded images and modal wiring', () => {
        expect(html).toContain('safdarjung-gallery-grid');
        expect(html).toContain('safdarjung-modal');
        expect(html).toContain('loading="lazy"');
        const lazyImgs = (html.match(/loading="lazy"/g) || []).length;
        const imgs = (html.match(/<img[\s>]/g) || []).length;
        expect(lazyImgs).toBeGreaterThanOrEqual(imgs - 1);
    });

    it('contains an interesting facts section with key facts', () => {
        expect(html).toContain('safdarjung-facts-grid');
        expect(html).toContain('last flicker in the lamp of Mughal architecture');
        expect(html).toContain('safdarjung-fact-item');
    });

    it('references documented sources', () => {
        expect(html).toContain('Archaeological Survey of India');
        expect(html).toContain('References');
    });
});

describe('Safdarjung\'s Tomb Explorer — Styles and Scripts', () => {
    it('style.css defines a hero and responsive layout', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.safdarjung-hero');
        expect(css).toContain('@media');
        expect(css).toContain('.safdarjung-gallery-grid');
        expect(css).toContain('.light-theme');
        expect(css).toContain('.safdarjung-facts-grid');
    });

    it('script.js wires the gallery modal and journey bookmark', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('safdarjung-modal');
        expect(js).toContain('Journey.toggle');
        expect(js).toContain("id: 'safdarjung-tomb-main'");
        expect(js).toContain('Escape');
        expect(js).toContain('btn-scroll-top');
    });
});