import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/assamese-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Assamese Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Assamese title and Indo-Aryan classification', () => {
        expect(html).toContain('class="assamese-hero"');
        expect(html).toContain('অসমীয়া');
        expect(html).toContain('Assamese Explorer');
        expect(html).toContain('Indo-Aryan Family');
        expect(html).toContain('Brahmaputra Valley');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('নমস্কাৰ');
        expect(html).toContain('Namaskar');
        expect(html).toContain('assamese-greeting-audio-btn');
    });

    it('showcases Assamese script information including unique characters', () => {
        expect(html).toContain('Assamese Script');
        expect(html).toContain('ৰ');
        expect(html).toContain('ৱ');
        expect(html).toContain('script-sample-grid');
    });

    it('contains vocabulary words in script.js', () => {
        expect(js).toContain('ধন্যবাদ');
        expect(js).toContain('Dhonyobad');
        expect(js).toContain('Thank you');
        expect(js).toContain('আপোনাৰ খবৰ কি?');
        expect(js).toContain('পানী');
        expect(js).toContain('ভাত');
    });

    it('contains major regions and literary/cultural section', () => {
        expect(html).toContain('Upper Assam');
        expect(html).toContain('Kamrupi');
        expect(html).toContain('Srimanta Sankardev');
        expect(html).toContain('Buranjis');
        expect(html).toContain('Bihu');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('Asam Sahitya Sabha');
        expect(html).toContain('Source Attribution');
    });

    it('includes responsive styles and red/gold theme styling', () => {
        expect(css).toContain('--assamese-red');
        expect(css).toContain('.assamese-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Assamese Language Explorer — Landing Page Integration', () => {
    it('contains Assamese card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Assamese'");
        expect(landingHtml).toContain("script: 'নমস্কাৰ'");
        expect(landingHtml).toContain("exploreUrl: '../assamese-language-explorer/index.html'");
    });
});
