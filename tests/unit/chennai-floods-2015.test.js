import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/chennai-floods-2015', file),
        'utf-8'
    );
}

describe('Chennai Floods 2015 — Page Structure & Content (#3542)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges and floods title', () => {
        expect(html).toContain('class="hero-section chennai-hero"');
        expect(html).toContain('<h1 id="hero-heading"');
        expect(html).toContain('Chennai');
        expect(html).toContain('Coromandel Coast');
        expect(html).toContain('urban flooding'.toLowerCase());
        expect(html.toLowerCase()).toContain('urban flooding');
    });

    it('contains all required requirement sections', () => {
        expect(html).toContain('id="overview"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="rainfall"');
        expect(html).toContain('id="waterways"');
        expect(html).toContain('id="urban-flooding"');
        expect(html).toContain('id="map-section"');
        expect(html).toContain('id="affected"');
        expect(html).toContain('id="infrastructure"');
        expect(html).toContain('id="response"');
        expect(html).toContain('id="lessons"');
        expect(html).toContain('id="interactive-hub"');
        expect(html).toContain('id="gallery"');
    });

    it('documents the event timeline of November–December 2015', () => {
        expect(html).toContain('8–10 Nov');
        expect(html).toContain('1 Dec');
        expect(html).toContain('2 Dec');
        expect(html).toContain('Chembarambakkam');
        expect(html).toContain('29,000 cusecs');
    });

    it('provides rainfall context with verified records', () => {
        expect(html).toContain('1,049 mm');
        expect(html).toContain('1918');
        expect(html).toContain('290 mm');
        expect(html).toContain('northeast (retreating) monsoon');
    });

    it("documents Chennai's drainage and waterways", () => {
        expect(html).toContain('Adyar');
        expect(html).toContain('Cooum');
        expect(html).toContain('Buckingham Canal');
        expect(html).toContain('Pallikaranai');
        expect(html).toContain('Kosasthalaiyar');
    });

    it('explains urban flooding mechanisms', () => {
        expect(html).toContain('Sealed Surfaces');
        expect(html).toContain('Lost Storage');
        expect(html).toContain('Undersized Drains');
        expect(html).toContain('Compound Hazard');
    });

    it('identifies affected areas with geographic context', () => {
        expect(html).toContain('Velachery');
        expect(html).toContain('Saidapet');
        expect(html).toContain('Mudichur');
        expect(html).toContain('Cuddalore');
        expect(html).toContain('Kancheepuram');
        expect(html).toContain('Tiruvallur');
    });

    it('documents infrastructure impact', () => {
        expect(html).toContain('Airport');
        expect(html).toContain('Power Cut');
        expect(html).toContain('ATMs');
        expect(html).toContain('MIOT International');
    });

    it('documents emergency response', () => {
        expect(html).toContain('NDRF');
        expect(html).toContain('IMD');
        expect(html).toContain('#ChennaiRainsRescue');
        expect(html).toContain('₹1,000 crore');
        expect(html).toContain('350,000');
    });

    it('covers urban flood-management lessons learned', () => {
        expect(html).toContain('Urban Flood-Management Lessons');
        expect(html).toContain('Protect Wetlands');
        expect(html).toContain('Transparent Reservoir Protocols');
        expect(html).toContain('Last-Mile Warning');
    });

    it('provides sources from official agencies', () => {
        expect(html).toContain('panel-sources');
        expect(html).toContain('mausam.imd.gov.in');
        expect(html).toContain('nidm.gov.in');
        expect(html).toContain('ndma.gov.in');
        expect(html).toContain('earthobservatory.nasa.gov/images/87131/historic-rainfall-floods-southeast-india');
        expect(html).toContain('reliefweb.int');
    });

    it('includes structured data (JSON-LD Event schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Event"');
        expect(html).toContain('"startDate"');
        expect(html).toContain('"latitude"');
        expect(html).toContain('"longitude"');
    });

    it('includes Leaflet map container with view controls and legend', () => {
        expect(html).toContain('chennai-map');
        expect(html).toContain('leaflet@1.9.4');
        expect(html).toContain('btn-city-overview');
        expect(html).toContain('btn-adyar');
        expect(html).toContain('btn-water-bodies');
        expect(html).toContain('btn-animate');
        expect(html).toContain('map-legend');
    });

    it('includes visual gallery with credits and lightbox', () => {
        expect(html).toContain('chennai-gallery');
        expect(html).toContain('lightbox-modal');
        expect(html).toContain('attribution-tag');
        expect(html).toContain('loading="lazy"');
    });
});

describe('Chennai Floods 2015 — Scripts & Styles', () => {
    it('style.css defines hero, timeline, map legend, lightbox, and themes', () => {
        const css = readFile('style.css');
        expect(css).toContain('.chennai-hero');
        expect(css).toContain('.timeline-list');
        expect(css).toContain('.map-legend');
        expect(css).toContain('.hub-tabs');
        expect(css).toContain('.lightbox-modal');
        expect(css).toContain('.light-theme');
    });

    it('script.js wires tabs, Leaflet flood map, animation, lightbox, and theme switching', () => {
        const js = readFile('script.js');
        expect(js).toContain('initMap');
        expect(js).toContain('L.map');
        expect(js).toContain('L.polyline');
        expect(js).toContain('L.circleMarker');
        expect(js).toContain('animateFloodWave');
        expect(js).toContain('theme-toggle');
        expect(js).toContain('lightbox-modal');
    });
});
