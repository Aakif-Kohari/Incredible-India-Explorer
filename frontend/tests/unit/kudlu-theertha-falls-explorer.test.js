import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Explore Kudlu Theertha Falls Integration (#2191)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/kudlu-theertha-falls-explorer');

  it('contains the explorer assets and required content', () => {
    const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');
    const css = fs.readFileSync(path.join(baseDir, 'style.css'), 'utf-8');
    const js = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf-8');

    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
    expect(html).toContain('Kudlu Theertha Falls');
    expect(html).toContain('Trail → Forest → Waterfall');
    expect(html).toContain('Seasonal comparison');
    expect(html).toContain('Location map');
    expect(html).toContain('Nearby explorer');
    expect(html).toContain('Sita River');
    expect(html).toContain('Sources &amp; credits');
    expect((html.match(/alt="/g) || []).length).toBeGreaterThanOrEqual(4);
    expect(html).toContain('leaflet@1.9.4');
    expect(css).toContain('.journey-panel');
    expect(css).toContain('.season-card');
    expect(js).toContain('journeyData');
    expect(js).toContain('seasonData');
    expect(js).toContain('setupMap');
  });

  it('is linked from landing data and search index', () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../../frontend/data.js'), 'utf-8');
    const search = fs.readFileSync(path.resolve(__dirname, '../../frontend/search-index.js'), 'utf-8');
    expect(data).toContain('frontend/kudlu-theertha-falls-explorer/index.html');
    expect(search).toContain('frontend/kudlu-theertha-falls-explorer/index.html');
    expect(search).toContain('Kudlu Theertha Falls: Navigate the Forest Waterfall Trail');
  });
});
