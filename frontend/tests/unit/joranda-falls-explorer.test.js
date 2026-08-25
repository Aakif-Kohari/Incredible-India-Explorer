import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Joranda Falls: Discover the Single-Drop Cascade of Similipal (#2174)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/joranda-falls-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains single-drop structure, height ladder visualizer, seasonal comparison, and Similipal map UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Joranda Falls');
    expect(htmlContent).toContain('structure-section');
    expect(htmlContent).toContain('height-section');
    expect(htmlContent).toContain('ladder-step');
    expect(htmlContent).toContain('seasonal-section');
    expect(htmlContent).toContain('similipal-section');
    expect(htmlContent).toContain('location-map-section');
    expect(htmlContent).toContain('joranda-pin');

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
    expect(landingScript).toContain('../joranda-falls-explorer/index.html');
    const count = (landingScript.match(/id:\s*"joranda"/g) || []).length;
    expect(count).toBe(1);
  });
});
