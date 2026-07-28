/**
 * Reviews UI — DOM + localStorage wiring for Community-Driven Destination
 * Reviews (#770). Consumes the pure ReviewEngine from review-engine.js.
 *
 * Mount pattern mirrors js-modules/compare-drawer/compare-drawer.js:
 * a single `initReviews(container, destinationId)` entry point that a
 * destination page calls once its DOM is ready, e.g.:
 *
 *   import { initReviews } from '../../js-modules/reviews/reviews-ui.js';
 *   initReviews(document.getElementById('reviews-root'), 'jaipur');
 *
 * Persistence: localStorage only, matching this project's "static site,
 * no backend" architecture (see docs/REVIEWS_SYSTEM.md). If Firebase is
 * configured for a deployment, swap `loadAll`/`saveAll` below for
 * Firestore reads/writes — the ReviewEngine itself is storage-agnostic
 * and does not need to change.
 */

import { ReviewEngine } from './review-engine.js';

const STORAGE_KEY = 'incredible-india-reviews';

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Failed to persist reviews:', err);
  }
}

function getCurrentUserId() {
  try {
    const stored = window.authLib?.getStoredAuthUser?.();
    return stored?.uid || stored?.email || 'guest';
  } catch {
    return 'guest';
  }
}

function starRow(rating) {
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
}

function sentimentBadge(label) {
  if (label === 'positive') return '<span class="review-badge review-badge--positive">🙂 Positive</span>';
  if (label === 'negative') return '<span class="review-badge review-badge--negative">🙁 Negative</span>';
  return '<span class="review-badge review-badge--neutral">😐 Neutral</span>';
}

/**
 * Initializes the reviews widget inside `container` for a given
 * destination. Returns the ReviewEngine instance in case the caller
 * needs programmatic access (e.g. admin moderation tooling).
 */
export function initReviews(container, destinationId) {
  if (!container) throw new Error('initReviews: container element is required');
  if (!destinationId) throw new Error('initReviews: destinationId is required');

  const engine = new ReviewEngine({ reviews: loadAll() });
  let sortBy = 'helpful';
  let minRating = null;

  function persist() {
    saveAll(engine.reviews);
  }

  function render() {
    const summary = engine.getSummary(destinationId);
    const avg = engine.getAverageRating(destinationId);
    const reviews = engine.getFiltered(destinationId, { sortBy, minRating });

    container.innerHTML = `
      <div class="reviews-widget">
        <div class="reviews-summary">
          <div class="reviews-summary__score">
            <span class="reviews-summary__avg">${avg || '—'}</span>
            <span class="reviews-summary__stars">${starRow(avg)}</span>
            <span class="reviews-summary__count">${summary.reviewCount} review${summary.reviewCount === 1 ? '' : 's'}</span>
          </div>
          <p class="reviews-summary__ai-text">${summary.text}</p>
          ${summary.highlights.length ? `<p class="reviews-summary__highlights">👍 ${summary.highlights.join(', ')}</p>` : ''}
          ${summary.concerns.length ? `<p class="reviews-summary__concerns">⚠️ ${summary.concerns.join(', ')}</p>` : ''}
        </div>

        <form class="review-form" id="review-form-${destinationId}">
          <label>Your rating
            <select name="rating" required>
              <option value="">Select</option>
              ${[5, 4, 3, 2, 1].map((n) => `<option value="${n}">${n} star${n > 1 ? 's' : ''}</option>`).join('')}
            </select>
          </label>
          <label>Your review
            <textarea name="text" rows="3" maxlength="1000" required placeholder="Share your experience..."></textarea>
          </label>
          <button type="submit">Submit review</button>
        </form>

        <div class="reviews-controls">
          <label>Sort by
            <select id="sort-${destinationId}">
              <option value="helpful">Most helpful</option>
              <option value="recent">Most recent</option>
              <option value="rating_high">Highest rated</option>
              <option value="rating_low">Lowest rated</option>
            </select>
          </label>
          <label>Min rating
            <select id="minrating-${destinationId}">
              <option value="">Any</option>
              ${[5, 4, 3, 2, 1].map((n) => `<option value="${n}">${n}+</option>`).join('')}
            </select>
          </label>
        </div>

        <ul class="reviews-list">
          ${reviews
            .map(
              (r) => `
            <li class="review-card" data-id="${r.id}">
              <div class="review-card__header">
                <strong>${escapeHtml(r.author)}</strong>
                <span>${starRow(r.rating)}</span>
                ${sentimentBadge(r.sentiment.label)}
              </div>
              <p class="review-card__text">${escapeHtml(r.text)}</p>
              <button class="review-card__helpful" data-id="${r.id}">
                👍 Helpful (${r.helpfulVotes || 0})
              </button>
            </li>`
            )
            .join('') || '<li class="reviews-empty">No reviews yet — be the first to share your experience.</li>'}
        </ul>
      </div>
    `;

    container.querySelector(`#review-form-${destinationId}`).addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const rating = Number(form.rating.value);
      const text = form.text.value.trim();
      if (!rating || !text) return;

      engine.addReview({ destinationId, author: getCurrentUserId(), rating, text });
      persist();
      render();
    });

    container.querySelector(`#sort-${destinationId}`).value = sortBy;
    container.querySelector(`#sort-${destinationId}`).addEventListener('change', (e) => {
      sortBy = e.target.value;
      render();
    });

    container.querySelector(`#minrating-${destinationId}`).addEventListener('change', (e) => {
      minRating = e.target.value ? Number(e.target.value) : null;
      render();
    });

    container.querySelectorAll('.review-card__helpful').forEach((btn) => {
      btn.addEventListener('click', () => {
        engine.voteHelpful(btn.dataset.id, getCurrentUserId());
        persist();
        render();
      });
    });
  }

  render();
  return engine;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}