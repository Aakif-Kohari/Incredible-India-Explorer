// gamification-core.mjs
//
// Data + rules engine for the Gamification System (issue #287): XP,
// levels, badges/achievements, daily/weekly/monthly challenges, travel
// streaks, and leaderboards.
//
// This project is a static site with no application server — the only
// backend today is a Vercel function that hands back Firebase Auth config
// (see api/firebase-config.js), and Firebase itself is only used for auth,
// not data storage. To stay consistent with the pattern already used by
// guides-core.mjs and journey.js, this module implements the full engine
// on top of localStorage, behind a small function API that mirrors what a
// real REST backend would expose (record activity, list achievements,
// get leaderboard, ...). Every function takes a `userId` explicitly rather
// than reading auth state itself, so it stays framework-free and easy to
// unit test (see tests/gamification-core.test.mjs) — the UI layer
// (gamification.js) is responsible for resolving the current user id via
// auth-session.mjs and passing it in.
//
// If/when the project adds a real database (e.g. Firestore, since Firebase
// is already used for auth), only the bodies of the storage helpers below
// need to change from localStorage reads/writes to network calls — the
// public function API can stay the same, and getLeaderboard() in
// particular already documents where the swap would need "everyone's
// profile" instead of "everyone who has visited this browser".

import { ACTIVITY_XP, STREAK_BONUS_PER_DAY, STREAK_BONUS_CAP, LEVELS, ACHIEVEMENTS, CHALLENGE_TEMPLATES, ACTIVE_CHALLENGE_COUNT, getLevelForXp, getNextLevel } from './gamification-rules.mjs';

export { getLevelForXp, getNextLevel, LEVELS, ACHIEVEMENTS, CHALLENGE_TEMPLATES };

const PROFILES_KEY = 'incredible-india-gamification-profiles';
const GUEST_ID_KEY = 'incredible-india-gamification-guest-id';
export const GUEST_USER_ID = 'guest';

// ---------------------------------------------------------------------
// storage helpers
// ---------------------------------------------------------------------

function getStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

