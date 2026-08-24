import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/cyclone-amphan-2020', file),
        'utf-8'
    );
}

describe('Cyclone Amphan 2020 — Page Structure & Content (#3556)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges and cyclone title', () => {
        expect(html).toContain('class="hero-section amphan-hero"');
        expect(html).toContain('<h1 id="hero-heading"');
        expect(html).toContain('Cyclone Amphan');
        expect(html).toContain('West Bengal');
        expect(html).toContain('Bay of Bengal');
    });

    it('contains all required requirement sections', () => {
        expect(html).toContain('id="formation"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="track-map"');
        expect(html).toContain('id="impact"');
        expect(html).toContain('id="hazards"');
        expect(html).toContain('id="damage"');
        expect(html).toContain('id="response"');
        expect(html).toContain('id="mangroves"');
        expect(html).toContain('id="lessons"');
        expect(html).toContain('id="interactive-hub"');
        expect(html).toContain('id="gallery"');
    });

    it('documents formation, track timeline, and landfall', () => {
        expect(html).toContain('Andaman Sea');
        expect(html).toContain('20 May 2020');
        expect(html).toContain('Bakkhali');
        expect(html).toContain('Super Cyclonic Storm');
        expect(html).toContain('240 km/h');
        expect(html).toContain('rapid intensification'.toLowerCase());
        expect(html.toLowerCase()).toContain('rapid intensification');
    });

    it('documents Indian impact — West Bengal, Odisha, Kolkata, Sundarbans', () => {
        expect(html).toContain('Odisha');
        expect(html).toContain('Kolkata');
        expect(html).toContain('Sundarbans');
        expect(html).toContain('South 24 Parganas');
        expect(html).toContain('18 million');
    });

    it('explains coastal hazards — storm surge and flooding', () => {
        expect(html).toContain('Storm Surge');
        expect(html).toContain('4–5 m');
        expect(html).toContain('Salinisation');
        expect(html).toContain('embankment');
    });

    it('documents evacuation and emergency response', () => {
        expect(html).toContain('NDRF');
        expect(html).toContain('IMD');
        expect(html).toContain('five million');
        expect(html).toContain('COVID-19');
    });

    it('covers mangrove coastal protection context and lessons learned', () => {
        expect(html).toContain('mangrove');
        expect(html).toContain('bio-shield');
        expect(html).toContain('Lessons Learned');
        expect(html).toContain('1999 Odisha Super Cyclone');
    });

    it('provides sources from official agencies', () => {
        expect(html).toContain('panel-sources');
        expect(html).toContain('mausam.imd.gov.in');
        expect(html).toContain('ndma.gov.in');
        expect(html).toContain('earthobservatory.nasa.gov/images/146746/tropical-cyclone-amphan');
        expect(html).toContain('reliefweb.int');
    });

    it('includes structured data (JSON-LD Event schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Event"');
        expect(html).toContain('"startDate"');
        expect(html).toContain('"latitude"');
        expect(html).toContain('"longitude"');
    });

    it('includes Leaflet map container with track controls and legend', () => {
        expect(html).toContain('amphan-map');
        expect(html).toContain('leaflet@1.9.4');
        expect(html).toContain('btn-full-track');
        expect(html).toContain('btn-animate');
        expect(html).toContain('map-legend');
    });

    it('includes visual gallery with credits and lightbox', () => {
        expect(html).toContain('amphan-gallery');
        expect(html).toContain('lightbox-modal');
        expect(html).toContain('attribution-tag');
        expect(html).toContain('loading="lazy"');
    });
});

describe('Cyclone Amphan 2020 — Scripts & Styles', () => {
    it('style.css defines hero, timeline, map legend, lightbox, and themes', () => {
        const css = readFile('style.css');
        expect(css).toContain('.amphan-hero');
        expect(css).toContain('.timeline-list');
        expect(css).toContain('.map-legend');
        expect(css).toContain('.hub-tabs');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('.light-theme');
    });

    it('script.js wires tabs, Leaflet track map, animation, lightbox, and theme switching', () => {
        const js = readFile('script.js');
        expect(js).toContain('initMap');
        expect(js).toContain('L.map');
        expect(js).toContain('L.polyline');
        expect(js).toContain('L.circleMarker');
        expect(js).toContain('animateTrack');
        expect(js).toContain('theme-toggle');
        expect(js).toContain('lightbox-modal');
    });
});
