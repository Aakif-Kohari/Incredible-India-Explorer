/**
 * kerala-mural-explorer.test.js
 * Unit tests for the Kerala Mural Explorer page (issue #1697).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kerala-mural-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Kerala Mural Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and Kerala badge', () => {
        expect(html).toContain('class="hero-section kerala-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Kerala');
        expect(html).toContain('Murals');
        expect(html).toContain('Kerala Temple Art');
    });

    it('contains all required content sections from the issue', () => {
        const sectionIds = ['history', 'pigments', 'temples', 'visualizer', 'gallery', 'references'];
        sectionIds.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = ['History', 'Pigment Guide', 'Temple Murals', 'Mural Visualizer', 'Gallery', 'References'];
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
        expect(html).toContain('src="kerala-data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('includes a lightbox modal structure for gallery viewing', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-title"');
        expect(html).toContain('id="lightbox-caption"');
    });

    it('includes a canvas element for the mural visualizer', () => {
        expect(html).toContain('id="kerala-canvas"');
        expect(html).toContain('<canvas');
    });

    it('includes visualizer toolbar controls', () => {
        expect(html).toContain('id="tool-select"');
        expect(html).toContain('id="color-palette"');
        expect(html).toContain('id="brush-size"');
        expect(html).toContain('id="btn-clear"');
        expect(html).toContain('id="btn-save"');
    });
});

describe('Kerala Mural Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('kerala-data.js');
    });

    it('defines KERALA_MURAL_INFO with metadata', () => {
        expect(dataCode).toContain('KERALA_MURAL_INFO');
        expect(dataCode).toContain('Kerala Mural Painting');
        expect(dataCode).toContain('Kerala');
        expect(dataCode).toContain('Panchavarna');
    });

    it('defines HISTORICAL_BACKGROUND covering Bhakti movement and Panchavarna', () => {
        expect(dataCode).toContain('HISTORICAL_BACKGROUND');
        expect(dataCode).toContain('Bhakti');
        expect(dataCode).toContain('Panchavarna');
        expect(dataCode).toContain('Mattancherry');
    });

    it('defines NATURAL_PIGMENTS with five colours', () => {
        expect(dataCode).toContain('NATURAL_PIGMENTS');
        expect(dataCode).toContain('Sindhoora');
        expect(dataCode).toContain('Manjal');
        expect(dataCode).toContain('Ilappullu');
        expect(dataCode).toContain('Kari');
        expect(dataCode).toContain('Safed');
    });

    it('defines TEMPLE_MURALS with famous temples', () => {
        expect(dataCode).toContain('TEMPLE_MURALS');
        expect(dataCode).toContain('Mattancherry');
        expect(dataCode).toContain('Guruvayur');
        expect(dataCode).toContain('Ettumanoor');
    });

    it('defines GALLERY_ITEMS with categories', () => {
        expect(dataCode).toContain('GALLERY_ITEMS');
        expect(dataCode).toContain('shiva');
        expect(dataCode).toContain('vishnu');
        expect(dataCode).toContain('goddess');
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

describe('Kerala Mural Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting the theme and responsive grids', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.kerala-hero');
        expect(css).toContain('.tab-btn');
        expect(css).toContain('.pigment-card');
        expect(css).toContain('.temple-card');
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
        expect(js).toContain('renderTemples');
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
        expect(js).toContain('drawGaneshaMotif');
        expect(js).toContain('drawLotusMotif');
        expect(js).toContain('drawSunMotif');
        expect(js).toContain('drawFishMotif');
        expect(js).toContain('drawBorderPattern');
    });
});

describe('Kerala Mural — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Kerala Mural');
        expect(index).toContain('frontend/kerala-mural-explorer/index.html');
    });

    it('is rendered as a card with image, title, and CTA', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Kerala Mural Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/kerala-mural-explorer\/index\.html"/);
    });
});
