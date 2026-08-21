import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const page = fs.readFileSync(path.join(root, 'frontend/abbey-falls-explorer/index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'frontend/abbey-falls-explorer/script.js'), 'utf8');
const data = fs.readFileSync(path.join(root, 'frontend/data.js'), 'utf8');
const searchIndex = fs.readFileSync(path.join(root, 'frontend/search-index.js'), 'utf8');

describe('Abbey Falls Explorer', () => {
    it('contains the required content sections', () => {
        for (const id of ['overview', 'landscape', 'seasonal', 'gallery', 'map', 'nearby', 'credits']) {
            expect(page).toContain(`id="${id}"`);
        }
        for (const text of ['Location', 'Water source', 'Vegetation', 'Abbey Falls']) {
            expect(page).toContain(text);
        }
    });

    it('includes four credited visual views with alt text', () => {
        expect((page.match(/<img /g) || []).length).toBeGreaterThanOrEqual(4);
        expect((page.match(/alt="[^"]+"/g) || []).length).toBeGreaterThanOrEqual(4);
        expect(page).toContain('Wikimedia Commons — Abbey Falls category');
    });

    it('provides seasonal and landscape interactions', () => {
        for (const season of ['monsoon', 'post', 'winter', 'summer']) expect(page).toContain(`data-season="${season}"`);
        for (const layer of ['plantation', 'gorge', 'river']) expect(script).toContain(`${layer}:`);
        expect(script).toContain('updateSeason');
    });

    it('provides working map configuration and nearby attraction markers', () => {
        expect(page).toContain('id="abbey-map"');
        expect(page).toContain('id="nearby-map"');
        expect(script).toContain('tile.openstreetmap.org');
        for (const place of ['abbey', 'raja', 'omkareshwara', 'nisargadhama']) expect(script).toContain(`${place}:`);
    });

    it('integrates the explorer into the landing data and search index', () => {
        expect(data).toContain('id: "abbey-falls"');
        expect(data).toContain('frontend/abbey-falls-explorer/index.html');
        expect(searchIndex).toContain('title: "Abbey Falls Explorer"');
        expect(searchIndex).toContain('url: "frontend/abbey-falls-explorer/index.html"');
    });
});
