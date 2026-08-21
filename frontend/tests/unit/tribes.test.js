import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Indian Tribal Culture Explorer', () => {
  let pagesCommonContent;

  beforeEach(() => {
    pagesCommonContent = fs.readFileSync(
      path.resolve(__dirname, '../../pages-common.js'),
      'utf-8'
    );
  });

  it('contains valid tribes dataset with required fields', () => {
    expect(pagesCommonContent).toContain('TRIBES_DATA');
    expect(pagesCommonContent).toContain("name: 'Gond'");
    expect(pagesCommonContent).toContain("name: 'Santhal'");
    expect(pagesCommonContent).toContain("name: 'Naga'");
    expect(pagesCommonContent).toContain("name: 'Toda'");
    expect(pagesCommonContent).toContain("name: 'Bhil'");
    expect(pagesCommonContent).toContain("name: 'Khasi'");
    expect(pagesCommonContent).toContain("name: 'Warli'");
    expect(pagesCommonContent).toContain("name: 'Bhutia'");
  });

  it('supports regional categorization across all 6 Indian regions', () => {
    expect(pagesCommonContent).toContain("key: 'north'");
    expect(pagesCommonContent).toContain("key: 'northeast'");
    expect(pagesCommonContent).toContain("key: 'central'");
    expect(pagesCommonContent).toContain("key: 'east'");
    expect(pagesCommonContent).toContain("key: 'west'");
    expect(pagesCommonContent).toContain("key: 'south'");
  });

  it('includes search and state/language filtering logic', () => {
    expect(pagesCommonContent).toContain('tribes-search-input');
    expect(pagesCommonContent).toContain('tribes-state-select');
    expect(pagesCommonContent).toContain('tribes-language-select');
    expect(pagesCommonContent).toContain('populateDropdowns');
  });
});
