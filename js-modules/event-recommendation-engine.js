/**
 * Event Recommendation Engine
 *
 * Pure, DOM-free logic for the Smart Event Discovery & Festival
 * Recommendation feature. Consumes the curated dataset in
 * js-modules/event-data.js and:
 *  - filters/ranks events by destination, date range, and interest categories
 *  - manages a bookmark list
 *  - builds itinerary-ready event entries (compatible with the shape
 *    js-modules/trip-planner.js already stores per day)
 *  - computes which bookmarked events are "reminder due" within a lookahead
 *    window
 *
 * Kept DOM/localStorage-free so it can be unit tested directly. The UI
 * layer (frontend/event-discovery/script.js) is responsible for
 * persistence (localStorage) and for turning `getUpcomingReminders()`
 * results into actual browser Notifications — this engine only computes
 * *which* reminders are due.
 *
 * Note on dates: like the existing `festivalsData` dataset, most Indian
 * festivals recur on a lunar/regional calendar rather than a fixed
 * Gregorian date, so events are modeled as a recurring month window
 * (startMonth/endMonth, 1-12, inclusive, wrapping across year-end e.g.
 * Dec-Jan) rather than an exact date. This is intentionally lower
 * precision than a real event-aggregation backend would offer.
 */

const CATEGORIES = ["Culture", "Music", "Food", "Adventure", "Religious", "Sports"];

function normalize(str) {
  return typeof str === "string" ? str.trim().toLowerCase() : "";
}

/** True if `month` (1-12) falls within a possibly year-wrapping [start, end] range. */
function monthInRange(month, start, end) {
  if (typeof month !== "number" || typeof start !== "number" || typeof end !== "number") return false;
  if (start <= end) return month >= start && month <= end;
  // Wraps across the year boundary, e.g. Dec(12) - Feb(2).
  return month >= start || month <= end;
}

/** True if two possibly year-wrapping month ranges overlap at all. */
function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  for (let m = 1; m <= 12; m++) {
    if (monthInRange(m, aStart, aEnd) && monthInRange(m, bStart, bEnd)) return true;
  }
  return false;
}

export class EventRecommendationEngine {
  /**
   * @param {Object} [options]
   * @param {Array} [options.events] Curated event records.
   * @param {Array} [options.bookmarks] Pre-existing bookmarked event ids.
   */
  constructor(options = {}) {
    this.events = options.events || [];
    this.bookmarks = new Set(options.bookmarks || []);
  }

  static get CATEGORIES() {
    return CATEGORIES.slice();
  }

  /** Events matching a destination id or, failing that, a state name. */
  filterByDestination(events, { destinationId, state } = {}) {
    if (!destinationId && !state) return events;
    return events.filter((e) => {
      if (destinationId && e.destinationId === destinationId) return true;
      if (state && normalize(e.state) === normalize(state)) return true;
      return false;
    });
  }

  /**
   * Events whose recurring month window overlaps the given travel dates.
   * `startDate`/`endDate` may be Date objects or ISO strings.
   */
  filterByDateRange(events, startDate, endDate) {
    if (!startDate) return events;
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate ? (endDate instanceof Date ? endDate : new Date(endDate)) : start;
    if (isNaN(start.getTime())) return events;
    const validEnd = isNaN(end.getTime()) ? start : end;

    const startMonth = start.getMonth() + 1;
    const endMonth = validEnd.getMonth() + 1;

    return events.filter((e) => rangesOverlap(e.startMonth, e.endMonth, startMonth, endMonth));
  }

  /** Events matching any of the given categories or tags (case-insensitive). Empty/absent = no filter. */
  filterByCategories(events, categories) {
    if (!categories || categories.length === 0) return events;
    const wanted = categories.map(normalize);
    return events.filter((e) => {
      const eventCategory = normalize(e.category);
      const eventTags = (e.tags || []).map(normalize);
      return wanted.includes(eventCategory) || eventTags.some((t) => wanted.includes(t));
    });
  }

  /**
   * Computes a 0-1 match score for an event given the requested interests.
   * Blends normalized popularity with how well the event's category/tags
   * match the requester's interests.
   */
  scoreEvent(event, interests = []) {
    const popularityScore = Math.max(0, Math.min(10, event.popularity || 0)) / 10;
    if (!interests || interests.length === 0) {
      return { score: popularityScore, matchedInterests: [] };
    }
    const wanted = interests.map(normalize);
    const haystack = [normalize(event.category), ...(event.tags || []).map(normalize)];
    const matched = wanted.filter((w) => haystack.includes(w));
    const interestScore = matched.length / wanted.length;
    return { score: 0.5 * popularityScore + 0.5 * interestScore, matchedInterests: matched };
  }

