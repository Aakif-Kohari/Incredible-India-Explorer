/**
 * sahitya-akademi-award-explorer.test.js
 * Unit tests for the Sahitya Akademi Award Explorer page.
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
        resolve(__dirname, '../../frontend/sahitya-akademi-award-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Sahitya Akademi Award Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="sah-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Sahitya Akademi Award');
        expect(html).toContain('National Academy of Letters');
        expect(html).toContain('First Award Conferred');
        expect(html).toContain('1955');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['history', 'year-instituted', 'eligibility', 'languages', 'selection', 'categories', 'awardees', 'timeline', 'facts', 'gallery'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required award categories as tab buttons', () => {
        ['History', 'Year Instituted', 'Eligibility', 'Languages', 'Selection', 'Categories', 'Awardees', 'Timeline', 'Facts', 'Gallery'].forEach(category => {
            expect(html).toContain(category);
        });
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('15 December 1952');
        expect(html).toContain('12 March 1954');
        expect(html).toContain('Jawaharlal Nehru');
        expect(html).toContain('S. Radhakrishnan');
        expect(html).toContain('Satyajit Ray');
        expect(html).toContain('1,00,000');
        expect(html).toContain('Rabindra Bhavan');
    });

    it('covers the 24 recognized languages', () => {
        ['Assamese', 'Bengali', 'Hindi', 'Kannada', 'Malayalam', 'Tamil', 'Telugu', 'Urdu', 'English', 'Rajasthani', 'Sanskrit', 'Santhali'].forEach(language => {
            expect(html).toContain(language);
        });
    });

    it('has a semantic heading hierarchy (single h1, section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(10);
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

describe('Sahitya Akademi Award Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.sah-hero');
        expect(css).toContain('.timeline-container');
        expect(css).toContain('.language-chip');
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

describe('Sahitya Akademi Award — Landing Page Integration', () => {
    it('is listed as a card on the Awards of India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Sahitya Akademi Award');
        expect(index).toContain('../sahitya-akademi-award-explorer/index.html');
    });

    it('matches the existing award card pattern (icon, category, stats, button)', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Sahitya Akademi Award Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1200);
        expect(card).toContain('award-icon');
        expect(card).toContain('award-category');
        expect(card).toContain('award-year');
        expect(card).toContain('award-btn');
        expect(card).toContain('class="award-card glass-card"');
    });
});
