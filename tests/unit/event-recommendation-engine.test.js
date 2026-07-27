import { describe, it, expect, beforeEach } from 'vitest';
import { EventRecommendationEngine } from '../../js-modules/event-recommendation-engine.js';

const sampleEvents = [
  {
    id: 'diwali', name: 'Diwali', category: 'Religious', tags: ['lights', 'family'],
    destinationId: 'delhi', state: 'Delhi', startMonth: 10, endMonth: 11, popularity: 10
  },
  {
    id: 'sunburn', name: 'Sunburn Festival', category: 'Music', tags: ['edm', 'nightlife'],
    destinationId: 'goa', state: 'Goa', startMonth: 12, endMonth: 12, popularity: 8
  },
  {
    id: 'pongal', name: 'Pongal', category: 'Food', tags: ['harvest', 'sweets'],
    destinationId: 'madurai', state: 'Tamil Nadu', startMonth: 1, endMonth: 1, popularity: 8
  },
  {
    id: 'margazhi', name: 'Margazhi Season', category: 'Music', tags: ['carnatic', 'classical'],
    destinationId: 'chennai', state: 'Tamil Nadu', startMonth: 12, endMonth: 1, popularity: 7
  }
];

describe('EventRecommendationEngine.filterByDestination', () => {
  let engine;
  beforeEach(() => {
    engine = new EventRecommendationEngine({ events: sampleEvents });
  });

  it('filters by destinationId', () => {
    const result = engine.filterByDestination(sampleEvents, { destinationId: 'goa' });
    expect(result.map((e) => e.id)).toEqual(['sunburn']);
  });

  it('filters by state when no destinationId matches', () => {
    const result = engine.filterByDestination(sampleEvents, { state: 'Tamil Nadu' });
    expect(result.map((e) => e.id).sort()).toEqual(['margazhi', 'pongal']);
  });

  it('returns all events when no criteria given', () => {
    expect(engine.filterByDestination(sampleEvents, {})).toEqual(sampleEvents);
  });
});

describe('EventRecommendationEngine.filterByDateRange', () => {
  let engine;
  beforeEach(() => {
    engine = new EventRecommendationEngine({ events: sampleEvents });
  });

  it('matches events overlapping a single travel date', () => {
    const result = engine.filterByDateRange(sampleEvents, '2026-10-15');
    expect(result.map((e) => e.id)).toEqual(['diwali']);
  });

  it('matches events overlapping a date range', () => {
    const result = engine.filterByDateRange(sampleEvents, '2026-12-01', '2026-12-20');
    expect(result.map((e) => e.id).sort()).toEqual(['margazhi', 'sunburn']);
  });

  it('handles year-wrapping event ranges (Dec-Jan)', () => {
    const result = engine.filterByDateRange(sampleEvents, '2027-01-05');
    expect(result.map((e) => e.id).sort()).toEqual(['margazhi', 'pongal']);
  });

  it('returns all events when no start date is given', () => {
    expect(engine.filterByDateRange(sampleEvents, null)).toEqual(sampleEvents);
  });
});

describe('EventRecommendationEngine.filterByCategories', () => {
  let engine;
  beforeEach(() => {
    engine = new EventRecommendationEngine({ events: sampleEvents });
  });

  it('filters by category name (case-insensitive)', () => {
    const result = engine.filterByCategories(sampleEvents, ['music']);
    expect(result.map((e) => e.id).sort()).toEqual(['margazhi', 'sunburn']);
  });

  it('filters by tag as well as category', () => {
    const result = engine.filterByCategories(sampleEvents, ['harvest']);
    expect(result.map((e) => e.id)).toEqual(['pongal']);
  });

  it('returns all events when no categories are given', () => {
    expect(engine.filterByCategories(sampleEvents, [])).toEqual(sampleEvents);
  });
});

describe('EventRecommendationEngine.scoreEvent', () => {
  let engine;
  beforeEach(() => {
    engine = new EventRecommendationEngine();
  });

  it('scores purely on popularity when no interests given', () => {
    const { score } = engine.scoreEvent(sampleEvents[0], []);
    expect(score).toBeCloseTo(1.0, 5);
  });

  it('boosts score when interests match category/tags', () => {
    const { score, matchedInterests } = engine.scoreEvent(sampleEvents[0], ['religious', 'lights']);
    expect(matchedInterests.sort()).toEqual(['lights', 'religious']);
    expect(score).toBeGreaterThan(0);
  });

  it('scores lower when interests do not match at all', () => {
    const withInterest = engine.scoreEvent(sampleEvents[0], ['adventure']).score;
    const withoutInterest = engine.scoreEvent(sampleEvents[0], []).score;
    expect(withInterest).toBeLessThan(withoutInterest);
  });
});

