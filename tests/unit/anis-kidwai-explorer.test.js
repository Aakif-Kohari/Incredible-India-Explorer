import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readProfileFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/anis-kidwai-explorer', file),
        'utf-8'
    );
}

function loadProfileData() {
    const code = readProfileFile('anis-kidwai-data.js');
    const fn = new Function(
        code + '\nreturn { ANIS_KIDWAI_DATA };'
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

describe('Anis Kidwai Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readProfileFile('index.html');
        js = readProfileFile('anis-kidwai.js');
        css = readProfileFile('anis-kidwai.css');
    });

    it('renders header, title and sub-titles correctly', () => {
        expect(html).toContain('Anis Kidwai');
        expect(html).toContain('Partition Memoirist &amp; Refugee Rehabilitation Leader');
        expect(html).toContain('class="abj-hero"');
    });

    it('includes responsive tabs and quick facts elements', () => {
        expect(html).toContain('data-target="biography"');
        expect(html).toContain('data-target="thesis"');
        expect(html).toContain('data-target="quiz"');
        expect(html).toContain('class="abj-fact-card"');
    });

    it('documents memoir and rehabilitation activities', () => {
        expect(html).toContain('Azadi Ki Chhaon Mein');
        expect(html).toContain('Purana Qila &amp; Kingsway Refugee Camps');
        expect(html).toContain('Rajya Sabha');
    });

    it('embeds Google Maps location view', () => {
        expect(html).toContain('title="Masauli Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('references local anis-kidwai.js and CSS', () => {
        expect(html).toContain('href="anis-kidwai.css"');
        expect(html).toContain('src="anis-kidwai.js"');
    });

    it('includes required CSS theme styling variables and selectors', () => {
        expect(css).toContain('--bg-primary');
        expect(css).toContain('--border-color');
        expect(css).toContain('.abj-main');
        expect(css).toContain('.abj-hero');
    });

    it('contains interactive memoir selectors, quiz, and navigation handlers in javascript', () => {
        expect(js).toContain('initTheme');
        expect(js).toContain('renderBiography');
        expect(js).toContain('initThesisSimulator');
        expect(js).toContain('initQuiz');
        expect(js).toContain('initNavigation');
    });
});

describe('Anis Kidwai Profile — Dataset Verification', () => {
    let dataObj;

    beforeAll(() => {
        dataObj = loadProfileData();
    });

    it('verifies profile metadata fields', () => {
        expect(dataObj.ANIS_KIDWAI_DATA.quickFacts.fullName).toBe('Anis Begum Kidwai');
        expect(dataObj.ANIS_KIDWAI_DATA.quickFacts.primaryFields).toContain('Literature & Memoir');
        expect(dataObj.ANIS_KIDWAI_DATA.quickFacts.keyPositions[2]).toContain('Rajya Sabha');
    });

    it('contains chronological history timeline', () => {
        expect(dataObj.ANIS_KIDWAI_DATA.timelineEvents.length).toBeGreaterThanOrEqual(5);
        const tragicLoss = dataObj.ANIS_KIDWAI_DATA.timelineEvents.find(t => t.year === '1947 (Oct)');
        expect(tragicLoss).toBeDefined();
        expect(tragicLoss.title).toContain('Tragic Loss of Husband');
    });

    it('contains quiz questions with explanations', () => {
        expect(dataObj.ANIS_KIDWAI_DATA.quizQuestions.length).toBe(5);
        const firstQ = dataObj.ANIS_KIDWAI_DATA.quizQuestions.find(q => q.id === 1);
        expect(firstQ).toBeDefined();
        expect(firstQ.question).toContain('Azadi Ki Chhaon Mein');
    });
});

describe('Anis Kidwai Profile — Digital Archive Integrations', () => {
    it('is registered in forgotten-women-of-indian-history/women-data.js list', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "anis-kidwai"');
        expect(womenData).toContain('url: "../anis-kidwai-explorer/"');
    });

    it('is registered in search-index.js', () => {
        const searchIdx = readSearchIndex();
        expect(searchIdx).toContain('frontend/anis-kidwai-explorer/index.html');
    });
});
