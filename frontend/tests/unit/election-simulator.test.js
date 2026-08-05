import { describe, it, expect } from 'vitest';
import { CONSTITUENCIES, PARTIES } from '../../frontend/election-simulator/script.js';

describe('Indian Election Simulator Logic', () => {
  it('should list official constituencies dataset', () => {
    expect(Array.isArray(CONSTITUENCIES)).toBe(true);
    expect(CONSTITUENCIES.length).toBeGreaterThanOrEqual(3);
    CONSTITUENCIES.forEach(c => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('state');
    });
  });

  it('should list participating political parties and EVM symbols', () => {
    expect(Array.isArray(PARTIES)).toBe(true);
    expect(PARTIES.length).toBeGreaterThanOrEqual(3);
    PARTIES.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('symbol');
      expect(p).toHaveProperty('candidate');
    });
  });
});
