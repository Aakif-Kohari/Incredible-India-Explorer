import { describe, it, expect } from 'vitest';
import { STYLES, PARTS_PALETTE } from '../../frontend/temple-architect/script.js';

describe('Temple Architect Challenge Logic', () => {
  it('should include Nagara, Dravidian, and Vesara styles dataset', () => {
    expect(Array.isArray(STYLES)).toBe(true);
    expect(STYLES.length).toBe(3);

    const styleIds = STYLES.map(s => s.id);
    expect(styleIds).toContain('nagara');
    expect(styleIds).toContain('dravidian');
    expect(styleIds).toContain('vesara');
  });

  it('should provide architectural components for top, middle, and base parts', () => {
    expect(Array.isArray(PARTS_PALETTE)).toBe(true);
    expect(PARTS_PALETTE.length).toBe(9);

    const types = PARTS_PALETTE.map(p => p.type);
    expect(types).toContain('top');
    expect(types).toContain('middle');
    expect(types).toContain('base');
  });
});
