// vijayanagara.js — Vijayanagara Gold Coinage Explorer logic

(function () {
    let selectedRulerId = VIJAYANAGARA_RULERS[0].id;
    let selectedCoinId = null;
    let currentSide = "obverse";
    let activeHotspotIndex = null;
    let zoomLevel = 1;
    const ZOOM_MIN = 1;
    const ZOOM_MAX = 2.5;
    const ZOOM_STEP = 0.25;

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = VIJAYANAGARA_STATS.map(
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
        container.innerHTML = VIJAYANAGARA_RULERS.map(
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
        const ruler = VIJAYANAGARA_RULERS.find((r) => r.id === selectedRulerId);
        const el = document.getElementById("ruler-blurb");
        if (!el || !ruler) return;
        el.innerHTML = `<strong>${ruler.name}</strong> (${ruler.period}) — ${ruler.blurb} <br/><em>Territory: ${ruler.territoryNote}</em>`;
    }

    function getRulerCoins() {
        return VIJAYANAGARA_COINS.filter((c) => c.rulerId === selectedRulerId);
    }

    function renderCoinGrid() {
        const grid = document.getElementById("vijayanagara-coin-grid");
        if (!grid) return;
        const coins = getRulerCoins();

        grid.innerHTML = coins
            .map(
                (coin) => `
            <div class="vijayanagara-coin-card${coin.id === selectedCoinId ? " selected" : ""}" data-id="${coin.id}">
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

        grid.querySelectorAll(".vijayanagara-coin-card").forEach((card) => {
            card.addEventListener("click", () => selectCoin(card.dataset.id));
        });
    }

    function selectCoin(id) {
        selectedCoinId = id;
        currentSide = "obverse";
        activeHotspotIndex = null;
        resetZoom();
        renderCoinGrid();
        renderViewer();
        document.getElementById("vijayanagara-viewer-card").scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function applyZoom() {
        const inner = document.getElementById("viewer-coin-inner");
        const levelEl = document.getElementById("zoom-level");
        if (inner) inner.style.transform = `scale(${zoomLevel})`;
        if (levelEl) levelEl.textContent = `${Math.round(zoomLevel * 100)}%`;
    }

    function resetZoom() {
        zoomLevel = 1;
        applyZoom();
    }

    function bindZoomControls() {
        const inBtn = document.getElementById("zoom-in-btn");
        const outBtn = document.getElementById("zoom-out-btn");
        const resetBtn = document.getElementById("zoom-reset-btn");
        if (inBtn) {
            inBtn.addEventListener("click", () => {
                zoomLevel = Math.min(ZOOM_MAX, +(zoomLevel + ZOOM_STEP).toFixed(2));
                applyZoom();
            });
        }
        if (outBtn) {
            outBtn.addEventListener("click", () => {
                zoomLevel = Math.max(ZOOM_MIN, +(zoomLevel - ZOOM_STEP).toFixed(2));
                applyZoom();
            });
        }
        if (resetBtn) {
            resetBtn.addEventListener("click", resetZoom);
        }
    }

    function renderViewer() {
        const coin = VIJAYANAGARA_COINS.find((c) => c.id === selectedCoinId);
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

        const ruler = VIJAYANAGARA_RULERS.find((r) => r.id === coin.rulerId);
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
        const el = document.getElementById("vijayanagara-timeline");
        if (!el) return;
        el.innerHTML = VIJAYANAGARA_TIMELINE.map(
            (t) => `
            <div class="timeline-item">
                <div class="timeline-year">${t.year}</div>
                <div class="timeline-title">${t.title}</div>
                <div class="timeline-desc">${t.desc}</div>
            </div>`
        ).join("");
    }

    // --- Territory Map ---
    function renderTerritoryMap() {
        const markersContainer = document.getElementById("map-mint-markers");
        if (!markersContainer) return;

        markersContainer.innerHTML = VIJAYANAGARA_TERRITORY.map(
            (mint, index) => `
            <circle class="map-mint-marker"
                    cx="${(mint.x / 100) * 400}"
                    cy="${(mint.y / 100) * 500}"
                    r="7"
                    data-index="${index}"
                    tabindex="0"
                    aria-label="Mint at ${mint.region}"></circle>`
        ).join("");

        const tooltip = document.getElementById("map-tooltip");
        const markers = markersContainer.querySelectorAll(".map-mint-marker");

        markers.forEach((marker) => {
            marker.addEventListener("mouseenter", function (e) {
                const index = parseInt(this.getAttribute("data-index"), 10);
                const mint = VIJAYANAGARA_TERRITORY[index];
                if (tooltip) {
                    tooltip.textContent = mint.region;
                    tooltip.style.opacity = "1";
                    tooltip.style.left = `${e.offsetX + 15}px`;
                    tooltip.style.top = `${e.offsetY - 15}px`;
                }
            });

            marker.addEventListener("mouseleave", () => {
                if (tooltip) tooltip.style.opacity = "0";
            });

            marker.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"), 10);
                markers.forEach((m) => m.classList.remove("active"));
                this.classList.add("active");
                renderMintDetails(index);
            });
        });
    }

    function renderMintDetails(index) {
        const panel = document.getElementById("mint-info-panel");
        if (!panel) return;
        const mint = VIJAYANAGARA_TERRITORY[index];
        panel.innerHTML = `
            <div class="mint-details">
                <h3>📍 ${mint.region}</h3>
                <p class="mint-desc">${mint.note}</p>
            </div>`;
    }

    // --- Coin Comparison ---
    function initComparison() {
        const selectA = document.getElementById("coin-a-select");
        const selectB = document.getElementById("coin-b-select");
        if (!selectA || !selectB) return;

        const optionsHtml = VIJAYANAGARA_COINS.map((coin, index) => {
            const ruler = VIJAYANAGARA_RULERS.find((r) => r.id === coin.rulerId);
            return `<option value="${index}">${coin.coinType} (${ruler ? ruler.name : ""})</option>`;
        }).join("");

        selectA.innerHTML = optionsHtml;
        selectB.innerHTML = optionsHtml;
        if (VIJAYANAGARA_COINS.length > 1) selectB.value = 1;

        renderComparison();
        selectA.addEventListener("change", renderComparison);
        selectB.addEventListener("change", renderComparison);
    }

    function renderComparison() {
        const indexA = parseInt(document.getElementById("coin-a-select").value, 10);
        const indexB = parseInt(document.getElementById("coin-b-select").value, 10);
        const results = document.getElementById("comparison-results");
        if (!results) return;

        const coinA = VIJAYANAGARA_COINS[indexA];
        const coinB = VIJAYANAGARA_COINS[indexB];
        const rulerA = VIJAYANAGARA_RULERS.find((r) => r.id === coinA.rulerId);
        const rulerB = VIJAYANAGARA_RULERS.find((r) => r.id === coinB.rulerId);

        results.innerHTML = `
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th class="attribute-name">Attribute</th>
                        <th class="comp-column-value">${coinA.coinType}</th>
                        <th class="comp-column-value">${coinB.coinType}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td class="attribute-name">Ruler</td><td>${rulerA ? rulerA.name : ""}</td><td>${rulerB ? rulerB.name : ""}</td></tr>
                    <tr><td class="attribute-name">Metal</td><td>${coinA.metal}</td><td>${coinB.metal}</td></tr>
                    <tr><td class="attribute-name">Denomination</td><td>${coinA.denomination}</td><td>${coinB.denomination}</td></tr>
                    <tr><td class="attribute-name">Script</td><td>${coinA.script}</td><td>${coinB.script}</td></tr>
                    <tr><td class="attribute-name">Circulation</td><td>${coinA.circulation}</td><td>${coinB.circulation}</td></tr>
                    <tr><td class="attribute-name">Obverse</td><td>${coinA.obverse.desc}</td><td>${coinB.obverse.desc}</td></tr>
                    <tr><td class="attribute-name">Reverse</td><td>${coinA.reverse.desc}</td><td>${coinB.reverse.desc}</td></tr>
                    <tr><td class="attribute-name">Historical Note</td><td>${coinA.history}</td><td>${coinB.history}</td></tr>
                </tbody>
            </table>`;
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = VIJAYANAGARA_REFERENCES.map(
            (r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`
        ).join("");
    }

    function init() {
        renderStats();
        renderRulerSelector();
        renderRulerBlurb();
        renderCoinGrid();
        bindViewerToggle();
        bindZoomControls();
        renderViewer();
        renderTimeline();
        renderTerritoryMap();
        initComparison();
        renderReferences();
    }

    document.addEventListener("DOMContentLoaded", init);
})();