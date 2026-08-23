import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readRamabaiFile(file) {
    return readFileSync(resolve(__dirname, '../../frontend/ramabai-ranade-explorer', file), 'utf-8');
}

function loadRamabaiData() {
    const code = readRamabaiFile('ramabai-ranade-data.js');
    const fn = new Function(code + '\nreturn RAMABAI_DATA;');
    return fn();
}

describe('Ramabai Ranade Explorer — Page Structure & Accessibility', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readRamabaiFile('index.html');
        js = readRamabaiFile('ramabai-ranade.js');
        css = readRamabaiFile('ramabai-ranade.css');
    });

    it('contains title and required main section headings', () => {
        expect(html).toContain('Ramabai Ranade');
        expect(html).toContain('Life Story & Social Trailblazing');
        expect(html).toContain('Seva Sadan Vocational Training Programs');
        expect(html).toContain('Social Reform & Legal Advocacy');
        expect(html).toContain('Chronological Timeline (1862–1924)');
        expect(html).toContain('Test Your Social History Knowledge');
        expect(html).toContain('Archival Sources & Further Reading');
    });

    it('references local CSS, data, and JavaScript files', () => {
        expect(html).toContain('href="ramabai-ranade.css"');
        expect(html).toContain('src="ramabai-ranade-data.js"');
        expect(html).toContain('src="ramabai-ranade.js"');
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
        expect(js).toContain('initProgramSimulator');
        expect(js).toContain('renderSocialReform');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('initQuiz');
        expect(js).toContain('toggleTheme');
    });
});

describe('Ramabai Ranade Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadRamabaiData();
    });

    it('has accurate historical quick facts', () => {
        expect(data.quickFacts.fullName).toBe('Ramabai Ranade');
        expect(data.quickFacts.birthplace).toContain('Devarashtre');
        expect(data.quickFacts.keyPositions.some(p => p.includes('Seva Sadan Society'))).toBe(true);
    });

    it('documents biography sections with required social milestones', () => {
        expect(data.biographySections.length).toBeGreaterThanOrEqual(5);
        const titles = data.biographySections.map(b => b.title);
        expect(titles.some(t => t.includes('Arya Mahila Samaj'))).toBe(true);
        expect(titles.some(t => t.includes('Seva Sadan'))).toBe(true);
        expect(titles.some(t => t.includes('Suffrage'))).toBe(true);
    });

    it('contains vocational training program entries', () => {
        expect(data.vocationalTraining.length).toBeGreaterThanOrEqual(4);
        const programTitles = data.vocationalTraining.map(p => p.programTitle);
        expect(programTitles.some(t => t.includes('Nursing'))).toBe(true);
        expect(programTitles.some(t => t.includes('Teacher Training'))).toBe(true);
    });

    it('catalogues social reform campaigns and legal rights', () => {
        expect(data.socialReformCatalog.length).toBeGreaterThanOrEqual(5);
        const topics = data.socialReformCatalog.map(r => r.topic);
        expect(topics.some(t => t.includes('Suffrage'))).toBe(true);
        expect(topics.some(t => t.includes('Seva Sadan'))).toBe(true);
    });

    it('includes historical timeline events covering 1862 to 1924', () => {
        expect(data.timelineEvents.length).toBeGreaterThanOrEqual(10);
        expect(data.timelineEvents[0].year).toBe('1862');
        expect(data.timelineEvents[data.timelineEvents.length - 1].year).toBe('1924');
        expect(data.timelineEvents.some(e => e.year === '1908')).toBe(true);
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
