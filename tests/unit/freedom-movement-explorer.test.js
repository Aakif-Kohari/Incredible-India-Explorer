/**
 * freedom-movement-explorer.test.js
 * Unit tests for the Freedom Movement Explorer dashboard (issue #2013).
 * Validates required sections, tab navigation, dashboard map and timeline,
 * search and filter functionality, event data exports, and landing page
 * integration on the Incredible India Explorer home page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-movement-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('Freedom Movement Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title', () => {
        expect(html).toContain('Freedom Movement');
        expect(html).toContain('1770');
        expect(html).toContain('1947');
    });

    it('contains all required tab buttons including Dashboard', () => {
        const tabs = ['Movements & Timeline', 'Interactive Dashboard', 'How Events Connected', "Revolutionary Societies", 'Freedom Leaders', 'Primary Documents'];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('has a dashboard tab pane with interactive map and timeline', () => {
        expect(html).toContain('id="tab-dashboard"');
        expect(html).toContain('id="freedom-map-svg"');
        expect(html).toContain('id="freedom-map-markers"');
        expect(html).toContain('id="freedom-master-timeline"');
        expect(html).toContain('id="freedom-event-list"');
    });

    it('has dashboard search and filter controls', () => {
        expect(html).toContain('id="freedom-event-search"');
        expect(html).toContain('id="freedom-year-slider"');
        expect(html).toContain('id="freedom-year-display"');
        expect(html).toContain('id="freedom-region-filter"');
        expect(html).toContain('id="freedom-movement-filter"');
        expect(html).toContain('id="freedom-category-filter"');
    });

    it('has an event detail modal', () => {
        expect(html).toContain('id="freedom-event-detail-modal"');
        expect(html).toContain('modal-event-title');
        expect(html).toContain('modal-event-year');
        expect(html).toContain('modal-event-movement');
        expect(html).toContain('modal-event-category');
        expect(html).toContain('modal-event-location');
        expect(html).toContain('modal-event-leaders');
    });

    it('has all original tab panes (timeline, cause-effect, orgs, leaders, docs)', () => {
        expect(html).toContain('id="tab-timeline"');
        expect(html).toContain('id="tab-cause-effect"');
        expect(html).toContain('id="tab-orgs"');
        expect(html).toContain('id="tab-leaders"');
        expect(html).toContain('id="tab-documents"');
    });

    it('contains key freedom movement events from the issue', () => {
        expect(html).toContain('1857');
        expect(html).toContain('1947');
        expect(html).toContain('Jallianwala Bagh');
        expect(html).toContain('Salt March');
        expect(html).toContain('Quit India');
        expect(html).toContain('Revolutionary');
    });

    it('has state path elements for the India map', () => {
        expect(html).toContain('class="freedom-state"');
        expect(html).toContain('data-state="gujarat"');
        expect(html).toContain('data-state="uttar-pradesh"');
        expect(html).toContain('data-state="delhi"');
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="freedom-movement.js"');
    });
});

describe('Freedom Movement Explorer — JavaScript Data & Functions', () => {
    let js;

    beforeAll(() => {
        js = readExplorerFile('freedom-movement.js');
    });

    it('exports the map events dataset with geographic coordinates', () => {
        expect(js).toContain('freedomMapEvents');
        expect(js).toContain('INDIA_STATE_PATHS');
        expect(js).toContain('lat:');
        expect(js).toContain('lng:');
    });

    it('exports filterFreedomMapEvents function', () => {
        expect(js).toContain('export function filterFreedomMapEvents');
    });

    it('exports getMapEventById function', () => {
        expect(js).toContain('export function getMapEventById');
    });

    it('exports getYearRange function', () => {
        expect(js).toContain('export function getYearRange');
    });

    it('exports getUniqueRegions function', () => {
        expect(js).toContain('export function getUniqueRegions');
    });

    it('exports getUniqueMovements function', () => {
        expect(js).toContain('export function getUniqueMovements');
    });

    it('includes key freedom movement events with coordinates', () => {
        expect(js).toContain('Sannyasi Rebellion');
        expect(js).toContain('Paika Rebellion');
        expect(js).toContain('Jallianwala Bagh Massacre');
        expect(js).toContain('Salt March');
        expect(js).toContain('Quit India');
        expect(js).toContain('Azad Hind');
    });

    it('includes dashboard DOM initialization function', () => {
        expect(js).toContain('initFreedomDashboard');
        expect(js).toContain('renderIndiaMap');
        expect(js).toContain('renderMasterTimeline');
        expect(js).toContain('showEventDetail');
        expect(js).toContain('selectMapEvent');
        expect(js).toContain('selectTimelineEvent');
    });

    it('includes filter and search event listeners', () => {
        expect(js).toContain('freedom-event-search');
        expect(js).toContain('freedom-year-slider');
        expect(js).toContain('freedom-region-filter');
        expect(js).toContain('freedom-movement-filter');
        expect(js).toContain('freedom-category-filter');
    });
});

describe('Freedom Movement Explorer — Stylesheet', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.freedom-hero');
        expect(css).toContain('.freedom-tab-pane');
    });

    it('includes dashboard-specific styles', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.freedom-map-svg');
        expect(css).toContain('.freedom-map-marker');
        expect(css).toContain('.freedom-timeline-vertical');
        expect(css).toContain('.freedom-event-list');
        expect(css).toContain('.freedom-modal');
        expect(css).toContain('.freedom-modal--visible');
        expect(css).toContain('.dashboard-layout');
        expect(css).toContain('.dashboard-controls-bar');
    });

    it('includes map markers and state styles', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('.freedom-state');
        expect(css).toContain('.marker-dot');
        expect(css).toContain('.freedom-map-legend');
    });

    it('includes responsive styles for mobile', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('@media (max-width: 860px)');
    });

    it('includes light theme overrides', () => {
        const css = readExplorerFile('style.css');
        expect(css).toContain('body.light-theme .freedom-map-wrapper');
        expect(css).toContain('body.light-theme .freedom-modal');
    });
});

describe('Freedom Movement — Landing Page Integration', () => {
    let index;

    beforeAll(() => {
        index = readLandingPage();
    });

    it('lists Freedom Movement in the Heritage navbar dropdown', () => {
        expect(index).toContain('India\'s Freedom Movement');
        expect(index).toContain('frontend/freedom-movement-explorer/index.html');
    });

    it('has a Freedom Movement spotlight section on the landing page', () => {
        expect(index).toContain('id="freedom"');
        expect(index).toContain('Freedom Movement Explorer');
        expect(index).toContain('freedom-spotlight');
        expect(index).toContain('freedom-landing-card');
    });

    it('freedom landing card links to the explorer page', () => {
        expect(index).toMatch(/href="frontend\/freedom-movement-explorer\/index\.html"/);
    });

    it('freedom landing card mentions key dashboard features', () => {
        expect(index).toContain('Interactive India map');
        expect(index).toContain('master timeline');
        expect(index).toContain('Revolutionary societies');
        expect(index).toContain('Freedom Leaders');
        expect(index).toContain('Primary Historical Documents');
    });
});
