import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/amul-brand-explorer', file),
        'utf-8'
    );
}

describe('Amul Brand Explorer — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('renders hero section and brand tagline', () => {
        expect(html).toContain('class="amul-hero"');
        expect(html).toContain('The Taste of India');
        expect(html).toContain('White Revolution');
        expect(html).toContain('3.6 Million Dairy Farmers');
    });

    it('contains brand identity section with vector artwork and credits', () => {
        expect(html).toContain('id="identity"');
        expect(html).toContain('amul-logo-svg');
        expect(html).toContain('GCMMF');
    });

    it('explains founding history, Sardar Patel, Tribhuvandas Patel, and Dr. Verghese Kurien', () => {
        expect(html).toContain('Sardar Vallabhbhai Patel');
        expect(html).toContain('Tribhuvandas Patel');
        expect(html).toContain('Dr. Verghese Kurien');
        expect(html).toContain('H. M. Dalaya');
        expect(html).toContain('December 14, 1946');
    });

    it('explains the 3-tier Anand cooperative model', () => {
        expect(html).toContain('id="cooperative"');
        expect(html).toContain('Village Dairy Societies (VDCS)');
        expect(html).toContain('District Cooperative Milk Unions');
        expect(html).toContain('State Cooperative Federation (GCMMF)');
    });

    it('implements interactive milestones timeline with search and category filters', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="timelineContainer"');
        expect(html).toContain('id="timelineSearch"');
        expect(js).toContain('milestonesData');
        expect(js).toContain('1946');
        expect(js).toContain('Operation Flood');
    });

    it('displays major product categories', () => {
        expect(html).toContain('id="products"');
        expect(html).toContain('id="productsGrid"');
        expect(js).toContain('productsData');
        expect(js).toContain('Amul Butter & Ghee');
        expect(js).toContain('Amul Ice Cream & Kulfi');
    });

    it('covers Amul Girl advertising campaigns and current presence', () => {
        expect(html).toContain('Amul Girl');
        expect(html).toContain('Utterly Butterly Delicious');
        expect(html).toContain('Sylvester da Cunha');
        expect(html).toContain('Current Global Presence');
    });

    it('includes verified sources and GCMMF references', () => {
        expect(html).toContain('id="sources"');
        expect(html).toContain('Gujarat Co-operative Milk Marketing Federation (GCMMF)');
        expect(html).toContain('National Dairy Development Board (NDDB)');
    });
});
