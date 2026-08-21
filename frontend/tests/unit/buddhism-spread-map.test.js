import { describe, it, expect } from 'vitest';
import { BUDDHISM_ERAS_DATA, getCumulativeRoutes, renderEraDetails } from '../../frontend/buddhism-spread-map/script.js';

describe('Buddhism Spread Map Logic', () => {
  it('should contain 5 chronological eras with objective historical data', () => {
    expect(Array.isArray(BUDDHISM_ERAS_DATA)).toBe(true);
    expect(BUDDHISM_ERAS_DATA.length).toBe(5);

    BUDDHISM_ERAS_DATA.forEach(era => {
      expect(era).toHaveProperty('id');
      expect(era).toHaveProperty('title');
      expect(era).toHaveProperty('timeframe');
      expect(era).toHaveProperty('summary');
      expect(Array.isArray(era.routes)).toBe(true);
      expect(Array.isArray(era.highlights)).toBe(true);
    });
  });

  it('should accumulate route vectors progressively per era step', () => {
    const era0Routes = getCumulativeRoutes(0);
    const era1Routes = getCumulativeRoutes(1);
    const era3Routes = getCumulativeRoutes(3);

    expect(era0Routes.length).toBe(0);
    expect(era1Routes.length).toBe(2);
    expect(era3Routes.length).toBe(7);
  });

  it('should render detailed HTML card for selected era', () => {
    const html0 = renderEraDetails(0);
    expect(html0).toContain('Origins in Ancient Magadha & Ganges Basin');
    expect(html0).toContain('Bodh Gaya & Sarnath');

    const html1 = renderEraDetails(1);
    expect(html1).toContain('Mauryan Expansion under Emperor Ashoka');
    expect(html1).toContain('3rd Century BCE');

    const html3 = renderEraDetails(3);
    expect(html3).toContain('Silk Road & Transmission to East Asia');
    expect(html3).toContain('Scholar-Translators');
  });
});
