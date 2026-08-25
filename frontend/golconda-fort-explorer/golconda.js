document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderStructures();
    renderSieges();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof GOLCONDA_INFO === 'undefined') return;

    grid.innerHTML = GOLCONDA_INFO.quickStats
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

function renderStructures() {
    const grid = document.getElementById('structures-grid');
    if (!grid || typeof ARCHITECTURAL_SECTIONS === 'undefined') return;

    grid.innerHTML = ARCHITECTURAL_SECTIONS.map(
        s => `
        <div class="structure-card">
            <div class="card-header">
                <h3>${s.icon} ${s.name}</h3>
                <span class="category-tag">${s.category}</span>
            </div>
            <p>${s.description}</p>
        </div>
    `
    ).join('');
}

function renderSieges() {
    const grid = document.getElementById('sieges-grid');
    if (!grid || typeof HISTORIC_SIEGES === 'undefined') return;

    grid.innerHTML = HISTORIC_SIEGES.map(
        s => `
        <div class="siege-card">
            <span class="year-tag">${s.year}</span>
            <h3>⚔️ Invader: ${s.invader}</h3>
            <p><strong>Defender:</strong> ${s.defender}</p>
            <p class="outcome-text">${s.outcome}</p>
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
