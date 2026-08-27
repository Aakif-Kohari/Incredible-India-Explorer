(function () {
    const places = {
        genesis: {
            title: "Tropical Cyclogenesis (Lakshadweep Basin)",
            desc: "10.57°N, 72.64°E — Formed as Depression ARB 01 on 14 May 2021 over exceptionally warm sea surface temperatures (30°C+), initiating rapid intensification.",
            lat: 10.57,
            lon: 72.64,
            bbox: [71.5, 9.5, 74.5, 12.0]
        },
        kochi: {
            title: "Kerala & Lakshadweep Coastal Inundation",
            desc: "High storm swells overtopped seawalls in Chellanam and Valiyathura, causing extensive coastal erosion, localized flooding, and power blackouts.",
            lat: 9.9312,
            lon: 76.2673,
            bbox: [76.0, 9.7, 76.5, 10.15]
        },
        goa: {
            title: "Goa Coast & Western Ghats Gales",
            desc: "Winds of 100+ km/h snapped high-tension power transmission lines, damaged heritage structures, and uprooted over 1,000 trees across Goa.",
            lat: 15.2993,
            lon: 74.1240,
            bbox: [73.7, 14.9, 74.4, 15.7]
        },
        mumbai: {
            title: "Mumbai & Bombay High (Barge P305 Incident)",
            desc: "Record 214 mm rainfall in 24 hours in Mumbai with 114 km/h gusts. Offshore, accommodation barge P305 sank 35 nm off the coast, triggering a massive Indian Navy rescue mission.",
            lat: 18.922,
            lon: 72.834,
            bbox: [72.4, 18.5, 73.2, 19.3]
        },
        landfall: {
            title: "Saurashtra Landfall (Una & Jafrabad)",
            desc: "Eye made landfall on 17 May with 185 km/h sustained winds and 220 km/h gusts. Over 70,000 electric poles flattened and 4-meter surges swept into fishing ports.",
            lat: 20.822,
            lon: 71.042,
            bbox: [70.7, 20.5, 71.4, 21.1]
        },
        gir: {
            title: "Gir Forest & Amreli Agriculture District",
            desc: "Extensive tree falls across Asiatic Lion habitats and catastrophic destruction of Kesar mango orchards and cash crops across Amreli, Gir Somnath, and Bhavnagar.",
            lat: 21.144,
            lon: 70.802,
            bbox: [70.4, 20.9, 71.2, 21.5]
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
                    feedback.innerHTML = "🎉 <strong>Correct!</strong> Cyclone Tauktae made landfall on 17 May 2021 as an Extremely Severe Cyclonic Storm between Una and Jafrabad on the Saurashtra coast of Gujarat.";
                    feedback.style.color = "#059669";
                    feedback.style.backgroundColor = "rgba(5, 150, 105, 0.1)";
                    feedback.style.border = "1px solid rgba(5, 150, 105, 0.3)";
                } else {
                    feedback.innerHTML = "❌ <strong>Incorrect!</strong> Tauktae slammed ashore on the <strong>Saurashtra coast between Una and Jafrabad (Gujarat)</strong>.";
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
