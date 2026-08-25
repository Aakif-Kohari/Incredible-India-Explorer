(function () {
    const places = {
        genesis: {
            title: "Tropical Cyclogenesis (East-Central Bay of Bengal)",
            desc: "16.3°N, 89.5°E — Formed as Depression BOB 02 on 23 May 2021 over exceptionally warm tropical sea surface temperatures (31°C+).",
            lat: 16.3,
            lon: 89.5,
            bbox: [87.0, 15.0, 91.0, 18.0]
        },
        dhamra: {
            title: "Landfall at Dhamra Port (Bhadrak, Odisha)",
            desc: "20.80°N, 86.97°E — Crossed the coast on 26 May 2021 with 130–140 km/h sustained winds and 155 km/h gusts, damaging fishing wharves and coastal settlements.",
            lat: 20.80,
            lon: 86.97,
            bbox: [86.7, 20.6, 87.2, 21.05]
        },
        balasore: {
            title: "Balasore & Bahanaga Coastal Strip (Odisha)",
            desc: "Severe gale impact zone where high-tension electricity towers collapsed and over 50,000 kutcha homes suffered heavy roof and wall damage.",
            lat: 21.493,
            lon: 86.932,
            bbox: [86.75, 21.35, 87.1, 21.65]
        },
        digha: {
            title: "Digha & East Medinipur Sea-Dike Breach (West Bengal)",
            desc: "High spring-tide waves overtopped and demolished concrete coastal dikes, flooding tourist markets, hotels, and agricultural fields with saline water.",
            lat: 21.626,
            lon: 87.507,
            bbox: [87.35, 21.5, 87.65, 21.75]
        },
        sundarbans: {
            title: "Sundarbans UNESCO Delta Inundation",
            desc: "Over 130 earthen river embankments collapsed across Gosaba, Hingalganj, and Kakdwip, submerging hundreds of delta islands under hypersaline seawater.",
            lat: 22.15,
            lon: 88.85,
            bbox: [88.5, 21.8, 89.2, 22.4]
        },
        mayurbhanj: {
            title: "Mayurbhanj & Simlipal Inland Deluge",
            desc: "Torrential downpours exceeding 250 mm triggered flash floods across the Baitarani and Budhabalanga river systems and triggered landslides in the Simlipal hills.",
            lat: 21.928,
            lon: 86.746,
            bbox: [86.4, 21.6, 87.0, 22.2]
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
                    feedback.innerHTML = "🎉 <strong>Correct!</strong> Cyclone Yaas made landfall near Dhamra Port in Bhadrak district, Odisha on the morning of 26 May 2021.";
                    feedback.style.color = "#059669";
                    feedback.style.backgroundColor = "rgba(5, 150, 105, 0.1)";
                    feedback.style.border = "1px solid rgba(5, 150, 105, 0.3)";
                } else {
                    feedback.innerHTML = "❌ <strong>Incorrect!</strong> Cyclone Yaas crossed the coast near <strong>Dhamra Port in Bhadrak district (Odisha)</strong>.";
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
