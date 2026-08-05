import { describe, it, expect } from 'vitest';
import { CROPS_DATABASE } from '../../frontend/crop-journey/script.js';

describe('Crop Journey Game Dataset & Agronomy Logic', () => {
  it('should contain 12 major Indian crops across Kharif, Rabi, and Zaid seasons', () => {
    expect(CROPS_DATABASE).toHaveLength(12);

    const seasons = CROPS_DATABASE.map(c => c.season);
    expect(seasons).toContain('kharif');
    expect(seasons).toContain('rabi');
    expect(seasons).toContain('zaid');

    CROPS_DATABASE.forEach(crop => {
      expect(crop).toHaveProperty('id');
      expect(crop).toHaveProperty('name');
      expect(crop).toHaveProperty('season');
      expect(crop).toHaveProperty('seasonLabel');
      expect(crop).toHaveProperty('climate');
      expect(crop).toHaveProperty('states');
      expect(crop).toHaveProperty('harvestWindow');
      expect(crop).toHaveProperty('educationalInsight');
    });
  });

  it('should verify Kharif monsoon crops (Paddy, Cotton, Soyabean)', () => {
    const rice = CROPS_DATABASE.find(c => c.id === 'rice');
    expect(rice.season).toBe('kharif');
    expect(rice.states).toContain('West Bengal');

    const cotton = CROPS_DATABASE.find(c => c.id === 'cotton');
    expect(cotton.season).toBe('kharif');
    expect(cotton.climate).toContain('Black Soil');
  });

  it('should verify Rabi winter crops (Wheat, Mustard, Gram)', () => {
    const wheat = CROPS_DATABASE.find(c => c.id === 'wheat');
    expect(wheat.season).toBe('rabi');
    expect(wheat.states).toContain('Punjab');

    const mustard = CROPS_DATABASE.find(c => c.id === 'mustard');
    expect(mustard.season).toBe('rabi');
    expect(mustard.states).toContain('Rajasthan');
  });

  it('should verify Zaid summer crops (Watermelon, Cucumber)', () => {
    const watermelon = CROPS_DATABASE.find(c => c.id === 'watermelon');
    expect(watermelon.season).toBe('zaid');
    expect(watermelon.harvestWindow).toContain('May-June');

    const cucumber = CROPS_DATABASE.find(c => c.id === 'cucumber');
    expect(cucumber.season).toBe('zaid');
  });
});
