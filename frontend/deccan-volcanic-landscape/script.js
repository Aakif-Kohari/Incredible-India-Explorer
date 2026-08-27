(function () {
    const places = {
        mahabaleshwar: {
            title: "Mahabaleshwar",
            desc: "Western Ghats, Maharashtra. Type area for the upper Wai Subgroup. Stepped trap benches and a thick flood-basalt section near the crest of the plateau.",
            lat: 17.9307,
            lon: 73.6477,
            bbox: [73.2, 17.5, 74.1, 18.3]
        },
        kalsubai: {
            title: "Kalsubai",
            desc: "Highest peak in Maharashtra (1,646 m), in the Kalsubai Subgroup at the base of the Western Ghats lava pile north of Nashik.",
            lat: 19.6013,
            lon: 73.709,
            bbox: [73.3, 19.3, 74.1, 19.9]
        },
        gilbert: {
            title: "Gilbert Hill",
            desc: "Andheri, Mumbai. A ~61 m columnar-basalt monolith in Deccan lava, a Grade II heritage site showing hexagonal jointing.",
            lat: 19.1306,
            lon: 72.842,
            bbox: [72.7, 19.0, 73.0, 19.26]
        },
        lonar: {
            title: "Lonar crater",
            desc: "Buldhana district, Maharashtra. A meteorite crater in Deccan flood basalt, with a saline lake on the floor. Impact age estimates vary (tens of thousands of years).",
            lat: 19.9767,
            lon: 76.5083,
            bbox: [76.2, 19.75, 76.8, 20.2]
        },
        jabalpur: {
            title: "Jabalpur (Lameta)",
            desc: "Madhya Pradesh. Infratrappean Lameta beds along the Narmada: Maastrichtian dinosaurs, eggs, and lake-river fossils beneath and beside Deccan lava.",
            lat: 23.101,
            lon: 79.932,
            bbox: [79.5, 22.85, 80.35, 23.35]
        },
        rajahmundry: {
            title: "Rajahmundry Traps",
            desc: "East Godavari, Andhra Pradesh. Distal eastern Deccan flows correlated with the Wai Subgroup, showing lava reached the Bay of Bengal margin.",
            lat: 17.0,
            lon: 81.78,
            bbox: [81.3, 16.6, 82.3, 17.4]
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
        const frame = document.getElementById("deccan-map");
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
