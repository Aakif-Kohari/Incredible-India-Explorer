/**
 * sarojini-naidu-explorer.test.js
 * Unit tests for the Sarojini Naidu Explorer page (issue #1872).
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
        resolve(__dirname, '../../sarojini-naidu-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../../index.html'),
        'utf-8'
    );
}

describe('Sarojini Naidu Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="sn-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Sarojini Naidu');
        expect(html).toContain('Nightingale of India');
        expect(html).toContain('13 February 1879');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'movements', 'literary', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab buttons', () => {
        const tabs = ['Biography', 'Timeline', 'Major Movements', 'Literary Contributions', 'Gallery', 'References'];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key biographical details', () => {
        expect(html).toContain('1879');
        expect(html).toContain('1949');
        expect(html).toContain('Hyderabad');
        expect(html).toContain('Nightingale of India');
        expect(html).toContain('Congress President');
        expect(html).toContain('Governor');
        expect(html).toContain("Women's Indian Association");
    });

    it('mentions the major freedom movements she participated in', () => {
        expect(html).toContain('Non-Cooperation');
        expect(html).toContain('Civil Disobedience');
        expect(html).toContain('Dharasana');
        expect(html).toContain('Quit India');
        expect(html).toContain('Round Table');
    });

    it('references her major literary works', () => {
        expect(html).toContain('The Golden Threshold');
        expect(html).toContain('The Bird of Time');
        expect(html).toContain('The Broken Wing');
        expect(html).toContain('The Sceptred Flute');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
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

describe('Sarojini Naidu Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.sn-hero');
        expect(css).toContain('.timeline-container');
        expect(css).toContain('.gallery-grid');
        expect(css).toContain('.sn-section');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Sarojini Naidu — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Sarojini Naidu');
        expect(index).toContain('frontend/sarojini-naidu-explorer/index.html');
    });

    it('is rendered as a freedom-hero card with image, title, and CTA', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Sarojini Naidu Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('freedom-hero-card');
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
        expect(card).toContain('freedom-hero-cta');
        expect(card).toContain('Explore her story');
    });

    it('lives inside a dedicated freedom-heroes section', () => {
        const index = readLandingPage();
        expect(index).toContain('id="freedom-heroes"');
        expect(index).toContain('class="freedom-heroes-section');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/sarojini-naidu-explorer\/index\.html"/);
    });
});
