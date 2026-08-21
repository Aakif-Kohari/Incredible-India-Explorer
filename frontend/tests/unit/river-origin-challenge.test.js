import { describe, it, expect } from 'vitest';
import { RIVERS_DATABASE } from '../../frontend/river-origin-challenge/script.js';

describe('River Origin Challenge Dataset & Features', () => {
  it('should contain 10 major Indian river systems with valid geographical properties', () => {
    expect(RIVERS_DATABASE).toHaveLength(10);

    const expectedRiverIds = ['ganga', 'yamuna', 'brahmaputra', 'godavari', 'krishna', 'narmada', 'kaveri', 'mahanadi', 'indus', 'tapti'];
    const actualIds = RIVERS_DATABASE.map(r => r.id);
    expect(actualIds).toEqual(expect.arrayContaining(expectedRiverIds));

    RIVERS_DATABASE.forEach(river => {
      expect(river).toHaveProperty('id');
      expect(river).toHaveProperty('name');
      expect(river).toHaveProperty('length');
      expect(river).toHaveProperty('origin');
      expect(river.originCoords).toHaveLength(2);
      expect(river).toHaveProperty('tributaries');
      expect(river.tribCoords).toHaveLength(2);
      expect(river).toHaveProperty('destination');
      expect(river.destCoords).toHaveLength(2);
      expect(river).toHaveProperty('states');
      expect(river).toHaveProperty('educationalExplanation');
    });
  });

  it('should verify Ganga origin glacier details', () => {
    const ganga = RIVERS_DATABASE.find(r => r.id === 'ganga');
    expect(ganga.origin).toContain('Gangotri Glacier');
    expect(ganga.destination).toContain('Bay of Bengal');
    expect(ganga.tributaries).toContain('Yamuna');
  });

  it('should verify Narmada rift valley origin', () => {
    const narmada = RIVERS_DATABASE.find(r => r.id === 'narmada');
    expect(narmada.origin).toContain('Amarkantak');
    expect(narmada.destination).toContain('Arabian Sea');
  });

  it('should verify Godavari Dakshin Ganga details', () => {
    const godavari = RIVERS_DATABASE.find(r => r.id === 'godavari');
    expect(godavari.origin).toContain('Trimbakeshwar');
    expect(godavari.significance).toContain('Dakshin Ganga');
  });
});
