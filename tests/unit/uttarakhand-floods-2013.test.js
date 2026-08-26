import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(import.meta.dirname, '../../frontend/uttarakhand-floods-2013');
const read = (path) => readFileSync(path, 'utf8');

describe('Uttarakhand Floods 2013 — HTML structure & content', () => {
    let html;

    beforeAll(() => {
        html = read(join(DIR, 'index.html'));
    });

    it('has correct document title', () => {
        expect(html).toContain('<title>Uttarakhand Floods 2013');
    });

    it('has viewport and Open Graph tags', () => {
        expect(html).toContain('viewport');
        expect(html).toContain('og:title');
    });

    it('includes body class uttarakhand-floods-page', () => {
        expect(html).toContain('uttarakhand-floods-page');
    });

    it('has hero section with all three badges', () => {
        expect(html).toContain('badge-crimson');
        expect(html).toContain('badge-gold');
        expect(html).toContain('badge-azure');
    });

    it('has all key content section IDs', () => {
        const ids = [
            'geography', 'timeline', 'rainfall', 'hazards', 'flood-map',
            'districts', 'damage', 'response', 'environment',
            'preparedness', 'lessons', 'interactive-hub', 'gallery', 'sources'
        ];
        ids.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('mentions key dates and events', () => {
        expect(html).toContain('16 Jun');
        expect(html).toContain('17 Jun');
        expect(html).toContain('Chorabari Tal');
        expect(html).toContain('Kedarnath');
        expect(html).toContain('Operation Surya Hope');
    });

    it('mentions key statistics', () => {
        expect(html).toContain('5,748');
        expect(html).toContain('370 mm');
        expect(html).toContain('847%');
        expect(html).toContain('100,000');
    });

    it('mentions IMD, NDMA and key organisations', () => {
        expect(html).toContain('IMD');
        expect(html).toContain('NDMA');
        expect(html).toContain('ITBP');
        expect(html).toContain('NDRF');
    });

    it('has a leaflet map container', () => {
        expect(html).toContain('id="ukd-map"');
        expect(html).toContain('leaflet');
    });

    it('has a gallery with lightbox elements', () => {
        expect(html).toContain('gallery-grid');
        expect(html).toContain('lightbox-modal');
        expect(html).toContain('lightbox-close-btn');
    });

    it('has Hub tab panels', () => {
        expect(html).toContain('data-tab="timeline-map"');
        expect(html).toContain('data-tab="legend"');
        expect(html).toContain('panel-timeline-map');
        expect(html).toContain('panel-legend');
    });

    it('has map control buttons', () => {
        expect(html).toContain('btn-full-state');
        expect(html).toContain('btn-mandakini');
        expect(html).toContain('btn-alaknanda');
        expect(html).toContain('btn-animate');
    });

    it('has a footer with site name and social links', () => {
        expect(html).toContain('ukd-footer');
        expect(html).toContain('Incredible India Explorer');
        expect(html).toContain('github.com');
    });

    it('includes all required sources', () => {
        const sources = [
            'imdcc.res.in',
            'nidm.gov.in',
            'worldbank.org',
            'earthobservatory.nasa.gov',
            'reliefweb.int',
            'ndma.gov.in',
            'ukdisasterrelief'
        ];
        sources.forEach(src => {
            expect(html).toContain(src);
        });
    });

    it('has proper Open Graph image URL', () => {
        expect(html).toContain('og:image');
        expect(html).toContain('upload.wikimedia.org');
    });

    it('references external JS and CSS', () => {
        expect(html).toContain('script.js');
        expect(html).toContain('style.css');
    });

    it('has meta description mentioning Uttarakhand 2013', () => {
        expect(html).toContain('2013 Uttarakhand');
    });
});

describe('Uttarakhand Floods 2013 — CSS', () => {
    let css;

    beforeAll(() => {
        css = read(join(DIR, 'style.css'));
    });

    it('has uttarakhand-floods-page body class', () => {
        expect(css).toContain('uttarakhand-floods-page');
    });

    it('has ukd-hero class', () => {
        expect(css).toContain('ukd-hero');
    });

    it('has ukd-footer class', () => {
        expect(css).toContain('ukd-footer');
    });

    it('has hero section, timeline list, and gallery styles', () => {
        expect(css).toContain('.hero-section');
        expect(css).toContain('.timeline-list');
        expect(css).toContain('.gallery-grid');
    });

    it('defines tab panel and map controls styles', () => {
        expect(css).toContain('hub-tab-btn');
        expect(css).toContain('map-btn');
        expect(css).toContain('map-legend');
    });

    it('includes lightbox modal styles', () => {
        expect(css).toContain('lightbox-modal');
        expect(css).toContain('lightbox-close');
    });

    it('has light-theme body class override', () => {
        expect(css).toContain('body.light-theme');
    });

    it('has scroll reveal animation styles', () => {
        expect(css).toContain('.reveal');
        expect(css).toContain('.visible');
    });

    it('has responsive breakpoints', () => {
        expect(css).toContain('@media');
        expect(css).toContain('max-width');
    });

    it('has prefers-reduced-motion media query', () => {
        expect(css).toContain('prefers-reduced-motion');
    });
});

describe('Uttarakhand Floods 2013 — JavaScript', () => {
    let js;

    beforeAll(() => {
        js = read(join(DIR, 'script.js'));
    });

    it('has DOMContentLoaded listener', () => {
        expect(js).toContain("addEventListener('DOMContentLoaded'");
    });

    it('has hub tab switching', () => {
        expect(js).toContain('hub-tab-btn');
        expect(js).toContain('hub-panel');
        expect(js).toContain('aria-selected');
    });

    it('has Leaflet map initialization', () => {
        expect(js).toContain('initMap');
        expect(js).toContain('L.map');
        expect(js).toContain('L.tileLayer');
        expect(js).toContain('L.circleMarker');
    });

    it('has all flood site markers', () => {
        expect(js).toContain("'Kedarnath'");
        expect(js).toContain("'Rudraprayag'");
        expect(js).toContain("'Joshimath'");
        expect(js).toContain("'Dehradun'");
        expect(js).toContain("'Gaurikund'");
        expect(js).toContain("'Rishikesh / Haridwar'");
        expect(js).toContain("'Govindghat'");
        expect(js).toContain("'Chorabari Tal (Gandhi Sarovar)'");
        expect(js).toContain("'Tehri Dam'");
    });

    it('has Mandakini and Alaknanda river lines', () => {
        expect(js).toContain("'Mandakini (schematic)'");
        expect(js).toContain("'Alaknanda (schematic)'");
    });

    it('has map view buttons and timeline animation', () => {
        expect(js).toContain('btn-full-state');
        expect(js).toContain('btn-mandakini');
        expect(js).toContain('btn-alaknanda');
        expect(js).toContain('btn-animate');
        expect(js).toContain('animateTimeline');
        expect(js).toContain('timelinePoints');
    });

    it('has gallery lightbox logic', () => {
        expect(js).toContain('lightbox-modal');
        expect(js).toContain('lightbox-close-btn');
        expect(js).toContain('gallery-card-item');
    });

    it('has theme toggle', () => {
        expect(js).toContain('theme-toggle');
        expect(js).toContain('light-theme');
        expect(js).toContain('localStorage');
    });

    it('has scroll reveal with IntersectionObserver', () => {
        expect(js).toContain('IntersectionObserver');
        expect(js).toContain('reveal');
    });

    it('has counter animation', () => {
        expect(js).toContain('data-counter');
        expect(js).toContain('requestAnimationFrame');
    });

    it('has reduced-motion detection', () => {
        expect(js).toContain('prefers-reduced-motion');
    });

    it('has legend category metadata', () => {
        expect(js).toContain('Severely Affected District');
        expect(js).toContain('Major Impact Site');
        expect(js).toContain('Rescue Hub');
    });
});

describe('Uttarakhand Floods 2013 — Search index entry', () => {
    let searchJs;

    beforeAll(() => {
        searchJs = read(join(import.meta.dirname, '../../frontend/search-index.js'));
    });

    it('has an entry for Uttarakhand Floods 2013', () => {
        expect(searchJs).toContain('Uttarakhand Floods 2013');
        expect(searchJs).toContain('frontend/uttarakhand-floods-2013/index.html');
    });
});
