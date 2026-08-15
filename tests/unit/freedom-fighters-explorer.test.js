import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-fighters-explorer', file),
        'utf-8'
    );
}

describe('Freedom Fighters of India Explorer — Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains hero section introducing freedom struggle', () => {
        expect(html).toContain('ffe-hero');
        expect(html).toContain('Freedom Fighters of India');
        expect(html).toContain('1857');
        expect(html).toContain('1947');
    });

    it('contains search by freedom fighter name element', () => {
        expect(html).toContain('id="ffe-search-input"');
    });

    it('contains region and state filters', () => {
        expect(html).toContain('id="ffe-region-filter"');
        expect(html).toContain('North');
        expect(html).toContain('South');
        expect(html).toContain('East');
        expect(html).toContain('West');
    });

    it('contains movement filters including Tribal and Women Leaders', () => {
        expect(html).toContain('id="ffe-movement-filter"');
        expect(html).toContain('1857 Revolt');
        expect(html).toContain('Revolutionary');
        expect(html).toContain('Non-Violent');
        expect(html).toContain('INA');
        expect(html).toContain('Tribal');
        expect(html).toContain('Women Leaders');
    });

    it('contains interactive timeline section 1857-1947', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="ffe-timeline-slider"');
        expect(html).toContain('id="ffe-timeline-container"');
    });

    it('contains freedom fighter cards and featured section', () => {
        expect(html).toContain('id="featured-heroes"');
        expect(html).toContain('id="ffe-cards-grid"');
    });
});

describe('Freedom Fighters Explorer — JavaScript Logic', () => {
    let js;

    beforeAll(() => {
        js = readExplorerFile('script.js');
    });

    it('defines Freedom Fighters dataset with key properties', () => {
        expect(js).toContain('FREEDOM_FIGHTERS_DATA');
        expect(js).toContain('Mahatma Gandhi');
        expect(js).toContain('Subhas Chandra Bose');
        expect(js).toContain('Bhagat Singh');
        expect(js).toContain('Rani Lakshmibai');
        expect(js).toContain('Alluri Sitarama Raju');
        expect(js).toContain('Birsa Munda');
        expect(js).toContain('Sarojini Naidu');
    });

    it('contains search and filter logic', () => {
        expect(js).toContain('filterData');
        expect(js).toContain('renderCards');
        expect(js).toContain('renderTimeline');
    });
});
