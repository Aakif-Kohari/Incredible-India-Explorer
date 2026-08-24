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

    it('contains signature Gopuram tier divider SVG', () => {
        expect(html).toContain('class="tier-divider"');
        expect(html).toContain('fill="#0E3B47"');
        expect(html).toContain('fill="#C99A3E"');
        expect(html).toContain('fill="#B23A2E"');
    });

    it('contains all core content sections', () => {
        expect(html).toContain('id="landscape"');
        expect(html).toContain('id="culture"');
        expect(html).toContain('id="theerthams"');
        expect(html).toContain('id="heritage"');
        expect(html).toContain('id="activities"');
        expect(html).toContain('id="itinerary"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="map"');
    });

    it('contains 22 sacred wells explorer with search input', () => {
        expect(html).toContain('id="theerthamSearch"');
        expect(html).toContain('Mahalakshmi Theertham');
        expect(html).toContain('Brahmahatya Vimochana');
        expect(html).toContain('Kodi Theertham');
    });

    it('contains curated multi-day itinerary tabs', () => {
        expect(html).toContain('class="itinerary-tabs"');
        expect(html).toContain('1-Day Pilgrimage');
        expect(html).toContain('2-Day Island &amp; Dhanushkodi');
        expect(html).toContain('3-Day Gulf of Mannar Circuit');
    });

    it('contains heritage site cards', () => {
        expect(html).toContain('Ramanathaswamy Temple');
        expect(html).toContain('Pamban Bridge');
        expect(html).toContain('Dhanushkodi');
        expect(html).toContain("Adam's Bridge viewpoint");
        expect(html).toContain('Villoondi Theertham');
        expect(html).toContain('Dr. APJ Abdul Kalam Memorial');
    });

    it('contains visual gallery and lightbox with navigation', () => {
        expect(html).toContain('id="galleryGrid"');
        expect(html).toContain('id="lightbox"');
        expect(html).toContain('id="lbPrev"');
        expect(html).toContain('id="lbNext"');
        expect(html).toContain('id="lbClose"');
    });

    it('contains embedded map integration', () => {
        expect(html).toContain('class="map-wrap"');
        expect(html).toContain('title="Map of Rameswaram Beach, Tamil Nadu"');
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
