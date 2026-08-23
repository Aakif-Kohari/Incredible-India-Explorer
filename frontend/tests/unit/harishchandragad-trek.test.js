import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HARISCHANDRAGAD_TREK_DATA, renderTrekFacts, renderNaturalFeatures, renderRouteStages, renderGallery, renderImageCredits } from '../../harishchandragad-trek/script.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readTrekFile(file) {
    return readFileSync(
        resolve(__dirname, '../../harishchandragad-trek', file),
        'utf-8'
    );
}

describe('Harishchandragad Trek Profile — Data Tests', () => {
    const data = HARISCHANDRAGAD_TREK_DATA;

    it('contains correct Maharashtra metadata and max altitude 1,424 m', () => {
        expect(data.name).toBe('Harishchandragad Trek');
        expect(data.title).toContain('Harishchandragad');
        expect(data.state).toBe('Maharashtra');
        expect(data.region).toContain('Western Ghats');
        expect(data.maxAltitude).toContain('1,424 m');
    });

    it('exposes required trek facts: location, difficulty, distance, duration, best season', () => {
        expect(typeof data.startingPoint).toBe('string');
        expect(data.difficulty).toContain('Moderate');
        expect(data.distance).toContain('km');
        expect(data.duration).toContain('day');
        expect(typeof data.permits).toBe('string');

        const titles = data.facts.map(f => f.title);
        for (const t of ['Trek Location', 'Difficulty', 'Distance', 'Duration', 'Best Season', 'Starting Point']) {
            expect(titles).toContain(t);
        }
    });

    it('documents fort history and heritage significance', () => {
        expect(data.overview.heritage).toContain('Harishchandreshwar');
        expect(data.overview.location.toLowerCase()).toMatch(/fort|6th century/);
    });

    it('documents Konkan Kada and cave/temple natural features', () => {
        const titles = data.naturalFeatures.map(f => f.title);
        expect(titles).toContain('Konkan Kada');
        expect(titles).toContain('Kedareshwar Cave');
        expect(titles).toContain('Harishchandreshwar Temple');
    });

    it('provides route stages starting from Pachnai in ascending step order', () => {
        expect(Array.isArray(data.routeStages)).toBe(true);
        expect(data.routeStages.length).toBeGreaterThanOrEqual(5);
        expect(JSON.stringify(data.routeStages)).toContain('Pachnai');
        data.routeStages.forEach((stage, i) => {
            expect(stage.step).toBe(i + 1);
            expect(stage.stage).toBeTruthy();
            expect(stage.altitude).toBeTruthy();
        });
    });

    it('ships a fully credited Wikimedia Commons image gallery', () => {
        expect(Array.isArray(data.gallery)).toBe(true);
        expect(data.gallery.length).toBeGreaterThanOrEqual(5);
        data.gallery.forEach(item => {
            expect(item.image.startsWith('https://')).toBe(true);
            expect(item.credit).toContain('Wikimedia Commons');
            expect(item.sourceUrl).toContain('commons.wikimedia.org');
        });
    });
});

describe('Harishchandragad Trek Profile — Page Structure & Assets', () => {
    let html;
    let css;

    beforeAll(() => {
        html = readTrekFile('index.html');
        css = readTrekFile('style.css');
    });

    it('renders hero, facts grid, route, gallery and credits sections', () => {
        expect(html).toContain('glt-hero');
        expect(html).toContain('id="facts-grid"');
        expect(html).toContain('id="routes-grid"');
        expect(html).toContain('id="gallery-grid"');
        expect(html).toContain('id="credits-list"');
        expect(html).toContain('Konkan Kada');
    });

    it('links global stylesheet and page stylesheet correctly', () => {
        expect(html).toContain('../../styles.css');
        expect(html).toContain('style.css');
        expect(css).toContain('.glt-hero');
    });

    it('registers the profile in the consolidated search index', () => {
        const searchIndex = readFileSync(
            resolve(__dirname, '../../search-index.js'),
            'utf-8'
        );
        expect(searchIndex).toContain('frontend/harishchandragad-trek/index.html');
        expect(searchIndex).toContain('Harishchandragad Trek');
    });

    it('render helpers produce DOM nodes for all content arrays', () => {
        const container = document.createElement('div');

        renderTrekFacts(HARISCHANDRAGAD_TREK_DATA.facts, container);
        expect(container.querySelectorAll('.fact-card').length).toBe(8);

        container.innerHTML = '';
        renderNaturalFeatures(HARISCHANDRAGAD_TREK_DATA.naturalFeatures, container);
        expect(container.querySelectorAll('.feature-card').length).toBe(
            HARISCHANDRAGAD_TREK_DATA.naturalFeatures.length
        );

        container.innerHTML = '';
        renderRouteStages(HARISCHANDRAGAD_TREK_DATA.routeStages, container);
        expect(container.querySelectorAll('.route-step-card').length).toBe(
            HARISCHANDRAGAD_TREK_DATA.routeStages.length
        );

        container.innerHTML = '';
        renderGallery(HARISCHANDRAGAD_TREK_DATA.gallery, container);
        expect(container.querySelectorAll('.gallery-card').length).toBe(
            HARISCHANDRAGAD_TREK_DATA.gallery.length
        );
        expect(container.querySelectorAll('img[loading="lazy"]').length).toBe(
            HARISCHANDRAGAD_TREK_DATA.gallery.length
        );

        container.innerHTML = '';
        renderImageCredits(HARISCHANDRAGAD_TREK_DATA.gallery, container);
        expect(container.querySelectorAll('li a[href*="commons.wikimedia.org"]').length).toBe(
            HARISCHANDRAGAD_TREK_DATA.gallery.length
        );
    });
});
