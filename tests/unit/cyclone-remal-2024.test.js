import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const candidates = [
        resolve(__dirname, '../../frontend/cyclone-remal-2024', file),
        resolve(__dirname, '../../cyclone-remal-2024', file),
        resolve(__dirname, '../../../frontend/cyclone-remal-2024', file)
    ];
    for (const c of candidates) {
        if (existsSync(c)) return readFileSync(c, 'utf-8');
    }
    throw new Error(`File ${file} not found`);
}

function readSearchIndex() {
    const candidates = [
        resolve(__dirname, '../../frontend/search-index.js'),
        resolve(__dirname, '../../search-index.js'),
        resolve(__dirname, '../../../frontend/search-index.js')
    ];
    for (const c of candidates) {
        if (existsSync(c)) return readFileSync(c, 'utf-8');
    }
    throw new Error('search-index.js not found');
}

describe('Cyclone Remal 2024 — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readFile('index.html');
        css = readFile('style.css');
        js = readFile('script.js');
    });

    it('contains page title, header branding, and hero metrics', () => {
        expect(html).toContain('Cyclone Remal');
        expect(html).toContain('Incredible India Explorer');
        expect(html).toContain('135');
        expect(html).toContain('km/h');
        expect(html).toContain('207,060');
    });

    it('contains core section IDs', () => {
        expect(html).toContain('id="formation"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="bengal"');
        expect(html).toContain('id="surge"');
        expect(html).toContain('id="wind"');
        expect(html).toContain('id="evacuation"');
        expect(html).toContain('id="infrastructure"');
        expect(html).toContain('id="warning"');
        expect(html).toContain('id="map"');
        expect(html).toContain('id="quiz"');
        expect(html).toContain('id="sources"');
    });

    it('contains interactive track map and impact zone SVG maps', () => {
        expect(html).toContain('id="trackSvg"');
        expect(html).toContain('id="impactSvg"');
        expect(html).toContain('id="mapReadout"');
        expect(html).toContain('id="impactReadout"');
        expect(js).toContain('trackSvg');
        expect(js).toContain('impactSvg');
    });

    it('contains West Bengal impact and early warning details', () => {
        expect(html).toContain('Sagar Island');
        expect(html).toContain('Sundarbans');
        expect(html).toContain('Gosaba');
        expect(html).toContain('Kolkata');
    });

    it('contains interactive knowledge check quiz with feedback and scoring', () => {
        expect(html).toContain('id="quizQuestionsContainer"');
        expect(html).toContain('id="quizScoreBadge"');
        expect(html).toContain('id="resetQuizBtn"');
        expect(js).toContain('quizQuestions');
    });

    it('supports theme toggle and includes JSON-LD structured data', () => {
        expect(html).toContain('id="theme-toggle"');
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
        expect(css).toContain('[data-theme="light"]');
    });
});

describe('Cyclone Remal 2024 — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Cyclone Remal 2024');
        expect(searchIndex).toContain('frontend/cyclone-remal-2024/index.html');
    });
});
