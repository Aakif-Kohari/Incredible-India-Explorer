// gamification-rules.mjs
//
// Declarative configuration for the Gamification System (issue #287).
//
// This file is the "content" half of the engine: XP values, level titles,
// achievement/badge definitions, and challenge templates. gamification-core.mjs
// is the "engine" half — it never hardcodes a specific badge or point value,
// it only knows how to walk this config and evaluate it against a user's
// stats. That split is what satisfies the issue's acceptance criterion that
// "Achievement rules can be configured without modifying core business
// logic": adding a new badge, challenge, or activity type is a matter of
// appending an object to one of the arrays below.
//
// Achievement `metric` values are dot-paths into a profile's `stats` object
// (see gamification-core.mjs `defaultStats()`), so the evaluator can stay
// completely generic (`getByPath(stats, metric) >= threshold`).

// ---------------------------------------------------------------------
// XP awarded per activity type
// ---------------------------------------------------------------------
// recordActivity(userId, type, meta) looks up `type` here. Unknown types
// are rejected by the engine (fails loudly instead of silently awarding 0),
// so this map is also the single source of truth for "which activities are
// trackable" per the issue's list (visit, complete trip, explore new state,
// itinerary, bookmark, review, streaks, daily login).
export const ACTIVITY_XP = Object.freeze({
  visit_destination: 10,
  explore_new_state: 25,
  complete_trip: 100,
  create_itinerary: 40,
  save_bookmark: 5,
  write_review: 20,
  daily_login: 5
});

// Extra XP granted per consecutive streak day, capped so a very long streak
// doesn't dominate the leaderboard on its own.
export const STREAK_BONUS_PER_DAY = 2;
export const STREAK_BONUS_CAP = 30;

// ---------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------
// minXp thresholds follow a simple super-linear curve (minXp = 60 * n^1.6)
// so early levels come quickly (onboarding reward) and later levels take
// meaningfully longer (long-term engagement per the issue's goals).
function levelThreshold(n) {
  return Math.round(60 * Math.pow(n, 1.6));
}

export const LEVELS = Object.freeze(
  [
    'Village Wanderer',
    'District Explorer',
    'State Voyager',
    'Regional Trailblazer',
    'Heritage Seeker',
    'Cultural Nomad',
    'National Pathfinder',
    'Subcontinent Adventurer',
    'Incredible India Sage',
    'Incredible India Legend'
  ].map((title, index) => {
    const level = index + 1;
    return Object.freeze({ level, minXp: index === 0 ? 0 : levelThreshold(level), title });
  })
);

export function getLevelForXp(xp) {
  let current = LEVELS[0];
  for (const entry of LEVELS) {
    if (xp >= entry.minXp) current = entry;
  }
  return current;
}

export function getNextLevel(currentLevel) {
  return LEVELS.find((entry) => entry.level === currentLevel + 1) || null;
}

