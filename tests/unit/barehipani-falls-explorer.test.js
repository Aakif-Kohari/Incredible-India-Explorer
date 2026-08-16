import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Barehipani Falls: Explore the Giant Cascade of Similipal (#2173)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/barehipani-falls-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains 5-step journey explorer (Waterfall -> Height -> Landscape -> Season -> Location)', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Barehipani Falls');
    expect(htmlContent).toContain('journey-section');
    expect(htmlContent).toContain('step-btn');
    expect(htmlContent).toContain('height-section');
    expect(htmlContent).toContain('similipal-section');
    expect(htmlContent).toContain('seasonal-section');
    expect(htmlContent).toContain('location-map-section');
    expect(htmlContent).toContain('similipal-pin');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });

  it('is linked correctly from waterfalls-of-india landing page without duplicate data', () => {
    const landingScript = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/waterfalls-of-india/script.js'),
      'utf-8'
    );
    expect(landingScript).toContain('../barehipani-falls-explorer/index.html');
    const count = (landingScript.match(/id:\s*"barehipani"/g) || []).length;
    expect(count).toBe(1);
  });
});
