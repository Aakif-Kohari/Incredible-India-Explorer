import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, "../../frontend/bhrigu-lake-trek", file),
        "utf-8"
    );
}

describe("Bhrigu Lake Trek — Issue #3148", () => {
    let html;

    beforeAll(() => {
        html = readFile("index.html");
    });

    it("has a semantic page title and description", () => {
        expect(html).toContain("<title>Bhrigu Lake Trek");
        expect(html).toContain('name="description"');
        expect(html).toContain('lang="en"');
    });

    it("contains the required location information", () => {
        expect(html).toContain("Himachal Pradesh");
        expect(html).toContain("Kullu district");
        expect(html).toContain("Manali");
        expect(html).toContain("Gulaba");
    });

    it("documents difficulty, distance and duration", () => {
        expect(html).toContain("Moderate");
        expect(html).toContain("20–26 km");
        expect(html).toContain("3–4 day");
    });

    it("documents the best season", () => {
        expect(html).toContain("May to October");
        expect(html).toContain("Best season");
    });

    it("includes starting point and route itinerary", () => {
        expect(html).toContain("Starting point");
        expect(html).toContain("Gulaba");
        expect(html).toContain("Rauli Kholi");
        expect(html).toContain("Bhrigu Lake");
        expect(html).toContain("Day 3");
    });

    it("includes lake elevation and lake information", () => {
        expect(html).toContain("4,235 m");
        expect(html).toContain("4,235–4,300 m");
        expect(html).toContain("sacred alpine lake");
        expect(html).toContain("Maharishi Bhrigu");
    });

    it("contains route highlights", () => {
        expect(html).toContain("Rapid landscape change");
        expect(html).toContain("Himalayan panoramas");
        expect(html).toContain("Seasonal snow");
        expect(html).toContain("Sacred landscape");
        expect(html).toContain("Wide open meadows");
    });

    it("contains nearby attractions", () => {
        expect(html).toContain("Vashisht Temple & Hot Springs");
        expect(html).toContain("Rohtang Pass");
        expect(html).toContain("Solang Valley");
        expect(html).toContain("Naggar");
        expect(html).toContain("Hadimba Temple");
        expect(html).toContain("Manali Old Town");
    });

    it("contains an image gallery", () => {
        expect(html).toContain('id="gallery"');
        expect(html).toContain('class="gallery-grid"');
        expect(html).toContain("Bhrigu_lake_Kullu.JPG");
        expect(html).toContain("Adventure_to_Bhrigu.jpg");
        expect(html).toContain("The_mighty_himalayas.jpg");
    });

    it("credits gallery images", () => {
        expect(html).toContain("Kartik.a.rokde");
        expect(html).toContain("Karan Manocha");
        expect(html).toContain("Vidhu Krishna");
        expect(html).toContain("Ahmad Faiz Mustafa");
        expect(html).toContain("Source & license");
        expect(html).toContain("CC BY 4.0");
    });

    it("contains an interactive map section", () => {
        expect(html).toContain('id="map"');
        expect(html).toContain('id="trek-map"');
        expect(html).toContain('data-map-view="lake"');
        expect(html).toContain('data-map-view="gulaba"');
        expect(html).toContain('data-map-view="manali"');
        expect(html).toContain("OpenStreetMap");
    });

    it("includes responsible trekking guidance", () => {
        expect(html).toContain("Acclimatise");
        expect(html).toContain("Check access");
        expect(html).toContain("Carry layers");
        expect(html).toContain("Leave no trace");
        expect(html).toContain("Use local expertise");
        expect(html).toContain("Respect sacred places");
    });

    it("provides authoritative information sources", () => {
        expect(html).toContain("Incredible India");
        expect(html).toContain("Himachal Tourism");
        expect(html).toContain("Himachal Pradesh Trekking Management System");
        expect(html).toContain("Wikimedia Commons");
    });

    it("has accessibility affordances", () => {
        expect(html).toContain('class="skip-link"');
        expect(html).toContain('aria-labelledby="page-title"');
        expect(html).toContain('aria-label="Primary navigation"');
        expect(html).toContain('aria-label="Map showing Bhrigu Lake and nearby trek points"');
        expect(html).toContain('loading="lazy"');
    });
});

describe("Bhrigu Lake Trek — CSS and JavaScript", () => {
    it("defines responsive layout systems", () => {
        const css = readFile("style.css");
        expect(css).toContain(".facts-grid");
        expect(css).toContain(".route-layout");
        expect(css).toContain(".gallery-grid");
        expect(css).toContain("@media (max-width: 900px)");
        expect(css).toContain("@media (max-width: 640px)");
    });

    it("defines accessibility and reduced-motion behavior", () => {
        const css = readFile("style.css");
        expect(css).toContain(".skip-link");
        expect(css).toContain(":focus-visible");
        expect(css).toContain("prefers-reduced-motion");
    });

    it("defines gallery, map, navigation and safety components", () => {
        const css = readFile("style.css");
        expect(css).toContain(".gallery-card");
        expect(css).toContain(".lightbox");
        expect(css).toContain(".map-toolbar");
        expect(css).toContain(".map-control");
        expect(css).toContain(".safety-grid");
        expect(css).toContain(".sources-list");
    });

    it("initializes all page interactions", () => {
        const js = readFile("script.js");
        expect(js).toContain("initNavigation");
        expect(js).toContain("initSmoothScrollButtons");
        expect(js).toContain("initGallery");
        expect(js).toContain("initMap");
        expect(js).toContain("initImageFallbacks");
    });

    it("contains the map view configuration", () => {
        const js = readFile("script.js");
        expect(js).toContain("Bhrigu Lake");
        expect(js).toContain("Gulaba");
        expect(js).toContain("Manali");
        expect(js).toContain("Vashisht");
        expect(js).toContain("buildOpenStreetMapEmbed");
    });

    it("implements the image lightbox", () => {
        const js = readFile("script.js");
        expect(js).toContain('data-lightbox');
        expect(js).toContain("showModal");
        expect(js).toContain("lightbox-caption");
        expect(js).toContain("lightbox-source");
        expect(js).toContain("modal-open");
    });

    it("supports mobile navigation", () => {
        const js = readFile("script.js");
        expect(js).toContain("menu-toggle");
        expect(js).toContain("aria-expanded");
        expect(js).toContain("primary-nav");
    });
});
