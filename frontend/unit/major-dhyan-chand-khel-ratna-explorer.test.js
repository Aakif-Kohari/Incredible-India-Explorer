/**
 * major-dhyan-chand-khel-ratna-explorer.test.js
 * Unit tests for the Major Dhyan Chand Khel Ratna Explorer page.
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
        resolve(__dirname, '../../frontend/major-dhyan-chand-khel-ratna-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Major Dhyan Chand Khel Ratna Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="khelratna-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Major Dhyan Chand');
        expect(html).toContain('Khel Ratna');
        expect(html).toContain("India's Highest Sporting Honour");
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['history', 'renaming', 'eligibility', 'selection', 'categories', 'medal', 'awardees', 'facts', 'gallery'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains the key historical details (inception, renaming, cash prize)', () => {
        expect(html).toContain('1991–92');
        expect(html).toContain('Rajiv Gandhi Khel Ratna');
        expect(html).toContain('6 August 2021');
        expect(html).toContain('₹25 lakh');
        expect(html).toContain('Viswanathan Anand');
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

describe('Major Dhyan Chand Khel Ratna Explorer — Assets', () => {
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

describe('Major Dhyan Chand Khel Ratna — Landing Page Integration', () => {
    it('is listed as a card on the Awards of India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Major Dhyan Chand Khel Ratna');
        expect(index).toContain('../major-dhyan-chand-khel-ratna-explorer/index.html');
    });

    it('matches the existing award card pattern (icon, category, stats, button)', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Khel Ratna Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1200);
        expect(card).toContain('award-icon');
        expect(card).toContain('award-category');
        expect(card).toContain('award-year');
        expect(card).toContain('award-btn');
        expect(card).toContain('class="award-card glass-card"');
    });
});
