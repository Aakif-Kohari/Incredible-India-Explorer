import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../maitreyi-philosopher', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/maitreyi-philosopher', file), 'utf-8');
}

describe('Maitreyi — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains page title and Devanagari script branding', () => {
        expect(html).toContain('Maitreyi');
        expect(html).toContain('मैत्रेयी');
        expect(html).toContain('Brihadaranyaka Upanishad');
        expect(html).toContain('Incredible India Explorer');
    });

    it('contains core section IDs', () => {
        expect(html).toContain('id="who"');
        expect(html).toContain('id="context"');
        expect(html).toContain('id="dialogue"');
        expect(html).toContain('id="theme"');
        expect(html).toContain('id="atman"');
        expect(html).toContain('id="legacy"');
        expect(html).toContain('id="women"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="sources"');
    });

    it('contains dialogue exchange with Yajnavalkya', () => {
        expect(html).toContain('class="dialogue"');
        expect(html).toContain('class="exchange"');
        expect(html).toContain('class="speaker y"');
        expect(html).toContain('class="speaker m"');
        expect(html).toContain('would it make me immortal?');
    });

    it('contains primary Sanskrit verse cards and translations', () => {
        expect(html).toContain('verse-card');
        expect(html).toContain('येनाहं नामृता स्यां किमहं तेन कुर्याम्');
        expect(html).toContain('आत्मनस्तु कामाय पतिः प्रियो भवति');
    });

    it('contains Threefold Path of Realisation matrix (Sravana, Manana, Nididhyasana)', () => {
        expect(html).toContain('path-matrix');
        expect(html).toContain('Śravaṇa');
        expect(html).toContain('Manana');
        expect(html).toContain('Nididhyāsana');
    });

    it('contains interactive knowledge check quiz', () => {
        expect(html).toContain('quiz-container');
        expect(html).toContain('checkMaitreyiQuiz(');
        expect(html).toContain('id="quizFeedback"');
    });

    it('contains timeline and women in ancient Indian thought sections', () => {
        expect(html).toContain('class="timeline"');
        expect(html).toContain('tl-item');
        expect(html).toContain('Gargi Vachaknavi');
        expect(html).toContain('Maitreyi College');
    });

    it('includes Schema.org structured data (JSON-LD Article and Person schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
        expect(html).toContain('"@type": "Person"');
        expect(html).toContain('"name": "Maitreyi"');
    });
});

describe('Maitreyi — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Maitreyi — The Philosopher Who Chose Knowledge Over Material Wealth');
        expect(searchIndex).toContain('frontend/maitreyi-philosopher/index.html');
    });
});
