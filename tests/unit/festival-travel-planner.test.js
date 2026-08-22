import { describe, expect, it } from "vitest";

import { festivalData } from "../../frontend/festival-travel-planner/festival-travel-data.js";

import {
  filterFestivals,
  generateTravelPlan
} from "../../frontend/festival-travel-planner/festival-travel-planner.js";

describe("Festival Travel Planner", () => {
  it("filters festivals by month", () => {
    const results = filterFestivals(festivalData, {
      month: "11"
    });

    expect(results.length).toBeGreaterThan(0);

    expect(
      results.every(
        (festival) =>
          new Date(`${festival.startDate}T00:00:00`).getMonth() + 1 === 11
      )
    ).toBe(true);
  });

  it("filters festivals by state", () => {
    const results = filterFestivals(festivalData, {
      stateName: "Maharashtra"
    });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Ganesh Chaturthi");
  });

  it("filters festivals by region", () => {
    const results = filterFestivals(festivalData, {
      region: "South India"
    });

    expect(results.length).toBeGreaterThan(0);

    expect(
      results.every(
        (festival) => festival.region === "South India"
      )
    ).toBe(true);
  });

  it("filters festivals by category", () => {
    const results = filterFestivals(festivalData, {
      category: "Harvest"
    });

    expect(results.length).toBeGreaterThan(0);

    expect(
      results.every((festival) =>
        festival.category.includes("Harvest")
      )
    ).toBe(true);
  });

  it("filters festivals using search", () => {
    const results = filterFestivals(festivalData, {
      search: "mumbai"
    });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Ganesh Chaturthi");
  });

  it("supports combined filters", () => {
    const results = filterFestivals(festivalData, {
      region: "West India",
      category: "Cultural"
    });

    expect(results.length).toBeGreaterThan(0);

    expect(
      results.every(
        (festival) =>
          festival.region === "West India" &&
          festival.category.includes("Cultural")
      )
    ).toBe(true);
  });

  it("returns an empty array when no festival matches", () => {
    const results = filterFestivals(festivalData, {
      search: "festival-that-does-not-exist"
    });

    expect(results).toEqual([]);
  });

  it("generates a travel plan for a festival", () => {
    const festival = festivalData.find(
      (item) => item.id === "diwali-2026"
    );

    const plan = generateTravelPlan(festival);

    expect(plan.festival).toBe("Diwali");
    expect(plan.destination).toContain("Varanasi");
    expect(plan.itinerary).toHaveLength(4);
    expect(plan.checklist.length).toBeGreaterThan(5);
  });

  it("throws when generating a plan without a festival", () => {
    expect(() => generateTravelPlan(null)).toThrow(
      "Festival is required to generate a travel plan."
    );
  });
});