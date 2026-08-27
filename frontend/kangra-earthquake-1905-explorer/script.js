(function () {
    const places = {
        epicenter: {
            title: "Kangra & Dharamshala Epicentral Core",
            desc: "32.1°N, 76.27°E — Primary epicentral zone along the foot of the Dhauladhar Range. Rossi-Forel X intensity. Complete collapse of stone buildings and over 20,000 deaths across the valley.",
            lat: 32.1,
            lon: 76.27,
            bbox: [76.0, 31.8, 76.6, 32.4]
        },
        kangrafort: {
            title: "Historic Kangra Fort (Nagarkot)",
            desc: "Ancient citadel overlooking the Banganga River. Bastions, palaces, and gateways built over a millennium collapsed into the ravine during the morning shaking.",
            lat: 32.0886,
            lon: 76.2558,
            bbox: [76.22, 32.06, 76.29, 32.12]
        },
        dharamshala: {
            title: "Dharamshala Cantonment & McLeod Ganj",
            desc: "Colonial hill station and military cantonment. Flattened barracks of the 1st Gurkha Rifles and collapsed the stone spire of St. John in the Wilderness Church.",
            lat: 32.219,
            lon: 76.323,
            bbox: [76.28, 32.18, 76.36, 32.25]
        },
        mandi: {
            title: "Mandi Valley (Beas River Basin)",
            desc: "Severe ground shaking and riverbank rockfalls. Traditional wood-and-stone temples and bridges across the Beas River suffered critical damage.",
            lat: 31.708,
            lon: 76.932,
            bbox: [76.85, 31.65, 77.02, 31.78]
        },
        kullu: {
            title: "Kullu & Larji Gorges",
            desc: "Extensive landslides blocked the Beas River gorges near Larji, forming temporary natural dams and triggering catastrophic post-earthquake flood surges.",
            lat: 31.957,
            lon: 77.109,
            bbox: [77.0, 31.85, 77.25, 32.05]
        },
        dehradun: {
            title: "Dehradun & Mussoorie Secondary Isoseismal Anomaly",
            desc: "A secondary high-damage pocket located 150 km southeast of Kangra. Damaged colonial institutions, barracks, and schools across the Doon Valley and Mussoorie ridge.",
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
                    feedback.innerHTML = "🎉 <strong>Correct!</strong> C.S. Middlemiss of the Geological Survey of India conducted the landmark 1905 field survey and published the comprehensive GSI Memoir.";
                    feedback.style.color = "#059669";
                    feedback.style.backgroundColor = "rgba(5, 150, 105, 0.1)";
                    feedback.style.border = "1px solid rgba(5, 150, 105, 0.3)";
                } else {
                    feedback.innerHTML = "❌ <strong>Incorrect!</strong> Geologist <strong>Charles Stewart Middlemiss</strong> led the 1905 GSI investigation and produced the definitive isoseismal maps.";
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
