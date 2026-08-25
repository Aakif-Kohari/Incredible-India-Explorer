document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderMartandCard();
    renderCampaigns();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof LALITADITYA_INFO === 'undefined') return;

    grid.innerHTML = LALITADITYA_INFO.quickStats
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

function renderMartandCard() {
    const card = document.getElementById('martand-card');
    if (!card || typeof MARTAND_SUN_TEMPLE === 'undefined') return;

    card.innerHTML = `
        <div class="martand-inner">
            <div class="martand-content">
                <h3>☀️ ${MARTAND_SUN_TEMPLE.title}</h3>
                <p><strong>Commissioned:</strong> ${MARTAND_SUN_TEMPLE.builtYear}</p>
                <p><strong>Architectural Synthesis:</strong> ${MARTAND_SUN_TEMPLE.architecturalStyle}</p>
                <p><strong>Principal Deity:</strong> ${MARTAND_SUN_TEMPLE.deity}</p>
                <ul class="highlights-list">
                    ${MARTAND_SUN_TEMPLE.highlights.map(h => `<li>✨ ${h}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function renderCampaigns() {
    const grid = document.getElementById('campaigns-grid');
    if (!grid || typeof CAMPAIGNS_AND_HISTORIOGRAPHY === 'undefined') return;

    grid.innerHTML = CAMPAIGNS_AND_HISTORIOGRAPHY.map(
        c => `
        <div class="campaign-card">
            <span class="category-tag">${c.category}</span>
            <h3>📍 ${c.title}</h3>
            <p>${c.detail}</p>
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
