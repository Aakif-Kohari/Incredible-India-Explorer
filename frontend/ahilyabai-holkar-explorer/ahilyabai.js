document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderSections();
    renderArchitecturalWorks();
    renderMapSites();
    renderTimeline();
    renderSources();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof AHILYABAI_INFO === 'undefined') return;

    grid.innerHTML = AHILYABAI_INFO.quickStats
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

function renderSections() {
    const grid = document.getElementById('sections-grid');
    if (!grid || typeof AHILYABAI_SECTIONS === 'undefined') return;

    grid.innerHTML = AHILYABAI_SECTIONS.map(
        sec => `
        <div class="info-card" id="${sec.id}">
            <h3>${sec.icon} ${sec.title}</h3>
            <div class="card-summary">${sec.summary}</div>
            <ul class="card-details-list">
                ${sec.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </div>
    `
    ).join('');
}

function renderArchitecturalWorks() {
    const grid = document.getElementById('works-grid');
    if (!grid || typeof MAJOR_ARCHITECTURAL_WORKS === 'undefined') return;

    grid.innerHTML = MAJOR_ARCHITECTURAL_WORKS.map(
        w => `
        <div class="work-card">
            <h3>🛕 ${w.site}</h3>
            <div class="work-loc">📍 ${w.location}</div>
            <div class="work-yr">📅 ${w.year}</div>
            <p>${w.contribution}</p>
        </div>
    `
    ).join('');
}

function renderMapSites() {
    const grid = document.getElementById('map-grid');
    if (!grid || typeof HOLKAR_TERRITORY_MAP_SITES === 'undefined') return;

    grid.innerHTML = HOLKAR_TERRITORY_MAP_SITES.map(
        site => `
        <div class="map-card">
            <h3>🚩 ${site.name}</h3>
            <div class="map-region">${site.region}</div>
            <div class="map-role">${site.role}</div>
            <p>${site.desc}</p>
        </div>
    `
    ).join('');
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || typeof AHILYABAI_TIMELINE === 'undefined') return;

    container.innerHTML = AHILYABAI_TIMELINE.map(
        item => `
        <div class="timeline-card">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderSources() {
    const list = document.getElementById('sources-list');
    if (!list || typeof AHILYABAI_SOURCES === 'undefined') return;

    list.innerHTML = AHILYABAI_SOURCES.map(
        src => `
        <li class="source-item">
            <div class="source-title">📖 ${src.work}</div>
            <div class="source-meta"><strong>Author:</strong> ${src.author} (${src.year})</div>
            <div class="source-note">${src.note}</div>
        </li>
    `
    ).join('');
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        toggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    });
}
