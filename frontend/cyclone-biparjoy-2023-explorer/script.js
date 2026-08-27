(function () {
    const places = {
        genesis: {
            title: "Cyclogenesis over South-Eastern Arabian Sea",
            desc: "12.1°N, 66.2°E — Formed as Depression on 6 June 2023 over 31°C waters, initiating a record 315-hour lifespan across the Arabian Sea basin.",
            lat: 12.1,
            lon: 66.2,
            bbox: [64.0, 10.5, 68.5, 14.0]
        },
        peak: {
            title: "Peak Intensity (East-Central Arabian Sea)",
            desc: "Attained Extremely Severe Cyclonic Storm intensity with 165 km/h sustained winds and 958 hPa central pressure before beginning its recurvature toward Gujarat.",
            lat: 17.5,
            lon: 67.4,
            bbox: [65.5, 16.0, 69.5, 19.0]
        },
        landfall: {
            title: "Landfall at Jakhau Port (Kutch Coast)",
            desc: "23.23°N, 68.61°E — Slammed ashore on the night of 15 June 2023 with 125–140 km/h winds, bringing 3-meter surges and heavy seawater intrusion into salt flats.",
            lat: 23.23,
            lon: 68.61,
            bbox: [68.3, 23.0, 68.9, 23.45]
        },
        mandvi: {
            title: "Mandvi Beach & Coastal Port (Kutch)",
            desc: "Historic port and beach resort experiencing violent 120 km/h gales, high wave action, and temporary disruption of traditional wooden shipbuilding docks.",
            lat: 22.833,
            lon: 69.355,
            bbox: [69.15, 22.7, 69.55, 23.0]
        },
        dwarka: {
            title: "Devbhumi Dwarka (Saurashtra Coast)",
            desc: "Coastal temple city battered by torrential downpours, massive ocean swells at Gomti Ghat, and preemptive shutdown of pilgrimage visits.",
            lat: 22.244,
            lon: 68.968,
            bbox: [68.8, 22.1, 69.15, 22.4]
        },
        rajasthan: {
            title: "Desert Deluge in Southwest Rajasthan (Jalore/Barmer)",
            desc: "Decayed into a deep depression, dropping over 400 mm of historic rainfall across the Thar Desert and causing unprecedented flash floods in normally dry river basins.",
            lat: 25.344,
            lon: 72.615,
            bbox: [71.8, 24.8, 73.4, 26.0]
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

        if (!button) return;

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

        if (!frame || !titleEl || !descEl || !buttons.length) return;

        function showPlace(key) {
            const place = places[key];
            if (!place) return;
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

    function initQuiz() {
        const optBtns = document.querySelectorAll(".quiz-opt-btn");
        const feedback = document.getElementById("quizFeedback");

        if (!optBtns.length || !feedback) return;

        optBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const isCorrect = btn.getAttribute("data-correct") === "true";

                optBtns.forEach(b => {
                    b.disabled = true;
                    if (b.getAttribute("data-correct") === "true") {
                        b.classList.add("correct");
                    } else {
                        b.classList.add("wrong");
                    }
                });

                feedback.style.display = "block";
                if (isCorrect) {
                    feedback.innerHTML = "🎉 <strong>Correct!</strong> Cyclone Biparjoy made landfall near Jakhau Port in Kutch district, Gujarat on the night of 15 June 2023.";
                    feedback.style.color = "#059669";
                    feedback.style.backgroundColor = "rgba(5, 150, 105, 0.1)";
                    feedback.style.border = "1px solid rgba(5, 150, 105, 0.3)";
                } else {
                    feedback.innerHTML = "❌ <strong>Incorrect!</strong> Biparjoy crossed the coast near <strong>Jakhau Port in Kutch (Gujarat)</strong>.";
                    feedback.style.color = "#dc2626";
                    feedback.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                    feedback.style.border = "1px solid rgba(220, 38, 38, 0.3)";
                }
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initThemeToggle();
        initMap();
        initQuiz();
    });
})();
