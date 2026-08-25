import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/fatehpur-sikri-explorer', file),
        'utf-8'
    );
}

describe('Fatehpur Sikri Explorer — Page Structure & Requirements', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains a hero section with title, subtitle, and badges', () => {
        expect(html).toContain('class="fs-hero"');
        expect(html).toContain('<h1 class="fs-title">');
        expect(html).toContain('Fatehpur Sikri');
        expect(html).toContain('Emperor Akbar');
    });

    it('contains all required sections', () => {
        const sections = ['history', 'urban-planning', 'monuments', 'timeline', 'unesco', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('explains Emperor Akbar\'s connection and historical development', () => {
        expect(html).toContain('Emperor Akbar');
        expect(html).toContain('Sheikh Salim Chishti');
        expect(html).toContain('1571');
        expect(html).toContain('1585');
        expect(html).toContain('City of Victory');
    });

    it('introduces Buland Darwaza with dimensions and inscription', () => {
        expect(html).toContain('Buland Darwaza');
        expect(html).toContain('54 metres');
        expect(html).toContain('1601');
        expect(html).toContain('bridge');
    });

    it('highlights Panch Mahal with architectural details', () => {
        expect(html).toContain('Panch Mahal');
        expect(html).toContain('176');
        expect(html).toContain('pyramidal');
        expect(html).toContain('chhatri');
    });

    it('includes Jama Masjid and the Tomb of Salim Chishti', () => {
        expect(html).toContain('Jama Masjid');
        expect(html).toContain('Tomb of Sheikh Salim Chishti');
        expect(html).toContain('jali');
        expect(html).toContain('marble');
    });

    it('explains Mughal urban planning and architectural style', () => {
        expect(html).toContain('Urban Planning');
        expect(html).toContain('trabeated');
        expect(html).toContain('Diwan-i-Khas');
        expect(html).toContain('Anup Talao');
    });

    it('includes historical timeline and UNESCO World Heritage status', () => {
        expect(html).toContain('fs-timeline');
        expect(html).toContain('UNESCO World Heritage');
        expect(html).toContain('1986');
    });

    it('includes photo gallery with lightbox modal', () => {
        expect(html).toContain('fs-gallery-grid');
        expect(html).toContain('fs-modal');
        const imgs = html.match(/loading="lazy"/g) || [];
        expect(imgs.length).toBeGreaterThanOrEqual(4);
    });

    it('has semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(5);
    });

    it('includes responsive stylesheet and interactive script with Journey integration', () => {
        expect(css).toContain('--fs-red');
        expect(css).toContain('@media (max-width: 1024px)');
        expect(js).toContain('fs-modal');
        expect(js).toContain('journey-bookmark-btn');
    });
});
