import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readProfileFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/savitribai-phule-explorer', file),
        'utf-8'
    );
}

function loadProfileData() {
    const code = readProfileFile('savitribai-data.js');
    const fn = new Function(
        code + '\nreturn { SAVITRIBAI_DATA };'
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

describe('Savitribai Phule Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readProfileFile('index.html');
        js = readProfileFile('savitribai.js');
        css = readProfileFile('savitribai.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Savitribai Phule');
        expect(html).toContain('Pioneer of Women\'s Education in India');
        expect(html).toContain('class="abj-hero"');
    });

    it('includes responsive tabs and quick facts elements', () => {
        expect(html).toContain('data-target="biography"');
        expect(html).toContain('data-target="thesis"');
        expect(html).toContain('data-target="quiz"');
        expect(html).toContain('class="abj-fact-card"');
    });

    it('documents schools and reform details', () => {
        expect(html).toContain('Kavya Phule');
        expect(html).toContain('Bhide Wada School');
        expect(html).toContain('Balhatya Pratibandhak Griha');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Pune Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local savitribai.js and CSS', () => {
        expect(html).toContain('href="savitribai.css"');
        expect(html).toContain('src="savitribai.js"');
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

describe('Savitribai Phule Profile — Dataset Verification', () => {
    let dataObj;

    beforeAll(() => {
        dataObj = loadProfileData();
    });

    it('verifies profile metadata fields', () => {
        expect(dataObj.SAVITRIBAI_DATA.quickFacts.fullName).toBe('Savitribai Jyotirao Phule');
        expect(dataObj.SAVITRIBAI_DATA.quickFacts.primaryFields).toContain('Women\'s Education');
        expect(dataObj.SAVITRIBAI_DATA.quickFacts.keyPositions[1]).toContain('Bhide Wada Girls\' School');
    });

    it('contains chronological history timeline', () => {
        expect(dataObj.SAVITRIBAI_DATA.timelineEvents.length).toBeGreaterThanOrEqual(5);
        const schoolEst = dataObj.SAVITRIBAI_DATA.timelineEvents.find(t => t.year === '1848');
        expect(schoolEst).toBeDefined();
        expect(schoolEst.title).toContain('India\'s First Female Teacher');
    });

    it('contains quiz questions with explanations', () => {
        expect(dataObj.SAVITRIBAI_DATA.quizQuestions.length).toBe(5);
        const firstQ = dataObj.SAVITRIBAI_DATA.quizQuestions.find(q => q.id === 1);
        expect(firstQ).toBeDefined();
        expect(firstQ.question).toContain('Bhide Wada School');
    });
});

describe('Savitribai Phule Profile — Digital Archive Integrations', () => {
    it('is registered in forgotten-women-of-indian-history/women-data.js list', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "savitribai-phule"');
        expect(womenData).toContain('url: "../savitribai-phule-explorer/"');
    });

    it('is registered in search-index.js', () => {
        const searchIdx = readSearchIndex();
        expect(searchIdx).toContain('frontend/savitribai-phule-explorer/index.html');
    });
});
