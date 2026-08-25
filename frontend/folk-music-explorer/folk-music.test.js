import { describe, expect, it, beforeEach } from "vitest";
import {
  searchMusic,
  filterMusic,
  getFilteredMusic,
  toggleFavorite
} from "./folk-music.js";

const data = [
  {
    id: "baul",
    name: "Baul Music",
    state: "West Bengal",
    region: "East",
    category: "Devotional Folk",
    instrumentTypes: ["String"],
    instruments: ["Ektara"],
    festival: "Poush Mela"
  },
  {
    id: "bihu",
    name: "Bihu Geet",
    state: "Assam",
    region: "Northeast",
    category: "Seasonal Folk",
    instrumentTypes: ["Percussion", "Wind"],
    instruments: ["Dhol", "Pepa"],
    festival: "Rongali Bihu"
  },
  {
    id: "lavani",
    name: "Lavani",
    state: "Maharashtra",
    region: "West",
    category: "Dance Folk",
    instrumentTypes: ["Percussion"],
    instruments: ["Dholki"],
    festival: "Ganesh Chaturthi"
  }
];

describe("folk music explorer search", () => {
  it("finds a tradition by name", () => {
    expect(searchMusic(data, "lavani").map(item => item.id)).toEqual(["lavani"]);
  });

  it("finds a tradition by instrument", () => {
    expect(searchMusic(data, "ektara").map(item => item.id)).toEqual(["baul"]);
  });

  it("is case insensitive", () => {
    expect(searchMusic(data, "ASSAM").map(item => item.id)).toEqual(["bihu"]);
  });
});

describe("folk music explorer filters", () => {
  it("filters by state", () => {
    expect(filterMusic(data, { state: "Maharashtra" }).map(item => item.id)).toEqual(["lavani"]);
  });

  it("filters by region and category together", () => {
    expect(filterMusic(data, {
      region: "West",
      category: "Dance Folk"
    }).map(item => item.id)).toEqual(["lavani"]);
  });

  it("filters by instrument type", () => {
    expect(filterMusic(data, { instrumentType: "Wind" }).map(item => item.id)).toEqual(["bihu"]);
  });

  it("combines search and filters", () => {
    expect(getFilteredMusic(data, {
      query: "folk",
      region: "West"
    }).map(item => item.id)).toEqual(["baul", "lavani"]);
  });
});

describe("folk music bookmarks", () => {
  beforeEach(() => {});

  it("adds an item to favorites", () => {
    const result = toggleFavorite(new Set(), "baul");
    expect(result.has("baul")).toBe(true);
  });

  it("removes an existing favorite", () => {
    const result = toggleFavorite(new Set(["baul"]), "baul");
    expect(result.has("baul")).toBe(false);
  });

  it("does not mutate the original set", () => {
    const original = new Set(["baul"]);
    toggleFavorite(original, "lavani");
    expect(original.has("lavani")).toBe(false);
  });
});
