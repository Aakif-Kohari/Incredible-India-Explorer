import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/thekkady-forest-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('thekkady-data.js');
    const fn = new Function(
        code + '\nreturn { THEKKADY_TREK_STATS, THEKKADY_TREK_TIMELINE, THEKKADY_TREK_HIGHLIGHTS, THEKKADY_TREK_STEPS, THEKKADY_TREK_CHECKLIST, THEKKADY_TREK_GALLERY };'
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

describe('Thekkady Forest Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('thekkady-trek.js');
        css = readTrekFile('thekkady-trek.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Kumily–Thekkady Forest Trek');
        expect(html).toContain('Periyar Border Hiking — Cardamom Hills Canopy');
        expect(html).toContain('class="thekkady-hero"');
    });

    it('includes responsive tabs and stats grid elements', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnRules"');
        expect(html).toContain('class="thekkady-stats-grid"');
    });

    it('documents wildlife, conservation, and responsible guidelines', () => {
        expect(html).toContain('Periyar Tiger Reserve');
        expect(html).toContain('leech socks');
        expect(html).toContain('Eco-Tourism Guidelines');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Periyar Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local thekkady-trek.js and CSS', () => {
        expect(html).toContain('href="thekkady-trek.css"');
        expect(html).toContain('src="thekkady-trek.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--thekkady-primary');
        expect(css).toContain('--thekkady-emerald');
        expect(css).toContain('.thekkady-body');
        expect(css).toContain('.thekkady-hero');
    });

    it('contains interactive lightbox, checklist, and tab handlers in javascript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('initGalleryAndLightbox');
    });
});

describe('Thekkady Forest Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata fields', () => {
        expect(data.THEKKADY_TREK_STATS.name).toContain('Kumily–Thekkady Forest Trek');
        expect(data.THEKKADY_TREK_STATS.difficulty).toBe('Easy to Moderate');
        expect(data.THEKKADY_TREK_STATS.elevationMeters).toBe(900);
        expect(data.THEKKADY_TREK_STATS.bestSeasons).toContain('September to March');
    });

    it('contains chronological history timeline', () => {
        expect(data.THEKKADY_TREK_TIMELINE.length).toBeGreaterThanOrEqual(4);
        const reserve = data.THEKKADY_TREK_TIMELINE.find(t => t.year === '1978 CE');
        expect(reserve).toBeDefined();
        expect(reserve.title).toContain('Project Tiger Status');
    });

    it('contains checklist gear items', () => {
        expect(data.THEKKADY_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(5);
        const leechsocks = data.THEKKADY_TREK_CHECKLIST.find(c => c.id === 'leechsocks');
        expect(leechsocks).toBeDefined();
    });
});

describe('Thekkady Forest Trek Profile — Explorer Integrations', () => {
    it('is registered in adventure.html data array', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('name: "Kumily–Thekkady Forest Trek"');
        expect(adventureHtml).toContain('type: "Trekking"');
    });

    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain("url: \"frontend/thekkady-forest-trek/index.html\"");
    });
});
