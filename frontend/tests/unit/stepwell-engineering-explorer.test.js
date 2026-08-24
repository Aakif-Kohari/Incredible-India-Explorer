/**
 * stepwell-engineering-explorer.test.js
 * Unit tests for the Stepwell Engineering Explorer page.
 * Validates required sections, key engineering content, accessibility,
 * and landing page card integration on the Indian Stepwells page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/stepwell-engineering-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/stepwells/stepwells.html'),
        'utf-8'
    );
}

describe('Stepwell Engineering Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="stepwell-eng-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Stepwell Engineering');
        expect(html).toContain('Ancient India');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'structure', 'seasons', 'principles', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Historical', 'Structural', 'Seasonal', 'Engineering', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key historical and engineering details', () => {
        expect(html).toContain('Rani ki Vav');
        expect(html).toContain('Chand Baori');
        expect(html).toContain('aquifer');
        expect(html).toContain('monsoon');
        expect(html).toContain('Gujarat');
        expect(html).toContain('UNESCO');
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

describe('Stepwell Engineering Explorer — Assets', () => {
    it('includes a non-empty stylesheet with diagram and section styles', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.stepwell-eng-hero');
        expect(css).toContain('.swe-diagram');
        expect(css).toContain('.stepwell-eng-references');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('stepwell-eng-modal');
        expect(js).toContain('app:route-changed');
    });
});

describe('Stepwell Engineering — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Indian Stepwells landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Stepwell Engineering Explorer');
        expect(index).toContain('../stepwell-engineering-explorer/index.html');
        expect(index).toContain('stepwell-eng-card');
    });

    it('matches the existing card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('stepwell-engineering-explorer');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart - 400, cardStart + 400);
        expect(card).toContain('section-badge');
        expect(card).toContain('stepwell-eng-card-btn');
        expect(card).toContain('water machine');
    });
});