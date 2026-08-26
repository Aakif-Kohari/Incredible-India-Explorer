(function () {
    const places = {
        kangra: {
            title: "Kangra (Palampur)",
            desc: "Palampur, Dehra Gopipur, and Nurpur forest divisions in Kangra district sit in the heart of the low-hill chir pine belt and are consistently among the state's most fire-susceptible areas between April and June.",
            lat: 32.1113,
            lon: 76.5364,
            bbox: [75.8, 31.0, 77.5, 32.4]
        },
        mandi: {
            title: "Mandi",
            desc: "One of the worst-hit circles in the 2023–24 season, with 105 fire incidents affecting over 706 hectares and an estimated ₹54 lakh in losses.",
            lat: 31.7084,
            lon: 76.9319,
            bbox: [76.0, 31.0, 77.8, 32.3]
        },
        kullu: {
            title: "Kullu",
            desc: "The worst-affected forest circle in the 2023–24 season: 127 fire incidents damaged nearly 2,925 hectares of forestland, causing around ₹83 lakh in losses.",
            lat: 31.9576,
            lon: 77.1095,
            bbox: [76.5, 31.2, 78.2, 32.8]
        },
        nahan: {
            title: "Nahan (Sirmaur)",
            desc: "The Nahan circle led the state in the 2025–26 season so far, with 24 fire incidents damaging nearly 265 hectares of forest land.",
            lat: 30.559,
            lon: 77.2952,
            bbox: [76.6, 30.0, 78.2, 31.2]
        },
        una: {
            title: "Una",
            desc: "A low-elevation district in the chir pine belt, named alongside Kangra, Mandi, Hamirpur, and Bilaspur as highly susceptible to major fires between April and June.",
            lat: 31.4685,
            lon: 76.2708,
            bbox: [75.7, 30.9, 77.2, 32.1]
        },
        bilaspur: {
            title: "Bilaspur",
            desc: "Another lower-hill district in the fire-prone chir pine zone, monitored closely by the Forest Department through the peak summer window.",
            lat: 31.3319,
            lon: 76.7514,
            bbox: [75.9, 30.7, 77.6, 31.9]
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
        const frame = document.getElementById("fire-map");
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