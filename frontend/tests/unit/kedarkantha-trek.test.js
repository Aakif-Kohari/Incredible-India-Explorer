import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kedarkantha-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('kedar-data.js');
    const fn = new Function(
        code + '\nreturn { KEDAR_TREK_STATS, KEDAR_TREK_TIMELINE, KEDAR_TREK_HIGHLIGHTS, KEDAR_TREK_STEPS, KEDAR_TREK_CHECKLIST, KEDAR_TREK_GALLERY };'
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

describe('Kedarkantha Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('kedar-trek.js');
        css = readTrekFile('kedar-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Kedarkantha Peak Trek');
        expect(html).toContain('Uttarkashi — Garhwal Himalayan Winter Summit (3,800m)');
        expect(html).toContain('class="kedar-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('class="kedar-stats-grid"');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Kedarkantha Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local kedar-trek.js and CSS', () => {
        expect(html).toContain('href="kedar-trek.css"');
        expect(html).toContain('src="kedar-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--kedar-primary');
        expect(css).toContain('--kedar-emerald');
        expect(css).toContain('.kedar-body');
        expect(css).toContain('.kedar-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Kedarkantha Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.KEDAR_TREK_STATS.name).toContain('Kedarkantha');
        expect(data.KEDAR_TREK_STATS.difficulty).toBe('Easy to Moderate');
        expect(data.KEDAR_TREK_STATS.elevationMeters).toBe(3800);
        expect(data.KEDAR_TREK_STATS.bestSeasons).toContain('December to April');
    });

    it('contains chronological history timeline', () => {
        expect(data.KEDAR_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const shiva = data.KEDAR_TREK_TIMELINE.find(t => t.year === 'Ancient Era');
        expect(shiva).toBeDefined();
        expect(shiva.title).toContain('Lord Shiva');
    });

    it('contains checklist gear items', () => {
        expect(data.KEDAR_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const spikes = data.KEDAR_TREK_CHECKLIST.find(c => c.id === 'spikes');
        expect(spikes).toBeDefined();
    });
});

describe('Kedarkantha Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Kedarkantha Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: 'frontend/kedarkantha-trek/index.html'");
    });
});
