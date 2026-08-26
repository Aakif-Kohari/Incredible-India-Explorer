import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/irani-cup-explorer', file),
        'utf-8'
    );
}

describe('Irani Cup Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section and tournament title', () => {
        expect(html).toContain('class="irani-hero"');
        expect(html).toContain('The Irani Cup');
        expect(html).toContain('First-Class 5-Day Format');
        expect(html).toContain('Rest of India vs Ranji Champion');
    });

    it('contains trophy section with vector artwork and credits', () => {
        expect(html).toContain('id="trophy"');
        expect(html).toContain('irani-trophy-svg');
        expect(html).toContain('The Silver Challenge Cup');
        expect(html).toContain('Trophy Imagery &amp; Vector Artwork');
    });

    it('explains origin, history and Zal R. Irani namesake', () => {
        expect(html).toContain('Zal R. Irani');
        expect(html).toContain('Silver Jubilee of the Ranji Trophy');
        expect(html).toContain('1959–60');
    });

    it('documents historic venues across India', () => {
        expect(html).toContain('Wankhede Stadium');
        expect(html).toContain('M. Chinnaswamy Stadium');
        expect(html).toContain('Feroz Shah Kotla');
        expect(html).toContain('BRSABV Ekana Stadium');
    });

    it('implements year-by-year winner timeline in script.js and HTML', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="timelineContainer"');
        expect(html).toContain('id="timelineSearch"');
        expect(js).toContain('iraniWinnersData');
        expect(js).toContain('2024–25');
        expect(js).toContain('Mumbai');
        expect(js).toContain('Rest of India');
    });

    it('highlights notable records and milestones', () => {
        expect(html).toContain('Gundappa Viswanath &middot; 247');
        expect(html).toContain('Sarfaraz Khan &middot; 222*');
        expect(html).toContain('Anil Kumble &middot; 8/49');
        expect(html).toContain('Sachin Tendulkar');
    });

    it('includes verified sources and BCCI references', () => {
        expect(html).toContain('id="sources"');
        expect(html).toContain('Board of Control for Cricket in India (BCCI)');
        expect(html).toContain('ESPNcricinfo &amp; CricketArchive');
    });
});
