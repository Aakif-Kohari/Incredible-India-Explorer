import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../chandrabhaga-beach', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/chandrabhaga-beach', file), 'utf-8');
}

describe('Chandrabhaga Beach Odisha — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges, title, and sun-wheel motif', () => {
        expect(html).toContain('class="hero"');
        expect(html).toContain('Chandrabhaga');
        expect(html).toContain('Beach');
        expect(html).toContain('sun-wheel');
        expect(html).toContain('Konark Sun Temple');
        expect(html).toContain('Blue Flag beach in India');
    });

    it('contains core informational and heritage sections', () => {
        expect(html).toContain('id="overview"');
        expect(html).toContain('id="heritage"');
        expect(html).toContain('id="culture"');
        expect(html).toContain('id="itinerary"');
        expect(html).toContain('id="nature"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="map"');
    });

    it('contains heritage route stops and mythology cards', () => {
        expect(html).toContain('Konark Sun Temple');
        expect(html).toContain('Ramachandi Temple');
        expect(html).toContain('Puri Jagannath Temple');
        expect(html).toContain("Samba's cure");
        expect(html).toContain("Chandrabhaga's sacrifice");
    });

    it('contains curated multi-day itinerary planner', () => {
        expect(html).toContain('class="itinerary-box"');
        expect(html).toContain('1-Day Konark &amp; Sunrise Trail');
        expect(html).toContain('2-Day Golden Triangle (Puri &amp; Konark)');
        expect(html).toContain('3-Day Heritage &amp; Chilika Circuit');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude": 19.8869');
        expect(html).toContain('"longitude": 86.115');
    });

    it('includes visual gallery and enhanced lightbox modal', () => {
        expect(html).toContain('id="galleryGrid"');
        expect(html).toContain('id="lightboxModal"');
        expect(html).toContain('id="lightboxPrev"');
        expect(html).toContain('id="lightboxNext"');
        expect(html).toContain('id="lightboxClose"');
        expect(html).toContain('loading="lazy"');
    });

    it('defines custom color tokens and styles', () => {
        expect(html).toContain('--ocean-deep:#0d2b3e;');
        expect(html).toContain('--sunrise-gold:#e8952e;');
        expect(html).toContain('--sand:#f1e3c6;');
    });
});

describe('Chandrabhaga Beach Odisha — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Chandrabhaga Beach — Odisha');
        expect(searchIndex).toContain('frontend/chandrabhaga-beach/index.html');
    });
});
