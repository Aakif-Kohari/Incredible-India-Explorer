import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Nagapattinam Ancient Port Explorer Tests', () => {
    it('HTML contains all required sections: historical overview, Chola maritime trade, cultural significance, timeline, gallery, and references', () => {
        const html = readFileSync(
            resolve(__dirname, '../../nagapattinam-port-explorer/index.html'),
            'utf-8'
        );
        expect(html).toContain('id="overview"');
        expect(html).toContain('id="chola-maritime-trade"');
        expect(html).toContain('id="cultural-significance"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="references"');
        expect(html).toContain('Nagapattinam');
        expect(html).toContain('Chola');
        expect(html).toContain('Srivijaya');
        expect(html).toContain('Chudamani Vihara');
    });

    it('CSS stylesheet exists and defines port styling tokens', () => {
        const css = readFileSync(
            resolve(__dirname, '../../nagapattinam-port-explorer/style.css'),
            'utf-8'
        );
        expect(css).toContain('--port-dark');
        expect(css).toContain('--port-gold');
        expect(css).toContain('--port-crimson');
        expect(css).toContain('.port-main');
        expect(css).toContain('.port-hero');
    });

    it('JavaScript module initializes clean and registers search items', () => {
        const js = readFileSync(
            resolve(__dirname, '../../nagapattinam-port-explorer/script.js'),
            'utf-8'
        );
        expect(js).toContain('initNagapattinamPortExplorer');
        expect(js).toContain('setupGalleryModal');
        expect(js).toContain('nagapattinam-port-explorer/index.html');
    });

    it('Landing Page Integration: Ancient Ports explorer landing page includes Nagapattinam card', () => {
        const landingHtml = readFileSync(
            resolve(__dirname, '../../ancient-ports-explorer/index.html'),
            'utf-8'
        );
        expect(landingHtml).toContain('Nagapattinam Ancient Port');
        expect(landingHtml).toContain('../nagapattinam-port-explorer/index.html');
    });
});
