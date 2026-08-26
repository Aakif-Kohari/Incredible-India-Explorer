import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    const candidates = [
        resolve(__dirname, '../../frontend/odisha-super-cyclone-1999', file),
        resolve(__dirname, '../../odisha-super-cyclone-1999', file),
        resolve(__dirname, '../../../frontend/odisha-super-cyclone-1999', file)
    ];
    for (const c of candidates) {
        if (existsSync(c)) return readFileSync(c, 'utf-8');
    }
    throw new Error(`File ${file} not found`);
}

function readSearchIndex() {
    const candidates = [
        resolve(__dirname, '../../frontend/search-index.js'),
        resolve(__dirname, '../../search-index.js'),
        resolve(__dirname, '../../../frontend/search-index.js')
    ];
    for (const c of candidates) {
        if (existsSync(c)) return readFileSync(c, 'utf-8');
    }
    throw new Error('search-index.js not found');
}

describe('The 1999 Odisha Super Cyclone — Page Structure & Content', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readFile('index.html');
        css = readFile('style.css');
        js = readFile('script.js');
    });

    it('contains page title and header metadata', () => {
        expect(html).toContain('The 1999 Odisha Super Cyclone');
        expect(html).toContain('Incredible India Explorer');
        expect(html).toContain('912 hPa');
        expect(html).toContain('260 km/h');
    });

    it('contains core section IDs', () => {
        expect(html).toContain('id="overview"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="map"');
        expect(html).toContain('id="anatomy"');
        expect(html).toContain('id="surge"');
        expect(html).toContain('id="scales"');
        expect(html).toContain('id="toll"');
        expect(html).toContain('id="lessons"');
        expect(html).toContain('id="compare"');
        expect(html).toContain('id="quiz"');
        expect(html).toContain('id="sources"');
    });

    it('contains barometric gauge elements and controls', () => {
        expect(html).toContain('id="gaugeArc"');
        expect(html).toContain('id="gaugeVal"');
        expect(html).toContain('id="resetGaugeBtn"');
        expect(js).toContain('animateGauge');
    });

    it('contains interactive timeline slider and stage controls', () => {
        expect(html).toContain('id="tlSlider"');
        expect(html).toContain('id="tlDay"');
        expect(html).toContain('id="tlTitle"');
        expect(html).toContain('id="tlBody"');
        expect(html).toContain('id="tlPrev"');
        expect(html).toContain('id="tlNext"');
    });

    it('contains interactive SVG district map and district data', () => {
        expect(html).toContain('data-d="jagatsinghpur"');
        expect(html).toContain('data-d="kendrapara"');
        expect(html).toContain('data-d="bhadrak"');
        expect(html).toContain('data-d="balasore"');
        expect(html).toContain('data-d="puri"');
        expect(html).toContain('id="mapPanel"');
        expect(js).toContain('districtData');
    });

    it('contains meteorological anatomy tabs and metric elements', () => {
        expect(html).toContain('data-tab="eye"');
        expect(html).toContain('data-tab="eyewall"');
        expect(html).toContain('data-tab="rainbands"');
        expect(html).toContain('data-tab="engine"');
        expect(html).toContain('id="anatomyTitle"');
        expect(html).toContain('id="anatomyDesc"');
    });

    it('contains storm surge simulator buttons and water animation', () => {
        expect(html).toContain('data-surge="1"');
        expect(html).toContain('data-surge="8"');
        expect(html).toContain('id="surgeWater"');
        expect(html).toContain('id="surgeDesc"');
    });

    it('contains disaster management rebuild accordion and comparative chart', () => {
        expect(html).toContain('class="acc-list"');
        expect(html).toContain('OSDMA');
        expect(html).toContain('Phailin');
        expect(html).toContain('Fani');
        expect(html).toContain('Dana');
    });

    it('contains interactive knowledge check quiz with feedback and scoring', () => {
        expect(html).toContain('id="quizQuestionsContainer"');
        expect(html).toContain('id="quizScoreBadge"');
        expect(html).toContain('id="resetQuizBtn"');
        expect(js).toContain('quizQuestions');
    });

    it('supports Dark and Light theme toggle and includes JSON-LD Schema', () => {
        expect(html).toContain('id="theme-toggle"');
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
        expect(html).toContain('"@type": "Event"');
        expect(css).toContain('[data-theme="light"]');
    });
});

describe('The 1999 Odisha Super Cyclone — Search Index Integration', () => {
    it('is registered in frontend/search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('1999 Odisha Super Cyclone');
        expect(searchIndex).toContain('frontend/odisha-super-cyclone-1999/index.html');
    });
});
