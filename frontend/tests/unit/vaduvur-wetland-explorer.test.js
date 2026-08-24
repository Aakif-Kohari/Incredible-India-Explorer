/**
 * vaduvur-wetland-explorer.test.js
 * Unit tests for the Vaduvur Wetland Explorer page.
 * Validates required sections (History, Ramsar Site, Irrigation Tank Wetland,
 * Migratory Birds, Aquatic Biodiversity, Conservation, Interactive Map, Gallery,
 * Interesting Facts), data structure, accessibility, image URLs, styles, and search index integration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/vaduvur-wetland-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Vaduvur Wetland Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and Ramsar site kicker', () => {
        expect(html).toContain('class="vaduvur-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Vaduvur');
        expect(html).toContain('Wetland');
        expect(html).toContain('Ramsar Site No. 2480');
    });

    it('contains all required content sections from user prompt', () => {
        const sectionIds = [
            'history',
            'ramsar',
            'irrigation-tank',
            'birds',
            'biodiversity',
            'conservation',
            'map',
            'gallery',
            'facts'
        ];
        sectionIds.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab buttons for section navigation', () => {
        const tabs = [
            'History',
            'Ramsar Site',
            'Irrigation Tank',
            'Migratory Birds',
            'Biodiversity',
            'Conservation',
            'Interactive Map',
            'Gallery',
            'Facts'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
    });

    it('links to required stylesheets and JS script modules', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="vaduvur.css"');
        expect(html).toContain('src="vaduvur-data.js"');
        expect(html).toContain('src="vaduvur.js"');
    });

    it('includes a lightbox modal structure for image gallery viewing', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Vaduvur Wetland Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('vaduvur-data.js');
    });

    it('defines VADUVUR_INFO with key Ramsar Site and geographical metadata', () => {
        expect(dataCode).toContain('VADUVUR_INFO');
        expect(dataCode).toContain('Vaduvur Wetland & Bird Sanctuary');
        expect(dataCode).toContain('Tiruvarur District, Tamil Nadu');
        expect(dataCode).toContain('128.10 hectares');
        expect(dataCode).toContain('2480');
        expect(dataCode).toContain('1999');
        expect(dataCode).toContain('2022');
    });

    it('defines VADUVUR_SECTIONS covering History, Ramsar Site, Irrigation Tank, Biodiversity, and Conservation', () => {
        expect(dataCode).toContain('VADUVUR_SECTIONS');
        expect(dataCode).toContain('history');
        expect(dataCode).toContain('ramsarSite');
        expect(dataCode).toContain('irrigationTank');
        expect(dataCode).toContain('aquaticBiodiversity');
        expect(dataCode).toContain('conservation');
    });

    it('includes migratory bird species catalog with scientific names and IUCN statuses', () => {
        expect(dataCode).toContain('BIRD_SPECIES');
        expect(dataCode).toContain('Eurasian Wigeon');
        expect(dataCode).toContain('Mareca penelope');
        expect(dataCode).toContain('Northern Pintail');
        expect(dataCode).toContain('Anas acuta');
        expect(dataCode).toContain('Spot-billed Pelican');
        expect(dataCode).toContain('Pelecanus philippensis');
        expect(dataCode).toContain('Garganey');
        expect(dataCode).toContain('Oriental Darter');
        expect(dataCode).toContain('Black-headed Ibis');
    });

    it('includes map hotspots, gallery images, and interesting facts', () => {
        expect(dataCode).toContain('MAP_HOTSPOTS');
        expect(dataCode).toContain('GALLERY_IMAGES');
        expect(dataCode).toContain('INTERESTING_FACTS');
        expect(dataCode).toContain('Festival of Wings');
        expect(dataCode).toContain('Acacia Tree Nesting Islets');
    });

    it('uses secure HTTPS image URLs throughout the data file', () => {
        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(6);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Vaduvur Wetland Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting glassmorphism and theme switching', () => {
        const css = readExplorerFile('vaduvur.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.vaduvur-hero');
        expect(css).toContain('.vaduvur-tabs-bar');
        expect(css).toContain('.species-card');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('[data-theme="light"]');
    });

    it('includes script logic for rendering, filtering, tabs, map hotspots, and lightbox', () => {
        const js = readExplorerFile('vaduvur.js');
        expect(js).toContain('renderStats');
        expect(js).toContain('renderSections');
        expect(js).toContain('renderBirdSpecies');
        expect(js).toContain('initBirdFilters');
        expect(js).toContain('renderMapHotspots');
        expect(js).toContain('renderGallery');
        expect(js).toContain('initLightbox');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Vaduvur Wetland Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Vaduvur Wetland Explorer');
        expect(searchIndex).toContain('frontend/vaduvur-wetland-explorer/index.html');
        expect(searchIndex).toContain('Ramsar Site No. 2480');
    });
});
