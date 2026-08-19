/**
 * vayu-sena-medal-explorer.test.js
 * Unit tests for the Vayu Sena Medal Explorer page.
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
        resolve(__dirname, '../../frontend/vayu-sena-medal-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Vayu Sena Medal Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="vsm-hero-title"');
        expect(html).toContain('Vayu Sena Medal Explorer');
        expect(html).toContain('Indian Air Force Gallantry Honour');
        expect(html).toContain('Instituted:');
        expect(html).toContain('1960');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['history', 'eligibility', 'medal-design', 'air-operations', 'selection', 'awardees', 'timeline', 'facts', 'gallery'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains the key historical and operational details', () => {
        expect(html).toContain('18-Pres/60');
        expect(html).toContain('Sena Medal');
        expect(html).toContain('Nao Sena Medal');
        expect(html).toContain('Operation Safed Sagar');
        expect(html).toContain('Himalayan Eagle');
    });

    it('has a semantic heading hierarchy (single h1, section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(9);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
        expect(imgTags.length).toBeGreaterThanOrEqual(6);
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

describe('Vayu Sena Medal Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.vsm-hero');
    });

    it('includes a valid interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initTabs');
        expect(js).toContain('initRecipientSearch');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Vayu Sena Medal — Landing Page Integration', () => {
    it('is listed as a card on the Awards of India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Vayu Sena Medal');
        expect(index).toContain('../vayu-sena-medal-explorer/index.html');
    });

    it('matches the existing award card pattern (icon, category, stats, button)', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Vayu Sena Medal Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1200);
        expect(card).toContain('award-icon');
        expect(card).toContain('award-category');
        expect(card).toContain('award-year');
        expect(card).toContain('award-btn');
        expect(card).toContain('class="award-card glass-card"');
    });
});
