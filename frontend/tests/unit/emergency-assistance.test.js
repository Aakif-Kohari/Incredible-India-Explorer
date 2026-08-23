import { describe, expect, it, beforeEach, vi } from "vitest";


describe("Smart Emergency Assistance", () => {

    beforeEach(() => {

        vi.restoreAllMocks();

    });


    it("contains the national emergency number 112", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency-data.js",
                "utf8"
            );

        expect(file).toContain(
            'number: "112"'
        );

    });


    it("contains ambulance emergency assistance", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency-data.js",
                "utf8"
            );

        expect(file).toContain(
            "Ambulance"
        );

    });


    it("contains police emergency assistance", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency-data.js",
                "utf8"
            );

        expect(file).toContain(
            "Police"
        );

    });


    it("contains fire emergency assistance", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency-data.js",
                "utf8"
            );

        expect(file).toContain(
            "Fire Services"
        );

    });


    it("contains nearby hospital search functionality", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency.js",
                "utf8"
            );

        expect(file).toContain(
            "hospitals near me"
        );

    });


    it("uses the browser geolocation API", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency.js",
                "utf8"
            );

        expect(file).toContain(
            "navigator.geolocation"
        );

    });


    it("persists the last known emergency location", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency.js",
                "utf8"
            );

        expect(file).toContain(
            "localStorage"
        );

    });


    it("provides Google Maps based facility discovery", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency.js",
                "utf8"
            );

        expect(file).toContain(
            "google.com/maps"
        );

    });


    it("contains the emergency assistance page", async () => {

        const fs =
            await import("node:fs/promises");

        const file =
            await fs.readFile(
                "frontend/emergency-assistance/emergency.html",
                "utf8"
            );

        expect(file).toContain(
            "Emergency Assistance"
        );

        expect(file).toContain(
            "OPEN SOS"
        );

    });

});