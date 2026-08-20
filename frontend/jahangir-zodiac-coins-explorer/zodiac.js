document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderZodiacSelector();
    selectZodiacSign('aries');
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof JAHANGIR_INFO === 'undefined') return;

    grid.innerHTML = JAHANGIR_INFO.quickStats
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

function renderZodiacSelector() {
    const grid = document.getElementById('zodiac-selector-grid');
    if (!grid || typeof ZODIAC_SIGNS === 'undefined') return;

    grid.innerHTML = ZODIAC_SIGNS.map(
        z => `
        <button class="zodiac-btn" id="btn-zodiac-${z.id}" onclick="selectZodiacSign('${z.id}')">
            <span class="zodiac-icon">${z.symbol.split(' ')[0]}</span>
            <span class="zodiac-title">${z.name.split(' ')[0]}</span>
        </button>
    `
    ).join('');
}

window.selectZodiacSign = function (id) {
    if (typeof ZODIAC_SIGNS === 'undefined') return;

    // Update active button
    document.querySelectorAll('.zodiac-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.getElementById(`btn-zodiac-${id}`);
    if (targetBtn) targetBtn.classList.add('active');

    // Find sign data
    const sign = ZODIAC_SIGNS.find(z => z.id === id);
    if (!sign) return;

    // Update detail card
    const nameEl = document.getElementById('detail-name');
    const monthEl = document.getElementById('detail-month');
    const symbolEl = document.getElementById('detail-symbol');
    const metalEl = document.getElementById('detail-metal');
    const mintEl = document.getElementById('detail-mint');
    const obverseEl = document.getElementById('detail-obverse');
    const reverseEl = document.getElementById('detail-reverse');
    const historyEl = document.getElementById('detail-history');

    if (nameEl) nameEl.textContent = sign.name;
    if (monthEl) monthEl.innerHTML = `<strong>Solar Month:</strong> ${sign.month}`;
    if (symbolEl) symbolEl.innerHTML = `<strong>Astrological Symbol:</strong> ${sign.symbol}`;
    if (metalEl) metalEl.innerHTML = `<strong>Coin Metals:</strong> ${sign.metal}`;
    if (mintEl) mintEl.innerHTML = `<strong>Mint & Regnal Year:</strong> ${sign.mint}`;
    if (obverseEl) obverseEl.innerHTML = `<strong>Obverse Imagery:</strong> ${sign.obverseDescription}`;
    if (reverseEl) reverseEl.innerHTML = `<strong>Reverse Persian Inscription:</strong> <em>"${sign.reverseInscription}"</em>`;
    if (historyEl) historyEl.innerHTML = `<strong>Historical Context:</strong> ${sign.history}`;
};

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
