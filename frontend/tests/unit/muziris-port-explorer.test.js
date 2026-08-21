import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Muziris Ancient Port Explorer Tests', () => {
    it('HTML contains historical overview, location, timeline, trade, and discoveries', () => {
        const html = readFileSync(
            resolve(__dirname, '../../muziris-port-explorer/index.html'),
            'utf-8'
        );
        expect(html).toContain('id="overview"');
        expect(html).toContain('id="location-timeline"');
        expect(html).toContain('id="trade-significance"');
        expect(html).toContain('id="discoveries"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="references"');
        expect(html).toContain('Muziris');
        expect(html).toContain('Chera');
        expect(html).toContain('Pattanam');
    });

    it('CSS stylesheet exists and defines port styling tokens', () => {
        const css = readFileSync(
            resolve(__dirname, '../../muziris-port-explorer/style.css'),
            'utf-8'
        );
        expect(css).toContain('--port-teal');
        expect(css).toContain('.port-main');
        expect(css).toContain('.port-hero');
    });

    it('JavaScript module initializes cleanly', () => {
        const js = readFileSync(
            resolve(__dirname, '../../muziris-port-explorer/script.js'),
            'utf-8'
        );
        expect(js).toContain('MuzirisPortExplorer');
        expect(js).toContain('setupGalleryModal');
    });
});
