/**
 * lala-lajpat-rai-explorer.test.js
 * Unit tests for the Lala Lajpat Rai Explorer page.
 * Validates required sections, tab navigation, accessibility, image URLs,
 * historical accuracy, and landing page card integration on the
 * Freedom Fighters Knowledge Hub.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../lala-lajpat-rai-explorer', file),
        'utf-8'
    );
}

function readHubData() {
    return readFileSync(
        resolve(__dirname, '../../freedom-fighters-hub/script.js'),
        'utf-8'
    );
}

describe('Lala Lajpat Rai Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="lajpat-rai-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Lala Lajpat Rai');
        expect(html).toContain('Punjab Kesari');
        expect(html).toContain('Lal-Bal-Pal');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['biography', 'timeline', 'simon-commission', 'legacy', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('highlights the Simon Commission protest and Lahore lathi charge', () => {
        expect(html).toContain('Simon Commission');
        expect(html).toContain('Lahore');
        expect(html).toContain('lathi');
        expect(html).toContain('30 October');
        expect(html).toContain('coffin of British rule');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('uses HTTPS image sources with alt attributes', () => {
        const imgTags = html.match(/<img [^>]*>/g) || [];
        expect(imgTags.length).toBeGreaterThanOrEqual(6);
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
        expect(html).toContain('indianexpress.com');
    });
});

describe('Lala Lajpat Rai Explorer — Assets', () => {
    it('includes a non-empty stylesheet themed for the freedom struggle', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('lajpat-rai-hero');
    });

    it('includes a valid interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('activateTab');
        expect(js).toContain('initTabNavigation');
        expect(js).toContain('initThemeToggle');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Lala Lajpat Rai — Landing Page (Freedom Fighters Hub) Integration', () => {
    it('is listed as a card on the Freedom Fighters Hub landing page', () => {
        const js = readHubData();
        expect(js).toContain('lajpat-rai');
        expect(js).toContain('Lala Lajpat Rai');
    });

    it('includes the Lal-Bal-Pal era metadata and a dedicated explorer link', () => {
        const js = readHubData();
        expect(js).toContain('Punjab Kesari');
        expect(js).toContain('Early Nationalist');
        expect(js).toContain('Simon Commission Protest');
        expect(js).toContain('../lala-lajpat-rai-explorer/index.html');
    });
});
