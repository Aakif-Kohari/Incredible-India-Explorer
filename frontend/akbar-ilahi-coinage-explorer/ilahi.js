document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCoins();
    initConverter();
    renderMonths();
    renderHotspots();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof AKBAR_INFO === 'undefined') return;

    grid.innerHTML = AKBAR_INFO.quickStats
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
    if (!grid || typeof COIN_TYPES === 'undefined') return;

    grid.innerHTML = COIN_TYPES.map(
        c => `
        <div class="coin-card">
            <h3>🪙 ${c.name}</h3>
            <p><strong>Mint:</strong> ${c.mint}</p>
            <p><strong>Metal & Weight:</strong> ${c.metal}</p>
            <p><strong>Shape:</strong> ${c.shape}</p>
            <p><strong>Obverse:</strong> <em>"${c.obverseText}"</em></p>
            <p><strong>Reverse:</strong> <em>"${c.reverseText}"</em></p>
            <p class="coin-sig"><strong>Significance:</strong> ${c.significance}</p>
        </div>
    `
    ).join('');
}

function initConverter() {
    const btn = document.getElementById('btn-convert');
    const input = document.getElementById('regnal-year-input');
    const result = document.getElementById('convert-result');
    if (!btn || !input || !result) return;

    btn.addEventListener('click', () => {
        const ry = parseInt(input.value, 10);
        if (isNaN(ry) || ry < 1 || ry > 50) {
            result.textContent = 'Please enter a valid Regnal Year between 1 and 50.';
            return;
        }
        const gYear = 1555 + ry;
        result.innerHTML = `✨ <strong>Ilahi Regnal Year ${ry}</strong> corresponds to approximately <strong>${gYear} CE</strong> in the Gregorian calendar.`;
    });
}

function renderMonths() {
    const grid = document.getElementById('months-grid');
    if (!grid || typeof ILAHI_MONTHS === 'undefined') return;

    grid.innerHTML = ILAHI_MONTHS.map(
        m => `
        <div class="month-card">
            <h3>☀️ ${m.name}</h3>
            <p><strong>Gregorian:</strong> ${m.gregorianEquivalent}</p>
            <p><strong>Season:</strong> ${m.season}</p>
        </div>
    `
    ).join('');
}

function renderHotspots() {
    const grid = document.getElementById('hotspots-grid');
    if (!grid || typeof INSCRIPTION_HOTSPOTS === 'undefined') return;

    grid.innerHTML = INSCRIPTION_HOTSPOTS.map(
        h => `
        <div class="hotspot-card">
            <h3>✨ ${h.phrase}</h3>
            <p><strong>Literal Translation:</strong> ${h.literalMeaning}</p>
            <p><strong>Historical Context:</strong> ${h.context}</p>
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
