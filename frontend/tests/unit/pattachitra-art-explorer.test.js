import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../pattachitra-art-explorer', file),
        'utf-8'
    );
}

describe('Pattachitra Art Explorer — Page Structure & Content (#2931)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with title', () => {
        expect(html).toContain('class="hero-section pattachitra-hero"');
        expect(html).toContain('Pattachitra');
    });

    it('documents origin and history', () => {
        expect(html).toContain('id="origin"');
        expect(html).toContain('Chitrakars');
        expect(html).toContain('Jagannath');
        expect(html).toContain('Anasara');
    });

    it('documents traditional themes and storytelling traditions', () => {
        expect(html).toContain('id="themes"');
        expect(html).toContain('Dashavatara');
        expect(html).toContain('Krishna Leela');
        expect(html).toContain('patuas');
    });

    it('documents natural colours', () => {
        expect(html).toContain('id="colours"');
        expect(html).toContain('Conch Shell');
        expect(html).toContain('Hingula');
        expect(html).toContain('Haritala');
        expect(html).toContain('class="color-palette"');
    });

    it('documents regional variations', () => {
        expect(html).toContain('id="regions"');
        expect(html).toContain('Raghurajpur');
        expect(html).toContain('Geographical Indication');
        expect(html).toContain('Bengal');
    });

    it('includes an interactive step-by-step painting-process explorer', () => {
        expect(html).toContain('id="process"');
        expect(html).toContain('id="process-timeline"');
        expect(html).toContain('class="timeline-step active" data-step="0"');
        expect(html).toContain('id="detail-0"');
        expect(html).toContain('id="detail-5"');
    });

    it('includes an interactive gallery and image-credit note', () => {
        expect(html).toContain('id="gallery"');
        expect(html).toContain('class="gallery-grid"');
        expect(html).toContain('gallery-credit');
    });

    it('includes sources / references', () => {
        expect(html).toContain('References');
        expect(html).toContain('class="reference-list"');
    });
});

describe('Pattachitra Art Explorer — Scripts & Styles', () => {
    it('style.css defines timeline, palette, and gallery components', () => {
        const css = readFile('style.css');
        expect(css).toContain('.timeline-step');
        expect(css).toContain('.timeline-detail');
        expect(css).toContain('.color-palette');
        expect(css).toContain('.motif-grid');
    });

    it('script.js wires the step-by-step timeline, tabs, and zoom viewer', () => {
        const js = readFile('script.js');
        expect(js).toContain('setupTimeline');
        expect(js).toContain('setupTabs');
        expect(js).toContain('setupInteractiveViewer');
    });
});



