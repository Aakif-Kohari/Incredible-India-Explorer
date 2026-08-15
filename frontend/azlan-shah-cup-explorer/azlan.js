document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderGoldCampaigns();
    renderMedals();
    renderLegends();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof AZLAN_INFO === 'undefined') return;

    grid.innerHTML = AZLAN_INFO.quickStats
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

function renderGoldCampaigns() {
    const grid = document.getElementById('gold-grid');
    if (!grid || typeof INDIA_GOLD_CAMPAIGNS === 'undefined') return;

    grid.innerHTML = INDIA_GOLD_CAMPAIGNS.map(
        c => `
        <div class="gold-card">
            <div class="card-header">
                <h3>🥇 ${c.year} (${c.edition})</h3>
                <span class="score-badge">${c.finalScore}</span>
            </div>
            <p>${c.highlight}</p>
        </div>
    `
    ).join('');
}

function renderMedals() {
    const grid = document.getElementById('medals-grid');
    if (!grid || typeof MEDAL_RECORD === 'undefined') return;

    grid.innerHTML = MEDAL_RECORD.map(
        m => `
        <div class="medal-card">
            <h3>🏅 ${m.type}</h3>
            <p><strong>Editions Won:</strong> ${m.years}</p>
        </div>
    `
    ).join('');
}

function renderLegends() {
    const grid = document.getElementById('legends-grid');
    if (!grid || typeof NOTABLE_LEGENDS === 'undefined') return;

    grid.innerHTML = NOTABLE_LEGENDS.map(
        l => `
        <div class="legend-card">
            <span class="role-tag">${l.role}</span>
            <h3>${l.icon} ${l.name}</h3>
            <p>${l.achievements}</p>
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
