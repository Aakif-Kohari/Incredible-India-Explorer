document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderScholars();
    renderSources();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof YASHOVARMAN_INFO === 'undefined') return;

    grid.innerHTML = YASHOVARMAN_INFO.quickStats
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

function renderScholars() {
    const grid = document.getElementById('scholars-grid');
    if (!grid || typeof COURT_LITERATURE === 'undefined') return;

    grid.innerHTML = COURT_LITERATURE.map(
        s => `
        <div class="scholar-card">
            <h3>📜 ${s.scholar}</h3>
            <span class="role-tag">${s.role}</span>
            <p><strong>Masterworks:</strong> ${s.works}</p>
            <p>${s.description}</p>
            <p class="quote-text"><em>"${s.quote}"</em></p>
        </div>
    `
    ).join('');
}

function renderSources() {
    const grid = document.getElementById('sources-grid');
    if (!grid || typeof HISTORICAL_SOURCES === 'undefined') return;

    grid.innerHTML = HISTORICAL_SOURCES.map(
        src => `
        <div class="source-card">
            <h3>📖 ${src.title}</h3>
            <span class="type-tag">${src.type}</span>
            <p><strong>Evidence Value:</strong> ${src.reliability}</p>
            <p>${src.summary}</p>
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
