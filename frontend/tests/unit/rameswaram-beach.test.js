import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../rameswaram-beach', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/rameswaram-beach', file), 'utf-8');
}

describe('Rameswaram Beach Tamil Nadu — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges, title, and Tamil subtitle', () => {
        expect(html).toContain('class="hero"');
        expect(html).toContain('Rameswaram Beach');
        expect(html).toContain('இராமேசுவரம் கடற்கரை');
        expect(html).toContain('Tamil Nadu');
        expect(html).toContain('Pamban Island');
        expect(html).toContain('Char Dham');
    });

    it('contains all required informational sections', () => {
        expect(html).toContain('id="landscape"');
        expect(html).toContain('id="culture"');
        expect(html).toContain('id="theerthams"');
        expect(html).toContain('id="heritage"');
        expect(html).toContain('id="activities"');
        expect(html).toContain('id="itinerary"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="map"');
    });

    it('contains 22 sacred wells explorer with search and key well names', () => {
        expect(html).toContain('id="theerthamSearch"');
        expect(html).toContain('Mahalakshmi Theertham');
        expect(html).toContain('Brahmahatya Vimochana');
        expect(html).toContain('Kodi Theertham');
        expect(html).toContain('Ganga Theertham');
    });

    it('contains heritage sites including temple, Pamban bridge, and Dhanushkodi', () => {
        expect(html).toContain('Ramanathaswamy Temple');
        expect(html).toContain('Pamban Sea Bridge');
        expect(html).toContain('Dhanushkodi Ghost Town');
        expect(html).toContain("Adam's Bridge");
        expect(html).toContain('Dr. APJ Abdul Kalam Memorial');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude": 9.2876');
        expect(html).toContain('"longitude": 79.3129');
    });

    it('includes visual gallery and enhanced lightbox modal with nav controls', () => {
        expect(html).toContain('id="galleryGrid"');
        expect(html).toContain('id="lightbox"');
        expect(html).toContain('id="lbPrev"');
        expect(html).toContain('id="lbNext"');
        expect(html).toContain('id="lbClose"');
        expect(html).toContain('loading="lazy"');
    });

    it('includes floating controls (sacred audio synth & scroll to top)', () => {
        expect(html).toContain('id="sacred-audio-toggle"');
        expect(html).toContain('id="back-to-top"');
        expect(html).toContain('id="share-btn"');
    });
});

describe('Rameswaram Beach Tamil Nadu — Styles & Scripts', () => {
    it('style.css defines custom variables, responsive grid, and gopuram divider', () => {
        const css = readFile('style.css');
        expect(css).toContain('--sea-deep: #0E3B47;');
        expect(css).toContain('--gold:');
        expect(css).toContain('.rameswaram-page');
        expect(css).toContain('.tier-divider');
        expect(css).toContain('.theertham-widget');
        expect(css).toContain('.lightbox');
    });

    it('script.js wires 22 theerthams live filter, gallery, lightbox, map, and audio synth', () => {
        const js = readFile('script.js');
        expect(js).toContain('theerthamSearch');
        expect(js).toContain('initMap');
        expect(js).toContain('L.map');
        expect(js).toContain('showFigure');
        expect(js).toContain('startSacredAudio');
        expect(js).toContain('theme-toggle');
    });
});

describe('Rameswaram Beach Tamil Nadu — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Rameswaram Beach — Tamil Nadu');
        expect(searchIndex).toContain('frontend/rameswaram-beach/index.html');
    });
});
