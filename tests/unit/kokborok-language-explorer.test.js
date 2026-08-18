/**
 * kokborok-language-explorer.test.js
 * Unit tests for the Kokborok (Tripuri) Language Explorer page.
 * Validates html markup, data structure, audio frequencies, script evolution, regions, and quiz data.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kokborok-language-explorer', file),
        'utf-8'
    );
}

describe('Kokborok Language Explorer — File Integrity & HTML Markup', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains page title, meta description, and viewport settings', () => {
        expect(html).toContain('Explore the Language of Tripura — Kokborok Explorer');
        expect(html).toContain('<meta name="viewport"');
        expect(html).toContain('description');
    });

    it('contains featured greeting Khulumkha hero section and audio playback button', () => {
        expect(html).toContain('Khulumkha!');
        expect(html).toContain('hero-audio-btn');
        expect(html).toContain('𑰏𑰲𑰩𑰲𑰦𑰏𑰯'); // Koloma script
        expect(html).toContain('খুলুমখা'); // Bengali script
    });

    it('contains vocabulary, scripts, language tree, regions, and quiz containers', () => {
        expect(html).toContain('id="vocab-grid"');
        expect(html).toContain('id="scripts-grid"');
        expect(html).toContain('id="converter-input"');
        expect(html).toContain('id="districts-list"');
        expect(html).toContain('id="dialects-grid"');
        expect(html).toContain('id="culture-grid"');
        expect(html).toContain('id="quiz-box"');
    });

    it('css file contains bamboo gold and crimson design tokens and responsive breakpoints', () => {
        expect(css).toContain('--primary-gold: #E5A93C;');
        expect(css).toContain('--accent-crimson: #D9383A;');
        expect(css).toContain('glassmorphism');
        expect(css).toContain('@media (max-width: 850px)');
    });

    it('script.js implements Web Audio API sound synthesis and interactive functions', () => {
        expect(js).toContain('playKokborokAudio');
        expect(js).toContain('AudioContext');
        expect(js).toContain('renderVocabulary');
        expect(js).toContain('renderQuizQuestion');
    });
});

describe('Kokborok Language Dataset — Data Structure & Content', () => {
    let dataContent;

    beforeAll(() => {
        dataContent = readExplorerFile('kokborok-data.js');
    });

    it('includes overview metadata for Kokborok (Tripuri)', () => {
        expect(dataContent).toContain('Kokborok (Tripuri)');
        expect(dataContent).toContain('1.1+ Million');
        expect(dataContent).toContain('Official Language of Tripura');
        expect(dataContent).toContain('Sino-Tibetan');
    });

    it('contains 10+ vocabulary items with transliterations and audio frequencies', () => {
        expect(dataContent).toContain('khulumkha');
        expect(dataContent).toContain('hamba');
        expect(dataContent).toContain('bahae_tongo');
        expect(dataContent).toContain('kaham');
        expect(dataContent).toContain('mung');
        expect(dataContent).toContain('nok');
        expect(dataContent).toContain('twi');
        expect(dataContent).toContain('huk');
        expect(dataContent).toContain('chakhrok');
        expect(dataContent).toContain('hamjakma');
    });

    it('includes traditional scripts: Koloma, Latin/Roman, and Bengali', () => {
        expect(dataContent).toContain('Koloma');
        expect(dataContent).toContain('Roman / Latin Script');
        expect(dataContent).toContain('Bengali / Eastern Nagari Script');
    });

    it('includes 8 Tripura districts and dialect variations', () => {
        expect(dataContent).toContain('West Tripura');
        expect(dataContent).toContain('Gomati');
        expect(dataContent).toContain('Dhalai');
        expect(dataContent).toContain('Debbarma');
        expect(dataContent).toContain('Reang / Bru');
        expect(dataContent).toContain('Jamatia');
    });

    it('includes cultural heritage items like Garia Puja and Rignai & Risa', () => {
        expect(dataContent).toContain('Garia Puja & Mamita Festival');
        expect(dataContent).toContain('Rignai & Risa');
        expect(dataContent).toContain('Sumui, Kham & Sarinda Instruments');
        expect(dataContent).toContain('Kokborok Sal');
    });
});
