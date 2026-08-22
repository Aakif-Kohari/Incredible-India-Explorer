import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/marina-beach', file),
        'utf-8'
    );
}

describe('Marina Beach Tamil Nadu — Page Structure & Content (#3041)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges, state and beach title', () => {
        expect(html).toContain('class="hero-section marina-hero"');
        expect(html).toContain('<h1 id="hero-heading">');
        expect(html).toContain('Marina Beach');
        expect(html).toContain('Tamil Nadu');
        expect(html).toContain('Chennai');
    });

    it('contains all required requirement sections', () => {
        expect(html).toContain('id="location"');
        expect(html).toContain('id="chennai-connection"');
        expect(html).toContain('id="landmarks"');
        expect(html).toContain('id="activities"');
        expect(html).toContain('id="interactive-hub"');
        expect(html).toContain('id="gallery"');
    });

    it('documents urban context, Chennai connection, Lighthouse, and landmarks', () => {
        expect(html).toContain('Chennai Lighthouse');
        expect(html).toContain('Triumph of Labour');
        expect(html).toContain('Santhome Cathedral');
        expect(html).toContain('Bay of Bengal');
        expect(html).toContain('Coromandel');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude"');
        expect(html).toContain('"longitude"');
    });

    it('includes Leaflet map container and attribution', () => {
        expect(html).toContain('marina-map');
        expect(html).toContain('leaflet@1.9.4');
    });

    it('includes visual gallery with image credits and lightbox', () => {
        expect(html).toContain('marina-gallery');
        expect(html).toContain('lightbox-modal');
        expect(html).toContain('attribution-tag');
        expect(html).toContain('loading="lazy"');
    });
});

describe('Marina Beach Tamil Nadu — Scripts & Styles', () => {
    it('style.css defines responsive cards, map, lightbox, and themes', () => {
        const css = readFile('style.css');
        expect(css).toContain('.marina-hero');
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
