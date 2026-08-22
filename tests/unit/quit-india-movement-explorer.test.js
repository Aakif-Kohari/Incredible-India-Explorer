/**
 * quit-india-movement-explorer.test.js
 * Unit tests for the Quit India Movement (Bombay Launch) Explorer page.
 * Validates required sections, key historical content, accessibility,
 * interactive features, and landing page card integration on the
 * Freedom Fighters Knowledge Hub page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/quit-india-movement-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-fighters-hub/index.html'),
        'utf-8'
    );
}

describe('Quit India Movement Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="qi-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Quit India');
        expect(html).toContain('Gowalia Tank Maidan');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['context', 'maidan', 'resolution', 'speech', 'leaders', 'timeline', 'map', 'aftermath', 'legacy', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Context', 'Gowalia Tank Maidan', 'Resolution', 'Leaders', 'Timeline', 'Bombay Map', 'Arrests', 'Legacy', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains premium immersive features', () => {
        expect(html).toContain('class="qi-hero-backdrop"');
        expect(html).toContain('qi-hero-badges');
        expect(html).toContain('qi-cta-btn');
        expect(html).toContain('qi-section-nav');
        expect(html).toContain('qi-lightbox');
        expect(html).toMatch(/class="[^"]*reveal"/);
        expect(html).toContain('qi-timeline-step');
        expect(html).toContain('qi-leader-card');
        expect(html).toContain('qi-feature-card');
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('8 August 1942');
        expect(html).toContain('9 August 1942');
        expect(html).toContain('Gowalia Tank Maidan');
        expect(html).toContain('August Kranti Maidan');
        expect(html).toContain('Karo Ya Maro');
        expect(html).toContain('Do or Die');
        expect(html).toContain('Wardha');
        expect(html).toContain('Cripps Mission');
        expect(html).toContain('Aga Khan Palace');
        expect(html).toContain('Jawaharlal Nehru');
        expect(html).toContain('Vallabhbhai Patel');
        expect(html).toContain('Sarojini Naidu');
        expect(html).toContain('Aruna Asaf Ali');
        expect(html).toContain('Birla House');
        expect(html).toContain('Victoria Terminus');
    });

    it('has a semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(5);
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

describe('Quit India Movement Explorer — Interactive Features', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('includes an interactive historical Bombay map with real markers', () => {
        expect(html).toContain('qi-bombay-map');
        expect(html).toContain('qi-map-detail');
        expect(html).toContain('Gowalia Tank Maidan');
        const js = readExplorerFile('script.js');
        expect(js).toContain('MAP_POINTS');
        expect(js).toContain('L.map');
        expect(js).toContain('L.tileLayer');
        expect(js).toContain('qi-map-marker');
        expect(js).toContain('Birla House');
        expect(js).toContain('Marine Drive');
        expect(js).toContain('Gateway of India');
        expect(js).toContain('coords: [18.9625, 72.8097]');
    });

    it('includes an event timeline with the 8–9 August 1942 events', () => {
        expect(html).toContain('qi-timeline-step');
        expect(html).toContain('Wardha Draft');
        expect(html).toContain('The Resolution Is Passed');
        expect(html).toContain('Mass Arrests');
        expect(html).toContain('The Flag Still Goes Up');
    });

    it('includes key-person cards for the Congress leadership', () => {
        const leaderCards = (html.match(/qi-leader-card/g) || []).length;
        expect(leaderCards).toBeGreaterThanOrEqual(6);
        ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Maulana Abul Kalam Azad', 'Yusuf Meherally'].forEach(name => {
            expect(html).toContain(name);
        });
    });

    it('connects to the wider Quit India map with related explorer links', () => {
        expect(html).toContain('../gandhi-explorer/index.html');
        expect(html).toContain('../aruna-asaf-ali-explorer/index.html');
        expect(html).toContain('../freedom-movement-explorer/index.html');
        expect(html).toContain('../making-of-modern-india/index.html');
        expect(html).toContain('../freedom-fighters-hub/index.html');
    });

    it('provides sources and references', () => {
        expect(html).toContain('References');
        expect(html).toContain('mkgandhi.org');
        expect(html).toContain('Quit India Resolution');
        expect(html).toContain('en.wikipedia.org/wiki/Quit_India_Movement');
    });
});

describe('Quit India Movement Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.qi-hero');
        expect(css).toContain('.qi-timeline');
        expect(css).toContain('.qi-map-canvas');
        expect(css).toContain('.qi-gallery-grid');
        expect(css).toContain('.qi-lightbox');
        expect(css).toContain('.reveal');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('qi-lightbox');
        expect(js).toContain('app:route-changed');
        expect(js).toContain('IntersectionObserver');
        expect(js).toContain('prefers-reduced-motion');
        expect(js).toContain('MAP_POINTS');
        expect(js).toContain('showMapPoint');
    });

    it('references local gallery assets that exist in the assets folder', () => {
        const assets = ['august-kranti-maidan-hd.jpg', 'gandhi-gowalia-tank-1942.jpg', 'nehru-gandhi-1942.jpg', 'gandhi-azad-kripalani-1942.jpg', 'quit-india-1992-stamp.jpg'];
        assets.forEach(name => {
            expect(() => readFileSync(resolve(__dirname, `../../frontend/quit-india-movement-explorer/assets/${name}`))).not.toThrow();
        });
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

describe('Quit India Movement — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Freedom Fighters Hub landing page', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        expect(cards.length).toBeGreaterThan(0);
        const quitCard = cards.find(card => card.includes('Quit India Movement'));
        expect(quitCard).toBeDefined();
        expect(quitCard).toContain('../quit-india-movement-explorer/index.html');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        const quitCard = cards.find(card => card.includes('Quit India Movement'));
        expect(quitCard).toBeDefined();
        expect(quitCard).toContain('featured-explorer-badge');
        expect(quitCard).toContain('featured-explorer-btn');
        expect(quitCard).toContain('8');
        expect(quitCard).toContain('Gowalia Tank Maidan');
    });

    it('appears in the footer Freedom Fighters list on the landing page', () => {
        const index = readLandingPage();
        const footer = extractFooter(index);
        expect(footer.length).toBeGreaterThan(0);
        expect(footer).toContain('Quit India Movement Explorer');
        expect(footer).toContain('../quit-india-movement-explorer/index.html');
    });

    it('registers the Quit India Movement in the hub FREEDOM_FIGHTERS_DATA', () => {
        const js = readFileSync(
            resolve(__dirname, '../../frontend/freedom-fighters-hub/script.js'),
            'utf-8'
        );
        expect(js).toContain("id: 'quit-india-movement-bombay'");
        expect(js).toContain('Quit India Movement');
        expect(js).toContain('Karo Ya Maro');
        expect(js).toContain("explorerLink: '../quit-india-movement-explorer/index.html'");
    });

    it('is registered in the service worker precache list', () => {
        const sw = readFileSync(
            resolve(__dirname, '../../frontend/sw.js'),
            'utf-8'
        );
        expect(sw).toContain("'./quit-india-movement-explorer/index.html'");
        expect(sw).toContain("'./quit-india-movement-explorer/style.css'");
        expect(sw).toContain("'./quit-india-movement-explorer/script.js'");
    });

    it('is listed in the offline page cache map', () => {
        const offline = readFileSync(
            resolve(__dirname, '../../frontend/offline.html'),
            'utf-8'
        );
        expect(offline).toContain("'/frontend/quit-india-movement-explorer/'");
        expect(offline).toContain('Quit India Movement Explorer');
    });
});
