/**
 * js-modules/crowd-density-service.js
 *
 * DOM/network-facing wrapper around CrowdDensityEngine (crowd-density-engine.js)
 * and the curated dataset (crowd-density-data.js). Mirrors the split already
 * used for weather (weather-core.js = pure rules, weather-service.js =
 * fetch + cache) and trip planning (trip-planner.js pure logic vs. the UI
 * layer owning persistence): keeps the scoring engine unit-testable while
 * this file owns everything that touches the network, localStorage, or
 * timers.
 *
 * Responsibilities:
 *  - builds a CrowdDensityEngine seeded with crowd-density-data.js
 *  - enriches predictions with live weather via window.WeatherService
 *    (Open-Meteo) when available, mapping its weathercode to the engine's
 *    simplified clear/rain/extreme condition
 *  - caches predictions in localStorage with a short TTL so repeated
 *    destination-page renders don't recompute needlessly
 *  - persists user feedback (predicted vs. actual crowd level) so the
 *    engine's learned per-destination adjustment survives reloads
 *  - exposes startAutoRefresh()/stopAutoRefresh() so a page can keep
 *    predictions current ("dynamic prediction updates" from the feature
 *    request) without the caller managing its own timer
 *
 * Loaded after crowd-density-data.js and crowd-density-engine.js. Since
 * crowd-density-engine.js is an ES module (for direct unit-test imports),
 * this file also loads as a module (see the "module" script tag in the
 * demo page) and re-exposes its API on window.CrowdDensityService for any
 * non-module script on the page that wants to call it (e.g. inline
 * onclick handlers).
 */
import { CrowdDensityEngine } from "./crowd-density-engine.js";

const PREDICTION_CACHE_PREFIX = "crowdPredictionCache:";
const PREDICTION_CACHE_TTL_MS = 30 * 60 * 1000; // 30 min — crowd levels don't need weather-service's shorter/longer TTL, just "reasonably fresh"
const FEEDBACK_STORAGE_KEY = "crowdDensityFeedback";
const DEFAULT_REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15 min "dynamic update" cadence

/** Open-Meteo WMO weather codes -> engine's simplified condition buckets. */
function classifyWeatherCode(code) {
  if (code == null) return null;
  if ([0, 1].includes(code)) return "clear";
  if ([2, 3, 45, 48].includes(code)) return "cloudy";
  if ([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "extreme";
  return "cloudy";
}

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Storage full/unavailable — feature still works, just without persistence this session.
  }
}

export class CrowdDensityService {
  /**
   * @param {Object} [options]
   * @param {Array} [options.destinations] Defaults to window.crowdDestinations (crowd-density-data.js).
   * @param {Array} [options.holidays] Defaults to window.crowdHolidays2026.
   * @param {Object} [options.nearbyAlternatives] Defaults to window.crowdNearbyAlternatives.
   * @param {Object} [options.weatherService] Defaults to window.WeatherService.
   */
  constructor(options = {}) {
    const root = typeof window !== "undefined" ? window : {};
    this.destinations = options.destinations || root.crowdDestinations || [];
    this.weatherService = options.weatherService || root.WeatherService || null;
    this.engine = new CrowdDensityEngine({
      destinations: this.destinations,
      holidays: options.holidays || root.crowdHolidays2026 || [],
      nearbyAlternatives: options.nearbyAlternatives || root.crowdNearbyAlternatives || {}
    });
    this.destinationsById = new Map(this.destinations.map((d) => [d.id, d]));
    this._refreshTimer = null;
    this._loadPersistedFeedback();
  }

  // --------------------------------------------------------------------
  // Weather enrichment
  // --------------------------------------------------------------------

  /** Best-effort live weather for a destination's date; returns null on any failure so predictions still degrade gracefully to weather-neutral. */
  async getWeatherForDate(destinationId, date) {
    const destination = this.destinationsById.get(destinationId);
    if (!destination || !this.weatherService || destination.lat == null || destination.lng == null) return null;
    try {
      const forecast = await this.weatherService.fetchForecast(destination.lat, destination.lng);
      const iso = (date instanceof Date ? date : new Date(date)).toISOString().slice(0, 10);
      const day = forecast.find((f) => f.date === iso);
      if (!day) return null;
      return { condition: classifyWeatherCode(day.weatherCode), tempC: day.tempMaxC };
    } catch (e) {
      return null;
    }
  }

