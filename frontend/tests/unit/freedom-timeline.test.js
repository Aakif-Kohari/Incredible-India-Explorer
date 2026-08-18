import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTimelineScript() {
    const code = readFileSync(
        resolve(__dirname, '../../freedom-timeline/script.js'),
        'utf-8'
    );
    
    // Mock DOM elements to prevent initialization errors
    const mockElement = {
        addEventListener: () => {},
        appendChild: () => {},
        innerHTML: '',
        querySelector: () => mockElement,
        querySelectorAll: () => [mockElement],
        value: '1857',
        classList: {
            add: () => {},
            remove: () => {},
            contains: () => false,
            toggle: () => false
        },
        setAttribute: () => {},
        disabled: false,
        remove: () => {}
    };
    
    const mockDocument = {
        readyState: 'complete',
        addEventListener: () => {},
        createElement: () => mockElement,
        body: {
            classList: {
                add: () => {},
                remove: () => {},
                replace: () => {},
                contains: () => false,
                toggle: () => false
            }
        },
        getElementById: (id) => {
            if (id === 'theme-toggle') return mockElement;
            if (id === 'category-filter') return mockElement;
            if (id === 'year-min') return mockElement;
            if (id === 'year-max') return mockElement;
            if (id === 'year-range-label') return mockElement;
            if (id === 'timeline-container') return mockElement;
            if (id === 'timeline-track') return mockElement;
            if (id === 'timeline-map') return mockElement;
            if (id === 'slide-left') return mockElement;
            if (id === 'slide-right') return mockElement;
            if (id === 'event-modal') return {
                showModal: () => {},
                close: () => {},
                addEventListener: () => {}
            };
            if (id === 'close-modal') return mockElement;
            if (id === 'modal-year') return mockElement;
            if (id === 'modal-title') return mockElement;
            if (id === 'modal-image-placeholder') return { style: {} };
            if (id === 'modal-leaders') return mockElement;
            if (id === 'modal-location') return mockElement;
            if (id === 'modal-description') return mockElement;
            if (id === 'modal-significance') return mockElement;
            if (id === 'modal-deep-dive-link') return mockElement;
            if (id === 'modal-deep-dive-box') return { style: {} };
            if (id === 'btn-modal-prev') return mockElement;
            if (id === 'btn-modal-next') return mockElement;
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
        latLngBounds: () => {},
        tileLayer: () => ({
            addTo: () => {}
        })
    };

    const mockLocalStorage = {
        getItem: () => 'dark',
        setItem: () => {}
    };

    const window = {
        L: mockL,
        localStorage: mockLocalStorage,
        addEventListener: () => {},
        FREEDOM_TIMELINE_DATA: [
            {
                year: 1857,
                title: "Revolt of 1857",
                coords: [28.9845, 77.7064],
                category: "Early Resistance",
                leaders: ["Mangal Pandey"],
                description: "Rebellion description",
                significance: "Significance details",
                location: "Meerut"
            }
        ]
    };

    const fn = new Function('window', 'document', 'localStorage', 'L', code + '\nreturn window;');
    return fn(window, mockDocument, mockLocalStorage, mockL);
}

describe('Indian Freedom Struggle Timeline Dataset & HTML Tests', () => {
    it('dataset contains at least 15 verified chronological events', () => {
        const dataCode = readFileSync(
            resolve(__dirname, '../../freedom-timeline/data.js'),
            'utf-8'
        );
        const windowMock = {};
        const fn = new Function('window', dataCode + '\nreturn window.FREEDOM_TIMELINE_DATA;');
        const FREEDOM_TIMELINE_DATA = fn(windowMock);

        expect(FREEDOM_TIMELINE_DATA).toBeDefined();
        expect(Array.isArray(FREEDOM_TIMELINE_DATA)).toBe(true);
        expect(FREEDOM_TIMELINE_DATA.length).toBeGreaterThanOrEqual(15);

        // Verify chronological order
        for (let i = 0; i < FREEDOM_TIMELINE_DATA.length - 1; i++) {
            expect(FREEDOM_TIMELINE_DATA[i].year).toBeLessThanOrEqual(FREEDOM_TIMELINE_DATA[i + 1].year);
        }

        // Verify key properties
        FREEDOM_TIMELINE_DATA.forEach(evt => {
            expect(evt.year).toBeDefined();
            expect(evt.title).toBeDefined();
            expect(evt.location).toBeDefined();
            expect(Array.isArray(evt.coords)).toBe(true);
            expect(evt.coords.length).toBe(2);
            expect(evt.category).toBeDefined();
            expect(Array.isArray(evt.leaders)).toBe(true);
            expect(evt.description).toBeDefined();
            expect(evt.significance).toBeDefined();
        });
    });

    it('HTML has Leaflet CSS/JS imports, drag track, and filter sliders', () => {
        const html = readFileSync(
            resolve(__dirname, '../../freedom-timeline/index.html'),
            'utf-8'
        );

        // Leaflet imports
        expect(html).toContain('leaflet.css');
        expect(html).toContain('leaflet.js');

        // Dragtrack and elements
        expect(html).toContain('id="timeline-container"');
        expect(html).toContain('id="timeline-track"');
        expect(html).toContain('id="timeline-map"');

        // Year sliders and filters
        expect(html).toContain('id="year-min"');
        expect(html).toContain('id="year-max"');
        expect(html).toContain('id="category-filter"');
        expect(html).toContain('id="event-modal"');
    });

    it('loads timeline script successfully', () => {
        const win = loadTimelineScript();
        expect(win).toBeDefined();
    });
});
