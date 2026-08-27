/**
 * irula-language-explorer.test.js
 * Unit tests for the Irula Language Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/irula-language-explorer', file),
        'utf-8'
    );
}

describe('Irula Language Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title and header metadata', () => {
        expect(html).toContain('Irula — Language of the Nilgiri Hills');
        expect(html).toContain('இருளர் மொழி');
        expect(html).toContain('Nilgiri Hills');
    });

    it('contains linguistic classification details', () => {
        expect(html).toContain('Southern Dravidian');
        expect(html).toContain('Tamil–Kannada');
        expect(html).toContain('Tamil–Kota–Toda–Irula');
        expect(html).toContain('Kamil Zvelebil');
    });

    it('contains greeting section with verified default greeting', () => {
        expect(html).toContain('id="greeting-section"');
        expect(html).toContain('வணக்கம் / எந்நா சுகமா?');
        expect(html).toContain('vanaṅga / ennā sugamā?');
    });

    it('contains populated common vocabulary of 10 words', () => {
        expect(html).toContain('id="words-section"');
        expect(html).toContain('defaultWords = [');
        expect(html).toContain('Water');
        expect(html).toContain('நீரு');
        expect(html).toContain('Forest');
        expect(html).toContain('காடு');
        expect(html).toContain('Honey');
        expect(html).toContain('தேனு');
        expect(html).toContain('Snake');
        expect(html).toContain('பாம்பு');
        expect(html).toContain('Elephant');
        expect(html).toContain('ஆனெ');
    });

    it('covers key geographical regions (Tamil Nadu, Kerala, Karnataka)', () => {
        expect(html).toContain('Tamil Nadu');
        expect(html).toContain('Kerala');
        expect(html).toContain('Karnataka');
        expect(html).toContain('Nilgiris');
    });

    it('contains cultural heritage insights', () => {
        expect(html).toContain('Forest livelihood');
        expect(html).toContain('Oral tradition');
        expect(html).toContain('Belief &amp; identity');
        expect(html).toContain('Doddu Aatam');
    });
});
