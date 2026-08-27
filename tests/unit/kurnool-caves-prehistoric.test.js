import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve(__dirname, '../../frontend/kurnool-caves-prehistoric/index.html');
const cssPath = path.resolve(__dirname, '../../frontend/kurnool-caves-prehistoric/style.css');
const jsPath = path.resolve(__dirname, '../../frontend/kurnool-caves-prehistoric/script.js');

let html;
let css;
let js;

beforeAll(() => {
    html = fs.readFileSync(htmlPath, 'utf-8');
    css = fs.readFileSync(cssPath, 'utf-8');
    js = fs.readFileSync(jsPath, 'utf-8');
});

describe('Kurnool Caves page — file structure', () => {
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

describe('Kurnool Caves page — required content sections (per issue #3786)', () => {
    const requiredSections = [
        { id: 'cave-locations', label: 'Cave Locations' },
        { id: 'archaeological-evidence', label: 'Archaeological Evidence' },
        { id: 'fossils', label: 'Fossils' },
        { id: 'stone-tools', label: 'Stone Tools' },
        { id: 'geological-context', label: 'Geological Context' },
        { id: 'map-section', label: 'Map' },
        { id: 'sources', label: 'Sources' },
    ];

    requiredSections.forEach(({ id, label }) => {
        it(`includes the "${label}" section (id="${id}")`, () => {
            expect(html).toMatch(new RegExp(`id="${id}"`));
        });
    });
});

describe('Kurnool Caves page — content accuracy', () => {
    it('names Billa Surgam and its excavated chambers', () => {
        expect(html).toMatch(/Billa Surgam/);
        expect(html).toMatch(/Cathedral Cave/);
    });

    it('credits Robert Bruce Foote and his 1884-85 excavations', () => {
        expect(html).toMatch(/Robert Bruce Foote/);
        expect(html).toMatch(/1884/);
    });

    it('documents fossil evidence including cut-marked bones', () => {
        expect(html).toMatch(/cut marks/i);
        expect(html).toMatch(/Pleistocene/);
    });

    it('documents stone tool evidence including microliths', () => {
        expect(html).toMatch(/microlithic/i);
        expect(html).toMatch(/chert/i);
    });

    it('documents the limestone/karst geological context', () => {
        expect(html).toMatch(/limestone/i);
        expect(html).toMatch(/Kurnool Group/);
    });

    it('includes an interactive map with multiple site markers', () => {
        expect(html).toMatch(/id="kurnool-map"/);
        expect(js).toMatch(/Billa Surgam Caves/);
        expect(js).toMatch(/Banaganapalli/);
    });

    it('provides a non-empty sources list', () => {
        const sourcesMatch = html.match(/id="sources"[\s\S]*?<\/section>/);
        expect(sourcesMatch).not.toBeNull();
        const listItemCount = (sourcesMatch[0].match(/<li>/g) || []).length;
        expect(listItemCount).toBeGreaterThanOrEqual(3);
    });
});

describe('Kurnool Caves page — interactivity & accessibility', () => {
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
        expect(html).toMatch(/id="kurnool-timeline"/);
        expect(js).toMatch(/timelineEvents/);
    });
});