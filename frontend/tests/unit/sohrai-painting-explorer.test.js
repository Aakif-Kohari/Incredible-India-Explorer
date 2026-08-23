/**
 * sohrai-painting-explorer.test.js
 * Unit tests for the Sohrai Painting Explorer page (issue #1699).
 * Validates required sections (Historical background, Natural
 * pigments, Traditional motifs, Wall Art Visualizer, Gallery,
 * References), data module properties, accessibility, HTTPS images,
 * styles, script handlers, the canvas visualizer setup, and the
 * lightbox.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/sohrai-painting-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Sohrai Painting Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and Jharkhand badge', () => {
        expect(html).toContain('class="hero-section sohrai-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Sohrai');
        expect(html).toContain('Painting');
        expect(html).toContain('Jharkhand Tribal Wall Art');
    });

    it('contains all required content sections from the issue', () => {
        const sectionIds = ['history', 'pigments', 'motifs', 'visualizer', 'gallery', 'references'];
        sectionIds.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'Historical Background',
            'Natural Pigments',
            'Traditional Motifs',
            'Wall Art Visualizer',
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
        expect(html).toContain('src="sohrai-data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('includes a lightbox modal structure for gallery viewing', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-title"');
        expect(html).toContain('id="lightbox-caption"');
    });

    it('includes a canvas element for the wall art visualizer', () => {
        expect(html).toContain('id="sohrai-canvas"');
        expect(html).toContain('<canvas');
    });

    it('includes visualizer toolbar controls (tool, palette, brush, clear, save)', () => {
        expect(html).toContain('id="tool-select"');
        expect(html).toContain('id="color-palette"');
        expect(html).toContain('id="brush-size"');
        expect(html).toContain('id="btn-clear"');
        expect(html).toContain('id="btn-save"');
    });
});

describe('Sohrai Painting Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('sohrai-data.js');
    });

    it('defines SOHRAI_PAINTING_INFO with metadata and GI tag', () => {
        expect(dataCode).toContain('SOHRAI_PAINTING_INFO');
        expect(dataCode).toContain('Sohrai Painting');
        expect(dataCode).toContain('Jharkhand');
        expect(dataCode).toContain('GI-tagged');
    });

    it('defines HISTORICAL_BACKGROUND covering tribal origins and cattle festival', () => {
        expect(dataCode).toContain('HISTORICAL_BACKGROUND');
        expect(dataCode).toContain('Kurmi');
        expect(dataCode).toContain('cattle');
        expect(dataCode).toContain('harvest');
        expect(dataCode).toContain('Isko');
    });

    it('defines NATURAL_PIGMENTS with earth colours', () => {
        expect(dataCode).toContain('NATURAL_PIGMENTS');
        expect(dataCode).toContain('Pila Mitti');
        expect(dataCode).toContain('Lal Mitti');
        expect(dataCode).toContain('Kaala Mitti');
        expect(dataCode).toContain('Safed Mitti');
    });

    it('defines TRADITIONAL_MOTIFS with at least 5 motifs', () => {
        expect(dataCode).toContain('TRADITIONAL_MOTIFS');
        expect(dataCode).toContain('Cattle');
        expect(dataCode).toContain('Elephant');
        expect(dataCode).toContain('Peacock');
        expect(dataCode).toContain('Tree of Life');
        expect(dataCode).toContain('Sun');
    });

    it('defines GALLERY_ITEMS with categories', () => {
        expect(dataCode).toContain('GALLERY_ITEMS');
        expect(dataCode).toContain('wall');
        expect(dataCode).toContain('canvas');
    });

    it('defines GALLERY_CATEGORIES for filtering', () => {
        expect(dataCode).toContain('GALLERY_CATEGORIES');
    });

    it('defines REFERENCES_LIST with citations', () => {
        expect(dataCode).toContain('REFERENCES_LIST');
        expect(dataCode).toContain('Wikipedia');
        expect(dataCode).toContain('GI');
    });

    it('uses secure HTTPS image URLs throughout the data file', () => {
        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(8);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Sohrai Painting Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting the theme and responsive grids', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.sohrai-hero');
        expect(css).toContain('.tab-btn');
        expect(css).toContain('.pigment-card');
        expect(css).toContain('.gallery-card');
        expect(css).toContain('.visualizer-container');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('[data-theme="light"]');
    });

    it('includes script logic for rendering, filtering, tabs, bookmark, visualizer, and lightbox', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('renderInfo');
        expect(js).toContain('renderHistory');
        expect(js).toContain('renderPigments');
        expect(js).toContain('renderMotifs');
        expect(js).toContain('renderGalleryFilters');
        expect(js).toContain('renderGallery');
        expect(js).toContain('renderReferences');
        expect(js).toContain('initLightbox');
        expect(js).toContain('initVisualizer');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });

    it('includes canvas drawing functions for brush and motif stamps', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('startDraw');
        expect(js).toContain('draw');
        expect(js).toContain('endDraw');
        expect(js).toContain('stampMotif');
        expect(js).toContain('drawCowMotif');
        expect(js).toContain('drawElephantMotif');
        expect(js).toContain('drawPeacockMotif');
        expect(js).toContain('drawTreeMotif');
        expect(js).toContain('drawFlowerMotif');
        expect(js).toContain('drawSunMotif');
    });
});

describe('Sohrai Painting — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Sohrai Painting');
        expect(index).toContain('frontend/sohrai-painting-explorer/index.html');
    });

    it('is rendered as a card with image, title, and CTA', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Sohrai Painting Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/sohrai-painting-explorer\/index\.html"/);
    });
});
