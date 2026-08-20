/**
 * jawaharlal-nehru-explorer.test.js
 * Unit tests for the Jawaharlal Nehru Explorer page.
 * Validates required sections (Biography, Interactive timeline, Major movements,
 * Prison years, Historic speeches, Gallery, References), data module properties,
 * accessibility, HTTPS images, styles, script logic, and search index registration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/jawaharlal-nehru-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Jawaharlal Nehru Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and leadership kickers', () => {
        expect(html).toContain('class="hero-section jn-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Jawaharlal');
        expect(html).toContain('Nehru');
        expect(html).toContain('First Prime Minister of India');
    });

    it('contains all required content sections from user prompt', () => {
        const sectionIds = [
            'biography',
            'timeline',
            'movements',
            'prison-years',
            'speeches',
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
            'Biography',
            'Interactive Timeline',
            'Major Movements',
            'Prison Years',
            'Historic Speeches',
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
        expect(h2Count).toBeGreaterThanOrEqual(7);
    });

    it('links to required stylesheets and JS script modules', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="nehru-data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('includes a lightbox modal structure for historic gallery photos', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Jawaharlal Nehru Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('nehru-data.js');
    });

    it('defines NEHRU_INFO with biographical metadata and quick stats', () => {
        expect(dataCode).toContain('NEHRU_INFO');
        expect(dataCode).toContain('Jawaharlal Nehru');
        expect(dataCode).toContain('14 November 1889');
        expect(dataCode).toContain('Allahabad');
        expect(dataCode).toContain('Harrow School');
        expect(dataCode).toContain('Trinity College');
    });

    it('defines BIOGRAPHY_DATA, TIMELINE_DATA, and MAJOR_MOVEMENTS_DATA', () => {
        expect(dataCode).toContain('BIOGRAPHY_DATA');
        expect(dataCode).toContain('TIMELINE_DATA');
        expect(dataCode).toContain('MAJOR_MOVEMENTS_DATA');
        expect(dataCode).toContain('Lahore Congress & Purna Swaraj');
        expect(dataCode).toContain('Pratapgarh Kisan Agitation');
        expect(dataCode).toContain('Quit India Movement');
    });

    it('defines PRISON_YEARS_DATA with 9 jail terms and books written in jail', () => {
        expect(dataCode).toContain('PRISON_YEARS_DATA');
        expect(dataCode).toContain('Glimpses of World History');
        expect(dataCode).toContain('The Discovery of India');
        expect(dataCode).toContain('An Autobiography');
        expect(dataCode).toContain('3,259 Days');
        expect(dataCode).toContain('Ahmednagar Fort');
    });

    it('defines HISTORIC_SPEECHES_DATA featuring Tryst with Destiny and Gandhi Eulogy', () => {
        expect(dataCode).toContain('HISTORIC_SPEECHES_DATA');
        expect(dataCode).toContain('Tryst with Destiny');
        expect(dataCode).toContain('The Light Has Gone Out of Our Lives');
        expect(dataCode).toContain('Purna Swaraj Presidential Address');
        expect(dataCode).toContain('Temples of Modern India');
    });

    it('includes gallery items and references data', () => {
        expect(dataCode).toContain('GALLERY_DATA');
        expect(dataCode).toContain('REFERENCES_DATA');
        expect(dataCode).toContain('Selected Works of Jawaharlal Nehru');
        expect(dataCode).toContain('Prime Ministers');
    });

    it('uses secure HTTPS image URLs throughout the data file', () => {
        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(6);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Jawaharlal Nehru Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting themes and timeline layouts', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.jn-hero');
        expect(css).toContain('.jn-tabs-bar');
        expect(css).toContain('.timeline-track');
        expect(css).toContain('.speech-card');
        expect(css).toContain('[data-theme="light"]');
    });

    it('includes script logic for rendering, filtering, timeline, speeches, and lightbox', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('renderStats');
        expect(js).toContain('renderBiography');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('renderMovements');
        expect(js).toContain('renderPrisonYears');
        expect(js).toContain('renderSpeeches');
        expect(js).toContain('renderGallery');
        expect(js).toContain('initGalleryFilters');
        expect(js).toContain('initLightbox');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Jawaharlal Nehru Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Jawaharlal Nehru Explorer');
        expect(searchIndex).toContain('frontend/jawaharlal-nehru-explorer/index.html');
        expect(searchIndex).toContain('Purna Swaraj');
    });
});
