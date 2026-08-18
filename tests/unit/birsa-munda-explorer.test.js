/**
 * birsa-munda-explorer.test.js
 * Unit tests for the Birsa Munda Explorer page.
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
        resolve(__dirname, '../../frontend/birsa-munda-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-fighters-hub/index.html'),
        'utf-8'
    );
}

describe('Birsa Munda Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="birsa-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Birsa Munda');
        expect(html).toContain('Ulgulan');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'movement', 'legacy', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Biography', 'Timeline', 'Tribal Movement', 'Legacy', 'Gallery', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains premium immersive features', () => {
        expect(html).toContain('class="birsa-hero-backdrop"');
        expect(html).toContain('birsa-hero-badges');
        expect(html).toContain('birsa-cta-btn');
        expect(html).toContain('birsa-section-nav');
        expect(html).toContain('birsa-lightbox');
        expect(html).toMatch(/class="[^"]*reveal"/);
        expect(html).toContain('birsa-timeline-step');
        expect(html).toContain('birsa-movement-card');
        expect(html).toContain('birsa-feature-card');
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Dharti Aba');
        expect(html).toContain('Ulihatu');
        expect(html).toContain('Khunti');
        expect(html).toContain('Chotanagpur');
        expect(html).toContain('Ranchi');
        expect(html).toContain('1899');
        expect(html).toContain('1900');
        expect(html).toContain('Jharkhand');
        expect(html).toContain('Janjatiya Gaurav Divas');
        expect(html).toContain('Chotanagpur Tenancy Act');
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

describe('Birsa Munda Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.birsa-hero');
        expect(css).toContain('.birsa-timeline');
        expect(css).toContain('.birsa-ref-grid');
        expect(css).toContain('.birsa-feature');
        expect(css).toContain('.birsa-lightbox');
        expect(css).toContain('.reveal');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('birsa-lightbox');
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

describe('Birsa Munda — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Freedom Fighters Hub landing page', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        expect(cards.length).toBeGreaterThan(0);
        const birsaCard = cards.find(card => card.includes('Birsa Munda'));
        expect(birsaCard).toBeDefined();
        expect(birsaCard).toContain('../birsa-munda-explorer/index.html');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        const birsaCard = cards.find(card => card.includes('Birsa Munda'));
        expect(birsaCard).toBeDefined();
        expect(birsaCard).toContain('featured-explorer-badge');
        expect(birsaCard).toContain('featured-explorer-btn');
        expect(birsaCard).toContain('1875');
    });

    it('appears in the footer Freedom Fighters list on the landing page', () => {
        const index = readLandingPage();
        const footer = extractFooter(index);
        expect(footer.length).toBeGreaterThan(0);
        expect(footer).toContain('Birsa Munda');
        expect(footer).toContain('../birsa-munda-explorer/index.html');
    });

    it('registers Birsa Munda in the hub FREEDOM_FIGHTERS_DATA', () => {
        const js = readFileSync(
            resolve(__dirname, '../../frontend/freedom-fighters-hub/script.js'),
            'utf-8'
        );
        expect(js).toContain("id: 'birsa-munda'");
        expect(js).toContain('Ulgulan (Great Tumult)');
        expect(js).toContain('Chotanagpur Tenancy Act');
        expect(js).toContain("era: 'Tribal Uprising'");
    });
});
