import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readProfileFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/pandita-ramabai-explorer', file),
        'utf-8'
    );
}

function loadProfileData() {
    const code = readProfileFile('ramabai-data.js');
    const fn = new Function(
        code + '\nreturn { RAMABAI_DATA };'
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

describe('Pandita Ramabai Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readProfileFile('index.html');
        js = readProfileFile('ramabai.js');
        css = readProfileFile('ramabai.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Pandita Ramabai');
        expect(html).toContain('Pioneer of Women\'s Education &amp; Reform');
        expect(html).toContain('class="abj-hero"');
    });

    it('includes responsive tabs and quick facts elements', () => {
        expect(html).toContain('data-target="biography"');
        expect(html).toContain('data-target="thesis"');
        expect(html).toContain('data-target="quiz"');
        expect(html).toContain('class="abj-fact-card"');
    });

    it('documents schools and reform details', () => {
        expect(html).toContain('The High-Caste Hindu Woman');
        expect(html).toContain('Sharada Sadan');
        expect(html).toContain('Mukti Mission');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Kedgaon Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local ramabai.js and CSS', () => {
        expect(html).toContain('href="ramabai.css"');
        expect(html).toContain('src="ramabai.js"');
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

describe('Pandita Ramabai Profile — Dataset Verification', () => {
    let dataObj;

    beforeAll(() => {
        dataObj = loadProfileData();
    });

    it('verifies profile metadata fields', () => {
        expect(dataObj.RAMABAI_DATA.quickFacts.fullName).toBe('Pandita Ramabai Sarasvati');
        expect(dataObj.RAMABAI_DATA.quickFacts.primaryFields).toContain('Sanskrit Scholarship');
        expect(dataObj.RAMABAI_DATA.quickFacts.keyPositions[1]).toContain('Sharada Sadan');
    });

    it('contains chronological history timeline', () => {
        expect(dataObj.RAMABAI_DATA.timelineEvents.length).toBeGreaterThanOrEqual(5);
        const schoolEst = dataObj.RAMABAI_DATA.timelineEvents.find(t => t.year === '1889');
        expect(schoolEst).toBeDefined();
        expect(schoolEst.title).toContain('Founding Sharada Sadan');
    });

    it('contains quiz questions with explanations', () => {
        expect(dataObj.RAMABAI_DATA.quizQuestions.length).toBe(5);
        const firstQ = dataObj.RAMABAI_DATA.quizQuestions.find(q => q.id === 1);
        expect(firstQ).toBeDefined();
        expect(firstQ.question).toContain('Pandita\' and \'Sarasvati');
    });
});

describe('Pandita Ramabai Profile — Digital Archive Integrations', () => {
    it('is registered in forgotten-women-of-indian-history/women-data.js list', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "pandita-ramabai"');
        expect(womenData).toContain('url: "../pandita-ramabai-explorer/"');
    });

    it('is registered in search-index.js', () => {
        const searchIdx = readSearchIndex();
        expect(searchIdx).toContain('frontend/pandita-ramabai-explorer/index.html');
    });
});
