/**
 * gandhi-peace-prize-explorer.test.js
 * Unit tests for the Gandhi Peace Prize Explorer page (issue #1117).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/gandhi-peace-prize-explorer', file),
        'utf-8'
    );
}

function readAwardsLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Gandhi Peace Prize Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="gpp-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Gandhi Peace Prize');
        expect(html).toContain('International Award for Non-Violence');
        expect(html).toContain('1995');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'history',
            'year-instituted',
            'eligibility',
            'selection-committee',
            'prize-components',
            'international-recipients',
            'timeline',
            'facts',
            'gallery'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'History',
            'Year Instituted',
            'Eligibility',
            'Selection Committee',
            'Prize Components',
            'International Recipients',
            'Timeline',
            'Interesting Facts',
            'Image Gallery'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key historical details', () => {
        expect(html).toContain('1995');
        expect(html).toContain('125th birth anniversary');
        expect(html).toContain('Julius K. Nyerere');
        expect(html).toContain('Ministry of Culture');
    });

    it('contains the prize components (cash, citation, medallion)', () => {
        expect(html).toContain('₹1 Crore');
        expect(html).toContain('Citation');
        expect(html).toContain('Medallion');
    });

    it('mentions the selection committee composition', () => {
        expect(html).toContain('Prime Minister');
        expect(html).toContain('Chief Justice of India');
        expect(html).toContain('Leader of the Opposition');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
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

    it('includes a lightbox modal structure', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-title"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Gandhi Peace Prize Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.gpp-hero');
        expect(css).toContain('.gpp-section');
        expect(css).toContain('.gpp-timeline');
        expect(css).toContain('.recipient-card');
        expect(css).toContain('.gallery-grid');
        expect(css).toContain('.lightbox-modal');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain('initLightbox');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Gandhi Peace Prize — Awards Landing Page Integration', () => {
    it('is listed as a card on the Awards of India landing page', () => {
        const index = readAwardsLandingPage();
        expect(index).toContain('Gandhi Peace Prize');
        expect(index).toContain('gandhi-peace-prize-explorer/index.html');
    });

    it('is rendered as an award card with the standard structure', () => {
        const index = readAwardsLandingPage();
        expect(index).toContain('award-card');
        expect(index).toContain('Gandhi Peace Prize');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readAwardsLandingPage();
        expect(index).toMatch(/href="..\/gandhi-peace-prize-explorer\/index\.html"/);
    });
});
