/**
 * pro-kabaddi-league-trophy.test.js
 * Unit tests for the Pro Kabaddi League Trophy explorer page.
 * Issue: #2549
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
  return readFileSync(
    resolve(__dirname, "../../frontend/pro-kabaddi-league-trophy", file),
    "utf-8",
  );
}

// We can import the data module directly because pkl-data.js uses ES exports.
import {
  pklTrophy,
  pklTeams,
  pklSeasons,
  pklChampions,
  pklStarPlayers,
  pklVenues,
  pklRecords,
  pklQuizQuestions,
} from "../../frontend/pro-kabaddi-league-trophy/pkl-data.js";

describe("PKL Trophy Explorer — Page Structure & Content", () => {
  let html;

  beforeAll(() => {
    html = readExplorerFile("index.html");
  });

  it("contains page title and header metadata", () => {
    expect(html).toContain("Pro Kabaddi League Trophy");
    expect(html).toContain("Pro Kabaddi League Trophy | Incredible India Explorer");
    expect(html).toContain("Modern Indian Kabaddi");
  });

  it("contains all essential content sections", () => {
    const sections = [
      "trophy",
      "timeline",
      "teams",
      "seasons",
      "stars",
      "venues",
      "records",
      "quiz",
    ];
    sections.forEach((id) => {
      expect(html).toContain(`id="${id}"`);
    });
  });

  it("contains the interactive season timeline elements", () => {
    expect(html).toContain('id="season-slider"');
    expect(html).toContain('id="timeline-season-label"');
    expect(html).toContain('id="timeline-year-label"');
    expect(html).toContain('id="timeline-detail"');
  });

  it("contains team grid and search/filter controls", () => {
    expect(html).toContain('id="team-cards-container"');
    expect(html).toContain('id="team-search"');
    expect(html).toContain('id="team-sort"');
  });

  it("contains season table with thead + tbody", () => {
    expect(html).toContain('id="season-table"');
    expect(html).toContain('id="season-table-body"');
    expect(html).toContain("<thead>");
    expect(html).toContain("Champion");
    expect(html).toContain("Runner-up");
    expect(html).toContain("MVP");
  });

  it("contains star players, venues, and records containers", () => {
    expect(html).toContain('id="star-cards-container"');
    expect(html).toContain('id="venue-cards-container"');
    expect(html).toContain('id="records-container"');
  });

  it("contains quiz container", () => {
    expect(html).toContain('id="quiz-content"');
  });

  it("contains detail modal markup", () => {
    expect(html).toContain('id="detail-modal"');
    expect(html).toContain('id="modal-close-btn"');
    expect(html).toContain('id="modal-body-content"');
  });

  it("loads the stylesheet and script", () => {
    expect(html).toContain('href="style.css"');
    expect(html).toContain('src="script.js"');
    expect(html).toContain('type="module"');
  });
});

describe("PKL Trophy Explorer — Data Repository", () => {
  describe("pklTrophy metadata", () => {
    it("contains correct trophy metadata", () => {
      expect(pklTrophy.name).toBe("Pro Kabaddi League Trophy");
      expect(pklTrophy.inaugurated).toBe(2014);
      expect(pklTrophy.material).toContain("Silver");
      expect(pklTrophy.height).toContain("60 cm");
      expect(pklTrophy.significance.length).toBeGreaterThan(50);
    });
  });

  describe("pklTeams", () => {
    it("has at least 10 franchises", () => {
      expect(pklTeams.length).toBeGreaterThanOrEqual(10);
    });

    it("each team has required fields", () => {
      pklTeams.forEach((team) => {
        expect(team.id).toBeTruthy();
        expect(team.name).toBeTruthy();
        expect(team.city).toBeTruthy();
        expect(team.founded).toBeGreaterThanOrEqual(2014);
        expect(team.homeVenue).toBeTruthy();
        expect(team.titles).toBeGreaterThanOrEqual(0);
        expect(team.primaryColor).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it("includes Patna Pirates (the dynasty)", () => {
      const patna = pklTeams.find((t) => t.name === "Patna Pirates");
      expect(patna).toBeTruthy();
      expect(patna.titles).toBe(3);
    });
  });

  describe("pklSeasons", () => {
    it("has 10 completed seasons (2014 → 2023)", () => {
      expect(pklSeasons.length).toBe(10);
      expect(pklSeasons[0].year).toBe(2014);
      expect(pklSeasons[pklSeasons.length - 1].year).toBe(2023);
    });

    it("each season has champion, runner-up, top raider, top defender, MVP", () => {
      pklSeasons.forEach((s) => {
        expect(s.season).toBeGreaterThanOrEqual(1);
        expect(s.year).toBeGreaterThanOrEqual(2014);
        expect(s.champion).toBeTruthy();
        expect(s.runnerUp).toBeTruthy();
        expect(s.topRaider).toBeTruthy();
        expect(s.topDefender).toBeTruthy();
        expect(s.mvp).toBeTruthy();
      });
    });

    it("Patna Pirates won three consecutive seasons (3, 4, 5)", () => {
      const seasons3to5 = pklSeasons.filter((s) => [3, 4, 5].includes(s.season));
      expect(seasons3to5).toHaveLength(3);
      seasons3to5.forEach((s) => {
        expect(s.champion).toBe("Patna Pirates");
      });
    });
  });

  describe("pklChampions", () => {
    it("lists at least 6 distinct champions", () => {
      expect(pklChampions.length).toBeGreaterThanOrEqual(6);
    });

    it("Patna Pirates has 3 titles", () => {
      const patna = pklChampions.find((c) => c.team === "Patna Pirates");
      expect(patna).toBeTruthy();
      expect(patna.titles).toBe(3);
      expect(patna.seasonsWon).toEqual([2016, 2016, 2017]);
    });

    it("each champion's titles matches seasonsWon length", () => {
      pklChampions.forEach((c) => {
        expect(c.titles).toBe(c.seasonsWon.length);
      });
    });
  });

  describe("pklStarPlayers", () => {
    it("has at least 6 star players", () => {
      expect(pklStarPlayers.length).toBeGreaterThanOrEqual(6);
    });

    it("each player has bio, signature move, and career points", () => {
      pklStarPlayers.forEach((p) => {
        expect(p.id).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.nickname).toBeTruthy();
        expect(p.role).toBeTruthy();
        expect(p.team).toBeTruthy();
        expect(p.careerPoints).toBeGreaterThan(0);
        expect(p.signatureMove.length).toBeGreaterThan(10);
        expect(p.bio.length).toBeGreaterThan(50);
      });
    });

    it("includes Pardeep Narwal with the Dubki King nickname", () => {
      const pardeep = pklStarPlayers.find((p) => p.id === "pardeep-narwal");
      expect(pardeep).toBeTruthy();
      expect(pardeep.nickname).toContain("Dubki King");
    });
  });

  describe("pklVenues", () => {
    it("has at least 6 venues", () => {
      expect(pklVenues.length).toBeGreaterThanOrEqual(6);
    });

    it("each venue has capacity, hosted, and significance", () => {
      pklVenues.forEach((v) => {
        expect(v.id).toBeTruthy();
        expect(v.name).toBeTruthy();
        expect(v.city).toBeTruthy();
        expect(v.capacity).toBeGreaterThan(0);
        expect(v.hosted).toBeTruthy();
        expect(v.significance.length).toBeGreaterThan(20);
      });
    });

    it("includes NSCI Dome (the inaugural final venue)", () => {
      const nsci = pklVenues.find((v) => v.id === "nsci-dome");
      expect(nsci).toBeTruthy();
      expect(nsci.city).toContain("Mumbai");
    });
  });

  describe("pklRecords", () => {
    it("has at least 8 records across categories", () => {
      expect(pklRecords.length).toBeGreaterThanOrEqual(8);
    });

    it("covers Team, Raider, Defender, and Player categories", () => {
      const categories = new Set(pklRecords.map((r) => r.category));
      expect(categories.has("Team")).toBe(true);
      expect(categories.has("Raider")).toBe(true);
      expect(categories.has("Defender")).toBe(true);
      expect(categories.has("Player")).toBe(true);
    });

    it("each record has a holder and a value", () => {
      pklRecords.forEach((r) => {
        expect(r.id).toBeTruthy();
        expect(r.record).toBeTruthy();
        expect(r.holder).toBeTruthy();
        expect(r.value).toBeTruthy();
      });
    });

    it("includes the most-titles record held by Patna Pirates", () => {
      const titlesRecord = pklRecords.find((r) => r.id === "most-titles");
      expect(titlesRecord).toBeTruthy();
      expect(titlesRecord.holder).toBe("Patna Pirates");
      expect(titlesRecord.value).toContain("3");
    });
  });

  describe("pklQuizQuestions", () => {
    it("has exactly 5 questions", () => {
      expect(pklQuizQuestions.length).toBe(5);
    });

    it("each question has 4 options and a valid answer index", () => {
      pklQuizQuestions.forEach((q) => {
        expect(q.id).toBeGreaterThanOrEqual(1);
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.options).toHaveLength(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThanOrEqual(3);
        expect(q.explanation.length).toBeGreaterThan(20);
      });
    });
  });
});
