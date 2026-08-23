import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/hindi-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Hindi Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Hindi title and Indo-Aryan classification', () => {
        expect(html).toContain('class="hindi-hero"');
        expect(html).toContain('हिन्दी');
        expect(html).toContain('Hindi Explorer');
        expect(html).toContain('Indo-Aryan Language Family');
        expect(html).toContain('Devanagari Script');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('नमस्ते');
        expect(html).toContain('Namaste');
        expect(html).toContain('hindi-greeting-audio-btn');
    });

    it('showcases Devanagari script characteristics and special samples', () => {
        expect(html).toContain('Devanagari');
        expect(html).toContain('script-sample-grid');
        expect(html).toContain('Kanṭhya');
        expect(html).toContain('अ');
    });

    it('contains 5-10 common vocabulary words in script.js', () => {
        expect(js).toContain('धन्यवाद');
        expect(js).toContain('Dhanyavaad');
        expect(js).toContain('Thank you');
        expect(js).toContain('आप कैसे हैं?');
        expect(js).toContain('कृपया');
        expect(js).toContain('जल / पानी');
    });

    it('contains major dialect regions and literary/cultural section', () => {
        expect(html).toContain('Khariboli');
        expect(html).toContain('Braj Bhasha');
        expect(html).toContain('Awadhi');
        expect(html).toContain('Kabir');
        expect(html).toContain('Tulsidas');
        expect(html).toContain('Munshi Premchand');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('Central Hindi Directorate');
        expect(html).toContain('Sahitya Akademi');
        expect(html).toContain('Sources &amp; Scholarly References');
    });

    it('includes responsive styles and custom color theme styling', () => {
        expect(css).toContain('--hindi-saffron');
        expect(css).toContain('.hindi-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Hindi Language Explorer — Landing Page Integration', () => {
    it('contains Hindi card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Hindi'");
        expect(landingHtml).toContain("script: 'नमस्ते'");
        expect(landingHtml).toContain("exploreUrl: '../hindi-language-explorer/index.html'");
    });
});
