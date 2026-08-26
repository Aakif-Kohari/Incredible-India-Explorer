/**
 * rukhmabai-raut-profile.test.js
 * Unit tests for the Rukhmabai Raut historical profile (Issue #3436).
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, "../../frontend/rukhmabai-raut-profile", file),
        "utf-8"
    );
}

describe("Rukhmabai Raut Profile — Page Structure & Content", () => {
    let html;

    beforeAll(() => {
        html = readFile("index.html");
    });

    it("contains the page title and meta description", () => {
        expect(html).toContain("Rukhmabai Raut");
        expect(html).toContain("The Doctor Who Challenged Child Marriage");
    });

    it("contains all required profile sections", () => {
        const requiredSections = [
            "early-life",
            "child-marriage-context",
            "legal-case",
            "public-debate",
            "medical-education",
            "medical-career",
            "social-reform-legacy",
            "timeline",
            "map",
            "sources"
        ];
        requiredSections.forEach((id) => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it("loads the stylesheet and script", () => {
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });

    it("contains the hero section with key biographical facts", () => {
        expect(html).toContain("1864");
        expect(html).toContain("Bombay");
        expect(html).toContain("Physician");
    });
});

describe("Rukhmabai Raut Profile — Script (script.js)", () => {
    let scriptContent;

    beforeAll(() => {
        scriptContent = readFile("script.js");
    });

    it("contains the timeline data with all major events", () => {
        expect(scriptContent).toContain("1864");
        expect(scriptContent).toContain("1875");
        expect(scriptContent).toContain("1885");
        expect(scriptContent).toContain("1891");
        expect(scriptContent).toContain("1894");
        expect(scriptContent).toContain("1955");
    });

    it("contains the locations data", () => {
        expect(scriptContent).toContain("Bombay (Mumbai)");
        expect(scriptContent).toContain("London");
        expect(scriptContent).toContain("Surat");
    });

    it("contains the sources data with URLs", () => {
        expect(scriptContent).toContain("RUKHMABAI_SOURCES");
        expect(scriptContent).toContain("ncbi.nlm.nih.gov");
        expect(scriptContent).toContain("Age of Consent Act");
    });

    it("renders timeline, locations, and sources dynamically", () => {
        expect(scriptContent).toContain("renderTimeline()");
        expect(scriptContent).toContain("renderLocations()");
        expect(scriptContent).toContain("renderSources()");
    });
});
