import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/himachal-forest-fire-hazards', file),
        'utf-8'
    );
}

describe('Himachal Forest Fire Hazards — Page Structure & Content (#3575)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with title and key statistics', () => {
        expect(html).toContain('class="hero"');
        expect(html).toContain('Forest Fire Hazards of Himachal Pradesh');
        expect(html).toContain('2,613');
        expect(html).toContain('27.7%');
    });

    it('contains all required requirement sections', () => {
        expect(html).toContain('id="forest-regions"');
        expect(html).toContain('id="seasons"');
        expect(html).toContain('id="factors"');
        expect(html).toContain('id="ecological"');
        expect(html).toContain('id="wildlife"');
        expect(html).toContain('id="detection"');
        expect(html).toContain('id="prevention"');
        expect(html).toContain('id="map"');
        expect(html).toContain('id="sources"');
    });

    it('documents forest regions and chir pine fire vulnerability', () => {
        expect(html).toContain('chir pine');
        expect(html).toContain('Banj oak');
        expect(html).toContain('Kangra');
    });

    it('documents the fire season timing', () => {
        expect(html).toContain('15 April');
        expect(html).toContain('15 June');
    });

    it('documents contributing factors', () => {
        expect(html).toContain('resin tapping');
        expect(html).toContain('grazing');
        expect(html).toContain('cigarettes');
    });

    it('documents ecological and wildlife impacts', () => {
        expect(html).toContain('black carbon');
        expect(html).toContain('glacial lakes');
        expect(html).toContain('breeding');
    });

    it('documents fire detection and response systems', () => {
        expect(html).toContain('MODIS');
        expect(html).toContain('SNPP-VIIRS');
        expect(html).toContain('Fire Weather Index');
        expect(html).toContain('FIRE');
    });

    it('documents prevention measures', () => {
        expect(html).toContain('fire lines');
        expect(html).toContain('briquette');
    });

    it('includes an interactive map with multiple locations', () => {
        expect(html).toContain('id="fire-map"');
        expect(html).toContain('openstreetmap.org/export/embed.html');
        expect(html).toContain('data-place="kullu"');
        expect(html).toContain('data-place="mandi"');
        expect(html).toContain('data-place="nahan"');
    });

    it('includes cited sources', () => {
        expect(html).toContain('id="sources"');
        expect(html).toContain('fsi.nic.in');
        expect(html).toContain('tribuneindia.com');
    });

    it('uses accessible, semantic markup for responsive design', () => {
        expect(html).toContain('aria-labelledby="forest-regions-heading"');
        expect(html).toContain('name="viewport"');
        expect(html).toContain('skip-link');
    });
});

describe('Himachal Forest Fire Hazards — Scripts & Styles', () => {
    it('style.css defines hero, cards, and map layout components', () => {
        const css = readFile('style.css');
        expect(css).toContain('.hero');
        expect(css).toContain('.map-layout');
        expect(css).toContain('.fact-list');
        expect(css).toContain('light-theme');
    });

    it('script.js wires the interactive map and theme toggle', () => {
        const js = readFile('script.js');
        expect(js).toContain('initMap');
        expect(js).toContain('initThemeToggle');
        expect(js).toContain('kullu');
        expect(js).toContain('mandi');
    });
});