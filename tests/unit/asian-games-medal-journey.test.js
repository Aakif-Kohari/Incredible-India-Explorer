/**
 * asian-games-medal-journey.test.js
 * Unit tests for India at the Asian Games — Medal Journey explorer.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/asian-games-medal-journey', file),
        'utf-8'
    );
}

describe('India at the Asian Games Medal Journey — Page Structure & Dataset', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains page title, header, and typography styling', () => {
        expect(html).toContain('India at the Asian Games — Medal Journey');
        expect(html).toContain('Incredible India Explorer — sports history');
        expect(html).toContain("India's Asian&nbsp;Games medal journey");
    });

    it('contains all core interactive elements and containers', () => {
        const ids = [
            'stats',
            'modeToggle',
            'yearMode',
            'track',
            'crumb',
            'panel'
        ];
        ids.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains dual browsing modes: year and sport', () => {
        expect(html).toContain('data-mode="year"');
        expect(html).toContain('data-mode="sport"');
        expect(html).toContain('Browse by year');
        expect(html).toContain('Browse by sport');
    });

    it('contains historical edition data spanning 1951 to 2022/2023', () => {
        expect(html).toContain('1951');
        expect(html).toContain('New Delhi');
        expect(html).toContain('1982');
        expect(html).toContain('2022');
        expect(html).toContain('Hangzhou');
    });

    it('features legendary Indian Asian Games athletes in dataset', () => {
        expect(html).toContain('Sachin Nag');
        expect(html).toContain('Milkha Singh');
        expect(html).toContain('P.T. Usha');
        expect(html).toContain('Neeraj Chopra');
        expect(html).toContain('Lavy Pinto');
    });

    it('contains multi-sport icons and breakdowns', () => {
        const sports = ['Athletics', 'Swimming', 'Football', 'Field hockey', 'Kabaddi', 'Shooting', 'Archery', 'Squash'];
        sports.forEach(sport => {
            expect(html).toContain(sport);
        });
    });

    it('contains comprehensive citations and sources section', () => {
        expect(html).toContain('class="sources"');
        expect(html).toContain('Olympic Council of Asia');
        expect(html).toContain('Olympics.com');
    });
});
