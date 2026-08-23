import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/hawa-mahal-explorer', file),
        'utf-8'
    );
}

describe('Hawa Mahal Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains a hero section with title and kicker', () => {
        expect(html).toContain('class="hawa-hero"');
        expect(html).toContain('<h1 class="hawa-title">');
        expect(html).toContain('Hawa Mahal');
        expect(html).toContain('Jaipur');
    });

    it('contains all required sections from prompt', () => {
        const sections = ['overview', 'history', 'facade', 'architecture', 'timeline', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('introduces Maharaja Sawai Pratap Singh and historical royal context', () => {
        expect(html).toContain('Sawai Pratap Singh');
        expect(html).toContain('1799');
        expect(html).toContain('purdah');
        expect(html).toContain('Zenana');
        expect(html).toContain('Lal Chand Ustad');
    });

    it('describes the 5-storey facade and each tier', () => {
        expect(html).toContain('Sharad Mandir');
        expect(html).toContain('Ratan Mandir');
        expect(html).toContain('Vichitra Mandir');
        expect(html).toContain('Prakash Mandir');
        expect(html).toContain('Hawa Mandir');
    });

    it('explains 953 jharokhas, venturi effect natural air conditioning, and sandstone architecture', () => {
        expect(html).toContain('953');
        expect(html).toContain('jharokhas');
        expect(html).toContain('Venturi');
        expect(html).toContain('jali');
        expect(html).toContain('sandstone');
    });

    it('includes a historical timeline and interesting facts', () => {
        expect(html).toContain('hawa-timeline');
        expect(html).toContain('1876 CE');
        expect(html).toContain('2019 CE');
        expect(html).toContain('facts-grid');
        expect(html).toContain('No Front Entrance');
    });

    it('includes lazy-loaded image gallery and lightbox modal', () => {
        expect(html).toContain('hawa-gallery-grid');
        expect(html).toContain('hawa-modal');
        const imgs = html.match(/loading="lazy"/g) || [];
        expect(imgs.length).toBeGreaterThanOrEqual(3);
    });

    it('has semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('includes responsive styles and interactive script with Journey support', () => {
        expect(css).toContain('--hawa-pink');
        expect(css).toContain('@media (max-width: 1024px)');
        expect(js).toContain('hawa-modal');
        expect(js).toContain('journey-bookmark-btn');
    });
});
