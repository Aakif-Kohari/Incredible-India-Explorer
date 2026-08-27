import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readBarrenFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/barren-island', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/search-index.js'),
        'utf-8'
    );
}

function readIslandExplorerScript() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/island-explorer/script.js'),
        'utf-8'
    );
}

describe('Barren Island Explorer — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readBarrenFile('barren-island.html');
        js = readBarrenFile('barren-island.js');
        css = readBarrenFile('barren-island.css');
    });

    it('renders title, hero section, and active volcano kicker', () => {
        expect(html).toContain('Barren Island Explorer');
        expect(html).toContain('India\'s Only Active Volcano');
        expect(html).toContain('class="barren-hero"');
    });

    it('displays required quick facts stats', () => {
        expect(html).toContain('Island Area');
        expect(html).toContain('Summit Elevation');
        expect(html).toContain('First Recorded Eruption');
        expect(html).toContain('Most Recent Eruption');
    });

    it('documents volcano details, geological history, ecosystems, wildlife, and permits', () => {
        expect(html).toContain('Volcano &amp; Eruptions');
        expect(html).toContain('Geological History &amp; Structure');
        expect(html).toContain('Marine &amp; Island Ecosystems');
        expect(html).toContain('Wildlife');
        expect(html).toContain('Visitor Access &amp; Permits');
    });

    it('embeds Leaflet maps library', () => {
        expect(html).toContain('unpkg.com/leaflet');
        expect(html).toContain('id="barren-map"');
    });

    it('includes tab navigation, timeline container, and image gallery grid', () => {
        expect(html).toContain('data-tab="volcano"');
        expect(html).toContain('data-tab="geology"');
        expect(html).toContain('data-tab="marine"');
        expect(html).toContain('data-tab="wildlife"');
        expect(html).toContain('data-tab="access"');
        expect(html).toContain('id="barren-gallery-grid"');
    });

    it('includes accessible back navigation', () => {
        expect(html).toContain('Back to Islands of India');
        expect(html).toContain('href="../islands/islands.html"');
    });

    it('references local css and js', () => {
        expect(html).toContain('href="barren-island.css"');
        expect(html).toContain('src="barren-island.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('.barren-page');
        expect(css).toContain('.barren-hero');
        expect(css).toContain('.barren-sources-grid');
        expect(css).toContain('.barren-source-card');
        expect(css).toContain('.barren-credits-box');
    });

    it('contains client-side interactions in JavaScript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('initGallery');
        expect(js).toContain('initFactsRotator');
        expect(js).toContain('initMap');
        expect(js).toContain('BARREN_LOCATIONS');
        expect(js).toContain('BARREN_GALLERY');
    });
});

describe('Barren Island Explorer — Academic Sources & Attributions', () => {
    let html;

    beforeAll(() => {
        html = readBarrenFile('barren-island.html');
    });

    it('contains Sources and References section with scientific listings', () => {
        expect(html).toContain('Sources, References &amp; Image Credits');
        expect(html).toContain('Geological Survey of India');
        expect(html).toContain('NASA Earth Observatory');
        expect(html).toContain('Andaman &amp; Nicobar Administration');
    });

    it('lists proper image and media credits', () => {
        expect(html).toContain('Image &amp; Media Credits');
        expect(html).toContain('Creative Commons Attribution');
        expect(html).toContain('Public Domain / CC0');
        expect(html).toContain('Andaman Tourism Board');
    });
});

describe('Barren Island Explorer — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/barren-island/barren-island.html');
        expect(searchIndex).toContain('Barren Island');
    });

    it('is registered in island-explorer/script.js with full explorer link', () => {
        const script = readIslandExplorerScript();
        expect(script).toContain('"id": "barren"');
        expect(script).toContain('"explorerUrl": "../barren-island/barren-island.html"');
    });
});
