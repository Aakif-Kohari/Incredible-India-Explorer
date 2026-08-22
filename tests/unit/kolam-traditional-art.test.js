import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kolam-traditional-art', file),
        'utf-8'
    );
}

describe('Kolam Traditional Floor Art — Page Structure & Content (#2927)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains a hero section with badges and title', () => {
        expect(html).toContain('class="hero-section kolam-hero"');
        expect(html).toContain('<h1 id="hero-heading">');
        expect(html).toContain('Kolam');
        expect(html).toContain('Sacred Geometry');
    });

    it('contains all required cultural sections', () => {
        expect(html).toContain('id="traditions"');
        expect(html).toContain('id="regional"');
        expect(html).toContain('id="patterns"');
        expect(html).toContain('id="interactive"');
        expect(html).toContain('id="gallery"');
    });

    it('documents regional variations and materials accurately', () => {
        expect(html).toContain('Tamil Nadu');
        expect(html).toContain('Muggu');
        expect(html).toContain('Pookkalam');
        expect(html).toContain('Rangavalli');
        expect(html).toContain('Rice Powder');
        expect(html).toContain('Kaavi');
        expect(html).toContain('Margazhi');
    });

    it('includes a digital SVG pattern canvas and controls', () => {
        expect(html).toContain('kolam-svg-canvas');
        expect(html).toContain('btn-toggle-dots');
        expect(html).toContain('btn-toggle-kaavi');
        expect(html).toContain('btn-replay-animation');
    });

    it('contains properly credited gallery images with alt text', () => {
        expect(html).toContain('class="gallery-grid"');
        expect(html).toContain('photo-credit');
        expect(html).toContain('loading="lazy"');
    });

    it('includes structured data (JSON-LD Article schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
    });
});

describe('Kolam Traditional Floor Art — Scripts & Styles', () => {
    it('style.css defines responsive layout, SVG styles, and theme variables', () => {
        const css = readFile('style.css');
        expect(css).toContain('.kolam-hero');
        expect(css).toContain('.kolam-svg-canvas');
        expect(css).toContain('.kolam-path');
        expect(css).toContain('.light-theme');
    });

    it('script.js provides SVG generation, pattern switching, and animation logic', () => {
        const js = readFile('script.js');
        expect(js).toContain('patternData');
        expect(js).toContain('brahma-mudi');
        expect(js).toContain('renderKolam');
        expect(js).toContain('theme-toggle');
    });
});
