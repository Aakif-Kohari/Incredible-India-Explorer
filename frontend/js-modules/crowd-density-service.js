/**
 * js-modules/crowd-density-service.js
 *
 * Service layer for the Crowd Density Prediction feature.
 *
 * Responsibilities:
 *  - Creates CrowdDensityEngine with the curated crowd dataset
 *  - Fetches live crowd observations through CrowdDataProvider
 *  - Enriches predictions with live weather
 *  - Caches predictions in localStorage
 *  - Persists user feedback
 *  - Provides forecast, alternatives and itinerary helpers
 *  - Supports automatic prediction refresh
 */

import { CrowdDensityEngine } from "./crowd-density-engine.js";
import { CrowdDataProvider } from "./crowd-data-provider.js";

const PREDICTION_CACHE_PREFIX = "crowdPredictionCache:";
const PREDICTION_CACHE_TTL_MS = 30 * 60 * 1000;
const FEEDBACK_STORAGE_KEY = "crowdDensityFeedback";
const DEFAULT_REFRESH_INTERVAL_MS = 15 * 60 * 1000;

/**
 * Open-Meteo WMO weather codes -> simplified weather categories.
 */
function classifyWeatherCode(code) {
  if (code == null) return null;

  if ([0, 1].includes(code)) {
    return "clear";
  }

  if ([2, 3, 45, 48].includes(code)) {
    return "cloudy";
  }

  if (
    [
      51,
      53,
      55,
      61,
      63,
      65,
      66,
      67,
      80,
      81,
      82,
      95,
      96,
      99
    ].includes(code)
  ) {
    return "rain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "extreme";
  }

  return "cloudy";
}

/**
 * Safely read JSON from localStorage.
 */
function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

/**
 * Safely write JSON to localStorage.
 */
function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Persistence is optional.
    // The feature continues to work for the current session.
  }
}

export class CrowdDensityService {
  /**
   * @param {Object} [options]
   * @param {Array} [options.destinations]
   * @param {Array} [options.holidays]
   * @param {Object} [options.nearbyAlternatives]
   * @param {Object} [options.weatherService]
   * @param {Object} [options.crowdDataProvider]
   * @param {string} [options.crowdDataEndpoint]
   */
  constructor(options = {}) {
    const root =
      typeof window !== "undefined"
        ? window
        : {};

    // ------------------------------------------------------------
    // Destination dataset
    // ------------------------------------------------------------

    this.destinations =
      options.destinations ||
      root.crowdDestinations ||
      [];

    // ------------------------------------------------------------
    // Weather service
    // ------------------------------------------------------------

    this.weatherService =
      options.weatherService ||
      root.WeatherService ||
      null;

    // ------------------------------------------------------------
    // Prediction engine
    // ------------------------------------------------------------

    this.engine = new CrowdDensityEngine({
      destinations: this.destinations,

      holidays:
        options.holidays ||
        root.crowdHolidays2026 ||
        [],

      nearbyAlternatives:
        options.nearbyAlternatives ||
        root.crowdNearbyAlternatives ||
        {}
    });

    // ------------------------------------------------------------
    // Live crowd data provider
    // ------------------------------------------------------------

    this.crowdDataProvider =
      options.crowdDataProvider ||
      new CrowdDataProvider({
        endpoint:
          options.crowdDataEndpoint ||
          root.CROWD_DATA_ENDPOINT ||
          ""
      });

    // ------------------------------------------------------------
    // Destination lookup
    // ------------------------------------------------------------

    this.destinationsById = new Map(
      this.destinations.map((destination) => [
        destination.id,
        destination
      ])
    );

    // ------------------------------------------------------------
    // Auto-refresh timer
    // ------------------------------------------------------------

    this._refreshTimer = null;

    // ------------------------------------------------------------
    // Restore persisted feedback adjustments
    // ------------------------------------------------------------

    this._loadPersistedFeedback();
  }

  // ============================================================
  // WEATHER
  // ============================================================

  /**
   * Gets weather information for a destination/date.
   *
   * Weather is best-effort. If WeatherService is unavailable
   * or the request fails, null is returned and the prediction
   * engine continues without a weather adjustment.
   */
  async getWeatherForDate(destinationId, date) {
    const destination =
      this.destinationsById.get(destinationId);

    if (
      !destination ||
      !this.weatherService ||
      destination.lat == null ||
      destination.lng == null
    ) {
      return null;
    }

    try {
      const forecast =
        await this.weatherService.fetchForecast(
          destination.lat,
          destination.lng
        );

      const isoDate =
        (
          date instanceof Date
            ? date
            : new Date(date)
        )
          .toISOString()
          .slice(0, 10);

      const day =
        forecast.find(
          (item) => item.date === isoDate
        );

      if (!day) {
        return null;
      }

      return {
        condition: classifyWeatherCode(
          day.weatherCode
        ),
        tempC: day.tempMaxC
      };
    } catch (error) {
      return null;
    }
  }

