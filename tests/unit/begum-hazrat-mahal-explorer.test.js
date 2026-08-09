/**
 * begum-hazrat-mahal-explorer.test.js
 * Unit tests for the Begum Hazrat Mahal Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and landing page card integration on the Freedom Fighters Knowledge Hub page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/begum-hazrat-mahal-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-fighters-hub/index.html'),
        'utf-8'
    );
}

describe('Begum Hazrat Mahal Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="begum-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Begum Hazrat Mahal');
        expect(html).toContain('Revolt of 1857');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'revolt', 'leadership', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Biography', 'Timeline', 'Revolt of 1857', 'Military Leadership', 'Gallery', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains premium immersive features', () => {
        expect(html).toContain('class="begum-hero-backdrop"');
        expect(html).toContain('begum-hero-badges');
        expect(html).toContain('begum-cta-btn');
        expect(html).toContain('begum-section-nav');
        expect(html).toContain('begum-lightbox');
        expect(html).toMatch(/class="[^"]*reveal"/);
        expect(html).toContain('begum-timeline-step');
        expect(html).toContain('begum-revolt-card');
        expect(html).toContain('begum-feature-card');
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Awadh');
        expect(html).toContain('Faizabad');
        expect(html).toContain('Lucknow');
        expect(html).toContain('Wajid Ali Shah');
        expect(html).toContain('Birjis Qadr');
        expect(html).toContain('1857');
        expect(html).toContain('1858');
        expect(html).toContain('Residency');
        expect(html).toContain('Alambagh');
        expect(html).toContain('Nepal');
        expect(html).toContain('Kathmandu');
        expect(html).toContain('1879');
        expect(html).toContain('Jama Masjid');
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

    it('loads the shared Journey module before its own script', () => {
        const journeyIdx = html.indexOf('journey/journey.js');
        const scriptIdx = html.indexOf('src="script.js"');
        expect(journeyIdx).toBeGreaterThan(-1);
        expect(scriptIdx).toBeGreaterThan(journeyIdx);
    });
});

describe('Begum Hazrat Mahal Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.begum-hero');
        expect(css).toContain('.begum-timeline');
        expect(css).toContain('.begum-ref-grid');
        expect(css).toContain('.begum-feature');
        expect(css).toContain('.begum-lightbox');
        expect(css).toContain('.reveal');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('begum-lightbox');
        expect(js).toContain('app:route-changed');
        expect(js).toContain('IntersectionObserver');
        expect(js).toContain('prefers-reduced-motion');
    });
});

const CARD_MARKER = '<div class="featured-explorer-card">';

function extractFeaturedCards(html) {
    const cards = [];
    let cursor = 0;
    while (cursor < html.length) {
        const start = html.indexOf(CARD_MARKER, cursor);
        if (start === -1) break;
        const end = html.indexOf('</section>', start);
        cards.push(html.slice(start, end === -1 ? start + 2000 : end));
        cursor = end === -1 ? start + CARD_MARKER.length : end;
    }
    return cards;
}

function extractFooter(html) {
    const start = html.indexOf('<footer');
    const end = start === -1 ? -1 : html.indexOf('</footer>', start);
    return start === -1 || end === -1 ? '' : html.slice(start, end);
}

describe('Begum Hazrat Mahal — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Freedom Fighters Hub landing page', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        expect(cards.length).toBeGreaterThan(0);
        const begumCard = cards.find(card => card.includes('Begum Hazrat Mahal'));
        expect(begumCard).toBeDefined();
        expect(begumCard).toContain('../begum-hazrat-mahal-explorer/index.html');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        const begumCard = cards.find(card => card.includes('Begum Hazrat Mahal'));
        expect(begumCard).toBeDefined();
        expect(begumCard).toContain('featured-explorer-badge');
        expect(begumCard).toContain('featured-explorer-btn');
        expect(begumCard).toContain('1820');
    });

    it('appears in the footer Freedom Fighters list on the landing page', () => {
        const index = readLandingPage();
        const footer = extractFooter(index);
        expect(footer.length).toBeGreaterThan(0);
        expect(footer).toContain('Begum Hazrat Mahal');
        expect(footer).toContain('../begum-hazrat-mahal-explorer/index.html');
    });

    it('registers Begum Hazrat Mahal in the hub FREEDOM_FIGHTERS_DATA', () => {
        const js = readFileSync(
            resolve(__dirname, '../../frontend/freedom-fighters-hub/script.js'),
            'utf-8'
        );
        expect(js).toContain("id: 'begum-hazrat-mahal'");
        expect(js).toContain('Revolt of 1857');
        expect(js).toContain('Birjis Qadr');
        expect(js).toContain("era: '1857 Revolt'");
    });
});
