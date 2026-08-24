import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/rajmachi-fort-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('rajmachi-data.js');
    const fn = new Function(
        code + '\nreturn { RAJMACHI_TREK_STATS, RAJMACHI_HIGHLIGHTS, RAJMACHI_FORT_HISTORY, RAJMACHI_ROUTES, RAJMACHI_MONSOON_INFO, RAJMACHI_NEARBY, RAJMACHI_CHECKLIST, RAJMACHI_GALLERY };'
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

describe('Rajmachi Fort Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('rajmachi-trek.js');
        css = readTrekFile('rajmachi-trek.css');
    });

    it('renders title, hero section, and twin fort badges', () => {
        expect(html).toContain('Rajmachi Fort Trek');
        expect(html).toContain('Lonavala / Karjat, Maharashtra');
        expect(html).toContain('Shrivardhan');
        expect(html).toContain('class="rajmachi-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Fort Elevation (2,710 ft)');
        expect(html).toContain('Location Region (Maharashtra)');
        expect(html).toContain('Trek Difficulty');
        expect(html).toContain('Distance (Lonavala vs Karjat)');
        expect(html).toContain('Trek Duration & Camping');
        expect(html).toContain('Monsoon & Winter Season');
        expect(html).toContain('Starting Points');
    });

    it('documents fort heritage, twin routes, monsoon scenery, and nearby attractions', () => {
        expect(html).toContain('Shrivardhan & Manaranjan Twin Citadels');
        expect(html).toContain('Two Distinct Starting Routes');
        expect(html).toContain('Sahyadri Monsoon Scenery & Waterfalls');
        expect(html).toContain('Nearby Destinations & Buddhist Caves');
    });

    it('embeds Google Maps location route view', () => {
        expect(html).toContain('title="Rajmachi Fort Route Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('includes tab navigation, interactive calculator, and packing checklist', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnRoutes"');
        expect(html).toContain('id="tabBtnMonsoon"');
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

    it('references local rajmachi-trek.css and rajmachi-trek.js', () => {
        expect(html).toContain('href="rajmachi-trek.css"');
        expect(html).toContain('src="rajmachi-trek.js"');
        expect(html).toContain('src="rajmachi-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--rajmachi-emerald');
        expect(css).toContain('--rajmachi-fort-gold');
        expect(css).toContain('.rajmachi-body');
        expect(css).toContain('.rajmachi-hero');
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

describe('Rajmachi Fort Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata facts', () => {
        expect(data.RAJMACHI_TREK_STATS.name).toBe('Rajmachi Fort Trek');
        expect(data.RAJMACHI_TREK_STATS.location).toContain('Lonavala');
        expect(data.RAJMACHI_TREK_STATS.difficulty).toContain('Easy to Moderate');
        expect(data.RAJMACHI_TREK_STATS.elevationMeters).toBe(825);
        expect(data.RAJMACHI_TREK_STATS.distanceLonavalaKm).toBe(15.0);
        expect(data.RAJMACHI_TREK_STATS.bestSeasons).toContain('June to September');
    });

    it('contains fort history & Shivaji Maharaj milestones', () => {
        expect(data.RAJMACHI_FORT_HISTORY.milestones.length).toBeGreaterThanOrEqual(4);
        const shivaji = data.RAJMACHI_FORT_HISTORY.milestones.find(m => m.includes('Shivaji'));
        expect(shivaji).toBeDefined();
    });

    it('contains two distinct starting routes', () => {
        expect(data.RAJMACHI_ROUTES.length).toBe(2);
        expect(data.RAJMACHI_ROUTES[0].name).toContain('Lonavala');
        expect(data.RAJMACHI_ROUTES[1].name).toContain('Kondhane');
    });

    it('contains monsoon scenery info', () => {
        expect(data.RAJMACHI_MONSOON_INFO.highlights.length).toBeGreaterThanOrEqual(3);
        expect(data.RAJMACHI_MONSOON_INFO.safetyNote).toBeDefined();
    });

    it('contains nearby attractions including Kondhane Caves', () => {
        expect(data.RAJMACHI_NEARBY.length).toBeGreaterThanOrEqual(3);
        const caves = data.RAJMACHI_NEARBY.find(n => n.name.includes('Kondhane'));
        expect(caves).toBeDefined();
    });

    it('contains gallery items with descriptive ALT text and image credits', () => {
        expect(data.RAJMACHI_GALLERY.length).toBeGreaterThanOrEqual(3);
        data.RAJMACHI_GALLERY.forEach(img => {
            expect(img.alt).toBeDefined();
            expect(img.alt.length).toBeGreaterThan(10);
            expect(img.credit).toBeDefined();
            expect(img.credit).toContain('Photo Credit');
        });
    });
});

describe('Rajmachi Fort Trek Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/rajmachi-fort-trek/index.html');
        expect(searchIndex).toContain('Rajmachi Fort Trek');
    });

    it('is registered in adventure.html', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('Rajmachi Fort Trek');
        expect(adventureHtml).toContain('Maharashtra');
    });

    it('is registered in trekking-destinations.js', () => {
        const trekkingJS = readTrekkingDestinationsJS();
        expect(trekkingJS).toContain('Rajmachi');
        expect(trekkingJS).toContain('Maharashtra');
    });
});
