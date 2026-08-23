import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/sindhi-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Sindhi Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with dual Sindhi title and Indo-Aryan classification', () => {
        expect(html).toContain('class="sindhi-hero"');
        expect(html).toContain('سنڌي');
        expect(html).toContain('सिंधी');
        expect(html).toContain('Sindhi Explorer');
        expect(html).toContain('Indo-Aryan Family');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('Jai Jhulelal');
        expect(html).toContain('السلام عليڪم');
        expect(html).toContain('sindhi-greeting-audio-btn');
    });

    it('showcases dual Perso-Arabic and Devanagari script traditions and implosives', () => {
        expect(html).toContain('Perso-Arabic Sindhi');
        expect(html).toContain('Devanagari Sindhi');
        expect(html).toContain('Khudabadi');
        expect(html).toContain('script-sample-grid');
    });

    it('contains vocabulary words in script.js', () => {
        expect(js).toContain('مهرباني');
        expect(js).toContain('मेहरबानी');
        expect(js).toContain('Meharbani');
        expect(js).toContain('Thank you');
        expect(js).toContain('پاڻي');
        expect(js).toContain('पाणी');
    });

    it('contains Indian regions and Sufi literary/cultural section', () => {
        expect(html).toContain('Gujarat');
        expect(html).toContain('Maharashtra');
        expect(html).toContain('Shah Abdul Latif Bhittai');
        expect(html).toContain('Shah Jo Risalo');
        expect(html).toContain('Cheti Chand');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('National Council for Promotion of Sindhi Language');
        expect(html).toContain('Source Attribution');
    });

    it('includes responsive styles and indigo/crimson theme styling', () => {
        expect(css).toContain('--sindhi-indigo');
        expect(css).toContain('.sindhi-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Sindhi Language Explorer — Landing Page Integration', () => {
    it('contains Sindhi card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Sindhi'");
        expect(landingHtml).toContain("script: 'سنڌي / सिंधी'");
        expect(landingHtml).toContain("exploreUrl: '../sindhi-language-explorer/index.html'");
    });
});
