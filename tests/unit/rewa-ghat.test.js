import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/rewa-ghat', file),
        'utf-8'
    );
}

describe('Rewa Ghat — Page Structure & Content (#3295)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with location and river information', () => {
        expect(html).toContain('id="hero"');
        expect(html).toContain('<h1 id="hero-heading">Rewa Ghat</h1>');
        expect(html).toContain('Varanasi');
        expect(html).toContain('Ganges');
        expect(html).toContain('class="geo-table"');
    });

    it('contains all suggested content sections', () => {
        expect(html).toContain('id="history"');
        expect(html).toContain('id="royal-heritage"');
        expect(html).toContain('id="temples"');
        expect(html).toContain('id="facts"');
        expect(html).toContain('id="gallery"');
    });

    it('explains the origin and history of the ghat', () => {
        expect(html).toContain('Lala Mishir');
        expect(html).toContain('Leelaram');
        expect(html).toContain('1879');
    });

    it('introduces the connection with the Maharaja of Rewa', () => {
        expect(html).toContain('Maharaja of Rewa');
        expect(html).toContain('Baghela');
        expect(html).toContain('Raghuraj Singh');
    });

    it('describes the palace and architectural structures', () => {
        expect(html).toContain('Rewa Kothi');
        expect(html).toContain('sandstone');
        expect(html).toContain('Ardhstambhs');
    });

    it('highlights important nearby temples', () => {
        expect(html).toContain('Tulsi Ghat');
        expect(html).toContain('Kedareshwar Temple');
        expect(html).toContain('Goswami Tulsidas');
    });

    it('explains cultural heritage and role in Varanasi', () => {
        expect(html).toContain('Banaras Hindu University');
        expect(html).toContain('Sangeet Kala');
        expect(html).toContain('Drishya Kala');
    });

    it('describes relationship with neighbouring ghats', () => {
        expect(html).toContain('Assi Ghat');
        expect(html).toContain('Ganga Mahal Ghat');
    });

    it('includes historical facts and a visual gallery with credits', () => {
        expect(html).toContain('id="facts"');
        expect(html).toContain('class="gallery-grid"');
        expect(html).toContain('attribution-tag');
    });

    it('uses accessible, semantic markup for responsive design', () => {
        expect(html).toContain('aria-labelledby="hero-heading"');
        expect(html).toContain('role="tablist"');
        expect(html).toContain('role="tabpanel"');
        expect(html).toContain('name="viewport"');
    });
});

describe('Rewa Ghat — Scripts & Styles', () => {
    it('style.css defines hero, tabs, and gallery components', () => {
        const css = readFile('style.css');
        expect(css).toContain('.hero-section');
        expect(css).toContain('.tabs-container');
        expect(css).toContain('.gallery-grid');
        expect(css).toContain('.geo-table');
    });

    it('script.js wires interactive tabs and theme switching', () => {
        const js = readFile('script.js');
        expect(js).toContain('initTabs');
        expect(js).toContain('data-tab');
        expect(js).toContain('theme-toggle');
    });
});