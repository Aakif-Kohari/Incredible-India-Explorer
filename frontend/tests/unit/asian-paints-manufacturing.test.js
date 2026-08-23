import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Asian Paints Manufacturing (#2649)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/asian-paints-manufacturing');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains required UI elements for the profile', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Asian Paints');
    expect(htmlContent).toContain('process-controls');
    expect(htmlContent).toContain('process-btn');
    expect(htmlContent).toContain('process-display');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    if (writePos !== -1) {
        expect(writePos).toBeGreaterThan(bodyPos);
    }
  });
});
