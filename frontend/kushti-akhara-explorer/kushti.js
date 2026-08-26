// kushti.js — Kushti: The Akhara Tradition Explorer logic

(function () {
    let selectedEquipmentId = null;

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = KUSHTI_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderOverview() {
        document.getElementById("overview-intro").textContent = KUSHTI_OVERVIEW.intro;
        const grid = document.getElementById("overview-facts-grid");
        grid.innerHTML = KUSHTI_OVERVIEW.facts
            .map(
                (f) => `
            <div class="overview-fact-item">
                <div class="overview-fact-title">${f.title}</div>
                <div class="overview-fact-detail">${f.detail}</div>
            </div>`
            )
            .join("");
    }

        function renderEquipmentGrid() {
        const grid = document.getElementById("equipment-grid");
        if (!grid) return;
        grid.innerHTML = KUSHTI_EQUIPMENT.map(
            (e) => `
            <button type="button"
                    class="equipment-card${e.id === selectedEquipmentId ? " selected" : ""}"
                    data-id="${e.id}"
                    aria-pressed="${e.id === selectedEquipmentId}">
                <div class="equipment-icon">${e.icon}</div>
                <div class="equipment-name">${e.name}</div>
            </button>`
        ).join("");

        grid.querySelectorAll(".equipment-card").forEach((card) => {
            card.addEventListener("click", () => selectEquipment(card.dataset.id));
        });
    }

    function selectEquipment(id) {
        selectedEquipmentId = id;

        // Update classes/aria-pressed in place instead of re-rendering the
        // grid, so keyboard focus stays on the clicked/tabbed button.
        const grid = document.getElementById("equipment-grid");
        if (grid) {
            grid.querySelectorAll(".equipment-card").forEach((card) => {
                const isSelected = card.dataset.id === id;
                card.classList.toggle("selected", isSelected);
                card.setAttribute("aria-pressed", isSelected);
            });
        }

        renderEquipmentDetail();
    }

    function renderEquipmentDetail() {
        const e = KUSHTI_EQUIPMENT.find((x) => x.id === selectedEquipmentId);
        const card = document.getElementById("equipment-detail-card");
        if (!e) {
            card.innerHTML = `<p class="detail-placeholder">Select a piece of equipment above to see its full description.</p>`;
            return;
        }
        card.innerHTML = `
            <div class="equipment-detail-name">${e.icon} ${e.name}</div>
            <p>${e.desc}</p>
            <p><strong>Significance:</strong> ${e.significance}</p>
        `;
    }

    function renderTechnique() {
        document.getElementById("technique-intro").textContent = KUSHTI_TECHNIQUES.intro;
        const list = document.getElementById("technique-points");
        list.innerHTML = KUSHTI_TECHNIQUES.points.map((p) => `<li>${p}</li>`).join("");
    }

    function renderRegions() {
        const grid = document.getElementById("region-grid");
        if (!grid) return;
        grid.innerHTML = KUSHTI_REGIONS.map(
            (r) => `
            <div class="region-item">
                <div class="region-name">📍 ${r.region}</div>
                <div class="region-note">${r.note}</div>
            </div>`
        ).join("");
    }

    function renderWrestlers() {
        const grid = document.getElementById("wrestlers-grid");
        if (!grid) return;
        grid.innerHTML = KUSHTI_WRESTLERS.map(
            (w) => `
            <div class="wrestler-card">
                <div class="wrestler-name">🤼 ${w.name}</div>
                <div class="wrestler-era">${w.era}</div>
                <div class="wrestler-note">${w.note}</div>
            </div>`
        ).join("");
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = KUSHTI_REFERENCES.map(
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
        renderOverview();
        renderEquipmentGrid();
        renderEquipmentDetail();
        renderTechnique();
        renderRegions();
        renderWrestlers();
        renderReferences();
        bindThemeToggle();
    }

    document.addEventListener("DOMContentLoaded", init);
})();