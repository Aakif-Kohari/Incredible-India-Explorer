import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/charminar-explorer', file),
        'utf-8'
    );
}

describe('Charminar Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains a hero section with title and kicker', () => {
        expect(html).toContain('class="charminar-hero"');
        expect(html).toContain('<h1 class="charminar-title">');
        expect(html).toContain('Charminar');
        expect(html).toContain('Hyderabad');
    });

    it('contains all required sections from prompt', () => {
        const sections = ['overview', 'history', 'minarets', 'architecture', 'culture', 'timeline', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('introduces Muhammad Quli Qutb Shah and historical context', () => {
        expect(html).toContain('Muhammad Quli Qutb Shah');
        expect(html).toContain('1591');
        expect(html).toContain('plague');
        expect(html).toContain('Golconda');
    });

    it('describes the four minarets in detail', () => {
        expect(html).toContain('Four Grand Minarets');
        expect(html).toContain('149');
        expect(html).toContain('minarets-grid');
    });

    it('explains Indo-Islamic architecture, arches, ornamentation, and structural design', () => {
        expect(html).toContain('Indo-Islamic');
        expect(html).toContain('Pointed Arches');
        expect(html).toContain('stucco');
        expect(html).toContain('mosque');
    });

    it('highlights connection with historic Hyderabad markets and Char Kaman', () => {
        expect(html).toContain('Laad Bazaar');
        expect(html).toContain('Char Kaman');
        expect(html).toContain('Gulzar Houz');
        expect(html).toContain('Mecca Masjid');
    });

    it('includes a historical timeline and interesting facts', () => {
        expect(html).toContain('charminar-timeline');
        expect(html).toContain('1687 CE');
        expect(html).toContain('1889 CE');
        expect(html).toContain('facts-grid');
        expect(html).toContain('wind tunnel');
    });

    it('includes lazy-loaded image gallery and lightbox modal', () => {
        expect(html).toContain('charminar-gallery-grid');
        expect(html).toContain('charminar-modal');
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
        expect(css).toContain('--charminar-gold');
        expect(css).toContain('@media (max-width: 1024px)');
        expect(js).toContain('charminar-modal');
        expect(js).toContain('journey-bookmark-btn');
    });
});
