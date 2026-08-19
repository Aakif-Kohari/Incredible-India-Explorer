import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Tiger Falls: Trace the Forest Cascade of Chakrata (#2176)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/tiger-falls-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains height visualization, deodar forest map, seasonal comparison, and trek access UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Tiger Falls');
    expect(htmlContent).toContain('height-section');
    expect(htmlContent).toContain('h-zone-card');
    expect(htmlContent).toContain('forest-map-section');
    expect(htmlContent).toContain('forest-pin');
    expect(htmlContent).toContain('seasonal-section');
    expect(htmlContent).toContain('access-section');
    expect(htmlContent).toContain('attractions-section');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });

  it('is linked correctly from waterfalls-of-india landing page with unique route', () => {
    const landingScript = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/waterfalls-of-india/script.js'),
      'utf-8'
    );
    expect(landingScript).toContain('../tiger-falls-explorer/index.html');
    const count = (landingScript.match(/id:\s*"tiger-falls"/g) || []).length;
    expect(count).toBe(1);
  });
});
