import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('How India Changes Across States Explorer', () => {
  let jsContent;
  let htmlContent;

  beforeEach(() => {
    jsContent = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/state-border-changes/state-border-changes.js'),
      'utf-8'
    );
    htmlContent = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/state-border-changes/state-border-changes.html'),
      'utf-8'
    );
  });

  it('contains state border data for cultural and geographical dimensions', () => {
    expect(jsContent).toContain('STATE_DATA');
    expect(jsContent).toContain('DIMENSIONS');
    expect(jsContent).toContain('Punjab');
    expect(jsContent).toContain('Rajasthan');
    expect(jsContent).toContain('Tamil Nadu');
    expect(jsContent).toContain('Kerala');
  });

  it('covers language, food, attire, climate, architecture, and traditions', () => {
    expect(jsContent).toContain('Language & Script');
    expect(jsContent).toContain('Cuisine & Food');
    expect(jsContent).toContain('Attire & Dress');
    expect(jsContent).toContain('Climate & Geography');
    expect(jsContent).toContain('Architecture & Dwellings');
    expect(jsContent).toContain('Traditions & Festivals');
  });

  it('includes interactive selectors and preset border chips', () => {
    expect(htmlContent).toContain('id="from-state-select"');
    expect(htmlContent).toContain('id="to-state-select"');
    expect(htmlContent).toContain('id="swap-states-btn"');
    expect(htmlContent).toContain('id="bc-search-input"');
    expect(htmlContent).toContain('class="bc-preset-chip"');
  });
});
