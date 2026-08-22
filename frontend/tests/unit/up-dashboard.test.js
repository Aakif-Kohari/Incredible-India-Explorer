/**
 * up-dashboard.test.js
 * Unit tests for Uttar Pradesh Tourism Dashboard metrics, 10 mandatory sections,
 * featured carousel destinations, unified search filters, and query helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  dashboardMetrics,
  dashboardSections,
  featuredDestinations,
  dashboardItems,
  getSectionById,
  getFeaturedDestinationById,
  filterDashboardItems
} from '../../frontend/up-dashboard/up-dashboard.js';

const MANDATORY_SECTION_IDS = [
  'heritage',
  'religious',
  'cuisine',
  'festivals',
  'circuits',
  'wildlife',
  'handicrafts',
  'history',
  'games',
  'districts'
];

describe('UP Tourism Dashboard Metrics & Sections Integrity', () => {
  it('contains expected state tourism metrics', () => {
    expect(dashboardMetrics.districtsCount).toBe(75);
    expect(dashboardMetrics.unescoSites).toBe(3);
    expect(dashboardMetrics.culturalCircuits).toBeGreaterThan(0);
  });

  it('contains all 10 mandatory dashboard sections', () => {
    expect(dashboardSections.length).toBe(10);
    const ids = dashboardSections.map(s => s.id.toLowerCase());
    MANDATORY_SECTION_IDS.forEach(expectedId => {
      expect(ids).toContain(expectedId);
    });
  });

  it('every section object contains required fields with valid types', () => {
    dashboardSections.forEach((sec, index) => {
      expect(sec, `Section at index ${index} missing required properties`).toHaveProperty('id');
      expect(sec).toHaveProperty('title');
      expect(sec).toHaveProperty('icon');
      expect(sec).toHaveProperty('category');
      expect(sec).toHaveProperty('description');
      expect(sec).toHaveProperty('linkUrl');

      expect(typeof sec.id).toBe('string');
      expect(typeof sec.title).toBe('string');
      expect(typeof sec.description).toBe('string');
      expect(typeof sec.linkUrl).toBe('string');
    });
  });
});

describe('Featured Destinations Carousel Dataset', () => {
  it('contains at least 6 featured destinations for the carousel', () => {
    expect(featuredDestinations.length).toBeGreaterThanOrEqual(6);
  });

  it('every featured destination contains required properties', () => {
    featuredDestinations.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('city');
      expect(item).toHaveProperty('imageIcon');
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('highlights');
      expect(Array.isArray(item.highlights)).toBe(true);
    });
  });

  it('retrieves featured destination by ID', () => {
    const item = getFeaturedDestinationById('feat-1');
    expect(item).toBeDefined();
    expect(item.title).toBe('Taj Mahal');
  });
});

describe('Dashboard Section & Unified Items Query Helpers', () => {
  it('retrieves section by ID or category', () => {
    const sec1 = getSectionById('heritage');
    expect(sec1).toBeDefined();
    expect(sec1.title).toBe('Heritage Sites');

    const sec2 = getSectionById('Cuisine');
    expect(sec2).toBeDefined();
    expect(sec2.id).toBe('cuisine');
  });

  it('filters dashboard items by search query (e.g. Kebabs or Taj)', () => {
    const results = filterDashboardItems('Taj Mahal');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe('Taj Mahal');
  });

  it('filters dashboard items by category (e.g. Cuisine)', () => {
    const results = filterDashboardItems('', 'Cuisine');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(item => {
      expect(item.category.toLowerCase()).toBe('cuisine');
    });
  });

  it('returns empty array when query matches nothing', () => {
    const results = filterDashboardItems('UnknownPlaceXYZ123');
    expect(results).toEqual([]);
  });
});
