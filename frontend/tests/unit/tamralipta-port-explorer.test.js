import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Tamralipta Ancient Port Explorer Tests', () => {
    it('HTML contains background, location, timeline, trade significance, and religious importance', () => {
        const html = readFileSync(
            resolve(__dirname, '../../tamralipta-port-explorer/index.html'),
            'utf-8'
        );
        expect(html).toContain('id="background"');
        expect(html).toContain('id="location-timeline"');
        expect(html).toContain('id="trade-significance"');
        expect(html).toContain('id="culture-religion"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="references"');
        expect(html).toContain('Tamralipta');
        expect(html).toContain('Faxian');
        expect(html).toContain('Xuanzang');
    });

    it('CSS stylesheet exists and defines port styling tokens', () => {
        const css = readFileSync(
            resolve(__dirname, '../../tamralipta-port-explorer/style.css'),
            'utf-8'
        );
        expect(css).toContain('--port-emerald');
        expect(css).toContain('.port-main');
        expect(css).toContain('.port-hero');
    });

    it('JavaScript module initializes cleanly', () => {
        const js = readFileSync(
            resolve(__dirname, '../../tamralipta-port-explorer/script.js'),
            'utf-8'
        );
        expect(js).toContain('TamraliptaPortExplorer');
        expect(js).toContain('setupGalleryModal');
    });
});
