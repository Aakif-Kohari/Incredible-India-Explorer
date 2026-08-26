(function () {
    const places = {
        lhonak: {
            title: "South Lhonak Lake",
            desc: "27.947°N, 88.332°E, about 5,200 m. Moraine-dammed lake in far northwestern Sikkim. The 3 October 2023 slope collapse and dam breach started here.",
            lat: 27.94748,
            lon: 88.33154,
            bbox: [88.15, 27.75, 88.52, 28.05]
        },
        chungthang: {
            title: "Chungthang",
            desc: "Confluence of the Lachen and Lachung rivers that form the Teesta. The 1,200 MW Teesta III dam here was destroyed around midnight on 4 October 2023.",
            lat: 27.604,
            lon: 88.645,
            bbox: [88.4, 27.48, 88.9, 27.75]
        },
        dikchu: {
            title: "Dikchu",
            desc: "Teesta cascade town downstream of Chungthang. Dam-gate orders arrived around 02:00 IST on 4 October, after the flood had already reached the site.",
            lat: 27.402,
            lon: 88.523,
            bbox: [88.3, 27.28, 88.75, 27.52]
        },
        singtam: {
            title: "Singtam",
            desc: "East Sikkim town on the Teesta that was heavily flooded. Water levels downstream rose by about 4.5–6 m after the Chungthang dam failed.",
            lat: 27.234,
            lon: 88.497,
            bbox: [88.32, 27.12, 88.7, 27.36]
        },
        rangpo: {
            title: "Rangpo",
            desc: "Sikkim–West Bengal gateway town on the Teesta. The flood damaged the settlement and the NH-10 corridor that links Gangtok to the plains.",
            lat: 27.177,
            lon: 88.533,
            bbox: [88.35, 27.06, 88.72, 27.3]
        },
        "teesta-bazaar": {
            title: "Teesta Bazaar",
            desc: "West Bengal hill settlement on the Teesta below Kalimpong. Among the most damaged riverside towns as the flood continued toward Jalpaiguri and Bangladesh.",
            lat: 27.059,
            lon: 88.428,
            bbox: [88.22, 26.94, 88.62, 27.18]
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
        const frame = document.getElementById("glof-map");
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
