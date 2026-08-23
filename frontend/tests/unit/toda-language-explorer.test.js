/**
 * toda-language-explorer.test.js
 * Unit tests for the Toda Language Explorer (Issue #2404).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/toda-language-explorer', file),
        'utf-8'
    );
}

function readLanguagesLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

function readPagesCommonJs() {
    return readFileSync(
        resolve(__dirname, '../../frontend/pages-common.js'),
        'utf-8'
    );
}

describe('Toda Language Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title, meta description, and native Toda / Tamil script', () => {
        expect(html).toContain('Toda Language Explorer');
        expect(html).toContain('த்தோடா மொழி');
        expect(html).toContain('Tōda moḻi');
        expect(html).toContain('Ōl');
    });

    it('contains all required explorer content sections', () => {
        const requiredSections = [
            'interactive-section',
            'map-section',
            'phonology-section',
            'greetings-section',
            'vocabulary-section',
            'heritage-section',
            'quiz-section'
        ];
        requiredSections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('links to external stylesheets and javascript modules', () => {
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="data.js"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Toda Language Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines TODA_DATA with Dravidian language family classification and ISO code', () => {
        expect(dataContent).toContain('window.TODA_DATA =');
        expect(dataContent).toContain('Dravidian');
        expect(dataContent).toContain('South Dravidian');
        expect(dataContent).toContain('Toda–Kota Subgroup');
        expect(dataContent).toContain('ISO 639-3: tcx');
    });

    it('documents Toda phonological complexity with 16 vowels and 7 fricative places', () => {
        expect(dataContent).toContain('16 Vowel Qualities');
        expect(dataContent).toContain('Rich Fricatives & Sibilants');
        expect(dataContent).toContain('Multiple Trilled Consonants');
    });

    it('includes verified signature greeting Isk vaa (இஸ்க் வா!) and well-being inquiries', () => {
        expect(dataContent).toContain('இஸ்க் வா!');
        expect(dataContent).toContain('Isk vaa! / Aan vaa!');
        expect(dataContent).toContain('நலந்தானா?');
        expect(dataContent).toContain('Nalandāna?');
        expect(dataContent).toContain('போய்த் வா!');
    });

    it('contains 10+ core vocabulary items with 4-step details (native, translit, pronunciation, meaning)', () => {
        expect(dataContent).toContain('concept: "Water Buffalo"');
        expect(dataContent).toContain('transliteration: "Ēr / Pas"');
        expect(dataContent).toContain('concept: "Dairy Temple"');
        expect(dataContent).toContain('transliteration: "Tī / Pōl-ti"');
        expect(dataContent).toContain('concept: "Water"');
        expect(dataContent).toContain('concept: "Forest"');
        expect(dataContent).toContain('concept: "Toda Person / Hut"');
        expect(dataContent).toContain('concept: "Embroidered Shawl"');
        expect(dataContent).toContain('transliteration: "Puthukuli"');
    });

    it('covers key Nilgiri highland regions and Toda Munds', () => {
        expect(dataContent).toContain('Udhagamandalam (Ooty Highlands)');
        expect(dataContent).toContain('Pykara & Western Nilgiris');
        expect(dataContent).toContain('Kundah & Upper Bhavani');
    });

    it('includes cultural and pastoral heritage topics with sacred dairy, barrel huts, and embroidery', () => {
        expect(dataContent).toContain('Sacred Buffalo Herding & Dairy Temples');
        expect(dataContent).toContain('Barrel-Vaulted Dog-Arch Huts (Munds)');
        expect(dataContent).toContain('GI-Tagged Puthukuli Embroidery');
        expect(dataContent).toContain('Oral Poetic Tradition & Chants');
    });

    it('includes academic sources and citations', () => {
        expect(dataContent).toContain('Murray B. Emeneau');
        expect(dataContent).toContain('W. H. R. Rivers');
        expect(dataContent).toContain('Bhadriraju Krishnamurti');
        expect(dataContent).toContain('UNESCO Atlas of the World\'s Languages in Danger');
    });
});

describe('Toda Language Explorer — Landing Page & Tribes Integration', () => {
    it('is registered on the Languages of India landing page', () => {
        const landingHtml = readLanguagesLandingPage();
        expect(landingHtml).toContain("name: 'Toda'");
        expect(landingHtml).toContain("script: 'இஸ்க் வா!'");
        expect(landingHtml).toContain("exploreUrl: '../toda-language-explorer/index.html'");
    });

    it('is connected on the Tribes detail page in pages-common.js', () => {
        const pagesCommonJs = readPagesCommonJs();
        expect(pagesCommonJs).toContain("id: 'toda'");
        expect(pagesCommonJs).toContain("explorerLink: '../toda-language-explorer/index.html'");
    });
});
