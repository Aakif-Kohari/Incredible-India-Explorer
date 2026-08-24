import { describe, expect, test, beforeEach } from "vitest";

import {
  TRAVEL_PROTECTION_DESTINATIONS,
  BASE_CHECKLIST,
  TRIP_TYPE_RECOMMENDATIONS
} from "../../frontend/travel-protection/travel-protection-data.js";

import {
  getRiskLabel,
  getRiskClass,
  calculateOverallRisk,
  generateRecommendations,
  saveChecklistState,
  loadChecklistState,
  resetChecklistState
} from "../../frontend/travel-protection/travel-protection.js";


describe("Smart Travel Protection", () => {

  /* =======================================================
     RISK CLASSIFICATION
     ======================================================= */

  describe("risk classification", () => {

    test("classifies low risk correctly", () => {
      expect(getRiskLabel(1)).toBe("Low");
      expect(getRiskClass(1)).toBe("low");
    });


    test("classifies moderate risk correctly", () => {
      expect(getRiskLabel(2)).toBe("Moderate");
      expect(getRiskClass(2)).toBe("moderate");
    });


    test("classifies high risk correctly", () => {
      expect(getRiskLabel(3)).toBe("High");
      expect(getRiskClass(3)).toBe("high");
    });


    test("handles risk values above high", () => {
      expect(getRiskLabel(5)).toBe("High");
      expect(getRiskClass(5)).toBe("high");
    });

  });


  /* =======================================================
     OVERALL RISK
     ======================================================= */

  describe("overall risk calculation", () => {

    test("returns zero when destination is missing", () => {
      expect(
        calculateOverallRisk(null, "winter")
      ).toBe(0);
    });


    test("calculates a valid risk for Delhi", () => {
      const destination =
        TRAVEL_PROTECTION_DESTINATIONS.delhi;

      const result =
        calculateOverallRisk(
          destination,
          "winter"
        );

      expect([1, 2, 3]).toContain(result);
    });


    test("high-risk seasonal conditions can increase preparation level", () => {
      const destination =
        TRAVEL_PROTECTION_DESTINATIONS.himachal;

      const winterRisk =
        calculateOverallRisk(
          destination,
          "winter"
        );

      const summerRisk =
        calculateOverallRisk(
          destination,
          "summer"
        );

      expect(winterRisk).toBeGreaterThanOrEqual(
        summerRisk
      );
    });


    test("returns only supported risk levels", () => {
      Object.values(
        TRAVEL_PROTECTION_DESTINATIONS
      ).forEach((destination) => {

        const risk =
          calculateOverallRisk(
            destination,
            "monsoon"
          );

        expect([1, 2, 3]).toContain(risk);
      });

    });

  });


  /* =======================================================
     RECOMMENDATIONS
     ======================================================= */

  describe("recommendation engine", () => {

    test("returns recommendations for leisure travel", () => {
      const destination =
        TRAVEL_PROTECTION_DESTINATIONS.goa;

      const recommendations =
        generateRecommendations(
          destination,
          "leisure",
          "winter"
        );

      expect(recommendations.length)
        .toBeGreaterThan(0);
    });


    test("returns adventure-specific recommendations", () => {
      const destination =
        TRAVEL_PROTECTION_DESTINATIONS.himachal;

      const recommendations =
        generateRecommendations(
          destination,
          "adventure",
          "winter"
        );

      const titles =
        recommendations.map(
          (item) => item.title
        );

      expect(
        titles
      ).toContain(
        "Check activity coverage"
      );
    });


    test("returns family-specific recommendations", () => {
      const destination =
        TRAVEL_PROTECTION_DESTINATIONS.kerala;

      const recommendations =
        generateRecommendations(
          destination,
          "family",
          "summer"
        );

      const categories =
        recommendations.map(
          (item) => item.category
        );

      expect(categories)
        .toContain("Family");
    });


    test("adds monsoon guidance during monsoon travel", () => {
      const destination =
        TRAVEL_PROTECTION_DESTINATIONS.goa;

      const recommendations =
        generateRecommendations(
          destination,
          "leisure",
          "monsoon"
        );

      expect(
        recommendations.some(
          (item) =>
            item.category === "Season"
        )
      ).toBe(true);
    });


    test("returns an empty array without destination", () => {
      expect(
        generateRecommendations(
          null,
          "leisure",
          "winter"
        )
      ).toEqual([]);
    });

  });


  /* =======================================================
     DATA VALIDATION
     ======================================================= */

  describe("destination data", () => {

    test("every destination contains all risk categories", () => {

      Object.values(
        TRAVEL_PROTECTION_DESTINATIONS
      ).forEach((destination) => {

        expect(destination.risks)
          .toHaveProperty("weather");

        expect(destination.risks)
          .toHaveProperty("health");

        expect(destination.risks)
          .toHaveProperty("transportation");

        expect(destination.risks)
          .toHaveProperty("safety");

      });

    });


    test("risk values are between 1 and 3", () => {

      Object.values(
        TRAVEL_PROTECTION_DESTINATIONS
      ).forEach((destination) => {

        Object.values(
          destination.risks
        ).forEach((risk) => {

          expect(risk.level)
            .toBeGreaterThanOrEqual(1);

          expect(risk.level)
            .toBeLessThanOrEqual(3);

        });

      });

    });


    test("every trip type has recommendations", () => {

      [
        "leisure",
        "adventure",
        "family",
        "business",
        "solo"
      ].forEach((tripType) => {

        expect(
          TRIP_TYPE_RECOMMENDATIONS[
            tripType
          ].length
        ).toBeGreaterThan(0);

      });

    });


    test("checklist contains required preparation categories", () => {

      const categories =
        BASE_CHECKLIST.map(
          (item) => item.category
        );

      expect(categories)
        .toContain("Documents");

      expect(categories)
        .toContain("Emergency");

      expect(categories)
        .toContain("Health");

      expect(categories)
        .toContain("Protection");

    });

  });


  /* =======================================================
     LOCAL STORAGE
     ======================================================= */

  describe("checklist persistence", () => {

    beforeEach(() => {
      localStorage.clear();
    });


    test("saves and loads checklist state", () => {

      const state = {
        documents: true,
        medical: true
      };

      saveChecklistState(state);

      expect(
        loadChecklistState()
      ).toEqual(state);

    });


    test("returns empty object when no checklist exists", () => {

      expect(
        loadChecklistState()
      ).toEqual({});

    });


    test("resets checklist state", () => {

      saveChecklistState({
        documents: true
      });

      resetChecklistState();

      expect(
        loadChecklistState()
      ).toEqual({});

    });

  });

});