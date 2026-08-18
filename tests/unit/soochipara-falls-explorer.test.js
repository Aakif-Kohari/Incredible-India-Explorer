import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Explore Soochipara Falls Integration (#2172)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/soochipara-falls-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains 3-tier cascade, forest map, seasonal comparison, and trek info UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Soochipara Falls');
    expect(htmlContent).toContain('tier-section');
    expect(htmlContent).toContain('tier-block');
    expect(htmlContent).toContain('forest-map-section');
    expect(htmlContent).toContain('map-pin');
    expect(htmlContent).toContain('seasonal-section');
    expect(htmlContent).toContain('attractions-section');
    expect(htmlContent).toContain('trek-info-section');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });

  it('is linked correctly from waterfalls-of-india landing page', () => {
    const landingScript = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/waterfalls-of-india/script.js'),
      'utf-8'
    );
    expect(landingScript).toContain('../soochipara-falls-explorer/index.html');
  });
});
