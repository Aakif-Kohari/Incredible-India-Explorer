document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCoins();
    renderScriptDecoder();
    renderSymbols();
    renderTerritories();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof MARATHA_INFO === 'undefined') return;

    grid.innerHTML = MARATHA_INFO.quickStats
        .map(
            stat => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

function renderCoins() {
    const grid = document.getElementById('coins-grid');
    if (!grid || typeof COIN_TYPES === 'undefined') return;

    grid.innerHTML = COIN_TYPES.map(
        c => `
        <div class="coin-card" id="coin-${c.id}">
            <div class="coin-header">
                <h3>🪙 ${c.name}</h3>
                <span class="coin-ruler">${c.ruler}</span>
            </div>
            <div class="coin-details">
                <p><strong>Metal & Weight:</strong> ${c.metal}</p>
                <p><strong>Denomination:</strong> ${c.denomination}</p>
                <p><strong>Script:</strong> ${c.script}</p>
                <p><strong>Obverse Legend:</strong> <em>"${c.obverseText}"</em></p>
                <p><strong>Reverse Legend:</strong> <em>"${c.reverseText}"</em></p>
                <p><strong>Circulation:</strong> ${c.circulation}</p>
                <p class="coin-history"><strong>Historical Context:</strong> ${c.history}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderScriptDecoder() {
    const grid = document.getElementById('script-grid');
    if (!grid || typeof SCRIPT_DECODER_ITEMS === 'undefined') return;

    grid.innerHTML = SCRIPT_DECODER_ITEMS.map(
        s => `
        <div class="script-card">
            <div class="script-char">${s.character}</div>
            <div class="script-type">${s.scriptType}</div>
            <p>${s.meaning}</p>
        </div>
    `
    ).join('');
}

function renderSymbols() {
    const grid = document.getElementById('symbols-grid');
    if (!grid || typeof SYMBOL_HOTSPOTS === 'undefined') return;

    grid.innerHTML = SYMBOL_HOTSPOTS.map(
        sym => `
        <div class="symbol-card">
            <h3>🔱 ${sym.symbol}</h3>
            <p><strong>Meaning:</strong> ${sym.meaning}</p>
            <p class="symbol-loc"><strong>Location:</strong> ${sym.location}</p>
        </div>
    `
    ).join('');
}

function renderTerritories() {
    const grid = document.getElementById('territory-grid');
    if (!grid || typeof TERRITORY_MAP_REGIONS === 'undefined') return;

    grid.innerHTML = TERRITORY_MAP_REGIONS.map(
        t => `
        <div class="territory-card">
            <h3>🗺️ ${t.region}</h3>
            <p><strong>Capital/Seat:</strong> ${t.capital}</p>
            <p><strong>Primary Coinage:</strong> ${t.mainCoin}</p>
        </div>
    `
    ).join('');
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || typeof TIMELINE_EVENTS === 'undefined') return;

    container.innerHTML = TIMELINE_EVENTS.map(
        item => `
        <div class="timeline-card">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderReferences() {
    const list = document.getElementById('references-list');
    if (!list || typeof REFERENCES === 'undefined') return;

    list.innerHTML = REFERENCES.map(
        r => `
        <li>
            <a href="${r.link}" target="_blank" rel="noopener noreferrer">📚 ${r.text}</a>
        </li>
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
