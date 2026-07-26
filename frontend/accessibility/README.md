# Accessibility Recommendation System

Implements #690 — "Implement AI-Based Accessibility Recommendation System for
Inclusive Travel".

## Files

| File | Purpose |
|---|---|
| `accessibility-data.js` | Structured accessibility metadata per destination (state/UT), keyed by the same `id` used in `/data.js`. |
| `accessibility-engine.js` | **Pure, dependency-free** scoring, filtering, and recommendation-generation logic. No DOM or storage access — fully unit testable. |
| `accessibility-storage.js` | localStorage-backed persistence for user preferences and community reports (this project has no backend yet). |
| `accessibility-explorer.html` / `.css` / `.js` | The user-facing page: preference form, filters, destination grid, and report modal. |
| `accessibility-engine.test.js` | Plain Node assertion tests (no framework dependency). Run with `node accessibility-engine.test.js`. |
| `accessibility.html` / `.css` | *Pre-existing* — the site's own WCAG compliance statement. Different concern from this feature (that page is about the *website's* accessibility; this feature is about *destinations'* physical accessibility). |

## Scoring methodology

### 1. Base score (0–100)

A weighted sum over structured metadata fields, reflecting how much each
factor typically matters for independent access:

| Field | Weight |
|---|---|
| `wheelchairAccess` (full = 100% of weight, partial = 50%, none/unknown = 0%) | 40 |
| `stepFreeEntry` | 20 |
| `accessibleRestrooms` | 15 |
| `accessibleParking` | 10 |
| `audioGuide` | 7 |
| `brailleSignage` | 5 |
| `signLanguageTours` | 3 |

### 2. Community adjustment (Bayesian shrinkage)

If user reports exist for a destination, the base score is blended with the
average community rating (1–5 stars, rescaled to 0–100):

```
finalScore = (baseScore * PRIOR_WEIGHT + communityScore * n) / (PRIOR_WEIGHT + n)
```

`PRIOR_WEIGHT = 5`, meaning it takes several consistent reports to
meaningfully move a destination's score away from its structured-data
baseline — one or two outlier reports can't swing it wildly in either
direction.

### 3. Confidence label

- **unknown** — no structured metadata and no community reports.
- **limited data** — structured metadata exists, but fewer than 3 reports.
- **community verified** — 3 or more reports.

The UI always shows this label alongside the score so users know how much
to trust a given number, rather than presenting a single opaque figure.

### 4. Recommendation text

`generateRecommendation()` is a deterministic, rule-based function (no
external AI API call) that turns the score + metadata + the user's stated
needs (mobility / visual / hearing) into a short, plain-language blurb —
in the same spirit as this repo's existing "Bharat AI" chatbot
(`chatbot-data.js`), which is also rule-based rather than a live model call.
This keeps the feature workable within the project's current no-backend,
static-site architecture, while leaving a clean seam (`generateRecommendation`)
to swap in a real LLM call later if/when a backend is introduced.

## Data scope (v1)

Destinations are scored at the **state/UT level**, reusing the same 36 IDs
already defined in `/data.js`'s `mapData.locations`. Only 11 states currently
have verified structured metadata (`accessibility-data.js`); the rest
gracefully fall back to an "unknown" status rather than being silently
scored as inaccessible. Filling in the remaining states is intentionally
left to community reports and future contributions.

## Acceptance criteria mapping

- ✅ Accessibility scores generated for supported destinations — `computeFinalScore()`.
- ✅ Filter by accessibility requirements — `matchesFilters()` + filter UI.
- ✅ AI recommendations adapt to user preferences — `generateRecommendation()`, driven by saved preferences.
- ✅ Unit tests included — `accessibility-engine.test.js` (15 tests, run via `node`).
- ✅ Documentation of scoring methodology — this file.

## Known limitations / follow-ups

- No backend yet, so community reports are per-browser (localStorage), not
  shared across users. `accessibility-storage.js` exposes `exportReports()` /
  `importReports()` as a seam for a future API-backed sync.
- Only 11 of 36 states have seeded structured metadata — see "Data scope" above.
- `index.html`'s nav currently has some unresolved merge-conflict content
  (stray branch-name text and duplicated dropdown entries around the
  "Learn & Data" dropdown). Not caused by this change, but worth a
  separate cleanup PR — it should be fixed before adding a nav link to
  this page.