  // ============================================================
  // CACHE
  // ============================================================

  _cacheKey(destinationId, date) {
    return `${PREDICTION_CACHE_PREFIX}${destinationId}:${date}`;
  }

  _readCache(destinationId, date) {
    const entry = readJSON(
      this._cacheKey(destinationId, date)
    );

    if (!entry) {
      return null;
    }

    if (
      !entry.fetchedAt ||
      Date.now() - entry.fetchedAt >
        PREDICTION_CACHE_TTL_MS
    ) {
      return null;
    }

    return entry.prediction || null;
  }

  _writeCache(destinationId, date, prediction) {
    writeJSON(
      this._cacheKey(destinationId, date),
      {
        fetchedAt: Date.now(),
        prediction
      }
    );
  }

  // ============================================================
  // CROWD PREDICTION
  // ============================================================

  /**
   * Predict crowd density for a destination/date.
   *
   * Priority:
   *
   * 1. Cached prediction
   * 2. Live crowd observation, if available
   * 3. Engine-based estimated prediction
   *
   * Live data overrides only the score and related live metadata.
   * The engine remains responsible for the prediction structure
   * and factor calculations.
   */
  async predict(
    destinationId,
    date,
    options = {}
  ) {
    if (!destinationId || !date) {
      return null;
    }

    const parsedDate =
      date instanceof Date
        ? date
        : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    const isoDateStr =
      parsedDate
        .toISOString()
        .slice(0, 10);

    // ----------------------------------------------------------
    // Cache
    // ----------------------------------------------------------

    if (!options.forceRefresh) {
      const cached =
        this._readCache(
          destinationId,
          isoDateStr
        );

      if (cached) {
        return cached;
      }
    }

    // ----------------------------------------------------------
    // Live crowd observation
    // ----------------------------------------------------------

    let liveCrowd = null;

    if (
      options.useLiveData !== false &&
      this.crowdDataProvider
    ) {
      try {
        liveCrowd =
          await this.crowdDataProvider.fetchDestinationCrowd(
            destinationId
          );
      } catch (error) {
        // Live data is optional.
        // Continue with the rule-based prediction.
        liveCrowd = null;
      }
    }

    // ----------------------------------------------------------
    // Weather
    // ----------------------------------------------------------

    const weather =
      await this.getWeatherForDate(
        destinationId,
        isoDateStr
      );

    // ----------------------------------------------------------
    // Engine prediction
    // ----------------------------------------------------------

    const prediction =
      this.engine.predictCrowdLevel(
        destinationId,
        isoDateStr,
        {
          weather
        }
      );

    if (!prediction) {
      return null;
    }

    // ----------------------------------------------------------
    // Apply live crowd observation
    // ----------------------------------------------------------

    if (liveCrowd) {
      const liveScore = Math.max(
        0,
        Math.min(
          100,
          Number(liveCrowd.score)
        )
      );

      prediction.score =
        Math.round(liveScore);

      prediction.source =
        liveCrowd.source ||
        "live-crowd-data";

      prediction.observedAt =
        liveCrowd.observedAt ||
        new Date().toISOString();

      prediction.confidence =
        liveCrowd.confidence != null
          ? liveCrowd.confidence
          : 0.8;

      if (liveCrowd.visitors != null) {
        prediction.visitors =
          liveCrowd.visitors;
      }

      prediction.isLive = true;

      /*
       * IMPORTANT:
       *
       * CrowdDensityEngine exposes:
       *
       * CrowdDensityEngine.levelForScore()
       *
       * It does NOT expose getCrowdLevel().
       */
      prediction.level =
        CrowdDensityEngine.levelForScore(
          prediction.score
        );
    } else {
      // --------------------------------------------------------
      // Estimated prediction
      // --------------------------------------------------------

      prediction.source = "estimated";

      prediction.isLive = false;

      prediction.observedAt =
        new Date().toISOString();

      prediction.confidence =
        prediction.confidence != null
          ? prediction.confidence
          : 0.5;
    }

    // ----------------------------------------------------------
    // Save prediction
    // ----------------------------------------------------------

    this._writeCache(
      destinationId,
      isoDateStr,
      prediction
    );

    return prediction;
  }

