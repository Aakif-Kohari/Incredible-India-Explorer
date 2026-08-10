document.addEventListener('DOMContentLoaded', () => {
    initFiltersAndSearch();
    initThemeToggle();
});

function initFiltersAndSearch() {
    const searchInput = document.getElementById('search-input');
    const metalSelect = document.getElementById('filter-metal');
    const periodSelect = document.getElementById('filter-period');
    const regionSelect = document.getElementById('filter-region');
    const scriptSelect = document.getElementById('filter-script');
    const btnReset = document.getElementById('btn-reset');

    if (!searchInput || typeof ALL_COINS_DATASET === 'undefined') return;

    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        const metal = metalSelect.value;
        const period = periodSelect.value;
        const region = regionSelect.value;
        const script = scriptSelect.value;

        const filtered = ALL_COINS_DATASET.filter(coin => {
            const matchesQuery =
                !query ||
                coin.name.toLowerCase().includes(query) ||
                coin.ruler.toLowerCase().includes(query) ||
                coin.description.toLowerCase().includes(query) ||
                coin.metal.toLowerCase().includes(query) ||
                coin.script.toLowerCase().includes(query) ||
                coin.symbol.toLowerCase().includes(query);

            const matchesMetal = metal === 'all' || coin.metal === metal;
            const matchesPeriod = period === 'all' || coin.period.includes(period);
            const matchesRegion = region === 'all' || coin.region.includes(region);
            const matchesScript = script === 'all' || coin.script.includes(script);

            return matchesQuery && matchesMetal && matchesPeriod && matchesRegion && matchesScript;
        });

        renderResults(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    metalSelect.addEventListener('change', applyFilters);
    periodSelect.addEventListener('change', applyFilters);
    regionSelect.addEventListener('change', applyFilters);
    scriptSelect.addEventListener('change', applyFilters);

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            searchInput.value = '';
            metalSelect.value = 'all';
            periodSelect.value = 'all';
            regionSelect.value = 'all';
            scriptSelect.value = 'all';
            applyFilters();
        });
    }

    applyFilters();
}

function renderResults(coins) {
    const grid = document.getElementById('results-grid');
    const countEl = document.getElementById('results-count');
    if (!grid || !countEl) return;

    countEl.textContent = `Showing ${coins.length} coin${coins.length === 1 ? '' : 's'}`;

    if (coins.length === 0) {
        grid.innerHTML = `
            <div class="empty-msg">
                <h3>No coins match your search criteria</h3>
                <p>Try clearing filters or searching with a different keyword like "Gold", "Maratha", or "Devanagari".</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = coins.map(
        c => `
        <div class="result-card">
            <span class="card-badge">🪙 ${c.metal} • ${c.period}</span>
            <h3>${c.name}</h3>
            <p><strong>Ruler/Authority:</strong> ${c.ruler}</p>
            <p><strong>Region:</strong> ${c.region}</p>
            <p><strong>Script & Symbol:</strong> ${c.script} • ${c.symbol}</p>
            <p class="card-desc">${c.description}</p>
            <a href="${c.url}" class="card-link">View Explorer →</a>
        </div>
    `
    ).join('');
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}
