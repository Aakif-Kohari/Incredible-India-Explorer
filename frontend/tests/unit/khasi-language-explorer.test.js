import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/khasi-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Khasi Language Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('renders the Khasi hero section', () => {
        expect(html).toContain('class="khasi-hero"');
        expect(html).toContain('<h1>Ka Ktien Khasi <span>Khasi Explorer</span></h1>');
        expect(html).toContain('Austroasiatic Mon-Khmer Language');
    });

    it('contains Khasi content (greeting, script, region)', () => {
        expect(html).toContain('Roman (Latin) script');
        expect(html).toContain('Meghalaya');
        expect(html).toContain('Khublei');
        expect(html).toContain('Pronunciation: [khoob-lay]');
        expect(html).toContain('Thomas Jones');
    });

    it('contains vocabulary data', () => {
        expect(html).toContain('Kumno?');
        expect(html).toContain('How are you?');
        expect(html).toContain('Nga khiah');
        expect(html).toContain('Um');
        expect(html).toContain('Water');
    });

    it('contains sources and credits', () => {
        expect(html).toContain('Ethnologue');
        expect(html).toContain('Source Attribution');
    });
});

describe('Khasi Language Explorer — Landing Page Integration', () => {
    it('contains Khasi card on the Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Khasi'");
        expect(landingHtml).toContain("script: 'Khublei'");
        expect(landingHtml).toContain("exploreUrl: '../khasi-language-explorer/index.html'");
    });
});
