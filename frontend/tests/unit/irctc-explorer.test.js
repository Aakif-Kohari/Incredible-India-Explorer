/** Unit tests for the IRCTC Explorer page (issue #2642). */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
function readExplorerFile(file) {
    return readFileSync(resolve(__dirname, '../../frontend/irctc-explorer', file), 'utf-8');
}

describe('IRCTC Explorer — issue requirements', () => {
    let html;
    let js;
    let css;
    beforeAll(() => {
        html = readExplorerFile('index.html');
        js = readExplorerFile('script.js');
        css = readExplorerFile('style.css');
    });

    it('has the required history, services, timeline, digital and sources sections', () => {
        ['origin', 'services', 'timeline', 'digital', 'sources'].forEach(id => expect(html).toContain(`id="${id}"`));
    });

    it('documents IRCTC origin and required service categories', () => {
        expect(html).toContain('27 September 1999');
        expect(js).toContain('Online railway ticketing');
        expect(js).toContain('Catering & eCatering');
        expect(js).toContain('Tourism & packaged travel');
        expect(js).toContain('Rail Connect & digital tools');
    });

    it('contains an interactive timeline with major digital milestones', () => {
        [1999, 2002, 2005, 2014, 2016, 2018, 2022].forEach(year => expect(js).toContain(`year: ${year}`));
        expect(js).toContain('renderTimeline');
        expect(html).toContain('data-era="online"');
        expect(html).toContain('data-era="modern"');
    });

    it('contains service and timeline filter controls', () => {
        expect(html).toContain('data-service="ticketing"');
        expect(html).toContain('data-service="catering"');
        expect(html).toContain('data-service="tourism"');
        expect(html).toContain('data-service="digital"');
        expect(js).toContain('addEventListener');
    });

    it('includes source links and responsive styling', () => {
        expect(html).toContain('indianrailways.gov.in');
        expect(html).toContain('ecatering.irctc.co.in');
        expect(html).toContain('bharatgaurav.irctc.co.in');
        expect(css).toContain('@media(max-width:850px)');
        expect(css.length).toBeGreaterThan(5000);
    });

    it('has one primary heading and the shared site stylesheet', () => {
        expect((html.match(/<h1[\s>]/g) || []).length).toBe(1);
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});
