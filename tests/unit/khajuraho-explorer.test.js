/**
 * khajuraho-explorer.test.js
 * Unit tests for the Khajuraho Explorer page.
 * Validates required sections, key heritage content, accessibility,
 * and page assets for the Khajuraho Group of Monuments heritage page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/khajuraho-explorer', file),
        'utf-8'
    );
}

describe('Khajuraho Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="khajuraho-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Khajuraho');
        expect(html).toContain('Madhya Pradesh');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'history', 'architecture', 'temples', 'sculptures', 'heritage', 'unesco', 'timeline', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Chandela', 'Nagara', 'Major Temples', 'Sculptures', 'Cultural', 'UNESCO', 'Interesting Facts', 'Gallery'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key heritage details', () => {
        expect(html).toContain('Kandariya Mahadeva');
        expect(html).toContain('Lakshmana');
        expect(html).toContain('Vishvanatha');
        expect(html).toContain('Chausath Yogini');
        expect(html).toContain('shikhara');
        expect(html).toContain('UNESCO World Heritage');
        expect(html).toContain('1986');
    });

    it('contains a historical timeline and interesting facts', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('1838');
        expect(html).toContain('T. S. Burt');
        expect(html).toContain('id="facts"');
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
});

describe('Khajuraho Explorer — Assets', () => {
    it('includes a non-empty stylesheet with hero, section and light-theme styles', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.khajuraho-hero');
        expect(css).toContain('.khajuraho-highlight-box');
        expect(css).toContain('.khajuraho-timeline-flow');
        expect(css).toContain('.khajuraho-references');
        expect(css).toContain('body.light-theme');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('khajuraho-modal');
        expect(js).toContain('Journey');
        expect(js).toContain('journey-bookmark-btn');
        expect(js).toContain('btn-scroll-top');
    });

    it('gallery images are lazy-loaded', () => {
        const html = readExplorerFile('index.html');
        const imgs = html.match(/<img[^>]*>/g) || [];
        expect(imgs.length).toBeGreaterThanOrEqual(3);
        imgs.forEach(img => {
            expect(img).toContain('loading="lazy"');
        });
    });
});
