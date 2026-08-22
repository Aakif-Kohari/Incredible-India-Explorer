document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCoins();
    renderInscriptions();
    renderMints();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SIKH_INFO === 'undefined') return;

    grid.innerHTML = SIKH_INFO.quickStats
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

function renderCoins() {
    const grid = document.getElementById('coins-grid');
    if (!grid || typeof COIN_EXAMPLES === 'undefined') return;

    grid.innerHTML = COIN_EXAMPLES.map(
        c => `
        <div class="coin-card">
            <h3>🪙 ${c.name}</h3>
            <span class="coin-mint-tag">Mint: ${c.mint} • ${c.era}</span>
            <p><strong>Metal & Weight:</strong> ${c.metal}</p>
            <p><strong>Obverse Couplet:</strong> <em>"${c.inscription}"</em></p>
            <p><strong>Reverse Inscription:</strong> <em>"${c.reverseText}"</em></p>
            <p><strong>Iconic Motif:</strong> ${c.motif}</p>
            <p class="coin-sig"><strong>Historical Context:</strong> ${c.significance}</p>
        </div>
    `
    ).join('');
}

function renderInscriptions() {
    const grid = document.getElementById('inscriptions-grid');
    if (!grid || typeof INSCRIPTION_BREAKDOWN === 'undefined') return;

    grid.innerHTML = INSCRIPTION_BREAKDOWN.map(
        i => `
        <div class="inscription-card">
            <h3>✨ ${i.phrase}</h3>
            <span class="meaning-tag">Meaning: ${i.meaning}</span>
            <p>${i.significance}</p>
        </div>
    `
    ).join('');
}

function renderMints() {
    const grid = document.getElementById('mints-grid');
    if (!grid || typeof SIKH_MINTS === 'undefined') return;

    grid.innerHTML = SIKH_MINTS.map(
        m => `
        <div class="mint-card">
            <h3>🏛️ ${m.name}</h3>
            <span class="mint-loc">Region: ${m.location}</span>
            <p>${m.description}</p>
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