describe('EventRecommendationEngine#recommend', () => {
  let engine;
  beforeEach(() => {
    engine = new EventRecommendationEngine({ events: sampleEvents });
  });

  it('ranks by match score, best first', () => {
    const result = engine.recommend({ interests: ['music'] });
    expect(result[0].matchScore).toBeGreaterThanOrEqual(result[result.length - 1].matchScore);
  });

  it('combines destination, date, and category filters', () => {
    const result = engine.recommend({ state: 'Tamil Nadu', startDate: '2026-01-10' });
    expect(result.map((r) => r.event.id).sort()).toEqual(['margazhi', 'pongal']);
  });

  it('respects the limit option', () => {
    const result = engine.recommend({ limit: 1 });
    expect(result.length).toBe(1);
  });

  it('flags bookmarked events in the output', () => {
    engine.toggleBookmark('diwali');
    const result = engine.recommend({});
    const diwali = result.find((r) => r.event.id === 'diwali');
    expect(diwali.isBookmarked).toBe(true);
  });
});

describe('EventRecommendationEngine bookmarks', () => {
  let engine;
  beforeEach(() => {
    engine = new EventRecommendationEngine({ events: sampleEvents });
  });

  it('toggles bookmarks on and off', () => {
    expect(engine.toggleBookmark('diwali')).toBe(true);
    expect(engine.isBookmarked('diwali')).toBe(true);
    expect(engine.toggleBookmark('diwali')).toBe(false);
    expect(engine.isBookmarked('diwali')).toBe(false);
  });

  it('lists bookmarked events', () => {
    engine.toggleBookmark('pongal');
    engine.toggleBookmark('sunburn');
    expect(engine.getBookmarkedEvents().map((e) => e.id).sort()).toEqual(['pongal', 'sunburn']);
  });

  it('ignores an empty eventId', () => {
    expect(engine.toggleBookmark(null)).toBe(false);
    expect(engine.getBookmarkIds()).toEqual([]);
  });
});

describe('EventRecommendationEngine itinerary integration', () => {
  it('builds an itinerary entry from an event', () => {
    const entry = EventRecommendationEngine.buildItineraryEntry(sampleEvents[0], { date: '2026-10-20' });
    expect(entry.eventId).toBe('diwali');
    expect(entry.title).toBe('Diwali');
    expect(entry.date).toBe('2026-10-20');
    expect(entry.type).toBe('event');
  });

  it('returns null for a missing event', () => {
    expect(EventRecommendationEngine.buildItineraryEntry(null)).toBeNull();
  });

  it('appends an event to an itinerary without mutating the original', () => {
    const original = [{ id: 'day1', activity: 'Arrive' }];
    const updated = EventRecommendationEngine.addEventToItinerary(original, sampleEvents[0]);
    expect(original.length).toBe(1);
    expect(updated.length).toBe(2);
    expect(updated[1].eventId).toBe('diwali');
  });

  it('removes an event entry by id', () => {
    const withEvent = EventRecommendationEngine.addEventToItinerary([], sampleEvents[0]);
    const entryId = withEvent[0].id;
    const removed = EventRecommendationEngine.removeEventFromItinerary(withEvent, entryId);
    expect(removed.length).toBe(0);
  });
});

describe('EventRecommendationEngine.getUpcomingReminders', () => {
  it('flags events starting in the current month', () => {
    const reference = new Date('2026-10-05T00:00:00');
    const reminders = EventRecommendationEngine.getUpcomingReminders([sampleEvents[0]], reference, 1);
    expect(reminders.length).toBe(1);
    expect(reminders[0].monthsUntil).toBe(0);
  });

  it('flags events starting within the lookahead window', () => {
    const reference = new Date('2026-11-01T00:00:00');
    const reminders = EventRecommendationEngine.getUpcomingReminders([sampleEvents[1]], reference, 1);
    expect(reminders.length).toBe(1);
    expect(reminders[0].monthsUntil).toBe(1);
  });

  it('excludes events outside the lookahead window', () => {
    const reference = new Date('2026-06-01T00:00:00');
    const reminders = EventRecommendationEngine.getUpcomingReminders([sampleEvents[0]], reference, 1);
    expect(reminders.length).toBe(0);
  });

  it('handles year-wrapping events near December/January', () => {
    const reference = new Date('2026-12-15T00:00:00');
    const reminders = EventRecommendationEngine.getUpcomingReminders([sampleEvents[3]], reference, 1);
    expect(reminders.length).toBe(1);
  });
});
