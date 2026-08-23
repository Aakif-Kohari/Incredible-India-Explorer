import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readJanakiFile(file) {
    return readFileSync(resolve(__dirname, '../../frontend/janaki-ammal-explorer', file), 'utf-8');
}

function loadJanakiData() {
    const code = readJanakiFile('janaki-ammal-data.js');
    const fn = new Function(code + '\nreturn JANAKI_DATA;');
    return fn();
}

describe('E. K. Janaki Ammal Explorer — Page Structure & Accessibility', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readJanakiFile('index.html');
        js = readJanakiFile('janaki-ammal.js');
        css = readJanakiFile('janaki-ammal.css');
    });

    it('contains title and required main section headings', () => {
        expect(html).toContain('Dr. E. K. Janaki Ammal');
        expect(html).toContain('Academic Journey & Life Legacy');
        expect(html).toContain('Sugarcane Cytogenetics & Hybridization');
        expect(html).toContain('Chromosome Atlas & Cytogenetics Explorer');
        expect(html).toContain('Chronological Timeline (1897–1984)');
        expect(html).toContain('Test Your Botanical Knowledge');
        expect(html).toContain('Sources & Archival References');
    });

    it('references local CSS, data, and JavaScript files', () => {
        expect(html).toContain('href="janaki-ammal.css"');
        expect(html).toContain('src="janaki-ammal-data.js"');
        expect(html).toContain('src="janaki-ammal.js"');
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
        expect(js).toContain('initHybridSimulator');
        expect(js).toContain('renderChromosomeAtlas');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('initQuiz');
        expect(js).toContain('toggleTheme');
    });
});

describe('E. K. Janaki Ammal Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadJanakiData();
    });

    it('has accurate historical quick facts', () => {
        expect(data.quickFacts.fullName).toBe('Dr. Edavalath Kakkat Janaki Ammal');
        expect(data.quickFacts.birthplace).toContain('Thalassery');
        expect(data.quickFacts.education.some(e => e.includes('University of Michigan'))).toBe(true);
    });

    it('documents biography sections with required historical milestones', () => {
        expect(data.biographySections.length).toBeGreaterThanOrEqual(5);
        const titles = data.biographySections.map(b => b.title);
        expect(titles.some(t => t.includes('Sugarcane Cytogenetics'))).toBe(true);
        expect(titles.some(t => t.includes('Chromosome Atlas'))).toBe(true);
        expect(titles.some(t => t.includes('Save Silent Valley'))).toBe(true);
    });

    it('contains sugarcane hybrid genetics entries', () => {
        expect(data.sugarcaneHybrids.length).toBeGreaterThanOrEqual(4);
        const crossNames = data.sugarcaneHybrids.map(h => h.crossName);
        expect(crossNames.some(c => c.includes('Saccharum spontaneum'))).toBe(true);
        expect(crossNames.some(c => c.includes('Zea mays'))).toBe(true);
    });

    it('catalogues chromosome atlas species', () => {
        expect(data.chromosomeAtlasData.length).toBeGreaterThanOrEqual(6);
        const species = data.chromosomeAtlasData.map(s => s.species);
        expect(species.some(sp => sp.includes('Magnolia kobus'))).toBe(true);
        expect(species.some(sp => sp.includes('Saccharum officinarum'))).toBe(true);
    });

    it('includes historical timeline events covering 1897 to 1984', () => {
        expect(data.timelineEvents.length).toBeGreaterThanOrEqual(10);
        expect(data.timelineEvents[0].year).toBe('1897');
        expect(data.timelineEvents[data.timelineEvents.length - 1].year).toBe('1984');
        expect(data.timelineEvents.some(e => e.year === '1984')).toBe(true);
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
