/**
 * national-games-relay-archive.test.js
 * Unit tests for the National Games of India — The Relay Archive page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readPageFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/national-games-relay-archive', file),
        'utf-8'
    );
}

describe('National Games of India — The Relay Archive — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readPageFile('index.html');
    });

    it('contains valid HTML5 structure and correct page title', () => {
        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain('<title>National Games of India — The Relay Archive</title>');
    });

    it('contains all core content sections', () => {
        const requiredSections = [
            'id="history"',
            'id="timeline"',
            'id="map"',
            'id="sports"',
            'id="mascots"'
        ];
        requiredSections.forEach(sec => {
            expect(html).toContain(sec);
        });
    });

    it('contains hero stats and historical milestones', () => {
        expect(html).toContain('National Games <span>of India</span>');
        expect(html).toContain('First edition, Delhi');
        expect(html).toContain('Editions held (2025)');
        expect(html).toContain('1924');
        expect(html).toContain('1940');
        expect(html).toContain('1948');
        expect(html).toContain('1985');
        expect(html).toContain('2023');
        expect(html).toContain('2025');
    });

    it('contains modern relay editions data (26th to 38th)', () => {
        expect(html).toContain('const editions =');
        expect(html).toContain('New Delhi');
        expect(html).toContain('Uttarakhand');
        expect(html).toContain('Savaj (cub)');
        expect(html).toContain('Moga (Indian bison)');
        expect(html).toContain('Mauli (Himalayan monal)');
    });

    it('contains SVG map and interactive pin logic', () => {
        expect(html).toContain('id="indiaMap"');
        expect(html).toContain('id="cityList"');
        expect(html).toContain('id="detailPanel"');
        expect(html).toContain('id="lanes"');
    });

    it('contains sports roster including Olympic and traditional Indian games', () => {
        expect(html).toContain('Kabaddi');
        expect(html).toContain('Kho-Kho');
        expect(html).toContain('Mallakhamb');
        expect(html).toContain('Yogasana');
        expect(html).toContain('Wushu');
        expect(html).toContain('Sqay');
    });
});
