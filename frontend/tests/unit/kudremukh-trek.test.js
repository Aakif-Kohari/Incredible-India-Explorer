import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../kudremukh-trek', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/kudremukh-trek', file), 'utf-8');
}

describe('Kudremukh Trek Karnataka — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains page title and Kannada script branding', () => {
        expect(html).toContain('Kudremukh');
        expect(html).toContain('ಕುದುರೆಮುಖ');
        expect(html).toContain('Chikkamagaluru');
        expect(html).toContain('Incredible India Explorer');
    });

    it('contains quick facts strip and metrics', () => {
        expect(html).toContain('class="facts"');
        expect(html).toContain('1,894 m');
        expect(html).toContain('20 km');
        expect(html).toContain('Mullodi');
        expect(html).toContain('October – February');
    });

    it('contains core panel sections', () => {
        expect(html).toContain('id="route"');
        expect(html).toContain('id="grassland"');
        expect(html).toContain('id="forest"');
        expect(html).toContain('id="biodiversity"');
        expect(html).toContain('id="preparation"');
        expect(html).toContain('id="nearby"');
        expect(html).toContain('id="gallery"');
    });

    it('contains route waypoints and interactive inspector', () => {
        expect(html).toContain('class="route-strip"');
        expect(html).toContain('id="waypointInfo"');
        expect(html).toContain('showWaypoint(');
        expect(html).toContain('Gangemoola');
        expect(html).toContain('Kudremukh Peak');
    });

    it('contains seasonal conditions tab switcher and packing checklist', () => {
        expect(html).toContain('class="season-tabs"');
        expect(html).toContain('switchSeason(');
        expect(html).toContain('Post-Monsoon');
        expect(html).toContain('class="packing-grid"');
        expect(html).toContain('Leech Protection');
        expect(html).toContain('Forest Permit');
    });

    it('contains image gallery and lightbox modal elements', () => {
        expect(html).toContain('class="gallery"');
        expect(html).toContain('id="lightboxModal"');
        expect(html).toContain('id="lightboxImg"');
        expect(html).toContain('openLightbox(');
    });

    it('includes Schema.org structured data (TouristAttraction JSON-LD)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "TouristAttraction"');
        expect(html).toContain('"latitude": 13.2167');
        expect(html).toContain('"longitude": 75.25');
    });
});

describe('Kudremukh Trek Karnataka — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Kudremukh Trek — Chikkamagaluru, Karnataka');
        expect(searchIndex).toContain('frontend/kudremukh-trek/index.html');
    });
});
