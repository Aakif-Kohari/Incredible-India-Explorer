import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const candidates = [
        resolve(__dirname, '../../frontend/cyclone-michaung-2023', file),
        resolve(__dirname, '../../cyclone-michaung-2023', file),
        resolve(__dirname, '../../../frontend/cyclone-michaung-2023', file)
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

describe('Cyclone Michaung 2023 — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readFile('index.html');
        css = readFile('style.css');
        js = readFile('script.js');
    });

    it('contains page title, header branding, and hero metrics', () => {
        expect(html).toContain('Cyclone Michaung');
        expect(html).toContain('Incredible India Explorer');
        expect(html).toContain('100 km/h');
        expect(html).toContain('985 hPa');
    });

    it('contains core section IDs', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="track"');
        expect(html).toContain('id="impact"');
        expect(html).toContain('id="rainfall"');
        expect(html).toContain('id="flooding"');
        expect(html).toContain('id="infra"');
        expect(html).toContain('id="relief"');
        expect(html).toContain('id="response"');
        expect(html).toContain('id="quiz"');
        expect(html).toContain('id="sources"');
    });

    it('contains interactive track map and timeline scrubber elements', () => {
        expect(html).toContain('id="mapsvg"');
        expect(html).toContain('id="scrub"');
        expect(html).toContain('id="prevBtn"');
        expect(html).toContain('id="nextBtn"');
        expect(html).toContain('id="infocard"');
        expect(js).toContain('waypoints');
        expect(js).toContain('Bapatla');
    });

    it('contains regional impact and infrastructure breakdowns', () => {
        expect(html).toContain('Tamil Nadu');
        expect(html).toContain('Andhra Pradesh');
        expect(html).toContain('Chennai airport');
        expect(html).toContain('NDRF');
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

describe('Cyclone Michaung 2023 — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Cyclone Michaung 2023');
        expect(searchIndex).toContain('frontend/cyclone-michaung-2023/index.html');
    });
});
