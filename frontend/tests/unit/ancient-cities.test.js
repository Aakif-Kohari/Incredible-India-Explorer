/**
 * ancient-cities.test.js
 * Unit tests for India's Lost Cities & Ancient Civilizations Explorer dataset integrity,
 * mandatory city coverage (Dholavira, Lothal, Pataliputra, Vijayanagara, Taxila, Fatehpur Sikri),
 * archaeological discoveries, excavation facts, before-vs-today comparison, and search filters.
 */

import { describe, it, expect } from 'vitest';
import {
  ancientCitiesData,
  getCityById,
  filterCities,
  compareBeforeVsToday
} from '../../frontend/ancient-cities/ancient-cities.js';

const MANDATORY_CITIES = [
  'dholavira',
  'lothal',
  'pataliputra',
  'vijayanagara',
  'taxila',
  'fatehpur-sikri'
];

describe('Ancient Cities Dataset Coverage & Mandatory Inclusion', () => {
  it('contains at least 6 ancient cities', () => {
    expect(ancientCitiesData.length).toBeGreaterThanOrEqual(6);
  });

  it('includes all mandatory cities from issue description', () => {
    const cityIds = ancientCitiesData.map(c => c.id.toLowerCase());
    MANDATORY_CITIES.forEach(mandatoryId => {
      expect(cityIds).toContain(mandatoryId);
    });
  });
});

describe('Archaeological Discoveries & Excavation Facts Integrity', () => {
  it('every city contains valid archaeological discoveries and excavation facts', () => {
    ancientCitiesData.forEach((city, index) => {
      expect(city, `City at index ${index} missing id`).toHaveProperty('id');
      expect(city, `City at index ${index} missing name`).toHaveProperty('name');
      expect(city, `City at index ${index} missing civilization`).toHaveProperty('civilization');
      expect(city, `City at index ${index} missing eraPeriod`).toHaveProperty('eraPeriod');
      expect(city, `City at index ${index} missing location`).toHaveProperty('location');
      expect(city, `City at index ${index} missing mapCoords`).toHaveProperty('mapCoords');
      expect(city, `City at index ${index} missing archaeologicalDiscoveries`).toHaveProperty('archaeologicalDiscoveries');
      expect(city, `City at index ${index} missing excavationFacts`).toHaveProperty('excavationFacts');
      expect(city, `City at index ${index} missing beforeVsToday`).toHaveProperty('beforeVsToday');

      // Discoveries array check
      expect(Array.isArray(city.archaeologicalDiscoveries)).toBe(true);
      expect(city.archaeologicalDiscoveries.length).toBeGreaterThanOrEqual(3);

      // Excavation facts details check
      expect(city.excavationFacts).toHaveProperty('discoveredBy');
      expect(city.excavationFacts).toHaveProperty('keyExcavator');
      expect(city.excavationFacts).toHaveProperty('status');
      expect(city.excavationFacts).toHaveProperty('historicalSignificance');
    });
  });

  it('all city IDs are unique', () => {
    const ids = ancientCitiesData.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Before vs Today Comparison Engine', () => {
  it('generates valid Before vs Today comparison data for Dholavira and Lothal', () => {
    const dholaviraComp = compareBeforeVsToday('dholavira');
    expect(dholaviraComp).toBeDefined();
    expect(dholaviraComp.cityName).toBe('Dholavira');
    expect(dholaviraComp.before).toContain('Citadel');
    expect(dholaviraComp.today).toContain('reservoirs');

    const lothalComp = compareBeforeVsToday('lothal');
    expect(lothalComp).toBeDefined();
    expect(lothalComp.cityName).toBe('Lothal');
    expect(lothalComp.before).toContain('dockyard');
    expect(lothalComp.today).toContain('Museum');
  });

  it('returns null when comparing invalid city ID', () => {
    expect(compareBeforeVsToday('invalid-city-xyz')).toBeNull();
  });
});

describe('City Query & Search Filters', () => {
  it('retrieves city profile by ID or partial name', () => {
    const city = getCityById('vijayanagara');
    expect(city).toBeDefined();
    expect(city.name).toContain('Vijayanagara');

    const taxila = getCityById('Taxila');
    expect(taxila).toBeDefined();
    expect(taxila.id).toBe('taxila');
  });

  it('filters ancient cities by search query (e.g. Ashoka, Dockyard, or Reservoir)', () => {
    const ashokaRes = filterCities('Ashoka');
    expect(ashokaRes.length).toBeGreaterThan(0);
    expect(ashokaRes.some(c => c.name.includes('Pataliputra') || c.name.includes('Taxila'))).toBe(true);

    const dockyardRes = filterCities('Dockyard');
    expect(dockyardRes.length).toBeGreaterThan(0);
    expect(dockyardRes[0].id).toBe('lothal');
  });

  it('filters cities by region or civilization tag', () => {
    const harappanRes = filterCities('', 'harappan');
    expect(harappanRes.length).toBeGreaterThanOrEqual(2);

    const southRes = filterCities('', 'south');
    expect(southRes.length).toBeGreaterThan(0);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterCities('NonExistentCityXYZ');
    expect(res).toEqual([]);
  });
});
