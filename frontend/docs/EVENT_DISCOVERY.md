# Personalized Festival & Cultural Event Discovery

Resolves #2698 — Implement Personalized Festival and Cultural Event
Discovery System.

Helps travelers discover regional festivals and cultural events near a
destination, filtered by travel dates and personal interests, with the
ability to bookmark events, add them to an itinerary, and get reminders
as bookmarked events approach.

## Files

| File | Purpose |
| ---- | ------- |
| `js-modules/event-data.js` | Curated dataset of Indian festivals/events: id, name, `category`, `tags`, `destinationId`, `state`, `location`, recurring `startMonth`/`endMonth`, `durationDays`, `popularity` (0-10), `description`, `image`. |
| `js-modules/event-recommendation-engine.js` | Pure, DOM-free `EventRecommendationEngine` class: destination/date/category filtering, interest-based scoring, bookmarks, itinerary-entry building, and upcoming-reminder detection. |
| `frontend/event-discovery/index.html` | Page shell (shared header/nav/footer) with a destination select, date-range inputs, interest chips, results grid, and a bookmarks/reminders panel. |
| `frontend/event-discovery/style.css` | Dedicated stylesheet reusing the site's shared design tokens (`--saffron`, `--glass-bg`, etc.), the same approach as `frontend/trip-expense-splitter/style.css`. |
| `frontend/event-discovery/script.js` | DOM wiring: owns an `EventRecommendationEngine` instance, persists bookmarks and itinerary additions to `localStorage`, renders results, and triggers reminder notifications. |
| `tests/unit/event-recommendation-engine.test.js` | Vitest unit tests covering destination/date/category filtering and the recommendation scoring logic. |

## Data model: why "recurring month window" instead of exact dates

Like the existing `festivalsData` (`frontend/festival-calendar/data.js`),
most Indian festivals follow a lunar or regional calendar rather than a
fixed Gregorian date (e.g. Diwali shifts every year). Modeling an exact
date per year would need a maintained calendar-conversion table this
project doesn't have. Instead, each event stores a recurring
`startMonth`/`endMonth` (1-12, inclusive, wrapping across year-end for
events like "Margazhi Season" that span Dec-Jan). This is lower precision
than a real event-aggregation backend, but is enough to answer "what's
happening around when I'm traveling" without a data source that doesn't
exist in this client-only project.

`destinationId` cross-references `trip-data.js`'s `tripDestinations` ids
where the event maps onto an existing planner destination, so search
results can share the same destination picker used elsewhere on the site.
It's `null` for events whose location isn't yet a dedicated destination
entry — those remain searchable by `state`.

## Recommendation workflow

`EventRecommendationEngine.recommend(criteria)` runs a filter-then-rank
pipeline:

1. **`filterByDestination`** — keeps events matching the chosen
   `destinationId`, or falling back to a `state` name match.
2. **`filterByDateRange`** — converts the requested travel dates to a
   month range and keeps events whose recurring month window overlaps it
   (`rangesOverlap`, which correctly handles year-wrapping ranges).
3. **`filterByCategories`** — an optional hard filter on `category`/`tags`
   (distinct from the softer interest scoring below).
4. **`scoreEvent`** — blends normalized `popularity` (0-1) with how many
   of the traveler's selected interests match the event's category/tags,
   50/50. With no interests selected, results rank by popularity alone.
5. Results are sorted by `matchScore` descending and capped to `limit`
   (default 10, the UI requests 24).

This mirrors the pattern already used by
`js-modules/seasonal-recommendation-engine.js` for #773, so the codebase
has one consistent shape for "filter a curated dataset, score by
interest, return ranked results."

## Itinerary integration

`EventRecommendationEngine.buildItineraryEntry(event, { date })` builds an
entry shaped like the day-entries `js-modules/trip-planner.js` already
stores (`id`, `activity`, `location`, `category`), so an event added from
Discovery renders correctly if surfaced inside the trip planner later.
`addEventToItinerary`/`removeEventFromItinerary` are pure functions
(return a new array, don't mutate) so they're trivial to unit test; the UI
layer is what persists the resulting array to `localStorage`
(`eventDiscovery.itineraryEvents.v1`).

## Reminders and notifications

There's no push-notification backend in this project (confirmed while
building #866's expense splitter — the whole site is static HTML/CSS/JS).
"Upcoming events notification" is implemented as a same-device,
page-triggered reminder instead of a server push:

- `EventRecommendationEngine.getUpcomingReminders(bookmarkedEvents, referenceDate, monthsAhead)`
  is a pure function that flags which bookmarked events start within the
  lookahead window (default: this month or next).
- The UI layer (`script.js`) turns events with `monthsUntil === 0` into a
  real browser `Notification` when permission is granted
  (`tryShowLocalNotification`), and always shows an in-page "Coming up"
  banner as a fallback for browsers/users that don't grant notification
  permission.

## Persistence

Bookmarks (`eventDiscovery.bookmarks.v1`) and itinerary additions
(`eventDiscovery.itineraryEvents.v1`) are saved to `localStorage`
immediately on every change, the same pattern used by
`frontend/trip-expense-splitter/script.js` and
`js-modules/trip-planner.js`. The engine itself never touches
`localStorage` (`loadJSON`/`saveJSON` live in `script.js`), so
`EventRecommendationEngine` stays fully unit-testable without a DOM.

## What's intentionally out of scope

- **A real, centralized festival database / event-aggregation service** —
  the issue's "Technical Considerations" list several backend pieces
  (aggregation service, calendar APIs, notification service, event
  caching) that assume a server this static-site project doesn't have.
  What's implemented is the client-only equivalent: a curated, versionable
  dataset plus rule-based filtering/scoring, matching how every other
  recommendation feature in this repo works (seasonal recommendations,
  cuisine discovery, the AI travel assistant).
- **True push notifications** — see above; only same-device, in-browser
  `Notification`s are possible without a backend.
