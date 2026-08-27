import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../sulabha-philosopher-explorer', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/sulabha-philosopher-explorer', file), 'utf-8');
}

describe('Sulabha Philosopher Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains page title and header branding', () => {
        expect(html).toContain('Sulabha');
        expect(html).toContain('King Janaka');
        expect(html).toContain('Incredible India Explorer');
    });

    it('contains core folio sections', () => {
        expect(html).toContain('id="who"');
        expect(html).toContain('id="context"');
        expect(html).toContain('id="encounter"');
        expect(html).toContain('id="philosophy"');
        expect(html).toContain('id="verses"');
        expect(html).toContain('id="women"');
        expect(html).toContain('id="significance"');
        expect(html).toContain('id="sources"');
    });

    it('contains timeline and accordion components', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('class="timeline"');
        expect(html).toContain('id="accordion"');
        expect(html).toContain('class="accordion"');
        expect(html).toContain('On speech itself');
        expect(html).toContain('On identity and the changing body');
        expect(html).toContain('On gender and caste');
    });

    it('contains original Sanskrit verses and dialectic matrix', () => {
        expect(html).toContain('class="sloka-card"');
        expect(html).toContain('class="sloka-text"');
        expect(html).toContain('class="matrix-table"');
        expect(html).toContain("Janaka's Objections vs. Sulabha's Refutations");
    });

    it('contains interactive quiz widget', () => {
        expect(html).toContain('id="quizContainer"');
        expect(html).toContain('id="quizQuestion"');
        expect(html).toContain('checkQuiz(');
    });

    it('includes Schema.org structured data (JSON-LD Article and Person schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
        expect(html).toContain('"@type": "Person"');
        expect(html).toContain('"name": "Sulabha"');
    });

    it('contains image credits and sources referencing Ruth Vanita & K. M. Ganguli', () => {
        expect(html).toContain('IMAGE CREDITS');
        expect(html).toContain('Ruth Vanita');
        expect(html).toContain('Kisari Mohan Ganguli');
        expect(html).toContain('Mokṣadharma Parva');
    });
});

describe('Sulabha Philosopher Explorer — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Sulabha — The Philosopher Who Debated King Janaka');
        expect(searchIndex).toContain('frontend/sulabha-philosopher-explorer/index.html');
    });
});
