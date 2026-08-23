/**
 * lepcha-language-explorer.test.js
 * Unit tests for the Lepcha Language Explorer (Issue #2403).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/lepcha-language-explorer', file),
        'utf-8'
    );
}

function readLanguagesLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Lepcha Language Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title, meta description, and native Lepcha script', () => {
        expect(html).toContain('Lepcha Language Explorer');
        expect(html).toContain('ᰛᰩᰵᰶ');
        expect(html).toContain('Róng-ríng');
        expect(html).toContain("Sikkim's Linguistic Heritage");
    });

    it('contains all required explorer content sections', () => {
        const requiredSections = [
            'overview-section',
            'scripts-section',
            'greetings-section',
            'vocabulary-section',
            'regions-section',
            'heritage-section',
            'quiz-section',
            'sources-section'
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

    it('loads the Noto Sans Lepcha font for script rendering', () => {
        expect(html).toContain('family=Noto+Sans+Lepcha');
    });

    it('links back to the Languages of India landing page', () => {
        expect(html).toContain('../languages/languages.html');
    });
});

describe('Lepcha Language Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines LEPCHA_DATA with language family and genealogical information', () => {
        expect(dataContent).toContain('window.LEPCHA_DATA =');
        expect(dataContent).toContain('Sino-Tibetan');
        expect(dataContent).toContain('Tibeto-Burman');
        expect(dataContent).toContain('Himalayish');
        expect(dataContent).toContain('Unique Indigenous Script');
    });

    it('documents the Lepcha script (ᰛᰩᰵᰶ / Róng)', () => {
        expect(dataContent).toContain('Lepcha Script');
        expect(dataContent).toContain('ᰛᰩᰵᰶ');
        expect(dataContent).toContain('Róng');
        expect(dataContent).toContain('abugida');
    });

    it('includes verified greeting Róng-ríng mut-át (ᰛᰩᰵᰶ ᰛᰧᰵᰶᰳᰵ)', () => {
        expect(dataContent).toContain('ᰛᰩᰵᰶ ᰛᰧᰵᰶᰳᰵ');
        expect(dataContent).toContain('Róng-ríng mut-át');
        expect(dataContent).toContain('RONG-ring moot-AHT');
    });

    it('contains 10 core vocabulary items with native, translit, pronunciation, meaning', () => {
        expect(dataContent).toContain('concept: "Water"');
        expect(dataContent).toContain('concept: "Mountain"');
        expect(dataContent).toContain('concept: "Sun"');
        expect(dataContent).toContain('concept: "Moon"');
        expect(dataContent).toContain('concept: "Tree / Forest"');
        expect(dataContent).toContain('concept: "Bird"');
        expect(dataContent).toContain('concept: "House / Home"');
        expect(dataContent).toContain('concept: "Mother"');
        expect(dataContent).toContain('concept: "Father"');
        expect(dataContent).toContain('concept: "Love / Affection"');
        expect(dataContent).toContain('transliteration:');
        expect(dataContent).toContain('pronunciation:');
        expect(dataContent).toContain('meaning:');
    });

    it('covers all four regional Lepcha-speaking regions', () => {
        expect(dataContent).toContain('Dzongu Reserve');
        expect(dataContent).toContain('Darjeeling Hills');
        expect(dataContent).toContain('Ilam District');
        expect(dataContent).toContain('Samtse');
    });

    it('includes cultural heritage topics with Khangchendzonga, Mun/Bongthing, and script revival', () => {
        expect(dataContent).toContain('Mount Khangchendzonga');
        expect(dataContent).toContain('Mun & Bongthing');
        expect(dataContent).toContain('Lepcha Script Revival');
        expect(dataContent).toContain('Oral Epics & Folklore');
    });

    it('includes academic and institutional sources', () => {
        expect(dataContent).toContain('UNESCO');
        expect(dataContent).toContain('Ethnologue');
        expect(dataContent).toContain('Plaisier');
        expect(dataContent).toContain('Unicode');
        expect(dataContent).toContain('Glottolog');
    });
});

describe('Lepcha Language Explorer — Landing Page Integration', () => {
    let landingHtml;

    beforeAll(() => {
        landingHtml = readLanguagesLandingPage();
    });

    it('is registered on the Languages of India landing page', () => {
        expect(landingHtml).toContain("name: 'Lepcha'");
        expect(landingHtml).toContain("script: 'ᰛᰩᰵᰶ'");
        expect(landingHtml).toContain("exploreUrl: '../lepcha-language-explorer/index.html'");
    });

    it('includes the Lepcha script glyph in the landing card', () => {
        expect(landingHtml).toContain('ᰛᰩᰵᰶ');
    });
});
