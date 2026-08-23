import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kolli-hills-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('kolli-data.js');
    const fn = new Function(
        code + '\nreturn { KOLLI_TREK_STATS, KOLLI_TREK_TIMELINE, KOLLI_TREK_HIGHLIGHTS, KOLLI_TREK_STEPS, KOLLI_TREK_CHECKLIST, KOLLI_TREK_GALLERY };'
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

describe('Kolli Hills Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('kolli-trek.js');
        css = readTrekFile('kolli-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Kolli Hills Trek');
        expect(html).toContain('Kolli Malai — Sacred Arapaleeswarar');
        expect(html).toContain('class="kolli-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('class="kolli-stats-grid"');
    });

    it('documents Agasagangai Waterfalls and local attractions highlights', () => {
        expect(html).toContain('Agasagangai Waterfalls');
        expect(html).toContain('Arapaleeswarar Temple');
        expect(html).toContain('1,028');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Kolli Hills Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local kolli-trek.js and CSS', () => {
        expect(html).toContain('href="kolli-trek.css"');
        expect(html).toContain('src="kolli-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--kolli-primary');
        expect(css).toContain('--kolli-emerald');
        expect(css).toContain('.kolli-body');
        expect(css).toContain('.kolli-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Kolli Hills Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.KOLLI_TREK_STATS.name).toContain('Kolli Hills Trek');
        expect(data.KOLLI_TREK_STATS.difficulty).toBe('Easy to Moderate');
        expect(data.KOLLI_TREK_STATS.elevationMeters).toBe(1300);
        expect(data.KOLLI_TREK_STATS.bestSeasons).toContain('September to December');
    });

    it('contains chronological history timeline', () => {
        expect(data.KOLLI_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const ancient = data.KOLLI_TREK_TIMELINE.find(t => t.year === 'Ancient Sangam Era');
        expect(ancient).toBeDefined();
        expect(ancient.title).toContain("Valvil Ori's Reign");
    });

    it('contains checklist gear items', () => {
        expect(data.KOLLI_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const water = data.KOLLI_TREK_CHECKLIST.find(c => c.id === 'water');
        expect(water).toBeDefined();
    });
});

describe('Kolli Hills Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Kolli Hills Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: \"frontend/kolli-hills-trek/index.html\"");
    });
});
