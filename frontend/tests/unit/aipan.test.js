import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const page = readFileSync(resolve(process.cwd(), "frontend/aipan/index.html"), "utf8");
const script = readFileSync(resolve(process.cwd(), "frontend/aipan/aipan.js"), "utf8");

describe("Aipan cultural explorer", () => {
    it("documents the required Aipan topics", () => {
        expect(page).toContain("Aipan");
        expect(page).toContain("Kumaon");
        expect(page).toContain("Uttarakhand");
        expect(page).toContain("geru");
        expect(page).toContain("rice paste");
        expect(page).toContain("Cultural");
        expect(page).toContain("When it appears");
    });

    it("includes an interactive motif gallery with filters", () => {
        expect(page).toContain('id="motif-grid"');
        expect(page).toContain('data-category="festivals');
        expect(page).toContain('data-category="life');
        expect(page).toContain('data-category="worship');
        expect(script).toContain("setFilter");
        expect(script).toContain("addEventListener");
    });

    it("includes visible image attribution and responsive assets", () => {
        expect(page).toContain("Wikimedia Commons");
        expect(page).toContain("CC BY-SA 4.0");
        expect(page).toContain('loading="lazy"');
        expect(page).toContain('viewport');
    });
});
