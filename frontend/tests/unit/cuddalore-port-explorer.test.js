import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Cuddalore Ancient Port Explorer Tests', () => {
    it('HTML contains all required sections: historical overview, trade significance, nearby heritage sites, timeline, gallery, and references', () => {
        const html = readFileSync(
            resolve(__dirname, '../../cuddalore-port-explorer/index.html'),
            'utf-8'
        );
        expect(html).toContain('id="overview"');
        expect(html).toContain('id="trade-significance"');
        expect(html).toContain('id="heritage-sites"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="references"');
        expect(html).toContain('Cuddalore');
        expect(html).toContain('Koodaloor');
        expect(html).toContain('Fort St. David');
        expect(html).toContain('Padaleeswarar');
    });

    it('CSS stylesheet exists and defines port styling tokens', () => {
        const css = readFileSync(
            resolve(__dirname, '../../cuddalore-port-explorer/style.css'),
            'utf-8'
        );
        expect(css).toContain('--port-dark');
        expect(css).toContain('--port-gold');
        expect(css).toContain('--port-teal');
        expect(css).toContain('.port-main');
        expect(css).toContain('.port-hero');
    });

    it('JavaScript module initializes clean and registers search items', () => {
        const js = readFileSync(
            resolve(__dirname, '../../cuddalore-port-explorer/script.js'),
            'utf-8'
        );
        expect(js).toContain('initCuddalorePortExplorer');
        expect(js).toContain('setupGalleryModal');
        expect(js).toContain('cuddalore-port-explorer/index.html');
    });

    it('Landing Page Integration: Ancient Ports explorer landing page includes Cuddalore card', () => {
        const landingHtml = readFileSync(
            resolve(__dirname, '../../ancient-ports-explorer/index.html'),
            'utf-8'
        );
        expect(landingHtml).toContain('Cuddalore Ancient Port');
        expect(landingHtml).toContain('../cuddalore-port-explorer/index.html');
    });
});
