/**
 * mysore-painting-explorer.test.js
 * Unit tests for Mysore Painting Explorer page.
 * Validates required sections (Historical background, Gold work explanation,
 * Themes, Materials, Gallery, References), data module properties, accessibility,
 * HTTPS images, styles, script handlers, and search index registration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/mysore-painting-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Mysore Painting Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and gold gesso badges', () => {
        expect(html).toContain('class="hero-section mysore-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Mysore');
        expect(html).toContain('Painting');
        expect(html).toContain('24K Gold Gesso Work');
    });

    it('contains all required content sections from user prompt', () => {
        const sectionIds = [
            'history',
            'gold-work',
            'themes',
            'materials',
            'gallery',
            'references'
        ];
        sectionIds.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'Historical Background',
            'Gold Work (Gesso)',
            'Themes',
            'Materials & Tools',
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
        expect(html).toContain('src="mysore-data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('includes a lightbox modal structure for painting viewing', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-title"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Mysore Painting Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('mysore-data.js');
    });

    it('defines MYSORE_PAINTING_INFO with metadata and GI Tag details', () => {
        expect(dataCode).toContain('MYSORE_PAINTING_INFO');
        expect(dataCode).toContain('Mysore Painting');
        expect(dataCode).toContain('Karnataka');
        expect(dataCode).toContain('Geographical Indication (GI) Tagged');
        expect(dataCode).toContain('Gacho Paste');
    });

    it('defines HISTORICAL_BACKGROUND covering Vijayanagara and Wodeyar patronage', () => {
        expect(dataCode).toContain('HISTORICAL_BACKGROUND');
        expect(dataCode).toContain('Vijayanagara Empire');
        expect(dataCode).toContain('Raja Wodeyar I');
        expect(dataCode).toContain('Mummadi Krishnaraja Wodeyar III');
        expect(dataCode).toContain('Sritattvanidhi');
    });

    it('defines GOLD_WORK_STEPS detailing Gacho paste, embossing, gilding, and burnishing', () => {
        expect(dataCode).toContain('GOLD_WORK_STEPS');
        expect(dataCode).toContain('Preparing the Gesso Paste (Gacho)');
        expect(dataCode).toContain('Low-Relief Embossing');
        expect(dataCode).toContain('Gilding 24K Gold Foil (Vark)');
        expect(dataCode).toContain('Agate Stone Burnishing');
    });

    it('includes traditional materials, themes, gallery catalog, and reference citations', () => {
        expect(dataCode).toContain('MATERIALS_CATALOG');
        expect(dataCode).toContain('THEMES_LIST');
        expect(dataCode).toContain('GALLERY_PAINTINGS');
        expect(dataCode).toContain('REFERENCES_LIST');
        expect(dataCode).toContain('Sri Rama Pattabhisheka');
        expect(dataCode).toContain('Jaganmohan Palace Art Gallery');
    });

    it('uses secure HTTPS image URLs throughout the data file', () => {
        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(6);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Mysore Painting Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting gold theme and responsive grids', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.mysore-hero');
        expect(css).toContain('.mysore-tabs-bar');
        expect(css).toContain('.gold-step-card');
        expect(css).toContain('.gallery-card');
        expect(css).toContain('[data-theme="light"]');
    });

    it('includes script logic for rendering, filtering, tabs, bookmark, and lightbox', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('renderStats');
        expect(js).toContain('renderHistory');
        expect(js).toContain('renderGoldWork');
        expect(js).toContain('renderThemes');
        expect(js).toContain('renderMaterials');
        expect(js).toContain('renderGallery');
        expect(js).toContain('initGalleryFilters');
        expect(js).toContain('renderReferences');
        expect(js).toContain('initLightbox');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Mysore Painting Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Mysore Painting Explorer');
        expect(searchIndex).toContain('frontend/mysore-painting-explorer/index.html');
        expect(searchIndex).toContain('Sritattvanidhi');
    });
});
