import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/sanchi-stupa-explorer', file),
        'utf-8'
    );
}

describe('Sanchi Stupa Explorer — Page Structure & Requirements', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains a hero section with title, subtitle, and badges', () => {
        expect(html).toContain('class="sanchi-hero"');
        expect(html).toContain('<h1 class="sanchi-title">');
        expect(html).toContain('Sanchi Stupa');
        expect(html).toContain('Buddhist');
    });

    it('contains all required sections', () => {
        const sections = ['buddhist-heritage', 'great-stupa', 'toranas', 'symbols', 'other-monuments', 'timeline', 'unesco', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('explains the Buddhist heritage and Emperor Ashoka connection', () => {
        expect(html).toContain('Emperor Ashoka');
        expect(html).toContain('Vidisha');
        expect(html).toContain('Devi');
        expect(html).toContain('relics');
    });

    it('describes the Great Stupa architectural elements', () => {
        expect(html).toContain('Anda');
        expect(html).toContain('Harmika');
        expect(html).toContain('Chhatra');
        expect(html).toContain('Pradakshina');
    });

    it('highlights the four elaborately carved Toranas', () => {
        expect(html).toContain('Toranas');
        expect(html).toContain('South Gateway');
        expect(html).toContain('North Gateway');
        expect(html).toContain('East Gateway');
        expect(html).toContain('West Gateway');
        expect(html).toContain('Yakshi');
        expect(html).toContain('ivory');
    });

    it('explains important Buddhist symbols and Jataka tales', () => {
        expect(html).toContain('Dharmachakra');
        expect(html).toContain('Buddhapada');
        expect(html).toContain('Bodhi Tree');
        expect(html).toContain('Triratna');
        expect(html).toContain('Vessantara Jataka');
    });

    it('includes surrounding stupas, Temple 17, and Ashoka pillar', () => {
        expect(html).toContain('Stupa 2');
        expect(html).toContain('Stupa 3');
        expect(html).toContain('Sariputta');
        expect(html).toContain('Temple 17');
        expect(html).toContain('Ashoka Pillar');
    });

    it('includes historical timeline and UNESCO World Heritage status', () => {
        expect(html).toContain('sanchi-timeline');
        expect(html).toContain('UNESCO World Heritage');
        expect(html).toContain('1989');
    });

    it('includes photo gallery with lightbox modal', () => {
        expect(html).toContain('sanchi-gallery-grid');
        expect(html).toContain('sanchi-modal');
        const imgs = html.match(/loading="lazy"/g) || [];
        expect(imgs.length).toBeGreaterThanOrEqual(4);
    });

    it('has semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('includes responsive stylesheet and interactive script with Journey integration', () => {
        expect(css).toContain('--sanchi-ochre');
        expect(css).toContain('@media (max-width: 1024px)');
        expect(js).toContain('sanchi-modal');
        expect(js).toContain('journey-bookmark-btn');
    });
});
