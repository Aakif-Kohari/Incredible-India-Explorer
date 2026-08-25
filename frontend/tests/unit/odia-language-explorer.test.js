import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/odia-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Odia Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Odia title and Classical classification', () => {
        expect(html).toContain('class="odia-hero"');
        expect(html).toContain('ଓଡ଼ିଆ');
        expect(html).toContain('Odia Explorer');
        expect(html).toContain('Indo-Aryan Family');
        expect(html).toContain('Classical Language of India');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('ନମସ୍କାର');
        expect(html).toContain('Namaskara');
        expect(html).toContain('odia-greeting-audio-btn');
    });

    it('showcases Odia curved palm-leaf script information and characters', () => {
        expect(html).toContain('Rounded Odia Script');
        expect(html).toContain('Talapatra');
        expect(html).toContain('script-sample-grid');
    });

    it('contains vocabulary words in script.js', () => {
        expect(js).toContain('ଧନ୍ୟବାଦ');
        expect(js).toContain('Dhanyabada');
        expect(js).toContain('Thank you');
        expect(js).toContain('ଆପଣ କେମିତି ଅଛନ୍ତି?');
        expect(js).toContain('ପାଣି');
        expect(js).toContain('ଭାତ');
    });

    it('contains major regions and literary/cultural section', () => {
        expect(html).toContain('Coastal Odisha');
        expect(html).toContain('Sambalpuri');
        expect(html).toContain('Sarala Das');
        expect(html).toContain('Panchasakha');
        expect(html).toContain('Odissi');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('Odisha Sahitya Akademi');
        expect(html).toContain('Source Attribution');
    });

    it('includes responsive styles and terracotta/maroon theme styling', () => {
        expect(css).toContain('--odia-terracotta');
        expect(css).toContain('.odia-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Odia Language Explorer — Landing Page Integration', () => {
    it('contains Odia card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Odia'");
        expect(landingHtml).toContain("script: 'ନମସ୍କାର'");
        expect(landingHtml).toContain("exploreUrl: '../odia-language-explorer/index.html'");
    });
});
