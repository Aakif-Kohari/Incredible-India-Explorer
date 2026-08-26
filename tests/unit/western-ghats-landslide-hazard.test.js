import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const candidates = [
        resolve(__dirname, '../../frontend/western-ghats-landslide-hazard', file),
        resolve(__dirname, '../../western-ghats-landslide-hazard', file),
        resolve(__dirname, '../../../frontend/western-ghats-landslide-hazard', file)
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

describe('Western Ghats Landslide Hazard Profile — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readFile('index.html');
        css = readFile('style.css');
        js = readFile('script.js');
    });

    it('contains page title, header branding, and hero metrics', () => {
        expect(html).toContain('Western Ghats');
        expect(html).toContain('Landslide Hazard Profile');
        expect(html).toContain('1,600 km');
        expect(html).toContain('2,695 m');
    });

    it('contains core section IDs', () => {
        expect(html).toContain('id="geography"');
        expect(html).toContain('id="geology"');
        expect(html).toContain('id="monsoon"');
        expect(html).toContain('id="map"');
        expect(html).toContain('id="infrastructure"');
        expect(html).toContain('id="environment"');
        expect(html).toContain('id="warning"');
        expect(html).toContain('id="mitigation"');
        expect(html).toContain('id="quiz"');
        expect(html).toContain('id="sources"');
    });

    it('contains interactive cross-section elements and season toggle', () => {
        expect(html).toContain('id="xsecSvg"');
        expect(html).toContain('id="btnDry"');
        expect(html).toContain('id="btnWet"');
        expect(html).toContain('id="layerInfo"');
        expect(js).toContain('setSeason');
        expect(js).toContain('showLayer');
        expect(js).toContain('laterite');
    });

    it('contains rainfall chart and interactive ridge hotspot map', () => {
        expect(html).toContain('id="rainBars"');
        expect(html).toContain('id="ridgeMap"');
        expect(html).toContain('id="mapPanel"');
        expect(js).toContain('pinData');
        expect(js).toContain('wayanad');
        expect(js).toContain('nilgiris');
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
        expect(css).toContain('[data-theme="dark"]');
    });
});

describe('Western Ghats Landslide Hazard Profile — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('Western Ghats — Landslide Hazard Profile');
        expect(searchIndex).toContain('frontend/western-ghats-landslide-hazard/index.html');
    });
});
