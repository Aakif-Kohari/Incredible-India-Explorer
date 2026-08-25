/**
 * Xylophone & Indian Percussion Traditions — Vitest Unit Tests
 * Issue #2938: X: Xylophone & Indian Percussion Traditions
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readXylophoneFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/xylophone-percussion-explorer', file),
        'utf-8'
    );
}

function loadXylophoneData() {
    const code = readXylophoneFile('xylophone-percussion-data.js');
    const fn   = new Function(code + '\nreturn XYLOPHONE_PERCUSSION_DATA;');
    return fn();
}

/* ============================================================
   HTML Structure & Accessibility
   ============================================================ */
describe('Xylophone & Indian Percussion Explorer — Page Structure & Accessibility', () => {
    let html;

    beforeAll(() => {
        html = readXylophoneFile('index.html');
    });

    it('contains the required feature title and organology subheadings', () => {
        expect(html).toContain('Xylophone &amp; Indian Percussion Traditions');
        expect(html).toContain('Organological Classifications (Ghana &amp; Avanaddha Vadya)');
        expect(html).toContain('Interactive Tuned Bar Synthesizer (Kashta &amp; Jal Tarang)');
        expect(html).toContain('Regional Percussion Ensembles &amp; Master Traditions');
        expect(html).toContain('Sources &amp; Media Credits');
    });

    it('contains accessibility skip link pointing to main content', () => {
        expect(html).toContain('class="xp-skip-link"');
        expect(html).toContain('href="#main-content"');
        expect(html).toContain('id="main-content"');
    });

    it('references local CSS, dataset, and controller JS files', () => {
        expect(html).toContain('href="xylophone-percussion.css"');
        expect(html).toContain('src="xylophone-percussion-data.js"');
        expect(html).toContain('src="xylophone-percussion.js"');
    });

    it('contains navigation back link to Indian Music Hub', () => {
        expect(html).toContain('href="../music/music.html"');
        expect(html).toContain('Back to Indian Music Hub');
    });

    it('contains accessible filter dropdowns and live search input', () => {
        expect(html).toContain('id="xp-filter-family"');
        expect(html).toContain('id="xp-filter-region"');
        expect(html).toContain('id="xp-filter-material"');
        expect(html).toContain('id="xp-search"');
        expect(html).toContain('aria-label="Filter by instrument family"');
        expect(html).toContain('aria-label="Filter by region"');
        expect(html).toContain('aria-label="Filter by material"');
        expect(html).toContain('aria-label="Search instruments"');
    });

    it('contains modal dialog overlay with proper ARIA attributes', () => {
        expect(html).toContain('id="xp-modal-overlay"');
        expect(html).toContain('role="dialog"');
        expect(html).toContain('aria-modal="true"');
    });

    it('contains hero stat counters', () => {
        expect(html).toContain('id="xp-stat-total"');
        expect(html).toContain('id="xp-stat-families"');
        expect(html).toContain('id="xp-stat-regions"');
    });
});

/* ============================================================
   CSS Design System
   ============================================================ */
describe('Xylophone & Indian Percussion Explorer — CSS Design System', () => {
    let css;

    beforeAll(() => {
        css = readXylophoneFile('xylophone-percussion.css');
    });

    it('defines responsive breakpoints', () => {
        expect(css).toContain('@media (max-width: 900px)');
        expect(css).toContain('@media (max-width: 600px)');
    });

    it('defines visible focus ring state', () => {
        expect(css).toContain('focus-visible');
    });

    it('defines prefers-reduced-motion guard', () => {
        expect(css).toContain('prefers-reduced-motion');
    });

    it('defines custom design tokens', () => {
        expect(css).toContain('--xp-bg');
        expect(css).toContain('--xp-copper');
        expect(css).toContain('--xp-gold');
        expect(css).toContain('--xp-surface');
    });

    it('contains card and modal styling rules', () => {
        expect(css).toContain('.xp-card');
        expect(css).toContain('.xp-modal');
        expect(css).toContain('.xp-synth-bar');
    });
});

/* ============================================================
   JavaScript Controller Functions
   ============================================================ */
describe('Xylophone & Indian Percussion Explorer — JavaScript Interactivity', () => {
    let js;

    beforeAll(() => {
        js = readXylophoneFile('xylophone-percussion.js');
    });

    it('exposes initXylophonePercussion function', () => {
        expect(js).toContain('function initXylophonePercussion');
    });

    it('exposes renderInstrumentCards function', () => {
        expect(js).toContain('function renderInstrumentCards');
    });

    it('exposes openInstrumentModal function', () => {
        expect(js).toContain('function openInstrumentModal');
    });

    it('exposes closeInstrumentModal function', () => {
        expect(js).toContain('function closeInstrumentModal');
    });

    it('exposes filterInstruments function', () => {
        expect(js).toContain('function filterInstruments');
    });

    it('exposes playTunedNote synth function', () => {
        expect(js).toContain('function playTunedNote');
    });

    it('implements keyboard accessibility for modal (Escape & Tab trap)', () => {
        expect(js).toContain("'Escape'");
        expect(js).toContain('closeInstrumentModal');
        expect(js).toContain("'Tab'");
    });

    it('implements Saptak Web Audio synth tuning (Sa Re Ga Ma Pa Dha Ni)', () => {
        expect(js).toContain('SAPTAK_NOTES');
        expect(js).toContain('261.63'); // Sa (C4)
        expect(js).toContain('392.00'); // Pa (G4)
    });
});

