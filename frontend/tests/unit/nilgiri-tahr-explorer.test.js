/**
 * nilgiri-tahr-explorer.test.js
 * Unit tests for Nilgiri Tahr Explorer page, data module, styles, scripts,
 * search index registration, and endemic species hub integration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/nilgiri-tahr-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

function readEndemicHub() {
    return readFileSync(
        resolve(__dirname, '../../frontend/endemic-flora-fauna-explorer/index.html'),
        'utf-8'
    );
}

describe('Nilgiri Tahr Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with title and scientific name', () => {
        expect(html).toContain('id="hero-section"');
        expect(html).toContain('Nilgiri Tahr');
        expect(html).toContain('Nilgiritragus hylocrius');
        expect(html).toContain('Varaiyadu');
    });

    it('contains all required section containers with matching tab anchors', () => {
        const sections = [
            'introduction',
            'taxonomy',
            'habitat',
            'behaviour',
            'dimorphism',
            'protected-areas',
            'adaptations',
            'conservation',
            'quiz',
            'gallery',
            'references'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`href="#${id}"`);
        });
    });

    it('has correct heading hierarchy with 1 main h1 and multiple h2 section titles', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(10);
    });

    it('links to required pages-common.css, style.css, nilgiri-tahr-data.js and script.js', () => {
        expect(html).toContain('href="../pages-common.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="nilgiri-tahr-data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('includes lightbox modal structure for photo gallery', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Nilgiri Tahr Explorer — Data Module', () => {
    let dataCode;
    let dataModule;

    beforeAll(async () => {
        dataCode = readExplorerFile('nilgiri-tahr-data.js');
        // Dynamic import / evaluation of CJS module
        const moduleObj = { exports: {} };
        const fn = new Function('module', 'exports', dataCode);
        fn(moduleObj, moduleObj.exports);
        dataModule = moduleObj.exports;
    });

    it('defines NILGIRI_TAHR_INFO with species and conservation metadata', () => {
        const info = dataModule.NILGIRI_TAHR_INFO;
        expect(info).toBeDefined();
        expect(info.name).toBe('Nilgiri Tahr');
        expect(info.scientificName).toBe('Nilgiritragus hylocrius');
        expect(info.stateAnimal).toBe('Tamil Nadu');
        expect(info.iucnStatus).toContain('Endangered');
        expect(info.quickStats.length).toBeGreaterThanOrEqual(6);
    });

    it('defines TAXONOMY_HIERARCHY covering ranks down to genus Nilgiritragus', () => {
        const taxo = dataModule.TAXONOMY_HIERARCHY;
        expect(taxo.length).toBe(8);
        expect(taxo.find(t => t.rank === 'Genus').taxon).toBe('Nilgiritragus');
        expect(taxo.find(t => t.rank === 'Species').taxon).toBe('N. hylocrius');
    });

    it('defines DIMORPHISM_DATA for Saddleback adult male vs female', () => {
        const dimo = dataModule.DIMORPHISM_DATA;
        expect(dimo.male).toBeDefined();
        expect(dimo.female).toBeDefined();
        expect(dimo.male.title).toContain('Saddleback');
        expect(dimo.male.weight).toContain('80');
    });

    it('defines PROTECTED_AREAS strongholds including Eravikulam and Mukurthi', () => {
        const areas = dataModule.PROTECTED_AREAS;
        expect(areas.length).toBeGreaterThanOrEqual(6);
        const eravikulam = areas.find(a => a.id === 'eravikulam');
        expect(eravikulam).toBeDefined();
        expect(eravikulam.state).toBe('Kerala');
        const mukurthi = areas.find(a => a.id === 'mukurthi');
        expect(mukurthi).toBeDefined();
        expect(mukurthi.state).toBe('Tamil Nadu');
    });

    it('defines QUIZ_QUESTIONS with correct options and explanations', () => {
        const quiz = dataModule.QUIZ_QUESTIONS;
        expect(quiz.length).toBeGreaterThanOrEqual(5);
        quiz.forEach(q => {
            expect(q.options.length).toBe(4);
            expect(typeof q.correct).toBe('number');
            expect(q.explanation).toBeTruthy();
        });
    });

    it('uses secure HTTPS URLs for all gallery images', () => {
        const gallery = dataModule.GALLERY_IMAGES;
        expect(gallery.length).toBeGreaterThanOrEqual(4);
        gallery.forEach(img => {
            expect(img.url).toMatch(/^https:\/\//);
        });
    });
});

describe('Nilgiri Tahr Explorer — Styles & Client Script', () => {
    it('contains custom CSS rules for hero, glassmorphism cards, quiz, dimorphism, and lightbox', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.hero-card');
        expect(css).toContain('.dimorphism-toggle-container');
        expect(css).toContain('.protected-grid');
        expect(css).toContain('.quiz-container');
        expect(css).toContain('.lightbox-modal');
    });

    it('contains JavaScript logic for rendering, filtering, quiz engine, and lightbox modal', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initQuickStats');
        expect(js).toContain('initTaxonomyTable');
        expect(js).toContain('initDimorphismToggle');
        expect(js).toContain('initProtectedAreasFilter');
        expect(js).toContain('initQuizEngine');
        expect(js).toContain('initLightbox');
    });
});

describe('Nilgiri Tahr Explorer — Global Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Nilgiri Tahr Explorer');
        expect(searchIndex).toContain('frontend/nilgiri-tahr-explorer/index.html');
        expect(searchIndex).toContain('Nilgiritragus hylocrius');
    });

    it('is linked from the Endemic Flora & Fauna Explorer landing page', () => {
        const endemicHub = readEndemicHub();
        expect(endemicHub).toContain('data-name="nilgiri tahr"');
        expect(endemicHub).toContain('href="../nilgiri-tahr-explorer/index.html"');
        expect(endemicHub).toContain('Nilgiritragus hylocrius');
    });
});
