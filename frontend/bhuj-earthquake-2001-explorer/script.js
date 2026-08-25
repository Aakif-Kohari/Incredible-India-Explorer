(function () {
    const places = {
        epicentre: {
            title: "Chobari Epicentre (South Wagad Fault)",
            desc: "23.419°N, 70.232°E — Located near Chobari village in Bhachau taluka of eastern Kachchh. Blind thrust rupture occurred at 16 km depth on the South Wagad Fault, radiating high stress drop seismic waves across western India.",
            lat: 23.419,
            lon: 70.232,
            bbox: [69.8, 23.0, 70.7, 23.8]
        },
        bhuj: {
            title: "Bhuj City",
            desc: "Historic district capital situated ~65 km southwest of the epicenter. Suffered extreme ground shaking (MMI X); over 40% of buildings collapsed, including the district hospital and historic palaces.",
            lat: 23.242,
            lon: 69.667,
            bbox: [69.45, 23.1, 69.85, 23.4]
        },
        anjar: {
            title: "Anjar Town",
            desc: "Historic trading town in Kachchh where narrow masonry alleys collapsed during a Republic Day student rally, resulting in hundreds of tragic casualties and widespread destruction.",
            lat: 23.113,
            lon: 70.028,
            bbox: [69.85, 22.95, 70.2, 23.25]
        },
        bachau: {
            title: "Bhachau Town",
            desc: "Town closest to the epicenter where nearly 90% of residential and commercial structures were completely flattened into rubble.",
            lat: 23.292,
            lon: 70.354,
            bbox: [70.15, 23.15, 70.55, 23.45]
        },
        ahmedabad: {
            title: "Ahmedabad Metropolis",
            desc: "Located >300 km east of the epicenter. Experienced severe distal resonant shaking leading to pancake collapses of >80 multistory reinforced concrete residential buildings.",
            lat: 23.0225,
            lon: 72.5714,
            bbox: [72.35, 22.85, 72.8, 23.2]
        },
        smritivan: {
            title: "Smritivan Earthquake Memorial (Bhujiyo Dungar)",
            desc: "State-of-the-art memorial museum and eco-park situated atop Bhujiyo Dungar in Bhuj, commemorating the victims with 12,900+ trees and 50 check dams.",
            lat: 23.248,
            lon: 69.689,
            bbox: [69.55, 23.15, 69.8, 23.35]
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

                if (isCorrect) {
                    feedback.innerHTML = "🎉 <strong>Correct!</strong> The 2001 Bhuj earthquake struck on the morning of Republic Day (26 January 2001) at 08:46 IST.";
                    feedback.style.color = "#059669";
                    feedback.style.backgroundColor = "rgba(5, 150, 105, 0.1)";
                } else {
                    feedback.innerHTML = "❌ <strong>Incorrect!</strong> The earthquake occurred on <strong>Republic Day (26 January 2001)</strong>.";
                    feedback.style.color = "#dc2626";
                    feedback.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
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
