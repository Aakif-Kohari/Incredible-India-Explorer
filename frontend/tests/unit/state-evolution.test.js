import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('State Evolution Timeline Explorer', () => {
  let jsContent;
  let htmlContent;

  beforeEach(() => {
    jsContent = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/state-evolution/state-evolution.js'),
      'utf-8'
    );
    htmlContent = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/state-evolution/state-evolution.html'),
      'utf-8'
    );
  });

  it('contains historical timeline dataset from 1947 to 2024', () => {
    expect(jsContent).toContain('HISTORICAL_MILESTONES');
    expect(jsContent).toContain('1947: Independence');
    expect(jsContent).toContain('1956: States Reorganisation Act');
    expect(jsContent).toContain('2014: Formation of Telangana');
  });

  it('contains state evolution data for Indian states and UTs', () => {
    expect(jsContent).toContain('STATE_EVOLUTION_DATA');
    expect(jsContent).toContain("name: 'Andhra Pradesh'");
    expect(jsContent).toContain("name: 'Maharashtra'");
    expect(jsContent).toContain("name: 'Nagaland'");
    expect(jsContent).toContain("name: 'Sikkim'");
  });

  it('includes interactive slider and search UI controls', () => {
    expect(htmlContent).toContain('id="year-slider"');
    expect(htmlContent).toContain('id="evo-search-input"');
    expect(htmlContent).toContain('id="evo-region-filter"');
    expect(htmlContent).toContain('id="milestone-box"');
  });
});
