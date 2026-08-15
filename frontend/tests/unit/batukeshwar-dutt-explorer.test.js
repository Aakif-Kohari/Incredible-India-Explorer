/**
 * batukeshwar-dutt-explorer.test.js
 * Unit tests for the Batukeshwar Dutt Explorer page.
 * Validates required sections, tab navigation, accessibility, image URLs,
 * historical accuracy, and landing page card integration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../batukeshwar-dutt-explorer', file),
        'utf-8'
    );
}

function readHubData() {
    return readFileSync(
        resolve(__dirname, '../../freedom-fighters-hub/script.js'),
        'utf-8'
    );
}

describe('Batukeshwar Dutt Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="bdutt-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Batukeshwar');
        expect(html).toContain('Dutt');
        expect(html).toContain('Long Live Revolution');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'assembly-bombing', 'imprisonment', 'legacy', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('highlights his partnership with Bhagat Singh and the Assembly bombing', () => {
        expect(html).toContain('Bhagat Singh');
        expect(html).toContain('Central Legislative Assembly');
        expect(html).toContain('8 April 1929');
        expect(html).toContain('HSRA');
        expect(html).toContain('Inquilab Zindabad');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
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

    it('references authentic source documentation in References', () => {
        expect(html).toContain('wikipedia.org');
        expect(html).toContain('britannica.com');
        expect(html).toContain('amritmahotsav.nic.in');
    });
});

describe('Batukeshwar Dutt Explorer — Assets', () => {
    it('includes a non-empty stylesheet themed for the revolutionary era', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('bdutt-hero');
    });

    it('includes a valid interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('activateTab');
        expect(js).toContain('initTabNavigation');
        expect(js).toContain('initThemeToggle');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Batukeshwar Dutt — Landing Page Integration', () => {
    it('is listed as a card on the Freedom Fighters Hub landing page', () => {
        const js = readHubData();
        expect(js).toContain('batukeshwar-dutt');
        expect(js).toContain('Batukeshwar Dutt');
    });

    it('includes the revolutionary-era metadata and a dedicated explorer link', () => {
        const js = readHubData();
        expect(js).toContain('Partner of Bhagat Singh');
        expect(js).toContain('Revolutionary');
        expect(js).toContain('Central Legislative Assembly Bombing (1929)');
        expect(js).toContain('../batukeshwar-dutt-explorer/index.html');
    });
});