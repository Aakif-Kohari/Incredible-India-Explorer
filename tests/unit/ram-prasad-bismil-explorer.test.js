/**
 * ram-prasad-bismil-explorer.test.js
 * Unit tests for the Ram Prasad Bismil Explorer page.
 * Validates required sections (Biography, Timeline, Kakori Movement, Poetry,
 * Gallery, References), data module properties, accessibility, HTTPS images,
 * styles, script logic, and search index registration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/ram-prasad-bismil-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Ram Prasad Bismil Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and revolutionary kickers', () => {
        expect(html).toContain('class="hero-section bismil-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Ram Prasad');
        expect(html).toContain('Bismil');
        expect(html).toContain('Revolutionary Martyr');
        expect(html).toContain('Kakori Action Commander');
    });

    it('contains all required content sections from user prompt', () => {
        const sectionIds = [
            'biography',
            'timeline',
            'kakori',
            'poetry',
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
            'Timeline',
            'Kakori Movement',
            'Revolutionary Poetry',
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
        expect(html).toContain('src="bismil-data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('includes a lightbox modal structure for historic gallery photos', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Ram Prasad Bismil Explorer — Data Module', () => {
    let dataCode;

    beforeAll(() => {
        dataCode = readExplorerFile('bismil-data.js');
    });

    it('defines BISMIL_INFO with biographical metadata and quick stats', () => {
        expect(dataCode).toContain('BISMIL_INFO');
        expect(dataCode).toContain('Ram Prasad Bismil');
        expect(dataCode).toContain('Shahjahanpur');
        expect(dataCode).toContain('Gorakhpur District Jail');
        expect(dataCode).toContain('Hindustan Republican Association');
    });

    it('defines BIOGRAPHY_DATA, TIMELINE_DATA, and KAKORI_MOVEMENT_DATA', () => {
        expect(dataCode).toContain('BIOGRAPHY_DATA');
        expect(dataCode).toContain('TIMELINE_DATA');
        expect(dataCode).toContain('KAKORI_MOVEMENT_DATA');
        expect(dataCode).toContain('9 August 1925');
        expect(dataCode).toContain('Ashfaqulla Khan');
        expect(dataCode).toContain('Chandrashekhar Azad');
        expect(dataCode).toContain('Rajendra Lahiri');
    });

    it('defines POETRY_DATA with Sarfaroshi Ki Tamanna, Rang De Basanti Chola, and Atmakatha', () => {
        expect(dataCode).toContain('POETRY_DATA');
        expect(dataCode).toContain('Sarfaroshi Ki Tamanna');
        expect(dataCode).toContain('Mera Rang De Basanti Chola');
        expect(dataCode).toContain('Autobiography (Atmakatha)');
    });

    it('includes gallery items and references data', () => {
        expect(dataCode).toContain('GALLERY_DATA');
        expect(dataCode).toContain('REFERENCES_DATA');
        expect(dataCode).toContain('Ram Prasad Bismil Ki Atmakatha');
        expect(dataCode).toContain('Kakori Ke Sheheed');
    });

    it('uses secure HTTPS image URLs throughout the data file', () => {
        const matches = dataCode.match(/https:\/\/[^\s"']+/g) || [];
        expect(matches.length).toBeGreaterThanOrEqual(4);
        matches.forEach(url => {
            expect(url).toMatch(/^https:\/\//);
        });
    });
});

describe('Ram Prasad Bismil Explorer — Styles & Scripts', () => {
    it('includes a non-empty stylesheet supporting themes and timeline layouts', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1500);
        expect(css).toContain('.bismil-hero');
        expect(css).toContain('.bismil-tabs-bar');
        expect(css).toContain('.timeline-track');
        expect(css).toContain('.poetry-verses');
        expect(css).toContain('body.light-theme');
    });

    it('includes script logic for rendering, filtering, timeline, Kakori, poetry, and lightbox', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('renderStats');
        expect(js).toContain('renderBiography');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('renderKakoriMovement');
        expect(js).toContain('renderPoetry');
        expect(js).toContain('renderGallery');
        expect(js).toContain('initGalleryFilters');
        expect(js).toContain('initLightbox');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Ram Prasad Bismil Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Ram Prasad Bismil Explorer');
        expect(searchIndex).toContain('frontend/ram-prasad-bismil-explorer/index.html');
        expect(searchIndex).toContain('Kakori Train Action');
    });
});
