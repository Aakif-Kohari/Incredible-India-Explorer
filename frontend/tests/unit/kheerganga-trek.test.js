import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kheerganga-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('kheerganga-data.js');
    const fn = new Function(
        code + '\nreturn { KHEERGANGA_TREK_STATS, KHEERGANGA_TREK_TIMELINE, KHEERGANGA_TREK_HIGHLIGHTS, KHEERGANGA_TREK_STEPS, KHEERGANGA_TREK_CHECKLIST, KHEERGANGA_TREK_GALLERY };'
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

describe('Kheerganga Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('kheerganga-trek.js');
        css = readTrekFile('kheerganga-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Kheerganga Trek');
        expect(html).toContain('Parvati Valley — Holy Hot Springs &amp; Alpine Valley (2,960m)');
        expect(html).toContain('class="kheer-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('class="kheer-stats-grid"');
    });

    it('documents sulphur springs and Parvati Kund highlights', () => {
        expect(html).toContain('Parvati Kund');
        expect(html).toContain('hot water sulphur pools');
        expect(html).toContain('Rudranag');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Kheerganga Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local kheerganga-trek.js and CSS', () => {
        expect(html).toContain('href="kheerganga-trek.css"');
        expect(html).toContain('src="kheerganga-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--kheer-primary');
        expect(css).toContain('--kheer-emerald');
        expect(css).toContain('.kheer-body');
        expect(css).toContain('.kheer-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Kheerganga Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.KHEERGANGA_TREK_STATS.name).toContain('Kheerganga Trek');
        expect(data.KHEERGANGA_TREK_STATS.difficulty).toBe('Easy to Moderate');
        expect(data.KHEERGANGA_TREK_STATS.elevationMeters).toBe(2960);
        expect(data.KHEERGANGA_TREK_STATS.bestSeasons).toContain('April to June');
    });

    it('contains chronological history timeline', () => {
        expect(data.KHEERGANGA_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const myth = data.KHEERGANGA_TREK_TIMELINE.find(t => t.year === 'Ancient Mythology');
        expect(myth).toBeDefined();
        expect(myth.title).toContain('Lord Shiva & Kartikeya');
    });

    it('contains checklist gear items', () => {
        expect(data.KHEERGANGA_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const swimwear = data.KHEERGANGA_TREK_CHECKLIST.find(c => c.id === 'swimwear');
        expect(swimwear).toBeDefined();
    });
});

describe('Kheerganga Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Kheerganga Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: \"frontend/kheerganga-trek/index.html\"");
    });
});
