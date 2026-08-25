import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kalsubai-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('kalsubai-data.js');
    const fn = new Function(
        code + '\nreturn { KALSUBAI_TREK_STATS, KALSUBAI_TREK_TIMELINE, KALSUBAI_TREK_HIGHLIGHTS, KALSUBAI_TREK_STEPS, KALSUBAI_TREK_CHECKLIST, KALSUBAI_TREK_GALLERY };'
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

describe('Kalsubai Peak Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('kalsubai-trek.js');
        css = readTrekFile('kalsubai-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Kalsubai Peak Trek');
        expect(html).toContain('Sahyadri Range — Everest of Maharashtra (1,646m)');
        expect(html).toContain('class="kalsu-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('class="kalsu-stats-grid"');
    });

    it('documents Kalsubai Temple and steel ladders highlights', () => {
        expect(html).toContain('Kalsubai Temple');
        expect(html).toContain('steel ladders');
        expect(html).toContain('Bhandardara');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Kalsubai Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local kalsubai-trek.js and CSS', () => {
        expect(html).toContain('href="kalsubai-trek.css"');
        expect(html).toContain('src="kalsubai-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--kalsu-primary');
        expect(css).toContain('--kalsu-emerald');
        expect(css).toContain('.kalsu-body');
        expect(css).toContain('.kalsu-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Kalsubai Peak Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.KALSUBAI_TREK_STATS.name).toContain('Kalsubai Trek');
        expect(data.KALSUBAI_TREK_STATS.difficulty).toBe('Moderate');
        expect(data.KALSUBAI_TREK_STATS.elevationMeters).toBe(1646);
        expect(data.KALSUBAI_TREK_STATS.bestSeasons).toContain('June to August');
    });

    it('contains chronological history timeline', () => {
        expect(data.KALSUBAI_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const legend = data.KALSUBAI_TREK_TIMELINE.find(t => t.year === 'Historical Era');
        expect(legend).toBeDefined();
        expect(legend.title).toContain('Kalsubai Legend');
    });

    it('contains checklist gear items', () => {
        expect(data.KALSUBAI_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const shoes = data.KALSUBAI_TREK_CHECKLIST.find(c => c.id === 'shoes');
        expect(shoes).toBeDefined();
    });
});

describe('Kalsubai Peak Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Kalsubai Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: \"frontend/kalsubai-trek/index.html\"");
    });
});
