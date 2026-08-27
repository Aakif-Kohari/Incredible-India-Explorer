(function () {
    const places = {
        akal: {
            title: "Akal Wood Fossil Park",
            desc: "Jaisalmer district, Rajasthan. Lower Jurassic petrified trunks in the Lathi Formation, about 17 km from Jaisalmer town.",
            lat: 26.825,
            lon: 71.04,
            bbox: [70.3, 26.3, 71.8, 27.4]
        },
        tiruvakkarai: {
            title: "Tiruvakkarai Fossil Wood Park",
            desc: "Villupuram district, Tamil Nadu. Miocene–Pliocene silicified trunks in Cuddalore Sandstone; a GSI monument since 1951.",
            lat: 12.01917,
            lon: 79.65333,
            bbox: [78.9, 11.4, 80.4, 12.6]
        },
        sathanur: {
            title: "Sathanur Fossil Wood Park",
            desc: "Perambalur district, Tamil Nadu. Late Cretaceous gymnosperm trunk about 18 m long, with similar logs in nearby villages.",
            lat: 11.161139,
            lon: 78.976417,
            bbox: [78.2, 10.6, 79.7, 11.7]
        },
        ghughua: {
            title: "Ghughua Fossil Park",
            desc: "Dindori district, Madhya Pradesh. Late Cretaceous Deccan intertrappean plants: woods, fruits, and leaves in a 1983 national park.",
            lat: 23.12,
            lon: 80.62,
            bbox: [79.8, 22.5, 81.4, 23.7]
        },
        rajmahal: {
            title: "Rajmahal Hills (Mandro)",
            desc: "Sahibganj district, Jharkhand. Jurassic–Cretaceous intertrappean beds with the Ptilophyllum flora between Rajmahal lava flows.",
            lat: 25.15,
            lon: 87.51,
            bbox: [86.7, 24.5, 88.3, 25.8]
        },
        raniganj: {
            title: "Raniganj coalfield",
            desc: "Paschim Bardhaman, West Bengal. Permian Gondwana measures preserving Glossopteris swamp-forest plants as coal and impressions.",
            lat: 23.616,
            lon: 87.125,
            bbox: [86.4, 23.1, 87.9, 24.1]
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
        const frame = document.getElementById("fossil-map");
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
