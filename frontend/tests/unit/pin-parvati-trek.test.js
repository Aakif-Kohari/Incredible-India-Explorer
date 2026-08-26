import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/pin-parvati-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('pin-data.js');
    const fn = new Function(
        code + '\nreturn { PIN_TREK_STATS, PIN_TREK_TIMELINE, PIN_TREK_HIGHLIGHTS, PIN_TREK_STEPS, PIN_TREK_CHECKLIST, PIN_TREK_GALLERY };'
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

describe('Pin Parvati Pass Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('pin-trek.js');
        css = readTrekFile('pin-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Pin Parvati Pass Trek');
        expect(html).toContain('Parvati to Pin Valley — Glacial High Pass Traverse (5,319m)');
        expect(html).toContain('class="pin-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnSafety"');
        expect(html).toContain('class="pin-stats-grid"');
    });

    it('contains a detailed safety guidelines section', () => {
        expect(html).toContain('Compulsory Safety &amp; Survival Guidelines');
        expect(html).toContain('Glacier Safety &amp; Roping Protocols');
        expect(html).toContain('Evacuation');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Pin Parvati Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local pin-trek.js and CSS', () => {
        expect(html).toContain('href="pin-trek.css"');
        expect(html).toContain('src="pin-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--pin-primary');
        expect(css).toContain('--pin-emerald');
        expect(css).toContain('.pin-body');
        expect(css).toContain('.pin-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Pin Parvati Pass Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.PIN_TREK_STATS.name).toContain('Pin Parvati Pass');
        expect(data.PIN_TREK_STATS.difficulty).toBe('Extremely Challenging');
        expect(data.PIN_TREK_STATS.elevationMeters).toBe(5319);
        expect(data.PIN_TREK_STATS.bestSeasons).toContain('July to September');
    });

    it('contains chronological history timeline', () => {
        expect(data.PIN_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const explorer = data.PIN_TREK_TIMELINE.find(t => t.year === '1884 CE');
        expect(explorer).toBeDefined();
        expect(explorer.title).toContain('Louis Dane');
    });

    it('contains checklist gear items', () => {
        expect(data.PIN_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const harness = data.PIN_TREK_CHECKLIST.find(c => c.id === 'harness');
        expect(harness).toBeDefined();
    });
});

describe('Pin Parvati Pass Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Pin Parvati Pass Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: 'frontend/pin-parvati-trek/index.html'");
    });
});
