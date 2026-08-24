/**
 * js-modules/crowd-data-provider.js
 *
 * Optional live crowd-data adapter for #2860.
 *
 * The provider is intentionally API-agnostic. If a live crowd endpoint is
 * configured, it attempts to retrieve current crowd information.
 *
 * If no endpoint is configured or the request fails, it returns null and
 * CrowdDensityService falls back to the existing prediction engine.
 */

const DEFAULT_TIMEOUT_MS = 8000;

function createTimeoutSignal(timeoutMs) {
  if (typeof AbortSignal !== "undefined" && AbortSignal.timeout) {
    return AbortSignal.timeout(timeoutMs);
  }

  if (typeof AbortController === "undefined") {
    return undefined;
  }

  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return controller.signal;
}

export class CrowdDataProvider {
  constructor(options = {}) {
    this.endpoint = options.endpoint || "";
    this.timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;

    this.fetchImpl =
      options.fetchImpl ||
      (typeof fetch === "function" ? fetch.bind(globalThis) : null);
  }

  isConfigured() {
    return Boolean(this.endpoint && this.fetchImpl);
  }

  async fetchDestinationCrowd(destinationId) {
    if (!this.isConfigured()) {
      return null;
    }

    try {
      const url = new URL(
        this.endpoint,
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost"
      );

      url.searchParams.set("destinationId", destinationId);

      const signal = createTimeoutSignal(this.timeoutMs);

      const response = await this.fetchImpl(url.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        signal
      });

      if (!response.ok) {
        throw new Error(`Crowd API returned HTTP ${response.status}`);
      }

      const payload = await response.json();

      return this.normalize(payload, destinationId);
    } catch (error) {
      console.warn("Live crowd data unavailable:", error);
      return null;
    }
  }

  normalize(payload, destinationId) {
    if (!payload || typeof payload !== "object") {
      return null;
    }

    const score = Number(
      payload.score ??
      payload.crowdScore ??
      payload.crowd_score
    );

    if (!Number.isFinite(score)) {
      return null;
    }

    return {
      destinationId,
      score: Math.max(0, Math.min(100, Math.round(score))),
      source: payload.source || "live",
      observedAt: payload.observedAt || new Date().toISOString(),
      confidence: Number.isFinite(Number(payload.confidence))
        ? Math.max(0, Math.min(1, Number(payload.confidence)))
        : null,
      visitors: Number.isFinite(Number(payload.visitors))
        ? Number(payload.visitors)
        : null
    };
  }
}