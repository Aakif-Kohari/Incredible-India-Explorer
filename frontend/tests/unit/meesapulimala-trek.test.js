import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/meesapulimala-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('meesapulimala-data.js');
    const fn = new Function(
        code + '\nreturn { MEESAPULIMALA_TREK_STATS, MEESAPULIMALA_HIGHLIGHTS, MEESAPULIMALA_ECOSYSTEM, MEESAPULIMALA_VIEWPOINTS, MEESAPULIMALA_ROUTE_STEPS, MEESAPULIMALA_NEARBY, MEESAPULIMALA_CHECKLIST, MEESAPULIMALA_GALLERY };'
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

describe('Meesapulimala Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('meesapulimala-trek.js');
        css = readTrekFile('meesapulimala-trek.css');
    });

    it('renders title, hero section, and Kerala location badge', () => {
        expect(html).toContain('Meesapulimala Trek');
        expect(html).toContain('Munnar, Idukki, Kerala');
        expect(html).toContain('2nd Highest Peak in South India');
        expect(html).toContain('class="meesa-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Summit Elevation (8,661 ft)');
        expect(html).toContain('Location / District');
        expect(html).toContain('Trek Difficulty');
        expect(html).toContain('Trek Distance (One-Way)');
        expect(html).toContain('Duration & Base Option');
        expect(html).toContain('Best Season');
        expect(html).toContain('Starting Point Base');
    });

    it('documents grassland ecosystem, mountain viewpoints, and nearby attractions', () => {
        expect(html).toContain('Grassland & Shola Ecosystem');
        expect(html).toContain('Notable Mountain Viewpoints');
        expect(html).toContain('Nearby Destinations & Attractions');
    });

    it('embeds Google Maps location route view', () => {
        expect(html).toContain('title="Meesapulimala Route Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('includes tab navigation, interactive calculator, and packing checklist', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnViewpoints"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnNearby"');
        expect(html).toContain('id="tabBtnMap"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('id="tabBtnGallery"');
        expect(html).toContain('id="checklistGrid"');
    });

    it('includes accessible back navigation', () => {
        expect(html).toContain('Back to All Destinations');
        expect(html).toContain('href="../../index.html"');
    });

    it('references local meesapulimala-trek.css and meesapulimala-trek.js', () => {
        expect(html).toContain('href="meesapulimala-trek.css"');
        expect(html).toContain('src="meesapulimala-trek.js"');
        expect(html).toContain('src="meesapulimala-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--meesa-emerald');
        expect(css).toContain('--meesa-rhodo-pink');
        expect(css).toContain('.meesa-body');
        expect(css).toContain('.meesa-hero');
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

describe('Meesapulimala Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata facts', () => {
        expect(data.MEESAPULIMALA_TREK_STATS.name).toBe('Meesapulimala Trek');
        expect(data.MEESAPULIMALA_TREK_STATS.location).toContain('Munnar');
        expect(data.MEESAPULIMALA_TREK_STATS.difficulty).toContain('Moderate');
        expect(data.MEESAPULIMALA_TREK_STATS.elevationMeters).toBe(2640);
        expect(data.MEESAPULIMALA_TREK_STATS.distanceKm).toBe(8.0);
        expect(data.MEESAPULIMALA_TREK_STATS.bestSeasons).toContain('September to May');
    });

    it('contains grassland ecosystem & flora details', () => {
        expect(data.MEESAPULIMALA_ECOSYSTEM.features.length).toBeGreaterThanOrEqual(4);
        expect(data.MEESAPULIMALA_ECOSYSTEM.title).toContain('Montane Grassland');
    });

    it('contains mountain viewpoints', () => {
        expect(data.MEESAPULIMALA_VIEWPOINTS.length).toBeGreaterThanOrEqual(3);
        const summit = data.MEESAPULIMALA_VIEWPOINTS.find(v => v.altitude.includes('2,640'));
        expect(summit).toBeDefined();
    });

    it('contains route steps and checkpoints', () => {
        expect(data.MEESAPULIMALA_ROUTE_STEPS.length).toBeGreaterThanOrEqual(4);
        expect(data.MEESAPULIMALA_ROUTE_STEPS[0].title).toContain('Munnar');
    });

    it('contains nearby attractions', () => {
        expect(data.MEESAPULIMALA_NEARBY.length).toBeGreaterThanOrEqual(3);
        const kolukku = data.MEESAPULIMALA_NEARBY.find(n => n.name.includes('Kolukkumalai'));
        expect(kolukku).toBeDefined();
    });

    it('contains gallery items with descriptive ALT text and image credits', () => {
        expect(data.MEESAPULIMALA_GALLERY.length).toBeGreaterThanOrEqual(3);
        data.MEESAPULIMALA_GALLERY.forEach(img => {
            expect(img.alt).toBeDefined();
            expect(img.alt.length).toBeGreaterThan(10);
            expect(img.credit).toBeDefined();
            expect(img.credit).toContain('Photo Credit');
        });
    });
});

describe('Meesapulimala Trek Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/meesapulimala-trek/index.html');
        expect(searchIndex).toContain('Meesapulimala Trek');
    });

    it('is registered in adventure.html', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('Meesapulimala Trek');
        expect(adventureHtml).toContain('Idukki, Kerala');
    });

    it('is registered in trekking-destinations.js', () => {
        const trekkingJS = readTrekkingDestinationsJS();
        expect(trekkingJS).toContain('Meesapulimala');
        expect(trekkingJS).toContain('Kerala');
    });
});
