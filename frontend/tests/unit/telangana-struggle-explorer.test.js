/**
 * telangana-struggle-explorer.test.js
 * Unit tests for the Telangana Armed Struggle (1946–51) Explorer page.
 * Validates required sections, key historical content, accessibility,
 * interactive features (satellite map, gallery lightbox, social pyramid,
 * timeline), and landing page integration on the Freedom Fighters Knowledge
 * Hub page under the "Regional Resistance Movements" category.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/telangana-struggle-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-fighters-hub/index.html'),
        'utf-8'
    );
}

describe('Telangana Struggle Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="ts-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Telangana');
        expect(html).toContain('1946');
        expect(html).toContain('1951');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['hyderabad', 'social-structure', 'landlordism', 'grievances', 'organizations', 'razakars', 'beginning', 'timeline', 'map', 'operation-polo', 'aftermath', 'legacy', 'interpretations', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('covers all the topics required by the issue', () => {
        [
            'Hyderabad Under the Nizam',
            'The Social Structure of the Countryside',
            'Landlordism and the Agrarian Order',
            'The Grievances of the Peasant',
            'The Organizations of the Movement',
            'The Razakars of Hyderabad',
            'The Villages Refuse Vetti',
            'The Long Arc of the Struggle',
            'The Indian Government Intervenes',
            'When the State Became the Enemy',
            'What the Struggle Left Behind',
            'The Struggle, Interpreted'
        ].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains premium immersive features', () => {
        expect(html).toContain('ts-hero-orbs');
        expect(html).toContain('ts-hero-badges');
        expect(html).toContain('ts-cta-btn');
        expect(html).toContain('ts-section-nav');
        expect(html).toMatch(/class="[^"]*reveal"/);
        expect(html).toContain('ts-timeline-step');
        expect(html).toContain('ts-pyramid');
        expect(html).toContain('ts-telangana-map');
        expect(html).toContain('ts-gallery-item');
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Vettichakiri Virodham');
        expect(html).toContain('Nalgonda');
        expect(html).toContain('Warangal');
        expect(html).toContain('Khammam');
        expect(html).toContain('Kadivendi');
        expect(html).toContain('Andhra Mahasabha');
        expect(html).toContain('Razakars');
        expect(html).toContain('Kasim Razvi');
        expect(html).toContain('Mir Osman Ali Khan');
        expect(html).toContain('gram rajyams');
        expect(html).toContain('dalams');
        expect(html).toContain('Operation Polo');
        expect(html).toContain('13 September 1948');
        expect(html).toContain('17 September 1948');
        expect(html).toContain('Sardar Vallabhbhai Patel');
        expect(html).toContain('P. Sundarayya');
    });

    it('has a semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(12);
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

describe('Telangana Struggle Explorer — Interactive Features', () => {
    let html;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        js = readExplorerFile('script.js');
    });

    it('includes an interactive satellite map with real markers', () => {
        expect(html).toContain('ts-telangana-map');
        expect(html).toContain('ts-map-detail');
        expect(js).toContain('MAP_POINTS');
        expect(js).toContain('L.map');
        expect(js).toContain('L.tileLayer');
        expect(js).toContain('ts-map-marker');
        expect(js).toContain('showMapPoint');
        expect(js).toContain('Nalgonda');
        expect(js).toContain('Warangal');
        expect(js).toContain('Khammam');
        expect(js).toContain('Hyderabad City');
    });

    it('includes a timeline covering the period 1724–2014', () => {
        expect(html).toContain('ts-timeline-step');
        expect(html).toContain('1724');
        expect(html).toContain('1928');
        expect(html).toContain('Jul 1946');
        expect(html).toContain('21 Nov 1947');
        expect(html).toContain('13–18 Sep 1948');
        expect(html).toContain('Oct 1951');
        expect(html).toContain('2014');
    });

    it('includes a gallery with lightbox controls', () => {
        expect(html).toContain('ts-gallery-item');
        expect(html).toContain('data-title="');
        expect(html).toContain('ts-lightbox');
        expect(html).toContain('ts-lightbox-close');
        expect(html).toContain('ts-lightbox-prev');
        expect(html).toContain('ts-lightbox-next');
        expect(html).toContain('data-lightbox-close');
    });

    it('connects to related explorers in the freedom struggle collection', () => {
        expect(html).toContain('../freedom-fighters-hub/index.html');
        expect(html).toContain('../tebhaga-movement-explorer/index.html');
        expect(html).toContain('../freedom-movement-explorer/index.html');
    });

    it('provides sources and references', () => {
        expect(html).toContain('References');
        expect(html).toContain('Sundarayya, P.');
        expect(html).toContain('Thirumali, Inukonda');
        expect(html).toContain('Pavier, Barry');
        expect(html).toContain('Telangana Rebellion');
        expect(html).toContain('en.wikipedia.org/wiki/Telangana_Rebellion');
    });
});

describe('Telangana Struggle Explorer — Assets', () => {
    it('references gallery images that exist on disk', () => {
        const html = readExplorerFile('index.html');
        const assets = ['golconda-fort.jpg', 'charminar.jpg', 'nizam-cabinet.jpg', 'razakars-operation-polo.jpg', 'razakar-training.jpg', 'warangal-fort.jpg', 'andhra-mahasabha.jpg', 'sundarayya.jpg', 'telangana-village.jpg'];
        assets.forEach(asset => {
            expect(html).toContain(`assets/${asset}`);
            expect(existsSync(resolve(__dirname, '../../frontend/telangana-struggle-explorer/assets', asset))).toBe(true);
        });
    });

    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.ts-hero');
        expect(css).toContain('.ts-timeline');
        expect(css).toContain('.ts-telangana-map');
        expect(css).toContain('.ts-pyramid');
        expect(css).toContain('.ts-map-marker');
        expect(css).toContain('.ts-gallery-item');
        expect(css).toContain('.reveal');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('app:route-changed');
        expect(js).toContain('IntersectionObserver');
        expect(js).toContain('prefers-reduced-motion');
        expect(js).toContain('MAP_POINTS');
        expect(js).toContain('showMapPoint');
        expect(js).toContain('journey-bookmark-btn');
        expect(js).toContain('telangana-struggle-main');
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

describe('Telangana Struggle — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Freedom Fighters Hub landing page', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        expect(cards.length).toBeGreaterThan(0);
        const telanganaCard = cards.find(card => card.includes('Telangana'));
        expect(telanganaCard).toBeDefined();
        expect(telanganaCard).toContain('../telangana-struggle-explorer/index.html');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cards = extractFeaturedCards(index);
        const telanganaCard = cards.find(card => card.includes('Telangana'));
        expect(telanganaCard).toBeDefined();
        expect(telanganaCard).toContain('featured-explorer-badge');
        expect(telanganaCard).toContain('featured-explorer-btn');
        expect(telanganaCard).toContain('1946');
        expect(telanganaCard).toContain('Operation Polo');
    });

    it('is presented under the Regional Resistance Movements category header', () => {
        const index = readLandingPage();
        expect(index).toContain('Regional Resistance Movements');
        expect(index).toContain('ff-category-badge');
    });

    it('appears in the footer Freedom Fighters list on the landing page', () => {
        const index = readLandingPage();
        const footer = extractFooter(index);
        expect(footer.length).toBeGreaterThan(0);
        expect(footer).toContain('Telangana Struggle Explorer');
        expect(footer).toContain('../telangana-struggle-explorer/index.html');
    });

    it('registers the Telangana Struggle in the hub FREEDOM_FIGHTERS_DATA', () => {
        const js = readFileSync(
            resolve(__dirname, '../../frontend/freedom-fighters-hub/script.js'),
            'utf-8'
        );
        expect(js).toContain("id: 'telangana-struggle'");
        expect(js).toContain('Telangana People');
        expect(js).toContain('Nalgonda');
        expect(js).toContain('Razakar');
        expect(js).toContain("explorerLink: '../telangana-struggle-explorer/index.html'");
    });

    it('is registered in the service worker precache list', () => {
        const sw = readFileSync(
            resolve(__dirname, '../../frontend/sw.js'),
            'utf-8'
        );
        expect(sw).toContain("'./telangana-struggle-explorer/index.html'");
        expect(sw).toContain("'./telangana-struggle-explorer/style.css'");
        expect(sw).toContain("'./telangana-struggle-explorer/script.js'");
    });

    it('is listed in the offline page cache map', () => {
        const offline = readFileSync(
            resolve(__dirname, '../../frontend/offline.html'),
            'utf-8'
        );
        expect(offline).toContain("'/frontend/telangana-struggle-explorer/'");
        expect(offline).toContain('Telangana Struggle Explorer');
    });

    it('has category header styles in the hub stylesheet', () => {
        const css = readFileSync(
            resolve(__dirname, '../../frontend/freedom-fighters-hub/style.css'),
            'utf-8'
        );
        expect(css).toContain('.ff-category-header');
        expect(css).toContain('.ff-category-badge');
    });
});
