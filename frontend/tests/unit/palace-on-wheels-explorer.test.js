import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Palace on Wheels Explorer (#2244)', () => {
    const root = path.resolve(__dirname, '../../frontend/palace-on-wheels-explorer');
    const read = file => fs.readFileSync(path.join(root, file), 'utf-8');

    it('contains the complete explorer page assets', () => {
        expect(fs.existsSync(path.join(root, 'index.html'))).toBe(true);
        expect(fs.existsSync(path.join(root, 'style.css'))).toBe(true);
        expect(fs.existsSync(path.join(root, 'script.js'))).toBe(true);
    });

    it('covers the requested Palace on Wheels content and responsive UI sections', () => {
        const html = read('index.html');
        expect(html).toContain('Palace on Wheels');
        expect(html).toContain('id="history"');
        expect(html).toContain('id="route"');
        expect(html).toContain('id="experience"');
        expect(html).toContain('id="destinations"');
        expect(html).toContain('id="cultural-experiences"');
        expect(html).toContain('id="facts"');
        expect(html).toContain('id="gallery"');
        expect(html).toContain('id="sources"');
        expect(html).toContain('7N / 8D');
        expect(html).toContain('1982');
        expect(html).toContain('New Delhi');
    });

    it('includes meaningful imagery with alt text and source credits', () => {
        const html = read('index.html');
        const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
        expect(images.length).toBeGreaterThanOrEqual(5);
        expect(images.every(img => /\balt="[^"]+"/.test(img))).toBe(true);
        expect(html).toContain('Wikimedia Commons');
        expect(html).toContain('commons.wikimedia.org');
    });

    it('defines the full route, map and destination explorer', () => {
        const script = read('script.js');
        expect(script).toContain('New Delhi');
        expect(script).toContain('Jaipur');
        expect(script).toContain('Sawai Madhopur');
        expect(script).toContain('Chittorgarh');
        expect(script).toContain('Udaipur');
        expect(script).toContain('Jaisalmer');
        expect(script).toContain('Jodhpur');
        expect(script).toContain('Bharatpur');
        expect(script).toContain('Agra');
        expect(script).toContain('L.tileLayer');
        expect(script).toContain('L.polyline');
        expect(script).toContain('destinationGrid');
    });

    it('is integrated into the main landing data and search index', () => {
        const data = fs.readFileSync(path.resolve(__dirname, '../../frontend/data.js'), 'utf-8');
        const search = fs.readFileSync(path.resolve(__dirname, '../../frontend/search-index.js'), 'utf-8');
        expect(data).toContain('id: "palace-on-wheels"');
        expect(data).toContain('frontend/palace-on-wheels-explorer/index.html');
        expect(search).toContain('title: "Palace on Wheels Explorer"');
        expect(search).toContain('frontend/palace-on-wheels-explorer/index.html');
    });
});
