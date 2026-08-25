import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/mizo-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Mizo Language Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('renders the Mizo hero section', () => {
        expect(html).toContain('class="mizo-hero"');
        expect(html).toContain('<h1>Mizo <span>Explorer</span></h1>');
        expect(html).toContain('Tibeto-Burman Language');
    });

    it('contains Mizo content (greeting, script, region)', () => {
        expect(html).toContain('Roman-based orthography');
        expect(html).toContain('Mizoram');
        expect(html).toContain('Chibai');
        expect(html).toContain('Pronunciation: [chi-bai]');
    });

    it('contains vocabulary data', () => {
        expect(html).toContain('Ka lawm e');
        expect(html).toContain('Thank you');
        expect(html).toContain('Eng nge i an?');
        expect(html).toContain('Tui');
    });

    it('contains sources and credits', () => {
        expect(html).toContain('Ethnologue');
        expect(html).toContain('Source Attribution');
    });
});

describe('Mizo Language Explorer — Landing Page Integration', () => {
    it('contains Mizo card on the Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Mizo'");
        expect(landingHtml).toContain("script: 'Chibai'");
        expect(landingHtml).toContain("exploreUrl: '../mizo-language-explorer/index.html'");
    });
});
