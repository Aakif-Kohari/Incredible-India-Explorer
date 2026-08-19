document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderMonuments();
    renderVatapiCampaign();
    renderForeignRelations();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof NARASIMHAVARMAN_INFO === 'undefined') return;

    grid.innerHTML = NARASIMHAVARMAN_INFO.quickStats
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

function renderMonuments() {
    const grid = document.getElementById('monuments-grid');
    if (!grid || typeof MAMALLAPURAM_MONUMENTS === 'undefined') return;

    grid.innerHTML = MAMALLAPURAM_MONUMENTS.map(
        m => `
        <div class="monument-card">
            <span class="style-tag">${m.style}</span>
            <h3>🛕 ${m.title}</h3>
            <p>${m.description}</p>
            <p class="sig-text"><strong>Architectural Impact:</strong> ${m.significance}</p>
        </div>
    `
    ).join('');
}

function renderVatapiCampaign() {
    const grid = document.getElementById('vatapi-grid');
    if (!grid || typeof VATAPI_CAMPAIGN === 'undefined') return;

    grid.innerHTML = VATAPI_CAMPAIGN.map(
        v => `
        <div class="vatapi-card">
            <h3>⚔️ ${v.stage}</h3>
            <p>${v.detail}</p>
        </div>
    `
    ).join('');
}

function renderForeignRelations() {
    const grid = document.getElementById('foreign-grid');
    if (!grid || typeof FOREIGN_RELATIONS === 'undefined') return;

    grid.innerHTML = FOREIGN_RELATIONS.map(
        f => `
        <div class="foreign-card">
            <h3>🌏 ${f.title}</h3>
            <p>${f.record}</p>
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
