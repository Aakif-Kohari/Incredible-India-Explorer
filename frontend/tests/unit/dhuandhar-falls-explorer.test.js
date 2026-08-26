import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Make Dhuandhar Falls Explorer Integration (#2169)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/dhuandhar-falls-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains Narmada river map, marble geology, seasonal comparison, and viewpoints UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Dhuandhar Falls Explorer');
    expect(htmlContent).toContain('river-map-section');
    expect(htmlContent).toContain('river-pin');
    expect(htmlContent).toContain('geology-section');
    expect(htmlContent).toContain('seasonal-section');
    expect(htmlContent).toContain('viewpoints-section');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });
});
