/**
 * vijayanagara-empire-explorer.test.js
 * Unit tests for the Vijayanagara Empire Explorer page (issue #1501).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/vijayanagara-empire-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Vijayanagara Empire Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="ve-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Vijayanagara Empire');
        expect(html).toContain('The Last Great Hindu Kingdom');
        expect(html).toContain('1336');
        expect(html).toContain('1646');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'history',
            'timeline',
            'rulers',
            'hampi',
            'architecture',
            'military',
            'culture',
            'gallery',
            'references'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'Historical Overview',
            'Timeline',
            'Major Rulers',
            'Capital: Hampi',
            'Architecture',
            'Military Strength',
            'Cultural Legacy',
            'Gallery',
            'References'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key historical details', () => {
        expect(html).toContain('Harihara I');
        expect(html).toContain('Bukka Raya');
        expect(html).toContain('Krishnadevaraya');
        expect(html).toContain('Battle of Talikota');
        expect(html).toContain('Hampi');
        expect(html).toContain('Tungabhadra');
    });

    it('mentions the major rulers and dynasties', () => {
        expect(html).toContain('Sangama Dynasty');
        expect(html).toContain('Tuluva Dynasty');
        expect(html).toContain('Deva Raya II');
    });

    it('includes architectural details', () => {
        expect(html).toContain('Virupaksha Temple');
        expect(html).toContain('Vittala Temple');
        expect(html).toContain('Stone Chariot');
        expect(html).toContain('Lotus Mahal');
    });

    it('documents the military strength', () => {
        expect(html).toContain('700,000 infantry');
        expect(html).toContain('32,000 cavalry');
        expect(html).toContain('Deccan Sultanates');
    });

    it('documents the cultural legacy', () => {
        expect(html).toContain('Amuktamalyada');
        expect(html).toContain('Ashtadiggajas');
        expect(html).toContain('Tenali Ramakrishna');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
        expect(imgTags.length).toBeGreaterThanOrEqual(4);
        imgTags.forEach(tag => {
            expect(tag).toMatch(/src="https:\/\//);
            expect(tag).toMatch(/alt="/);
            expect(tag).not.toMatch(/src="http:\/\//);
        });
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });

    it('includes a lightbox modal structure', () => {
        expect(html).toContain('id="lightbox-modal"');
        expect(html).toContain('id="lightbox-img"');
        expect(html).toContain('id="lightbox-title"');
        expect(html).toContain('id="lightbox-caption"');
    });
});

describe('Vijayanagara Empire Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.ve-hero');
        expect(css).toContain('.ve-section');
        expect(css).toContain('.ve-timeline');
        expect(css).toContain('.ruler-card');
        expect(css).toContain('.gallery-grid');
        expect(css).toContain('.lightbox-modal');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain('initLightbox');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Vijayanagara Empire — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Vijayanagara Empire');
        expect(index).toContain('frontend/vijayanagara-empire-explorer/index.html');
    });

    it('is rendered as a card with the standard structure', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Vijayanagara Empire Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/vijayanagara-empire-explorer\/index\.html"/);
    });
});
