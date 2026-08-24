import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';

const PAGE_DIR = 'frontend/bibha-chowdhuri-explorer';
const htmlPath = join(process.cwd(), PAGE_DIR, 'index.html');
const cssPath = join(process.cwd(), PAGE_DIR, 'bibha-chowdhuri.css');
const jsPath = join(process.cwd(), PAGE_DIR, 'bibha-chowdhuri.js');
const dataPath = join(process.cwd(), PAGE_DIR, 'bibha-chowdhuri-data.js');

const html = readFileSync(htmlPath, 'utf8');
const css = readFileSync(cssPath, 'utf8');
const js = readFileSync(jsPath, 'utf8');
const dataJs = readFileSync(dataPath, 'utf8');

// Evaluate the data file in a sandboxed module shape.
const BIBHA_DATA = (() => {
    const module = { exports: {} };
    // eslint-disable-next-line no-new-func
    const fn = new Function('module', 'exports', dataJs + '\nreturn module.exports;');
    const out = fn(module, module.exports);
    return out.BIBHA_DATA || (module.exports && module.exports.BIBHA_DATA);
})();

describe('Bibha Chowdhuri Explorer - HTML structure', () => {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    it('has correct <title> mentioning Bibha Chowdhuri', () => {
        expect(document.querySelector('title').textContent).toMatch(/Bibha Chowdhuri/i);
    });

    it('has a meta description', () => {
        const meta = document.querySelector('meta[name="description"]');
        expect(meta).not.toBeNull();
        expect(meta.getAttribute('content').length).toBeGreaterThan(50);
    });

    it('has a skip-link for accessibility', () => {
        expect(document.querySelector('.skip-link')).not.toBeNull();
    });

    it('links global styles.css and the page CSS', () => {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) => l.getAttribute('href'));
        expect(links.some((l) => l.includes('styles.css'))).toBe(true);
        expect(links.some((l) => l.includes('bibha-chowdhuri.css'))).toBe(true);
    });

    it('includes the required sections (hero, biography, research, milestones, timeline, quiz, sources)', () => {
        ['hero', 'biography', 'research', 'milestones', 'timeline', 'quiz', 'sources'].forEach((id) => {
            expect(document.getElementById(id)).not.toBeNull();
        });
    });

    it('loads scripts in correct order (data before controller)', () => {
        const scripts = Array.from(document.querySelectorAll('script[src]')).map((s) => s.getAttribute('src'));
        const dataIdx = scripts.findIndex((s) => s.includes('bibha-chowdhuri-data.js'));
        const jsIdx = scripts.findIndex((s) => s.includes('bibha-chowdhuri.js'));
        expect(dataIdx).toBeGreaterThanOrEqual(0);
        expect(jsIdx).toBeGreaterThanOrEqual(0);
        expect(dataIdx).toBeLessThan(jsIdx);
    });

    it('has a navbar with the Incredible India Explorer logo', () => {
        expect(document.querySelector('.nav-logo')).not.toBeNull();
        expect(document.querySelector('.nav-logo').textContent).toMatch(/Incredible/i);
    });
});

describe('Bibha Chowdhuri Explorer - CSS', () => {
    it('includes :focus-visible styles for accessibility', () => {
        expect(css).toMatch(/:focus-visible/);
    });

    it('includes responsive breakpoint at max-width: 900px', () => {
        expect(css).toMatch(/@media\s*\(max-width:\s*900px\)/);
    });

    it('includes prefers-reduced-motion handling', () => {
        expect(css).toMatch(/prefers-reduced-motion/);
    });

    it('includes a light-theme override', () => {
        expect(css).toMatch(/body\.light-theme/);
    });
});

describe('Bibha Chowdhuri Explorer - JS controller', () => {
    it('defines all required render/init functions', () => {
        ['renderBiography', 'initResearchSimulator', 'renderMilestones', 'renderTimeline', 'initQuiz', 'toggleTheme', 'initNavigation'].forEach((fn) => {
            expect(js).toContain('function ' + fn);
        });
    });

    it('reads theme from bibha_theme localStorage key', () => {
        expect(js).toMatch(/bibha_theme/);
    });

    it('attaches a DOMContentLoaded listener', () => {
        expect(js).toMatch(/DOMContentLoaded/);
    });
});

