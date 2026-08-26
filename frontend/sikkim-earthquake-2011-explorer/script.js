(function () {
    const places = {
        epicentre: {
            title: "Epicentre",
            desc: "27.723°N, 88.064°E — about 68 km northwest of Gangtok, in the Kanchenjunga Conservation Area on the India–Nepal border. USGS depth 19.7 km.",
            lat: 27.723,
            lon: 88.064,
            bbox: [87.4, 27.05, 89.05, 28.15]
        },
        gangtok: {
            title: "Gangtok",
            desc: "Capital of Sikkim, about 68 km southeast of the epicentre. Offices and hospitals were left unusable; several buildings collapsed. MMI around VI.",
            lat: 27.3389,
            lon: 88.6065,
            bbox: [88.35, 27.2, 88.85, 27.48]
        },
        mangan: {
            title: "Mangan",
            desc: "North Sikkim headquarters among the areas worst affected by shaking and landslides. NRSC mapping showed dense new slides around Mangan.",
            lat: 27.509,
            lon: 88.527,
            bbox: [88.3, 27.38, 88.75, 27.65]
        },
        chungthang: {
            title: "Chungthang",
            desc: "North Sikkim town on the Teesta. The highway from Gangtok was blocked by many landslides. Relief camps and a gurdwara langar sheltered labourers here.",
            lat: 27.604,
            lon: 88.645,
            bbox: [88.4, 27.48, 88.9, 27.75]
        },
        siliguri: {
            title: "Siliguri",
            desc: "West Bengal gateway to Sikkim. NH-31A from Siliguri to Gangtok was the critical access route; a local substation outage cut power in adjoining hill districts.",
            lat: 26.727,
            lon: 88.395,
            bbox: [88.15, 26.55, 88.65, 26.9]
        },
        taplejung: {
            title: "Taplejung (Nepal)",
            desc: "Nepalese district on the far side of the border epicentral region. Eastern Nepal saw damaged homes and monsoon mudslides; Kathmandu had limited damage but some fatalities.",
            lat: 27.35,
            lon: 87.67,
            bbox: [87.35, 27.15, 88.05, 27.6]
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
        const frame = document.getElementById("eq-map");
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
