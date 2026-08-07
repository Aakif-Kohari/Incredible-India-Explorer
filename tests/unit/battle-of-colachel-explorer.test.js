/**
 * battle-of-colachel-explorer.test.js
 * Unit tests for the Battle of Colachel Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and landing page card integration on the Historic Battles of India page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/battle-of-colachel-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/history/battles/index.html'),
        'utf-8'
    );
}

describe('Battle of Colachel Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="colachel-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Battle of Colachel');
        expect(html).toContain('10 March 1741');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'belligerents', 'strategy', 'outcome', 'significance', 'timeline', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Historical', 'Belligerents', 'Strategy', 'Outcome', 'Significance', 'Timeline', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains premium immersive features', () => {
        expect(html).toContain('class="colachel-hero-backdrop"');
        expect(html).toContain('colachel-hero-badges');
        expect(html).toContain('colachel-cta-btn');
        expect(html).toContain('colachel-section-nav');
        expect(html).toContain('colachel-lightbox');
        expect(html).toMatch(/class="[^"]*reveal"/);
        expect(html).toContain('colachel-compare-card');
        expect(html).toContain('colachel-feature-card');
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Marthanda Varma');
        expect(html).toContain('Jan Plaisier');
        expect(html).toContain('Dutch East India Company');
        expect(html).toContain('Travancore');
        expect(html).toContain('Colachel');
        expect(html).toContain('1741');
        expect(html).toContain('De Lannoy');
        expect(html).toContain('Malabar');
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

describe('Battle of Colachel Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.colachel-hero');
        expect(css).toContain('.colachel-timeline');
        expect(css).toContain('.colachel-ref-grid');
        expect(css).toContain('.colachel-feature');
        expect(css).toContain('.colachel-lightbox');
        expect(css).toContain('.reveal');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('colachel-lightbox');
        expect(js).toContain('app:route-changed');
        expect(js).toContain('IntersectionObserver');
        expect(js).toContain('prefers-reduced-motion');
    });
});

describe('Battle of Colachel — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Historic Battles of India landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Battle of Colachel');
        expect(index).toContain('../../battle-of-colachel-explorer/index.html');
        expect(index).toContain('featured-explorer-card');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Battle of Colachel');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart - 200, cardStart + 1200);
        expect(card).toContain('featured-explorer-badge');
        expect(card).toContain('featured-explorer-btn');
        expect(card).toContain('10 Mar 1741');
    });

    it('appears in the footer Battle Explorers list on the landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Battle of Colachel');
    });
});
