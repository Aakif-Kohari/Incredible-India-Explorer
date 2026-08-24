/**
 * kakori-train-action-explorer.test.js
 * Unit tests for the Kakori Train Action Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and landing page integration under Revolutionary Movements.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kakori-train-action-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Kakori Train Action Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="kakori-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Kakori Train Action');
        expect(html).toContain('9 August 1925');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['context', 'route', 'action', 'network', 'arrests', 'trial', 'impact', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        [
            'Non-Cooperation',
            'Hindustan Republican',
            'railway',
            'Kakori',
            'revolutionaries',
            'Conspiracy Case',
            'executions',
            'HSRA',
            'Timeline',
            'References'
        ].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Ram Prasad Bismil');
        expect(html).toContain('Ashfaqulla Khan');
        expect(html).toContain('Chandrashekhar Azad');
        expect(html).toContain('Rajendra Lahiri');
        expect(html).toContain('Roshan Singh');
        expect(html).toContain('8,000');
        expect(html).toContain('Lucknow');
        expect(html).toContain('1927');
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

describe('Kakori Train Action Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.kakori-hero');
        expect(css).toContain('.kakori-timeline');
        expect(css).toContain('.kakori-references');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('kakori-detail-title');
        expect(js).toContain('kakori-filter-btn');
        expect(js).toContain('kakori-route-title');
        expect(js).toContain('app:route-changed');
    });
});

describe('Kakori Train Action — Landing Page Integration', () => {
    it('is listed on the main landing page navigation under Culture', () => {
        const index = readLandingPage();
        expect(index).toContain('Kakori Train Action');
        expect(index).toContain('frontend/kakori-train-action-explorer/index.html');
    });

    it('adds the explorer to the global search index under Freedom Struggle', () => {
        const search = readSearchIndex();
        expect(search).toContain('Kakori Train Action Explorer');
        expect(search).toContain('Freedom Struggle');
        expect(search).toContain('frontend/kakori-train-action-explorer/index.html');
    });
});
