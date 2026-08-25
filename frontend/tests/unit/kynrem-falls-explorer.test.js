import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Explore Kynrem Falls Integration (#2168)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/kynrem-falls-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains three-tier, height chart, seasonal flow, and location map UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Kynrem Falls');
    expect(htmlContent).toContain('tier-visualization');
    expect(htmlContent).toContain('tier-block-1');
    expect(htmlContent).toContain('tier-block-2');
    expect(htmlContent).toContain('tier-block-3');
    expect(htmlContent).toContain('height-comparison');
    expect(htmlContent).toContain('seasonal-section');
    expect(htmlContent).toContain('map-section');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });
});
