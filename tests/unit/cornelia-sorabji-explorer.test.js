import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readCorneliaFile(file) {
    return readFileSync(resolve(__dirname, '../../frontend/cornelia-sorabji-explorer', file), 'utf-8');
}

function loadCorneliaData() {
    const code = readCorneliaFile('cornelia-sorabji-data.js');
    const fn = new Function(code + '\nreturn CORNELIA_DATA;');
    return fn();
}

describe('Cornelia Sorabji Explorer — Page Structure & Accessibility', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readCorneliaFile('index.html');
        js = readCorneliaFile('cornelia-sorabji.js');
        css = readCorneliaFile('cornelia-sorabji.css');
    });

    it('contains title and required main section headings', () => {
        expect(html).toContain('Cornelia Sorabji');
        expect(html).toContain('Academic Journey & Legal Legacy');
        expect(html).toContain('Historic Case Studies & Purdahnashin Defense');
        expect(html).toContain('Legal Rights & Statutory Reforms');
        expect(html).toContain('Chronological Timeline (1866–1954)');
        expect(html).toContain('Test Your Legal History Knowledge');
        expect(html).toContain('Archival Sources & Further Reading');
    });

    it('references local CSS, data, and JavaScript files', () => {
        expect(html).toContain('href="cornelia-sorabji.css"');
        expect(html).toContain('src="cornelia-sorabji-data.js"');
        expect(html).toContain('src="cornelia-sorabji.js"');
    });

    it('contains accessibility landmarks and skip link', () => {
        expect(html).toContain('class="skip-link"');
        expect(html).toContain('href="#main-content"');
        expect(html).toContain('id="main-content"');
    });

    it('defines responsive styles, focus states, and reduced motion in CSS', () => {
        expect(css).toContain('@media (max-width: 900px)');
        expect(css).toContain(':focus-visible');
        expect(css).toContain('prefers-reduced-motion');
    });

    it('implements interaction logic in JS', () => {
        expect(js).toContain('renderBiography');
        expect(js).toContain('initCaseSimulator');
        expect(js).toContain('renderLegalRights');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('initQuiz');
        expect(js).toContain('toggleTheme');
    });
});

describe('Cornelia Sorabji Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadCorneliaData();
    });

    it('has accurate historical quick facts', () => {
        expect(data.quickFacts.fullName).toBe('Cornelia Sorabji');
        expect(data.quickFacts.birthplace).toContain('Nashik');
        expect(data.quickFacts.education.some(e => e.includes('Somerville College, Oxford'))).toBe(true);
    });

    it('documents biography sections with required legal milestones', () => {
        expect(data.biographySections.length).toBeGreaterThanOrEqual(5);
        const titles = data.biographySections.map(b => b.title);
        expect(titles.some(t => t.includes('Oxford BCL'))).toBe(true);
        expect(titles.some(t => t.includes('Purdahnashin'))).toBe(true);
        expect(titles.some(t => t.includes('Court of Wards'))).toBe(true);
    });

    it('contains legal case study entries', () => {
        expect(data.legalCaseStudies.length).toBeGreaterThanOrEqual(4);
        const caseTitles = data.legalCaseStudies.map(c => c.caseTitle);
        expect(caseTitles.some(t => t.includes('Dowager Rani'))).toBe(true);
        expect(caseTitles.some(t => t.includes('Allahabad'))).toBe(true);
    });

    it('catalogues legal rights and statutory acts', () => {
        expect(data.legalRightsCatalog.length).toBeGreaterThanOrEqual(5);
        const topics = data.legalRightsCatalog.map(r => r.topic);
        expect(topics.some(t => t.includes('Sex Disqualification'))).toBe(true);
        expect(topics.some(t => t.includes('Purdahnashin'))).toBe(true);
    });

    it('includes historical timeline events covering 1866 to 1954', () => {
        expect(data.timelineEvents.length).toBeGreaterThanOrEqual(10);
        expect(data.timelineEvents[0].year).toBe('1866');
        expect(data.timelineEvents[data.timelineEvents.length - 1].year).toBe('1954');
        expect(data.timelineEvents.some(e => e.year === '1923')).toBe(true);
    });

    it('includes valid quiz questions with correct answers', () => {
        expect(data.quizQuestions.length).toBeGreaterThanOrEqual(5);
        for (const q of data.quizQuestions) {
            expect(q.question).toBeTruthy();
            expect(q.options.length).toBe(4);
            expect(q.correctIndex).toBeGreaterThanOrEqual(0);
            expect(q.correctIndex).toBeLessThan(4);
            expect(q.explanation).toBeTruthy();
        }
    });

    it('contains archival sources and references', () => {
        expect(data.sources.length).toBeGreaterThanOrEqual(3);
        for (const src of data.sources) {
            expect(src.title).toBeTruthy();
            expect(src.url).toContain('http');
        }
    });
});
