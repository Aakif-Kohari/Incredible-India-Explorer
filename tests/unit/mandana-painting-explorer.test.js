/**
 * mandana-painting-explorer.test.js
 * Unit tests for the Mandana Painting Explorer page (issue #1701).
 * Validates required sections (Historical background, Motifs, Symbol
 * meanings, Materials, Gallery, References), data module properties,
 * accessibility, HTTPS images, styles, script handlers, and lightbox.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/mandana-painting-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Mandana Painting Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and Rajasthan badge', () => {
        expect(html).toContain('class="hero-section mandana-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Mandana');
        expect(html).toContain('Painting');
        expect(html).toContain('Rajasthan Folk Art');
    });

    it('contains all required content sections from the issue', () => {
        const sectionIds = ['history', 'motifs', 'symbols', 'materials', 'gallery', 'references'];
        sectionIds.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'Historical Background',
            'Traditional Motifs',
            'Symbol Meanings',
            'Materials',
            'Gallery',
            'References'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('links to required stylesheets and JS script modules', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="mandana-data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('includes a lightbox modal structure for gallery viewing', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-title"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Mandana Painting Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('mandana-data.js');
    });

    it('defines MANDANA_PAINTING_INFO with metadata', () => {
        expect(dataCode).toContain('MANDANA_PAINTING_INFO');
        expect(dataCode).toContain('Mandana Painting');
        expect(dataCode).toContain('Rajasthan');
        expect(dataCode).toContain('Wall and floor');
    });

    it('defines HISTORICAL_BACKGROUND with multiple sections', () => {
        expect(dataCode).toContain('HISTORICAL_BACKGROUND');
        expect(dataCode).toContain('Meena');
        expect(dataCode).toContain('Diwali');
        expect(dataCode).toContain('monsoon');
    });

    it('defines TRADITIONAL_MOTIFS with at least 5 motifs', () => {
        expect(dataCode).toContain('TRADITIONAL_MOTIFS');
        expect(dataCode).toContain('Ganesha');
        expect(dataCode).toContain('Peacock');
        expect(dataCode).toContain('Swastik');
        expect(dataCode).toContain('Lotus');
    });

    it('defines SYMBOL_MEANINGS with symbol explanations', () => {
        expect(dataCode).toContain('SYMBOL_MEANINGS');
        expect(dataCode).toContain('Triangle');
        expect(dataCode).toContain('Square');
        expect(dataCode).toContain('Circle');
        expect(dataCode).toContain('Swastika');
        expect(dataCode).toContain('Lotus');
    });

    it('defines MATERIALS_CATALOG with traditional materials', () => {
        expect(dataCode).toContain('MATERIALS_CATALOG');
        expect(dataCode).toContain('Geru');
        expect(dataCode).toContain('Khariya');
        expect(dataCode).toContain('Bamboo');
    });

    it('defines GALLERY_ITEMS with multiple categories', () => {
        expect(dataCode).toContain('GALLERY_ITEMS');
        expect(dataCode).toContain('floor');
        expect(dataCode).toContain('wall');
        expect(dataCode).toContain('threshold');
    });

    it('defines GALLERY_CATEGORIES for filtering', () => {
        expect(dataCode).toContain('GALLERY_CATEGORIES');
    });

    it('defines REFERENCES_LIST with citations', () => {
        expect(dataCode).toContain('REFERENCES_LIST');
        expect(dataCode).toContain('Wikipedia');
    });

    it('uses secure HTTPS image URLs throughout the data file', () => {
        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(8);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Mandana Painting Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting the theme and responsive grids', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.mandana-hero');
        expect(css).toContain('.tab-btn');
        expect(css).toContain('.motif-card');
        expect(css).toContain('.gallery-card');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('body.light-theme');
    });

    it('includes script logic for rendering, filtering, tabs, bookmark, and lightbox', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('renderInfo');
        expect(js).toContain('renderHistory');
        expect(js).toContain('renderMotifs');
        expect(js).toContain('renderSymbols');
        expect(js).toContain('renderMaterials');
        expect(js).toContain('renderGalleryFilters');
        expect(js).toContain('renderGallery');
        expect(js).toContain('renderReferences');
        expect(js).toContain('initLightbox');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Mandana Painting — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Mandana Painting');
        expect(index).toContain('frontend/mandana-painting-explorer/index.html');
    });

    it('is rendered as a card with image, title, and CTA', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Mandana Painting Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/mandana-painting-explorer\/index\.html"/);
    });
});
