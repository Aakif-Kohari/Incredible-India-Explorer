import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const p1 = resolve(__dirname, '../../ravidas-ghat', file);
    if (existsSync(p1)) return readFileSync(p1, 'utf-8');
    return readFileSync(resolve(__dirname, '../../../frontend/ravidas-ghat', file), 'utf-8');
}

describe('Ravidas Ghat Varanasi — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains page title and Devanagari script branding', () => {
        expect(html).toContain('Ravidas Ghat');
        expect(html).toContain('संत रविदास घाट');
        expect(html).toContain('Varanasi');
        expect(html).toContain('Incredible India Explorer');
    });

    it('contains fact strip and key riverfront metrics', () => {
        expect(html).toContain('class="fact-strip"');
        expect(html).toContain('84');
        expect(html).toContain('25');
        expect(html).toContain('2009');
    });

    it('contains tab bar and core panel sections', () => {
        expect(html).toContain('id="tabbar"');
        expect(html).toContain('id="panels"');
        expect(html).toContain('Sant Ravidas');
        expect(html).toContain('History');
        expect(html).toContain('Teachings');
        expect(html).toContain('Bani & Verses');
        expect(html).toContain('Jayanti');
        expect(html).toContain('Pilgrimage Circuit');
    });

    it('contains interactive sacred Bani & Verses', () => {
        expect(html).toContain('class="bani-card"');
        expect(html).toContain('class="bani-text"');
        expect(html).toContain('मन चंगा तो कठौती में गंगा');
        expect(html).toContain('बेगमपुरा सहर को नाउ');
    });

    it('contains Southern Varanasi pilgrimage circuit', () => {
        expect(html).toContain('class="circuit-grid"');
        expect(html).toContain('class="circuit-card"');
        expect(html).toContain('Shri Guru Ravidas Janam Asthan Mandir');
        expect(html).toContain('Assi Ghat');
    });

    it('contains flip cards and history accordion', () => {
        expect(html).toContain('class="teach-grid"');
        expect(html).toContain('class="flip-card"');
        expect(html).toContain('class="accordion"');
        expect(html).toContain('class="acc-btn"');
    });

    it('contains image gallery and lightbox modal elements', () => {
        expect(html).toContain('class="gallery-grid"');
        expect(html).toContain('id="lightbox"');
        expect(html).toContain('id="lbImg"');
        expect(html).toContain('id="lbClose"');
    });

    it('includes Schema.org structured data (TouristAttraction JSON-LD)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "TouristAttraction"');
        expect(html).toContain('"latitude": 25.284');
        expect(html).toContain('"longitude": 83.009');
    });
});

describe('Ravidas Ghat Varanasi — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndexPath = resolve(__dirname, '../../search-index.js');
        const p = existsSync(searchIndexPath) ? searchIndexPath : resolve(__dirname, '../../../frontend/search-index.js');
        const searchIndex = readFileSync(p, 'utf-8');
        expect(searchIndex).toContain('Ravidas Ghat — Varanasi Spiritual Legacy & Living Culture Profile');
        expect(searchIndex).toContain('frontend/ravidas-ghat/index.html');
    });
});
