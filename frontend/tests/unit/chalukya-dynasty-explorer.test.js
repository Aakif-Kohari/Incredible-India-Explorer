import { describe, it, expect } from 'vitest';
import { dynasties } from '../../frontend/history/dynasties/data.js';

describe('Chalukya Dynasty Explorer Integration', () => {
  it('exposes Chalukya Dynasty data structure correctly', () => {
    const chalukya = dynasties.find((d) => d.id === 'chalukya');
    if (chalukya) {
      expect(chalukya.name).toBe('Western Chalukya');
      expect(chalukya.era).toBe('medieval');
    }
  });
});
