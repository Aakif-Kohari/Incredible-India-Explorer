import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/maithili-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Maithili Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section with Maithili title and Indo-Aryan classification', () => {
        expect(html).toContain('class="maithili-hero"');
        expect(html).toContain('मैथिली');
        expect(html).toContain('Maithili Explorer');
        expect(html).toContain('Indo-Aryan Family');
        expect(html).toContain('Mithila / Bihar Region');
    });

    it('contains verified greeting and audio pronunciation button', () => {
        expect(html).toContain('प्रणाम / गोड़ लागै छी');
        expect(html).toContain('Pranaam / Gor Lagai Chhi');
        expect(html).toContain('maithili-greeting-audio-btn');
    });

    it('showcases Tirhuta and Devanagari script traditions and history', () => {
        expect(html).toContain('Tirhuta');
        expect(html).toContain('Devanagari');
        expect(html).toContain('Mithilakshar');
        expect(html).toContain('script-sample-grid');
    });

    it('contains vocabulary words with transliterations and meanings in script.js', () => {
        expect(js).toContain('धन्यवाद / नीक लागल');
        expect(js).toContain('Dhanyavaad / Neek Lagal');
        expect(js).toContain('Thank you / Felt good');
        expect(js).toContain('अहाँ केहन छी?');
        expect(js).toContain('पानि / जल');
        expect(js).toContain('भोजन / भात');
    });

    it('includes literary and cultural section covering Vidyapati and Madhubani art', () => {
        expect(html).toContain('Mahakavi Vidyapati');
        expect(html).toContain('Madhubani (Mithila) Art');
        expect(html).toContain('Varna Ratnakara');
        expect(html).toContain('Panji Prabandha');
    });

    it('includes sources and references', () => {
        expect(html).toContain('id="sources"');
        expect(html).toContain('Census of India');
        expect(html).toContain('Sahitya Akademi');
    });

    it('connects Maithili card on languages landing page with exploreUrl', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Maithili'");
        expect(landingHtml).toContain("exploreUrl: '../maithili-language-explorer/index.html'");
    });
});
