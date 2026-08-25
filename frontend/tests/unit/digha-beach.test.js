import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../digha-beach', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/digha-beach', file), 'utf-8');
}

describe('Digha Beach West Bengal — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges, title, and subtitle', () => {
        expect(html).toContain('class="hero-section"');
        expect(html).toContain('<h1 id="hero-heading">Digha Beach</h1>');
        expect(html).toContain("West Bengal's &ldquo;Brighton of the East&rdquo;");
        expect(html).toContain('West Bengal');
        expect(html).toContain('Bay of Bengal');
    });

    it('contains all required informational sections', () => {
        expect(html).toContain('id="geo-heading"');
        expect(html).toContain('id="overview-heading"');
        expect(html).toContain('id="natural-heading"');
        expect(html).toContain('id="marine-heading"');
        expect(html).toContain('id="culture-heading"');
    });

    it('contains tide guide, coastline comparison, and weekend itinerary', () => {
        expect(html).toContain('id="tide-guide"');
        expect(html).toContain('id="tide-heading"');
        expect(html).toContain('id="comparison-heading"');
        expect(html).toContain('id="itinerary"');
        expect(html).toContain('Old Digha');
        expect(html).toContain('New Digha');
        expect(html).toContain('Udaipur Beach');
        expect(html).toContain('Talsari Beach');
        expect(html).toContain('Shankarpur');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude": 21.6384');
        expect(html).toContain('"longitude": 87.5096');
    });

    it('includes Leaflet map container and controls', () => {
        expect(html).toContain('id="digha-map"');
        expect(html).toContain('data-map-filter="all"');
        expect(html).toContain('data-map-filter="beaches"');
        expect(html).toContain('data-map-filter="attractions"');
    });

    it('includes visual gallery and enhanced lightbox modal with nav controls', () => {
        expect(html).toContain('id="digha-gallery"');
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-prev-btn"');
        expect(html).toContain('id="lightbox-next-btn"');
        expect(html).toContain('id="lightbox-counter"');
        expect(html).toContain('loading="lazy"');
    });

    it('includes ocean soundscape toggle and share button', () => {
        expect(html).toContain('id="ocean-audio-toggle"');
        expect(html).toContain('id="share-btn"');
        expect(html).toContain('id="back-to-top"');
    });
});

describe('Digha Beach West Bengal — Styles & Scripts', () => {
    it('style.css defines theme variables, glassmorphism, responsive cards, and lightbox', () => {
        const css = readFile('style.css');
        expect(css).toContain('--primary-color: #e11d48;');
        expect(css).toContain('.digha-page');
        expect(css).toContain('.tide-card');
        expect(css).toContain('.comparison-table');
        expect(css).toContain('.itinerary-panel');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('.lightbox-nav-btn');
        expect(css).toContain('.floating-btn');
    });

    it('script.js wires interactive tabs, Leaflet map, gallery filtering, audio synth, and theme toggle', () => {
        const js = readFile('script.js');
        expect(js).toContain('initMap');
        expect(js).toContain('L.map');
        expect(js).toContain('showLightboxIndex');
        expect(js).toContain('updateTideStatus');
        expect(js).toContain('createOceanSound');
        expect(js).toContain('theme-toggle');
    });
});

describe('Digha Beach West Bengal — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Digha Beach — West Bengal');
        expect(searchIndex).toContain('frontend/digha-beach/index.html');
    });
});
