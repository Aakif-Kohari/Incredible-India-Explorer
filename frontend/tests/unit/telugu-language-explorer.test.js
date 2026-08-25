import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/telugu-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Telugu Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Telugu title and Dravidian classification', () => {
        expect(html).toContain('class="telugu-hero"');
        expect(html).toContain('తెలుగు');
        expect(html).toContain('Telugu Explorer');
        expect(html).toContain('Dravidian Language Family');
        expect(html).toContain('Telugu Script');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('నమస్కారం');
        expect(html).toContain('Namaskaram');
        expect(html).toContain('telugu-greeting-audio-btn');
    });

    it('showcases Telugu script characteristics and sample glyphs', () => {
        expect(html).toContain('Telugu Script');
        expect(html).toContain('script-sample-grid');
        expect(html).toContain('అ');
        expect(html).toContain('Talakattu');
    });

    it('contains 5-10 common vocabulary words in script.js', () => {
        expect(js).toContain('ధన్యవాదాలు');
        expect(js).toContain('Dhanyavaadaalu');
        expect(js).toContain('Thank you');
        expect(js).toContain('మీరు ఎలా ఉన్నారు?');
        expect(js).toContain('దయచేసి');
        expect(js).toContain('నీళ్ళు / జలం');
    });

    it('contains major regions and literary/cultural section', () => {
        expect(html).toContain('Coastal Andhra');
        expect(html).toContain('Telangana');
        expect(html).toContain('Rayalaseema');
        expect(html).toContain('Kavitrayam');
        expect(html).toContain('Sri Krishnadevaraya');
        expect(html).toContain('Tyagaraja');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('Telugu Academy');
        expect(html).toContain('Classical Telugu');
        expect(html).toContain('Source Attribution &amp; References');
    });

    it('includes responsive styles and custom teal/cyan theme styling', () => {
        expect(css).toContain('--telugu-teal');
        expect(css).toContain('.telugu-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Telugu Language Explorer — Landing Page Integration', () => {
    it('contains Telugu card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Telugu'");
        expect(landingHtml).toContain("script: 'నమస్కారం'");
        expect(landingHtml).toContain("exploreUrl: '../telugu-language-explorer/index.html'");
    });
});
