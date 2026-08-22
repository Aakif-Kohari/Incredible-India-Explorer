import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/rajasthani-language-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Rajasthani Language Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;
    let data;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
        data = readExplorerFile('rajasthani-data.js');
    });

    it('renders hero and card sections with Rajasthani title and Devanagari script', () => {
        expect(html).toContain('Rajasthani');
        expect(html).toContain('राजस्थानी');
        expect(html).toContain('Language of the Thar');
        expect(html).toContain('Devanagari');
    });

    it('contains verified greeting and speech synthesis audio pronunciation triggers', () => {
        expect(html).toContain('खम्मा घणी');
        expect(html).toContain('Khamma Ghani');
        expect(html).toContain('data-speak="खम्मा घणी"');
    });

    it('contains vocabulary words and translation in data and script', () => {
        expect(data).toContain('पाणी');
        expect(data).toContain('pāṇī');
        expect(data).toContain('water');
        expect(data).toContain('रोटी');
        expect(data).toContain('घर');
        expect(data).toContain('छोरो / छोरी');
    });

    it('covers all major regional dialects of Rajasthan', () => {
        expect(data).toContain('Marwari');
        expect(data).toContain('Dhundhari');
        expect(data).toContain('Mewari');
        expect(data).toContain('Mewati');
        expect(data).toContain('Hadauti');
        expect(data).toContain('Shekhawati');
        expect(data).toContain('Malvi');
        expect(data).toContain('Bagri');
    });

    it('highlights Charani bardic literature, Phad tradition, and Vijaydan Detha', () => {
        expect(html).toContain('Charani');
        expect(html).toContain('Dingal');
        expect(html).toContain('Pingal');
        expect(html).toContain('Pabuji ki Phad');
        expect(html).toContain('Vijaydan Detha');
        expect(html).toContain('Bataan ri Phulwari');
    });

    it('contains sources and references', () => {
        expect(data).toContain('Encyclopaedia Britannica');
        expect(data).toContain('Linguistica Indica');
        expect(data).toContain('Wikipedia');
    });

    it('includes royal Rajasthani styling with arch, dotborder, and responsive rules', () => {
        expect(css).toContain('.raj-arch');
        expect(css).toContain('.raj-dotborder');
        expect(css).toContain('--raj-indigo');
        expect(css).toContain('--raj-gold');
        expect(css).toContain('--raj-crimson');
        expect(css).toContain('@media (max-width: 640px)');
    });
});

describe('Rajasthani Language Explorer — Landing Page Integration', () => {
    it('contains Rajasthani entry with exploreUrl on Languages landing page', () => {
        const landingHtml = readLandingPage();
        expect(landingHtml).toContain("name: 'Rajasthani'");
        expect(landingHtml).toContain("exploreUrl: '../rajasthani-language-explorer/index.html'");
    });
});
