(function () {
    const places = {
        epicenter: {
            title: "Chamoli & Pipalkoti Epicentral Tract",
            desc: "30.408°N, 79.416°E — Rupture zone along the Alaknanda River Valley. MMI VIII intensity with widespread destruction of stone-and-mud dwellings and heavy casualties.",
            lat: 30.408,
            lon: 79.416,
            bbox: [79.2, 30.25, 79.6, 30.55]
        },
        gopeshwar: {
            title: "Gopeshwar District Headquarters",
            desc: "District capital where government administrative complexes, hospital wards, and residential colonies experienced structural failures and cracked columns.",
            lat: 30.419,
            lon: 79.331,
            bbox: [79.28, 30.38, 79.38, 30.46]
        },
        rudraprayag: {
            title: "Rudraprayag Valley (Mandakini Confluence)",
            desc: "Severe secondary damage zone. Rockfalls collapsed riverbank buildings and blocked the pilgrimage highway to Kedarnath.",
            lat: 30.285,
            lon: 78.981,
            bbox: [78.9, 30.22, 79.06, 30.35]
        },
        joshimath: {
            title: "Joshimath & Upper Alaknanda Slopes",
            desc: "High-altitude ancient transit town situated on ancient landslide debris; ground fissures opened along slopes and building foundations shifted.",
            lat: 30.556,
            lon: 79.566,
            bbox: [79.5, 30.5, 79.63, 30.62]
        },
        birahi: {
            title: "Birahi Ganga Landslides (Gohna Valley)",
            desc: "Steep gorge where massive rock avalanches severed highway connectivity and generated clouds of pulverized dust across the valley.",
            lat: 30.382,
            lon: 79.467,
            bbox: [79.4, 30.32, 79.54, 30.44]
        },
        dehradun: {
            title: "Dehradun (Emergency Response Base)",
            desc: "Regional administrative and military hub where the Indian Air Force and civil hospitals received airlifted critical casualties from high-altitude hill zones.",
            lat: 30.3165,
            lon: 78.0322,
            bbox: [77.9, 30.2, 78.18, 30.45]
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
                    feedback.innerHTML = "🎉 <strong>Correct!</strong> The Chamoli earthquake nucleated along a low-angle detachment associated with the Main Central Thrust (MCT) zone in the Garhwal Himalaya.";
                    feedback.style.color = "#059669";
                    feedback.style.backgroundColor = "rgba(5, 150, 105, 0.1)";
                    feedback.style.border = "1px solid rgba(5, 150, 105, 0.3)";
                } else {
                    feedback.innerHTML = "❌ <strong>Incorrect!</strong> The earthquake occurred along the detachment fault zone of the <strong>Main Central Thrust (MCT)</strong>.";
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
