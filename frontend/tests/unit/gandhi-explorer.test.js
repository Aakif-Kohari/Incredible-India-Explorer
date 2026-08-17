import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadGandhiScript() {
    const code = readFileSync(
        resolve(__dirname, '../../gandhi-explorer/script.js'),
        'utf-8'
    );
    
    // Mock DOM elements to prevent initialization errors
    const mockElement = {
        addEventListener: () => {},
        appendChild: () => {},
        innerHTML: '',
        querySelector: () => mockElement,
        querySelectorAll: () => [mockElement],
        value: 'dandi-march'
    };
    
    const mockDocument = {
        readyState: 'complete',
        addEventListener: () => {},
        getElementById: (id) => {
            if (id === 'theme-toggle') return mockElement;
            if (id === 'journey-select') return mockElement;
            if (id === 'btn-play-route') return mockElement;
            if (id === 'journey-title') return mockElement;
            if (id === 'journey-period') return mockElement;
            if (id === 'journey-distance') return mockElement;
            if (id === 'journey-description') return mockElement;
            if (id === 'journey-stops-list') return mockElement;
            if (id === 'gandhi-map') return mockElement;
            return null;
        },
        querySelector: () => mockElement,
        querySelectorAll: () => []
    };

    const mockL = {
        map: () => ({
            setView: function() { return this; },
            removeLayer: () => {},
            fitBounds: () => {},
            panTo: () => {},
            setView: () => {},
            invalidateSize: () => {}
        }),
        polyline: () => ({
            addTo: () => ({
                setLatLngs: () => {},
                setStyle: () => {}
            })
        }),
        marker: () => ({
            bindPopup: () => {}
        }),
        divIcon: () => {},
        layerGroup: () => ({
            addTo: () => ({
                clearLayers: () => {},
                addLayer: () => {}
            })
        }),
        latLngBounds: () => {}
    };

    const mockLocalStorage = {
        getItem: () => 'dark',
        setItem: () => {}
    };

    const window = {
        L: mockL,
        localStorage: mockLocalStorage,
        addEventListener: () => {},
        IntersectionObserver: class {
            observe() {}
            unobserve() {}
        }
    };

    const fn = new Function('window', 'document', 'localStorage', 'L', 'IntersectionObserver', code + '\nreturn window;');
    return fn(window, mockDocument, mockLocalStorage, mockL, window.IntersectionObserver);
}

describe('Mahatma Gandhi Explorer — Journeys & Map Tests', () => {
    let windowInstance;

    beforeAll(() => {
        windowInstance = loadGandhiScript();
    });

    it('loads Journeys dataset successfully', () => {
        expect(windowInstance.GANDHI_JOURNEYS).toBeDefined();
        expect(Array.isArray(windowInstance.GANDHI_JOURNEYS)).toBe(true);
        expect(windowInstance.GANDHI_JOURNEYS.length).toBeGreaterThanOrEqual(8);
    });

    it('contains all essential journeys with required properties', () => {
        const journeyIds = windowInstance.GANDHI_JOURNEYS.map(j => j.id);
        expect(journeyIds).toContain('return-india');
        expect(journeyIds).toContain('champaran');
        expect(journeyIds).toContain('ahmedabad-strike');
        expect(journeyIds).toContain('kheda');
        expect(journeyIds).toContain('non-cooperation');
        expect(journeyIds).toContain('dandi-march');
        expect(journeyIds).toContain('round-table');
        expect(journeyIds).toContain('noakhali');

        windowInstance.GANDHI_JOURNEYS.forEach(journey => {
            expect(journey.title).toBeDefined();
            expect(journey.period).toBeDefined();
            expect(journey.distance).toBeDefined();
            expect(journey.description).toBeDefined();
            expect(Array.isArray(journey.stops)).toBe(true);
            expect(journey.stops.length).toBeGreaterThanOrEqual(2);
            
            journey.stops.forEach(stop => {
                expect(stop.name).toBeDefined();
                expect(stop.event).toBeDefined();
                expect(Array.isArray(stop.coords)).toBe(true);
                expect(stop.coords.length).toBe(2);
                expect(typeof stop.coords[0]).toBe('number');
                expect(typeof stop.coords[1]).toBe('number');
            });
        });
    });

    it('HTML page has correct section structure and Leaflet imports', () => {
        const html = readFileSync(
            resolve(__dirname, '../../gandhi-explorer/index.html'),
            'utf-8'
        );

        // Verify Leaflet stylesheet and script inclusion
        expect(html).toContain('leaflet.css');
        expect(html).toContain('leaflet.js');

        // Verify Journeys Tab navigation and section elements
        expect(html).toContain('data-tab="journeys"');
        expect(html).toContain('id="journeys"');
        expect(html).toContain('id="gandhi-map"');
        expect(html).toContain('id="journey-select"');
        expect(html).toContain('id="btn-play-route"');
        expect(html).toContain('id="journey-stops-list"');
    });
});
