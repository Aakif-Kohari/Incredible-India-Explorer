/**
 * Yoga — India's Global Cultural Heritage — Vitest Unit Tests
 * Issue #2939: Y: Yoga — India's Global Cultural Heritage
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readYogaFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/yoga-explorer', file),
        'utf-8'
    );
}

function loadYogaData() {
    const code = readYogaFile('yoga-data.js');
    const fn   = new Function(code + '\nreturn YOGA_DATA;');
    return fn();
}

/* ============================================================
   HTML Structure & Accessibility
   ============================================================ */
describe('Yoga Explorer — Page Structure & Accessibility', () => {
    let html;

    beforeAll(() => {
        html = readYogaFile('index.html');
    });

    it('contains the required feature title and major section headings', () => {
        expect(html).toContain('Yoga — India\'s Global Cultural Heritage');
        expect(html).toContain('Historical Background &amp; Evolution');
        expect(html).toContain('Major Yoga Traditions &amp; Paths');
        expect(html).toContain('Yoga Philosophy &amp; Core Concepts');
        expect(html).toContain('Traditional Practices &amp; Disciplines');
        expect(html).toContain('Important &amp; Foundational Yoga Texts');
        expect(html).toContain('Interactive Timeline: Development &amp; Global Spread');
        expect(html).toContain('Modern Global Presence &amp; UNESCO Recognition');
        expect(html).toContain('Sources &amp; References');
    });

    it('contains accessibility skip link pointing to main content', () => {
        expect(html).toContain('class="yoga-skip-link"');
        expect(html).toContain('href="#main-content"');
        expect(html).toContain('id="main-content"');
    });

    it('references local CSS, dataset, and controller JS files', () => {
        expect(html).toContain('href="yoga.css"');
        expect(html).toContain('src="yoga-data.js"');
        expect(html).toContain('src="yoga.js"');
    });

    it('contains navigation back link to Culture Overview', () => {
        expect(html).toContain('href="../culture/culture.html"');
        expect(html).toContain('Back to Culture Overview');
    });

    it('contains hero stat counters', () => {
        expect(html).toContain('id="yoga-stat-traditions"');
        expect(html).toContain('id="yoga-stat-texts"');
        expect(html).toContain('id="yoga-stat-epochs"');
        expect(html).toContain('id="yoga-stat-global"');
    });

    it('contains timeline container and filter bar', () => {
        expect(html).toContain('id="yoga-timeline-filter-bar"');
        expect(html).toContain('id="yoga-timeline-container"');
        expect(html).toContain('role="toolbar"');
        expect(html).toContain('role="region"');
    });
});

/* ============================================================
   CSS Design System
   ============================================================ */
describe('Yoga Explorer — CSS Design System', () => {
    let css;

    beforeAll(() => {
        css = readYogaFile('yoga.css');
    });

    it('defines responsive breakpoints', () => {
        expect(css).toContain('@media (max-width: 900px)');
        expect(css).toContain('@media (max-width: 600px)');
    });

    it('defines visible focus ring state', () => {
        expect(css).toContain('focus-visible');
    });

    it('defines prefers-reduced-motion guard', () => {
        expect(css).toContain('prefers-reduced-motion');
    });

    it('defines custom design tokens', () => {
        expect(css).toContain('--yoga-bg');
        expect(css).toContain('--yoga-saffron');
        expect(css).toContain('--yoga-teal');
        expect(css).toContain('--yoga-surface');
    });

    it('contains timeline and card styling rules', () => {
        expect(css).toContain('.yoga-timeline-container');
        expect(css).toContain('.yoga-timeline-node');
        expect(css).toContain('.yoga-timeline-card');
        expect(css).toContain('.yoga-tradition-card');
    });
});

/* ============================================================
   JavaScript Controller Functions
   ============================================================ */
describe('Yoga Explorer — JavaScript Interactivity', () => {
    let js;

    beforeAll(() => {
        js = readYogaFile('yoga.js');
    });

    it('exposes initYogaExplorer function', () => {
        expect(js).toContain('function initYogaExplorer');
    });

    it('exposes renderTimeline function', () => {
        expect(js).toContain('function renderTimeline');
    });

    it('exposes filterTimeline function', () => {
        expect(js).toContain('function filterTimeline');
    });

    it('exposes selectTimelineEntry function', () => {
        expect(js).toContain('function selectTimelineEntry');
    });

    it('implements keyboard accessibility for interactive elements', () => {
        expect(js).toContain("'Enter'");
        expect(js).toContain("' '");
        expect(js).toContain('aria-expanded');
    });
});

/* ============================================================
   Dataset Verification
   ============================================================ */
