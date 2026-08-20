/**
 * gopal-krishna-gokhale-explorer.test.js
 * Unit tests for the Gopal Krishna Gokhale Explorer page.
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
        resolve(__dirname, '../../gopal-krishna-gokhale-explorer', file),
        'utf-8'
    );
}

function readHubData() {
    return readFileSync(
        resolve(__dirname, '../../freedom-fighters-hub/script.js'),
        'utf-8'
    );
}

describe('Gopal Krishna Gokhale Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="gokhale-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Gopal Krishna');
        expect(html).toContain('Gokhale');
        expect(html).toContain('Political Guru');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'congress', 'social-reforms', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('highlights his moderate approach, social reforms, and influence on Gandhi', () => {
        expect(html).toContain('moderate');
        expect(html).toContain('Servants of India Society');
        expect(html).toContain('social reform');
        expect(html).toContain('Indian National Congress');
        expect(html).toContain('Gandhi');
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
        expect(html).toContain('india.gov.in');
    });
});

describe('Gopal Krishna Gokhale Explorer — Assets', () => {
    it('includes a non-empty stylesheet themed for the moderate era', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('gokhale-hero');
    });

    it('includes a valid interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('activateTab');
        expect(js).toContain('initTabNavigation');
        expect(js).toContain('initThemeToggle');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Gopal Krishna Gokhale — Landing Page Integration', () => {
    it('is listed as a card on the Freedom Fighters Hub landing page', () => {
        const js = readHubData();
        expect(js).toContain('gokhale');
        expect(js).toContain('Gopal Krishna Gokhale');
    });

    it('includes the moderate-era metadata and a dedicated explorer link', () => {
        const js = readHubData();
        expect(js).toContain('Political Guru of Gandhi');
        expect(js).toContain('Early Nationalist');
        expect(js).toContain('Social Reforms');
        expect(js).toContain('../gopal-krishna-gokhale-explorer/index.html');
    });
});