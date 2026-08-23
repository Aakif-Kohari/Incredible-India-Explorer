/**
 * second-battle-of-panipat-explorer.test.js
 * Unit tests for the Second Battle of Panipat Explorer page (issue #1613).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/second-battle-of-panipat-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Second Battle of Panipat Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="sbp-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Second Battle of Panipat');
        expect(html).toContain('1556');
        expect(html).toContain('Panipat');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'timeline', 'tactics', 'commanders', 'outcome', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab buttons', () => {
        const tabs = ['Historical Overview', 'Timeline', 'Military Tactics', 'Commanders', 'Outcome', 'References'];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key historical details', () => {
        expect(html).toContain('Akbar');
        expect(html).toContain('Bairam Khan');
        expect(html).toContain('Hemu');
        expect(html).toContain('5 November 1556');
        expect(html).toContain('arrow');
        expect(html).toContain('elephant');
    });

    it('mentions the key commanders', () => {
        expect(html).toContain('Ali Quli Khan');
        expect(html).toContain('Shah Qulin Mahram');
        expect(html).toContain('Sikandar Khan');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
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

describe('Second Battle of Panipat Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.sbp-hero');
        expect(css).toContain('.timeline-container');
        expect(css).toContain('.sbp-section');
        expect(css).toContain('.content-grid');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Second Battle of Panipat — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Second Battle of Panipat');
        expect(index).toContain('frontend/second-battle-of-panipat-explorer/index.html');
    });

    it('is rendered as a battle card with image, title, and CTA', () => {
        const index = readLandingPage();
        expect(index).toContain('battle-card');
        expect(index).toContain('cuisine-card-image');
        expect(index).toContain('cuisine-card-body');
        expect(index).toContain('battle-cta');
        expect(index).toContain('Explore the battle');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/second-battle-of-panipat-explorer\/index\.html"/);
    });
});
