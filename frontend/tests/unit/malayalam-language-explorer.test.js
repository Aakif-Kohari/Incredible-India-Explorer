import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/malayalam-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Malayalam Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Malayalam title and Dravidian metadata', () => {
        expect(html).toContain('class="malayalam-hero"');
        expect(html).toContain('മലയാളം');
        expect(html).toContain('Malayalam Explorer');
        expect(html).toContain('Dravidian Family');
        expect(html).toContain('Classical Language of India');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('നമസ്കാരം');
        expect(html).toContain('Namaskaram');
        expect(html).toContain('malayalam-greeting-audio-btn');
    });

    it('showcases Malayalam script information and features', () => {
        expect(html).toContain('Malayalam Script');
        expect(html).toContain('Chillaksharam');
        expect(html).toContain('script-sample-grid');
    });

    it('contains vocabulary words in script.js', () => {
        expect(js).toContain('നന്ദി');
        expect(js).toContain('Nandi');
        expect(js).toContain('Thank you');
        expect(js).toContain('സുഖമാണോ?');
        expect(js).toContain('വെള്ളം');
        expect(js).toContain('ഭക്ഷണം');
    });

    it('contains regions and literary/cultural section', () => {
        expect(html).toContain('Malabar');
        expect(html).toContain('Travancore');
        expect(html).toContain('Thunchaththu Ezhuthachan');
        expect(html).toContain('Manipravalam');
        expect(html).toContain('Kathakali');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('Central Institute of Indian Languages');
        expect(html).toContain('Source Attribution');
    });

    it('includes responsive styles and emerald theme styling', () => {
        expect(css).toContain('--malayalam-emerald');
        expect(css).toContain('.malayalam-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Malayalam Language Explorer — Landing Page Integration', () => {
    it('contains Malayalam card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Malayalam'");
        expect(landingHtml).toContain("script: 'നമസ്കാരം'");
        expect(landingHtml).toContain("exploreUrl: '../malayalam-language-explorer/index.html'");
    });
});
