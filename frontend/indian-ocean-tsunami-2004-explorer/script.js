(function () {
    const places = {
        epicentre: {
            title: "Epicentre",
            desc: "3.316°N, 95.854°E — off the west coast of northern Sumatra, Indonesia. The Mw 9.1 megathrust rupture ran roughly 1,300 km northward toward the Andaman Islands and lasted about eight minutes.",
            lat: 3.316,
            lon: 95.854,
            bbox: [1.5, 1.5, 7.5, 7.0]
        },
        portblair: {
            title: "Port Blair (Andaman)",
            desc: "Capital of the Andaman & Nicobar Islands, among the closest Indian soil to the rupture. Waves struck within tens of minutes; jetties, homes, and military facilities were damaged and about 1,310 islanders were killed or left missing.",
            lat: 11.623,
            lon: 92.726,
            bbox: [10.4, 11.0, 12.8, 12.3]
        },
        carnicobar: {
            title: "Car Nicobar",
            desc: "Island group nearest the earthquake zone in Indian territory. Low-lying villages were inundated or swept away, the airbase was devastated, and some islands subsided permanently after the rupture.",
            lat: 9.167,
            lon: 92.75,
            bbox: [8.0, 8.5, 10.3, 9.9]
        },
        nagapattinam: {
            title: "Nagapattinam (Tamil Nadu)",
            desc: "The worst-hit district on India's mainland — around 6,065 of Tamil Nadu's roughly 7,995 deaths occurred here, mostly in fishing hamlets where waves arrived mid-morning on a holiday.",
            lat: 10.767,
            lon: 79.84,
            bbox: [9.6, 10.2, 11.9, 11.4]
        },
        chennai: {
            title: "Chennai & Cuddalore coast",
            desc: "Waves reached the northern Tamil Nadu coast around 08:50–09:05 IST, sweeping across beaches and roads. Marina beach in Chennai and low-lying Cuddalore saw heavy loss of life.",
            lat: 12.5,
            lon: 80.15,
            bbox: [11.2, 79.2, 13.8, 81.1]
        },
        kochi: {
            title: "Kerala coast",
            desc: "Around 09:30–10:00 IST the tsunami reached Kerala's shoreline near Kochi and Kollam, killing about 177 people and damaging harbours and backwater settlements.",
            lat: 9.931,
            lon: 76.267,
            bbox: [8.7, 75.7, 11.0, 77.1]
        }
    };

    function mapSrc(place) {
        const box = place.bbox.join(",");
        return "https://www.openstreetmap.org/export/embed.html?bbox=" +
            encodeURIComponent(box) +
            "&layer=mapnik&marker=" +
            encodeURIComponent(place.lat + "," + place.lon);
    }

    function initThemeToggle() {
        const button = document.getElementById("theme-toggle");
        const root = document.documentElement;

        function applyTheme(theme) {
            const isLight = theme === "light";
            root.classList.toggle("light-theme", isLight);
            document.body.classList.toggle("light-theme", isLight);
            button.textContent = isLight ? "🌙" : "☀️";
            button.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
        }

        applyTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

        button.addEventListener("click", function () {
            const next = document.body.classList.contains("light-theme") ? "dark" : "light";
            localStorage.setItem("theme", next);
            applyTheme(next);
        });
    }

    function initMap() {
        const frame = document.getElementById("tsunami-map");
        const titleEl = document.getElementById("map-info-title");
        const descEl = document.getElementById("map-info-desc");
        const buttons = document.querySelectorAll(".map-btn");

        function showPlace(key) {
            const place = places[key];
            if (!place) {
                return;
            }
            frame.src = mapSrc(place);
            titleEl.textContent = place.title;
            descEl.textContent = place.desc;
            buttons.forEach(function (btn) {
                const active = btn.getAttribute("data-place") === key;
                btn.classList.toggle("is-active", active);
                btn.setAttribute("aria-pressed", active ? "true" : "false");
            });
        }

        buttons.forEach(function (btn) {
            btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
            btn.addEventListener("click", function () {
                showPlace(btn.getAttribute("data-place"));
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initThemeToggle();
        initMap();
    });
})();
