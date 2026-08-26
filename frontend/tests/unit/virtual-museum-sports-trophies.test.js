/**
 * virtual-museum-sports-trophies.test.js
 * Unit tests for the Virtual Museum of Indian Sports Trophies page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readMuseumFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/virtual-museum-sports-trophies', file),
        'utf-8'
    );
}

describe('Virtual Museum of Indian Sports Trophies — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readMuseumFile('index.html');
    });

    it('contains page title and museum brand identity', () => {
        expect(html).toContain('Virtual Museum of Indian Sports Trophies');
        expect(html).toContain('Museum of Indian Sports Trophies');
    });

    it('contains all essential museum sections', () => {
        const sections = [
            'entrance',
            'galleries',
            'timeline',
            'legends',
            'quiz',
            'credits'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains search, filter chips, and gallery containers', () => {
        expect(html).toContain('id="searchInput"');
        expect(html).toContain('id="filterChips"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="timelineScroll"');
        expect(html).toContain('id="legendsGrid"');
        expect(html).toContain('id="quizBox"');
    });

    it('contains exhibit data for Ranji, Durand, Santosh, Beighton, Irani, Duleep, and Rovers Cups', () => {
        expect(html).toContain('Ranji Trophy');
        expect(html).toContain('Durand Cup');
        expect(html).toContain('Santosh Trophy');
        expect(html).toContain('Beighton Cup');
        expect(html).toContain('Irani Cup');
        expect(html).toContain('Duleep Trophy');
        expect(html).toContain('Rovers Cup');
    });

    it('contains sports categories for Cricket, Football, and Hockey', () => {
        expect(html).toContain('data-sport="Cricket"');
        expect(html).toContain('data-sport="Football"');
        expect(html).toContain('data-sport="Hockey"');
    });

    it('contains interactive modal for detailed exhibit display', () => {
        expect(html).toContain('id="modalBackdrop"');
        expect(html).toContain('id="modalContent"');
        expect(html).toContain('id="modalClose"');
        expect(html).toContain('id="modalBody"');
    });

    it('contains interactive quiz questions dataset', () => {
        expect(html).toContain('const quizQuestions = [');
        expect(html).toContain('The Ranji Trophy is named after which cricketer?');
        expect(html).toContain('Which is Asia\'s oldest football tournament');
    });
});
