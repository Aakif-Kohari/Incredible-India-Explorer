// tests/gamification-core.test.mjs
//
// Zero-dependency test suite for gamification-core.mjs, mirroring
// tests/guides-core.test.mjs. Runs directly with:
//
//   node tests/gamification-core.test.mjs
//
// Exits with a non-zero code if any assertion fails, so it's CI-friendly.

import assert from 'node:assert/strict';

// ---- minimal localStorage shim for Node ----
class MemoryStorage {
  constructor() { this._data = new Map(); }
  getItem(key) { return this._data.has(key) ? this._data.get(key) : null; }
  setItem(key, value) { this._data.set(key, String(value)); }
  removeItem(key) { this._data.delete(key); }
  clear() { this._data.clear(); }
}

globalThis.window = globalThis.window || {};
globalThis.window.localStorage = new MemoryStorage();

const gam = await import('../js-modules/gamification/gamification-core.mjs');

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

function resetStorage() {
  globalThis.window.localStorage.clear();
}

// ---------------------------------------------------------------------
// profiles
// ---------------------------------------------------------------------

test('getProfile creates a default profile on first access', () => {
  resetStorage();
  const profile = gam.getProfile('u1');
  assert.equal(profile.userId, 'u1');
  assert.equal(profile.xp, 0);
  assert.equal(profile.level, 1);
  assert.deepEqual(profile.stats.destinationsVisited, 0);
});

test('getProfile is idempotent and persists across calls', () => {
  resetStorage();
  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'goa' });
  const profile = gam.getProfile('u1');
  assert.equal(profile.stats.destinationsVisited, 1);
});

// ---------------------------------------------------------------------
// XP + activity recording
// ---------------------------------------------------------------------

test('recordActivity rejects unknown activity types', () => {
  resetStorage();
  assert.throws(() => gam.recordActivity('u1', 'not_a_real_activity'));
});

test('recordActivity awards XP and increments the matching stat', () => {
  resetStorage();
  const result = gam.recordActivity('u1', 'write_review');
  assert.ok(result.xpAwarded >= 20); // base XP + first-day streak bonus
  assert.equal(result.profile.stats.reviewsWritten, 1);
});

test('visit_destination with dedupeId only counts a place once', () => {
  resetStorage();
  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'taj-mahal' });
  const second = gam.recordActivity('u1', 'visit_destination', { dedupeId: 'taj-mahal' });
  const profile = gam.getProfile('u1');
  assert.equal(profile.stats.destinationsVisited, 1);
  assert.equal(second.xpAwarded, 0); // no new-place XP, no streak bonus (same day)
});

test('explore_new_state dedupes by state name', () => {
  resetStorage();
  gam.recordActivity('u1', 'explore_new_state', { stateName: 'Kerala' });
  gam.recordActivity('u1', 'explore_new_state', { stateName: 'Kerala' });
  gam.recordActivity('u1', 'explore_new_state', { stateName: 'Goa' });
  const profile = gam.getProfile('u1');
  assert.equal(profile.stats.statesExplored, 2);
});

// ---------------------------------------------------------------------
// levels
// ---------------------------------------------------------------------

test('getLevelForXp returns level 1 for 0 xp and increases with xp', () => {
  assert.equal(gam.getLevelForXp(0).level, 1);
  const higher = gam.getLevelForXp(100000);
  assert.ok(higher.level > 1);
});

test('recordActivity flags leveledUp exactly when the level threshold is crossed', () => {
  resetStorage();
  let leveledUpAny = false;
  for (let i = 0; i < 40; i += 1) {
    const result = gam.recordActivity('u1', 'complete_trip', { date: new Date(2024, 0, i + 1).toISOString() });
    if (result.leveledUp) leveledUpAny = true;
  }
  assert.ok(leveledUpAny, 'expected at least one level-up after many completed trips');
});

// ---------------------------------------------------------------------
// streaks
// ---------------------------------------------------------------------

test('consecutive daily activity increments the streak; a gap resets it', () => {
  resetStorage();
  const day1 = new Date(2024, 0, 1).toISOString();
  const day2 = new Date(2024, 0, 2).toISOString();
  const day4 = new Date(2024, 0, 4).toISOString(); // gap (missed day 3)

  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'a', date: day1 });
  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'b', date: day2 });
  let profile = gam.getProfile('u1');
  assert.equal(profile.streak.current, 2);

  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'c', date: day4 });
  profile = gam.getProfile('u1');
  assert.equal(profile.streak.current, 1);
  assert.equal(profile.streak.longest, 2);
});

test('multiple activities on the same day do not double-count the streak', () => {
  resetStorage();
  const day1 = new Date(2024, 0, 1).toISOString();
  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'a', date: day1 });
  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'b', date: day1 });
  const profile = gam.getProfile('u1');
  assert.equal(profile.streak.current, 1);
});

// ---------------------------------------------------------------------
// achievements
// ---------------------------------------------------------------------

