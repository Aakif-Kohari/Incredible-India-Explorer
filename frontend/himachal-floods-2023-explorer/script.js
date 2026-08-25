(function () {
    const places = {
        shimla: {
            title: "Shimla",
            desc: "State capital. Landslides at Summer Hill (9 July and 14 August) and Fagli buried the heritage railway, a temple congregation, and homes on built-up cut slopes.",
            lat: 31.1048,
            lon: 77.1734,
            bbox: [77.02, 31.03, 77.33, 31.19]
        },
        manali: {
            title: "Manali",
            desc: "Tourist town on the Beas. The river flooded riverside markets and camps on 8–11 July; the Chandigarh–Manali highway and Manali–Leh road were breached, stranding visitors.",
            lat: 32.2396,
            lon: 77.1887,
            bbox: [77.05, 32.13, 77.33, 32.35]
        },
        mandi: {
            title: "Mandi",
            desc: "Junction town where the Beas leaves the Kullu valley. Among the districts with the highest death tolls and the longest cumulative road closures of the season.",
            lat: 31.7082,
            lon: 76.9315,
            bbox: [76.78, 31.6, 77.08, 31.82]
        },
        jadoon: {
            title: "Jadoon (Solan)",
            desc: "Village near Kumarhatti in Solan district. On 13 July a rain-soaked slope collapsed onto a temple gathering, killing more than 25 people in one slide.",
            lat: 30.87,
            lon: 77.1,
            bbox: [76.95, 30.75, 77.25, 30.98]
        },
        rampur: {
            title: "Rampur",
            desc: "Satluj valley township on the Hindustan–Tibet road (NH-5). Repeated slides and bank erosion cut the artery through Kinnaur; nearby Jhakri's hydropower cascade halted on silt.",
            lat: 31.4526,
            lon: 77.634,
            bbox: [77.48, 31.34, 77.79, 31.57]
        },
        dharamshala: {
            title: "Dharamshala",
            desc: "Kangra town below the Dhauladhar range. Steep tributaries carried flash floods into outskirts and cut link roads during the mid-July spells.",
            lat: 32.219,
            lon: 76.3234,
            bbox: [76.18, 32.1, 76.47, 32.33]
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
        const frame = document.getElementById("flood-map");
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
