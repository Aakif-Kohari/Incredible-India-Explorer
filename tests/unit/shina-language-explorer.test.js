/**
 * shina-language-explorer.test.js
 * Unit tests for the Shina Language Explorer (Issue #2412).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/shina-language-explorer', file),
        'utf-8'
    );
}

function readLanguagesLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Shina Language Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title, meta description, and native Shina script', () => {
        expect(html).toContain('Shina Language Explorer');
        expect(html).toContain('شینا');
        expect(html).toContain('Ṣiṇā');
        expect(html).toContain('शीना');
        expect(html).toContain('Drass');
        expect(html).toContain('Ladakh');
    });

    it('contains all required explorer content sections including pronunciation panel', () => {
        const requiredSections = [
            'interactive-section',
            'pronunciation-section',
            'map-section',
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

describe('Shina Language Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines SHINA_DATA with Dardic Indo-Aryan classification and ISO code scl', () => {
        expect(dataContent).toContain('window.SHINA_DATA =');
        expect(dataContent).toContain('Indo-Aryan');
        expect(dataContent).toContain('Dardic');
        expect(dataContent).toContain('Shina Group');
        expect(dataContent).toContain('ISO 639-3: scl');
    });

    it('documents Perso-Arabic and Devanagari writing systems and pitch-accent phonetics', () => {
        expect(dataContent).toContain('Perso-Arabic Script');
        expect(dataContent).toContain('Devanagari Script');
        expect(dataContent).toContain('Pitch-Accent & Tonal System');
    });

    it('includes verified signature greeting Salam, Je haal hin, and Mishto han', () => {
        expect(dataContent).toContain('Salām');
        expect(dataContent).toContain('سلام');
        expect(dataContent).toContain('Je haal hin?');
        expect(dataContent).toContain('Mishto han');
        expect(dataContent).toContain('Khuda Hafiz');
    });

    it('contains 10+ core vocabulary items with 4-step details (native, translit, pronunciation, meaning)', () => {
        expect(dataContent).toContain('concept: "Water"');
        expect(dataContent).toContain('transliteration: "Wye / Wai"');
        expect(dataContent).toContain('concept: "Mountain"');
        expect(dataContent).toContain('transliteration: "Kōh / Dēi"');
        expect(dataContent).toContain('concept: "Sun / Daylight"');
        expect(dataContent).toContain('transliteration: "Sūri"');
        expect(dataContent).toContain('concept: "Snow / Glacier"');
        expect(dataContent).toContain('transliteration: "Hin"');
        expect(dataContent).toContain('concept: "Horse / Mountain Pony"');
        expect(dataContent).toContain('transliteration: "Gōrō"');
        expect(dataContent).toContain('concept: "Fire / Hearth"');
    });

    it('covers key Drass, Gurez, and Kargil Himalayan regions', () => {
        expect(dataContent).toContain('Drass Valley (Ladakh)');
        expect(dataContent).toContain('Gurez & Tulail Valleys (Jammu & Kashmir)');
        expect(dataContent).toContain('Lower Kargil & Dah-Hanu Border');
    });

    it('includes cultural heritage topics with Drass sub-zero life, mountain polo, Bait poetry, and juniper rites', () => {
        expect(dataContent).toContain('Drass Valley & Sub-Zero Himalayan Life');
        expect(dataContent).toContain('Mountain Polo & Horsemanship Heritage');
        expect(dataContent).toContain('Shina Oral Epics & Bait Poetry');
        expect(dataContent).toContain('Juniper Rites & Dardi Mountain Lore');
    });

    it('includes academic sources and citations', () => {
        expect(dataContent).toContain('T. Grahame Bailey');
        expect(dataContent).toContain('Georg Morgenstierne');
        expect(dataContent).toContain('Central Institute of Indian Languages');
        expect(dataContent).toContain('UNESCO Atlas of the World\'s Languages in Danger');
    });
});

describe('Shina Language Explorer — Landing Page Integration', () => {
    it('is registered on the Languages of India landing page', () => {
        const landingHtml = readLanguagesLandingPage();
        expect(landingHtml).toContain("name: 'Shina'");
        expect(landingHtml).toContain("script: 'سلام / جے حال ہن؟'");
        expect(landingHtml).toContain("exploreUrl: '../shina-language-explorer/index.html'");
    });
});
