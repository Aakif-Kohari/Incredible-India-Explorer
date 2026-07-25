// gamification.js
//
// UI wiring for the Gamification System (issue #287).
// Vanilla JS module, no framework/build step — matches the rest of this repo.
//
// Responsibilities:
//   1. Resolve "who is playing" (signed-in Firebase/local user, or a
//      per-browser guest id) and expose a small `window.Gamification` API
//      that any page can call to record an activity, mirroring how
//      `window.Journey` works for bookmarks.
//   2. Render the two new pages this feature adds:
//        data-page="achievements" -> frontend/gamification/achievements.html (XP, level, streak,
//          badge grid, active challenges)
//        data-page="leaderboard"  -> frontend/gamification/leaderboard.html (global/friends rank)
//   3. Surface new badge/challenge/level-up unlocks as toasts via the
//      existing window.ToastNotifier (js-modules/toast-system.js), loaded
//      by pages-common.js on every page.
//
// Integrating a new activity type from another page:
//   import('./gamification.js').then(({ Gamification }) => {
//     Gamification.record('write_review', { dedupeId: reviewId });
//   });
// or, once this script has run, simply:
//   window.Gamification.record('complete_trip');
// See docs/gamification-architecture.md for the full list of activity types.

import * as Gam from './gamification-core.mjs';

let resolvedUserIdPromise = null;

async function resolveUserId() {
  if (resolvedUserIdPromise) return resolvedUserIdPromise;
  resolvedUserIdPromise = (async () => {
    try {
      const { getStoredAuthUser } = await import('../../js-modules/auth/auth-session.mjs');
      const user = getStoredAuthUser();
      if (user && user.uid) {
        return { userId: user.uid, displayName: user.displayName || user.email || 'Explorer' };
      }
    } catch (error) {
      // auth module unavailable (e.g. this page doesn't load auth) — fall back to guest id
    }
    return { userId: Gam.getOrCreateGuestId(), displayName: 'Explorer' };
  })();
  return resolvedUserIdPromise;
}

function notifyUnlocks({ newlyUnlockedAchievements, newlyCompletedChallenges, leveledUp, profile }) {
  if (typeof window === 'undefined' || !window.ToastNotifier) return;
  newlyUnlockedAchievements.forEach((def) => {
    window.ToastNotifier.success(`${def.icon || '🏅'} Badge unlocked: ${def.title}`, 5000);
  });
  newlyCompletedChallenges.forEach((template) => {
    window.ToastNotifier.success(`✅ Challenge complete: ${template.title} (+${template.xpReward} XP)`, 5000);
  });
  if (leveledUp) {
    const levelInfo = Gam.getLevelForXp(profile.xp);
    window.ToastNotifier.success(`⭐ Level up! You're now a ${levelInfo.title} (Level ${levelInfo.level})`, 6000);
  }
}

/**
 * Records an activity for the current user and surfaces any unlocks as
 * toasts. This is the function every other page should call.
 * @param {string} activityType one of the keys documented in gamification-rules.mjs ACTIVITY_XP
 * @param {object} [meta] see gamification-core.mjs recordActivity() jsdoc
 */
async function record(activityType, meta = {}) {
  const { userId, displayName } = await resolveUserId();
  const result = Gam.recordActivity(userId, activityType, { ...meta, displayName });
  notifyUnlocks(result);
  window.dispatchEvent(new CustomEvent('incredible-india:gamification-update', { detail: result }));
  return result;
}

async function getMyProfile() {
  const { userId, displayName } = await resolveUserId();
  return Gam.getProfile(userId, displayName);
}

async function getMyAchievements() {
  const { userId } = await resolveUserId();
  return Gam.listAchievements(userId);
}

async function getMyChallenges() {
  const { userId } = await resolveUserId();
  return Gam.getActiveChallenges(userId);
}

async function getMyRank(options) {
  const { userId } = await resolveUserId();
  return Gam.getUserRank(userId, options);
}

export const Gamification = {
  record,
  getMyProfile,
  getMyAchievements,
  getMyChallenges,
  getLeaderboard: Gam.getLeaderboard,
  getMyRank,
  getLevelForXp: Gam.getLevelForXp,
  getNextLevel: Gam.getNextLevel
};

if (typeof window !== 'undefined') {
  window.Gamification = Gamification;
}

// ---------------------------------------------------------------------
// shared render helpers
// ---------------------------------------------------------------------

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value == null ? '' : String(value);
  return div.innerHTML;
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (error) {
    return '';
  }
}

// ---------------------------------------------------------------------
// achievements page
// ---------------------------------------------------------------------