  // --------------------------------------------------------------------
  // Cached predictions
  // --------------------------------------------------------------------

  _cacheKey(destinationId, date) {
    return `${PREDICTION_CACHE_PREFIX}${destinationId}:${date}`;
  }

  _readCache(destinationId, date) {
    const entry = readJSON(this._cacheKey(destinationId, date));
    if (!entry || Date.now() - entry.fetchedAt > PREDICTION_CACHE_TTL_MS) return null;
    return entry.prediction;
  }

  _writeCache(destinationId, date, prediction) {
    writeJSON(this._cacheKey(destinationId, date), { fetchedAt: Date.now(), prediction });
  }

  /**
   * Predicts crowd density for a destination/date, using live weather and a
   * short localStorage cache. Set `options.forceRefresh` to bypass the cache
   * (used by startAutoRefresh()).
   */
  async predict(destinationId, date, options = {}) {
    const isoDateStr = (date instanceof Date ? date : new Date(date)).toISOString().slice(0, 10);
    if (!options.forceRefresh) {
      const cached = this._readCache(destinationId, isoDateStr);
      if (cached) return cached;
    }
    const weather = await this.getWeatherForDate(destinationId, isoDateStr);
    const prediction = this.engine.predictCrowdLevel(destinationId, isoDateStr, { weather });
    if (prediction) this._writeCache(destinationId, isoDateStr, prediction);
    return prediction;
  }

  getBestVisitingHours(destinationId, date, options) {
    return this.engine.getBestVisitingHours(destinationId, date, options);
  }

  async getForecast(destinationId, startDate, days = 7) {
    const weatherByDate = {};
    if (this.weatherService) {
      const destination = this.destinationsById.get(destinationId);
      if (destination && destination.lat != null) {
        try {
          const forecast = await this.weatherService.fetchForecast(destination.lat, destination.lng);
          for (const day of forecast) {
            weatherByDate[day.date] = { condition: classifyWeatherCode(day.weatherCode), tempC: day.tempMaxC };
          }
        } catch (e) {
          // Fall back to weather-neutral forecast below.
        }
      }
    }
    return this.engine.getForecast(destinationId, startDate, days, weatherByDate);
  }

  suggestAlternatives(destinationId, date, options) {
    return this.engine.suggestAlternatives(destinationId, date, options);
  }

  optimizeItinerary(stops, options) {
    return this.engine.optimizeItinerary(stops, options);
  }

  // --------------------------------------------------------------------
  // Feedback persistence
  // --------------------------------------------------------------------

  _loadPersistedFeedback() {
    const stored = readJSON(FEEDBACK_STORAGE_KEY);
    if (stored) this.engine.loadFeedbackAdjustments(stored);
  }

  /** Records feedback on the engine and persists the resulting adjustments to localStorage. */
  submitFeedback(destinationId, predictedScore, actualScore) {
    this.engine.recordFeedback(destinationId, predictedScore, actualScore);
    const snapshot = {};
    for (const destination of this.destinations) {
      const adjustment = this.engine.getFeedbackAdjustment(destination.id);
      if (adjustment) snapshot[destination.id] = adjustment;
    }
    writeJSON(FEEDBACK_STORAGE_KEY, snapshot);
  }

  // --------------------------------------------------------------------
  // Dynamic prediction updates
  // --------------------------------------------------------------------

  /**
   * Polls `predict(destinationId, date, {forceRefresh:true})` on an
   * interval and hands fresh predictions to `onUpdate`. Returns a stop
   * function (also stored so stopAutoRefresh() works without it).
   */
  startAutoRefresh(destinationId, date, onUpdate, intervalMs = DEFAULT_REFRESH_INTERVAL_MS) {
    this.stopAutoRefresh();
    const tick = () => {
      this.predict(destinationId, date, { forceRefresh: true }).then((prediction) => {
        if (prediction) onUpdate(prediction);
      });
    };
    tick();
    this._refreshTimer = setInterval(tick, intervalMs);
    return () => this.stopAutoRefresh();
  }

  stopAutoRefresh() {
    if (this._refreshTimer) {
      clearInterval(this._refreshTimer);
      this._refreshTimer = null;
    }
  }
}

if (typeof window !== "undefined") {
  window.CrowdDensityService = CrowdDensityService;
}
