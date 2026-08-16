// tournaments.js — Forgotten Indian Sporting Tournaments Explorer logic

(function () {
    let selectedId = null;
    let activeView = "then";

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = TOURNAMENT_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderGrid() {
        const grid = document.getElementById("tournament-grid");
        if (!grid) return;
        grid.innerHTML = TOURNAMENTS.map(
            (t) => `
            <div class="tournament-card${t.id === selectedId ? " selected" : ""}" data-id="${t.id}">
                <div class="tournament-card-icon">🏆</div>
                <div class="tournament-card-name">${t.name}</div>
                <div class="tournament-card-tags">
                    <span>${t.sport}</span>
                    <span>${t.period.split(" – ")[0]}</span>
                </div>
            </div>`
        ).join("");

        grid.querySelectorAll(".tournament-card").forEach((card) => {
            card.addEventListener("click", () => selectTournament(card.dataset.id));
        });
    }

    function selectTournament(id) {
        selectedId = id;
        activeView = "then";
        renderGrid();
        renderDetail();
        document.getElementById("tournament-detail-card").scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function renderDetail() {
        const t = TOURNAMENTS.find((x) => x.id === selectedId);
        const card = document.getElementById("tournament-detail-card");
        if (!t) {
            card.innerHTML = `<p class="detail-placeholder">Select a tournament above to explore its full history.</p>`;
            return;
        }

        card.innerHTML = `
            <div class="detail-header">
                <div class="detail-name">${t.name}</div>
                <div class="detail-meta">${t.sport} • ${t.period}</div>
            </div>
            <div class="detail-facts">
                <div class="detail-fact">
                    <span class="detail-fact-label">📍 Location</span>
                    <span class="detail-fact-value">${t.location}</span>
                </div>
                <div class="detail-fact">
                    <span class="detail-fact-label">🎯 Purpose</span>
                    <span class="detail-fact-value">${t.purpose}</span>
                </div>
                <div class="detail-fact">
                    <span class="detail-fact-label">🥇 Champions</span>
                    <span class="detail-fact-value">${t.champions}</span>
                </div>
            </div>
            <div class="detail-significance"><strong>Historical significance:</strong> ${t.significance}</div>
            <div class="then-now-toggle" id="then-now-toggle">
                <button class="then-now-btn${activeView === "then" ? " active" : ""}" data-view="then">Then</button>
                <button class="then-now-btn${activeView === "now" ? " active" : ""}" data-view="now">Now</button>
            </div>
            <div class="then-now-panel" id="then-now-panel">
                ${activeView === "then" ? t.thenStatus : t.nowStatus}
            </div>
        `;

        card.querySelectorAll(".then-now-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                activeView = btn.dataset.view;
                renderDetail();
            });
        });
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = TOURNAMENT_REFERENCES.map(
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
        renderGrid();
        renderDetail();
        renderReferences();
        bindThemeToggle();
    }

    document.addEventListener("DOMContentLoaded", init);
})();