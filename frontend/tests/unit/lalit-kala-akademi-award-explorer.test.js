/**
 * lalit-kala-akademi-award-explorer.test.js
 * Unit tests for the Lalit Kala Akademi Award Explorer page.
 * Validates required sections, tab navigation, accessibility, image URLs,
 * and landing page card integration on the Awards of India landing page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/lalit-kala-akademi-award-explorer', file),
        'utf-8'
    );
}

function readRootIndex() {
    return readFileSync(resolve(__dirname, '../../index.html'), 'utf-8');
}

describe('Lalit Kala Akademi Award Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="lka-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Lalit Kala Akademi');
    });

    it('contains all required content sections', () => {
        const sections = ['history', 'eligibility', 'painting', 'sculpture', 'printmaking', 'ceramics', 'selection', 'awardees', 'gallery'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required award categories as tab buttons', () => {
        ['Painting', 'Sculpture', 'Printmaking', 'Ceramics'].forEach(category => {
            expect(html).toContain(category);
        });
    });

    it('has a semantic heading hierarchy (single h1, section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(9);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
        expect(imgTags.length).toBeGreaterThanOrEqual(8);
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

describe('Lalit Kala Akademi Award Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
    });

    it('includes a valid interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initTabNavigation');
        expect(js).toContain('activateTab');
        expect(js).toContain('initCountUp');
        expect(js).toContain('initTyping');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Lalit Kala Akademi Award — Landing Page Integration', () => {
    it('is listed as a card on the Awards of India Explorer landing page', () => {
        const index = readRootIndex();
        expect(index).toContain('Lalit Kala Akademi Award');
        expect(index).toContain("frontend/lalit-kala-akademi-award-explorer/index.html");
    });

    it('matches the existing award card pattern (icon, category, stats, button)', () => {
        const index = readRootIndex();
        const cardStart = index.indexOf("Lalit Kala Akademi Award Card");
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 900);
        expect(card).toContain('award-card-icon');
        expect(card).toContain('award-category');
        expect(card).toContain('award-stats');
        expect(card).toContain('award-btn');
        expect(card).toContain('class="award-card glass-card"');
    });
});