  // ============================================================
  // BEST VISITING HOURS
  // ============================================================

  getBestVisitingHours(
    destinationId,
    date,
    options
  ) {
    return this.engine.getBestVisitingHours(
      destinationId,
      date,
      options
    );
  }

  // ============================================================
  // FORECAST
  // ============================================================

  async getForecast(
    destinationId,
    startDate,
    days = 7
  ) {
    const weatherByDate = {};

    if (this.weatherService) {
      const destination =
        this.destinationsById.get(
          destinationId
        );

      if (
        destination &&
        destination.lat != null &&
        destination.lng != null
      ) {
        try {
          const forecast =
            await this.weatherService.fetchForecast(
              destination.lat,
              destination.lng
            );

          for (const day of forecast) {
            weatherByDate[day.date] = {
              condition:
                classifyWeatherCode(
                  day.weatherCode
                ),
              tempC: day.tempMaxC
            };
          }
        } catch (error) {
          // Weather is optional.
          // Continue with weather-neutral forecast.
        }
      }
    }

    return this.engine.getForecast(
      destinationId,
      startDate,
      days,
      weatherByDate
    );
  }

  // ============================================================
  // ALTERNATIVE DESTINATIONS
  // ============================================================

  suggestAlternatives(
    destinationId,
    date,
    options
  ) {
    return this.engine.suggestAlternatives(
      destinationId,
      date,
      options
    );
  }

  // ============================================================
  // ITINERARY OPTIMIZATION
  // ============================================================

  optimizeItinerary(
    stops,
    options
  ) {
    return this.engine.optimizeItinerary(
      stops,
      options
    );
  }

  // ============================================================
  // FEEDBACK
  // ============================================================

  _loadPersistedFeedback() {
    const stored =
      readJSON(
        FEEDBACK_STORAGE_KEY
      );

    if (stored) {
      this.engine.loadFeedbackAdjustments(
        stored
      );
    }
  }

  /**
   * Save user feedback about predicted vs
   * actual crowd level.
   */
  submitFeedback(
    destinationId,
    predictedScore,
    actualScore
  ) {
    const adjustment =
      this.engine.recordFeedback(
        destinationId,
        predictedScore,
        actualScore
      );

    const snapshot = {};

    for (
      const destination of this.destinations
    ) {
      const value =
        this.engine.getFeedbackAdjustment(
          destination.id
        );

      if (value) {
        snapshot[destination.id] = value;
      }
    }

    writeJSON(
      FEEDBACK_STORAGE_KEY,
      snapshot
    );

    /*
     * Feedback changes the prediction.
     * Remove the old cached prediction so
     * the next request uses the updated score.
     */
    try {
      const keys = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key =
          localStorage.key(i);

        if (
          key &&
          key.startsWith(
            `${PREDICTION_CACHE_PREFIX}${destinationId}:`
          )
        ) {
          keys.push(key);
        }
      }

      keys.forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      // Cache invalidation is best effort.
    }

    return adjustment;
  }

  // ============================================================
  // DYNAMIC REFRESH
  // ============================================================

  /**
   * Automatically refreshes a prediction.
   *
   * The first prediction is fetched immediately.
   * Further predictions are fetched every interval.
   */
  startAutoRefresh(
    destinationId,
    date,
    onUpdate,
    intervalMs = DEFAULT_REFRESH_INTERVAL_MS
  ) {
    this.stopAutoRefresh();

    const tick = async () => {
      try {
        const prediction =
          await this.predict(
            destinationId,
            date,
            {
              forceRefresh: true,
              useLiveData: true
            }
          );

        if (
          prediction &&
          typeof onUpdate === "function"
        ) {
          onUpdate(prediction);
        }
      } catch (error) {
        // Keep auto-refresh alive even if one
        // network request fails.
      }
    };

    // Initial update immediately.
    tick();

    this._refreshTimer =
      setInterval(
        tick,
        intervalMs
      );

    return () =>
      this.stopAutoRefresh();
  }

  stopAutoRefresh() {
    if (this._refreshTimer) {
      clearInterval(
        this._refreshTimer
      );

      this._refreshTimer = null;
    }
  }
}

// ================================================================
// GLOBAL API
// ================================================================

if (typeof window !== "undefined") {
  window.CrowdDensityService =
    CrowdDensityService;
}