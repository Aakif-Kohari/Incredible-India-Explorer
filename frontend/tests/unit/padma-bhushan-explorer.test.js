/**
 * padma-bhushan-explorer.test.js
 * Unit tests for the Padma Bhushan Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readPageFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/padma-bhushan-explorer', file),
        'utf-8'
    );
}

function readLandingFile() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Padma Bhushan Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readPageFile('index.html');
    });

    it('contains hero title and badge info', () => {
        expect(html).toContain('class="pb-hero-title"');
        expect(html).toContain('Padma Bhushan Explorer');
        expect(html).toContain('Third-Highest Civilian Honour');
    });

    it('contains all required content sections', () => {
        const sections = [
            'history',
            'eligibility',
            'medal-design',
            'selection',
            'award-fields',
            'awardees',
            'timeline',
            'facts',
            'gallery'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains notable awardees', () => {
        expect(html).toContain('Homi J. Bhabha');
        expect(html).toContain('M. S. Subbulakshmi');
        expect(html).toContain('Sundar Pichai');
        expect(html).toContain('Satya Nadella');
    });

    it('links shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Padma Bhushan Explorer — Assets & Script', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readPageFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.pb-hero');
    });

    it('includes valid interactive script', () => {
        const js = readPageFile('script.js');
        expect(js).toContain('initTabs');
    });
});

describe('Padma Bhushan Explorer — Landing Page Integration', () => {
    it('is linked on the Awards of India Explorer Landing Page', () => {
        const landingHtml = readLandingFile();
        expect(landingHtml).toContain('Padma Bhushan');
        expect(landingHtml).toContain('../padma-bhushan-explorer/index.html');
    });
});
