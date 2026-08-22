/**
 * suchindram-wetland-explorer.test.js
 * Unit tests for Suchindram Wetland Explorer page.
 * Validates required sections (History, Ramsar Site, Freshwater Wetland,
 * Migratory Birds, Aquatic Biodiversity, Conservation, Interactive Map, Gallery),
 * dataset properties, accessibility, HTTPS images, styling, and search index registration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/suchindram-wetland-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Suchindram Wetland Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and Ramsar kicker badge', () => {
        expect(html).toContain('class="suchindram-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Suchindram');
        expect(html).toContain('Wetland');
        expect(html).toContain('Ramsar Site No. 2484');
    });

    it('contains all required content sections from user prompt', () => {
        const sectionIds = [
            'history',
            'ramsar',
            'freshwater',
            'birds',
            'biodiversity',
            'conservation',
            'map',
            'gallery'
        ];
        sectionIds.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'History',
            'Ramsar Site',
            'Freshwater Wetland',
            'Migratory Birds',
            'Biodiversity',
            'Conservation',
            'Interactive Map',
            'Gallery'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(7);
    });

    it('links to required stylesheets and JS script modules', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="suchindram.css"');
        expect(html).toContain('src="suchindram-data.js"');
        expect(html).toContain('src="suchindram.js"');
    });

    it('includes a lightbox modal structure for image gallery viewing', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Suchindram Wetland Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('suchindram-data.js');
    });

    it('defines SUCHINDRAM_INFO with key Ramsar Site and geographical metadata', () => {
        expect(dataCode).toContain('SUCHINDRAM_INFO');
        expect(dataCode).toContain('Suchindram Theroor Wetland Complex');
        expect(dataCode).toContain('Kanyakumari District, Tamil Nadu');
        expect(dataCode).toContain('94.23 hectares');
        expect(dataCode).toContain('2484');
        expect(dataCode).toContain('2002');
        expect(dataCode).toContain('2022');
    });

    it('defines SUCHINDRAM_SECTIONS covering History, Ramsar Site, Freshwater Wetland, Biodiversity, and Conservation', () => {
        expect(dataCode).toContain('SUCHINDRAM_SECTIONS');
        expect(dataCode).toContain('history');
        expect(dataCode).toContain('ramsarSite');
        expect(dataCode).toContain('freshwaterWetland');
        expect(dataCode).toContain('aquaticBiodiversity');
        expect(dataCode).toContain('conservation');
    });

    it('includes bird species catalog with scientific names and IUCN statuses', () => {
        expect(dataCode).toContain('BIRD_SPECIES');
        expect(dataCode).toContain('Spot-billed Pelican');
        expect(dataCode).toContain('Pelecanus philippensis');
        expect(dataCode).toContain('Bronze-winged Jacana');
        expect(dataCode).toContain('Metopidius indicus');
        expect(dataCode).toContain('Painted Stork');
        expect(dataCode).toContain('Northern Pintail');
        expect(dataCode).toContain('Glossy Ibis');
        expect(dataCode).toContain('Garganey');
    });

    it('includes map hotspots and gallery images with captions', () => {
        expect(dataCode).toContain('MAP_HOTSPOTS');
        expect(dataCode).toContain('GALLERY_IMAGES');
        expect(dataCode).toContain('Suchindram Temple View Entrance');
        expect(dataCode).toContain('Theroor Feeder Channel');
    });

    it('uses secure HTTPS image URLs throughout the data file', () => {
        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(6);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Suchindram Wetland Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting theme switching and layouts', () => {
        const css = readExplorerFile('suchindram.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.suchindram-hero');
        expect(css).toContain('.suchindram-tabs-bar');
        expect(css).toContain('.species-card');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('[data-theme="light"]');
    });

    it('includes script logic for rendering, filtering, tabs, map hotspots, and lightbox', () => {
        const js = readExplorerFile('suchindram.js');
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

describe('Suchindram Wetland Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Suchindram Wetland Explorer');
        expect(searchIndex).toContain('frontend/suchindram-wetland-explorer/index.html');
        expect(searchIndex).toContain('Ramsar Site No. 2484');
    });
});
