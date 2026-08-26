import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve(__dirname, '../../frontend/indigo-aviation-brand/index.html');
const cssPath = path.resolve(__dirname, '../../frontend/indigo-aviation-brand/style.css');
const jsPath = path.resolve(__dirname, '../../frontend/indigo-aviation-brand/script.js');

let html;
let css;
let js;

beforeAll(() => {
    html = fs.readFileSync(htmlPath, 'utf-8');
    css = fs.readFileSync(cssPath, 'utf-8');
    js = fs.readFileSync(jsPath, 'utf-8');
});

describe('IndiGo brand page — file structure', () => {
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

describe('IndiGo brand page — required content sections', () => {
    const requiredSections = [
        { id: 'origin', label: 'Origin' },
        { id: 'growth', label: 'Airline Growth' },
        { id: 'fleet-evolution', label: 'Fleet Evolution' },
        { id: 'route-expansion', label: 'Route Expansion' },
        { id: 'route-map-section', label: 'Route-Growth Map' },
        { id: 'timeline-section', label: 'Major Milestones Timeline' },
        { id: 'brand-identity', label: 'Brand Identity' },
        { id: 'sources', label: 'Sources' },
    ];

    requiredSections.forEach(({ id, label }) => {
        it(`includes the "${label}" section (id="${id}")`, () => {
            expect(html).toMatch(new RegExp(`id="${id}"`));
        });
    });
});

describe('IndiGo brand page — acceptance-criteria content accuracy', () => {
    it('documents the founding year and founders', () => {
        expect(html).toMatch(/2005|2006/);
        expect(html).toMatch(/Rahul Bhatia/);
        expect(html).toMatch(/Rakesh Gangwal/);
    });

    it('mentions the first flight route and date', () => {
        expect(html).toMatch(/4 August 2006/);
        expect(html).toMatch(/Guwahati/);
    });

    it('documents becoming India\'s largest carrier by market share', () => {
        expect(html).toMatch(/17 August 2012/);
        expect(html).toMatch(/largest airline/i);
    });

    it('includes a route visualization (map container)', () => {
        expect(html).toMatch(/id="indigo-route-map"/);
        expect(js).toMatch(/indigo-route-map/);
        expect(js).toMatch(/L\.map/);
    });

    it('includes a milestones timeline populated by script.js', () => {
        expect(html).toMatch(/id="indigo-timeline"/);
        expect(js).toMatch(/timelineEvents/);
    });

    it('provides a non-empty sources/references list', () => {
        const sourcesMatch = html.match(/id="sources"[\s\S]*?<\/section>/);
        expect(sourcesMatch).not.toBeNull();
        const sourcesBlock = sourcesMatch[0];
        const listItemCount = (sourcesBlock.match(/<li>/g) || []).length;
        expect(listItemCount).toBeGreaterThanOrEqual(3);
    });
});

describe('IndiGo brand page — interactivity & accessibility', () => {
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

    it('map markers bind popups with hub information', () => {
        expect(js).toMatch(/bindPopup/);
        expect(js).toMatch(/Dubai/);
    });
});