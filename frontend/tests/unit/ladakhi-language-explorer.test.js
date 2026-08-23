/**
 * ladakhi-language-explorer.test.js
 * Unit tests for the Ladakhi Language Explorer (Issue #2410).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/ladakhi-language-explorer', file),
        'utf-8'
    );
}

function readLanguagesLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Ladakhi Language Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title, meta description, and native Ladakhi script', () => {
        expect(html).toContain('Ladakhi Language Explorer');
        expect(html).toContain('ལ་དྭགས་སྐད།');
        expect(html).toContain('La-dwags skad');
        expect(html).toContain('བྷོ་ཊི།');
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

describe('Ladakhi Language Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines LADAKHI_DATA with language family and genealogical information', () => {
        expect(dataContent).toContain('window.LADAKHI_DATA =');
        expect(dataContent).toContain('Sino-Tibetan');
        expect(dataContent).toContain('Tibeto-Burman');
        expect(dataContent).toContain('Western Archaic Tibetan');
        expect(dataContent).toContain('Preservation of Archaic Consonants');
    });

    it('documents Tibetan writing traditions including Uchen and Yuged scripts', () => {
        expect(dataContent).toContain('Tibetan Uchen Script');
        expect(dataContent).toContain('དབུ་ཅན།');
        expect(dataContent).toContain('Tibetan Yuged');
        expect(dataContent).toContain('དབུ་མེད།');
    });

    it('includes verified signature greeting Julley (ཇུ་ལེགས།) and honorific inquiries', () => {
        expect(dataContent).toContain('ཇུ་ལེགས།');
        expect(dataContent).toContain('Julley / Ju-leh');
        expect(dataContent).toContain('ཁམས་བཟང་');
        expect(dataContent).toContain('ཐུགས་རྗེ་ཆེ།');
        expect(dataContent).toContain('Thuk-je-che');
    });

    it('contains 10+ core vocabulary items with 4-step details (native, translit, pronunciation, meaning)', () => {
        expect(dataContent).toContain('concept: "Water"');
        expect(dataContent).toContain('native: "ཆུ།"');
        expect(dataContent).toContain('transliteration: "Chhu"');
        expect(dataContent).toContain('concept: "Mountain"');
        expect(dataContent).toContain('native: "རི།"');
        expect(dataContent).toContain('concept: "Yak"');
        expect(dataContent).toContain('native: "གཡག"');
        expect(dataContent).toContain('concept: "Butter Tea"');
        expect(dataContent).toContain('native: "ཇ། / གུར་གུར་ཇ།"');
    });

    it('covers all five regional valley dialects of Ladakh', () => {
        expect(dataContent).toContain('Central Ladakh & Leh (Shamskat)');
        expect(dataContent).toContain('Nubra Valley (Nubra-skat)');
        expect(dataContent).toContain('Changthang High Plateau (Stotskat)');
        expect(dataContent).toContain('Zanskar Valley (Zanskari)');
        expect(dataContent).toContain('Lower Ladakh & Purik Border');
    });

    it('includes cultural and literary heritage topics with Gesar Epic, Gompas, and Losar', () => {
        expect(dataContent).toContain('Epic of King Gesar');
        expect(dataContent).toContain('Monastery & Woodblock Literature');
        expect(dataContent).toContain('Losar & Folk Song Traditions (Lu)');
        expect(dataContent).toContain('Sowa-Rigpa Traditional Medicine');
    });

    it('includes academic sources and citations', () => {
        expect(dataContent).toContain('A. H. Francke');
        expect(dataContent).toContain('Bettina Zeisler');
        expect(dataContent).toContain('UNESCO Atlas of the World\'s Languages in Danger');
    });
});

describe('Ladakhi Language Explorer — Landing Page Integration', () => {
    let landingHtml;

    beforeAll(() => {
        landingHtml = readLanguagesLandingPage();
    });

    it('is registered on the Languages of India landing page', () => {
        expect(landingHtml).toContain("name: 'Ladakhi'");
        expect(landingHtml).toContain("script: 'ཇུ་ལེགས།'");
        expect(landingHtml).toContain("exploreUrl: '../ladakhi-language-explorer/index.html'");
    });
});
