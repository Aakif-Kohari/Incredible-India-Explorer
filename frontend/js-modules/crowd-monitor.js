/**
 * js-modules/crowd-monitor.js
 *
 * Lightweight crowd observation layer for the crowd-density feature.
 *
 * This module does not calculate the crowd prediction itself.
 * CrowdDensityEngine remains responsible for prediction/scoring.
 *
 * CrowdMonitor stores recent crowd observations so the service layer can
 * consume fresh observations and expose monitoring metadata to the UI.
 */

const STORAGE_KEY = "crowdDensityObservations";
const MAX_OBSERVATIONS_PER_DESTINATION = 20;
const DEFAULT_MAX_AGE_MS = 30 * 60 * 1000;

function readObservations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeObservations(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Persistence is optional. Monitoring continues for the current session.
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export class CrowdMonitor {
  constructor(options = {}) {
    this.maxAgeMs = options.maxAgeMs || DEFAULT_MAX_AGE_MS;
    this.observations = readObservations();
  }

  /**
   * Record a crowd observation.
   *
   * @param {string} destinationId
   * @param {number} score 0-100
   * @param {Object} options
   * @param {string} options.source
   * @param {number} options.confidence 0-1
   */
  recordObservation(destinationId, score, options = {}) {
    if (!destinationId || !Number.isFinite(Number(score))) {
      return null;
    }

    const observation = {
      destinationId,
      score: Math.round(clamp(Number(score), 0, 100)),
      source: options.source || "user-observation",
      confidence: clamp(
        options.confidence != null ? Number(options.confidence) : 0.5,
        0,
        1
      ),
      observedAt: new Date().toISOString()
    };

    if (!this.observations[destinationId]) {
      this.observations[destinationId] = [];
    }

    this.observations[destinationId].unshift(observation);

    this.observations[destinationId] =
      this.observations[destinationId].slice(
        0,
        MAX_OBSERVATIONS_PER_DESTINATION
      );

    writeObservations(this.observations);

    return observation;
  }

  /**
   * Return the latest valid observation for a destination.
   */
  getLatestObservation(destinationId) {
    const entries = this.observations[destinationId] || [];

    const now = Date.now();

    const latest = entries.find((entry) => {
      const timestamp = new Date(entry.observedAt).getTime();

      return (
        Number.isFinite(timestamp) &&
        now - timestamp <= this.maxAgeMs
      );
    });

    return latest || null;
  }

  /**
   * Return recent observations for analytics/history.
   */
  getHistory(destinationId, limit = 10) {
    return (this.observations[destinationId] || [])
      .slice(0, limit)
      .filter((entry) => {
        const timestamp = new Date(entry.observedAt).getTime();

        return (
          Number.isFinite(timestamp) &&
          Date.now() - timestamp <= this.maxAgeMs
        );
      });
  }

  /**
   * Remove expired observations.
   */
  cleanup() {
    const now = Date.now();

    for (const destinationId of Object.keys(this.observations)) {
      this.observations[destinationId] =
        (this.observations[destinationId] || []).filter((entry) => {
          const timestamp = new Date(entry.observedAt).getTime();

          return (
            Number.isFinite(timestamp) &&
            now - timestamp <= this.maxAgeMs
          );
        });

      if (this.observations[destinationId].length === 0) {
        delete this.observations[destinationId];
      }
    }

    writeObservations(this.observations);
  }

  /**
   * Returns monitoring metadata for the UI.
   */
  getStatus(destinationId) {
    const observation = this.getLatestObservation(destinationId);

    if (!observation) {
      return {
        available: false,
        source: null,
        confidence: null,
        observedAt: null
      };
    }

    return {
      available: true,
      source: observation.source,
      confidence: observation.confidence,
      observedAt: observation.observedAt
    };
  }

  /**
   * Returns live observation data for real-time monitoring.
   */
  getLiveObservation(destinationId) {
    const observation = this.getLatestObservation(destinationId);

    if (!observation) {
      return null;
    }

    return {
      score: observation.score,
      source: observation.source,
      confidence: observation.confidence,
      observedAt: observation.observedAt,
      isLive: true
    };
  }
}
}