describe('Yoga Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadYogaData();
    });

    it('exposes YOGA_DATA with meta object', () => {
        expect(data).toBeDefined();
        expect(data.meta).toBeDefined();
        expect(data.meta.title).toContain('Yoga');
        expect(data.meta.unescoYear).toBe('2016');
        expect(data.meta.unDayOfYoga).toBe('June 21');
    });

    it('contains major traditions (Raja, Hatha, Bhakti, Jnana, Karma)', () => {
        expect(data.traditions).toBeDefined();
        expect(Array.isArray(data.traditions)).toBe(true);
        expect(data.traditions.length).toBeGreaterThanOrEqual(5);

        const ids = data.traditions.map(t => t.id);
        expect(ids).toContain('raja-yoga');
        expect(ids).toContain('hatha-yoga');
        expect(ids).toContain('bhakti-yoga');
        expect(ids).toContain('jnana-yoga');
        expect(ids).toContain('karma-yoga');

        data.traditions.forEach(t => {
            expect(t.name).toBeTruthy();
            expect(t.sanskritName).toBeTruthy();
            expect(t.focus).toBeTruthy();
            expect(t.description).toBeTruthy();
            expect(t.coreTexts).toBeTruthy();
        });
    });

    it('contains core philosophy concepts including Ashtanga (8 Limbs)', () => {
        expect(data.philosophyConcepts).toBeDefined();
        expect(Array.isArray(data.philosophyConcepts)).toBe(true);
        expect(data.philosophyConcepts.length).toBeGreaterThanOrEqual(4);

        const titles = data.philosophyConcepts.map(c => c.title);
        expect(titles.some(t => t.includes('Ashtanga') || t.includes('Eight Limbs'))).toBe(true);
        expect(titles.some(t => t.includes('Citta-Vritti-Nirodha'))).toBe(true);
    });

    it('contains traditional practices (Asana, Pranayama, Dhyana, Shatkarma)', () => {
        expect(data.practices).toBeDefined();
        expect(Array.isArray(data.practices)).toBe(true);

        const names = data.practices.map(p => p.name);
        expect(names).toContain('Asana');
        expect(names).toContain('Pranayama');
        expect(names).toContain('Dhyana & Dharana');
    });

    it('contains foundational texts (Yoga Sutras, Bhagavad Gita, Hatha Yoga Pradipika)', () => {
        expect(data.texts).toBeDefined();
        expect(Array.isArray(data.texts)).toBe(true);
        expect(data.texts.length).toBeGreaterThanOrEqual(5);

        const ids = data.texts.map(t => t.id);
        expect(ids).toContain('yoga-sutras');
        expect(ids).toContain('bhagavad-gita');
        expect(ids).toContain('hatha-yoga-pradipika');

        data.texts.forEach(text => {
            expect(text.title).toBeTruthy();
            expect(text.dateLabel).toBeTruthy();
            expect(text.significance).toBeTruthy();
            expect(text.keyQuote).toBeTruthy();
        });
    });

    it('contains 8 historical timeline entries progressing from antiquity to modern global era', () => {
        expect(data.timelineEntries).toBeDefined();
        expect(Array.isArray(data.timelineEntries)).toBe(true);
        expect(data.timelineEntries.length).toBeGreaterThanOrEqual(8);

        data.timelineEntries.forEach(entry => {
            expect(entry.id).toBeTruthy();
            expect(entry.periodLabel).toBeTruthy();
            expect(entry.epochCategory).toBeTruthy();
            expect(entry.title).toBeTruthy();
            expect(entry.description).toBeTruthy();
            expect(entry.significance).toBeTruthy();
            expect(entry.sources).toBeTruthy();
        });
    });

    it('contains modern global details on UNESCO 2016 and UN International Day of Yoga', () => {
        expect(data.modernGlobal).toBeDefined();
        expect(data.modernGlobal.unescoTitle).toContain('2016');
        expect(data.modernGlobal.unDayTitle).toContain('June 21');
        expect(data.modernGlobal.unescoPoints.length).toBeGreaterThanOrEqual(2);
    });

    it('contains at least 3 reliable sources with valid title and url', () => {
        expect(data.sources).toBeDefined();
        expect(Array.isArray(data.sources)).toBe(true);
        expect(data.sources.length).toBeGreaterThanOrEqual(3);

        data.sources.forEach(src => {
            expect(src.title).toBeTruthy();
            expect(src.url).toContain('http');
        });
    });
});

/* ============================================================
   Search Index Integration
   ============================================================ */
describe('Yoga Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readFileSync(
            resolve(__dirname, '../../frontend/search-index.js'),
            'utf-8'
        );
        expect(searchIndex).toContain('yoga-explorer');
        expect(searchIndex).toContain('Yoga — India\'s Global Cultural Heritage');
    });
});
