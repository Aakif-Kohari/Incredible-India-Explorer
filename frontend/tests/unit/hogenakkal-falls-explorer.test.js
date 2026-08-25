import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Explore Hogenakkal Falls Integration (#2170)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/hogenakkal-falls-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains river-flow map, carbonatite geology, seasonal comparison, and responsible tourism UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Hogenakkal Falls');
    expect(htmlContent).toContain('river-map-section');
    expect(htmlContent).toContain('river-pin');
    expect(htmlContent).toContain('geology-section');
    expect(htmlContent).toContain('seasonal-section');
    expect(htmlContent).toContain('viewpoints-section');
    expect(htmlContent).toContain('responsible-tourism-section');

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
    expect(landingScript).toContain('../hogenakkal-falls-explorer/index.html');
  });
});
