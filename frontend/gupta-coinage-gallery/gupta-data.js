// gupta.js — Gupta Coinage Gallery logic

(function () {
    const FILTER_KEYS = ["ruler", "coinType", "metal", "imagery", "script"];
    const activeFilters = {
        ruler: null,
        coinType: null,
        metal: null,
        imagery: null,
        script: null,
    };

    let currentSide = "obverse";
    let selectedCoinId = null;

    function uniqueValues(key) {
        return [...new Set(GUPTA_COINS.map((c) => c[key]))];
    }

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = GUPTA_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderFilterOptions() {
        FILTER_KEYS.forEach((key) => {
            const container = document.getElementById(`filter-${key}`);
            if (!container) return;
            const values = uniqueValues(key);
            container.innerHTML = values
                .map(
                    (val) => `
                <button class="filter-chip" data-key="${key}" data-value="${escapeAttr(val)}">
                    ${val}
                </button>`
                )
                .join("");
        });

        document.querySelectorAll(".filter-chip").forEach((btn) => {
            btn.addEventListener("click", () => {
                const key = btn.dataset.key;
                const value = btn.dataset.value;
                activeFilters[key] = activeFilters[key] === value ? null : value;
                syncChipStates();
                renderCoinGrid();
            });
        });
    }

    function syncChipStates() {
        document.querySelectorAll(".filter-chip").forEach((btn) => {
            const key = btn.dataset.key;
            const value = btn.dataset.value;
            btn.classList.toggle("active", activeFilters[key] === value);
        });
    }

    function escapeAttr(str) {
        return String(str).replace(/"/g, "&quot;");
    }

    function getFilteredCoins() {
        return GUPTA_COINS.filter((coin) =>
            FILTER_KEYS.every((key) => !activeFilters[key] || coin[key] === activeFilters[key])
        );
    }

    function renderCoinGrid() {
        const grid = document.getElementById("gupta-coin-grid");
        const noResults = document.getElementById("no-results");
        const countEl = document.getElementById("filter-count");
        if (!grid) return;

        const coins = getFilteredCoins();
        countEl.textContent = `Showing ${coins.length} of ${GUPTA_COINS.length} coins`;
        noResults.hidden = coins.length !== 0;

        grid.innerHTML = coins
            .map(
                (coin) => `
            <div class="gupta-coin-card${coin.id === selectedCoinId ? " selected" : ""}" data-id="${coin.id}">
                <div class="coin-card-icon">🪙</div>
                <div class="coin-card-title">${coin.coinType}</div>
                <div class="coin-card-ruler">${coin.ruler}</div>
                <div class="coin-card-tags">
                    <span>${coin.metal}</span>
                    <span>${coin.period}</span>
                </div>
            </div>`
            )
            .join("");

        grid.querySelectorAll(".gupta-coin-card").forEach((card) => {
            card.addEventListener("click", () => {
                selectCoin(card.dataset.id);
            });
        });
    }

    function selectCoin(id) {
        selectedCoinId = id;
        currentSide = "obverse";
        renderCoinGrid();
        renderViewer();
        document.getElementById("gupta-viewer-card").scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function renderViewer() {
        const coin = GUPTA_COINS.find((c) => c.id === selectedCoinId);
        const nameEl = document.getElementById("viewer-name");
        const faceText = document.getElementById("viewer-face-text");
        const disc = document.getElementById("viewer-coin-disc");
        const periodEl = document.getElementById("viewer-period");
        const circEl = document.getElementById("viewer-circulation");
        const symbolsEl = document.getElementById("viewer-symbols");
        const historyEl = document.getElementById("viewer-history");

        document.querySelectorAll(".viewer-toggle-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.side === currentSide);
        });

        if (!coin) {
            nameEl.textContent = "Select a Coin Above";
            faceText.textContent = "Choose a coin from the collection to inspect its obverse and reverse.";
            periodEl.textContent = "";
            circEl.textContent = "";
            symbolsEl.textContent = "";
            historyEl.textContent = "";
            return;
        }

        nameEl.textContent = `${coin.ruler} — ${coin.coinType}`;
        faceText.textContent = currentSide === "obverse" ? coin.obverse : coin.reverse;
        disc.classList.toggle("flipped", currentSide === "reverse");
        periodEl.textContent = `🗓️ Period: ${coin.period}`;
        circEl.textContent = `📍 Circulation: ${coin.circulation}`;
        symbolsEl.textContent = `🔣 Symbols: ${coin.symbols.join(", ")}`;
        historyEl.textContent = `📖 ${coin.history}`;
    }

    function bindViewerToggle() {
        document.querySelectorAll(".viewer-toggle-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                currentSide = btn.dataset.side;
                renderViewer();
            });
        });
    }

    function bindResetButton() {
        const resetBtn = document.getElementById("filter-reset-btn");
        if (!resetBtn) return;
        resetBtn.addEventListener("click", () => {
            FILTER_KEYS.forEach((key) => (activeFilters[key] = null));
            syncChipStates();
            renderCoinGrid();
        });
    }

    function renderReferences() {
        const list = document.getElementById("references-list");
        if (!list) return;
        list.innerHTML = GUPTA_REFERENCES.map(
            (ref) => `<li><a href="${ref.url}" target="_blank" rel="noopener">${ref.text}</a></li>`
        ).join("");
    }

    function init() {
        renderStats();
        renderFilterOptions();
        renderCoinGrid();
        bindViewerToggle();
        bindResetButton();
        renderReferences();
        renderViewer();
    }

    document.addEventListener("DOMContentLoaded", init);
})();