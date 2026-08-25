import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../gargi-vachaknavi', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/gargi-vachaknavi', file), 'utf-8');
}

describe('Gargi Vachaknavi — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains page title and Devanagari script branding', () => {
        expect(html).toContain('Gargi Vachaknavi');
        expect(html).toContain('गार्गी वाचक्नवी');
        expect(html).toContain('Brihadaranyaka Upanishad');
        expect(html).toContain('Incredible India Explorer');
    });

    it('contains core section IDs', () => {
        expect(html).toContain('id="who"');
        expect(html).toContain('id="context"');
        expect(html).toContain('id="dialogue"');
        expect(html).toContain('id="philosophy"');
        expect(html).toContain('id="women"');
        expect(html).toContain('id="significance"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="sources"');
    });

    it('contains evidence filter controls and tags', () => {
        expect(html).toContain('evidence-control');
        expect(html).toContain('data-filter="text"');
        expect(html).toContain('data-filter="later"');
        expect(html).toContain('tag--text');
        expect(html).toContain('tag--later');
    });

    it('contains dialogue steps and philosophical questions', () => {
        expect(html).toContain('dialogue-steps');
        expect(html).toContain('dialogue-step');
        expect(html).toContain('chain of pervasion');
        expect(html).toContain('warp and the woof');
    });

    it('contains interactive dialectic hierarchy ladder', () => {
        expect(html).toContain('ladder-container');
        expect(html).toContain('id="ladderButtons"');
        expect(html).toContain('id="ladderDetail"');
        expect(html).toContain('showLadder(');
    });

    it('contains primary Sanskrit verse and interactive quiz', () => {
        expect(html).toContain('verse-box');
        expect(html).toContain('एतद् वै तदक्षरं गार्गि');
        expect(html).toContain('quiz-card');
        expect(html).toContain('checkGargiQuiz(');
    });

    it('contains timeline accordion and sources list', () => {
        expect(html).toContain('class="timeline-track"');
        expect(html).toContain('class="timeline-node"');
        expect(html).toContain('class="sources-list"');
        expect(html).toContain('Gargi College');
    });

    it('includes Schema.org structured data (JSON-LD Article and Person schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
        expect(html).toContain('"@type": "Person"');
        expect(html).toContain('"name": "Gargi Vachaknavi"');
    });
});

describe('Gargi Vachaknavi — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Gargi Vachaknavi — The Philosopher Who Challenged the Scholars of Ancient India');
        expect(searchIndex).toContain('frontend/gargi-vachaknavi/index.html');
    });
});