function readJson(key, fallback) {
  const storage = getStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

function nowIso() {
  return new Date().toISOString();
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function isoWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function monthKey(date = new Date()) {
  return date.toISOString().slice(0, 7); // YYYY-MM
}

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function getByPath(obj, path) {
  return path.split('.').reduce((value, key) => (value == null ? undefined : value[key]), obj);
}

/** Returns a persistent per-browser id for use before/without sign-in, mirroring how Journey/guides work anonymously. */
export function getOrCreateGuestId() {
  const existing = readJson(GUEST_ID_KEY, null);
  if (existing) return existing;
  const id = makeId('guest');
  writeJson(GUEST_ID_KEY, id);
  return id;
}

// ---------------------------------------------------------------------
// profile model
// ---------------------------------------------------------------------

function defaultStats() {
  return {
    destinationsVisited: 0,
    statesExplored: 0,
    tripsCompleted: 0,
    itinerariesCreated: 0,
    bookmarksSaved: 0,
    reviewsWritten: 0
  };
}

function defaultProfile(userId, displayName) {
  return {
    userId,
    displayName: displayName || 'Explorer',
    xp: 0,
    level: 1,
    streak: { current: 0, longest: 0, lastActivityDate: null },
    stats: defaultStats(),
    visitedIds: [], // destination ids, deduped, so repeat visits don't inflate destinationsVisited
    statesVisited: [], // state names/slugs, deduped, feeds statesExplored
    achievements: {}, // achievementId -> { unlockedAt }
    challengeProgress: {}, // `${templateId}:${periodKey}` -> { progress, target, completedAt }
    activityLog: [], // recent activity, capped
    notifications: [], // unread + read achievement/challenge/level-up notifications
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
}

function getAllProfiles() {
  return readJson(PROFILES_KEY, {});
}

function saveAllProfiles(profiles) {
  writeJson(PROFILES_KEY, profiles);
}

/** Fetches (creating if needed) a user's gamification profile. Read-only callers should use this. */
export function getProfile(userId = GUEST_USER_ID, displayName) {
  const profiles = getAllProfiles();
  if (!profiles[userId]) {
    profiles[userId] = defaultProfile(userId, displayName);
    saveAllProfiles(profiles);
  } else if (displayName && profiles[userId].displayName !== displayName) {
    profiles[userId].displayName = displayName;
    saveAllProfiles(profiles);
  }
  return profiles[userId];
}

/** Deletes a user's progress. Mainly for tests/demo "reset my journey" flows. */
export function resetProfile(userId = GUEST_USER_ID) {
  const profiles = getAllProfiles();
  delete profiles[userId];
  saveAllProfiles(profiles);
}

const MAX_ACTIVITY_LOG = 200;
const MAX_NOTIFICATIONS = 100;

function pushNotification(profile, notification) {
  profile.notifications.unshift({
    id: makeId('notif'),
    createdAt: nowIso(),
    read: false,
    ...notification
  });
  if (profile.notifications.length > MAX_NOTIFICATIONS) {
    profile.notifications.length = MAX_NOTIFICATIONS;
  }
}

// ---------------------------------------------------------------------
// streaks
// ---------------------------------------------------------------------

function applyStreak(profile, date = new Date()) {
  const today = todayKey(date);
  if (profile.streak.lastActivityDate === today) {
    return 0; // already counted today, no bonus/streak change
  }

  const yesterday = todayKey(new Date(date.getTime() - 86400000));
  if (profile.streak.lastActivityDate === yesterday) {
    profile.streak.current += 1;
  } else {
    profile.streak.current = 1;
  }
  profile.streak.longest = Math.max(profile.streak.longest, profile.streak.current);
  profile.streak.lastActivityDate = today;

  return Math.min(profile.streak.current * STREAK_BONUS_PER_DAY, STREAK_BONUS_CAP);
}

// ---------------------------------------------------------------------
// achievements (rule-based, generic evaluator — see gamification-rules.mjs)
// ---------------------------------------------------------------------

function evaluateAchievements(profile) {
  const newlyUnlocked = [];
  for (const def of ACHIEVEMENTS) {
    if (profile.achievements[def.id]) continue;
    const value = getByPath({ ...profile.stats, level: profile.level, streak: profile.streak }, def.metric);
    if (typeof value === 'number' && value >= def.threshold) {
      profile.achievements[def.id] = { unlockedAt: nowIso() };
      newlyUnlocked.push(def);
      pushNotification(profile, {
        type: 'achievement',
        title: `Badge unlocked: ${def.title}`,
        message: def.description,
        icon: def.icon,
        refId: def.id
      });
    }
  }
  return newlyUnlocked;
}

/** Achievement definitions merged with this user's unlock state, for the badges UI. */
export function listAchievements(userId = GUEST_USER_ID) {
  const profile = getProfile(userId);
  return ACHIEVEMENTS.map((def) => {
    const unlocked = profile.achievements[def.id];
    const value = getByPath({ ...profile.stats, level: profile.level, streak: profile.streak }, def.metric) || 0;
    return {
      ...def,
      unlocked: Boolean(unlocked),
      unlockedAt: unlocked ? unlocked.unlockedAt : null,
      progress: Math.min(value, def.threshold),
      target: def.threshold
    };
  });
}

// ---------------------------------------------------------------------
// challenges
// ---------------------------------------------------------------------

// Deterministic pseudo-random selection so every browser sees the same
// rotation for the same day/week/month without a server broadcasting it.
function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickActiveTemplates(period, periodKey) {
  const templates = CHALLENGE_TEMPLATES.filter((t) => t.period === period);
  const count = Math.min(ACTIVE_CHALLENGE_COUNT[period] || 1, templates.length);
  const seed = hashString(`${period}:${periodKey}`);
  // Deterministic shuffle-and-take using the seed, so results are stable per period.
  const ordered = templates
    .map((template, index) => ({ template, sortKey: (seed + index * 2654435761) >>> 0 }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(0, count)
    .map((entry) => entry.template);
  return ordered;
}

function periodKeyFor(period, date) {
  if (period === 'daily') return todayKey(date);
  if (period === 'weekly') return isoWeekKey(date);
  return monthKey(date);
}

/** Returns the active daily/weekly/monthly challenges with this user's live progress. */
export function getActiveChallenges(userId = GUEST_USER_ID, date = new Date()) {
  const profile = getProfile(userId);
  const periods = ['daily', 'weekly', 'monthly'];
  const result = [];
  for (const period of periods) {
    const periodKey = periodKeyFor(period, date);
    for (const template of pickActiveTemplates(period, periodKey)) {
      const progressKey = `${template.id}:${periodKey}`;
      const entry = profile.challengeProgress[progressKey] || { progress: 0, target: template.target, completedAt: null };
      result.push({
        ...template,
        periodKey,
        progress: Math.min(entry.progress, template.target),
        completed: Boolean(entry.completedAt),
        completedAt: entry.completedAt
      });
    }
  }
  return result;
}

function progressChallenges(profile, activityType, date) {
  const completed = [];
  const periods = ['daily', 'weekly', 'monthly'];
  for (const period of periods) {
    const periodKey = periodKeyFor(period, date);
    for (const template of pickActiveTemplates(period, periodKey)) {
      if (template.metric !== activityType) continue;
      const progressKey = `${template.id}:${periodKey}`;
      const entry = profile.challengeProgress[progressKey] || { progress: 0, target: template.target, completedAt: null };
      if (entry.completedAt) continue;

      entry.progress += 1;
      if (entry.progress >= template.target) {
        entry.completedAt = nowIso();
        profile.xp += template.xpReward;
        completed.push(template);
        pushNotification(profile, {
          type: 'challenge',
          title: `Challenge complete: ${template.title}`,
          message: `+${template.xpReward} XP`,
          refId: template.id
        });
      }
      profile.challengeProgress[progressKey] = entry;
    }
  }
  return completed;
}

// ---------------------------------------------------------------------
// activity recording — the main entry point used by every page
// ---------------------------------------------------------------------

const STAT_BY_ACTIVITY = Object.freeze({
  visit_destination: 'destinationsVisited',
  explore_new_state: 'statesExplored',
  complete_trip: 'tripsCompleted',
  create_itinerary: 'itinerariesCreated',
  save_bookmark: 'bookmarksSaved',
  write_review: 'reviewsWritten'
});

/**
 * Records a trackable user activity, awarding XP, updating stats/streaks,
 * and evaluating achievements + challenges. This is the single write path
 * every page should call instead of touching localStorage directly.
 *
 * @param {string} userId
 * @param {keyof ACTIVITY_XP} activityType
 * @param {{dedupeId?: string, stateName?: string, displayName?: string}} [meta]
 *   dedupeId: pass a stable id (e.g. destination slug) for visit_destination
 *     so revisiting the same place doesn't count twice toward badges.
 *   stateName: required for explore_new_state, deduped the same way.
 */
export function recordActivity(userId = GUEST_USER_ID, activityType, meta = {}) {
  if (!(activityType in ACTIVITY_XP)) {
    throw new Error(`Unknown gamification activity type: ${activityType}`);
  }

  const profiles = getAllProfiles();
  const profile = profiles[userId] || defaultProfile(userId, meta.displayName);
  profiles[userId] = profile;
  if (meta.displayName) profile.displayName = meta.displayName;

  const date = meta.date ? new Date(meta.date) : new Date();
  let xpAwarded = 0;
  let counted = true;

  if (activityType === 'visit_destination' && meta.dedupeId) {
    if (profile.visitedIds.includes(meta.dedupeId)) {
      counted = false;
    } else {
      profile.visitedIds.push(meta.dedupeId);
    }
  }
  if (activityType === 'explore_new_state' && meta.stateName) {
    if (profile.statesVisited.includes(meta.stateName)) {
      counted = false;
    } else {
      profile.statesVisited.push(meta.stateName);
    }
  }

  if (counted) {
    xpAwarded += ACTIVITY_XP[activityType];
    const statKey = STAT_BY_ACTIVITY[activityType];
    if (statKey) profile.stats[statKey] += 1;
  }

  const streakBonus = applyStreak(profile, date);
  xpAwarded += streakBonus;

  profile.xp += xpAwarded;

  const previousLevel = profile.level;
  profile.level = getLevelForXp(profile.xp).level;
  const leveledUp = profile.level > previousLevel;
  if (leveledUp) {
    const levelInfo = getLevelForXp(profile.xp);
    pushNotification(profile, {
      type: 'level-up',
      title: `Level up: ${levelInfo.title}`,
      message: `You reached level ${levelInfo.level}.`,
      refId: `level-${levelInfo.level}`
    });
  }

  const newlyUnlockedAchievements = evaluateAchievements(profile);
  const newlyCompletedChallenges = counted ? progressChallenges(profile, activityType, date) : [];

  profile.activityLog.unshift({
    id: makeId('activity'),
    type: activityType,
    xp: xpAwarded,
    counted,
    meta,
    timestamp: nowIso()
  });
  if (profile.activityLog.length > MAX_ACTIVITY_LOG) {
    profile.activityLog.length = MAX_ACTIVITY_LOG;
  }

  profile.updatedAt = nowIso();
  saveAllProfiles(profiles);

  return {
    profile,
    xpAwarded,
    leveledUp,
    newlyUnlockedAchievements,
    newlyCompletedChallenges
  };
}

// ---------------------------------------------------------------------
// notifications
// ---------------------------------------------------------------------

export function getNotifications(userId = GUEST_USER_ID, { unreadOnly = false } = {}) {
  const profile = getProfile(userId);
  return unreadOnly ? profile.notifications.filter((n) => !n.read) : profile.notifications;
}

export function markNotificationRead(userId, notificationId) {
  const profiles = getAllProfiles();
  const profile = profiles[userId];
  if (!profile) return;
  const notification = profile.notifications.find((n) => n.id === notificationId);
  if (notification) notification.read = true;
  saveAllProfiles(profiles);
}

export function markAllNotificationsRead(userId) {
  const profiles = getAllProfiles();
  const profile = profiles[userId];
  if (!profile) return;
  profile.notifications.forEach((n) => { n.read = true; });
  saveAllProfiles(profiles);
}

// ---------------------------------------------------------------------
// leaderboard
// ---------------------------------------------------------------------

// Demo/seed entries so the leaderboard isn't empty for a first-time visitor
// on a fresh browser. Clearly flagged with `demo: true` — the UI must not
// present these as real people. In a deployment with a shared backend
// (e.g. Firestore, see module header) this seed list would simply be
// removed and getLeaderboard() would query all users' profiles instead of
// just this browser's localStorage.
const DEMO_LEADERBOARD_SEED = Object.freeze([
  { userId: 'demo-1', displayName: 'Ananya', xp: 890 },
  { userId: 'demo-2', displayName: 'Rahul', xp: 640 },
  { userId: 'demo-3', displayName: 'Priya', xp: 410 },
  { userId: 'demo-4', displayName: 'Vikram', xp: 260 },
  { userId: 'demo-5', displayName: 'Meera', xp: 120 }
]);

/**
 * Returns a ranked leaderboard. Because this project has no shared backend
 * (see module header), "global" today means "everyone who has ever loaded
 * this feature in this browser" plus a small labeled demo seed so the page
 * isn't empty. `friendsOnly` filters to a caller-supplied list of ids
 * (there is no social graph yet, so callers must supply it).
 */
export function getLeaderboard({ scope = 'global', friendIds = [], limit = 20 } = {}) {
  const profiles = Object.values(getAllProfiles());
  const real = profiles.map((p) => ({
    userId: p.userId,
    displayName: p.displayName,
    xp: p.xp,
    level: p.level,
    demo: false
  }));

  const entries = scope === 'friends'
    ? real.filter((entry) => friendIds.includes(entry.userId))
    : [...real, ...DEMO_LEADERBOARD_SEED.map((seed) => ({ ...seed, level: getLevelForXp(seed.xp).level, demo: true }))];

  return entries
    .sort((a, b) => b.xp - a.xp)
    .slice(0, limit)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

/** Convenience helper for "where do I rank" widgets. */
export function getUserRank(userId, options = {}) {
  const board = getLeaderboard({ ...options, limit: Number.MAX_SAFE_INTEGER });
  const entry = board.find((e) => e.userId === userId);
  return entry ? entry.rank : null;
}
