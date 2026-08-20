document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderComponents();
    renderScholars();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof NALANDA_INFO === 'undefined') return;

    grid.innerHTML = NALANDA_INFO.quickStats
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

function renderComponents() {
    const grid = document.getElementById('components-grid');
    if (!grid || typeof CAMPUS_COMPONENTS === 'undefined') return;

    grid.innerHTML = CAMPUS_COMPONENTS.map(
        c => `
        <div class="component-card">
            <div class="card-header">
                <h3>${c.icon} ${c.name}</h3>
                <span class="cat-tag">${c.category}</span>
            </div>
            <p>${c.description}</p>
        </div>
    `
    ).join('');
}

function renderScholars() {
    const grid = document.getElementById('scholars-grid');
    if (!grid || typeof CELEBRATED_SCHOLARS === 'undefined') return;

    grid.innerHTML = CELEBRATED_SCHOLARS.map(
        s => `
        <div class="scholar-card">
            <div class="card-header">
                <h3>${s.icon} ${s.name}</h3>
                <span class="origin-tag">${s.origin}</span>
            </div>
            <p>${s.contribution}</p>
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
