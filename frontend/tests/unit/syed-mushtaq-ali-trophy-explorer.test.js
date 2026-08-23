import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/syed-mushtaq-ali-trophy-explorer', file),
        'utf-8'
    );
}

describe('Syed Mushtaq Ali Trophy Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section and tournament title', () => {
        expect(html).toContain('class="smat-hero"');
        expect(html).toContain('Syed Mushtaq Ali Trophy');
        expect(html).toContain('Twenty20 Format (20 Overs)');
        expect(html).toContain('38 Domestic State Teams');
    });

    it('contains trophy section with vector artwork and credits', () => {
        expect(html).toContain('id="trophy"');
        expect(html).toContain('smat-trophy-svg');
        expect(html).toContain('The BCCI T20 Trophy');
    });

    it('explains Syed Mushtaq Ali biography and tournament history', () => {
        expect(html).toContain('Syed Mushtaq Ali (1914–2005)');
        expect(html).toContain('first Indian cricketer to score a Test century on overseas soil');
        expect(html).toContain('Old Trafford, Manchester');
        expect(html).toContain('2006–07 as the Inter-State T20 Championship');
    });

    it('implements team-versus-team tournament visualization', () => {
        expect(html).toContain('id="h2h"');
        expect(html).toContain('id="teamSelectA"');
        expect(html).toContain('id="teamSelectB"');
        expect(html).toContain('id="h2hDisplay"');
        expect(js).toContain('teamsData');
        expect(js).toContain('renderH2H');
    });

    it('lists champions and roll of honour', () => {
        expect(html).toContain('id="champions"');
        expect(html).toContain('id="championsTable"');
        expect(js).toContain('championsData');
        expect(js).toContain('Tamil Nadu');
        expect(js).toContain('Mumbai');
        expect(js).toContain('Punjab');
    });

    it('documents all-time records and milestones', () => {
        expect(html).toContain('Shreyas Iyer &middot; 147');
        expect(html).toContain('Punjab &middot; 275/6');
        expect(html).toContain('Deepak Chahar &middot; 6/7');
        expect(html).toContain('Tamil Nadu (3 Titles)');
    });

    it('includes verified sources and BCCI references', () => {
        expect(html).toContain('id="sources"');
        expect(html).toContain('Board of Control for Cricket in India (BCCI)');
        expect(html).toContain('ESPNcricinfo');
    });
});