async function renderAchievementsPage() {
  const profile = await getMyProfile();
  const achievements = await getMyAchievements();
  const challenges = await getMyChallenges();
  const nextLevel = Gam.getNextLevel(profile.level);

  const summaryEl = document.getElementById('gam-summary');
  if (summaryEl) {
    const levelInfo = Gam.getLevelForXp(profile.xp);
    const xpIntoLevel = profile.xp - levelInfo.minXp;
    const xpForNext = nextLevel ? nextLevel.minXp - levelInfo.minXp : xpIntoLevel || 1;
    const pct = nextLevel ? Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100)) : 100;

    summaryEl.innerHTML = `
      <div class="gam-summary-card">
        <div class="gam-level-badge" aria-hidden="true">Lv ${levelInfo.level}</div>
        <div class="gam-summary-main">
          <h2 class="gam-level-title">${escapeHtml(levelInfo.title)}</h2>
          <p class="gam-xp-line">${profile.xp.toLocaleString()} XP${nextLevel ? ` &middot; ${(nextLevel.minXp - profile.xp).toLocaleString()} XP to ${escapeHtml(nextLevel.title)}` : ' &middot; Max level reached'}</p>
          <div class="gam-progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            <div class="gam-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="gam-streak-chip" title="Current travel streak">
          🔥 <span>${profile.streak.current}</span>-day streak
          <small>Best: ${profile.streak.longest} days</small>
        </div>
      </div>
    `;
  }

  const challengesEl = document.getElementById('gam-challenges');
  if (challengesEl) {
    challengesEl.innerHTML = challenges.map((c) => `
      <li class="gam-challenge-card gam-period-${c.period} ${c.completed ? 'gam-completed' : ''}">
        <div class="gam-challenge-head">
          <span class="gam-challenge-period">${c.period}</span>
          <span class="gam-challenge-xp">+${c.xpReward} XP</span>
        </div>
        <h3>${escapeHtml(c.title)}</h3>
        <p>${escapeHtml(c.description)}</p>
        <div class="gam-progress-track gam-progress-track-sm">
          <div class="gam-progress-fill" style="width:${Math.min(100, Math.round((c.progress / c.target) * 100))}%"></div>
        </div>
        <span class="gam-challenge-status">${c.completed ? 'Completed ✅' : `${c.progress} / ${c.target}`}</span>
      </li>
    `).join('') || '<li class="gam-empty">No active challenges right now — check back soon.</li>';
  }

  const badgesEl = document.getElementById('gam-badges');
  if (badgesEl) {
    const categories = [...new Set(achievements.map((a) => a.category))];
    badgesEl.innerHTML = categories.map((category) => `
      <section class="gam-badge-category">
        <h3 class="gam-category-title">${escapeHtml(category)}</h3>
        <div class="gam-badge-grid">
          ${achievements.filter((a) => a.category === category).map((a) => `
            <div class="gam-badge ${a.unlocked ? 'gam-badge-unlocked' : 'gam-badge-locked'} gam-tier-${a.tier}" title="${escapeHtml(a.description)}">
              <div class="gam-badge-icon">${a.icon}</div>
              <div class="gam-badge-title">${escapeHtml(a.title)}</div>
              <div class="gam-badge-desc">${escapeHtml(a.description)}</div>
              ${a.unlocked
                ? `<div class="gam-badge-date">Unlocked ${formatDate(a.unlockedAt)}</div>`
                : `<div class="gam-progress-track gam-progress-track-sm"><div class="gam-progress-fill" style="width:${Math.round((a.progress / a.target) * 100)}%"></div></div>
                   <div class="gam-badge-progress-label">${a.progress} / ${a.target}</div>`}
            </div>
          `).join('')}
        </div>
      </section>
    `).join('');
  }
}

// ---------------------------------------------------------------------
// leaderboard page
// ---------------------------------------------------------------------

async function renderLeaderboardPage() {
  const { userId } = await resolveUserId();
  const listEl = document.getElementById('gam-leaderboard-list');
  const tabsEl = document.getElementById('gam-leaderboard-tabs');
  if (!listEl) return;

  let scope = 'global';

  function draw() {
    const board = Gam.getLeaderboard({ scope, friendIds: [userId], limit: 50 });
    listEl.innerHTML = board.map((entry) => `
      <li class="gam-leader-row ${entry.userId === userId ? 'gam-leader-me' : ''}">
        <span class="gam-leader-rank">#${entry.rank}</span>
        <span class="gam-leader-name">${escapeHtml(entry.displayName)}${entry.demo ? ' <small class="gam-demo-tag">demo</small>' : ''}${entry.userId === userId ? ' <small class="gam-you-tag">you</small>' : ''}</span>
        <span class="gam-leader-level">Lv ${entry.level}</span>
        <span class="gam-leader-xp">${entry.xp.toLocaleString()} XP</span>
      </li>
    `).join('') || '<li class="gam-empty">No one here yet. Be the first!</li>';
  }

  if (tabsEl) {
    tabsEl.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-scope]');
      if (!btn) return;
      scope = btn.dataset.scope;
      tabsEl.querySelectorAll('[data-scope]').forEach((el) => el.classList.toggle('active', el === btn));
      draw();
    });
  }

  draw();
}

// ---------------------------------------------------------------------
// boot
// ---------------------------------------------------------------------

function init() {
  const page = document.body ? document.body.dataset.page : null;
  if (page === 'achievements') renderAchievementsPage();
  if (page === 'leaderboard') renderLeaderboardPage();
  // Any page can opt in to a "you're here today" streak/login credit.
  if (document.body && document.body.dataset.gamDailyLogin === 'true') {
    record('daily_login');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
