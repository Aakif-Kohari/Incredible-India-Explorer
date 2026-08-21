// nalanda.js — Nalanda Ancient University City Explorer logic

(function () {
    let selectedBuildingId = null;

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = NALANDA_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderCampusGrid() {
        const grid = document.getElementById("campus-grid");
        if (!grid) return;
        grid.innerHTML = NALANDA_BUILDINGS.map(
            (b) => `
            <div class="building-card${b.id === selectedBuildingId ? " selected" : ""}" data-id="${b.id}">
                <div class="building-icon">🏛️</div>
                <div class="building-card-title">${b.name}</div>
                <span class="building-card-type">${b.type}</span>
            </div>`
        ).join("");

        grid.querySelectorAll(".building-card").forEach((card) => {
            card.addEventListener("click", () => selectBuilding(card.dataset.id));
        });
    }

    function selectBuilding(id) {
        selectedBuildingId = id;
        renderCampusGrid();
        renderBuildingDetail();
    }

    function renderBuildingDetail() {
        const b = NALANDA_BUILDINGS.find((x) => x.id === selectedBuildingId);
        const nameEl = document.getElementById("building-name");
        const metaEl = document.getElementById("building-meta");
        const descEl = document.getElementById("building-desc");
        const detailsEl = document.getElementById("building-details");

        if (!b) {
            nameEl.textContent = "Select a Structure Above";
            metaEl.textContent = "";
            descEl.textContent = "Click any campus structure card to see its detailed history.";
            detailsEl.textContent = "";
            return;
        }

        nameEl.textContent = b.name;
        metaEl.textContent = `${b.type} — ${b.period}`;
        descEl.textContent = b.desc;
        detailsEl.textContent = b.details;
    }

    function renderScholars() {
        const grid = document.getElementById("scholars-grid");
        if (!grid) return;
        grid.innerHTML = NALANDA_SCHOLARS.map(
            (s) => `
            <div class="scholar-card">
                <div class="scholar-name">${s.name}</div>
                <div class="scholar-role">${s.role}</div>
                <div class="scholar-era">${s.era}</div>
                <div class="scholar-bio">${s.bio}</div>
            </div>`
        ).join("");
    }

    function renderVisitors() {
        const grid = document.getElementById("visitors-grid");
        if (!grid) return;
        grid.innerHTML = NALANDA_VISITORS.map(
            (v) => `
            <div class="visitor-card">
                <div class="visitor-name">${v.name}</div>
                <div class="visitor-origin">📍 ${v.origin}</div>
                <div class="visitor-period">${v.period}</div>
                <div class="visitor-account">${v.account}</div>
            </div>`
        ).join("");
    }

    function renderInternational() {
        const el = document.getElementById("international-list");
        if (!el) return;
        el.innerHTML = NALANDA_INTERNATIONAL.map(
            (i) => `
            <div class="international-item">
                <div class="international-region">🌏 ${i.region}</div>
                <div class="international-note">${i.note}</div>
            </div>`
        ).join("");
    }

    function renderTimeline() {
        const el = document.getElementById("nalanda-timeline");
        if (!el) return;
        el.innerHTML = NALANDA_TIMELINE.map(
            (t) => `
            <div class="timeline-item">
                <div class="timeline-year">${t.year}</div>
                <div class="timeline-title">${t.title}</div>
                <div class="timeline-desc">${t.desc}</div>
            </div>`
        ).join("");
    }

    function renderArchaeology() {
        const el = document.getElementById("archaeology-grid");
        if (!el) return;
        el.innerHTML = NALANDA_ARCHAEOLOGY.map(
            (a) => `
            <div class="archaeology-item">
                <div class="archaeology-title">🔍 ${a.title}</div>
                <div class="archaeology-detail">${a.detail}</div>
            </div>`
        ).join("");
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = NALANDA_REFERENCES.map(
            (r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`
        ).join("");
    }

    function init() {
        renderStats();
        renderCampusGrid();
        renderBuildingDetail();
        renderScholars();
        renderVisitors();
        renderInternational();
        renderTimeline();
        renderArchaeology();
        renderReferences();
    }

    document.addEventListener("DOMContentLoaded", init);
})();