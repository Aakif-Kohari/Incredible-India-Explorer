import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Guess the Indian Brand Quiz (#2665)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/guess-indian-brand-quiz');

  it('contains index.html, style.css, script.js, and brand-data.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'brand-data.js'))).toBe(true);
  });

  it('index.html contains required UI elements for the quiz', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Guess the Indian Brand');
    expect(htmlContent).toContain('difficulty-select');
    expect(htmlContent).toContain('brand-image-container');
    expect(htmlContent).toContain('options-grid');
    expect(htmlContent).toContain('brand-info-card');
    expect(htmlContent).toContain('result-banner');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    if (writePos !== -1) {
        expect(writePos).toBeGreaterThan(bodyPos);
    }
  });
});
