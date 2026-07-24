import { describe, it, expect } from 'vitest';
import { CITIES, calculateCost } from '../../frontend/metro-master/script.js';

describe('Metro Master Game Logic', () => {
  it('should have cities dataset initialized with required fields', () => {
    expect(Array.isArray(CITIES)).toBe(true);
    expect(CITIES.length).toBeGreaterThanOrEqual(5);

    CITIES.forEach(city => {
      expect(city).toHaveProperty('id');
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('x');
      expect(city).toHaveProperty('y');
      expect(city).toHaveProperty('status');
    });
  });

  it('should accurately calculate metro route construction costs', () => {
    const cityA = { x: 10, y: 10 };
    const cityB = { x: 10, y: 20 };

    const cost = calculateCost(cityA, cityB);
    expect(cost).toBe(60); // Math.sqrt(0 + 100) * 6 = 10 * 6 = 60
  });
});
