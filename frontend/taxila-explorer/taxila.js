// taxila.js — Taxila: Ancient Crossroads of Gandhara Explorer logic

(function () {
    let selectedSettlementId = TAXILA_SETTLEMENTS[0].id;

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = TAXILA_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderSettlementTabs() {
        const el = document.getElementById("settlement-tabs");
        if (!el) return;
        el.innerHTML = TAXILA_SETTLEMENTS.map(
            (s) => `
            <button class="settlement-tab-btn${s.id === selectedSettlementId ? " active" : ""}" data-id="${s.id}">
                ${s.name}
            </button>`
        ).join("");

        el.querySelectorAll(".settlement-tab-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                selectedSettlementId = btn.dataset.id;
                renderSettlementTabs();
                renderComparisonGrid();
                renderSettlementDetail();
            });
        });
    }

    function renderComparisonGrid() {
        const el = document.getElementById("settlement-comparison-grid");
        if (!el) return;
        el.innerHTML = TAXILA_SETTLEMENTS.map(
            (s) => `
            <div class="settlement-compare-card${s.id === selectedSettlementId ? " highlight" : ""}" data-id="${s.id}">
                <div class="compare-name">${s.name}</div>
                <div class="compare-row"><strong>Period:</strong> ${s.period}</div>
                <div class="compare-row"><strong>Rulers:</strong> ${s.rulers}</div>
                <div class="compare-row"><strong>Layout:</strong> ${s.layout}</div>
            </div>`
        ).join("");

        el.querySelectorAll(".settlement-compare-card").forEach((card) => {
            card.addEventListener("click", () => {
                selectedSettlementId = card.dataset.id;
                renderSettlementTabs();
                renderComparisonGrid();
                renderSettlementDetail();
            });
        });
    }

    function renderSettlementDetail() {
        const s = TAXILA_SETTLEMENTS.find((x) => x.id === selectedSettlementId);
        const el = document.getElementById("settlement-detail-card");
        if (!el || !s) return;
        el.innerHTML = `
            <h3>${s.name}</h3>
            <p class="settlement-detail-meta">${s.period} — ${s.rulers}</p>
            <p>${s.desc}</p>
            <p><strong>Archaeological finds:</strong> ${s.finds}</p>
        `;
    }

    function renderTradeRoutes() {
        const el = document.getElementById("trade-route-list");
        if (!el) return;
        el.innerHTML = TAXILA_TRADE_ROUTES.map(
            (t) => `
            <div class="trade-route-item">
                <div class="trade-route-name">🛤️ ${t.name}</div>
                <div class="trade-route-connects">${t.connects}</div>
                <div class="trade-route-note">${t.note}</div>
            </div>`
        ).join("");
    }

    function renderBuddhistSites() {
        const el = document.getElementById("buddhist-grid");
        if (!el) return;
        el.innerHTML = TAXILA_BUDDHIST_SITES.map(
            (b) => `
            <div class="buddhist-item">
                <div class="buddhist-name">☸️ ${b.name}</div>
                <div class="buddhist-note">${b.note}</div>
            </div>`
        ).join("");
    }

    function renderLearning() {
        const introEl = document.getElementById("learning-intro");
        const gridEl = document.getElementById("learning-figures-grid");
        if (introEl) introEl.textContent = TAXILA_LEARNING.intro;
        if (gridEl) {
            gridEl.innerHTML = TAXILA_LEARNING.figures
                .map(
                    (f) => `
                <div class="learning-figure-card">
                    <div class="learning-figure-name">${f.name}</div>
                    <div class="learning-figure-note">${f.note}</div>
                </div>`
                )
                .join("");
        }
    }

    function renderArtifacts() {
        const el = document.getElementById("artifact-grid");
        if (!el) return;
        el.innerHTML = TAXILA_ARTIFACTS.map(
            (a) => `
            <div class="artifact-card">
                <div class="artifact-icon">🏺</div>
                <div class="artifact-name">${a.name}</div>
                <div class="artifact-site">Found at: ${a.site}</div>
                <div class="artifact-desc">${a.desc}</div>
            </div>`
        ).join("");
    }

    function renderTimeline() {
        const el = document.getElementById("taxila-timeline");
        if (!el) return;
        el.innerHTML = TAXILA_TIMELINE.map(
            (t) => `
            <div class="timeline-item">
                <div class="timeline-year">${t.year}</div>
                <div class="timeline-title">${t.title}</div>
                <div class="timeline-desc">${t.desc}</div>
            </div>`
        ).join("");
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = TAXILA_REFERENCES.map(
            (r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`
        ).join("");
    }

    function init() {
        renderStats();
        renderSettlementTabs();
        renderComparisonGrid();
        renderSettlementDetail();
        renderTradeRoutes();
        renderBuddhistSites();
        renderLearning();
        renderArtifacts();
        renderTimeline();
        renderReferences();
    }

    document.addEventListener("DOMContentLoaded", init);
})();