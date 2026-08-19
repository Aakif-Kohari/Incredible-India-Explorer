import { describe, it, expect } from 'vitest';
import { RIVERS_DATA, calculateAccuracy, renderFactSheet } from '../../frontend/river-trace/script.js';

describe('River Trace Challenge Logic', () => {
  it('should contain complete dataset for 5 major rivers with waypoints', () => {
    const keys = Object.keys(RIVERS_DATA);
    expect(keys).toEqual(['ganga', 'yamuna', 'godavari', 'krishna', 'brahmaputra']);

    keys.forEach(key => {
      const river = RIVERS_DATA[key];
      expect(river).toHaveProperty('id');
      expect(river).toHaveProperty('name');
      expect(river).toHaveProperty('length');
      expect(Array.isArray(river.statesCrossed)).toBe(true);
      expect(Array.isArray(river.tributaries)).toBe(true);
      expect(Array.isArray(river.actualWaypoints)).toBe(true);
      expect(river.actualWaypoints.length).toBeGreaterThanOrEqual(5);
    });
  });

  it('should return 100% accuracy for identical waypoints', () => {
    const ganga = RIVERS_DATA.ganga;
    const accuracy = calculateAccuracy(ganga.actualWaypoints, ganga.actualWaypoints);
    expect(accuracy).toBe(100);
  });

  it('should return scaled accuracy for offset waypoints', () => {
    const targetWaypoints = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
    const userWaypoints = [{ x: 110, y: 110 }, { x: 210, y: 210 }];

    const accuracy = calculateAccuracy(userWaypoints, targetWaypoints);
    expect(accuracy).toBeGreaterThan(80);
    expect(accuracy).toBeLessThan(100);
  });

  it('should return 0% accuracy for missing or empty waypoints', () => {
    expect(calculateAccuracy([], RIVERS_DATA.ganga.actualWaypoints)).toBe(0);
    expect(calculateAccuracy(null, null)).toBe(0);
  });

  it('should render detailed river fact sheet on completion', () => {
    const factSheetHtml = renderFactSheet(RIVERS_DATA.godavari, 92);
    expect(factSheetHtml).toContain('Godavari');
    expect(factSheetHtml).toContain('Dakshin Ganga');
    expect(factSheetHtml).toContain('Tracing Accuracy: 92%');
    expect(factSheetHtml).toContain('1,465 km');
  });
});
