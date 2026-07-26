/**
 * multi-day-planner.js
 * Multi-day route optimization layer for Incredible India Explorer.
 *
 * Builds on top of RoutePlanner (route-planner.js), which already produces
 * an optimized *stop order* and per-leg distance/duration. This module
 * takes that ordered route and answers the "road trip" questions RoutePlanner
 * doesn't: How many days will this take? Where should we stay overnight?
 * Will we arrive at a stop too late to sightsee? What if we drove faster or
 * slower per day?
 *
 * Kept as a pure, dependency-free module (like route-planner.js) so it can
 * be unit-tested in Node without a DOM/browser, and reused by any UI.
 *
 * Inputs are intentionally generic — an ordered list of stops and a list of
 * legs — so this works with road, rail, or air legs coming out of
 * RoutePlanner.getRoute(), though daily driving limits are most meaningful
 * for road trips (the scenario named in the feature request).
 */

// ---------------------------------------------------------------------------
// 1. Pace presets — "alternative route suggestions" at different daily limits
// ---------------------------------------------------------------------------
const PACE_PRESETS = {
  relaxed: { key: "relaxed", label: "Relaxed", maxDrivingMinutesPerDay: 4 * 60 },
  standard: { key: "standard", label: "Standard", maxDrivingMinutesPerDay: 6 * 60 },
  fast: { key: "fast", label: "Fast", maxDrivingMinutesPerDay: 8 * 60 },
};

const DEFAULT_VISIT_MINUTES_PER_STOP = 150; // time spent sightseeing before moving on
const DEFAULT_DAY_START_HOUR = 9; // itinerary assumes departure at 09:00 each day
const DEFAULT_ATTRACTION_OPEN_HOUR = 9;
const DEFAULT_ATTRACTION_CLOSE_HOUR = 18;

// ---------------------------------------------------------------------------
// 2. Helpers
// ---------------------------------------------------------------------------
function formatClock(totalMinutes) {
  const dayMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(dayMinutes / 60);
  const m = Math.round(dayMinutes % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatDurationHM(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h === 0 ? `${m}m` : `${h}h ${m}m`;
}

// ---------------------------------------------------------------------------
// 3. Core multi-day splitting algorithm
// ---------------------------------------------------------------------------
/**
 * Splits an ordered route into daily driving legs based on a daily travel
 * limit, and flags overnight stays and attraction-hours conflicts.
 *
 * @param {Array} stops - ordered stops, e.g. RoutePlanner.optimizeRoute() output
 * @param {Array} legs  - array of { distanceKm, durationMinutes } for each
 *                        consecutive stop pair (stops[i] -> stops[i+1]),
 *                        e.g. from RoutePlanner.getRoute().legs
 * @param {Object} [options]
 * @param {number} [options.maxDrivingMinutesPerDay=360] - daily travel limit
 * @param {number} [options.visitMinutesPerStop=150] - sightseeing time added
 *        at each stop before continuing, used only for arrival-time checks
 * @param {number} [options.dayStartHour=9] - assumed departure hour each day
 * @returns {{days: Array, totalDrivingMinutes: number, totalDistanceKm: number, warnings: string[], maxDrivingMinutesPerDay: number}}
 */
function planMultiDayRoute(stops, legs, options = {}) {
  const maxDrivingMinutesPerDay =
    options.maxDrivingMinutesPerDay || PACE_PRESETS.standard.maxDrivingMinutesPerDay;
  const visitMinutesPerStop =
    options.visitMinutesPerStop ?? DEFAULT_VISIT_MINUTES_PER_STOP;
  const dayStartHour = options.dayStartHour ?? DEFAULT_DAY_START_HOUR;

  if (!stops || stops.length === 0) {
    return { days: [], totalDrivingMinutes: 0, totalDistanceKm: 0, warnings: [], maxDrivingMinutesPerDay };
  }
  if (stops.length === 1 || !legs || legs.length === 0) {
    return {
      days: [{ dayNumber: 1, stops: stops.slice(), drivingMinutes: 0, distanceKm: 0, overnightAt: null }],
      totalDrivingMinutes: 0,
      totalDistanceKm: 0,
      warnings: [],
      maxDrivingMinutesPerDay,
    };
  }

  const days = [];
  const warnings = [];
  let dayStops = [stops[0]];
  let dayDrivingMinutes = 0;
  let dayDistanceKm = 0;
  let clockMinutes = dayStartHour * 60;

  function closeDay(isLastDay, overnightStop) {
    days.push({
      dayNumber: days.length + 1,
      stops: dayStops,
      drivingMinutes: dayDrivingMinutes,
      distanceKm: dayDistanceKm,
      overnightAt: isLastDay ? null : overnightStop,
    });
  }

  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];
    const pivotStop = stops[i]; // stop we're currently at, before driving this leg
    const nextStop = stops[i + 1];

    if (leg.durationMinutes > maxDrivingMinutesPerDay) {
      warnings.push(
        `The drive from ${pivotStop.name} to ${nextStop.name} (${formatDurationHM(leg.durationMinutes)}) exceeds the daily driving limit on its own — consider an overnight stop along this route.`
      );
    }

    const wouldExceed = dayDrivingMinutes + leg.durationMinutes > maxDrivingMinutesPerDay;
    if (wouldExceed && dayStops.length > 0) {
      closeDay(false, pivotStop);
      dayStops = [pivotStop];
      dayDrivingMinutes = 0;
      dayDistanceKm = 0;
      clockMinutes = dayStartHour * 60;
    }

    dayDrivingMinutes += leg.durationMinutes;
    dayDistanceKm += leg.distanceKm;
    clockMinutes += leg.durationMinutes;
    dayStops.push(nextStop);

    const arrivalHour = clockMinutes / 60;
    const arrivalHourOfDay = ((arrivalHour % 24) + 24) % 24;
    if (arrivalHourOfDay < DEFAULT_ATTRACTION_OPEN_HOUR || arrivalHourOfDay > DEFAULT_ATTRACTION_CLOSE_HOUR) {
      warnings.push(
        `Estimated arrival at ${nextStop.name} is around ${formatClock(clockMinutes)}, outside typical sightseeing hours (${DEFAULT_ATTRACTION_OPEN_HOUR}:00–${DEFAULT_ATTRACTION_CLOSE_HOUR}:00). Consider an earlier start or an overnight stop before this leg.`
      );
    }
    clockMinutes += visitMinutesPerStop;
  }
  closeDay(true, null);

  const totalDrivingMinutes = days.reduce((sum, d) => sum + d.drivingMinutes, 0);
  const totalDistanceKm = days.reduce((sum, d) => sum + d.distanceKm, 0);

  return { days, totalDrivingMinutes, totalDistanceKm, warnings, maxDrivingMinutesPerDay };
}