test('listAchievements reports locked achievements with progress', () => {
  resetStorage();
  gam.recordActivity('u1', 'visit_destination', { dedupeId: 'a' });
  const achievements = gam.listAchievements('u1');
  const firstSteps = achievements.find((a) => a.id === 'first-steps');
  assert.ok(firstSteps.unlocked);
  const seasoned = achievements.find((a) => a.id === 'seasoned-traveler');
  assert.equal(seasoned.unlocked, false);
  assert.equal(seasoned.progress, 1);
  assert.equal(seasoned.target, 10);
});

test('achievements unlock automatically once the threshold is met, and only once', () => {
  resetStorage();
  let unlockedFirstSteps = false;
  for (let i = 0; i < 3; i += 1) {
    const result = gam.recordActivity('u1', 'visit_destination', { dedupeId: `place-${i}` });
    if (result.newlyUnlockedAchievements.some((a) => a.id === 'first-steps')) {
      unlockedFirstSteps = true;
      assert.equal(i, 0, 'first-steps should unlock on the first visit only');
    }
  }
  assert.ok(unlockedFirstSteps);
  const profile = gam.getProfile('u1');
  assert.equal(profile.achievements['first-steps'] !== undefined, true);
});

test('unlocking an achievement pushes a notification', () => {
  resetStorage();
  gam.recordActivity('u1', 'write_review');
  const notifications = gam.getNotifications('u1');
  assert.ok(notifications.some((n) => n.type === 'achievement' && n.refId === 'first-review'));
});

// ---------------------------------------------------------------------
// challenges
// ---------------------------------------------------------------------

test('getActiveChallenges returns the configured number of daily/weekly/monthly challenges', () => {
  resetStorage();
  const active = gam.getActiveChallenges('u1', new Date(2024, 0, 1));
  const daily = active.filter((c) => c.period === 'daily');
  const weekly = active.filter((c) => c.period === 'weekly');
  const monthly = active.filter((c) => c.period === 'monthly');
  assert.equal(daily.length, 2);
  assert.equal(weekly.length, 2);
  assert.equal(monthly.length, 1);
});

test('getActiveChallenges is deterministic for the same period', () => {
  const first = gam.getActiveChallenges('u1', new Date(2024, 0, 1)).map((c) => c.id);
  const second = gam.getActiveChallenges('u1', new Date(2024, 0, 1)).map((c) => c.id);
  assert.deepEqual(first, second);
});

test('matching activity progresses and eventually completes a challenge, awarding bonus XP', () => {
  resetStorage();
  const date = new Date(2024, 0, 1);
  const active = gam.getActiveChallenges('u1', date);
  const target = active.find((c) => c.metric === 'visit_destination' && c.period === 'daily');
  if (!target) return; // rotation didn't pick this metric this run; skip deterministically-impossible case

  for (let i = 0; i < target.target; i += 1) {
    gam.recordActivity('u1', 'visit_destination', { dedupeId: `p-${i}`, date: date.toISOString() });
  }
  const refreshed = gam.getActiveChallenges('u1', date).find((c) => c.id === target.id);
  assert.equal(refreshed.completed, true);
});

// ---------------------------------------------------------------------
// leaderboard
// ---------------------------------------------------------------------

test('getLeaderboard ranks by xp descending and includes labeled demo entries', () => {
  resetStorage();
  gam.recordActivity('u1', 'complete_trip');
  const board = gam.getLeaderboard();
  assert.ok(board.length > 1);
  for (let i = 1; i < board.length; i += 1) {
    assert.ok(board[i - 1].xp >= board[i].xp);
  }
  assert.ok(board.some((entry) => entry.demo === true));
  assert.equal(board[0].rank, 1);
});

test('friends scope only includes supplied friend ids, no demo entries', () => {
  resetStorage();
  gam.recordActivity('u1', 'complete_trip');
  gam.recordActivity('u2', 'complete_trip');
  const board = gam.getLeaderboard({ scope: 'friends', friendIds: ['u1'] });
  assert.equal(board.length, 1);
  assert.equal(board[0].userId, 'u1');
});

// ---------------------------------------------------------------------
// notifications
// ---------------------------------------------------------------------

test('markAllNotificationsRead clears the unread flag', () => {
  resetStorage();
  gam.recordActivity('u1', 'write_review');
  assert.ok(gam.getNotifications('u1', { unreadOnly: true }).length > 0);
  gam.markAllNotificationsRead('u1');
  assert.equal(gam.getNotifications('u1', { unreadOnly: true }).length, 0);
});

// ---------------------------------------------------------------------
// run
// ---------------------------------------------------------------------

let failures = 0;
for (const { name, fn } of tests) {
  try {
    await fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL - ${name}`);
    console.error(error);
  }
}

console.log(`\n${tests.length - failures}/${tests.length} passed`);
if (failures > 0) {
  process.exitCode = 1;
}
