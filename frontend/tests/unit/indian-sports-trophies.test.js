/**
 * indian-sports-trophies.test.js
 * Unit tests for the Indian Sports & Trophies Interactive Archive (Issue #2516).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/indian-sports-trophies', file),
        'utf-8'
    );
}

describe('Indian Sports & Trophies Interactive Archive — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains correct page title and brand identity', () => {
        expect(html).toContain('Indian Sports & Trophies — Interactive Archive');
        expect(html).toContain('Sports &amp; Trophies');
        expect(html).toContain("India's Sporting");
    });

    it('contains all essential core sections', () => {
        const sections = [
            'map',
            'rail',
            'archive',
            'timeline'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains interactive controls for search, chips, and spotlight', () => {
        expect(html).toContain('id="trophySearch"');
        expect(html).toContain('id="searchClear"');
        expect(html).toContain('id="chipRow"');
        expect(html).toContain('id="zoneGrid"');
        expect(html).toContain('id="railRow"');
        expect(html).toContain('id="trophyGrid"');
        expect(html).toContain('id="timelineRow"');
        expect(html).toContain('id="spotlightBtn"');
    });

    it('includes all 14 sports categories in the dataset', () => {
        const sports = [
            'Cricket',
            'Hockey',
            'Football',
            'Badminton',
            'Tennis',
            'Wrestling',
            'Boxing',
            'Athletics',
            'Kabaddi',
            'Shooting',
            'Chess',
            'Table Tennis',
            'Basketball',
            'Volleyball'
        ];
        sports.forEach(sport => {
            expect(html).toContain(sport);
        });
    });

    it('contains major historic trophies and tournaments', () => {
        expect(html).toContain('Ranji Trophy');
        expect(html).toContain('Durand Cup');
        expect(html).toContain('Santosh Trophy');
        expect(html).toContain('Thomas Cup');
        expect(html).toContain('Border-Gavaskar Trophy');
        expect(html).toContain('Olympic Hockey Gold');
        expect(html).toContain('Pro Kabaddi League Trophy');
        expect(html).toContain('Olympic Javelin Gold');
    });

    it('contains modal dialog structure for detail view', () => {
        expect(html).toContain('id="modalBackdrop"');
        expect(html).toContain('id="modalPanel"');
        expect(html).toContain('id="modalClose"');
        expect(html).toContain('id="modalTitle"');
        expect(html).toContain('id="modalSport"');
        expect(html).toContain('id="modalDesc"');
        expect(html).toContain('id="modalYear"');
    });

    it('supports keyboard accessibility and responsive navigation', () => {
        expect(html).toContain('id="navToggle"');
        expect(html).toContain('aria-expanded');
        expect(html).toContain('aria-label');
        expect(html).toContain('role="dialog"');
    });
});
