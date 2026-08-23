/**
 * saura-painting-explorer.test.js
 * Unit tests for the Saura Painting Explorer (Issue #1690).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/saura-painting-explorer', file),
        'utf-8'
    );
}

function readVisualizerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/indian-art-forms-visualizer', file),
        'utf-8'
    );
}

describe('Saura Painting Explorer — Page Structure & HTML', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title and meta description', () => {
        expect(html).toContain('Saura Painting Explorer');
        expect(html).toContain("Odisha's ancient Saura tribal art");
    });

    it('contains all required explorer content sections', () => {
        const requiredSections = [
            'history',
            'region',
            'symbols',
            'gallery',
            'palette',
            'materials',
            'quiz',
            'references'
        ];
        requiredSections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('loads the stylesheet and scripts', () => {
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="data.js"');
        expect(html).toContain('src="script.js"');
    });

    it('links back to the Indian Art Forms Visualizer', () => {
        expect(html).toContain('../indian-art-forms-visualizer/index.html');
    });

    it('contains the symbol detail modal markup', () => {
        expect(html).toContain('id="symbol-modal"');
        expect(html).toContain('id="modal-close-btn"');
        expect(html).toContain('id="modal-body-content"');
    });
});

describe('Saura Painting Explorer — Data Module (data.js)', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('data.js');
    });

    it('defines SAURA_DATA with the expected top-level keys', () => {
        expect(dataContent).toContain('window.SAURA_DATA =');
        expect(dataContent).toContain('symbols:');
        expect(dataContent).toContain('gallery:');
        expect(dataContent).toContain('palette:');
        expect(dataContent).toContain('materials:');
        expect(dataContent).toContain('quiz:');
        expect(dataContent).toContain('references:');
    });

    it('contains at least 8 tribal symbols with meaning and significance', () => {
        expect(dataContent).toContain('Iconic Human Figure');
        expect(dataContent).toContain('Tree of Life');
        expect(dataContent).toContain('Sun & Moon');
        expect(dataContent).toContain('Fish-Scale Border');
        expect(dataContent).toContain('Deity Figure');
        expect(dataContent).toContain('Horse & Rider');
        expect(dataContent).toContain('Peacock');
        expect(dataContent).toContain('Elephant');
        expect(dataContent).toContain('meaning:');
        expect(dataContent).toContain('significance:');
    });

    it('contains at least 6 artwork gallery entries', () => {
        expect(dataContent).toContain('Harvest Festival Celebration');
        expect(dataContent).toContain('Wedding Procession');
        expect(dataContent).toContain('Forest Hunt');
        expect(dataContent).toContain('Ancestral Spirit Journey');
        expect(dataContent).toContain('Idital Deity Propitiation');
        expect(dataContent).toContain('Daily Village Life');
    });

    it('documents the traditional color palette with natural pigment sources', () => {
        expect(dataContent).toContain('Earth Red');
        expect(dataContent).toContain('Laterite soil');
        expect(dataContent).toContain('White');
        expect(dataContent).toContain('River clay');
        expect(dataContent).toContain('Black');
        expect(dataContent).toContain('Charcoal');
        expect(dataContent).toContain('hex:');
        expect(dataContent).toContain('source:');
    });

    it('documents the traditional materials including bamboo brush and mud wall canvas', () => {
        expect(dataContent).toContain('Bamboo Brush');
        expect(dataContent).toContain('Finger Painting');
        expect(dataContent).toContain('Mud Wall Canvas');
        expect(dataContent).toContain('Natural Pigments');
        expect(dataContent).toContain('Rice Paste');
    });

    it('includes Odisha-specific cultural references (Rayagada, Gajapati, Lanjia Saura, GI tag)', () => {
        expect(dataContent).toContain('Rayagada');
        expect(dataContent).toContain('Gajapati');
        expect(dataContent).toContain('Lanjia Saura');
        expect(dataContent).toContain('GI');
    });

    it('includes a 5-question quiz', () => {
        // Count "question:" occurrences in the quiz array
        const matches = dataContent.match(/question:/g);
        expect(matches).not.toBeNull();
        expect(matches.length).toBeGreaterThanOrEqual(5);
    });

    it('includes academic and institutional references', () => {
        expect(dataContent).toContain('IGNCA');
        expect(dataContent).toContain('Odisha State Tribal Museum');
        expect(dataContent).toContain('GI Tag');
        expect(dataContent).toContain('UNESCO');
    });
});

describe('Saura Painting Explorer — Landing Page Integration', () => {
    let visualizerScript;

    beforeAll(() => {
        visualizerScript = readVisualizerFile('script.js');
    });

    it('is registered on the Indian Art Forms Visualizer', () => {
        expect(visualizerScript).toContain("id: 'saura'");
        expect(visualizerScript).toContain("name: 'Saura Painting'");
        expect(visualizerScript).toContain("region: 'Odisha'");
        expect(visualizerScript).toContain("../saura-painting-explorer/index.html");
    });
});
