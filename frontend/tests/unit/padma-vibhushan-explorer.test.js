/**
 * padma-vibhushan-explorer.test.js
 * Unit tests for the Padma Vibhushan Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readPageFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/padma-vibhushan-explorer', file),
        'utf-8'
    );
}

function readLandingFile() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Padma Vibhushan Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readPageFile('index.html');
    });

    it('contains hero title and badge info', () => {
        expect(html).toContain('class="pv-hero-title"');
        expect(html).toContain('Padma Vibhushan Explorer');
        expect(html).toContain('Second-Highest Civilian Honour');
    });

    it('contains all required content sections', () => {
        const sections = [
            'history',
            'eligibility',
            'medal-design',
            'selection',
            'categories',
            'recipients',
            'timeline',
            'faqs',
            'gallery'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains notable recipients', () => {
        expect(html).toContain('Satyajit Ray');
        expect(html).toContain('Pandit Ravi Shankar');
        expect(html).toContain('Ratan Tata');
        expect(html).toContain('MC Mary Kom');
    });

    it('links shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Padma Vibhushan Explorer — Assets & Script', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readPageFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.pv-hero');
    });

    it('includes valid interactive script', () => {
        const js = readPageFile('script.js');
        expect(js).toContain('initTabs');
        expect(js).toContain('initFaqAccordion');
    });
});

describe('Padma Vibhushan Explorer — Landing Page Integration', () => {
    it('is linked on the Awards of India Explorer Landing Page', () => {
        const landingHtml = readLandingFile();
        expect(landingHtml).toContain('Padma Vibhushan');
        expect(landingHtml).toContain('../padma-vibhushan-explorer/index.html');
    });
});
