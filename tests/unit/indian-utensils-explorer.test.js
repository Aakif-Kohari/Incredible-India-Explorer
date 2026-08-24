/**
 * Indian Utensils Explorer — Vitest Unit Tests
 * Issue #2936: Traditional Indian Utensils — Everyday Cultural Heritage
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readUtensilsFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/indian-utensils-explorer', file),
        'utf-8'
    );
}

function loadUtensilsData() {
    const code = readUtensilsFile('indian-utensils-data.js');
    const fn   = new Function(code + '\nreturn INDIAN_UTENSILS_DATA;');
    return fn();
}

/* ============================================================
   HTML Structure & Accessibility
   ============================================================ */
describe('Indian Utensils Explorer — Page Structure & Accessibility', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readUtensilsFile('index.html');
        css  = readUtensilsFile('indian-utensils.css');
        js   = readUtensilsFile('indian-utensils.js');
    });

    it('contains the required page title', () => {
        expect(html).toContain('Traditional Indian Utensils');
        expect(html).toContain('Everyday Cultural Heritage');
    });

    it('contains required section identifiers', () => {
        expect(html).toContain('id="main-content"');
        expect(html).toContain('id="iu-card-grid"');
        expect(html).toContain('id="iu-modal-overlay"');
        expect(html).toContain('Sources &amp; Image Credits');
        expect(html).toContain('id="iu-sources-list"');
    });

    it('references local CSS, data, and JS files', () => {
        expect(html).toContain('href="indian-utensils.css"');
        expect(html).toContain('src="indian-utensils-data.js"');
        expect(html).toContain('src="indian-utensils.js"');
    });

    it('contains skip link for accessibility', () => {
        expect(html).toContain('class="iu-skip-link"');
        expect(html).toContain('href="#main-content"');
    });

    it('contains back navigation to Handicrafts & Artisan Hub', () => {
        expect(html).toContain('handicrafts-artisan-emporium-studio-hub');
        expect(html).toContain('Back to Handicrafts');
    });

    it('contains filter controls with accessible labels', () => {
        expect(html).toContain('id="iu-filter-material"');
        expect(html).toContain('id="iu-filter-region"');
        expect(html).toContain('id="iu-search"');
        expect(html).toContain('aria-label="Filter by material"');
        expect(html).toContain('aria-label="Filter by region"');
        expect(html).toContain('aria-label="Search utensils"');
    });

    it('contains modal with correct ARIA roles', () => {
        expect(html).toContain('role="dialog"');
        expect(html).toContain('aria-modal="true"');
        expect(html).toContain('id="iu-modal-overlay"');
    });

    it('contains hero stat counters', () => {
        expect(html).toContain('id="iu-stat-total"');
        expect(html).toContain('id="iu-stat-regions"');
        expect(html).toContain('id="iu-stat-materials"');
    });
});

/* ============================================================
   CSS Design & Responsiveness
   ============================================================ */
describe('Indian Utensils Explorer — CSS Design System', () => {
    let css;

    beforeAll(() => {
        css = readUtensilsFile('indian-utensils.css');
    });

    it('defines responsive breakpoints', () => {
        expect(css).toContain('@media (max-width: 900px)');
        expect(css).toContain('@media (max-width: 600px)');
    });

    it('defines focus-visible state', () => {
        expect(css).toContain('focus-visible');
    });

    it('defines prefers-reduced-motion guard', () => {
        expect(css).toContain('prefers-reduced-motion');
    });

    it('defines card and modal design tokens', () => {
        expect(css).toContain('.iu-card');
        expect(css).toContain('.iu-modal');
        expect(css).toContain('.iu-modal-overlay');
    });

    it('defines dark background and design tokens', () => {
        expect(css).toContain('--clay');
        expect(css).toContain('--brass');
        expect(css).toContain('--surface');
    });
});

/* ============================================================
   JavaScript Interactivity
   ============================================================ */
