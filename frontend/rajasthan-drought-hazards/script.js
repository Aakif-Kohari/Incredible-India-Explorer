(function () {
    const places = {
        jaisalmer: {
            title: "Jaisalmer",
            desc: "Northwestern Thar. Mean rainfall near 100 mm in the driest tracts. Home of khadin farming and among the most frequently drought-hit districts in the state.",
            lat: 26.9157,
            lon: 70.9083,
            bbox: [69.8, 26.3, 72.2, 27.6]
        },
        barmer: {
            title: "Barmer",
            desc: "Southern Thar district with highly erratic monsoon rain. Recurrent severe drought; livestock and rainfed millets dominate livelihoods.",
            lat: 25.752,
            lon: 71.396,
            bbox: [70.4, 25.2, 72.6, 26.4]
        },
        jodhpur: {
            title: "Jodhpur",
            desc: "Arid west-central hub and home of CAZRI. In 2002 the city recorded about 91 mm of rain for the year — roughly a quarter of its long-term average.",
            lat: 26.2389,
            lon: 73.0243,
            bbox: [72.2, 25.7, 74.0, 26.8]
        },
        bikaner: {
            title: "Bikaner",
            desc: "Northern desert district. Western parts remain among SPI drought hotspots; the Indira Gandhi Canal has expanded irrigation in some tracts without removing monsoon risk.",
            lat: 28.0229,
            lon: 73.3119,
            bbox: [72.3, 27.4, 74.4, 28.6]
        },
        jaipur: {
            title: "Jaipur",
            desc: "East-central Rajasthan, semi-arid rather than true desert. Still appears on state drought-hazard maps when the monsoon is delayed or patchy.",
            lat: 26.9124,
            lon: 75.7873,
            bbox: [75.1, 26.4, 76.5, 27.4]
        },
        jhalawar: {
            title: "Jhalawar",
            desc: "Southeastern Rajasthan, on the wetter side of the rainfall gradient (over 1,000 mm in a typical year). Contrast with Jaisalmer shows why drought is a western-state problem first.",
            lat: 24.596,
            lon: 76.161,
            bbox: [75.4, 24.1, 76.9, 25.1]
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
        const frame = document.getElementById("drought-map");
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
