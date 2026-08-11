/**
 * ashfaqulla-khan-explorer.test.js
 * Unit tests for the Ashfaqulla Khan Explorer page (issue #1874).
 * Validates required sections, tab navigation, accessibility, image URLs,
 * gallery content, and landing page card integration on the Incredible
 * India Explorer home page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/ashfaqulla-khan-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Ashfaqulla Khan Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="ak-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Ashfaqulla Khan');
        expect(html).toContain('The Kakori Hero of 1925');
        expect(html).toContain('22 October 1900');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'revolutionary', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab buttons', () => {
        const tabs = ['Biography', 'Timeline', 'Revolutionary Activities', 'Gallery', 'References'];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key biographical details', () => {
        expect(html).toContain('1900');
        expect(html).toContain('1927');
        expect(html).toContain('Shahjahanpur');
        expect(html).toContain('Ram Prasad Bismil');
        expect(html).toContain('Hindustan Republican Association');
        expect(html).toContain('Faizabad');
        expect(html).toContain('Kakori');
    });

    it('mentions the Kakori Conspiracy and key events', () => {
        expect(html).toContain('Kakori');
        expect(html).toContain('9 August 1925');
        expect(html).toContain('HRA');
        expect(html).toContain('Non-Cooperation');
        expect(html).toContain('Chauri Chaura');
        expect(html).toContain('1924');
    });

    it('describes the revolutionary ideals and philosophy', () => {
        expect(html).toContain('Hindu-Muslim unity');
        expect(html).toContain('socialist');
        expect(html).toContain('federal republic');
        expect(html).toContain('Lenin');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(5);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
        expect(imgTags.length).toBeGreaterThanOrEqual(4);
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

describe('Ashfaqulla Khan Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.ak-hero');
        expect(css).toContain('.ak-timeline');
        expect(css).toContain('.ak-section');
        expect(css).toContain('.ak-tabs');
        expect(css).toContain('.ak-gallery-grid');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Ashfaqulla Khan Explorer — Gallery Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a gallery section with at least 4 images', () => {
        const galleryStart = html.indexOf('id="gallery"');
        const galleryEnd = html.indexOf('</section>', galleryStart);
        const galleryHtml = html.slice(galleryStart, galleryEnd);
        const galleryImgs = galleryHtml.match(/<img [^>]*>/g) || [];
        expect(galleryImgs.length).toBeGreaterThanOrEqual(4);
    });

    it('gallery items have captions using <figcaption>', () => {
        const html = readExplorerFile('index.html');
        const galleryStart = html.indexOf('id="gallery"');
        const galleryEnd = html.indexOf('</section>', galleryStart);
        const galleryHtml = html.slice(galleryStart, galleryEnd);
        const figcaptions = galleryHtml.match(/<figcaption>/g) || [];
        expect(figcaptions.length).toBeGreaterThanOrEqual(4);
    });
});

describe('Ashfaqulla Khan — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Ashfaqulla Khan');
        expect(index).toContain('frontend/ashfaqulla-khan-explorer/index.html');
    });

    it('is rendered as a freedom-hero card with image, title, and CTA', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Ashfaqulla Khan Card');
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
        expect(index).toMatch(/href="frontend\/ashfaqulla-khan-explorer\/index\.html"/);
    });
});