  /**
   * Full recommendation pipeline: filter by destination/date/category, score
   * by popularity + interest match, and return a ranked, capped list.
   * @param {Object} [criteria]
   * @param {string} [criteria.destinationId]
   * @param {string} [criteria.state]
   * @param {Date|string} [criteria.startDate]
   * @param {Date|string} [criteria.endDate]
   * @param {string[]} [criteria.interests]
   * @param {string[]} [criteria.categories] Hard category/tag filter (distinct from soft-scored `interests`).
   * @param {number} [criteria.limit=10]
   */
  recommend(criteria = {}) {
    const { destinationId, state, startDate, endDate, interests = [], categories = [], limit = 10 } = criteria;

    let pool = this.events;
    pool = this.filterByDestination(pool, { destinationId, state });
    pool = this.filterByDateRange(pool, startDate, endDate);
    pool = this.filterByCategories(pool, categories);

    const ranked = pool
      .map((event) => {
        const { score, matchedInterests } = this.scoreEvent(event, interests);
        return { event, matchScore: score, matchedInterests, isBookmarked: this.bookmarks.has(event.id) };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    return ranked.slice(0, limit);
  }

  // --------------------------------------------------------------------
  // Bookmarks
  // --------------------------------------------------------------------

  toggleBookmark(eventId) {
    if (!eventId) return false;
    if (this.bookmarks.has(eventId)) {
      this.bookmarks.delete(eventId);
      return false;
    }
    this.bookmarks.add(eventId);
    return true;
  }

  isBookmarked(eventId) {
    return this.bookmarks.has(eventId);
  }

  getBookmarkIds() {
    return Array.from(this.bookmarks);
  }

  getBookmarkedEvents() {
    return this.events.filter((e) => this.bookmarks.has(e.id));
  }

  // --------------------------------------------------------------------
  // Itinerary integration
  // --------------------------------------------------------------------

  /**
   * Builds an itinerary-ready entry for an event without mutating any
   * stored trip. Shape mirrors the day-entry objects trip-planner.js
   * generates (`activity`, plus event-specific metadata).
   */
  static buildItineraryEntry(event, { date } = {}) {
    if (!event) return null;
    return {
      id: `event_${event.id}_${Date.now()}`,
      type: "event",
      eventId: event.id,
      title: event.name,
      activity: `Attend ${event.name}`,
      location: event.location || event.state,
      category: event.category,
      date: date || null
    };
  }

  /** Returns a new itinerary array with the event entry appended. */
  static addEventToItinerary(itinerary, event, options) {
    const entry = EventRecommendationEngine.buildItineraryEntry(event, options);
    if (!entry) return itinerary || [];
    return [...(itinerary || []), entry];
  }

  /** Returns a new itinerary array with the given event entry removed. */
  static removeEventFromItinerary(itinerary, entryId) {
    return (itinerary || []).filter((item) => item.id !== entryId);
  }

  // --------------------------------------------------------------------
  // Reminders (client-side, month-granularity — see file header note)
  // --------------------------------------------------------------------

  /**
   * Flags bookmarked events starting within `monthsAhead` of `referenceDate`.
   * @param {Array} bookmarkedEvents
   * @param {Date} [referenceDate]
   * @param {number} [monthsAhead=1]
   */
  static getUpcomingReminders(bookmarkedEvents, referenceDate = new Date(), monthsAhead = 1) {
    const refMonth = referenceDate.getMonth() + 1;
    const results = [];
    for (const event of bookmarkedEvents || []) {
      for (let offset = 0; offset <= monthsAhead; offset++) {
        const checkMonth = ((refMonth - 1 + offset) % 12) + 1;
        if (monthInRange(checkMonth, event.startMonth, event.endMonth)) {
          results.push({ event, monthsUntil: offset });
          break;
        }
      }
    }
    return results.sort((a, b) => a.monthsUntil - b.monthsUntil);
  }
}

export const EVENT_ENGINE_INTERNALS = { monthInRange, rangesOverlap, normalize };
