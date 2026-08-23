/**
 * aruna-asaf-ali-explorer.test.js
 * Unit tests for the Aruna Asaf Ali Explorer page (issue #1889).
 * Validates required sections, tab navigation, accessibility, image URLs,
 * and landing page card integration on the Incredible India Explorer
 * home page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../aruna-asaf-ali-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../../index.html'),
        'utf-8'
    );
}

describe('Aruna Asaf Ali Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="aaa-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Aruna Asaf Ali');
        expect(html).toContain('Heroine of the 1942 Movement');
        expect(html).toContain('16 July 1909');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'quit-india', 'flag-hoisting', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab buttons', () => {
        const tabs = ['Biography', 'Timeline', 'Quit India Movement', 'Flag Hoisting', 'References'];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains the key biographical details', () => {
        expect(html).toContain('1909');
        expect(html).toContain('1996');
        expect(html).toContain('Kalka');
        expect(html).toContain('Asaf Ali');
        expect(html).toContain('Gowalia Tank');
        expect(html).toContain('Bharat Ratna');
        expect(html).toContain('Inquilab');
    });

    it('mentions the Quit India Movement and key events', () => {
        expect(html).toContain('Quit India');
        expect(html).toContain('9 August 1942');
        expect(html).toContain('8 August 1942');
        expect(html).toContain('Do or Die');
        expect(html).toContain('Inquilab');
    });

    it('describes the flag hoisting event at Gowalia Tank Maidan', () => {
        expect(html).toContain('Gowalia Tank Maidan');
        expect(html).toContain('tricolour');
        expect(html).toContain('August Kranti Maidan');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(5);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
        expect(imgTags.length).toBeGreaterThanOrEqual(2);
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
});

describe('Aruna Asaf Ali Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.aaa-hero');
        expect(css).toContain('.aaa-timeline');
        expect(css).toContain('.aaa-section');
        expect(css).toContain('.aaa-tabs');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Aruna Asaf Ali — Landing Page Integration', () => {
    it('is listed as a card on the Incredible India Explorer landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Aruna Asaf Ali');
        expect(index).toContain('frontend/aruna-asaf-ali-explorer/index.html');
    });

    it('is rendered as a freedom-hero card with image, title, and CTA', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('Aruna Asaf Ali Card');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart, cardStart + 1500);
        expect(card).toContain('freedom-hero-card');
        expect(card).toContain('cuisine-card-image');
        expect(card).toContain('cuisine-card-body');
        expect(card).toContain('freedom-hero-cta');
        expect(card).toContain('Explore her story');
    });

    it('lives inside a dedicated freedom-heroes section', () => {
        const index = readLandingPage();
        expect(index).toContain('id="freedom-heroes"');
        expect(index).toContain('class="freedom-heroes-section');
    });

    it('links to the explorer page using a relative path', () => {
        const index = readLandingPage();
        expect(index).toMatch(/href="frontend\/aruna-asaf-ali-explorer\/index\.html"/);
    });
});
