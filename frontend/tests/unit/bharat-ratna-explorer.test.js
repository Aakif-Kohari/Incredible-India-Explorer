/**
 * bharat-ratna-explorer.test.js
 * Unit tests for the Bharat Ratna Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readPageFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/bharat-ratna-explorer', file),
        'utf-8'
    );
}

function readLandingFile() {
    return readFileSync(
        resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
        'utf-8'
    );
}

describe('Bharat Ratna Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readPageFile('index.html');
    });

    it('contains hero title and badges', () => {
        expect(html).toContain('class="br-hero-title"');
        expect(html).toContain('Bharat Ratna Explorer');
        expect(html).toContain('Year Instituted:');
        expect(html).toContain('1954');
    });

    it('contains all required content sections', () => {
        const sections = [
            'history',
            'eligibility',
            'medal-design',
            'selection',
            'first-recipients',
            'recipients-timeline',
            'facts',
            'faqs',
            'gallery'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains first recipients information', () => {
        expect(html).toContain('C. Rajagopalachari');
        expect(html).toContain('Dr. Sarvepalli Radhakrishnan');
        expect(html).toContain('Sir C. V. Raman');
    });

    it('contains search filter for recipients timeline', () => {
        expect(html).toContain('id="recipient-search"');
        expect(html).toContain('id="recipients-tbody"');
    });

    it('contains collapsible FAQs and image gallery', () => {
        expect(html).toContain('class="faq-accordion"');
        expect(html).toContain('class="gallery-grid"');
    });

    it('links shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Bharat Ratna Explorer — Assets & Script', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readPageFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.br-hero');
    });

    it('includes valid interactive script', () => {
        const js = readPageFile('script.js');
        expect(js).toContain('initTabs');
        expect(js).toContain('initRecipientSearch');
        expect(js).toContain('initFaqAccordion');
    });
});

describe('Bharat Ratna Explorer — Landing Page Integration', () => {
    it('is linked on the Awards of India Explorer Landing Page', () => {
        const landingHtml = readLandingFile();
        expect(landingHtml).toContain('Bharat Ratna');
        expect(landingHtml).toContain('../bharat-ratna-explorer/index.html');
    });
});
