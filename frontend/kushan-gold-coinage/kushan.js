// kushan.js — Kushan Gold Coinage Explorer logic

(function () {
    let selectedRulerId = KUSHAN_RULERS[0].id;
    let selectedCoinId = null;
    let currentSide = "obverse";
    let activeHotspotIndex = null;

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = KUSHAN_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderRulerSelector() {
        const container = document.getElementById("ruler-selector");
        if (!container) return;
        container.innerHTML = KUSHAN_RULERS.map(
            (r) => `
            <button class="ruler-chip${r.id === selectedRulerId ? " active" : ""}" data-id="${r.id}">
                ${r.name}
            </button>`
        ).join("");

        container.querySelectorAll(".ruler-chip").forEach((btn) => {
            btn.addEventListener("click", () => {
                selectedRulerId = btn.dataset.id;
                selectedCoinId = null;
                renderRulerSelector();
                renderRulerBlurb();
                renderCoinGrid();
                renderViewer();
            });
        });
    }

    function renderRulerBlurb() {
        const ruler = KUSHAN_RULERS.find((r) => r.id === selectedRulerId);
        const el = document.getElementById("ruler-blurb");
        if (!el || !ruler) return;
        el.innerHTML = `<strong>${ruler.name}</strong> (${ruler.period}) — ${ruler.blurb} <br/><em>Territory: ${ruler.territoryNote}</em>`;
    }

    function getRulerCoins() {
        return KUSHAN_COINS.filter((c) => c.rulerId === selectedRulerId);
    }

    function renderCoinGrid() {
        const grid = document.getElementById("kushan-coin-grid");
        if (!grid) return;
        const coins = getRulerCoins();

        grid.innerHTML = coins
            .map(
                (coin) => `
            <div class="kushan-coin-card${coin.id === selectedCoinId ? " selected" : ""}" data-id="${coin.id}">
                <div class="coin-card-icon">🪙</div>
                <div class="coin-card-title">${coin.coinType}</div>
                <div class="coin-card-tags">
                    <span>${coin.metal}</span>
                    <span>${coin.denomination}</span>
                    <span>${coin.script}</span>
                </div>
            </div>`
            )
            .join("");

        grid.querySelectorAll(".kushan-coin-card").forEach((card) => {
            card.addEventListener("click", () => selectCoin(card.dataset.id));
        });
    }

    function selectCoin(id) {
        selectedCoinId = id;
        currentSide = "obverse";
        activeHotspotIndex = null;
        renderCoinGrid();
        renderViewer();
        document.getElementById("kushan-viewer-card").scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function renderViewer() {
        const coin = KUSHAN_COINS.find((c) => c.id === selectedCoinId);
        const nameEl = document.getElementById("viewer-name");
        const faceText = document.getElementById("viewer-face-text");
        const hotspotLayer = document.getElementById("hotspot-layer");
        const inscriptionBox = document.getElementById("inscription-box");
        const inscriptionText = document.getElementById("inscription-text");
        const denomEl = document.getElementById("viewer-denomination");
        const scriptEl = document.getElementById("viewer-script");
        const circEl = document.getElementById("viewer-circulation");
        const historyEl = document.getElementById("viewer-history");

        document.querySelectorAll(".viewer-toggle-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.side === currentSide);
        });

        if (!coin) {
            nameEl.textContent = "Select a Coin Above";
            faceText.textContent = "Choose a coin from the collection above to inspect it.";
            hotspotLayer.innerHTML = "";
            inscriptionBox.hidden = true;
            denomEl.textContent = "";
            scriptEl.textContent = "";
            circEl.textContent = "";
            historyEl.textContent = "";
            return;
        }

        const ruler = KUSHAN_RULERS.find((r) => r.id === coin.rulerId);
        const face = coin[currentSide];

        nameEl.textContent = `${ruler ? ruler.name : ""} — ${coin.coinType}`;
        faceText.textContent = face.desc;
        denomEl.textContent = `🪙 Denomination: ${coin.denomination}`;
        scriptEl.textContent = `📝 Script: ${coin.script}`;
        circEl.textContent = `📍 Circulation: ${coin.circulation}`;
        historyEl.textContent = `📖 ${coin.history}`;

        inscriptionBox.hidden = true;
        inscriptionText.textContent = "";

        hotspotLayer.innerHTML = face.hotspots
            .map(
                (h, i) => `
            <div class="hotspot-dot${i === activeHotspotIndex ? " active" : ""}"
                 style="left:${h.x}%; top:${h.y}%;"
                 data-index="${i}"
                 title="${h.label}"></div>`
            )
            .join("");

        hotspotLayer.querySelectorAll(".hotspot-dot").forEach((dot) => {
            dot.addEventListener("click", () => {
                const idx = Number(dot.dataset.index);
                activeHotspotIndex = idx;
                const h = face.hotspots[idx];
                inscriptionBox.hidden = false;
                inscriptionText.textContent = `${h.label}: ${h.note}`;
                renderViewer();
            });
        });
    }

    function bindViewerToggle() {
        document.querySelectorAll(".viewer-toggle-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                currentSide = btn.dataset.side;
                activeHotspotIndex = null;
                renderViewer();
            });
        });
    }

    function renderTimeline() {
        const el = document.getElementById("kushan-timeline");
        if (!el) return;
        el.innerHTML = KUSHAN_TIMELINE.map(
            (t) => `
            <div class="timeline-item">
                <div class="timeline-year">${t.year}</div>
                <div class="timeline-title">${t.title}</div>
                <div class="timeline-desc">${t.desc}</div>
            </div>`
        ).join("");
    }

    function renderTerritory() {
        const el = document.getElementById("territory-list");
        if (!el) return;
        el.innerHTML = KUSHAN_TERRITORY.map(
            (t) => `
            <div class="territory-item">
                <div class="territory-region">📍 ${t.region}</div>
                <div class="territory-note">${t.note}</div>
            </div>`
        ).join("");
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = KUSHAN_REFERENCES.map(
            (r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`
        ).join("");
    }

    function init() {
        renderStats();
        renderRulerSelector();
        renderRulerBlurb();
        renderCoinGrid();
        bindViewerToggle();
        renderViewer();
        renderTimeline();
        renderTerritory();
        renderReferences();
    }

    document.addEventListener("DOMContentLoaded", init);
})();