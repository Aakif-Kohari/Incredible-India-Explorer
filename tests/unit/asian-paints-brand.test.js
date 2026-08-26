import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve(__dirname, '../../frontend/asian-paints-brand/index.html');
const cssPath = path.resolve(__dirname, '../../frontend/asian-paints-brand/style.css');
const jsPath = path.resolve(__dirname, '../../frontend/asian-paints-brand/script.js');

let html;
let css;
let js;

beforeAll(() => {
    html = fs.readFileSync(htmlPath, 'utf-8');
    css = fs.readFileSync(cssPath, 'utf-8');
    js = fs.readFileSync(jsPath, 'utf-8');
});

describe('Asian Paints brand page — file structure', () => {
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
});

describe('Asian Paints brand page — required content sections', () => {
    const requiredSections = [
        { id: 'origin-founding', label: 'Origin & Founding' },
        { id: 'product-categories', label: 'Product Categories' },
        { id: 'timeline-section', label: 'Colour & Brand Timeline' },
        { id: 'campaigns', label: 'Colour & Design Campaigns' },
        { id: 'market-growth', label: 'Indian Market Growth' },
        { id: 'sources', label: 'Sources & Visual Asset Credits' },
    ];

    requiredSections.forEach(({ id, label }) => {
        it(`includes the "${label}" section (id="${id}")`, () => {
            expect(html).toMatch(new RegExp(`id="${id}"`));
        });
    });
});

describe('Asian Paints brand page — acceptance-criteria content accuracy', () => {
    it('documents the founding date and all four founders', () => {
        expect(html).toMatch(/1942/);
        expect(html).toMatch(/Champaklal/);
        expect(html).toMatch(/Chimanlal/);
        expect(html).toMatch(/Suryakant/);
        expect(html).toMatch(/Arvind/);
    });

    it('documents becoming India\'s largest paint company in 1967', () => {
        expect(html).toMatch(/1967/);
    });

    it('categorizes at least 4 product categories via landscape cards', () => {
        const productMatch = html.match(/id="product-categories"[\s\S]*?<\/section>/);
        expect(productMatch).not.toBeNull();
        const cardCount = (productMatch[0].match(/landscape-card/g) || []).length;
        expect(cardCount).toBeGreaterThanOrEqual(4);
    });

    it('mentions both the Gattu mascot and the Har Ghar Kuch Kehta Hai campaign', () => {
        expect(html).toMatch(/Gattu/);
        expect(html).toMatch(/Har Ghar Kuch Kehta Hai/);
    });

    it('includes a timeline populated by script.js with colour swatches', () => {
        expect(html).toMatch(/id="ap-timeline"/);
        expect(js).toMatch(/timelineEvents/);
        expect(js).toMatch(/timeline-swatch/);
    });

    it('provides a non-empty sources/credits list', () => {
        const sourcesMatch = html.match(/id="sources"[\s\S]*?<\/section>/);
        expect(sourcesMatch).not.toBeNull();
        const listItemCount = (sourcesMatch[0].match(/<li>/g) || []).length;
        expect(listItemCount).toBeGreaterThanOrEqual(3);
    });
});

describe('Asian Paints brand page — interactivity & accessibility', () => {
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
});