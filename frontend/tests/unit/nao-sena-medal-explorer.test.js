/**
 * nao-sena-medal-explorer.test.js
 * Unit tests for the Nao Sena Medal Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readPageFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/nao-sena-medal-explorer', file),
        'utf-8'
    );
}

function readLandingFile() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Nao Sena Medal Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readPageFile('index.html');
    });

    it('contains hero title and badges', () => {
        expect(html).toContain('class="nsm-hero-title"');
        expect(html).toContain('Nao Sena Medal Explorer');
        expect(html).toContain('Instituted:');
        expect(html).toContain('1960');
    });

    it('contains all required content sections', () => {
        const sections = [
            'history',
            'eligibility',
            'medal-design',
            'naval-operations',
            'selection',
            'awardees',
            'timeline',
            'gallery'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains naval operations content', () => {
        expect(html).toContain('Operation Trident');
        expect(html).toContain('INS Khukri');
        expect(html).toContain('Anti-Piracy Operations');
    });

    it('contains search filter for awardees timeline', () => {
        expect(html).toContain('id="recipient-search"');
        expect(html).toContain('id="recipients-tbody"');
    });

    it('contains timeline and image gallery', () => {
        expect(html).toContain('class="timeline-list"');
        expect(html).toContain('class="gallery-grid"');
    });

    it('links shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Nao Sena Medal Explorer — Assets & Script', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readPageFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.nsm-hero');
    });

    it('includes valid interactive script', () => {
        const js = readPageFile('script.js');
        expect(js).toContain('initTabs');
        expect(js).toContain('initRecipientSearch');
    });
});

describe('Nao Sena Medal Explorer — Landing Page Integration', () => {
    it('is linked on the Awards of India Explorer Landing Page', () => {
        const landingHtml = readLandingFile();
        expect(landingHtml).toContain('Nao Sena Medal');
        expect(landingHtml).toContain('../nao-sena-medal-explorer/index.html');
    });
});
