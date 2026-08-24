/**
 * kurukh-language-explorer.test.js
 * Unit tests for the Kurukh Language Explorer (Issue #2408).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kurukh-language-explorer', file),
        'utf-8'
    );
}

function readLanguagesLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/languages/languages.html'),
        'utf-8'
    );
}

describe('Kurukh Language Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title, meta description, and native Kurukh / Tolong Siki script', () => {
        expect(html).toContain('Kurukh Language Explorer');
        expect(html).toContain('कुड़ुख़');
        expect(html).toContain('𑒏𑒳𑒛𑒳𑒐');
        expect(html).toContain('Kuṛux');
        expect(html).toContain('Oraon');
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

describe('Kurukh Language Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines KURUKH_DATA with North Dravidian classification and ISO code kru', () => {
        expect(dataContent).toContain('window.KURUKH_DATA =');
        expect(dataContent).toContain('Dravidian');
        expect(dataContent).toContain('North Dravidian');
        expect(dataContent).toContain('Kurukh–Malto');
        expect(dataContent).toContain('ISO 639-3: kru');
    });

    it('documents Tolong Siki and Devanagari script writing traditions', () => {
        expect(dataContent).toContain('Tolong Siki Script');
        expect(dataContent).toContain('𑒏𑒳𑒛𑒳𑒐');
        expect(dataContent).toContain('Devanagari Script');
        expect(dataContent).toContain('कुड़ुख़');
        expect(dataContent).toContain('Dr. Narayan Oraon');
    });

    it('includes verified signature greeting Jai Dharme and Johar', () => {
        expect(dataContent).toContain('जय धरमे!');
        expect(dataContent).toContain('Jai Dharme!');
        expect(dataContent).toContain('जोहार!');
        expect(dataContent).toContain('Johar!');
        expect(dataContent).toContain('एका से र\'अदा?');
        expect(dataContent).toContain('गोड़ लागना');
    });

    it('contains 10+ core vocabulary items with 4-step details (native, translit, pronunciation, meaning)', () => {
        expect(dataContent).toContain('concept: "Water"');
        expect(dataContent).toContain('transliteration: "Amm"');
        expect(dataContent).toContain('concept: "Cooked Rice / Meal"');
        expect(dataContent).toContain('transliteration: "Maṇḍī"');
        expect(dataContent).toContain('concept: "Sun / Daylight"');
        expect(dataContent).toContain('concept: "House / Homestead"');
        expect(dataContent).toContain('concept: "Tree / Sal Tree"');
        expect(dataContent).toContain('concept: "Mandar Drum"');
        expect(dataContent).toContain('transliteration: "Māndar');
    });

    it('covers key Chota Nagpur and eastern diaspora regions', () => {
        expect(dataContent).toContain('Chota Nagpur Heartland (Jharkhand)');
        expect(dataContent).toContain('Jashpur & Northern Hills (Chhattisgarh)');
        expect(dataContent).toContain('Sundargarh & Western Belt (Odisha)');
        expect(dataContent).toContain('Dooars, Bengal & Assam Diaspora');
    });

    it('includes cultural heritage topics with Sarhul, Karam, Dhumkuria, and Mandar rhythms', () => {
        expect(dataContent).toContain('Sarhul Festival (Kaddi / Sal Blossom)');
        expect(dataContent).toContain('Karam Festival & Akhra Dances');
        expect(dataContent).toContain('Dhumkuria (Traditional Youth Academy)');
        expect(dataContent).toContain('Mandar Rhythms & Parha Panchayat');
    });

    it('includes academic sources and citations', () => {
        expect(dataContent).toContain('Ferdinand Hahn');
        expect(dataContent).toContain('Sarat Chandra Roy');
        expect(dataContent).toContain('Dr. Narayan Oraon');
        expect(dataContent).toContain('UNESCO Atlas of the World\'s Languages in Danger');
    });
});

describe('Kurukh Language Explorer — Landing Page Integration', () => {
    it('is registered on the Languages of India landing page', () => {
        const landingHtml = readLanguagesLandingPage();
        expect(landingHtml).toContain("name: 'Kurukh'");
        expect(landingHtml).toContain("script: 'जय धरमे!'");
        expect(landingHtml).toContain("exploreUrl: '../kurukh-language-explorer/index.html'");
    });
});
