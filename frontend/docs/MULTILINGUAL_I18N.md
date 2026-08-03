# Multi-Language Content Management with AI-Assisted Translation

Resolves #771 — Implement Multi-Language Content Management with AI-Powered
Translation Support.

A fully client-side i18n layer (no build step, no framework), consistent
with the rest of the site's architecture: a lightweight `I18nEngine` class
resolves UI copy through three layers — **human overrides > AI-translated
cache > English source** — and a `/frontend/api/translate` serverless function
provides on-demand machine translation for dynamic content (reviews)
without requiring every string to be pre-translated up front.

## Files added

| File | Purpose |
| ---- | ------- |
| `js-modules/i18n-engine.js` | Core `I18nEngine` class: language detection/persistence, dictionary layering, `{{var}}` interpolation, `[data-i18n]` DOM binding, pub/sub for language changes. |
| `js-modules/i18n-translation-client.js` | `TranslationClient`: calls `/frontend/api/translate` on demand for dynamic content (e.g. a review body), with localStorage caching and request de-duplication. |
| `js-modules/language-switcher.js` | Drop-in widget (à la `recently-viewed.js`) that mounts a language dropdown into the nav, wires it to `I18nEngine`, and exposes `window.I18n`. |
| `js-modules/language-switcher.css` | Styles for the dropdown. |
| `i18n/locales/en.json` | Source-of-truth English strings for shared UI copy (nav, common actions, reviews, footer). |
| `i18n/locales/hi.json`, `ta.json` | Fully hand-reviewed starter translations (Hindi, Tamil) — ship as "human" quality from day one. |
| `i18n/locales/bn.json` | Intentionally **partial** (Bengali) — demonstrates the AI-fallback path for keys nobody has translated yet. |
| `api/translate.js` | Vercel serverless function: AI-assisted translation for arbitrary text (reviews, descriptions), pluggable between Anthropic and Google Translate providers, graceful passthrough if no key is configured. |
| `frontend/translation-dashboard/` | Admin page: lists every key, shows status (`human` / `ai` / `missing`), lets an admin edit + "mark as reviewed" (promotes to `human`), and exports a clean locale JSON to merge via PR. |
| `tests/unit/i18n-engine.test.js` | Vitest coverage for fallback, layering, persistence, interpolation, DOM binding. |
| `tests/unit/i18n-translation-client.test.js` | Vitest coverage for the on-demand translation client (caching, de-dupe, graceful failure). |

## How it fits into the existing architecture

This is a static, fetch-based SPA (`router.js` swaps `#app-root` content;
`router-init.js` maps routes to lazy-loaded scripts + init functions). The
i18n layer follows the same conventions:

- `I18nEngine` is a plain ES class with a named export, mirroring
  `BudgetCalculatorEngine` — easy to unit test in isolation with Vitest.
- `language-switcher.js` is a self-invoking, `"use strict"` module that
  mounts itself into the page on `DOMContentLoaded`, the same pattern as
  `recently-viewed.js`. Add it once, near the bottom of `index.html` (and any
  other page shell) next to the other global widgets:

  ```html
  <link rel="stylesheet" href="js-modules/language-switcher.css">
  <script type="module" src="js-modules/language-switcher.js"></script>
  ```

- Because `router.js` swaps `#app-root` on navigation without a full page
  reload, `language-switcher.js` listens for the existing `app:route-changed`
  event (dispatched by the router) and re-runs `I18n.applyToDOM()` so newly
  injected page content is translated automatically — no per-page wiring
  required beyond adding `data-i18n="some.key"` attributes.
- `/frontend/api/translate.js` follows `api/firebase-config.js`'s philosophy exactly:
  if no provider credentials are set, it degrades to a harmless passthrough
  instead of a 500, so contributors without an API key can still run and
  test the feature locally.

## Translation workflow (AI-assisted, human-reviewed)

1. **Static UI copy** (nav, buttons, labels) lives in `i18n/locales/<lang>.json`.
   New languages start from `en.json`'s structure; missing keys automatically
   fall back to English, so a partial translation (see `bn.json`) is always
   safe to ship.
2. **Filling gaps with AI**: for a key missing in a target language, a page
   can call `TranslationClient.translate(englishText, targetLang)`, which
   hits `/frontend/api/translate`, caches the result client-side, and the app records
   it via `I18nEngine.setAiTranslation(lang, key, text)` — visibly tagged
   `status: "ai"`.
3. **Human review**: an admin opens `frontend/translation-dashboard/`,
   filters to `AI-translated only`, edits any string that reads awkwardly,
   and clicks **Mark reviewed & save**. This calls
   `I18nEngine.setOverride(lang, key, value)`, which is stored under
   `incredible-india-i18n-overrides:<lang>` in `localStorage` and instantly
   takes priority over the AI cache everywhere `I18nEngine` is used.
4. **Promoting reviewed strings for everyone**: since this is a static site
   with no database, reviewed strings only apply in the admin's own browser
   until they're merged. The dashboard's **Export JSON** button downloads a
   clean, nested `<lang>.json` ready to replace/merge into
   `i18n/locales/<lang>.json` in a pull request — at that point every visitor
   gets the reviewed string as a "human" translation, and the AI step for
   that key is no longer needed.
5. **On-demand review translation**: for user-generated reviews (dynamic,
   unbounded content that can't be pre-seeded into a JSON file), a
   "Translate this review" button calls `TranslationClient.translate()`
   directly and swaps the review body in place, with a "Translated
   automatically" / "Show original" toggle (`reviews.translatedBy`,
   `reviews.showOriginal` in `en.json`).

## Language persistence & fallback

- Selection is stored in `localStorage['incredible-india-language']` and
  restored on load; if nothing is stored, the browser's `navigator.language`
  is used when supported, else English.
- Every lookup falls back to English, then to the raw key itself (so a
  missing string is visibly wrong — e.g. `reviews.title` — rather than
  silently blank), which makes gaps easy to spot in the dashboard.

## Scope and trade-offs (read before extending)

This implementation intentionally does **not** attempt full-content
translation of every one of the site's ~150 feature pages in one PR — that's
a multi-hundred-file content migration, not a single feature. What's here is
the *infrastructure* the issue asks for (engine, switcher, AI endpoint,
review workflow, docs, tests), seeded with the shared nav/common strings plus
the review-translation flow, so future PRs can incrementally add
`data-i18n` attributes to individual pages and locale entries without
touching the core system.

Two acceptance criteria need a real backend to fully satisfy and are
explicitly scoped down here:

- **"Localized search results"** — the current site has no server-side
  search index; this PR does not add one. `I18nEngine` makes translated
  *labels* available to any future client-side search UI, but building a
  language-aware index is a separate, larger effort.
- **Persistent, multi-user admin review** — overrides live in the
  reviewing admin's `localStorage` and are promoted to everyone via the
  JSON export + PR flow above, rather than a live database. If/when the
  project adds a real backend (Firestore is already a light lift, given
  Firebase Auth is already wired up), `I18nEngine.setOverride` and the
  dashboard's save button are the two places to swap `localStorage` calls
  for API calls.
