import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const candidates = [
        resolve(__dirname, '../../frontend/megalithic-heritage-explorer', file),
        resolve(__dirname, '../../megalithic-heritage-explorer', file),
        resolve(__dirname, '../../../frontend/megalithic-heritage-explorer', file)
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

describe('Megalithic Heritage Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readFile('index.html');
        css = readFile('style.css');
        js = readFile('script.js');
    });

    it('contains page title, header branding, and hero metrics', () => {
        expect(html).toContain('The Megalithic Heritage of India');
        expect(html).toContain('Incredible India Explorer');
        expect(html).toContain('1500');
        expect(html).toContain('500 BCE');
        expect(html).toContain('2,200+');
    });

    it('contains core section IDs', () => {
        expect(html).toContain('id="map-section"');
        expect(html).toContain('id="typology"');
        expect(html).toContain('id="artifacts"');
        expect(html).toContain('id="regions"');
        expect(html).toContain('id="register"');
        expect(html).toContain('id="quiz"');
    });

    it('contains Leaflet map container and filter legend', () => {
        expect(html).toContain('id="map"');
        expect(html).toContain('id="legend"');
        expect(js).toContain('L.map');
        expect(js).toContain('pinIcon');
        expect(js).toContain('Hirebenkal');
        expect(js).toContain('Nartiang');
    });

    it('contains typology grid and code definitions', () => {
        expect(html).toContain('id="typegrid"');
        expect(js).toContain('TY.01');
        expect(js).toContain('Menhir');
        expect(js).toContain('Dolmen / Cist');
        expect(js).toContain('topikal');
    });

    it('contains material culture and grave goods section', () => {
        expect(html).toContain('Black-and-Red Ware');
        expect(html).toContain('Iron Weapons');
        expect(html).toContain('Carnelian');
    });

    it('contains regional variations list and site register', () => {
        expect(html).toContain('id="regionlist"');
        expect(html).toContain('id="registergrid"');
        expect(js).toContain('Vidarbha');
        expect(js).toContain('Karnataka');
        expect(js).toContain('Meghalaya');
    });

    it('contains interactive quiz widget with scoring and reset button', () => {
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

describe('Megalithic Heritage Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('The Megalithic Heritage of India');
        expect(searchIndex).toContain('frontend/megalithic-heritage-explorer/index.html');
    });
});
