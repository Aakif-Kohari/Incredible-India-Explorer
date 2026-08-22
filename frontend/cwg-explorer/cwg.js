document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderEditions();
    renderAthletes();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof CWG_INFO === 'undefined') return;

    grid.innerHTML = CWG_INFO.quickStats
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

function renderEditions() {
    const grid = document.getElementById('editions-grid');
    if (!grid || typeof CWG_EDITIONS === 'undefined') return;

    grid.innerHTML = CWG_EDITIONS.map(
        e => `
        <div class="edition-card">
            <div class="card-header">
                <h3>🏅 ${e.year} (${e.city})</h3>
                <span class="total-badge">Total: ${e.total}</span>
            </div>
            <div class="medals-row">
                <span class="badge-gold">🥇 ${e.gold} Gold</span>
                <span class="badge-silver">🥈 ${e.silver} Silver</span>
                <span class="badge-bronze">🥉 ${e.bronze} Bronze</span>
            </div>
            <p class="highlights-text">${e.highlights}</p>
        </div>
    `
    ).join('');
}

function renderAthletes() {
    const grid = document.getElementById('athletes-grid');
    if (!grid || typeof LEGENDARY_ATHLETES === 'undefined') return;

    grid.innerHTML = LEGENDARY_ATHLETES.map(
        a => `
        <div class="athlete-card">
            <div class="card-header">
                <h3>${a.icon} ${a.name}</h3>
                <span class="sport-tag">${a.sport}</span>
            </div>
            <p class="medal-tally"><strong>Medals:</strong> ${a.medal}</p>
            <p>${a.description}</p>
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
