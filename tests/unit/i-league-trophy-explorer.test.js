/**
 * i-league-trophy-explorer.test.js
 * Unit tests for the I-League Trophy Explorer page (issue #2535).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/i-league-trophy-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('I-League Trophy Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="il-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('I-League Trophy');
        expect(html).toContain("India's National Football League Era");
        expect(html).toContain('2007');
        expect(html).toContain('2020');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'trophy',
            'history',
            'clubs',
            'champions',
            'venues',
            'players',
            'transition',
            'sources'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'Trophy',
            'League History',
            'Clubs',
            'Champions',
            'Historic Venues',
            'Notable Players',
            'Modern Transition',
            'Sources'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key historical details', () => {
        expect(html).toContain('National Football League');
        expect(html).toContain('Dempo SC');
        expect(html).toContain('Mohun Bagan');
        expect(html).toContain('Bengaluru FC');
        expect(html).toContain('Aizawl FC');
        expect(html).toContain('All India Football Federation');
    });

    it('lists all I-League champions in the timeline', () => {
        expect(html).toContain('2007–08');
        expect(html).toContain('2019–20');
        expect(html).toContain('Churchill Brothers');
        expect(html).toContain('Minerva Punjab');
        expect(html).toContain('Chennai City FC');
    });

    it('contains notable players', () => {
        expect(html).toContain('Bhaichung Bhutia');
        expect(html).toContain('Sunil Chhetri');
        expect(html).toContain('Ranti Martins');
    });

    it('contains historic venues', () => {
        expect(html).toContain('Salt Lake Stadium');
        expect(html).toContain('Fatorda Stadium');
        expect(html).toContain('Sree Kanteerava');
    });

    it('documents the transition to modern Indian football', () => {
        expect(html).toContain('Indian Super League');
        expect(html).toContain('ISL');
        expect(html).toContain('2017');
        expect(html).toContain('ATK Mohun Bagan');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(7);
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('I-League Trophy Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.il-hero');
        expect(css).toContain('.il-section');
        expect(css).toContain('.il-timeline');
        expect(css).toContain('.club-card');
        expect(css).toContain('.glass-card');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('I-League Trophy — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('I-League Trophy');
        expect(index).toContain('frontend/i-league-trophy-explorer/index.html');
    });

    it('is rendered as a card with the standard structure', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('I-League Trophy Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/i-league-trophy-explorer\/index\.html"/);
    });
});