// ---------------------------------------------------------------------------
// 4. Alternative route suggestions (different daily paces)
// ---------------------------------------------------------------------------
/**
 * Runs planMultiDayRoute() at each pace preset so the user can compare
 * "Relaxed" vs "Standard" vs "Fast" day counts before committing.
 */
function getAlternativePlans(stops, legs, options = {}) {
  return Object.values(PACE_PRESETS).map((preset) => {
    const plan = planMultiDayRoute(stops, legs, {
      ...options,
      maxDrivingMinutesPerDay: preset.maxDrivingMinutesPerDay,
    });
    return {
      key: preset.key,
      label: preset.label,
      maxDrivingMinutesPerDay: preset.maxDrivingMinutesPerDay,
      dayCount: plan.days.length,
      totalDrivingMinutes: plan.totalDrivingMinutes,
      totalDistanceKm: plan.totalDistanceKm,
      plan,
    };
  });
}

// ---------------------------------------------------------------------------
// 5. Export itinerary for offline use
// ---------------------------------------------------------------------------
function exportItineraryText(plan, meta = {}) {
  const lines = [];
  lines.push(meta.title || "India Road Trip Itinerary");
  if (meta.mode) lines.push(`Transport mode: ${meta.mode}`);
  lines.push(`Number of days: ${plan.days.length}`);
  lines.push(`Total driving time: ${formatDurationHM(plan.totalDrivingMinutes)}`);
  lines.push(`Total distance: ${plan.totalDistanceKm.toFixed(1)} km`);
  lines.push("");

  plan.days.forEach((day) => {
    lines.push(`Day ${day.dayNumber}: ${day.stops.map((s) => s.name).join(" -> ")}`);
    lines.push(`  Driving: ${formatDurationHM(day.drivingMinutes)} (${day.distanceKm.toFixed(1)} km)`);
    if (day.overnightAt) lines.push(`  Overnight stay: ${day.overnightAt.name}`);
    lines.push("");
  });

  if (plan.warnings && plan.warnings.length) {
    lines.push("Notes:");
    plan.warnings.forEach((w) => lines.push(`  - ${w}`));
  }

  return lines.join("\n");
}

function exportItineraryJSON(plan, meta = {}) {
  return JSON.stringify(
    {
      ...meta,
      generatedAt: new Date().toISOString(),
      dayCount: plan.days.length,
      totalDrivingMinutes: plan.totalDrivingMinutes,
      totalDistanceKm: plan.totalDistanceKm,
      days: plan.days.map((d) => ({
        dayNumber: d.dayNumber,
        stops: d.stops.map((s) => s.name),
        drivingMinutes: d.drivingMinutes,
        distanceKm: d.distanceKm,
        overnightAt: d.overnightAt ? d.overnightAt.name : null,
      })),
      warnings: plan.warnings,
    },
    null,
    2
  );
}

// ---------------------------------------------------------------------------
// Export for both browser (global) and Node (tests)
// ---------------------------------------------------------------------------
const MultiDayPlanner = {
  PACE_PRESETS,
  planMultiDayRoute,
  getAlternativePlans,
  exportItineraryText,
  exportItineraryJSON,
  formatClock,
  formatDurationHM,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = MultiDayPlanner;
} else {
  window.MultiDayPlanner = MultiDayPlanner;
}
