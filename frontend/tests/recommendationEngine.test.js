/**
 * @jest-environment jsdom
 */
require("../data/destinations.js");
require("../knowledgeBase.js");
require("../recommendationEngine.js");

describe("recommendationEngine", () => {
  test("recommends indoor spots when it is raining", () => {
    const session = { preferences: {}, lastMentionedCity: "Jaipur", lastRecommendedIds: [] };
    const results = recommend({ intent: { weather: "rain", city: "Jaipur" }, session });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((r) => expect(r.indoorOutdoor).not.toBe("outdoor"));
  });

  test("filters by budget-friendly intent", () => {
    const session = { preferences: {}, lastMentionedCity: "Agra", lastRecommendedIds: [] };
    const results = recommend({ intent: { budgetFriendly: true, city: "Agra" }, session });
    results.forEach((r) => expect(r.avgCost).toBeLessThanOrEqual(400));
  });
});