import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../mandarmani-beach', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/mandarmani-beach', file), 'utf-8');
}

describe('Mandarmani Beach West Bengal — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains sticky mile-marker drivebar navigation', () => {
        expect(html).toContain('class="drivebar"');
        expect(html).toContain('0 KM');
        expect(html).toContain('13 KM');
        expect(html).toContain('MANDARMANI');
    });

    it('contains hero section with coordinates, district, and stats', () => {
        expect(html).toContain('class="hero"');
        expect(html).toContain('Mandar');
        expect(html).toContain('mani');
        expect(html).toContain('21.666°N, 87.705°E');
        expect(html).toContain('East Medinipur');
    });

    it('contains core informational sections', () => {
        expect(html).toContain('id="location"');
        expect(html).toContain('id="characteristics"');
        expect(html).toContain('id="surroundings"');
        expect(html).toContain('id="activities"');
        expect(html).toContain('id="itinerary"');
        expect(html).toContain('id="nearby"');
        expect(html).toContain('id="highlights"');
        expect(html).toContain('id="gallery"');
    });

    it('contains tide dynamics guide and curated multi-day itinerary planner', () => {
        expect(html).toContain('class="tide-box"');
        expect(html).toContain('Low Tide Phase');
        expect(html).toContain('High Tide Phase');
        expect(html).toContain('1-Day Quick Seaside Escape');
        expect(html).toContain('2-Day Coastal Trio (Mandarmani + Tajpur + Shankarpur)');
        expect(html).toContain('3-Day East Medinipur Circuit');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude": 21.666');
        expect(html).toContain('"longitude": 87.705');
    });

    it('includes vector SVG gallery and lightbox modal elements', () => {
        expect(html).toContain('id="galleryGrid"');
        expect(html).toContain('id="lightbox"');
        expect(html).toContain('id="lbArt"');
        expect(html).toContain('id="lbClose"');
        expect(html).toContain('id="lbPrev"');
        expect(html).toContain('id="lbNext"');
    });

    it('defines custom color tokens and styles', () => {
        expect(html).toContain('--teal-deep:#0E3B3E;');
        expect(html).toContain('--coral:#D8552E;');
        expect(html).toContain('--sand-dry:#EDE0BF;');
    });
});

describe('Mandarmani Beach West Bengal — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Mandarmani Beach — West Bengal');
        expect(searchIndex).toContain('frontend/mandarmani-beach/index.html');
    });
});
