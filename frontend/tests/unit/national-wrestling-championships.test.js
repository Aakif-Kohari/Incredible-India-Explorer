/**
 * national-wrestling-championships.test.js
 * Unit tests for the National Wrestling Championships archive dataset:
 * wrestling styles, official weight categories, champions, venues,
 * Olympic medals, timeline ordering, and filter helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  wrestlingStyles,
  weightCategories,
  champions,
  historicVenues,
  olympicMedals,
  timeline,
  getStyleById,
  getWeightDivisionById,
  getChampionById,
  filterChampions,
  getSortedTimeline,
  getTimelineMilestone,
  summariseOlympicMedals
} from '../../frontend/national-wrestling-championships/script.js';

describe('Wrestling Styles Dataset', () => {
  it('covers freestyle, Greco-Roman, kushti, and malla-yuddha', () => {
    const ids = wrestlingStyles.map(s => s.id);
    expect(ids).toEqual(expect.arrayContaining(['freestyle', 'greco-roman', 'kushti', 'malla-yuddha']));
    expect(new Set(ids).size).toBe(wrestlingStyles.length);
  });

  it('every style has complete content fields', () => {
    wrestlingStyles.forEach(style => {
      expect(style).toHaveProperty('id');
      expect(style).toHaveProperty('name');
      expect(style).toHaveProperty('origin');
      expect(style).toHaveProperty('rules');
      expect(style).toHaveProperty('indiaNote');
      expect(Array.isArray(style.rules)).toBe(true);
      expect(style.rules.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('Weight Categories (UWW / Olympic)', () => {
  const OFFICIAL_WEIGHTS = {
    'mens-freestyle': [57, 65, 74, 86, 97, 125],
    'womens-freestyle': [50, 53, 57, 62, 68, 76],
    'greco-roman': [60, 67, 77, 87, 97, 130]
  };

  it('contains exactly three Olympic divisions', () => {
    expect(weightCategories.divisions.length).toBe(3);
  });

  it('matches the official six Olympic categories per division', () => {
    weightCategories.divisions.forEach(division => {
      const expected = OFFICIAL_WEIGHTS[division.id];
      expect(expected, `Unknown division id: ${division.id}`).toBeDefined();
      expect(division.weights).toEqual(expected);
      expect(division.weights).toEqual([...division.weights].sort((a, b) => a - b));
    });
  });

  it('looks up divisions by id', () => {
    expect(getWeightDivisionById('womens-freestyle').name).toBe("Women's Freestyle");
    expect(getWeightDivisionById('does-not-exist')).toBeUndefined();
  });
});

describe('Champions Dataset', () => {
  it('includes the documented legendary champions', () => {
    const names = champions.map(c => c.shortName);
    ['K. D. Jadhav', 'Sushil', 'Sakshi', 'Bajrang', 'Ravi', 'Aman'].forEach(name => {
      expect(names).toContain(name);
    });
  });

  it('every champion has required fields and achievements', () => {
    champions.forEach(champ => {
      expect(champ).toHaveProperty('id');
      expect(champ).toHaveProperty('name');
      expect(champ).toHaveProperty('shortName');
      expect(champ).toHaveProperty('style');
      expect(champ).toHaveProperty('category');
      expect(champ).toHaveProperty('headline');
      expect(Array.isArray(champ.achievements)).toBe(true);
      expect(champ.achievements.length).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(champ.tags)).toBe(true);
      champ.tags.forEach(tag => {
        expect(['olympic-medallists', 'world-champions', 'womens-wrestling', 'coaching-legends']).toContain(tag);
      });
    });
  });

  it('champion ids are unique', () => {
    expect(new Set(champions.map(c => c.id)).size).toBe(champions.length);
  });

  it('looks up champions by id and short name', () => {
    expect(getChampionById('sushil-kumar').name).toBe('Sushil Kumar');
    expect(getChampionById('sakshi').name).toBe('Sakshi Malik');
    expect(getChampionById('unknown-wrestler')).toBeUndefined();
  });

  it('filters champions by tag and search query', () => {
    const women = filterChampions('', 'womens-wrestling');
    expect(women.length).toBeGreaterThan(0);
    women.forEach(champ => expect(champ.tags).toContain('womens-wrestling'));

    const sushil = filterChampions('Moscow');
    expect(sushil.map(c => c.id)).toContain('sushil-kumar');

    const combined = filterChampions('rio', 'olympic-medallists');
    expect(combined.map(c => c.id)).toContain('sakshi-malik');

    expect(filterChampions('zzz-no-match')).toHaveLength(0);
  });
});

describe('Historic Venues Dataset', () => {
  it('documents the K. D. Jadhav Stadium, Chhatrasal Stadium, and Khasbaug Maidan', () => {
    const ids = historicVenues.map(v => v.id);
    expect(ids).toEqual(expect.arrayContaining(['kd-jadhav-stadium', 'chhatrasal-stadium', 'khasbaug-maidan']));
  });

  it('every venue has facts and significance', () => {
    historicVenues.forEach(venue => {
      expect(venue).toHaveProperty('name');
      expect(venue).toHaveProperty('city');
      expect(Array.isArray(venue.facts)).toBe(true);
      expect(venue.facts.length).toBeGreaterThanOrEqual(2);
      expect(venue.significance.length).toBeGreaterThan(10);
    });
  });
});

describe('Olympic Medals Record', () => {
  it('records all eight of India\u2019s Olympic wrestling medals', () => {
    expect(olympicMedals.length).toBe(8);
  });

  it('medal breakdown is two silvers and six bronzes', () => {
    const summary = summariseOlympicMedals();
    expect(summary.total).toBe(8);
    expect(summary.byMedal).toEqual({ Silver: 2, Bronze: 6 });
  });

  it('every medal entry has complete fields', () => {
    olympicMedals.forEach(entry => {
      expect(entry.games).toBeTruthy();
      expect(entry.wrestler).toBeTruthy();
      expect(entry.event).toBeTruthy();
      expect(['Gold', 'Silver', 'Bronze']).toContain(entry.medal);
    });
  });
});

describe('Wrestler Timeline', () => {
  it('sorts milestones chronologically by sortKey', () => {
    const sorted = getSortedTimeline();
    expect(sorted.length).toBe(timeline.length);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].sortKey).toBeGreaterThan(sorted[i - 1].sortKey);
    }
  });

  it('starts with the ancient era and ends with Paris 2024', () => {
    const sorted = getSortedTimeline();
    expect(sorted[0].label).toBe('Ancient Era');
    expect(sorted[sorted.length - 1].label).toBe('2024');
    expect(sorted[sorted.length - 1].person).toContain('Aman Sehrawat');
  });

  it('retrieves individual milestones by sortKey', () => {
    const milestone = getTimelineMilestone(1952);
    expect(milestone.title).toContain('Helsinki');
    expect(getTimelineMilestone('not-a-number')).toBeUndefined();
  });

  it('every milestone has complete display fields', () => {
    timeline.forEach(milestone => {
      expect(milestone.label).toBeTruthy();
      expect(milestone.title).toBeTruthy();
      expect(milestone.description.length).toBeGreaterThan(20);
      expect(milestone.person).toBeTruthy();
    });
  });

  it('milestone labels are unique for navigation', () => {
    expect(new Set(timeline.map(m => m.label)).size).toBe(timeline.length);
  });
});
