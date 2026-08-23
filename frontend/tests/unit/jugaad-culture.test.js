import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/jugaad-culture', file),
        'utf-8'
    );
}

describe('Jugaad Culture — Page Structure & Content (#2926)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains a semantic hero section with Jugaad badges and title', () => {
        expect(html).toContain('class="hero-section jugaad-hero"');
        expect(html).toContain('<h1 id="hero-heading">');
        expect(html).toContain('Jugaad');
        expect(html).toContain('Frugal Innovation');
    });

    it('contains all required cultural sections', () => {
        expect(html).toContain('id="meaning"');
        expect(html).toContain('id="examples"');
        expect(html).toContain('id="modern"');
        expect(html).toContain('id="ethics"');
        expect(html).toContain('id="interactive"');
        expect(html).toContain('id="sources"');
    });

    it('documents traditional and regional innovations with examples', () => {
        expect(html).toContain('Mitticool');
        expect(html).toContain('Jaipur Foot');
        expect(html).toContain('Gujarat');
        expect(html).toContain('Rajasthan');
        expect(html).toContain('Mangalyaan');
    });

    it('documents distinction between creativity and unsafe shortcuts', () => {
        expect(html).toContain('Creativity vs. Dangerous Shortcuts');
        expect(html).toContain('Positive Jugaad');
        expect(html).toContain('Negative Jugaad');
    });

    it('includes references and source literature', () => {
        expect(html).toContain('Radjou');
        expect(html).toContain('National Innovation Foundation');
        expect(html).toContain('ISRO');
    });

    it('includes structured data (JSON-LD)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
    });
});

describe('Jugaad Culture — Scripts & Styles', () => {
    it('style.css defines responsive cards, dark/light theme, and interactive simulator', () => {
        const css = readFile('style.css');
        expect(css).toContain('.jugaad-hero');
        expect(css).toContain('.light-theme');
        expect(css).toContain('.interactive-card');
        expect(css).toContain('@media');
    });

    it('script.js implements scenario solver and theme switching', () => {
        const js = readFile('script.js');
        expect(js).toContain('scenarios');
        expect(js).toContain('theme-toggle');
        expect(js).toContain('handleOptionSelect');
    });
});
