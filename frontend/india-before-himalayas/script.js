(function () {
    const stages = {
        gondwana: {
            title: "Gondwana India",
            desc: "India is joined to Africa, Madagascar, Antarctica, and Australia. A wide Tethys Ocean separates this southern cluster from Asia. No Himalaya exists.",
            map: "map-gondwana"
        },
        drift: {
            title: "Island continent",
            desc: "By about 80 Ma India lies roughly 6,400 km south of Asia and moves north at about 9–16 cm per year. Tethys crust sinks under Asia. India is an isolated island continent.",
            map: "map-drift"
        },
        collision: {
            title: "Collision",
            desc: "Around 55–50 Ma India meets Eurasia. Drift slows. Tethys closes along the Indus–Tsangpo suture. Neither continent can subduct, so crust begins to thicken.",
            map: "map-collision"
        },
        rise: {
            title: "Himalaya rises",
            desc: "Thrust sheets stack into Greater, Lesser, and Sub-Himalayan belts. Tibet thickens into a plateau. Miocene uplift builds high peaks and dumps Siwalik sediment into the foreland.",
            map: "map-rise"
        },
        present: {
            title: "Still converging",
            desc: "India still moves north at about 4–5 cm per year. The Himalaya and Tibetan Plateau keep rising. Earthquakes mark the Main Frontal Thrust at the Siwalik edge.",
            map: "map-present"
        }
    };

    const places = {
        spiti: {
            title: "Spiti Valley",
            desc: "Himachal Pradesh. Tethyan Himalayan sediments: marine limestone and ammonites now high in the range — seafloor from before the mountains existed.",
            lat: 32.226,
            lon: 78.072,
            bbox: [77.4, 31.8, 78.8, 32.6]
        },
        leh: {
            title: "Leh (Indus suture)",
            desc: "Ladakh. Near the Indus–Tsangpo suture where Tethys closed and Indian crust met the Kohistan–Ladakh arc and Asia.",
            lat: 34.1526,
            lon: 77.5771,
            bbox: [77.1, 33.9, 78.1, 34.4]
        },
        dehradun: {
            title: "Dehradun (Siwaliks)",
            desc: "Uttarakhand. Sub-Himalayan Siwalik foothills and foreland basin — eroded Himalayan sediment dumped after the range began to rise.",
            lat: 30.3165,
            lon: 78.0322,
            bbox: [77.6, 30.05, 78.5, 30.55]
        },
        kangchenjunga: {
            title: "Kangchenjunga",
            desc: "Sikkim–Nepal border. High Greater Himalayan crust stacked by collision. The peaks exist only because India is still underthrusting Eurasia.",
            lat: 27.7025,
            lon: 88.1475,
            bbox: [87.7, 27.4, 88.6, 28.0]
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

    function initTimeline() {
        const buttons = document.querySelectorAll(".timeline-btn");
        const titleEl = document.getElementById("stage-info-title");
        const descEl = document.getElementById("stage-info-desc");
        const maps = document.querySelectorAll(".paleomap");

        function showStage(key) {
            const stage = stages[key];
            if (!stage) {
                return;
            }
            titleEl.textContent = stage.title;
            descEl.textContent = stage.desc;
            maps.forEach(function (svg) {
                svg.classList.toggle("is-visible", svg.id === stage.map);
            });
            buttons.forEach(function (btn) {
                const active = btn.getAttribute("data-stage") === key;
                btn.classList.toggle("is-active", active);
                btn.setAttribute("aria-pressed", active ? "true" : "false");
            });
        }

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                showStage(btn.getAttribute("data-stage"));
            });
        });
    }

    function initMap() {
        const frame = document.getElementById("evidence-map");
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
        initTimeline();
        initMap();
    });
})();
