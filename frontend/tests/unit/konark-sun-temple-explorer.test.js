import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/konark-sun-temple-explorer', file),
        'utf-8'
    );
}

describe('Konark Sun Temple Explorer — Page Structure & Requirements', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains a hero section with title, subtitle, and badges', () => {
        expect(html).toContain('class="konark-hero"');
        expect(html).toContain('<h1 class="konark-title">');
        expect(html).toContain('Konark Sun Temple');
        expect(html).toContain('Odisha');
    });

    it('contains all required sections', () => {
        const sections = ['history', 'chariot-design', 'wheels-horses', 'sculptures', 'structure-preservation', 'unesco', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('explains the temple location, King Narasimhadeva I, and Eastern Ganga dynasty', () => {
        expect(html).toContain('King Narasimhadeva I');
        expect(html).toContain('Eastern Ganga');
        expect(html).toContain('Puri');
        expect(html).toContain('1250');
    });

    it('describes the chariot-shaped architectural concept and Kalinga style', () => {
        expect(html).toContain('chariot');
        expect(html).toContain('Kalinga');
        expect(html).toContain('Jagamohana');
        expect(html).toContain('Rekha Deul');
    });

    it('highlights the 24 stone wheels and sundial timekeeping', () => {
        expect(html).toContain('24 wheels');
        expect(html).toContain('sundial');
        expect(html).toContain('spokes');
    });

    it('explains the significance of the seven horses', () => {
        expect(html).toContain('seven horses');
        expect(html).toContain('Gayatri');
        expect(html).toContain('colors');
    });

    it('showcases sculptures, Natya Mandir, and chlorite Surya idols', () => {
        expect(html).toContain('Natya Mandir');
        expect(html).toContain('Odissi');
        expect(html).toContain('Gajasimha');
        expect(html).toContain('Mithuna');
    });

    it('describes original structure and surviving remains with sand filling context', () => {
        expect(html).toContain('229 feet');
        expect(html).toContain('1903');
        expect(html).toContain('sand');
    });

    it('mentions UNESCO World Heritage status and interesting facts', () => {
        expect(html).toContain('UNESCO World Heritage');
        expect(html).toContain('1984');
        expect(html).toContain('Dharmapada');
        expect(html).toContain('magnet');
    });

    it('includes photo gallery with lightbox modal and descriptive alt text', () => {
        expect(html).toContain('konark-gallery-grid');
        expect(html).toContain('konark-modal');
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
        expect(css).toContain('--konark-gold');
        expect(css).toContain('@media (max-width: 1024px)');
        expect(js).toContain('konark-modal');
        expect(js).toContain('journey-bookmark-btn');
    });
});
