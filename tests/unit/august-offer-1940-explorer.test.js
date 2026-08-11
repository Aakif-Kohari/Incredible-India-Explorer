/**
 * august-offer-1940-explorer.test.js
 * Unit tests for the August Offer 1940 Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and landing page integration on the Making of Modern India page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/august-offer-1940-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/making-of-modern-india/index.html'),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('August Offer 1940 Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="augustoffer-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('August Offer');
        expect(html).toContain('8 August 1940');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['context', 'proposals', 'comparison', 'responses', 'timeline', 'significance', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        [
            'World War II',
            'Dominion Status',
            'Executive Council',
            'Constitutional',
            'Congress',
            'Muslim League',
            'Gandhi',
            'Individual Satyagraha',
            'Timeline',
            'References'
        ].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Linlithgow');
        expect(html).toContain('8 August 1940');
        expect(html).toContain('Vinoba Bhave');
        expect(html).toContain('Lahore Resolution');
        expect(html).toContain('minority');
        expect(html).toContain('War Advisory Council');
        expect(html).toContain('Purna Swaraj');
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

describe('August Offer 1940 Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.augustoffer-hero');
        expect(css).toContain('.augustoffer-timeline');
        expect(css).toContain('.augustoffer-references');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('augustoffer-detail-title');
        expect(js).toContain('augustoffer-filter-btn');
        expect(js).toContain('app:route-changed');
    });
});

describe('August Offer 1940 — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Making of Modern India landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('August Offer, 1940');
        expect(index).toContain('../august-offer-1940-explorer/index.html');
        expect(index).toContain('featured-explorer-card');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('<div class="featured-explorer-card">');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('featured-explorer-badge');
        expect(card).toContain('featured-explorer-btn');
        expect(card).toContain('August Offer, 1940');
        expect(card).toContain('Individual Satyagraha');
    });

    it('adds the explorer to the global search index under Constitutional Developments', () => {
        const search = readSearchIndex();
        expect(search).toContain('August Offer, 1940 Explorer');
        expect(search).toContain('Constitutional Developments');
        expect(search).toContain('frontend/august-offer-1940-explorer/index.html');
    });
});
