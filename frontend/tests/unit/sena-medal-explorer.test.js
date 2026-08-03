/**
 * sena-medal-explorer.test.js
 * Unit tests for the Sena Medal Explorer page.
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
        resolve(__dirname, '../../frontend/sena-medal-explorer', file),
        'utf-8'
    );
}

function readRootIndex() {
    return readFileSync(resolve(__dirname, '../../index.html'), 'utf-8');
}

describe('Sena Medal Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="sm-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Sena');
        expect(html).toContain('Medal');
    });

    it('contains all required content sections', () => {
        const sections = ['history', 'eligibility', 'design', 'types', 'selection', 'recipients', 'timeline', 'gallery'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required award types as tab buttons', () => {
        ['Gallantry', 'Devotion to Duty', 'Bar to Sena Medal'].forEach(type => {
            expect(html).toContain(type);
        });
    });

    it('has a semantic heading hierarchy (single h1, section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
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

describe('Sena Medal Explorer — Assets', () => {
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

describe('Sena Medal — Landing Page Integration', () => {
    it('is listed as a card on the Awards of India Explorer landing page', () => {
        const index = readRootIndex();
        expect(index).toContain('Sena Medal');
        expect(index).toContain("frontend/sena-medal-explorer/index.html");
    });

    it('matches the existing award card pattern (icon, category, stats, button)', () => {
        const index = readRootIndex();
        const cardStart = index.indexOf("Sena Medal Card");
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1000);
        expect(card).toContain('award-card-icon');
        expect(card).toContain('award-category');
        expect(card).toContain('award-stats');
        expect(card).toContain('award-btn');
        expect(card).toContain('class="award-card glass-card"');
    });
});
