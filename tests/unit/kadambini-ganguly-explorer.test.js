import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readProfileFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kadambini-ganguly-explorer', file),
        'utf-8'
    );
}

function loadProfileData() {
    const code = readProfileFile('kadambini-data.js');
    const fn = new Function(
        code + '\nreturn { KADAMBINI_DATA };'
    );
    return fn();
}

function readPersonalitiesPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/personalities/personalities.html'),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Kadambini Ganguly Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readProfileFile('index.html');
        js = readProfileFile('kadambini.js');
        css = readProfileFile('kadambini.css');
    });

    it('renders header, title and tagline correctly', () => {
        expect(html).toContain('Kadambini Ganguly');
        expect(html).toContain('The Woman Who Broke Barriers in Indian Medicine');
        expect(html).toContain('class="kg-hero"');
    });

    it('contains all required sections from the issue', () => {
        const sections = [
            'hero',
            'early-life',
            'bethune-college',
            'medical-education',
            'medical-career',
            'public-life',
            'women-education',
            'timeline',
            'quiz',
            'map',
            'legacy',
            'sources'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('documents the key biographical details', () => {
        expect(html).toContain('18 July 1861');
        expect(html).toContain('Bhagalpur');
        expect(html).toContain('Bethune');
        expect(html).toContain('Chandramukhi Basu');
        expect(html).toContain('Calcutta Medical College');
        expect(html).toContain('GBMC');
        expect(html).toContain('Dwarakanath Ganguly');
        expect(html).toContain('Lady Dufferin Hospital');
        expect(html).toContain('Indian National Congress');
        expect(html).toContain('Annie Besant');
        expect(html).toContain('triple');
        expect(html).toContain('qualification');
    });

    it('embeds an interactive Kolkata map with Leaflet', () => {
        expect(html).toContain('id="kg-map"');
        expect(html).toContain('leaflet@1.9.4/dist/leaflet.css');
        expect(html).toContain('leaflet@1.9.4/dist/leaflet.js');
        expect(js).toContain("L.map");
        expect(js).toContain('tile.openstreetmap.org');
    });

    it('links shared stylesheets and local assets', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('../pages-common.js');
        expect(html).toContain('href="kadambini.css"');
        expect(html).toContain('src="kadambini-data.js"');
        expect(html).toContain('src="kadambini.js"');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
    });

    it('includes a non-empty stylesheet with the expected selectors', () => {
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.kg-hero');
        expect(css).toContain('.kg-section');
        expect(css).toContain('.timeline-item');
        expect(css).toContain('.kg-map');
        expect(css).toContain('.kg-quiz-option');
    });

    it('contains interactive renderers and handlers in javascript', () => {
        expect(js).toContain('renderQuickFacts');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('initQuiz');
        expect(js).toContain('initMap');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Kadambini Ganguly Profile — Dataset Verification', () => {
    let dataObj;

    beforeAll(() => {
        dataObj = loadProfileData();
    });

    it('verifies profile metadata fields', () => {
        expect(dataObj.KADAMBINI_DATA.quickFacts.fullName).toBe('Kadambini Basu Ganguly');
        expect(dataObj.KADAMBINI_DATA.quickFacts.lifespan).toContain('1861');
        expect(dataObj.KADAMBINI_DATA.quickFacts.lifespan).toContain('1923');
        expect(dataObj.KADAMBINI_DATA.quickFacts.primaryFields).toContain('Medicine');
    });

    it('contains a chronological history timeline', () => {
        expect(dataObj.KADAMBINI_DATA.timelineEvents.length).toBeGreaterThanOrEqual(8);
        const graduation = dataObj.KADAMBINI_DATA.timelineEvents.find(t => t.year === '1883');
        expect(graduation).toBeDefined();
        expect(graduation.title).toContain('Graduation & Marriage');
        const death = dataObj.KADAMBINI_DATA.timelineEvents.find(t => t.year === '1923');
        expect(death).toBeDefined();
    });

    it('defines Kolkata map locations for her life landmarks', () => {
        expect(dataObj.KADAMBINI_DATA.mapLocations.length).toBeGreaterThanOrEqual(3);
        const names = dataObj.KADAMBINI_DATA.mapLocations.map(l => l.name);
        expect(names.some(n => n.includes('Bethune'))).toBe(true);
        expect(names.some(n => n.includes('Medical College'))).toBe(true);
        dataObj.KADAMBINI_DATA.mapLocations.forEach(loc => {
            expect(Array.isArray(loc.coords)).toBe(true);
            expect(loc.coords).toHaveLength(2);
            expect(loc.coords[0]).toBeGreaterThan(22.5);
            expect(loc.coords[0]).toBeLessThan(22.7);
            expect(loc.coords[1]).toBeGreaterThan(88.2);
            expect(loc.coords[1]).toBeLessThan(88.5);
        });
    });

    it('contains quiz questions with explanations', () => {
        expect(dataObj.KADAMBINI_DATA.quizQuestions.length).toBe(5);
        const firstQ = dataObj.KADAMBINI_DATA.quizQuestions.find(q => q.id === 1);
        expect(firstQ).toBeDefined();
        expect(firstQ.question).toContain('born');
        expect(firstQ.explanation).toContain('Bhagalpur');
        dataObj.KADAMBINI_DATA.quizQuestions.forEach(q => {
            expect(q.options).toHaveLength(4);
            expect(q.answerIndex).toBeGreaterThanOrEqual(0);
            expect(q.answerIndex).toBeLessThan(4);
        });
    });

    it('cites reliable sources', () => {
        expect(dataObj.KADAMBINI_DATA.sources.length).toBeGreaterThanOrEqual(5);
        dataObj.KADAMBINI_DATA.sources.forEach(src => {
            expect(src.link).toMatch(/^https:/);
        });
    });
});

describe('Kadambini Ganguly Profile — Digital Archive Integrations', () => {
    it('is listed as a card on the personalities hub page', () => {
        const page = readPersonalitiesPage();
        expect(page).toContain('Kadambini Ganguly');
        expect(page).toContain("../kadambini-ganguly-explorer/index.html");
        expect(page).toContain('personalities-kadambini-ganguly');
    });

    it('is registered in search-index.js', () => {
        const searchIdx = readSearchIndex();
        expect(searchIdx).toContain('frontend/kadambini-ganguly-explorer/index.html');
    });
});
