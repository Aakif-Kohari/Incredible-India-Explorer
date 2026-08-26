/**
 * geeta-chopra-award-explorer.test.js
 * Unit tests for the Geeta Chopra Award Explorer page (issue #1114).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/geeta-chopra-award-explorer', file),
        'utf-8'
    );
}

function readAwardsLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Geeta Chopra Award Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="gc-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Geeta Chopra Award');
        expect(html).toContain('National Bravery Award for Girls');
        expect(html).toContain('1978');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'history',
            'eligibility',
            'selection',
            'significance',
            'recipients',
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
            'Eligibility',
            'Selection Process',
            'Award Significance',
            'Recipients',
            'Timeline',
            'Interesting Facts',
            'Gallery'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key historical details', () => {
        expect(html).toContain('1978');
        expect(html).toContain('Geeta Chopra');
        expect(html).toContain('Sanjay Chopra');
        expect(html).toContain('ICCW');
        expect(html).toContain('Republic Day');
        expect(html).toContain('Bal Shakti Puraskar');
    });

    it('contains eligibility criteria', () => {
        expect(html).toContain('6 and 18 years');
        expect(html).toContain('girls');
        expect(html).toContain('Posthumous');
    });

    it('contains the selection process steps', () => {
        expect(html).toContain('Nomination');
        expect(html).toContain('State-Level Screening');
        expect(html).toContain('National Committee');
        expect(html).toContain('Field Verification');
        expect(html).toContain('Republic Day Ceremony');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(7);
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

describe('Geeta Chopra Award Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.gc-hero');
        expect(css).toContain('.gc-section');
        expect(css).toContain('.gc-timeline');
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

describe('Geeta Chopra Award — Awards Landing Page Integration', () => {
    it('is listed as a card on the Awards of India landing page', () => {
        const index = readAwardsLandingPage();
        expect(index).toContain('Geeta Chopra Award');
        expect(index).toContain('geeta-chopra-award-explorer/index.html');
    });

    it('is rendered as an award card with the standard structure', () => {
        const index = readAwardsLandingPage();
        expect(index).toContain('award-card');
        expect(index).toContain('Geeta Chopra Award');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readAwardsLandingPage();
        expect(index).toMatch(/href="..\/geeta-chopra-award-explorer\/index\.html"/);
    });
});
