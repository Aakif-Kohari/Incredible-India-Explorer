document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderEducation();
    renderInfrastructure();
    renderCulture();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof WADIYAR_INFO === 'undefined') return;

    grid.innerHTML = WADIYAR_INFO.quickStats
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

function renderEducation() {
    const grid = document.getElementById('education-grid');
    if (!grid || typeof EDUCATION_INSTITUTIONS === 'undefined') return;

    grid.innerHTML = EDUCATION_INSTITUTIONS.map(
        e => `
        <div class="edu-card">
            <span class="category-tag">${e.category}</span>
            <h3>🎓 ${e.name}</h3>
            <p><strong>Established:</strong> ${e.establishedYear}</p>
            <p>${e.contribution}</p>
        </div>
    `
    ).join('');
}

function renderInfrastructure() {
    const grid = document.getElementById('infra-grid');
    if (!grid || typeof INFRASTRUCTURE_PROJECTS === 'undefined') return;

    grid.innerHTML = INFRASTRUCTURE_PROJECTS.map(
        i => `
        <div class="infra-card">
            <span class="infra-icon">${i.icon}</span>
            <h3>${i.title}</h3>
            <p>${i.impact}</p>
        </div>
    `
    ).join('');
}

function renderCulture() {
    const grid = document.getElementById('culture-grid');
    if (!grid || typeof CULTURAL_HERITAGE === 'undefined') return;

    grid.innerHTML = CULTURAL_HERITAGE.map(
        c => `
        <div class="culture-card">
            <h3>🏰 ${c.title}</h3>
            <p>${c.description}</p>
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
