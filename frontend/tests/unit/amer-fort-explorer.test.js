import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/amer-fort-explorer', file),
        'utf-8'
    );
}

describe('Amer Fort Explorer — Page Structure & Requirements', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains a hero section with title, subtitle, and badges', () => {
        expect(html).toContain('class="amer-hero"');
        expect(html).toContain('<h1 class="amer-title">');
        expect(html).toContain('Amer Fort');
        expect(html).toContain('Rajasthan');
    });

    it('contains all required sections', () => {
        const sections = ['location', 'history', 'architecture', 'sheesh-mahal', 'courtyards', 'unesco', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('explains the history of Amer Fort and Kachwaha heritage', () => {
        expect(html).toContain('Raja Man Singh I');
        expect(html).toContain('1592');
        expect(html).toContain('Kachwaha');
        expect(html).toContain('Meena');
    });

    it('describes hilltop defensive setting and Jaigarh connection', () => {
        expect(html).toContain('Cheel ka Teela');
        expect(html).toContain('Maota Lake');
        expect(html).toContain('Jaigarh');
        expect(html).toContain('tunnel');
    });

    it('highlights Sheesh Mahal with mirror details', () => {
        expect(html).toContain('Sheesh Mahal');
        expect(html).toContain('Mirror Palace');
        expect(html).toContain('Jai Mandir');
        expect(html).toContain('candle');
    });

    it('covers Ganesh Pol and major courtyards', () => {
        expect(html).toContain('Ganesh Pol');
        expect(html).toContain('Jaleb Chowk');
        expect(html).toContain('Shila Devi');
        expect(html).toContain('Diwan-i-Aam');
        expect(html).toContain('Diwan-i-Khas');
        expect(html).toContain('Sukh Niwas');
        expect(html).toContain('Zenana');
    });

    it('explains Rajput and Mughal architectural synthesis', () => {
        expect(html).toContain('Rajput');
        expect(html).toContain('Mughal');
        expect(html).toContain('chhatris');
        expect(html).toContain('jharokhas');
    });

    it('mentions UNESCO Hill Forts of Rajasthan status', () => {
        expect(html).toContain('UNESCO');
        expect(html).toContain('Hill Forts of Rajasthan');
        expect(html).toContain('2013');
    });

    it('includes interesting facts and the Magic Flower panel', () => {
        expect(html).toContain('Magic Flower');
        expect(html).toContain('Kesar Kyari');
        expect(html).toContain('Lotus Flower');
    });

    it('includes image gallery and lightbox modal with accessible attributes', () => {
        expect(html).toContain('amer-gallery-grid');
        expect(html).toContain('amer-modal');
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
        expect(css).toContain('--amer-amber');
        expect(css).toContain('@media (max-width: 1024px)');
        expect(js).toContain('amer-modal');
        expect(js).toContain('journey-bookmark-btn');
    });
});
