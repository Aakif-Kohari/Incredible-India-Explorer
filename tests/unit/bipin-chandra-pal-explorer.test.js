/**
 * bipin-chandra-pal-explorer.test.js
 * Unit tests for the Bipin Chandra Pal Explorer page (issue #1878).
 * Validates required sections, tab navigation, accessibility, image URLs,
 * and landing page card integration on the Incredible India Explorer
 * home page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/bipin-chandra-pal-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Bipin Chandra Pal Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="bcp-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Bipin Chandra Pal');
        expect(html).toContain('The Voice of Swadeshi Nationalism');
        expect(html).toContain('7 November 1858');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'swadeshi', 'publications', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab buttons', () => {
        const tabs = ['Biography', 'Timeline', 'Swadeshi Movement', 'Publications', 'References'];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key biographical details', () => {
        expect(html).toContain('1858');
        expect(html).toContain('1932');
        expect(html).toContain('Sylhet');
        expect(html).toContain('Lal-Bal-Pal');
        expect(html).toContain('Brahmo Samaj');
        expect(html).toContain('Surat Split');
        expect(html).toContain('The Soul of India');
    });

    it('mentions the Swadeshi Movement and the 1905 Partition of Bengal', () => {
        expect(html).toContain('Swadeshi');
        expect(html).toContain('Partition of Bengal');
        expect(html).toContain('16 October 1905');
        expect(html).toContain('boycott');
        expect(html).toContain('Curzon');
        expect(html).toContain('Tilak');
        expect(html).toContain('Lajpat Rai');
    });

    it('lists his key publications', () => {
        expect(html).toContain('New India');
        expect(html).toContain('Bande Mataram');
        expect(html).toContain('The Soul of India');
        expect(html).toContain('The Spirit of Indian Nationalism');
        expect(html).toContain('The Tribune');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(5);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
        expect(imgTags.length).toBeGreaterThanOrEqual(1);
        imgTags.forEach(tag => {
            expect(tag).toMatch(/src="https:\/\//);
            expect(tag).toMatch(/alt="/);
            expect(tag).not.toMatch(/src="http:\/\//);
        });
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Bipin Chandra Pal Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.bcp-hero');
        expect(css).toContain('.bcp-timeline');
        expect(css).toContain('.bcp-section');
        expect(css).toContain('.bcp-tabs');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Bipin Chandra Pal — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Bipin Chandra Pal');
        expect(index).toContain('frontend/bipin-chandra-pal-explorer/index.html');
    });

    it('is rendered as a freedom-hero card with image, title, and CTA', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Bipin Chandra Pal Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('freedom-hero-card');
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
        expect(card).toContain('freedom-hero-cta');
        expect(card).toContain('Explore his story');
    });

    it('lives inside a dedicated freedom-heroes section', () => {
        const index = readLandingPage();
        expect(index).toContain('id="freedom-heroes"');
        expect(index).toContain('class="freedom-heroes-section');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/bipin-chandra-pal-explorer\/index\.html"/);
    });
});
