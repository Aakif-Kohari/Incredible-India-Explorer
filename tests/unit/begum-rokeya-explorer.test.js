import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readProfileFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/begum-rokeya-explorer', file),
        'utf-8'
    );
}

function loadProfileData() {
    const code = readProfileFile('rokeya-data.js');
    const fn = new Function(
        code + '\nreturn { BEGUM_ROKEYA_DATA };'
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

describe('Begum Rokeya Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readProfileFile('index.html');
        js = readProfileFile('rokeya.js');
        css = readProfileFile('rokeya.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Begum Rokeya');
        expect(html).toContain('Pioneer of Women\'s Education in Bengal');
        expect(html).toContain('class="abj-hero"');
    });

    it('includes responsive tabs and quick facts elements', () => {
        expect(html).toContain('data-target="biography"');
        expect(html).toContain('data-target="thesis"');
        expect(html).toContain('data-target="quiz"');
        expect(html).toContain('class="abj-fact-card"');
    });

    it('documents memoir and school details', () => {
        expect(html).toContain('Sultana\'s Dream');
        expect(html).toContain('Sakhawat Memorial Girls\' School');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Pairaband Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local rokeya.js and CSS', () => {
        expect(html).toContain('href="rokeya.css"');
        expect(html).toContain('src="rokeya.js"');
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

describe('Begum Rokeya Profile — Dataset Verification', () => {
    let dataObj;

    beforeAll(() => {
        dataObj = loadProfileData();
    });

    it('verifies profile metadata fields', () => {
        expect(dataObj.BEGUM_ROKEYA_DATA.quickFacts.fullName).toBe('Begum Rokeya Sakhawat Hossain');
        expect(dataObj.BEGUM_ROKEYA_DATA.quickFacts.primaryFields).toContain('Women\'s Education');
        expect(dataObj.BEGUM_ROKEYA_DATA.quickFacts.keyPositions[0]).toContain('Sakhawat Memorial Girls\' School');
    });

    it('contains chronological history timeline', () => {
        expect(dataObj.BEGUM_ROKEYA_DATA.timelineEvents.length).toBeGreaterThanOrEqual(5);
        const dreamPub = dataObj.BEGUM_ROKEYA_DATA.timelineEvents.find(t => t.year === '1905');
        expect(dreamPub).toBeDefined();
        expect(dreamPub.title).toContain('Publication of Sultana\'s Dream');
    });

    it('contains quiz questions with explanations', () => {
        expect(dataObj.BEGUM_ROKEYA_DATA.quizQuestions.length).toBe(5);
        const firstQ = dataObj.BEGUM_ROKEYA_DATA.quizQuestions.find(q => q.id === 1);
        expect(firstQ).toBeDefined();
        expect(firstQ.question).toContain('Sakhawat Memorial Girls\' School');
    });
});

describe('Begum Rokeya Profile — Digital Archive Integrations', () => {
    it('is registered in forgotten-women-of-indian-history/women-data.js list', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "begum-rokeya"');
        expect(womenData).toContain('url: "../begum-rokeya-explorer/"');
    });

    it('is registered in search-index.js', () => {
        const searchIdx = readSearchIndex();
        expect(searchIdx).toContain('frontend/begum-rokeya-explorer/index.html');
    });
});
