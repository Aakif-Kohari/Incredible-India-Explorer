document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderStages();
    renderPerspectives();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof HANUMAN_LEAP_INFO === 'undefined') return;

    grid.innerHTML = HANUMAN_LEAP_INFO.quickStats
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

function renderStages() {
    const grid = document.getElementById('stages-grid');
    if (!grid || typeof JOURNEY_STAGES === 'undefined') return;

    grid.innerHTML = JOURNEY_STAGES.map(
        s => `
        <div class="stage-card">
            <div class="card-header">
                <h3>${s.icon} ${s.stage}</h3>
            </div>
            <h4 class="stage-sub">${s.title}</h4>
            <p>${s.description}</p>
        </div>
    `
    ).join('');
}

function renderPerspectives() {
    const grid = document.getElementById('perspectives-grid');
    if (!grid || typeof CULTURAL_PERSPECTIVES === 'undefined') return;

    grid.innerHTML = CULTURAL_PERSPECTIVES.map(
        p => `
        <div class="persp-card">
            <div class="card-header">
                <h3>${p.icon} ${p.dimension}</h3>
            </div>
            <p class="persp-focus"><strong>${p.focus}</strong></p>
            <p>${p.description}</p>
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
