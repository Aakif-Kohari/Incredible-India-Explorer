import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readAnandibaiFile(file) {
    return readFileSync(resolve(__dirname, '../../frontend/anandibai-joshi-explorer', file), 'utf-8');
}

function loadAnandibaiData() {
    const code = readAnandibaiFile('anandibai-joshi-data.js');
    const fn = new Function(code + '\nreturn ANANDIBAI_DATA;');
    return fn();
}

describe('Dr. Anandibai Joshi Explorer — Page Structure & Accessibility', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readAnandibaiFile('index.html');
        js = readAnandibaiFile('anandibai-joshi.js');
        css = readAnandibaiFile('anandibai-joshi.css');
    });

    it('contains title and required main section headings', () => {
        expect(html).toContain('Dr. Anandibai Joshi');
        expect(html).toContain('Life Story & Medical Trailblazing');
        expect(html).toContain('M.D. Thesis & Obstetrics Research (1886)');
        expect(html).toContain('19th-Century Medical Milestones');
        expect(html).toContain('Chronological Timeline (1865–1887)');
        expect(html).toContain('Test Your Medical History Knowledge');
        expect(html).toContain('Archival Sources & Historical Literature');
    });

    it('references local CSS, data, and JavaScript files', () => {
        expect(html).toContain('href="anandibai-joshi.css"');
        expect(html).toContain('src="anandibai-joshi-data.js"');
        expect(html).toContain('src="anandibai-joshi.js"');
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
        expect(js).toContain('initThesisSimulator');
        expect(js).toContain('renderMedicalMilestones');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('initQuiz');
        expect(js).toContain('toggleTheme');
    });
});

describe('Dr. Anandibai Joshi Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadAnandibaiData();
    });

    it('has accurate historical quick facts', () => {
        expect(data.quickFacts.fullName).toBe('Dr. Anandibai Gopalrao Joshi');
        expect(data.quickFacts.birthplace).toContain('Kalyan');
        expect(data.quickFacts.education.some(e => e.includes('Woman\'s Medical College of Pennsylvania'))).toBe(true);
    });

    it('documents biography sections with required medical milestones', () => {
        expect(data.biographySections.length).toBeGreaterThanOrEqual(5);
        const titles = data.biographySections.map(b => b.title);
        expect(titles.some(t => t.includes('Tragedy'))).toBe(true);
        expect(titles.some(t => t.includes('WMCP'))).toBe(true);
        expect(titles.some(t => t.includes('Thesis'))).toBe(true);
    });

    it('contains thesis research entries', () => {
        expect(data.thesisResearch.length).toBeGreaterThanOrEqual(4);
        const researchTitles = data.thesisResearch.map(r => r.researchTitle);
        expect(researchTitles.some(t => t.includes('Maternal Hygiene'))).toBe(true);
        expect(researchTitles.some(t => t.includes('Ayurvedic'))).toBe(true);
    });

    it('catalogues medical milestones and achievements', () => {
        expect(data.medicalMilestonesCatalog.length).toBeGreaterThanOrEqual(5);
        const topics = data.medicalMilestonesCatalog.map(m => m.topic);
        expect(topics.some(t => t.includes('Obstetrics'))).toBe(true);
        expect(topics.some(t => t.includes('Albert Edward Hospital'))).toBe(true);
    });

    it('includes historical timeline events covering 1865 to 1887', () => {
        expect(data.timelineEvents.length).toBeGreaterThanOrEqual(10);
        expect(data.timelineEvents[0].year).toBe('1865');
        expect(data.timelineEvents[data.timelineEvents.length - 1].year).toBe('1887');
        expect(data.timelineEvents.some(e => e.year === '1886 (Mar)')).toBe(true);
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
