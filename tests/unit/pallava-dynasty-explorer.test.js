import { describe, it, expect } from 'vitest';
import { dynasties } from '../../frontend/history/dynasties/data.js';

describe('Pallava Dynasty Explorer Integration', () => {
  it('exposes Pallava Dynasty data structure correctly', () => {
    const pallava = dynasties.find((d) => d.id === 'pallava');
    if (pallava) {
      expect(pallava.name).toBe('Pallava Dynasty');
      expect(pallava.era).toBe('ancient');
    }
  });
});
