/**
 * Natural Disasters & Hazards of India Explorer - Unit Test Suite
 * Validates data-driven rendering of the 11 hazard categories, state-wise
 * exploration, historical timeline, preparedness guides, map, and profile links.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const explorerDir = path.resolve(__dirname, '../../frontend/disasters-explorer');
const dataSrc = fs.readFileSync(path.join(explorerDir, 'disasters-data.js'), 'utf8');
const ctrlSrc = fs.readFileSync(path.join(explorerDir, 'disasters.js'), 'utf8');

function buildDom() {
    return new JSDOM(`<!DOCTYPE html><html><body>
        <header id="nd-header"><nav class="nd-nav"><div class="nd-nav-links" id="nd-nav-links">
            <a href="#map-heading" class="nd-nav-link" data-section="map"></a>
            <a href="#hazards-heading" class="nd-nav-link" data-section="hazards"></a>
        </div></nav></header>
        <div id="nd-mobile-nav"></div>
        <button id="nd-mobile-toggle"></button>
        <div id="nd-hero-particles"></div>
        <div class="nd-hero-stats" id="nd-hero-stats"></div>
        <div class="nd-filter-group" id="nd-filter-group"></div>
        <button class="nd-filter-btn is-active" data-filter="all"></button>
        <div class="nd-map-wrapper" id="nd-map-wrapper">
            <div id="nd-map-legend"></div>
            <div id="nd-india-map"></div>
            <div id="nd-map-tooltip"></div>
        </div>
        <div id="nd-state-detail"></div>
        <div id="nd-hazards-grid"></div>
        <div id="nd-states-grid"></div>
        <button class="nd-region-btn is-active" data-region="all"></button>
        <div id="nd-timeline-container"></div>
        <div id="nd-timeline-filter"></div>
        <div id="nd-preparedness-grid"></div>
        <div id="nd-profiles-grid"></div>
        <input id="nd-search-input"><button id="nd-search-clear" style="display:none"></button>
        <div id="nd-sources-list"></div>
        <footer class="nd-footer"></footer>
    </body></html>`, {
        url: 'http://localhost/frontend/disasters-explorer/index.html',
        runScripts: 'outside-only',
        pretendToBeVisual: true
    });
}

describe('Natural Disasters & Hazards of India Explorer', () => {
    let dom;
    let window;

    beforeEach(() => {
        dom = buildDom();
        window = dom.window;
        window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
        window.cancelAnimationFrame = () => {};
        window.IntersectionObserver = class {
            constructor() {}
            observe() {}
            unobserve() {}
        };
        window.HTMLElement.prototype.getBoundingClientRect = function () {
            return { left: 0, top: 0, width: 0, height: 0 };
        };
        global.window = window;
        global.document = window.document;
        window.eval(dataSrc);
        window.eval(ctrlSrc);
    });

    afterEach(() => {
        global.window = undefined;
        global.document = undefined;
    });

    it('exposes all 11 hazard categories from the dataset', () => {
        const DATA = window.DisastersData;
        expect(DATA).toBeDefined();
        expect(DATA.hazardTypes).toHaveLength(11);
        const ids = DATA.hazardTypes.map((h) => h.id);
        [
            'floods', 'cyclones', 'earthquakes', 'landslides', 'forest-fires',
            'droughts', 'heatwaves', 'lightning', 'avalanches', 'tsunamis', 'volcanic'
        ].forEach((id) => expect(ids).toContain(id));
    });

    it('renders 11 hazard cards and 11 detailed profile cards', () => {
        expect(document.querySelectorAll('.nd-hazard-card').length).toBe(11);
        expect(document.querySelectorAll('.nd-profile-card').length).toBe(11);
    });

    it('renders 36 state cards for state-wise exploration', () => {
        expect(document.querySelectorAll('.nd-state-card').length).toBe(36);
    });

    it('renders the full historical disaster timeline with links to profiles', () => {
        expect(document.querySelectorAll('.nd-timeline-item').length).toBe(15);
        expect(document.querySelectorAll('.nd-timeline-link').length).toBe(15);
    });

    it('renders preparedness guides and the interactive SVG map', () => {
        expect(document.querySelectorAll('.nd-prep-card').length).toBe(11);
        expect(document.querySelectorAll('#nd-india-map svg').length).toBe(1);
        expect(document.querySelectorAll('.nd-map-dot').length).toBeGreaterThan(20);
    });

    it('every hazard category links to an individual detailed profile page', () => {
        const hrefs = Array.from(document.querySelectorAll('.nd-profile-cta')).map((a) => a.getAttribute('href'));
        expect(hrefs).toHaveLength(11);
        hrefs.forEach((h) => expect(h.startsWith('../') && h.endsWith('.html')).toBe(true));
    });

    it('builds the hazard filter buttons from the data', () => {
        // 11 generated filters + the "All" button
        expect(document.querySelectorAll('.nd-filter-group .nd-filter-btn').length).toBe(11);
    });
});
