document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTreatises();
    renderBhojpurCard();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof BHOJA_INFO === 'undefined') return;

    grid.innerHTML = BHOJA_INFO.quickStats
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

function renderTreatises() {
    const grid = document.getElementById('treatises-grid');
    if (!grid || typeof SCHOLARLY_TREATISES === 'undefined') return;

    grid.innerHTML = SCHOLARLY_TREATISES.map(
        t => `
        <div class="treatise-card">
            <span class="status-tag">${t.attributionStatus}</span>
            <h3>📖 ${t.title}</h3>
            <p><strong>Discipline:</strong> ${t.discipline}</p>
            <p>${t.summary}</p>
        </div>
    `
    ).join('');
}

function renderBhojpurCard() {
    const card = document.getElementById('bhojpur-card');
    if (!card || typeof BHOJPUR_ARCHITECTURE === 'undefined') return;

    card.innerHTML = `
        <div class="bhojpur-inner">
            <h3>🛕 ${BHOJPUR_ARCHITECTURE.templeName}</h3>
            <p><strong>Monolithic Lingam Dimensions:</strong> ${BHOJPUR_ARCHITECTURE.lingamDimensions}</p>
            <ul class="notes-list">
                ${BHOJPUR_ARCHITECTURE.architectureNotes.map(n => `<li>✨ ${n}</li>`).join('')}
            </ul>
        </div>
    `;
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
