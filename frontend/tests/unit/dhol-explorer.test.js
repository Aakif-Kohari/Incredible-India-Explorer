import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Dhol Explorer Module', () => {
    const baseDir = path.resolve(__dirname, '../../frontend/dhol-explorer');

    it('contains index.html, dhol.css, dhol.js, and dhol-data.js files', () => {
        expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
        expect(fs.existsSync(path.join(baseDir, 'dhol.css'))).toBe(true);
        expect(fs.existsSync(path.join(baseDir, 'dhol.js'))).toBe(true);
        expect(fs.existsSync(path.join(baseDir, 'dhol-data.js'))).toBe(true);
    });

    it('contains all required SVG image assets', () => {
        const assetsDir = path.join(baseDir, 'assets');
        expect(fs.existsSync(path.join(assetsDir, 'dhol-anatomy.svg'))).toBe(true);
        expect(fs.existsSync(path.join(assetsDir, 'dhol-sticks.svg'))).toBe(true);
        expect(fs.existsSync(path.join(assetsDir, 'dhol-ensemble.svg'))).toBe(true);
        expect(fs.existsSync(path.join(assetsDir, 'dhol-construction-shell.svg'))).toBe(true);
        expect(fs.existsSync(path.join(assetsDir, 'dhol-construction-heads.svg'))).toBe(true);
        expect(fs.existsSync(path.join(assetsDir, 'dhol-construction-lacing.svg'))).toBe(true);
    });

    it('index.html contains required sections and interactive components', () => {
        const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');
        expect(html).toContain('Dhol Explorer');
        expect(html).toContain('Avanaddh Vadya');
        expect(html).toContain('regional-explorer');
        expect(html).toContain('festivals');
        expect(html).toContain('dance-traditions');
        expect(html).toContain('construction');
        expect(html).toContain('gallery');
        expect(html).toContain('significance');
        expect(html).toContain('image-credits');
    });

    it('dhol-data.js exports comprehensive dhol dataset and regional variants', () => {
        const data = fs.readFileSync(path.join(baseDir, 'dhol-data.js'), 'utf-8');
        expect(data).toContain('DHOL_INFO');
        expect(data).toContain('REGIONAL_VARIANTS');
        expect(data).toContain('FESTIVALS');
        expect(data).toContain('DANCE_TRADITIONS');
        expect(data).toContain('CONSTRUCTION_STEPS');
        expect(data).toContain('GALLERY_ITEMS');
        expect(data).toContain('CULTURAL_SIGNIFICANCE');
        expect(data).toContain('punjabi-dhol');
        expect(data).toContain('bengali-dhak');
        expect(data).toContain('dhol-tasha');
    });
});
