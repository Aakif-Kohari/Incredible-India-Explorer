import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../elephant-beach', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/elephant-beach', file), 'utf-8');
}

describe('Elephant Beach Andaman — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges, title, and subtitle', () => {
        expect(html).toContain('class="hero-section"');
        expect(html).toContain('Elephant Beach');
        expect(html).toContain('Havelock Island (Swaraj Dweep)');
        expect(html).toContain('Andaman &amp; Nicobar Islands');
        expect(html).toContain('Snorkeling Hotspot');
    });

    it('contains all core informational sections', () => {
        expect(html).toContain('Location &amp; Accessibility');
        expect(html).toContain('Beach Overview');
        expect(html).toContain('Marine Activities');
        expect(html).toContain('Natural Attractions');
        expect(html).toContain('Nearby Destinations');
    });

    it('contains curated island itineraries section', () => {
        expect(html).toContain('id="itinerary-heading"');
        expect(html).toContain('1-Day Havelock Highlights');
        expect(html).toContain('2-Day Adventure &amp; Reef');
        expect(html).toContain('3-Day Island Circuit');
    });

    it('contains the Beaches of India Navigation Matrix', () => {
        expect(html).toContain('id="interactive-heading"');
        expect(html).toContain('The Beaches of India Navigation Matrix');
        expect(html).toContain('data-region="andaman"');
        expect(html).toContain('data-region="goa"');
        expect(html).toContain('data-region="kerala"');
    });

    it('includes structured data (JSON-LD Beach schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Beach"');
        expect(html).toContain('"latitude": 12.0006');
        expect(html).toContain('"longitude": 92.9554');
    });

    it('includes visual gallery and lightbox modal elements', () => {
        expect(html).toContain('id="gallery-grid"');
        expect(html).toContain('id="lightbox"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-close"');
    });

    it('defines custom color tokens and styles', () => {
        expect(html).toContain('--primary-color: #0d9488;');
        expect(html).toContain('--accent-color: #2dd4bf;');
        expect(html).toContain('elephant-page');
    });
});

describe('Elephant Beach Andaman — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Elephant Beach — Andaman & Nicobar Islands');
        expect(searchIndex).toContain('frontend/elephant-beach/index.html');
    });
});
