/**
 * indian-sports-mascots.test.js
 * Unit tests for the Indian Sports Mascots explorer page.
 * Issue: #2560
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
  return readFileSync(
    resolve(__dirname, "../../frontend/indian-sports-mascots", file),
    "utf-8",
  );
}

// Direct ES-module import of the data file (matches the PKL / trophies pattern).
import { mascotsData, MASCOT_SPORTS, MASCOT_DECADES } from "../../frontend/indian-sports-mascots/mascot-data.js";

describe("Indian Sports Mascots — Page Structure & HTML", () => {
  let html;

  beforeAll(() => {
    html = readExplorerFile("index.html");
  });

  it("contains page title and header metadata", () => {
    expect(html).toContain("Indian Sports Mascots");
    expect(html).toContain("Indian Sports Mascots | Incredible India Explorer");
    expect(html).toContain("Characters Behind Major Events");
  });

  it("contains all required content sections", () => {
    const sections = ["gallery", "timeline", "quiz", "credits"];
    sections.forEach((id) => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  it("contains the mascot search + sport + decade filters", () => {
    expect(html).toContain('id="mascot-search"');
    expect(html).toContain('id="sport-filter"');
    expect(html).toContain('id="decade-filter"');
  });

  it("contains the mascot cards container and timeline track", () => {
    expect(html).toContain('id="mascot-cards-container"');
    expect(html).toContain('id="timeline-track"');
  });

  it("contains the quiz container and credits container", () => {
    expect(html).toContain('id="quiz-content"');
    expect(html).toContain('id="credits-container"');
  });

  it("contains the detail modal markup", () => {
    expect(html).toContain('id="mascot-modal"');
    expect(html).toContain('id="modal-close-btn"');
    expect(html).toContain('id="modal-body-content"');
  });

  it("loads the stylesheet and script module", () => {
    expect(html).toContain('href="style.css"');
    expect(html).toContain('src="script.js"');
    expect(html).toContain('type="module"');
  });

  it("links back to the Sports hub page", () => {
    expect(html).toContain('../sports/sports.html');
  });
});

describe("Indian Sports Mascots — Data Repository (mascot-data.js)", () => {
  it("exports at least 8 mascots", () => {
    expect(mascotsData.length).toBeGreaterThanOrEqual(8);
  });

  it("each mascot has the 7 required fields (mascot, event, year, host city, design, meaning, cultural inspiration)", () => {
    mascotsData.forEach((m) => {
      expect(m.id).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.event).toBeTruthy();
      expect(m.year).toBeGreaterThanOrEqual(2010);
      expect(m.hostCity).toBeTruthy();
      expect(m.design.length).toBeGreaterThan(50);
      expect(m.meaning.length).toBeGreaterThan(50);
      expect(m.culturalInspiration.length).toBeGreaterThan(50);
    });
  });

  it("each mascot has an imageCredit field (acceptance criterion: images credited)", () => {
    mascotsData.forEach((m) => {
      expect(m.imageCredit).toBeTruthy();
      expect(m.imageCredit.length).toBeGreaterThan(20);
    });
  });

  it("each mascot has an icon (emoji) and a color (hex)", () => {
    mascotsData.forEach((m) => {
      expect(m.icon).toBeTruthy();
      expect(m.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("includes Shera (CWG 2010) and Stumpy (CWC 2011)", () => {
    const shera = mascotsData.find((m) => m.id === "shera-2010");
    expect(shera).toBeTruthy();
    expect(shera.name).toBe("Shera");
    expect(shera.event).toContain("Commonwealth Games 2010");
    expect(shera.hostCity).toContain("New Delhi");

    const stumpy = mascotsData.find((m) => m.id === "stumpy-2011");
    expect(stumpy).toBeTruthy();
    expect(stumpy.name).toBe("Stumpy");
    expect(stumpy.event).toContain("ICC Cricket World Cup 2011");
  });

  it("includes Kheleo (FIFA U-17 World Cup 2017) — the clouded leopard", () => {
    const kheleo = mascotsData.find((m) => m.id === "kheleo-2017");
    expect(kheleo).toBeTruthy();
    expect(kheleo.name).toBe("Kheleo");
    expect(kheleo.culturalInspiration).toContain("Clouded Leopard");
  });

  it("includes mascots from the 2020s (Bhaukal / Savaj)", () => {
    const bhaukal = mascotsData.find((m) => m.id === "bhaukal-2023");
    expect(bhaukal).toBeTruthy();
    expect(bhaukal.name).toBe("Bhaukal");
    expect(bhaukal.culturalInspiration).toContain("Asiatic Lion");

    const savaj = mascotsData.find((m) => m.id === "savaj-2024");
    expect(savaj).toBeTruthy();
    expect(savaj.name).toBe("Savaj");
    expect(savaj.culturalInspiration).toContain("Himalayan Monal");
  });

  it("covers a variety of sports (Multi-Sport, Cricket, Football, Hockey)", () => {
    const sports = new Set(mascotsData.map((m) => m.sport));
    expect(sports.has("Multi-Sport")).toBe(true);
    expect(sports.has("Cricket")).toBe(true);
    expect(sports.has("Football (Soccer)")).toBe(true);
    expect(sports.has("Field Hockey")).toBe(true);
  });

  it("exports the MASCOT_SPORTS and MASCOT_DECADES filter constants", () => {
    expect(Array.isArray(MASCOT_SPORTS)).toBe(true);
    expect(MASCOT_SPORTS.length).toBeGreaterThanOrEqual(4);
    expect(Array.isArray(MASCOT_DECADES)).toBe(true);
    expect(MASCOT_DECADES).toEqual(["2010s", "2020s"]);
  });

  it("every mascot's sport appears in MASCOT_SPORTS", () => {
    mascotsData.forEach((m) => {
      expect(MASCOT_SPORTS).toContain(m.sport);
    });
  });

  it("every mascot's year falls into one of MASCOT_DECADES", () => {
    mascotsData.forEach((m) => {
      const decade = m.year < 2020 ? "2010s" : "2020s";
      expect(MASCOT_DECADES).toContain(decade);
    });
  });
});
