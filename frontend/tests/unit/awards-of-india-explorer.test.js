/**
 * awards-of-india-explorer.test.js
 * Unit tests for the Awards of India Explorer Landing Page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readLandingFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer', file),
        'utf-8'
    );
}

describe('Awards of India Explorer Landing Page — Structure', () => {
    let html;

    beforeAll(() => {
        html = readLandingFile('index.html');
    });

    it('contains a hero section with title and subtitle', () => {
        expect(html).toContain('class="hero-title"');
        expect(html).toContain('Awards of India Explorer');
        expect(html).toContain('hero-stats');
    });

    it('contains all required award categories in filter buttons', () => {
        const requiredCategories = [
            'Civilian Awards',
            'Gallantry Awards',
            'Sports Awards',
            'Literature &amp; Arts',
            'Science &amp; Technology',
            'National Recognition'
        ];
        requiredCategories.forEach(cat => {
            expect(html).toContain(cat);
        });
    });

    it('contains search input and category filter buttons', () => {
        expect(html).toContain('id="award-search-input"');
        expect(html).toContain('class="filter-categories"');
    });

    it('contains award cards with name, category, year, description, and explore button', () => {
        expect(html).toContain('class="award-card glass-card"');
        expect(html).toContain('class="award-name"');
        expect(html).toContain('class="award-category"');
        expect(html).toContain('class="award-year"');
        expect(html).toContain('class="award-description"');
        expect(html).toContain('class="award-btn"');
    });

    it('contains key award cards including Bharat Ratna and Padma awards', () => {
        expect(html).toContain('Bharat Ratna');
        expect(html).toContain('Padma Vibhushan');
        expect(html).toContain('Padma Bhushan');
        expect(html).toContain('Padma Shri');
    });

    it('contains an interactive timeline and quiz section', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="quiz"');
        expect(html).toContain('id="quiz-container"');
    });

    it('links shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Awards of India Explorer Landing Page — Assets & Scripts', () => {
    it('includes non-empty stylesheet with glassmorphism and responsive styles', () => {
        const css = readLandingFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.awards-page-body');
        expect(css).toContain('.award-card');
        expect(css).toContain('@media');
    });

    it('includes interactive script with search, filter, and quiz functions', () => {
        const js = readLandingFile('script.js');
        expect(js.length).toBeGreaterThan(500);
        expect(js).toContain('initSearchAndFilter');
        expect(js).toContain('initQuiz');
        expect(js).toContain('quizData');
    });
});
