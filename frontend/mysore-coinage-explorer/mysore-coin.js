document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCoins();
    initConverter();
    renderMints();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof MYSORE_INFO === 'undefined') return;

    grid.innerHTML = MYSORE_INFO.quickStats
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
    if (!grid || typeof COIN_DENOMINATIONS === 'undefined') return;

    grid.innerHTML = COIN_DENOMINATIONS.map(
        c => `
        <div class="coin-card">
            <h3>🪙 ${c.name}</h3>
            <span class="coin-period-tag">${c.period}</span>
            <p><strong>Metal & Weight:</strong> ${c.metal}</p>
            <p><strong>Naming Etymology:</strong> ${c.namedAfter}</p>
            <p><strong>Obverse:</strong> <em>"${c.obverseText}"</em></p>
            <p><strong>Reverse:</strong> <em>"${c.reverseText}"</em></p>
            <p class="coin-sig"><strong>Significance:</strong> ${c.significance}</p>
        </div>
    `
    ).join('');
}

function initConverter() {
    const btn = document.getElementById('btn-convert');
    const input = document.getElementById('mauludi-input');
    const result = document.getElementById('convert-result');
    if (!btn || !input || !result) return;

    btn.addEventListener('click', () => {
        const mYear = parseInt(input.value, 10);
        if (isNaN(mYear) || mYear < 1000 || mYear > 1500) {
            result.textContent = 'Please enter a valid Mauludi Year (e.g. 1216).';
            return;
        }
        // Mauludi era epoch is 571 CE (Prophet birth), reckoned in solar years
        const gYear = mYear + 571 - 571 + (mYear - 1200) + 1772; // formula approximation
        const approxCE = 571 + (mYear - 1) * 0.97; // Solar-lunar adjusted or standard 571 + mYear - 1200
        const calculatedCE = 1772 + (mYear - 1200);
        result.innerHTML = `☀️ <strong>Mauludi Year ${mYear}</strong> corresponds to approximately <strong>${calculatedCE} CE</strong> in the Gregorian calendar.`;
    });
}

function renderMints() {
    const grid = document.getElementById('mints-grid');
    if (!grid || typeof MINTS_LIST === 'undefined') return;

    grid.innerHTML = MINTS_LIST.map(
        m => `
        <div class="mint-card">
            <h3>🏛️ ${m.name}</h3>
            <span class="mint-code">Mint Mark: ${m.code}</span>
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
