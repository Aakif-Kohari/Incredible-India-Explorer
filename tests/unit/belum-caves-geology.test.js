import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve(__dirname, '../../frontend/belum-caves-geology/index.html');
const cssPath = path.resolve(__dirname, '../../frontend/belum-caves-geology/style.css');
const jsPath = path.resolve(__dirname, '../../frontend/belum-caves-geology/script.js');

let html;
let css;
let js;

beforeAll(() => {
    html = fs.readFileSync(htmlPath, 'utf-8');
    css = fs.readFileSync(cssPath, 'utf-8');
    js = fs.readFileSync(jsPath, 'utf-8');
});

describe('Belum Caves page — file structure', () => {
    it('index.html exists and is non-empty', () => {
        expect(html).toBeTruthy();
        expect(html.length).toBeGreaterThan(500);
    });

    it('style.css exists and is non-empty', () => {
        expect(css).toBeTruthy();
        expect(css.length).toBeGreaterThan(200);
    });

    it('script.js exists and is non-empty', () => {
        expect(js).toBeTruthy();
        expect(js.length).toBeGreaterThan(100);
    });

    it('links to style.css and script.js relatively', () => {
        expect(html).toMatch(/href="style\.css"/);
        expect(html).toMatch(/src="script\.js"/);
    });

    it('loads Leaflet CSS and JS with integrity hashes', () => {
        expect(html).toMatch(/leaflet\.css/);
        expect(html).toMatch(/integrity="sha256-/);
    });
});

describe('Belum Caves page — required content sections (per issue #3787)', () => {
    const requiredSections = [
        { id: 'cave-formation', label: 'Cave Formation' },
        { id: 'limestone-geology', label: 'Limestone Geology' },
        { id: 'underground-features', label: 'Underground Features' },
        { id: 'geological-timeline', label: 'Geological Timeline' },
        { id: 'natural-formations', label: 'Natural Formations' },
        { id: 'map-section', label: 'Interactive Map' },
        { id: 'sources', label: 'Sources' },
    ];

    requiredSections.forEach(({ id, label }) => {
        it(`includes the "${label}" section (id="${id}")`, () => {
            expect(html).toMatch(new RegExp(`id="${id}"`));
        });
    });
});

describe('Belum Caves page — content accuracy', () => {
    it('documents karst dissolution as the formation mechanism', () => {
        expect(html).toMatch(/karst/i);
        expect(html).toMatch(/Chitravathi/);
    });

    it('documents the correct host rock (Narji Limestone, Kurnool Group)', () => {
        expect(html).toMatch(/Narji Limestone/);
        expect(html).toMatch(/Kurnool/);
    });

    it('documents stalactite and stalagmite speleothem formation', () => {
        expect(html).toMatch(/stalactite/i);
        expect(html).toMatch(/stalagmite/i);
    });

    it('names at least 3 underground chambers/features', () => {
        expect(html).toMatch(/Gebauer Hall/);
        expect(html).toMatch(/Kotilingalu/);
        expect(html).toMatch(/Simhadwaram/);
    });

    it('documents the correct total cave length', () => {
        expect(html).toMatch(/3,229/);
    });

    it('includes an interactive map with the correct coordinates', () => {
        expect(html).toMatch(/id="belum-map"/);
        expect(js).toMatch(/15\.10417/);
        expect(js).toMatch(/78\.13056/);
    });

    it('provides a non-empty sources list', () => {
        const sourcesMatch = html.match(/id="sources"[\s\S]*?<\/section>/);
        expect(sourcesMatch).not.toBeNull();
        const listItemCount = (sourcesMatch[0].match(/<li>/g) || []).length;
        expect(listItemCount).toBeGreaterThanOrEqual(3);
    });
});

describe('Belum Caves page — interactivity & accessibility', () => {
    it('script.js wires up the theme toggle button', () => {
        expect(js).toMatch(/theme-toggle/);
        expect(js).toMatch(/light-theme/);
    });

    it('script.js wires up the mobile menu toggle', () => {
        expect(js).toMatch(/menu-toggle/);
        expect(js).toMatch(/aria-expanded/);
    });

    it('page has a theme-toggle button with an aria-label', () => {
        expect(html).toMatch(/id="theme-toggle"[^>]*aria-label/);
    });

    it('map markers bind popups with site information', () => {
        expect(js).toMatch(/bindPopup/);
    });

    it('timeline is rendered dynamically from script.js data', () => {
        expect(html).toMatch(/id="belum-timeline"/);
        expect(js).toMatch(/timelineEvents/);
    });
});