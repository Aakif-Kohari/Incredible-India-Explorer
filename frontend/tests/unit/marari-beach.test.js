import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/marari-beach', file),
        'utf-8'
    );
}

describe('Marari Beach Kerala — Page Structure & Content (#3038)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges, state and beach title', () => {
        expect(html).toContain('class="hero-section marari-hero"');
        expect(html).toContain('<h1 id="hero-heading">');
        expect(html).toContain('Marari Beach');
        expect(html).toContain('Kerala');
        expect(html).toContain('Alappuzha');
    });

    it('contains all required requirement sections', () => {
        expect(html).toContain('id="location"');
        expect(html).toContain('id="landscape"');
        expect(html).toContain('id="culture"');
        expect(html).toContain('id="interactive-hub"');
        expect(html).toContain('id="gallery"');
    });

    it('documents coastal landscape, village surroundings, and traditional culture', () => {
        expect(html).toContain('Mararikulam');
        expect(html).toContain('Vallams');
        expect(html).toContain('coir');
        expect(html).toContain('Arabian Sea');
        expect(html).toContain('Alappuzha Backwaters');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude"');
        expect(html).toContain('"longitude"');
    });

    it('includes Leaflet map container and attribution', () => {
        expect(html).toContain('marari-map');
        expect(html).toContain('leaflet@1.9.4');
    });

    it('includes visual gallery with image credits and lightbox', () => {
        expect(html).toContain('marari-gallery');
        expect(html).toContain('lightbox-modal');
        expect(html).toContain('attribution-tag');
        expect(html).toContain('loading="lazy"');
    });
});

describe('Marari Beach Kerala — Scripts & Styles', () => {
    it('style.css defines responsive cards, map, lightbox, and themes', () => {
        const css = readFile('style.css');
        expect(css).toContain('.marari-hero');
        expect(css).toContain('.hub-tabs');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('.light-theme');
    });

    it('script.js wires tabs, Leaflet map, lightbox, and theme switching', () => {
        const js = readFile('script.js');
        expect(js).toContain('initMap');
        expect(js).toContain('L.map');
        expect(js).toContain('theme-toggle');
        expect(js).toContain('lightbox-modal');
    });
});
