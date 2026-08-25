(function () {
    const places = {
        epicentre: {
            title: "Rima/Zayü Epicentre (Eastern Himalayan Syntaxis)",
            desc: "28.38°N, 96.76°E — Located in the border mountains near Rima in Zayü (Tibet) and the Mishmi Hills of Upper Assam (now Arunachal Pradesh). Megathrust rupture at 15 km depth with Mw 8.6 magnitude.",
            lat: 28.38,
            lon: 96.76,
            bbox: [96.0, 27.9, 97.5, 28.9]
        },
        sadiya: {
            title: "Old Sadiya Frontier Post",
            desc: "Historic British colonial frontier headquarters in Upper Assam. Suffered total liquefaction and bank failure; later completely washed away and abandoned due to subsequent Brahmaputra and Dihing floods.",
            lat: 27.83,
            lon: 95.66,
            bbox: [95.45, 27.65, 95.85, 28.0]
        },
        dibrugarh: {
            title: "Dibrugarh City (Brahmaputra Bank)",
            desc: "Major tea and river port city on the southern bank of the Brahmaputra. The riverbed rose by 3–4 metres from landslide silt, requiring the construction of the famous Dibrugarh Town Protection dyke.",
            lat: 27.4728,
            lon: 94.9120,
            bbox: [94.7, 27.3, 95.15, 27.65]
        },
        subansiri: {
            title: "Subansiri River Landslide Gorge",
            desc: "Deep mountain valley where colossal rockslides dammed the Subansiri River for eight days. The sudden dam breach on 23 August 1950 released a 7-metre flood wave submerging hundreds of square miles.",
            lat: 28.05,
            lon: 94.25,
            bbox: [93.9, 27.75, 94.6, 28.35]
        },
        pasighat: {
            title: "Pasighat (Abor Hills / Siang River)",
            desc: "Gateway to the Abor Hills along the Siang (Brahmaputra) River. Cut off for weeks by colossal landslides, requiring IAF Dakota transport planes for humanitarian air-drops.",
            lat: 28.066,
            lon: 95.326,
            bbox: [95.1, 27.9, 95.55, 28.25]
        },
        guwahati: {
            title: "Guwahati (Lower Assam Valley)",
            desc: "Historic city along the lower Brahmaputra where intense ground shaking triggered seiches in river channels, alarm among citizens, and disruption of communications.",
            lat: 26.1445,
            lon: 91.7362,
            bbox: [91.5, 26.0, 92.0, 26.3]
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
                    feedback.innerHTML = "🎉 <strong>Correct!</strong> The 1950 Assam–Tibet earthquake struck on the evening of India's 3rd Independence Day (15 August 1950) at 19:39 IST.";
                    feedback.style.color = "#059669";
                    feedback.style.backgroundColor = "rgba(5, 150, 105, 0.1)";
                } else {
                    feedback.innerHTML = "❌ <strong>Incorrect!</strong> The disaster occurred on <strong>Independence Day (15 August 1950)</strong>.";
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