// ---------------------------------------------------------------------
// Achievements / badges
// ---------------------------------------------------------------------
// `metric` is a dot-path into profile.stats. `threshold` is the value the
// metric must reach (>=) to unlock. `category` groups badges for the UI.
// Add a new badge by appending an object here — nothing else needs to change.
export const ACHIEVEMENTS = Object.freeze([
  // Exploration
  { id: 'first-steps', category: 'exploration', tier: 'bronze', icon: '🥾', title: 'First Steps', description: 'Visit your first destination.', metric: 'destinationsVisited', threshold: 1 },
  { id: 'seasoned-traveler', category: 'exploration', tier: 'silver', icon: '🧭', title: 'Seasoned Traveler', description: 'Visit 10 destinations.', metric: 'destinationsVisited', threshold: 10 },
  { id: 'incredible-wanderer', category: 'exploration', tier: 'gold', icon: '🗺️', title: 'Incredible Wanderer', description: 'Visit 25 destinations.', metric: 'destinationsVisited', threshold: 25 },
  { id: 'state-hopper', category: 'exploration', tier: 'silver', icon: '🚩', title: 'State Hopper', description: 'Explore 5 different states.', metric: 'statesExplored', threshold: 5 },
  { id: 'unity-in-diversity', category: 'exploration', tier: 'platinum', icon: '🇮🇳', title: 'Unity in Diversity', description: 'Explore 15 different states.', metric: 'statesExplored', threshold: 15 },

  // Trip planning
  { id: 'first-itinerary', category: 'planning', tier: 'bronze', icon: '📝', title: 'Planner in Training', description: 'Create your first itinerary.', metric: 'itinerariesCreated', threshold: 1 },
  { id: 'master-planner', category: 'planning', tier: 'gold', icon: '📋', title: 'Master Planner', description: 'Create 10 itineraries.', metric: 'itinerariesCreated', threshold: 10 },
  { id: 'first-trip', category: 'planning', tier: 'bronze', icon: '🎒', title: 'Journey Begins', description: 'Complete your first trip.', metric: 'tripsCompleted', threshold: 1 },
  { id: 'globetrotter', category: 'planning', tier: 'gold', icon: '✈️', title: 'Frequent Flyer', description: 'Complete 10 trips.', metric: 'tripsCompleted', threshold: 10 },

  // Community / engagement
  { id: 'bookworm', category: 'community', tier: 'bronze', icon: '🔖', title: 'Collector', description: 'Bookmark 5 places in My Journey.', metric: 'bookmarksSaved', threshold: 5 },
  { id: 'archivist', category: 'community', tier: 'silver', icon: '📚', title: 'Archivist', description: 'Bookmark 25 places in My Journey.', metric: 'bookmarksSaved', threshold: 25 },
  { id: 'first-review', category: 'community', tier: 'bronze', icon: '✍️', title: 'First Impressions', description: 'Write your first review.', metric: 'reviewsWritten', threshold: 1 },
  { id: 'trusted-voice', category: 'community', tier: 'gold', icon: '🌟', title: 'Trusted Voice', description: 'Write 10 reviews.', metric: 'reviewsWritten', threshold: 10 },

  // Streaks
  { id: 'three-day-streak', category: 'streak', tier: 'bronze', icon: '🔥', title: 'Warming Up', description: 'Maintain a 3-day travel streak.', metric: 'streak.longest', threshold: 3 },
  { id: 'week-streak', category: 'streak', tier: 'silver', icon: '🔥', title: 'On a Roll', description: 'Maintain a 7-day travel streak.', metric: 'streak.longest', threshold: 7 },
  { id: 'month-streak', category: 'streak', tier: 'platinum', icon: '🔥', title: 'Unstoppable', description: 'Maintain a 30-day travel streak.', metric: 'streak.longest', threshold: 30 },

  // XP / level milestones
  { id: 'level-5', category: 'milestone', tier: 'silver', icon: '⭐', title: 'Rising Star', description: 'Reach level 5.', metric: 'level', threshold: 5 },
  { id: 'level-10', category: 'milestone', tier: 'platinum', icon: '👑', title: 'Incredible India Legend', description: 'Reach the max level.', metric: 'level', threshold: 10 }
]);

// ---------------------------------------------------------------------
// Challenge templates
// ---------------------------------------------------------------------
// Each template describes one recurring challenge slot. The engine selects
// which templates are "active" for a given period deterministically (see
// `pickActiveTemplates` in gamification-core.mjs) so every user/browser
// sees the same rotation for the same day/week/month without needing a
// server to broadcast it.
export const CHALLENGE_TEMPLATES = Object.freeze([
  { id: 'daily-visit', period: 'daily', metric: 'visit_destination', target: 1, xpReward: 15, title: 'Daily Explorer', description: 'Visit 1 destination today.' },
  { id: 'daily-bookmark', period: 'daily', metric: 'save_bookmark', target: 2, xpReward: 10, title: 'Curator of the Day', description: 'Bookmark 2 places today.' },
  { id: 'daily-login', period: 'daily', metric: 'daily_login', target: 1, xpReward: 5, title: 'Show Up', description: 'Visit the site today.' },

  { id: 'weekly-visits', period: 'weekly', metric: 'visit_destination', target: 5, xpReward: 60, title: 'Weekly Wanderer', description: 'Visit 5 destinations this week.' },
  { id: 'weekly-review', period: 'weekly', metric: 'write_review', target: 1, xpReward: 40, title: 'Share the Word', description: 'Write 1 review this week.' },
  { id: 'weekly-itinerary', period: 'weekly', metric: 'create_itinerary', target: 1, xpReward: 50, title: 'Weekend Planner', description: 'Create 1 itinerary this week.' },

  { id: 'monthly-states', period: 'monthly', metric: 'explore_new_state', target: 3, xpReward: 150, title: 'Cross-Country', description: 'Explore 3 new states this month.' },
  { id: 'monthly-trip', period: 'monthly', metric: 'complete_trip', target: 1, xpReward: 200, title: 'Grand Journey', description: 'Complete 1 full trip this month.' }
]);

// How many templates of each period are "live" at once (per user cohort).
export const ACTIVE_CHALLENGE_COUNT = Object.freeze({ daily: 2, weekly: 2, monthly: 1 });
