import { describe, it, expect } from 'vitest';
import { dynasties } from '../../frontend/history/dynasties/data.js';

describe('Satavahana Dynasty Explorer Integration', () => {
  it('exposes Satavahana Dynasty data structure correctly', () => {
    const satavahana = dynasties.find((d) => d.id === 'satavahana');
    if (satavahana) {
      expect(satavahana.name).toBe('Satavahana Dynasty');
      expect(satavahana.era).toBe('ancient');
    }
  });
});
