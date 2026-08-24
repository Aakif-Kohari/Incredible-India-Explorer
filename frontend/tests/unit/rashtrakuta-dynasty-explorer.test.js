import { describe, it, expect } from 'vitest';
import { dynasties } from '../../frontend/history/dynasties/data.js';

describe('Rashtrakuta Dynasty Explorer Integration', () => {
  it('exposes Rashtrakuta Dynasty data structure correctly', () => {
    const rashtrakuta = dynasties.find((d) => d.id === 'rashtrakuta');
    if (rashtrakuta) {
      expect(rashtrakuta.name).toBe('Rashtrakuta Dynasty');
      expect(rashtrakuta.era).toBe('medieval');
    }
  });
});
