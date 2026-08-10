/**
 * gingee-fort-explorer.test.js
 * Unit tests for the Gingee Fort Explorer page.
 * Validates required sections (Overview, History, Builder, Architecture, Three Hill Forts,
 * Strategic Importance, Interesting Facts, Image Gallery), data module, accessibility structure,
 * stylesheets, script logic, and search index integration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/gingee-fort-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Gingee Fort Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and Troy of the East kicker', () => {
        expect(html).toContain('class="gingee-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Gingee Fort Explorer');
        expect(html).toContain('Troy of the East');
    });

    it('contains all required content sections specified in user prompt', () => {
        const sectionIds = [
            'overview',
            'history',
            'builder',
            'architecture',
            'three-hills',
            'strategic',
            'facts',
            'gallery'
        ];
        sectionIds.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required navigation tab buttons', () => {
        const tabs = [
            'Overview',
            'History',
            'Builder & Rulers',
            'Architecture',
            'Three Hill Forts',
            'Strategic Importance',
            'Interesting Facts',
            'Image Gallery'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('maintains proper semantic heading hierarchy (1 h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
    });

    it('links to external CSS stylesheets and JS script modules', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="gingee-fort.css"');
        expect(html).toContain('src="gingee-data.js"');
        expect(html).toContain('src="gingee-fort.js"');
    });

    it('includes lightbox modal markup for image viewing', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Gingee Fort Explorer — Data Module (gingee-data.js)', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('gingee-data.js');
    });

    it('defines GINGEE_INFO with accurate geographical and historical metadata', () => {
        expect(dataCode).toContain('GINGEE_INFO');
        expect(dataCode).toContain('Gingee Fort');
        expect(dataCode).toContain('Troy of the East');
        expect(dataCode).toContain('Villupuram District, Tamil Nadu');
        expect(dataCode).toContain('Ananta Konar');
        expect(dataCode).toContain('Konar Dynasty');
    });

    it('defines GINGEE_SECTIONS covering all prompt requirements', () => {
        expect(dataCode).toContain('GINGEE_SECTIONS');
        expect(dataCode).toContain('overview');
        expect(dataCode).toContain('history');
        expect(dataCode).toContain('builder');
        expect(dataCode).toContain('architecture');
        expect(dataCode).toContain('three-hills');
        expect(dataCode).toContain('strategic');
        expect(dataCode).toContain('facts');
        expect(dataCode).toContain('gallery');
    });

    it('defines BUILDERS_LIST with key historical figures', () => {
        expect(dataCode).toContain('BUILDERS_LIST');
        expect(dataCode).toContain('Ananta Konar');
        expect(dataCode).toContain('Tubaki Krishnappa Nayak');
        expect(dataCode).toContain('Chhatrapati Shivaji Maharaj');
        expect(dataCode).toContain('Rajaram I');
        expect(dataCode).toContain('Raja Desingu');
    });

    it('defines THREE_HILLS detailing Rajagiri, Krishnagiri, and Chandrayandurg', () => {
        expect(dataCode).toContain('THREE_HILLS');
        expect(dataCode).toContain('Rajagiri');
        expect(dataCode).toContain('Krishnagiri');
        expect(dataCode).toContain('Chandrayandurg');
    });

    it('defines ARCH_FEATURES detailing Kalyana Mahal, Granaries, and Drawbridge', () => {
        expect(dataCode).toContain('ARCH_FEATURES');
        expect(dataCode).toContain('Kalyana Mahal');
        expect(dataCode).toContain('Chasm Drawbridge');
        expect(dataCode).toContain('Venkataramana Temple');
    });

    it('defines TIMELINE_EVENTS, INTERESTING_FACTS, and GALLERY_IMAGES with HTTPS image URLs', () => {
        expect(dataCode).toContain('TIMELINE_EVENTS');
        expect(dataCode).toContain('INTERESTING_FACTS');
        expect(dataCode).toContain('GALLERY_IMAGES');

        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(6);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Gingee Fort Explorer — Styles & Scripts', () => {
    it('contains non-empty CSS supporting dark/light themes and glassmorphism', () => {
        const css = readExplorerFile('gingee-fort.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.gingee-hero');
        expect(css).toContain('.gingee-tabs-wrapper');
        expect(css).toContain('.hill-card');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('body.light-theme');
    });

    it('contains JS logic for rendering components and handling lightbox', () => {
        const js = readExplorerFile('gingee-fort.js');
        expect(js).toContain('initTabs');
        expect(js).toContain('renderOverview');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('renderBuilders');
        expect(js).toContain('renderThreeHills');
        expect(js).toContain('renderArchitecture');
        expect(js).toContain('renderFacts');
        expect(js).toContain('renderGallery');
        expect(js).toContain('initLightbox');
    });
});

describe('Gingee Fort Explorer — Search Index Registration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Gingee Fort Explorer');
        expect(searchIndex).toContain('frontend/gingee-fort-explorer/index.html');
    });
});
