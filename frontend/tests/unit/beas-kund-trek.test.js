import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/beas-kund-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('beas-data.js');
    const fn = new Function(
        code + '\nreturn { BEAS_TREK_STATS, BEAS_TREK_TIMELINE, BEAS_TREK_HIGHLIGHTS, BEAS_TREK_STEPS, BEAS_TREK_CHECKLIST, BEAS_TREK_GALLERY };'
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

describe('Beas Kund Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('beas-trek.js');
        css = readTrekFile('beas-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Beas Kund Trek');
        expect(html).toContain('Manali — Glacial Alpine Tarn &amp; Meadows (3,700m)');
        expect(html).toContain('class="beas-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('class="beas-stats-grid"');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Beas Kund Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local beas-trek.js and CSS', () => {
        expect(html).toContain('href="beas-trek.css"');
        expect(html).toContain('src="beas-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--beas-primary');
        expect(css).toContain('--beas-emerald');
        expect(css).toContain('.beas-body');
        expect(css).toContain('.beas-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Beas Kund Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.BEAS_TREK_STATS.name).toContain('Beas Kund');
        expect(data.BEAS_TREK_STATS.difficulty).toBe('Moderate');
        expect(data.BEAS_TREK_STATS.elevationMeters).toBe(3700);
        expect(data.BEAS_TREK_STATS.bestSeasons).toContain('May to October');
    });

    it('contains chronological history timeline', () => {
        expect(data.BEAS_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const vyasa = data.BEAS_TREK_TIMELINE.find(t => t.year === 'Ancient Era');
        expect(vyasa).toBeDefined();
        expect(vyasa.title).toContain('Sage Vyasa');
    });

    it('contains checklist gear items', () => {
        expect(data.BEAS_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const stick = data.BEAS_TREK_CHECKLIST.find(c => c.id === 'stick');
        expect(stick).toBeDefined();
    });
});

describe('Beas Kund Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Beas Kund Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: 'frontend/beas-kund-trek/index.html'");
    });
});
