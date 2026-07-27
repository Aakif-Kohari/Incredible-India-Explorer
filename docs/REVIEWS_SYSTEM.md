# Community-Driven Destination Reviews

Resolves #770 — Community-Driven Destination Reviews with AI-Based
Sentiment Analysis.

## What it does

Adds a reviews widget that can be mounted on any destination page:

- Star ratings (1–5) and free-text reviews, submitted through a small form.
- A running **average rating** and **review count**.
- An **AI-generated summary** — percentage positive/negative, plus the
  most frequently praised and most frequently criticized aspects
  (crowd levels, cleanliness, value, staff, safety, scenery, access,
  food).
- Per-review **sentiment badges** (🙂 positive / 😐 neutral / 🙁 negative).
- A **helpful-vote** button, toggleable per user.
- **Sorting** (most helpful / most recent / highest / lowest rated) and
  **filtering** by minimum rating.
- **Spam/inappropriate-content detection** that flags — but does not
  delete — suspicious reviews into a moderation queue.

## Why no backend, and no real NLP model

Consistent with the rest of this project (see `ROUTE_PLANNER.md`'s and
`SUSTAINABILITY_SCORING.md`'s "Why no backend" sections): this is a
static, buildless site with no server available to host a trained ML
model or call a paid third-party NLP API.

So "AI-powered sentiment analysis" and "AI-generated summaries" here are
a **transparent, deterministic lexicon + heuristic pipeline**, entirely
client-side:

- Sentiment is scored with a hand-curated positive/negative word
  lexicon, with simple negation flipping (`"not good"`) and intensifier
  scaling (`"very disappointing"`), normalized into a `[-1, 1]` score.
- "Frequently mentioned pros and cons" are extracted by matching review
  text against a small aspect keyword map (crowd, cleanliness, value,
  staff, safety, scenery, access, food) and tallying how often each
  aspect co-occurs with positive vs. negative sentiment.
- The "AI summary" is a template filled in from those two outputs (e.g.
  *"82% of 11 reviews were positive. Travelers frequently praised the
  scenery, staff. Some visitors mentioned concerns about the crowd."*).

This is intentionally framed the same honest way the Sustainability
Scoring feature frames its carbon-footprint estimates: good enough to be
genuinely useful for skimming reviews at a glance, but not a real
trained sentiment model, and it will misjudge sarcasm, mixed reviews,
and aspects outside its keyword list. It is designed to be swapped for
a real hosted NLP/LLM call later without changing its calling
convention — `analyzeSentiment(text)` and `generateSummary(reviews)`
are the two functions a future backend-backed implementation would
replace.

## Spam / inappropriate-content detection

Also heuristic, not an ML classifier. A review is flagged (not deleted)
if it trips one or more of:

| Reason | Heuristic |
| --- | --- |
| `too_short` | Fewer than 8 characters |
| `excessive_caps` | >60% of letters are uppercase |
| `repeated_characters` | Same character repeated 5+ times in a row |
| `promotional_link` | Contains a URL, "www.", "DM me", promo-code language, etc. |
| `profanity` | Matches a small profanity list |
| `low_diversity_repetition` | Long text with very few unique words (copy-paste spam) |

Flagged reviews go to `engine.getModerationQueue()` for a moderator to
review, rather than being silently hidden or auto-deleted — false
positives (e.g. a short but genuine "Loved it!") stay visible to
moderators for a manual call.

## Files added

- `js-modules/reviews/review-engine.js` — pure, DOM-free logic: sentiment
  analysis, spam detection, aspect extraction, summary generation,
  ranking/filtering, and the `ReviewEngine` convenience class. No
  localStorage, no DOM — kept unit-testable in isolation, same
  convention as `js-modules/event-recommendation-engine.js`.
- `js-modules/reviews/reviews-ui.js` — DOM + `localStorage` wiring.
  Exposes a single `initReviews(container, destinationId)` entry point.
  Persistence is localStorage-only for now (see note below on
  Firebase/Firestore).
- `js-modules/reviews/reviews.css` — widget styling, namespaced under
  `.reviews-widget`.
- `tests/unit/review-engine.test.js` — Vitest unit tests covering
  sentiment scoring, spam detection, aspect extraction, summary
  generation, filtering/sorting, and the `ReviewEngine` class
  (25 assertions).

## Integrating into a destination page

```html
<div id="reviews-root"></div>
<link rel="stylesheet" href="/js-modules/reviews/reviews.css">
<script type="module">
  import { initReviews } from '/js-modules/reviews/reviews-ui.js';
  initReviews(document.getElementById('reviews-root'), 'jaipur');
</script>
```

`destinationId` should match whatever id scheme the page already uses
elsewhere (e.g. the id used in `landmark-data.js` / `trip-data.js`).

## Swapping in real persistence (Firestore) later

`reviews-ui.js` isolates persistence into two functions, `loadAll()` and
`saveAll(reviews)`, both currently backed by `localStorage`. To move to
Firestore once a project is configured (see `firebase-config.js`),
replace those two functions with Firestore reads/writes — `ReviewEngine`
itself takes a plain array of review objects in its constructor and
never touches storage directly, so no other code needs to change.

## Data shape

```js
{
  id: "rev_1730000000000_ab12cd",
  destinationId: "jaipur",
  author: "Asha",
  rating: 5,               // 1-5
  text: "Loved the fort and the views.",
  images: [],
  createdAt: "2026-07-27T10:00:00.000Z",
  helpfulVotes: 2,
  votedBy: ["user1", "user2"],
  sentiment: { score: 0.42, label: "positive", positiveHits: 3, negativeHits: 0 },
  moderation: { isSpam: false, reasons: [] }
}
```

## Testing

```bash
npx vitest run tests/unit/review-engine.test.js
```

## Acceptance criteria coverage

- ✅ Users can submit ratings and reviews for destinations — `review-form` in `reviews-ui.js`.
- ✅ AI generates sentiment summaries — `generateSummary()` in `review-engine.js`.
- ✅ Reviews can be filtered by rating and relevance — `filterAndSortReviews()`.
- ✅ Helpful votes update dynamically — `voteHelpful()`, toggleable.
- ✅ Spam detection flags suspicious reviews for moderation — `detectSpam()` + `getModerationQueue()`.
- ✅ Unit tests cover review submission and sentiment analysis — `tests/unit/review-engine.test.js`.
- ✅ Documentation explains the architecture and sentiment workflow — this file.