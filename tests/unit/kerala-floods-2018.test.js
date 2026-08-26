import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kerala-floods-2018', file),
        'utf-8'
    );
}

describe('Kerala Floods 2018 — Page Structure & Content (#3541)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains hero section with badges and flood title', () => {
        expect(html).toContain('class="hero-section kerala-hero"');
        expect(html).toContain('<h1 id="hero-heading"');
        expect(html).toContain('Kerala');
        expect(html).toContain('Western Ghats');
        expect(html).toContain('1924');
    });

    it('contains all required requirement sections', () => {
        expect(html).toContain('id="geography"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="rainfall"');
        expect(html).toContain('id="rivers-dams"');
        expect(html).toContain('id="flood-map"');
        expect(html).toContain('id="districts"');
        expect(html).toContain('id="damage"');
        expect(html).toContain('id="response"');
        expect(html).toContain('id="community"');
        expect(html).toContain('id="lessons"');
        expect(html).toContain('id="interactive-hub"');
        expect(html).toContain('id="gallery"');
    });

    it('documents event timeline with three rain waves and peak dates', () => {
        expect(html).toContain('Event Timeline');
        expect(html).toContain('9 Aug');
        expect(html).toContain('15 August');
        expect(html).toContain('Rebuild Kerala');
    });

    it('documents major affected districts', () => {
        expect(html).toContain('Wayanad');
        expect(html).toContain('Idukki');
        expect(html).toContain('Ernakulam');
        expect(html).toContain('Thrissur');
        expect(html).toContain('Pathanamthitta');
        expect(html).toContain('Malappuram');
        expect(html).toContain('Palakkad');
        expect(html).toContain('Chengannur');
    });

    it('documents rainfall and hydrological factors', () => {
        expect(html).toContain('+42% Season, +164% August');
        expect(html).toContain('Orographic Amplification');
        expect(html).toContain('Saturated Catchments');
        expect(html).toContain('low-pressure');
    });

    it('documents river and reservoir context including dam operations', () => {
        expect(html).toContain('Periyar');
        expect(html).toContain('Pamba');
        expect(html).toContain('Cheruthoni');
        expect(html).toContain('Mullaperiyar');
        expect(html).toContain('Banasura Sagar');
        expect(html).toContain('26 years');
        expect(html).toContain('44 rivers');
    });

    it('documents infrastructure impact including the airport closure', () => {
        expect(html).toContain('Cochin International Airport');
        expect(html).toContain('15–29 August');
        expect(html).toContain('₹40,000 crore');
        expect(html).toContain('landslides');
    });

    it('documents rescue and relief efforts', () => {
        expect(html).toContain('NDRF');
        expect(html).toContain('Operation Madad');
        expect(html).toContain('669 boats');
        expect(html).toContain('relief camps');
        expect(html).toContain('IMD');
    });

    it('documents community response and lessons for flood preparedness', () => {
        expect(html).toContain('Fishermen');
        expect(html).toContain('CMDRF');
        expect(html).toContain('Lessons for Flood Preparedness');
        expect(html).toContain('Reservoir Protocols');
        expect(html).toContain('Inter-State Coordination');
    });

    it('provides sources from official agencies', () => {
        expect(html).toContain('panel-sources');
        expect(html).toContain('mausam.imd.gov.in');
        expect(html).toContain('earthobservatory.nasa.gov/images/92638/a-flood-for-the-century-in-india');
        expect(html).toContain('reliefweb.int/report/india/kerala-post-disaster-needs-assessment-floods-and-landslides-august-2018');
        expect(html).toContain('sdma.kerala.gov.in');
        expect(html).toContain('india.mongabay.com/2018/09/cwc-report-on-kerala-floods-dams-not-to-be-blamed/');
    });

    it('includes structured data (JSON-LD Event schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Event"');
        expect(html).toContain('"startDate": "2018-08-08"');
        expect(html).toContain('"latitude"');
        expect(html).toContain('"longitude"');
    });

    it('includes Leaflet map container with view controls and legend', () => {
        expect(html).toContain('kerala-map');
        expect(html).toContain('leaflet@1.9.4');
        expect(html).toContain('btn-full-state');
        expect(html).toContain('btn-periyar');
        expect(html).toContain('btn-pamba');
        expect(html).toContain('btn-animate');
        expect(html).toContain('map-legend');
    });

    it('uses absolute asset paths so styles load from any URL variant', () => {
        expect(html).toContain('href="/styles.css"');
        expect(html).toContain('href="/frontend/pages-common.css"');
        expect(html).toContain('href="/frontend/kerala-floods-2018/style.css"');
        expect(html).toContain('src="/frontend/kerala-floods-2018/script.js"');
    });

    it('includes visual gallery with credits and lightbox', () => {
        expect(html).toContain('kerala-gallery');
        expect(html).toContain('lightbox-modal');
        expect(html).toContain('attribution-tag');
        expect(html).toContain('loading="lazy"');
    });

    it('uses only verified working image IDs (no broken images)', () => {
        expect(html).toContain('photo-1439066615861-d1af74d74000');
        expect(html).toContain('photo-1519692933481-e162a57d6721');
        expect(html).toContain('photo-1508873699372-7aeab60b44ab');
        expect(html).toContain('photo-1541185933-ef5d8ed016c2');
        expect(html).toContain('photo-1512100356356-de1b84283e18');
    });

    it('includes animated rain layers and hero waves', () => {
        expect(html).toContain('rain-layer');
        expect(html).toContain('hero-waves');
        expect(html).toContain('wave-1');
        expect(html).toContain('wave-2');
        const css = readFile('style.css');
        expect(css).toContain('@keyframes rainfall');
        expect(css).toContain('@keyframes waveDrift');
        expect(css).toContain('@keyframes badgePulse');
    });
});

describe('Kerala Floods 2018 — Scripts & Styles', () => {
    it('style.css defines hero, timeline, map legend, lightbox, and themes', () => {
        const css = readFile('style.css');
        expect(css).toContain('.kerala-hero');
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
        expect(js).toContain('animateTimeline');
        expect(js).toContain('theme-toggle');
        expect(js).toContain('lightbox-modal');
        expect(js).toContain("getElementById('kerala-map')");
    });
});