describe('Indian Utensils Explorer — JavaScript Interactivity', () => {
    let js;

    beforeAll(() => {
        js = readUtensilsFile('indian-utensils.js');
    });

    it('exposes initUtensils function', () => {
        expect(js).toContain('function initUtensils');
    });

    it('exposes renderUtensilCards function', () => {
        expect(js).toContain('function renderUtensilCards');
    });

    it('exposes openUtensilModal function', () => {
        expect(js).toContain('function openUtensilModal');
    });

    it('exposes closeUtensilModal function', () => {
        expect(js).toContain('function closeUtensilModal');
    });

    it('exposes filterUtensils function', () => {
        expect(js).toContain('function filterUtensils');
    });

    it('implements ARIA attributes on modal open', () => {
        expect(js).toContain('aria-modal');
        expect(js).toContain('aria-hidden');
        expect(js).toContain('aria-label');
    });

    it('implements Escape key to close modal', () => {
        expect(js).toContain("'Escape'");
        expect(js).toContain('closeUtensilModal');
    });

    it('implements focus trap inside modal', () => {
        expect(js).toContain('Tab');
        expect(js).toContain('focusable');
    });

    it('renders sources section', () => {
        expect(js).toContain('_renderSources');
        expect(js).toContain('iu-sources-list');
    });
});

/* ============================================================
   Dataset Verification
   ============================================================ */
describe('Indian Utensils Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadUtensilsData();
    });

    it('exposes INDIAN_UTENSILS_DATA with a meta object', () => {
        expect(data).toBeDefined();
        expect(data.meta).toBeDefined();
        expect(data.meta.title).toContain('Indian Utensils');
    });

    it('has at least 12 utensils', () => {
        expect(data.utensils).toBeDefined();
        expect(Array.isArray(data.utensils)).toBe(true);
        expect(data.utensils.length).toBeGreaterThanOrEqual(12);
    });

    it('every utensil has required fields', () => {
        data.utensils.forEach(u => {
            expect(u.id, `${u.name} missing id`).toBeTruthy();
            expect(u.name, `utensil missing name`).toBeTruthy();
            expect(u.material, `${u.name} missing material`).toBeTruthy();
            expect(u.region, `${u.name} missing region`).toBeTruthy();
            expect(u.description, `${u.name} missing description`).toBeTruthy();
            expect(u.cookingPractices, `${u.name} missing cookingPractices`).toBeTruthy();
            expect(u.culturalSignificance, `${u.name} missing culturalSignificance`).toBeTruthy();
            expect(u.imageCredit, `${u.name} missing imageCredit`).toBeDefined();
            expect(u.imageCredit.text, `${u.name} imageCredit missing text`).toBeTruthy();
            expect(u.imageCredit.url, `${u.name} imageCredit missing url`).toContain('http');
        });
    });

    it('includes the Kadhai utensil', () => {
        const ids = data.utensils.map(u => u.id);
        expect(ids).toContain('kadhai');
    });

    it('includes the Tawa utensil', () => {
        const ids = data.utensils.map(u => u.id);
        expect(ids).toContain('tawa');
    });

    it('includes the Handi utensil with clay material', () => {
        const handi = data.utensils.find(u => u.id === 'handi');
        expect(handi).toBeDefined();
        expect(handi.material).toBe('Clay');
    });

    it('includes the Uruli utensil with bronze material from South India', () => {
        const uruli = data.utensils.find(u => u.id === 'uruli');
        expect(uruli).toBeDefined();
        expect(uruli.material).toBe('Bronze');
        expect(uruli.region).toBe('South India');
    });

    it('includes the Copper Lota utensil', () => {
        const ids = data.utensils.map(u => u.id);
        expect(ids).toContain('copper-lota');
    });

    it('covers multiple regions', () => {
        const regions = [...new Set(data.utensils.map(u => u.region))];
        expect(regions.length).toBeGreaterThanOrEqual(4);
    });

    it('covers multiple materials', () => {
        const materials = [...new Set(data.utensils.map(u => u.material))];
        expect(materials.length).toBeGreaterThanOrEqual(4);
    });

    it('has materials and regions arrays for filter dropdowns', () => {
        expect(Array.isArray(data.materials)).toBe(true);
        expect(data.materials[0]).toBe('All Materials');
        expect(Array.isArray(data.regions)).toBe(true);
        expect(data.regions[0]).toBe('All Regions');
    });

    it('has at least 3 sources with valid title and url', () => {
        expect(data.sources).toBeDefined();
        expect(Array.isArray(data.sources)).toBe(true);
        expect(data.sources.length).toBeGreaterThanOrEqual(3);

        data.sources.forEach(src => {
            expect(src.title, 'source missing title').toBeTruthy();
            expect(src.url, 'source missing url').toContain('http');
        });
    });
});

/* ============================================================
   Search Index Integration
   ============================================================ */
describe('Indian Utensils Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readFileSync(
            resolve(__dirname, '../../frontend/search-index.js'),
            'utf-8'
        );
        expect(searchIndex).toContain('indian-utensils-explorer');
        expect(searchIndex).toContain('Traditional Indian Utensils');
    });
});
