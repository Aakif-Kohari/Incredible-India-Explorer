import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/agasthyarkoodam-trek', file),
        'utf-8'
    );
}

function loadTrekData() {
    const code = readTrekFile('agasthya-data.js');
    const fn = new Function(
        code + '\nreturn { AGASTHYA_TREK_STATS, AGASTHYA_HIGHLIGHTS, AGASTHYA_BIODIVERSITY_INFO, AGASTHYA_ROUTE_STEPS, AGASTHYA_PERMITS_SAFETY, AGASTHYA_CHECKLIST, AGASTHYA_GALLERY };'
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

describe('Agasthyarkoodam Trek Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('agasthya-trek.js');
        css = readTrekFile('agasthya-trek.css');
    });

    it('renders title, hero section, and UNESCO Biosphere badge', () => {
        expect(html).toContain('Agasthyarkoodam Trek');
        expect(html).toContain('Thiruvananthapuram, Kerala');
        expect(html).toContain('UNESCO Agasthyamala Biosphere Reserve');
        expect(html).toContain('class="agasthya-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Summit Elevation (6,129 ft)');
        expect(html).toContain('District, Kerala');
        expect(html).toContain('Trek Difficulty');
        expect(html).toContain('Trek Distance (One-Way)');
        expect(html).toContain('Duration & Base Camp');
        expect(html).toContain('Restricted Access Window');
        expect(html).toContain('Starting Point');
    });

    it('documents biodiversity, mountain landscape, cultural heritage, and safety/permits', () => {
        expect(html).toContain('UNESCO Agasthyamala Biosphere Reserve');
        expect(html).toContain('Forest Ecosystem & Peak Terrain');
        expect(html).toContain('Sage Agastya & Medicinal Lineage');
        expect(html).toContain('Forest Department Entry Permits & Safety Rules');
    });

    it('includes tab navigation, interactive calculator, and packing checklist', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnLandscape"');
        expect(html).toContain('id="tabBtnCulture"');
        expect(html).toContain('id="tabBtnPermits"');
        expect(html).toContain('id="tabBtnRoute"');
        expect(html).toContain('id="tabBtnPlanner"');
        expect(html).toContain('id="tabBtnGallery"');
        expect(html).toContain('id="checklistGrid"');
    });

    it('includes accessible back navigation', () => {
        expect(html).toContain('Back to All Destinations');
        expect(html).toContain('href="../../index.html"');
    });

    it('references local agasthya-trek.css and agasthya-trek.js', () => {
        expect(html).toContain('href="agasthya-trek.css"');
        expect(html).toContain('src="agasthya-trek.js"');
        expect(html).toContain('src="agasthya-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--agasthya-emerald');
        expect(css).toContain('--agasthya-amber');
        expect(css).toContain('.agasthya-body');
        expect(css).toContain('.agasthya-hero');
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

describe('Agasthyarkoodam Trek Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('verifies trek metadata facts', () => {
        expect(data.AGASTHYA_TREK_STATS.name).toBe('Agasthyarkoodam Trek');
        expect(data.AGASTHYA_TREK_STATS.location).toContain('Thiruvananthapuram');
        expect(data.AGASTHYA_TREK_STATS.difficulty).toContain('Hard');
        expect(data.AGASTHYA_TREK_STATS.elevationMeters).toBe(1868);
        expect(data.AGASTHYA_TREK_STATS.distanceKm).toBe(14.0);
        expect(data.AGASTHYA_TREK_STATS.accessSeason).toContain('January to March');
    });

    it('contains biodiversity details including Arogyapacha', () => {
        expect(data.AGASTHYA_BIODIVERSITY_INFO.totalMedicinalPlants).toContain('2,000');
        expect(data.AGASTHYA_BIODIVERSITY_INFO.keyHerb).toContain('Arogyapacha');
    });

    it('contains 2-day route steps and checkpoints', () => {
        expect(data.AGASTHYA_ROUTE_STEPS.length).toBeGreaterThanOrEqual(4);
        expect(data.AGASTHYA_ROUTE_STEPS[0].title).toContain('Bonacaud');
    });

    it('contains safety & permit rules', () => {
        expect(data.AGASTHYA_PERMITS_SAFETY.length).toBeGreaterThanOrEqual(4);
        const pass = data.AGASTHYA_PERMITS_SAFETY.find(p => p.title.includes('Forest Pass'));
        expect(pass).toBeDefined();
    });

    it('contains gallery items with descriptive ALT text and image credits', () => {
        expect(data.AGASTHYA_GALLERY.length).toBeGreaterThanOrEqual(3);
        data.AGASTHYA_GALLERY.forEach(img => {
            expect(img.alt).toBeDefined();
            expect(img.alt.length).toBeGreaterThan(10);
            expect(img.credit).toBeDefined();
            expect(img.credit).toContain('Photo Credit');
        });
    });
});

describe('Agasthyarkoodam Trek Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/agasthyarkoodam-trek/index.html');
        expect(searchIndex).toContain('Agasthyarkoodam Trek');
    });

    it('is registered in adventure.html', () => {
        const adventureHtml = readAdventurePage();
        expect(adventureHtml).toContain('Agasthyarkoodam Trek');
        expect(adventureHtml).toContain('Thiruvananthapuram, Kerala');
    });

    it('is registered in trekking-destinations.js', () => {
        const trekkingJS = readTrekkingDestinationsJS();
        expect(trekkingJS).toContain('Agasthyarkoodam Trek');
        expect(trekkingJS).toContain('Kerala');
    });
});
