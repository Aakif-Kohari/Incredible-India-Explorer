/**
 * ipl-trophy-explorer.test.js
 * Unit tests for the IPL Trophy Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/ipl-trophy-explorer', file),
        'utf-8'
    );
}

describe('IPL Trophy Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains page title and header metadata', () => {
        expect(html).toContain('The IPL Trophy — Explore India\'s Premier T20 League');
        expect(html).toContain('IPL TROPHY EXPLORER');
        expect(html).toContain('Est. 2008 · BCCI · Twenty20');
    });

    it('contains all essential content sections', () => {
        const sections = [
            'history',
            'timeline',
            'franchises',
            'honours',
            'caps',
            'records'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains the season timeline elements', () => {
        expect(html).toContain('id="towersTrack"');
        expect(html).toContain('id="seasonSlider"');
        expect(html).toContain('id="champName"');
        expect(html).toContain('id="runnerUp"');
        expect(html).toContain('id="orangeName"');
        expect(html).toContain('id="purpleName"');
    });

    it('contains franchise and honors containers', () => {
        expect(html).toContain('id="franchiseGrid"');
        expect(html).toContain('id="honoursList"');
        expect(html).toContain('id="capsTableBody"');
        expect(html).toContain('id="recordsGrid"');
    });

    it('contains trophy history and inscription details', () => {
        expect(html).toContain('Yatra Pratibha Avsara Prapnotihi');
        expect(html).toContain('talent meets opportunity');
        expect(html).toContain('Orra');
    });

    it('contains complete season data array in script', () => {
        expect(html).toContain('const seasons = [');
        expect(html).toContain('Rajasthan Royals');
        expect(html).toContain('Chennai Super Kings');
        expect(html).toContain('Mumbai Indians');
        expect(html).toContain('Kolkata Knight Riders');
        expect(html).toContain('Sunrisers Hyderabad');
        expect(html).toContain('Gujarat Titans');
        expect(html).toContain('Royal Challengers Bengaluru');
    });
});