/* ============================================================
   Dataset Verification
   ============================================================ */
describe('Xylophone & Indian Percussion Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadXylophoneData();
    });

    it('exposes XYLOPHONE_PERCUSSION_DATA with meta object', () => {
        expect(data).toBeDefined();
        expect(data.meta).toBeDefined();
        expect(data.meta.title).toContain('Xylophone & Indian Percussion');
    });

    it('contains at least 12 instruments', () => {
        expect(data.instruments).toBeDefined();
        expect(Array.isArray(data.instruments)).toBe(true);
        expect(data.instruments.length).toBeGreaterThanOrEqual(12);
    });

    it('every instrument has complete organological fields', () => {
        data.instruments.forEach(item => {
            expect(item.id, `${item.name} missing id`).toBeTruthy();
            expect(item.name, `instrument missing name`).toBeTruthy();
            expect(item.family, `${item.name} missing family`).toBeTruthy();
            expect(item.region, `${item.name} missing region`).toBeTruthy();
            expect(item.material, `${item.name} missing material`).toBeTruthy();
            expect(item.howPlayed, `${item.name} missing howPlayed`).toBeTruthy();
            expect(item.musicalTradition, `${item.name} missing musicalTradition`).toBeTruthy();
            expect(item.description, `${item.name} missing description`).toBeTruthy();
            expect(item.classificationNote, `${item.name} missing classificationNote`).toBeTruthy();
            expect(item.culturalSignificance, `${item.name} missing culturalSignificance`).toBeTruthy();
            expect(item.imageCredit, `${item.name} missing imageCredit`).toBeDefined();
            expect(item.imageCredit.text, `${item.name} imageCredit missing text`).toBeTruthy();
            expect(item.imageCredit.url, `${item.name} imageCredit missing url`).toContain('http');
        });
    });

    it('includes Kashta Tarang (Indian Wooden Xylophone)', () => {
        const item = data.instruments.find(i => i.id === 'kashta-tarang');
        expect(item).toBeDefined();
        expect(item.family).toContain('Tuned Idiophones');
        expect(item.classificationNote).toContain('Ghana Vadya');
    });

    it('includes Jal Tarang (Porcelain Water Bowls)', () => {
        const item = data.instruments.find(i => i.id === 'jal-tarang');
        expect(item).toBeDefined();
        expect(item.family).toContain('Tuned Idiophones');
        expect(item.material).toContain('Clay & Ceramic');
    });

    it('includes Naga Bamboo Xylophone (Tribal Slats)', () => {
        const item = data.instruments.find(i => i.id === 'naga-bamboo-xylophone');
        expect(item).toBeDefined();
        expect(item.region).toBe('North-East India');
        expect(item.material).toBe('Wood & Bamboo');
    });

    it('includes Ghatam (Clay Pot Idiophone)', () => {
        const item = data.instruments.find(i => i.id === 'ghatam');
        expect(item).toBeDefined();
        expect(item.family).toContain('Idiophones');
    });

    it('includes Classical Membranophones (Mridangam, Tabla, Pakhawaj)', () => {
        const ids = data.instruments.map(i => i.id);
        expect(ids).toContain('mridangam');
        expect(ids).toContain('tabla');
        expect(ids).toContain('pakhawaj');
    });

    it('includes Regional & Temple Drums (Chenda, Pung, Thavil)', () => {
        const ids = data.instruments.map(i => i.id);
        expect(ids).toContain('chenda');
        expect(ids).toContain('pung');
        expect(ids).toContain('thavil');
    });

    it('contains filter arrays for family, region, and material', () => {
        expect(Array.isArray(data.families)).toBe(true);
        expect(data.families[0]).toBe('All Families');
        expect(Array.isArray(data.regions)).toBe(true);
        expect(data.regions[0]).toBe('All Regions');
        expect(Array.isArray(data.materials)).toBe(true);
        expect(data.materials[0]).toBe('All Materials');
    });

    it('contains regional ensembles array', () => {
        expect(Array.isArray(data.regionalEnsembles)).toBe(true);
        expect(data.regionalEnsembles.length).toBeGreaterThanOrEqual(3);
    });

    it('contains at least 3 sources with valid title and url', () => {
        expect(Array.isArray(data.sources)).toBe(true);
        expect(data.sources.length).toBeGreaterThanOrEqual(3);
        data.sources.forEach(src => {
            expect(src.title).toBeTruthy();
            expect(src.url).toContain('http');
        });
    });
});

/* ============================================================
   Search Index Integration
   ============================================================ */
describe('Xylophone & Indian Percussion Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readFileSync(
            resolve(__dirname, '../../frontend/search-index.js'),
            'utf-8'
        );
        expect(searchIndex).toContain('xylophone-percussion-explorer');
        expect(searchIndex).toContain('Xylophone & Indian Percussion Traditions');
    });
});
