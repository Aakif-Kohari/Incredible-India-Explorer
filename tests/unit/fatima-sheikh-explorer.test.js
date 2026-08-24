import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readProfileFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/fatima-sheikh-explorer', file),
        'utf-8'
    );
}

function loadProfileData() {
    const code = readProfileFile('fatima-data.js');
    const fn = new Function(
        code + '\nreturn { FATIMA_DATA };'
    );
    return fn();
}

function readWomenData() {
    return readFileSync(
        resolve(__dirname, '../../frontend/forgotten-women-of-indian-history/women-data.js'),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Fatima Sheikh Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readProfileFile('index.html');
        js = readProfileFile('fatima.js');
        css = readProfileFile('fatima.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Fatima Sheikh');
        expect(html).toContain('Pioneer of modern Girls\' Education in India');
        expect(html).toContain('class="abj-hero"');
    });

    it('includes responsive tabs and quick facts elements', () => {
        expect(html).toContain('data-target="biography"');
        expect(html).toContain('data-target="thesis"');
        expect(html).toContain('data-target="quiz"');
        expect(html).toContain('class="abj-fact-card"');
    });

    it('documents schools and reform details', () => {
        expect(html).toContain('Bhide Wada');
        expect(html).toContain('Ganj Peth');
        expect(html).toContain('Usman Sheikh');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Pune Ganj Peth Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local fatima.js and CSS', () => {
        expect(html).toContain('href="fatima.css"');
        expect(html).toContain('src="fatima.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--bg-primary');
        expect(css).toContain('--border-color');
        expect(css).toContain('.abj-main');
        expect(css).toContain('.abj-hero');
    });

    it('contains interactive literary selectors, quiz, and navigation handlers in javascript', () => {
        expect(js).toContain('initTheme');
        expect(js).toContain('renderBiography');
        expect(js).toContain('initThesisSimulator');
        expect(js).toContain('initQuiz');
        expect(js).toContain('initNavigation');
    });
});

describe('Fatima Sheikh Profile — Dataset Verification', () => {
    let dataObj;

    beforeAll(() => {
        dataObj = loadProfileData();
    });

    it('verifies profile metadata fields', () => {
        expect(dataObj.FATIMA_DATA.quickFacts.fullName).toBe('Fatima Sheikh');
        expect(dataObj.FATIMA_DATA.quickFacts.primaryFields).toContain('Women\'s Education');
        expect(dataObj.FATIMA_DATA.quickFacts.keyPositions[0]).toContain('Pioneering Muslim Female Teacher');
    });

    it('contains chronological history timeline', () => {
        expect(dataObj.FATIMA_DATA.timelineEvents.length).toBeGreaterThanOrEqual(5);
        const schoolEst = dataObj.FATIMA_DATA.timelineEvents.find(t => t.year === '1848 (Jan)');
        expect(schoolEst).toBeDefined();
        expect(schoolEst.title).toContain('Refuge to Phules');
    });

    it('contains quiz questions with explanations', () => {
        expect(dataObj.FATIMA_DATA.quizQuestions.length).toBe(5);
        const firstQ = dataObj.FATIMA_DATA.quizQuestions.find(q => q.id === 1);
        expect(firstQ).toBeDefined();
        expect(firstQ.question).toContain('Ganj Peth');
    });
});

describe('Fatima Sheikh Profile — Digital Archive Integrations', () => {
    it('is registered in forgotten-women-of-indian-history/women-data.js list', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "fatima-sheikh"');
        expect(womenData).toContain('url: "../fatima-sheikh-explorer/"');
    });

    it('is registered in search-index.js', () => {
        const searchIdx = readSearchIndex();
        expect(searchIdx).toContain('frontend/fatima-sheikh-explorer/index.html');
    });
});
