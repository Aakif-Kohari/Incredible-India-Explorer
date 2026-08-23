import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/sanskrit-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Sanskrit Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Sanskrit title and Classical classification', () => {
        expect(html).toContain('class="sanskrit-hero"');
        expect(html).toContain('संस्कृतम्');
        expect(html).toContain('Sanskrit Explorer');
        expect(html).toContain('Indo-Aryan / Indo-European');
        expect(html).toContain('First Classical Language of India');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('नमस्ते');
        expect(html).toContain('Namaste');
        expect(html).toContain('sanskrit-greeting-audio-btn');
    });

    it('showcases Devanagari script information and articulatory phonetics', () => {
        expect(html).toContain('Devanagari Script');
        expect(html).toContain('script-sample-grid');
    });

    it('contains vocabulary words in script.js', () => {
        expect(js).toContain('धन्यवादः');
        expect(js).toContain('Dhanyavādaḥ');
        expect(js).toContain('Thank you');
        expect(js).toContain('कथम् अस्ति?');
        expect(js).toContain('जलम्');
        expect(js).toContain('गृहम्');
    });

    it('contains major texts, literature, and historical timeline', () => {
        expect(html).toContain('The Four Vedas &amp; Upanishads');
        expect(html).toContain('Ramayana &amp; Mahabharata');
        expect(html).toContain('Kalidasa');
        expect(html).toContain('Vedic Sanskrit');
        expect(html).toContain('Panini');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('Rashtriya Sanskrit Sansthan');
        expect(html).toContain('Source Attribution');
    });

    it('includes responsive styles and saffron/gold theme styling', () => {
        expect(css).toContain('--sanskrit-saffron');
        expect(css).toContain('.sanskrit-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Sanskrit Language Explorer — Landing Page Integration', () => {
    it('contains Sanskrit card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Sanskrit'");
        expect(landingHtml).toContain("script: 'नमस्ते'");
        expect(landingHtml).toContain("exploreUrl: '../sanskrit-language-explorer/index.html'");
    });
});
