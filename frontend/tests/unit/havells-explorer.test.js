import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Havells Explorer', () => {
    const baseDir = path.resolve(__dirname, '../../frontend/havells-explorer');

    it('contains the explorer assets', () => {
        expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
        expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
        expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
    });

    it('covers the requested history, categories, manufacturing story and sources', () => {
        const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
        expect(html).toContain('Qimat Rai Gupta');
        expect(html).toContain('1958');
        expect(html).toContain('1971');
        expect(html).toContain('Product portfolio');
        expect(html).toContain('Manufacturing story');
        expect(html).toContain('Sources & credits');
        expect((html.match(/alt="/g) || []).length).toBeGreaterThanOrEqual(4);
    });

    it('contains interactive category and timeline datasets', () => {
        const js = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf8');
        expect(js).toContain('categories');
        expect(js).toContain('milestones');
        expect(js).toContain('renderCategories');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('data-category');
        expect(js).toContain('data-era');
    });

    it('is integrated into the landing data and search index', () => {
        const data = fs.readFileSync(path.resolve(__dirname, '../../frontend/data.js'), 'utf8');
        const search = fs.readFileSync(path.resolve(__dirname, '../../frontend/search-index.js'), 'utf8');
        expect(data).toContain('id: "havells-explorer"');
        expect(data).toContain('frontend/havells-explorer/index.html');
        expect(search).toContain("Havells: Explore India's Electrical Consumer Brand");
        expect(search).toContain('frontend/havells-explorer/index.html');
    });
});
