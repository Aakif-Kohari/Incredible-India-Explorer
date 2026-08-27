/**
 * ho-language-explorer.test.js
 * Unit tests for the Ho Language Explorer (Issue #2407).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/ho-language-explorer', file),
        'utf-8'
    );
}

function readLanguagesLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Ho Language Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title, meta description, and native Ho / Warang Citi script', () => {
        expect(html).toContain('Ho Language Explorer');
        expect(html).toContain('𑢹𑣉𑣉 𑣎𑣋𑣜');
        expect(html).toContain('हो जागर');
        expect(html).toContain('Hō Jagar');
    });

    it('contains all required explorer content sections', () => {
        const requiredSections = [
            'interactive-section',
            'map-section',
            'scripts-section',
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

describe('Ho Language Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines HO_DATA with Austroasiatic North Munda classification and ISO code hoc', () => {
        expect(dataContent).toContain('window.HO_DATA =');
        expect(dataContent).toContain('Austroasiatic');
        expect(dataContent).toContain('Munda');
        expect(dataContent).toContain('North Munda');
        expect(dataContent).toContain('ISO 639-3: hoc');
    });

    it('documents Warang Citi script and scholar Lako Bodra', () => {
        expect(dataContent).toContain('Warang Citi Script');
        expect(dataContent).toContain('𑢹𑣗𑣜𑣊 𑣏𑣂𑣕𑣂');
        expect(dataContent).toContain('Lako Bodra');
    });

    it('includes verified signature greeting Johar and Mar Johar', () => {
        expect(dataContent).toContain('Johar! / Juar!');
        expect(dataContent).toContain('𑢺𑣉𑣖𑣜');
        expect(dataContent).toContain('Mār Jōhār!');
        expect(dataContent).toContain('Chilkān menāma?');
    });

    it('contains 10+ core vocabulary items with 4-step details (native, translit, pronunciation, meaning)', () => {
        expect(dataContent).toContain('concept: "Water"');
        expect(dataContent).toContain('transliteration: "Da\' / Dah"');
        expect(dataContent).toContain('concept: "Cooked Rice / Meal"');
        expect(dataContent).toContain('transliteration: "Maṇḍī"');
        expect(dataContent).toContain('concept: "Sun / Daylight"');
        expect(dataContent).toContain('transliteration: "Singi"');
        expect(dataContent).toContain('concept: "House / Home"');
        expect(dataContent).toContain('concept: "Tree / Sal Timber"');
        expect(dataContent).toContain('concept: "Kettle Drum"');
        expect(dataContent).toContain('transliteration: "Dama');
    });

    it('covers key Kolhan, Mayurbhanj, and Keonjhar regions', () => {
        expect(dataContent).toContain('Kolhan Division & Singhbhum (Jharkhand)');
        expect(dataContent).toContain('Mayurbhanj & Simlipal Belt (Odisha)');
        expect(dataContent).toContain('Keonjhar Plateau (Odisha)');
    });

    it('includes cultural heritage topics with Warang Citi, Mage Porob, Baha Porob, and Manki-Munda governance', () => {
        expect(dataContent).toContain('Warang Citi Script & Lako Bodra Legacy');
        expect(dataContent).toContain('Mage Porob (Grand Harvest Festival)');
        expect(dataContent).toContain('Baha Porob (Sal Flower Spring Rites)');
        expect(dataContent).toContain('Manki-Munda Governance System');
    });

    it('includes academic sources and citations', () => {
        expect(dataContent).toContain('Lionel Burrows');
        expect(dataContent).toContain('John Deeney');
        expect(dataContent).toContain('D. N. Majumdar');
        expect(dataContent).toContain('UNESCO Atlas of the World\'s Languages in Danger');
    });
});

describe('Ho Language Explorer — Landing Page Integration', () => {
    it('is registered on the Languages of India landing page', () => {
        const landingHtml = readLanguagesLandingPage();
        expect(landingHtml).toContain("name: 'Ho'");
        expect(landingHtml).toContain("script: '𑢺𑣉𑣖𑣜'");
        expect(landingHtml).toContain("exploreUrl: '../ho-language-explorer/index.html'");
    });
});
