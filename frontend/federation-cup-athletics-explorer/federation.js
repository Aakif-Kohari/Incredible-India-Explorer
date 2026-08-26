document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderDisciplineFilters();
    renderDisciplines();
    renderAthletes();
    renderRecords();
    renderTimeline();
    renderVenues();
    renderReferences();
    initThemeToggle();
    initMobileMenu();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof FEDERATION_INFO === 'undefined') return;

    grid.innerHTML = FEDERATION_INFO.quickStats
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

let activeDiscipline = 'all';

function renderDisciplineFilters() {
    const container = document.getElementById('discipline-filter');
    if (!container || typeof DISCIPLINES === 'undefined') return;

    const allBtn = `<button class="filter-btn active" data-discipline="all">All Disciplines</button>`;
    const categoryBtns = DISCIPLINES.map(
        d => `<button class="filter-btn" data-discipline="${d.category}">${d.icon} ${d.category}</button>`
    ).join('');

    container.innerHTML = allBtn + categoryBtns;

    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeDiscipline = btn.dataset.discipline;
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterDisciplines();
        });
    });
}

function renderDisciplines() {
    const grid = document.getElementById('disciplines-grid');
    if (!grid || typeof DISCIPLINES === 'undefined') return;

    grid.innerHTML = DISCIPLINES.map(
        d => `
        <div class="discipline-card" data-category="${d.category}">
            <span class="discipline-icon">${d.icon}</span>
            <h3>${d.category}</h3>
            <p>${d.description}</p>
            <div class="event-tags">
                ${d.events.map(e => `<span class="event-tag">${e}</span>`).join('')}
            </div>
        </div>
    `
    ).join('');
}

function filterDisciplines() {
    const cards = document.querySelectorAll('.discipline-card');
    cards.forEach(card => {
        if (activeDiscipline === 'all' || card.dataset.category === activeDiscipline) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function renderAthletes() {
    const grid = document.getElementById('athletes-grid');
    if (!grid || typeof MAJOR_ATHLETES === 'undefined') return;

    grid.innerHTML = MAJOR_ATHLETES.map(
        a => `
        <div class="athlete-card">
            <div class="athlete-card-header">
                <span class="athlete-name">🏆 ${a.name}</span>
                <span class="athlete-discipline-tag">${a.discipline}</span>
            </div>
            <p><strong>Achievement:</strong> ${a.achievement}</p>
            <p><strong>Federation Cup:</strong> ${a.federationCup}</p>
            <div class="athlete-highlight">⭐ ${a.highlight}</div>
        </div>
    `
    ).join('');
}

function renderRecords() {
    const grid = document.getElementById('records-grid');
    if (!grid || typeof RECORDS === 'undefined') return;

    grid.innerHTML = RECORDS.map(
        r => `
        <div class="record-card">
            <div class="record-event">🏅 ${r.event}</div>
            <div class="record-value">${r.record}</div>
            <div class="record-athlete">${r.athlete} (${r.year})</div>
            <div class="record-note">${r.note} — Venue: ${r.venue}</div>
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

function renderVenues() {
    const grid = document.getElementById('venues-grid');
    if (!grid || typeof VENUES === 'undefined') return;

    grid.innerHTML = VENUES.map(
        v => `
        <div class="venue-card">
            <div class="venue-location">📍 ${v.location}</div>
            <h3>🏟️ ${v.name}</h3>
            <p>${v.significance}</p>
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

    const savedTheme = localStorage.getItem('theme') || 'dark';
    toggleBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('open');
    });
}
