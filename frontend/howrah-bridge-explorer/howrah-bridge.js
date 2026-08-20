// howrah-bridge.js — Howrah Bridge: Kolkata's Engineering Landmark Explorer logic

(function () {
    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = BRIDGE_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");

        const loc = BRIDGE_LOCATION;
        document.getElementById("location-strip").textContent =
            `📍 ${loc.location} · ${loc.coordinates} · Maintained by ${loc.maintainedBy}`;
    }

    function renderHistory() {
        document.getElementById("history-intro").textContent = BRIDGE_HISTORY.intro;
        const grid = document.getElementById("history-points-grid");
        grid.innerHTML = BRIDGE_HISTORY.points
            .map(
                (p) => `
            <div class="point-card">
                <div class="point-card-title">${p.title}</div>
                <div class="point-card-detail">${p.detail}</div>
            </div>`
            )
            .join("");
    }

    function renderEngineering() {
        document.getElementById("engineering-intro").textContent = BRIDGE_ENGINEERING.intro;
        const grid = document.getElementById("engineering-grid");
        grid.innerHTML = BRIDGE_ENGINEERING.explainer
            .map(
                (e) => `
            <div class="point-card">
                <div class="point-card-title">${e.title}</div>
                <div class="point-card-detail">${e.detail}</div>
            </div>`
            )
            .join("");
    }

    function renderHooghly() {
        document.getElementById("hooghly-intro").textContent = BRIDGE_HOOGHLY.intro;
        const list = document.getElementById("hooghly-points");
        list.innerHTML = BRIDGE_HOOGHLY.points.map((p) => `<li>${p}</li>`).join("");
    }

    function renderKolkata() {
        document.getElementById("kolkata-intro").textContent = BRIDGE_KOLKATA_CONNECTION.intro;
        const list = document.getElementById("kolkata-points");
        list.innerHTML = BRIDGE_KOLKATA_CONNECTION.points.map((p) => `<li>${p}</li>`).join("");
    }

    function renderFacts() {
        const grid = document.getElementById("facts-grid");
        if (!grid) return;
        grid.innerHTML = BRIDGE_INTERESTING_FACTS.map(
            (f) => `
            <div class="fact-item">
                <div class="fact-icon">${f.icon}</div>
                <div class="fact-text">${f.fact}</div>
            </div>`
        ).join("");
    }

    function renderTimeline() {
        const el = document.getElementById("bridge-timeline");
        if (!el) return;
        el.innerHTML = BRIDGE_TIMELINE.map(
            (t) => `
            <div class="timeline-item">
                <div class="timeline-year">${t.year}</div>
                <div class="timeline-title">${t.title}</div>
                <div class="timeline-desc">${t.desc}</div>
            </div>`
        ).join("");
    }

    function renderGallery() {
        const grid = document.getElementById("gallery-grid");
        if (!grid) return;
        grid.innerHTML = BRIDGE_GALLERY.map(
            (g) => `
            <div class="gallery-item">
                <div class="gallery-image-wrap">
                    <img src="${g.url}" alt="${g.title}" loading="lazy" />
                </div>
                <div class="gallery-item-body">
                    <div class="gallery-item-title">${g.title}</div>
                    <div class="gallery-item-caption">${g.caption}</div>
                    <div class="gallery-item-credit">
                        <a href="${g.sourceUrl}" target="_blank" rel="noopener">${g.credit}</a>
                    </div>
                </div>
            </div>`
        ).join("");
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = BRIDGE_REFERENCES.map(
            (r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`
        ).join("");
    }

    function bindThemeToggle() {
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-theme");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            btn.textContent = isLight ? "🌙" : "☀️";
        });
        if (document.body.classList.contains("light-theme")) {
            btn.textContent = "🌙";
        }
    }

    function init() {
        renderStats();
        renderHistory();
        renderEngineering();
        renderHooghly();
        renderKolkata();
        renderFacts();
        renderTimeline();
        renderGallery();
        renderReferences();
        bindThemeToggle();
    }

    document.addEventListener("DOMContentLoaded", init);
})();