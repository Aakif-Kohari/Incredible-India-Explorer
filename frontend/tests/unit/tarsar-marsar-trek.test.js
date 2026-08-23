import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/tarsar-marsar-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('tarsar-data.js');
    const fn = new Function(
        code + '\nreturn { TARSAR_TREK_STATS, TARSAR_TREK_TIMELINE, TARSAR_TREK_HIGHLIGHTS, TARSAR_TREK_STEPS, TARSAR_TREK_CHECKLIST, TARSAR_TREK_GALLERY };'
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

describe('Tarsar Marsar Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('tarsar-trek.js');
        css = readTrekFile('tarsar-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Tarsar Marsar Trek');
        expect(html).toContain('Aru Valley — Pristine Glacial Lakes Traverse (4,100m)');
        expect(html).toContain('class="tarsar-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('class="tarsar-stats-grid"');
    });

    it('documents Tarsar and Marsar lakes highlights', () => {
        expect(html).toContain('Tarsar Lake');
        expect(html).toContain('Marsar Lake');
        expect(html).toContain('Sundersar');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Tarsar Marsar Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local tarsar-trek.js and CSS', () => {
        expect(html).toContain('href="tarsar-trek.css"');
        expect(html).toContain('src="tarsar-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--tarsar-primary');
        expect(css).toContain('--tarsar-emerald');
        expect(css).toContain('.tarsar-body');
        expect(css).toContain('.tarsar-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Tarsar Marsar Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.TARSAR_TREK_STATS.name).toContain('Tarsar Marsar');
        expect(data.TARSAR_TREK_STATS.difficulty).toBe('Moderate');
        expect(data.TARSAR_TREK_STATS.elevationMeters).toBe(4100);
        expect(data.TARSAR_TREK_STATS.bestSeasons).toContain('July to September');
    });

    it('contains chronological history timeline', () => {
        expect(data.TARSAR_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const nomad = data.TARSAR_TREK_TIMELINE.find(t => t.year === 'Ancient Era');
        expect(nomad).toBeDefined();
        expect(nomad.title).toContain('Kashmiri Nomad Trails');
    });

    it('contains checklist gear items', () => {
        expect(data.TARSAR_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const poncho = data.TARSAR_TREK_CHECKLIST.find(c => c.id === 'poncho');
        expect(poncho).toBeDefined();
    });
});

describe('Tarsar Marsar Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Tarsar Marsar Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: \"frontend/tarsar-marsar-trek/index.html\"");
    });
});