describe('Bibha Chowdhuri Explorer - Data', () => {
    it('has the BIBHA_DATA object with all required keys', () => {
        expect(BIBHA_DATA).toBeDefined();
        ['quickFacts', 'biographySections', 'researchTopics', 'milestonesCatalog', 'timelineEvents', 'quizQuestions', 'sources'].forEach((k) => {
            expect(BIBHA_DATA[k]).toBeDefined();
        });
    });

    it('quickFacts has the expected fields', () => {
        const q = BIBHA_DATA.quickFacts;
        expect(q.fullName).toMatch(/Bibha Chowdhuri/i);
        expect(q.lifespan).toMatch(/1913/);
        expect(q.lifespan).toMatch(/1991/);
        expect(Array.isArray(q.education)).toBe(true);
        expect(q.education.length).toBeGreaterThanOrEqual(2);
        expect(Array.isArray(q.keyPositions)).toBe(true);
        expect(q.keyPositions.length).toBeGreaterThanOrEqual(2);
    });

    it('has at least 5 biography sections with required fields', () => {
        expect(BIBHA_DATA.biographySections.length).toBeGreaterThanOrEqual(5);
        BIBHA_DATA.biographySections.forEach((s) => {
            expect(s).toHaveProperty('id');
            expect(s).toHaveProperty('title');
            expect(s).toHaveProperty('subtitle');
            expect(s).toHaveProperty('icon');
            expect(s).toHaveProperty('content');
            expect(s.content.length).toBeGreaterThan(50);
        });
    });

    it('has at least 4 research topics with required fields', () => {
        expect(BIBHA_DATA.researchTopics.length).toBeGreaterThanOrEqual(4);
        BIBHA_DATA.researchTopics.forEach((r) => {
            expect(r).toHaveProperty('id');
            expect(r).toHaveProperty('researchTitle');
            expect(r).toHaveProperty('coreFinding');
            expect(r).toHaveProperty('impact');
        });
    });

    it('has at least 5 milestones with required fields', () => {
        expect(BIBHA_DATA.milestonesCatalog.length).toBeGreaterThanOrEqual(5);
        BIBHA_DATA.milestonesCatalog.forEach((m) => {
            expect(m).toHaveProperty('topic');
            expect(m).toHaveProperty('category');
            expect(m).toHaveProperty('status');
            expect(m).toHaveProperty('significance');
        });
    });

    it('has timeline events bracketing her lifespan (1913-1991)', () => {
        const years = BIBHA_DATA.timelineEvents
            .map((e) => parseInt(e.year, 10))
            .filter((y) => !isNaN(y));
        const earliest = Math.min(...years);
        const latest = Math.max(...years);
        expect(earliest).toBeLessThanOrEqual(1913);
        expect(latest).toBeGreaterThanOrEqual(1991);
    });

    it('has at least 5 quiz questions, each with 4 options and a valid correctIndex', () => {
        expect(BIBHA_DATA.quizQuestions.length).toBeGreaterThanOrEqual(5);
        BIBHA_DATA.quizQuestions.forEach((q) => {
            expect(q).toHaveProperty('id');
            expect(q).toHaveProperty('question');
            expect(q.options).toHaveLength(4);
            expect(typeof q.correctIndex).toBe('number');
            expect(q.correctIndex).toBeGreaterThanOrEqual(0);
            expect(q.correctIndex).toBeLessThan(4);
            expect(q).toHaveProperty('explanation');
        });
    });

    it('has at least 3 sources, each with an http(s) URL', () => {
        expect(BIBHA_DATA.sources.length).toBeGreaterThanOrEqual(3);
        BIBHA_DATA.sources.forEach((s) => {
            expect(s).toHaveProperty('title');
            expect(s).toHaveProperty('url');
            expect(s.url).toMatch(/^https?:\/\//);
        });
    });
});
