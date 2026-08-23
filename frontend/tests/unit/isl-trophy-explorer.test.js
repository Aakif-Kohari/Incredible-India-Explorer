import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/isl-trophy-explorer', file),
        'utf-8'
    );
}

describe('ISL Trophy Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section and tournament title', () => {
        expect(html).toContain('class="isl-hero"');
        expect(html).toContain('The ISL Trophy');
        expect(html).toContain('India\'s Top-Flight Football League');
        expect(html).toContain('ISL Cup &amp; League Shield');
    });

    it('contains trophy section with vector artwork and design credits', () => {
        expect(html).toContain('id="trophy"');
        expect(html).toContain('isl-trophy-svg');
        expect(html).toContain('The Silver Champions Cup');
        expect(html).toContain('Frazer and Haws');
    });

    it('explains league history and AFC Champions League pathway', () => {
        expect(html).toContain('October 2014');
        expect(html).toContain('Asian Football Confederation (AFC)');
        expect(html).toContain('AFC Champions League 2');
    });

    it('implements season-by-season club timeline with search and filters', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="timelineContainer"');
        expect(html).toContain('id="timelineSearch"');
        expect(js).toContain('seasonsData');
        expect(js).toContain('2023–24');
        expect(js).toContain('Mumbai City FC');
        expect(js).toContain('Mohun Bagan');
    });

    it('displays participating clubs and stadiums', () => {
        expect(html).toContain('id="clubs"');
        expect(html).toContain('id="clubsGrid"');
        expect(js).toContain('clubsData');
        expect(js).toContain('Mohun Bagan Super Giant');
        expect(js).toContain('Bengaluru FC');
        expect(js).toContain('Kerala Blasters FC');
    });

    it('documents Golden Boot winners and major milestones', () => {
        expect(html).toContain('Elano Blumer (2014)');
        expect(html).toContain('Ferran Corominas');
        expect(html).toContain('Sunil Chhetri');
        expect(html).toContain('Kolkata Derby in the ISL');
    });

    it('includes verified sources and AIFF/ISL references', () => {
        expect(html).toContain('id="sources"');
        expect(html).toContain('Indian Super League (ISL)');
        expect(html).toContain('All India Football Federation (AIFF)');
    });
});
