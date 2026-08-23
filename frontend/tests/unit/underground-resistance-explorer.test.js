/**
 * underground-resistance-explorer.test.js
 * Unit tests for the Underground Resistance Networks of 1942–44 Explorer page.
 * Validates required sections, key historical content, accessibility,
 * interactive features (network graph, map, publications, timeline), and
 * landing page integration on the Freedom Fighters Knowledge Hub page and
 * the Quit India Movement Explorer.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/underground-resistance-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-fighters-hub/index.html'),
        'utf-8'
    );
}

describe('Underground Resistance Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="ur-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Underground Resistance');
        expect(html).toContain('1942');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'network', 'map', 'publications', 'communication', 'students', 'regional', 'timeline', 'participants', 'surveillance', 'significance', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('covers all the topics required by the issue', () => {
        [
            'Why the Underground Emerged',
            'Secret Communication',
            'Underground Publications',
            'Congress Radio',
            'Student Networks',
            'Regional Organisers',
            'Major Participants',
            'Government Surveillance',
            'Arrests',
            'Historical Significance'
        ].forEach(topic => {
            expect(html).toContain(topic);
        });
        expect(html).toContain('The Networks Wind Down');
        expect(html).toContain('The Slow Erosion');
    });

    it('contains premium immersive features', () => {
        expect(html).toContain('ur-hero-orbs');
        expect(html).toContain('ur-hero-badges');
        expect(html).toContain('ur-cta-btn');
        expect(html).toContain('ur-section-nav');
        expect(html).toMatch(/class="[^"]*reveal"/);
        expect(html).toContain('ur-timeline-step');
        expect(html).toContain('ur-participant-card');
        expect(html).toContain('ur-network-board');
        expect(html).toContain('ur-india-map');
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('9 August 1942');
        expect(html).toContain('Operation Zero Hour');
        expect(html).toContain('Aga Khan Palace');
        expect(html).toContain('Inquilab');
        expect(html).toContain('Congress Bulletin');
        expect(html).toContain('Biplabi');
        expect(html).toContain('Aruna Asaf Ali');
        expect(html).toContain('Jayaprakash Narayan');
        expect(html).toContain('Ram Manohar Lohia');
        expect(html).toContain('Usha Mehta');
        expect(html).toContain('Nana Patil');
        expect(html).toContain('Satara');
        expect(html).toContain('Tamluk');
        expect(html).toContain('Azad Dastas');
    });

    it('has a semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
    });

    it('uses HTTPS OG image URLs', () => {
        const ogImages = html.match(/property="og:image" content="([^"]*)"/g) || [];
        expect(ogImages.length).toBeGreaterThanOrEqual(1);
        ogImages.forEach(tag => {
            expect(tag).toMatch(/https:\/\//);
        });
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });

    it('loads the shared Journey module before its own script', () => {
        const journeyIdx = html.indexOf('journey/journey.js');
        const scriptIdx = html.indexOf('src="script.js"');
        expect(journeyIdx).toBeGreaterThan(-1);
        expect(scriptIdx).toBeGreaterThan(journeyIdx);
    });
});

describe('Underground Resistance Explorer — Interactive Features', () => {
    let html;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        js = readExplorerFile('script.js');
    });

    it('includes an interactive network graph with nodes and links', () => {
        expect(html).toContain('ur-network');
        expect(html).toContain('ur-network-detail');
        expect(js).toContain('NETWORK_NODES');
        expect(js).toContain('NETWORK_LINKS');
        expect(js).toContain('renderNetwork');
        expect(js).toContain('selectNetworkNode');
        expect(js).toContain('svg');
        expect(js).toContain('Congress Radio');
        expect(js).toContain('Inquilab');
    });

    it('includes an interactive India map with real markers and routes', () => {
        expect(html).toContain('ur-india-map');
        expect(html).toContain('ur-map-detail');
        expect(js).toContain('MAP_POINTS');
        expect(js).toContain('L.map');
        expect(js).toContain('L.tileLayer');
        expect(js).toContain('ur-map-marker');
        expect(js).toContain('Bombay');
        expect(js).toContain('Satara');
        expect(js).toContain('Tamluk');
        expect(js).toContain('Hazaribagh');
        expect(js).toContain('ROUTES');
    });

    it('includes underground publication markers on the map', () => {
        expect(js).toContain('PUB_POINTS');
        expect(js).toContain('ur-pub-marker');
        expect(js).toContain('Biplabi Press');
        expect(js).toContain('Inquilab Press');
    });

    it('includes a timeline covering the major period 1942–44', () => {
        expect(html).toContain('ur-timeline-step');
        expect(html).toContain('8 Aug 1942');
        expect(html).toContain('27 Aug 1942');
        expect(html).toContain('12 Nov 1942');
        expect(html).toContain('9 Nov 1942');
        expect(html).toContain('Dec 1942');
        expect(html).toContain('1943');
        expect(html).toContain('Dec 1943');
        expect(html).toContain('1944');
    });

    it('connects participant cards to the network graph and map', () => {
        expect(html).toContain('data-node="aruna"');
        expect(html).toContain('data-node="jp"');
        expect(html).toContain('data-node="usha"');
        expect(html).toContain('data-map="satara"');
        expect(html).toContain('data-map="patna"');
        expect(js).toContain('initParticipantCards');
    });

    it('connects to related explorers in the freedom struggle collection', () => {
        expect(html).toContain('../quit-india-movement-explorer/index.html');
        expect(html).toContain('../congress-radio-explorer/index.html');
        expect(html).toContain('../freedom-fighters-hub/index.html');
    });

    it('provides sources and references', () => {
        expect(html).toContain('References');
        expect(html).toContain('Bipan Chandra');
        expect(html).toContain('Chopra, P. N.');
        expect(html).toContain('Congress Radio');
        expect(html).toContain('en.wikipedia.org/wiki/Congress_Radio');
    });
});

describe('Underground Resistance Explorer — Assets', () => {
    let js;

    beforeAll(() => {
        js = readExplorerFile('script.js');
    });

    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.ur-hero');
        expect(css).toContain('.ur-timeline');
        expect(css).toContain('.ur-map-canvas');
        expect(css).toContain('.ur-network-board');
        expect(css).toContain('.ur-node');
        expect(css).toContain('.reveal');
    });

    it('includes a valid interactive script with required features', () => {
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('app:route-changed');
        expect(js).toContain('IntersectionObserver');
        expect(js).toContain('prefers-reduced-motion');
        expect(js).toContain('MAP_POINTS');
        expect(js).toContain('showMapPoint');
        expect(js).toContain('underground-resistance-main');
    });
});

const CARD_MARKER = '<div class="featured-explorer-card">';

function extractFeaturedCards(html) {
    const cards = [];
    let cursor = 0;
    while (cursor < html.length) {
        const start = html.indexOf(CARD_MARKER, cursor);
        if (start === -1) break;
        const end = html.indexOf('</section>', start);
        cards.push(html.slice(start, end === -1 ? start + 2000 : end));
        cursor = end === -1 ? start + CARD_MARKER.length : end;
    }
    return cards;
}

function extractFooter(html) {
    const start = html.indexOf('<footer');
    const end = start === -1 ? -1 : html.indexOf('</footer>', start);
    return start === -1 || end === -1 ? '' : html.slice(start, end);
}

describe('Underground Resistance — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Freedom Fighters Hub landing page', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        expect(cards.length).toBeGreaterThan(0);
        const undergroundCard = cards.find(card => card.includes('Underground Resistance'));
        expect(undergroundCard).toBeDefined();
        expect(undergroundCard).toContain('../underground-resistance-explorer/index.html');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        const undergroundCard = cards.find(card => card.includes('Underground Resistance'));
        expect(undergroundCard).toBeDefined();
        expect(undergroundCard).toContain('featured-explorer-badge');
        expect(undergroundCard).toContain('featured-explorer-btn');
        expect(undergroundCard).toContain('1942');
        expect(undergroundCard).toContain('Congress Radio');
    });

    it('appears in the footer Freedom Fighters list on the landing page', () => {
        const index = readLandingPage();
        const footer = extractFooter(index);
        expect(footer.length).toBeGreaterThan(0);
        expect(footer).toContain('Underground Resistance Explorer');
        expect(footer).toContain('../underground-resistance-explorer/index.html');
    });

    it('registers the Underground Resistance in the hub FREEDOM_FIGHTERS_DATA', () => {
        const js = readFileSync(
            resolve(__dirname, '../../frontend/freedom-fighters-hub/script.js'),
            'utf-8'
        );
        expect(js).toContain("id: 'underground-resistance-networks'");
        expect(js).toContain('Underground Resistance Networks');
        expect(js).toContain('Azad Dastas');
        expect(js).toContain("explorerLink: '../underground-resistance-explorer/index.html'");
    });

    it('is registered in the service worker precache list', () => {
        const sw = readFileSync(
            resolve(__dirname, '../../frontend/sw.js'),
            'utf-8'
        );
        expect(sw).toContain("'./underground-resistance-explorer/index.html'");
        expect(sw).toContain("'./underground-resistance-explorer/style.css'");
        expect(sw).toContain("'./underground-resistance-explorer/script.js'");
    });

    it('is listed in the offline page cache map', () => {
        const offline = readFileSync(
            resolve(__dirname, '../../frontend/offline.html'),
            'utf-8'
        );
        expect(offline).toContain("'/frontend/underground-resistance-explorer/'");
        expect(offline).toContain('Underground Resistance Explorer');
    });

    it('is registered in the global search index', () => {
        const searchIndex = readFileSync(
            resolve(__dirname, '../../frontend/search-index.js'),
            'utf-8'
        );
        expect(searchIndex).toContain('Underground Resistance Networks');
        expect(searchIndex).toContain('frontend/underground-resistance-explorer/index.html');
    });

    it('is surfaced as an interactive layer of the Quit India map explorer', () => {
        const quitIndia = readFileSync(
            resolve(__dirname, '../../frontend/quit-india-movement-explorer/index.html'),
            'utf-8'
        );
        expect(quitIndia).toContain('../underground-resistance-explorer/index.html');
        expect(quitIndia).toContain('Underground Resistance');
    });
});
