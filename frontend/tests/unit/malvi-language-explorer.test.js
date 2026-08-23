/**
 * malvi-language-explorer.test.js
 * Unit tests for the Malvi Language Explorer (Issue #2413).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/malvi-language-explorer', file),
        'utf-8'
    );
}

function readLanguagesLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Malvi Language Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title, meta description, and native Malvi script', () => {
        expect(html).toContain('Malvi Language Explorer');
        expect(html).toContain('मालवी');
        expect(html).toContain('𑂧𑂰𑂪𑂫𑂲');
        expect(html).toContain('Mālvī');
        expect(html).toContain('Malwa');
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

describe('Malvi Language Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines MALVI_DATA with Western Indo-Aryan classification and ISO code mup', () => {
        expect(dataContent).toContain('window.MALVI_DATA =');
        expect(dataContent).toContain('Indo-Aryan');
        expect(dataContent).toContain('Western Indo-Aryan');
        expect(dataContent).toContain('Rajasthani-Malvi Subgroup');
        expect(dataContent).toContain('ISO 639-3: mup');
    });

    it('documents Devanagari script, historical Mahajani records, and auxiliary chhe/chha copula', () => {
        expect(dataContent).toContain('Devanagari Script');
        expect(dataContent).toContain('Mahajani');
        expect(dataContent).toContain('छे / छा');
    });

    it('includes verified signature greeting Ram Ram Sa and Kayi haal hai', () => {
        expect(dataContent).toContain('राम राम सा!');
        expect(dataContent).toContain('Ram Ram Sa!');
        expect(dataContent).toContain('काईं हाल चाल है');
        expect(dataContent).toContain('सब बढ़िया छे');
        expect(dataContent).toContain('आओ पधारो सा!');
    });

    it('contains 10+ core vocabulary items with 4-step details (native, translit, pronunciation, meaning)', () => {
        expect(dataContent).toContain('concept: "Water"');
        expect(dataContent).toContain('transliteration: "Pāṇī"');
        expect(dataContent).toContain('concept: "Daal Bafla (Staple Feast)"');
        expect(dataContent).toContain('transliteration: "Dāl-Bāflā"');
        expect(dataContent).toContain('concept: "Sun / Day"');
        expect(dataContent).toContain('transliteration: "Sūraj / Dahāṛō"');
        expect(dataContent).toContain('concept: "Fertile Mother Earth"');
        expect(dataContent).toContain('concept: "Dholak & Chang Drums"');
        expect(dataContent).toContain('transliteration: "Ḍhōlak / Chaṅg"');
        expect(dataContent).toContain('concept: "Brother / Dear Friend"');
        expect(dataContent).toContain('transliteration: "Bhāyā / Bhāījī"');
    });

    it('covers key Malwa Heartland, North Malwa, and Rajasthan border regions', () => {
        expect(dataContent).toContain('Malwa Heartland (Ujjain, Indore, Dewas & Dhar)');
        expect(dataContent).toContain('North Malwa (Ratlam, Mandsaur & Neemuch)');
        expect(dataContent).toContain('Southeastern Rajasthan Border (Jhalawar & Pratapgarh)');
    });

    it('includes cultural heritage topics with Maach theatre, Sanjha art, Kabir bhajans, and Daal-Bafla feasts', () => {
        expect(dataContent).toContain('Maach Folk Theatre (माच)');
        expect(dataContent).toContain('Sanjha Folk Wall Art (सांझा)');
        expect(dataContent).toContain('Kabir Vani & Nirgun Bhajan Heritage');
        expect(dataContent).toContain('Daal-Bafla & Malwa Culinary Warmth');
    });

    it('includes academic sources and citations', () => {
        expect(dataContent).toContain('Sir George A. Grierson');
        expect(dataContent).toContain('Dr. Chintamani Upadhyay');
        expect(dataContent).toContain('Madhya Pradesh Adivasi Lok Kala Parishad');
        expect(dataContent).toContain('UNESCO Atlas of the World\'s Languages in Danger');
    });
});

describe('Malvi Language Explorer — Landing Page Integration', () => {
    it('is registered on the Languages of India landing page', () => {
        const landingHtml = readLanguagesLandingPage();
        expect(landingHtml).toContain("name: 'Malvi'");
        expect(landingHtml).toContain("script: 'राम राम सा!'");
        expect(landingHtml).toContain("exploreUrl: '../malvi-language-explorer/index.html'");
    });
});
