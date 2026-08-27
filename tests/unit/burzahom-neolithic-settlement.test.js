import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve(__dirname, '../../frontend/burzahom-neolithic-settlement/index.html');
const cssPath = path.resolve(__dirname, '../../frontend/burzahom-neolithic-settlement/style.css');
const jsPath = path.resolve(__dirname, '../../frontend/burzahom-neolithic-settlement/script.js');

let html;
let css;
let js;

beforeAll(() => {
    html = fs.readFileSync(htmlPath, 'utf-8');
    css = fs.readFileSync(cssPath, 'utf-8');
    js = fs.readFileSync(jsPath, 'utf-8');
});

describe('Burzahom page — file structure', () => {
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

describe('Burzahom page — required content sections (per issue #3794)', () => {
    const requiredSections = [
        { id: 'location', label: 'Location' },
        { id: 'pit-dwellings', label: 'Pit Dwellings' },
        { id: 'tools', label: 'Tools' },
        { id: 'pottery', label: 'Pottery' },
        { id: 'burial-evidence', label: 'Burial Evidence' },
        { id: 'chronology', label: 'Chronology' },
        { id: 'map-section', label: 'Map' },
        { id: 'sources', label: 'Sources' },
    ];

    requiredSections.forEach(({ id, label }) => {
        it(`includes the "${label}" section (id="${id}")`, () => {
            expect(html).toMatch(new RegExp(`id="${id}"`));
        });
    });
});

describe('Burzahom page — content accuracy', () => {
    it('documents the correct location (Srinagar district, Kashmir)', () => {
        expect(html).toMatch(/Srinagar/);
        expect(html).toMatch(/Kashmir/);
    });

    it('documents the pit-dwelling construction method', () => {
        expect(html).toMatch(/mud plaster/i);
        expect(html).toMatch(/pit dwelling/i);
    });

    it('documents bone and stone tools', () => {
        expect(html).toMatch(/harpoon/i);
        expect(html).toMatch(/stone tool/i);
    });

    it('documents the hand-made burnished pottery of Period I', () => {
        expect(html).toMatch(/burnished/i);
    });

    it('documents burial practices including dog burials', () => {
        expect(html).toMatch(/red ochre/i);
        expect(html).toMatch(/dog/i);
    });

    it('documents the correct chronological range (3000-1000 BCE)', () => {
        expect(html).toMatch(/3000/);
        expect(html).toMatch(/1000/);
        expect(html).toMatch(/BCE/);
    });

    it('includes an interactive map with the correct coordinates', () => {
        expect(html).toMatch(/id="burzahom-map"/);
        expect(js).toMatch(/34\.169883/);
        expect(js).toMatch(/74\.866841/);
    });

    it('provides a non-empty sources list', () => {
        const sourcesMatch = html.match(/id="sources"[\s\S]*?<\/section>/);
        expect(sourcesMatch).not.toBeNull();
        const listItemCount = (sourcesMatch[0].match(/<li>/g) || []).length;
        expect(listItemCount).toBeGreaterThanOrEqual(3);
    });
});

describe('Burzahom page — interactivity & accessibility', () => {
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
});