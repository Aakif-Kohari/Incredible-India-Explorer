import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/chembra-peak-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('chembra-data.js');
    const fn = new Function(
        code + '\nreturn { CHEMBRA_TREK_STATS, CHEMBRA_HIGHLIGHTS, CHEMBRA_LAKE_INFO, CHEMBRA_ROUTE_STEPS, CHEMBRA_VIEWPOINTS, CHEMBRA_NEARBY, CHEMBRA_CHECKLIST, CHEMBRA_GALLERY };'
    );
    return fn();
}

function readAdventurePage() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/adventure/adventure.html'),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/search-index.js'),
        'utf-8'
    );
}

function readTrekkingDestinationsJS() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/trekking-destinations/trekking-destinations.js'),
        'utf-8'
    );
}

describe('Chembra Peak Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('chembra-trek.js');
        css = readTrekFile('chembra-trek.css');
    });

    it('renders title, hero section, and Kerala location badge', () => {
        expect(html).toContain('Chembra Peak Trek');
        expect(html).toContain('Wayanad, Kerala');
        expect(html).toContain('class="chembra-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Summit Elevation (6,890 ft)');
        expect(html).toContain('Location / District');
        expect(html).toContain('Trek Difficulty');
        expect(html).toContain('Trek Distance (One-Way)');
        expect(html).toContain('Approx. Round Trip Time');
        expect(html).toContain('Best Season');
        expect(html).toContain('Starting Point');
    });

    it('documents the famous heart-shaped lake (Hridayathadam)', () => {
        expect(html).toContain('Hridayathadam — Heart-Shaped Lake');
        expect(html).toContain('Perennial Heart-Shaped Lake');
    });

    it('documents forest landscape, viewpoints, and nearby attractions', () => {
        expect(html).toContain('Shola & Tropical Rainforests');
        expect(html).toContain('Major Viewpoints on Chembra Trail');
        expect(html).toContain('Nearby Attractions in Wayanad');
    });

    it('includes tab navigation, interactive calculator, and packing checklist', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnLake"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnViewpoints"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('id="tabBtnGallery"');
        expect(html).toContain('id="checklistGrid"');
    });

    it('includes accessible back navigation', () => {
        expect(html).toContain('Back to All Destinations');
        expect(html).toContain('href="../../index.html"');
    });

    it('references local chembra-trek.css and chembra-trek.js', () => {
        expect(html).toContain('href="chembra-trek.css"');
        expect(html).toContain('src="chembra-trek.js"');
        expect(html).toContain('src="chembra-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--chembra-emerald');
        expect(css).toContain('--chembra-heart');
        expect(css).toContain('.chembra-body');
        expect(css).toContain('.chembra-hero');
    });

    it('contains client-side interactions in JavaScript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initTrekCalculator');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('renderGallery');
        expect(js).toContain('initLightbox');
        expect(js).toContain('initThemeToggle');
    });
});

describe('Chembra Peak Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata facts', () => {
        expect(data.CHEMBRA_TREK_STATS.name).toBe('Chembra Peak Trek');
        expect(data.CHEMBRA_TREK_STATS.location).toContain('Wayanad');
        expect(data.CHEMBRA_TREK_STATS.difficulty).toBe('Moderate');
        expect(data.CHEMBRA_TREK_STATS.elevationMeters).toBe(2100);
        expect(data.CHEMBRA_TREK_STATS.distanceKm).toBe(4.5);
        expect(data.CHEMBRA_TREK_STATS.bestSeasons).toContain('September to March');
    });

    it('contains heart-shaped lake details', () => {
        expect(data.CHEMBRA_LAKE_INFO.name).toContain('Hridayathadam');
        expect(data.CHEMBRA_LAKE_INFO.perennial).toBe(true);
    });

    it('contains route steps and checkpoints', () => {
        expect(data.CHEMBRA_ROUTE_STEPS.length).toBeGreaterThanOrEqual(4);
        expect(data.CHEMBRA_ROUTE_STEPS[0].title).toContain('Meppadi');
    });

    it('contains nearby attractions', () => {
        expect(data.CHEMBRA_NEARBY.length).toBeGreaterThanOrEqual(3);
        const soochipara = data.CHEMBRA_NEARBY.find(n => n.name.includes('Soochipara'));
        expect(soochipara).toBeDefined();
    });

    it('contains gallery items with descriptive ALT text and image credits', () => {
        expect(data.CHEMBRA_GALLERY.length).toBeGreaterThanOrEqual(3);
        data.CHEMBRA_GALLERY.forEach(img => {
            expect(img.alt).toBeDefined();
            expect(img.alt.length).toBeGreaterThan(10);
            expect(img.credit).toBeDefined();
            expect(img.credit).toContain('Photo Credit');
        });
    });
});

describe('Chembra Peak Trek Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/chembra-peak-trek/index.html');
        expect(searchIndex).toContain('Chembra Peak Trek');
    });

    it('is registered in adventure.html', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('Chembra Peak Trek');
        expect(adventureHtml).toContain('Wayanad, Kerala');
    });

    it('is registered in trekking-destinations.js', () => {
        const trekkingJS = readTrekkingDestinationsJS();
        expect(trekkingJS).toContain('Chembra Peak');
        expect(trekkingJS).toContain('Kerala');
    });
});
