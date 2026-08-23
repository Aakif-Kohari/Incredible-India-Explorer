import { describe, it, expect, vi } from "vitest";
import { CrowdDataProvider } from "../../js-modules/crowd-data-provider.js";

describe("CrowdDataProvider", () => {
  it("returns null when no endpoint is configured", async () => {
    const provider = new CrowdDataProvider();

    expect(
      await provider.fetchDestinationCrowd("agra")
    ).toBeNull();
  });

  it("normalizes a live crowd response", () => {
    const provider = new CrowdDataProvider();

    const result = provider.normalize(
      {
        crowdScore: 82,
        source: "city-feed",
        confidence: 0.91,
        visitors: 1240,
        observedAt: "2026-08-18T12:00:00Z"
      },
      "agra"
    );

    expect(result.destinationId).toBe("agra");
    expect(result.score).toBe(82);
    expect(result.source).toBe("city-feed");
    expect(result.confidence).toBe(0.91);
    expect(result.visitors).toBe(1240);
  });

  it("clamps scores to 0-100", () => {
    const provider = new CrowdDataProvider();

    expect(
      provider.normalize({ score: 140 }, "agra").score
    ).toBe(100);

    expect(
      provider.normalize({ score: -20 }, "agra").score
    ).toBe(0);
  });

  it("returns null for invalid API data", () => {
    const provider = new CrowdDataProvider();

    expect(
      provider.normalize({ source: "unknown" }, "agra")
    ).toBeNull();
  });

  it("fetches and normalizes live data", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        score: 73,
        source: "live-api"
      })
    });

    const provider = new CrowdDataProvider({
      endpoint: "/api/crowd",
      fetchImpl
    });

    const result = await provider.fetchDestinationCrowd("agra");

    expect(fetchImpl).toHaveBeenCalled();
    expect(result.score).toBe(73);
    expect(result.isLive).toBeUndefined();
  });

  it("returns null when the API fails", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(
      new Error("Network error")
    );

    const provider = new CrowdDataProvider({
      endpoint: "/api/crowd",
      fetchImpl
    });

    expect(
      await provider.fetchDestinationCrowd("agra")
    ).toBeNull();
  });
});