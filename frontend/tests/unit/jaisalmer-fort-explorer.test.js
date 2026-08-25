/**
 * jaisalmer-fort-explorer.test.js
 * Unit tests for the Jaisalmer Fort Explorer page.
 * Validates required sections, key heritage content, accessibility,
 * and page assets for the Jaisalmer Fort monument page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/jaisalmer-fort-explorer', file),
        'utf-8'
    );
}

describe('Jaisalmer Fort Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="jaisalmer-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Jaisalmer Fort');
        expect(html).toContain('Rajasthan');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'history', 'architecture', 'living-fort', 'jain-temples', 'palace', 'trade', 'unesco', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Historical Background', 'Golden Sandstone', 'Living Fort', 'Jain Temples', 'Royal Palace', 'Trade and Cultural Heritage', 'UNESCO Heritage', 'Interesting Facts', 'Gallery'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key heritage details', () => {
        expect(html).toContain('Rawal Jaisal');
        expect(html).toContain('1156');
        expect(html).toContain('Trikuta Hill');
        expect(html).toContain('Sonar Kila');
        expect(html).toContain('99 bastions');
        expect(html).toContain('Gyan Bhandar');
        expect(html).toContain('Raj Mahal');
    });

    it('mentions the UNESCO serial listing with sibling forts', () => {
        expect(html).toContain('Hill Forts of Rajasthan');
        expect(html).toContain('2013');
        expect(html).toContain('Chittorgarh');
        expect(html).toContain('Kumbhalgarh');
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

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Jaisalmer Fort Explorer — Assets', () => {
    it('includes a non-empty stylesheet with hero, section and light-theme styles', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.jaisalmer-hero');
        expect(css).toContain('.jaisalmer-highlight-box');
        expect(css).toContain('.jaisalmer-facts-grid');
        expect(css).toContain('.jaisalmer-references');
        expect(css).toContain('[data-theme="light"]');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('jaisalmer-modal');
        expect(js).toContain('Journey');
        expect(js).toContain('journey-bookmark-btn');
        expect(js).toContain('btn-scroll-top');
    });

    it('gallery images are lazy-loaded', () => {
        const html = readExplorerFile('index.html');
        const imgs = html.match(/<img[^>]*>/g) || [];
        expect(imgs.length).toBeGreaterThanOrEqual(6);
        imgs.forEach(img => {
            expect(img).toContain('loading="lazy"');
        });
    });
});
