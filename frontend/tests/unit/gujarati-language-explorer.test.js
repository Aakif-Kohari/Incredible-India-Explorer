import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/gujarati-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Gujarati Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Gujarati title and Indo-Aryan classification', () => {
        expect(html).toContain('class="gujarati-hero"');
        expect(html).toContain('ગુજરાતી');
        expect(html).toContain('Gujarati Explorer');
        expect(html).toContain('Indo-Aryan Language Family');
        expect(html).toContain('Gujarati Script');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('નમસ્તે');
        expect(html).toContain('Namaste');
        expect(html).toContain('gujarati-greeting-audio-btn');
    });

    it('showcases Gujarati script characteristics and sample glyphs', () => {
        expect(html).toContain('Gujarati Script');
        expect(html).toContain('script-sample-grid');
        expect(html).toContain('અ');
        expect(html).toContain('ક');
    });

    it('contains 5-10 common vocabulary words in script.js', () => {
        expect(js).toContain('આભાર / ધન્યવાદ');
        expect(js).toContain('Aabhar / Dhanyavaad');
        expect(js).toContain('Thank you');
        expect(js).toContain('તમે કેમ છો?');
        expect(js).toContain('મજામાં');
        expect(js).toContain('પાણી / જળ');
    });

    it('contains major regions and literary/cultural section', () => {
        expect(html).toContain('Amdavadi');
        expect(html).toContain('Kathiawari');
        expect(html).toContain('Surati');
        expect(html).toContain('Narsinh Mehta');
        expect(html).toContain('Mahatma Gandhi');
        expect(html).toContain('Garba');
    });

    it('contains source attribution and references', () => {
        expect(html).toContain('Gujarat Sahitya Akademi');
        expect(html).toContain('Gujarati Sahitya Parishad');
        expect(html).toContain('Source Attribution &amp; References');
    });

    it('includes responsive styles and custom amber/gold theme styling', () => {
        expect(css).toContain('--gujarati-gold');
        expect(css).toContain('.gujarati-hero');
        expect(css).toContain('@media (max-width: 1024px)');
    });
});

describe('Gujarati Language Explorer — Landing Page Integration', () => {
    it('contains Gujarati card with explore button on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Gujarati'");
        expect(landingHtml).toContain("script: 'નમસ્તે'");
        expect(landingHtml).toContain("exploreUrl: '../gujarati-language-explorer/index.html'");
    });
});
