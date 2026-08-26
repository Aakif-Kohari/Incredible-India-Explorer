document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderChampions();
    renderPlayers();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SANTOSH_INFO === 'undefined') return;

    grid.innerHTML = SANTOSH_INFO.quickStats
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

function renderChampions() {
    const grid = document.getElementById('champions-grid');
    if (!grid || typeof STATE_CHAMPIONS === 'undefined') return;

    grid.innerHTML = STATE_CHAMPIONS.map(
        c => `
        <div class="champion-card">
            <div class="card-header">
                <h3>🥇 ${c.state}</h3>
                <span class="titles-badge">${c.titles} Titles</span>
            </div>
            <p><strong>Runners-Up:</strong> ${c.runnersUp} times | <strong>Zone:</strong> ${c.region}</p>
            <p class="era-text">${c.notableEra}</p>
        </div>
    `
    ).join('');
}

function renderPlayers() {
    const grid = document.getElementById('players-grid');
    if (!grid || typeof NOTABLE_PLAYERS === 'undefined') return;

    grid.innerHTML = NOTABLE_PLAYERS.map(
        p => `
        <div class="player-card">
            <span class="role-tag">${p.role}</span>
            <h3>⭐ ${p.name}</h3>
            <p><strong>Represented:</strong> ${p.state}</p>
            <p>${p.achievements}</p>
        </div>
    `
    ).join('');
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || typeof TOURNAMENT_MILESTONES === 'undefined') return;

    container.innerHTML = TOURNAMENT_MILESTONES.map(
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
