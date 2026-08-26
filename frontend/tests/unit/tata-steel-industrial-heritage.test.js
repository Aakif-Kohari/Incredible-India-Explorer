import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Tata Steel Industrial Heritage (#2646)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/tata-steel-industrial-heritage');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains required UI elements for the profile', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Tata Steel');
    expect(htmlContent).toContain('milestones-timeline-list');
    expect(htmlContent).toContain('milestone-search-input');
    expect(htmlContent).toContain('category-filter');
    expect(htmlContent).toContain('milestone-modal');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    if (writePos !== -1) {
        expect(writePos).toBeGreaterThan(bodyPos);
    }
  });
});
