/**
 * usha-mehta-explorer.test.js
 * Unit tests for the Usha Mehta Explorer page.
 * Validates required sections, tab navigation, biographical accuracy, 
 * Congress Radio transmission facts, Yerwada trial details, accessibility,
 * script/style assets, and system index integration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../usha-mehta-explorer', file),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../search-index.js'),
        'utf-8'
    );
}

function readWomenData() {
    return readFileSync(
        resolve(__dirname, '../../forgotten-women-of-indian-history/women-data.js'),
        'utf-8'
    );
}

describe('Usha Mehta Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title, kicker, and lifespan', () => {
        expect(html).toContain('class="um-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Usha Mehta');
        expect(html).toContain('Voice of the Secret Congress Radio');
        expect(html).toContain('25 March 1920');
        expect(html).toContain('11 August 2000');
    });

    it('contains all required content sections and data-tab attributes', () => {
        const sections = ['biography', 'timeline', 'congress-radio', 'imprisonment', 'legacy', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab buttons', () => {
        const tabs = ['Biography', 'Timeline', 'Congress Radio', 'Imprisonment &amp; Trial', 'Post-Independence &amp; Awards', 'References'];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('contains key biographical details', () => {
        expect(html).toContain('Saras');
        expect(html).toContain('Wilson College');
        expect(html).toContain('Simon Commission');
        expect(html).toContain('Padma Vibhushan');
    });

    it('details the Secret Congress Radio operation and 42.34m wavelength', () => {
        expect(html).toContain('42.34 metres');
        expect(html).toContain('Quit India');
        expect(html).toContain('27 August 1942');
        expect(html).toContain('Gowalia Tank');
        expect(html).toContain('Ram Manohar Lohia');
        expect(html).toContain('Parekh Wadi');
    });

    it('describes the raid on Parekh Wadi and Yerwada Jail imprisonment', () => {
        expect(html).toContain('12 November 1942');
        expect(html).toContain('Vande Mataram');
        expect(html).toContain('solitary confinement');
        expect(html).toContain('Yerwada');
    });

    it('highlights post-independence academic contributions and honors', () => {
        expect(html).toContain('University of Mumbai');
        expect(html).toContain('Department of Civics and Politics');
        expect(html).toContain('Padma Vibhushan');
        expect(html).toContain('1998');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Usha Mehta Explorer — Asset Integrity', () => {
    it('includes a non-empty stylesheet with expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.um-hero');
        expect(css).toContain('.um-tabs');
        expect(css).toContain('.um-timeline');
        expect(css).toContain('.um-radio-sim-container');
    });

    it('includes an interactive script with required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain('initRadioSimulator');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
    });
});

describe('Usha Mehta Explorer — System Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIdx = readSearchIndex();
        expect(searchIdx).toContain('Usha Mehta');
        expect(searchIdx).toContain('frontend/usha-mehta-explorer/index.html');
    });

    it('is registered in forgotten-women-of-indian-history/women-data.js with url property', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "usha-mehta"');
        expect(womenData).toContain('url: "../usha-mehta-explorer/"');
    });
});
