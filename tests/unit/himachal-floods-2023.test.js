import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/himachal-floods-2023-explorer', file),
        'utf-8'
    );
}

describe('Himachal Floods 2023 — Page Structure & Content (#3566)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with title and key statistics', () => {
        expect(html).toContain('class="hero"');
        expect(html).toContain('2023 Himachal Pradesh Floods');
        expect(html).toContain('300+');
        expect(html).toContain('₹10,000 cr+');
    });

    it('contains all required requirement sections', () => {
        expect(html).toContain('id="overview"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="rainfall"');
        expect(html).toContain('id="geography"');
        expect(html).toContain('id="affected"');
        expect(html).toContain('id="landslides"');
        expect(html).toContain('id="infrastructure"');
        expect(html).toContain('id="response"');
        expect(html).toContain('id="preparedness"');
        expect(html).toContain('id="map"');
        expect(html).toContain('id="sources"');
    });

    it('documents the event timeline of the 2023 monsoon', () => {
        expect(html).toContain('24 June 2023');
        expect(html).toContain('8–11 July');
        expect(html).toContain('9 July');
        expect(html).toContain('13 July');
        expect(html).toContain('14 August');
    });

    it('provides extreme rainfall context', () => {
        expect(html).toContain('60% wetter');
        expect(html.toLowerCase()).toContain('cloudburst');
        expect(html).toContain('India Meteorological Department');
    });

    it('explains river and mountain geography', () => {
        expect(html).toContain('Beas');
        expect(html).toContain('Satluj');
        expect(html).toContain('Ravi');
        expect(html).toContain('Giri');
        expect(html).toContain('Dhauladhar');
    });

    it('identifies major affected areas', () => {
        expect(html).toContain('Manali');
        expect(html).toContain('Mandi');
        expect(html).toContain('Kullu');
        expect(html).toContain('Solan');
        expect(html).toContain('Kinnaur');
        expect(html).toContain('Shimla');
    });

    it('documents landslide hazards', () => {
        expect(html).toContain('Summer Hill');
        expect(html).toContain('Jadoon');
        expect(html).toContain('Fagli');
        expect(html).toContain('landslide-susceptibility');
    });

    it('documents infrastructure and road damage', () => {
        expect(html).toContain('NH-5');
        expect(html).toContain('NH-3');
        expect(html).toContain('Kalka–Shimla');
        expect(html).toContain('₹10,000-crore-plus');
    });

    it('documents rescue and relief response', () => {
        expect(html).toContain('NDRF');
        expect(html).toContain('Indian Air Force');
        expect(html).toContain('Border Roads Organisation');
        expect(html).toContain('₹2 lakh');
    });

    it('covers mountain disaster preparedness lessons', () => {
        expect(html).toContain('Mountain disaster preparedness');
        expect(html).toContain('Zoning');
        expect(html).toContain('early-warning drills');
    });

    it('provides sources from official agencies', () => {
        expect(html).toContain('hpsdma.nic.in');
        expect(html).toContain('mausam.imd.gov.in');
        expect(html).toContain('ndrf.gov.in');
        expect(html).toContain('pib.gov.in');
        expect(html).toContain('bhuvan.nrsc.gov.in');
    });
});

describe('Himachal Floods 2023 — Scripts & Styles', () => {
    it('style.css defines timeline, map layout, and theme variables', () => {
        const css = readFile('style.css');
        expect(css).toContain('.timeline-item');
        expect(css).toContain('.map-layout');
        expect(css).toContain('.light-theme');
    });

    it('script.js wires theme toggle and interactive OpenStreetMap view switching', () => {
        const js = readFile('script.js');
        expect(js).toContain('initMap');
        expect(js).toContain('theme-toggle');
        expect(js).toContain('openstreetmap.org/export/embed.html');
        expect(js).toContain('data-place');
    });

    it('is registered in the global search index', () => {
        const index = readFileSync(
            resolve(__dirname, '../../frontend/search-index.js'),
            'utf-8'
        );
        expect(index).toContain('frontend/himachal-floods-2023-explorer/index.html');
    });
});
