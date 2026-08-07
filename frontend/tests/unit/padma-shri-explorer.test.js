/**
 * padma-shri-explorer.test.js
 * Unit tests for the Padma Shri Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readPageFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/padma-shri-explorer', file),
        'utf-8'
    );
}

function readLandingFile() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Padma Shri Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readPageFile('index.html');
    });

    it('contains hero title and badge info', () => {
        expect(html).toContain('class="ps-hero-title"');
        expect(html).toContain('Padma Shri Explorer');
        expect(html).toContain('Fourth-Highest Civilian Honour');
    });

    it('contains all required content sections', () => {
        const sections = [
            'history',
            'eligibility',
            'medal-design',
            'selection',
            'fields',
            'recipients',
            'timeline',
            'facts',
            'gallery'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains famous and unsung recipients', () => {
        expect(html).toContain('Shah Rukh Khan');
        expect(html).toContain('Milkha Singh');
        expect(html).toContain('Sudha Murty');
        expect(html).toContain('Saalumarada Thimmakka');
        expect(html).toContain('Jadav Payeng');
    });

    it('links shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Padma Shri Explorer — Assets & Script', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readPageFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.ps-hero');
    });

    it('includes valid interactive script', () => {
        const js = readPageFile('script.js');
        expect(js).toContain('initTabs');
    });
});

describe('Padma Shri Explorer — Landing Page Integration', () => {
    it('is linked on the Awards of India Explorer Landing Page', () => {
        const landingHtml = readLandingFile();
        expect(landingHtml).toContain('Padma Shri');
        expect(landingHtml).toContain('../padma-shri-explorer/index.html');
    });
});
