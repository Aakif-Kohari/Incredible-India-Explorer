/**
 * national-film-awards-explorer.test.js
 * Unit tests for the National Film Awards Explorer page and its integration
 * with the Awards of India Explorer landing page and search index.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/national-film-awards-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    const code = readFileSync(
        resolve(__dirname, '../../search-index.js'),
        'utf-8'
    );
    const fn = new Function(code + '\nreturn window.indiaSearchIndex;');
    return fn();
}

describe('National Film Awards Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with title and key stats', () => {
        expect(html).toContain('class="nfa-hero"');
        expect(html).toContain('National Film Awards Explorer');
        expect(html).toContain('nfa-hero-stats');
    });

    it('contains all required content sections', () => {
        const requiredSections = [
            'History',
            'Categories',
            'Best Feature Film',
            'Acting Awards',
            'Technical Awards',
            'Selection Process',
            'Timeline',
            'Notable Winners',
            'Image Gallery'
        ];
        requiredSections.forEach(section => {
            expect(html).toContain(section);
        });
    });

    it('has navigation tabs wired to sections', () => {
        expect(html).toContain('data-tab="history"');
        expect(html).toContain('data-tab="categories"');
        expect(html).toContain('data-tab="feature-film"');
        expect(html).toContain('data-tab="acting"');
        expect(html).toContain('data-tab="technical"');
        expect(html).toContain('data-tab="selection"');
        expect(html).toContain('data-tab="timeline"');
        expect(html).toContain('data-tab="winners"');
        expect(html).toContain('data-tab="gallery"');
        expect(html).toContain('id="history" class="nfa-section active"');
    });

    it('documents the award establishment and medal structure', () => {
        expect(html).toContain('Established in <strong>1954</strong>');
        expect(html).toContain('Swarna Kamal (Golden Lotus)');
        expect(html).toContain('Rajat Kamal (Silver Lotus)');
    });

    it('includes key historical facts', () => {
        expect(html).toContain('Shyamchi Aai');
        expect(html).toContain('Satyajit Ray');
        expect(html).toContain('Uttam Kumar');
        expect(html).toContain('Nargis');
    });

    it('links shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('type="module" src="script.js"');
    });
});

describe('National Film Awards Explorer — Assets & Scripts', () => {
    it('includes non-empty stylesheet with theme and responsive styles', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.nfa-page-body');
        expect(css).toContain('.nfa-hero');
        expect(css).toContain('.light-theme .nfa-content-card');
        expect(css).toContain('@media');
    });

    it('includes interactive script with tab, theme, and menu functions', () => {
        const js = readExplorerFile('script.js');
        expect(js.length).toBeGreaterThan(500);
        expect(js).toContain('initTabNavigation');
        expect(js).toContain('initThemeToggle');
        expect(js).toContain('initMobileMenu');
    });
});

describe('Awards of India Explorer Landing Page Integration', () => {
    it('contains a National Film Awards card linking to the explorer', () => {
        const landing = readFileSync(
            resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
            'utf-8'
        );
        expect(landing).toContain('National Film Awards');
        expect(landing).toContain('Instituted: 1954');
        expect(landing).toContain('href="../national-film-awards-explorer/index.html"');
        expect(landing).toContain('class="award-card glass-card"');
    });
});

describe('Search Index Integration', () => {
    it('registers the National Film Awards Explorer for site search', () => {
        const index = readSearchIndex();
        const entry = index.find(e => e.title === 'National Film Awards Explorer');
        expect(entry).toBeDefined();
        expect(entry.url).toBe('frontend/national-film-awards-explorer/index.html');
        expect(entry.category).toBe('Awards & Honours');
    });
});
