import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Historic Battles Explorer Landing Page Integration', () => {
  it('has index.html, style.css, and script.js files', () => {
    const htmlPath = path.resolve(__dirname, '../../frontend/historic-battles-explorer/index.html');
    const cssPath = path.resolve(__dirname, '../../frontend/historic-battles-explorer/style.css');
    const jsPath = path.resolve(__dirname, '../../frontend/historic-battles-explorer/script.js');

    expect(fs.existsSync(htmlPath)).toBe(true);
    expect(fs.existsSync(cssPath)).toBe(true);
    expect(fs.existsSync(jsPath)).toBe(true);
  });
});
