import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(resolve(__dirname, '../../frontend/hampta-pass-trek', file), 'utf-8');
}

function loadTrekData() {
    const code = readTrekFile('hampta-data.js');
    const fn = new Function(
        code +
            '\nreturn { HAMPTA_TREK_STATS, HAMPTA_TREK_ROUTE, HAMPTA_TREK_HIGHLIGHTS, HAMPTA_TREK_CHECKLIST, HAMPTA_TREK_GALLERY };'
    );
    return fn();
}

describe('Hampta Pass Trek — Page Structure', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        js = readTrekFile('hampta-trek.js');
        css = readTrekFile('hampta-trek.css');
    });

    it('contains the required trek profile information', () => {
        expect(html).toContain('Hampta Pass Trek');
        expect(html).toContain('Himachal Pradesh');
        expect(html).toContain('Moderate');
        expect(html).toContain('5 Days / 4 Nights');
        expect(html).toContain('June–September');
        expect(html).toContain('Jobra');
    });

    it('contains overview, route, gallery, planner and map tabs', () => {
        expect(html).toContain('id="tabOverview"');
        expect(html).toContain('id="tabRoute"');
        expect(html).toContain('id="tabGallery"');
        expect(html).toContain('id="tabPlanner"');
        expect(html).toContain('id="tabMap"');
    });

    it('contains a map embed', () => {
        expect(html).toContain('title="Hampta Pass Map"');
        expect(html).toContain('google.com/maps?q=Hampta%20Pass');
    });

    it('references the local CSS, data and JavaScript files', () => {
        expect(html).toContain('href="hampta-trek.css"');
        expect(html).toContain('src="hampta-data.js"');
        expect(html).toContain('src="hampta-trek.js"');
    });

    it('contains credited gallery source links', () => {
        expect(html).toContain('Wikimedia Commons');
        expect(html).toContain('CC BY-SA 4.0');
        expect(html).toContain('CC BY 2.0');
    });

    it('contains responsive CSS and interactive handlers', () => {
        expect(css).toContain('@media (max-width: 620px)');
        expect(css).toContain('.hampta-hero');
        expect(js).toContain('initTabs');
        expect(js).toContain('renderRoute');
        expect(js).toContain('renderChecklist');
        expect(js).toContain('renderGallery');
    });
});

describe('Hampta Pass Trek — Dataset', () => {
    let data;

    beforeAll(() => {
        data = loadTrekData();
    });

    it('has the required metadata', () => {
        expect(data.HAMPTA_TREK_STATS.name).toBe('Hampta Pass Trek');
        expect(data.HAMPTA_TREK_STATS.location).toContain('Himachal Pradesh');
        expect(data.HAMPTA_TREK_STATS.difficulty).toBe('Moderate');
        expect(data.HAMPTA_TREK_STATS.elevationMeters).toBe(4270);
        expect(data.HAMPTA_TREK_STATS.duration).toContain('5 days');
        expect(data.HAMPTA_TREK_STATS.bestSeasons).toContain('June');
        expect(data.HAMPTA_TREK_STATS.startingPoint).toContain('Jobra');
    });

    it('contains a complete five-day route', () => {
        expect(data.HAMPTA_TREK_ROUTE).toHaveLength(5);
        expect(data.HAMPTA_TREK_ROUTE[0].title).toContain('Jobra');
        expect(data.HAMPTA_TREK_ROUTE[2].title).toContain('Hampta Pass');
        expect(data.HAMPTA_TREK_ROUTE[3].title).toContain('Chatru');
    });

    it('contains required highlights and preparation items', () => {
        expect(data.HAMPTA_TREK_HIGHLIGHTS.length).toBeGreaterThanOrEqual(5);
        expect(data.HAMPTA_TREK_CHECKLIST.length).toBeGreaterThanOrEqual(8);
    });

    it('contains image attribution metadata for every gallery item', () => {
        expect(data.HAMPTA_TREK_GALLERY.length).toBeGreaterThanOrEqual(3);
        for (const item of data.HAMPTA_TREK_GALLERY) {
            expect(item.image).toContain('commons.wikimedia.org');
            expect(item.source).toBeTruthy();
            expect(item.license).toBeTruthy();
            expect(item.sourceUrl).toContain('commons.wikimedia.org');
        }
    });
});
