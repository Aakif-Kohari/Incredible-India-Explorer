import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/valley-of-flowers-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('valley-data.js');
    const fn = new Function(
        code + '\nreturn { VALLEY_TREK_STATS, VALLEY_TREK_TIMELINE, VALLEY_TREK_HIGHLIGHTS, VALLEY_TREK_STEPS, VALLEY_TREK_CHECKLIST, VALLEY_TREK_GALLERY };'
    );
    return fn();
}

function readAdventurePage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/adventure/adventure.html'),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Valley of Flowers Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('valley-trek.js');
        css = readTrekFile('valley-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Valley of Flowers Trek');
        expect(html).toContain('Chamoli — High Himalayan Alpine Valley (3,650m)');
        expect(html).toContain('class="valley-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('class="valley-stats-grid"');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Valley of Flowers Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local valley-trek.js and CSS', () => {
        expect(html).toContain('href="valley-trek.css"');
        expect(html).toContain('src="valley-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--valley-primary');
        expect(css).toContain('--valley-emerald');
        expect(css).toContain('.valley-body');
        expect(css).toContain('.valley-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Valley of Flowers Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.VALLEY_TREK_STATS.name).toContain('Valley of Flowers');
        expect(data.VALLEY_TREK_STATS.difficulty).toBe('Moderate');
        expect(data.VALLEY_TREK_STATS.elevationMeters).toBe(3650);
        expect(data.VALLEY_TREK_STATS.bestSeasons).toContain('July to September');
    });

    it('contains chronological history timeline', () => {
        expect(data.VALLEY_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const smythe = data.VALLEY_TREK_TIMELINE.find(t => t.year === '1931 CE');
        expect(smythe).toBeDefined();
        expect(smythe.title).toContain('Frank Smythe');
    });

    it('contains checklist gear items', () => {
        expect(data.VALLEY_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const poncho = data.VALLEY_TREK_CHECKLIST.find(c => c.id === 'poncho');
        expect(poncho).toBeDefined();
    });
});

describe('Valley of Flowers Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Valley of Flowers Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: 'frontend/valley-of-flowers-trek/index.html'");
    });
});
