document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderHistory();
    renderLines();
    renderGallery();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof RAILWAYS_INFO === 'undefined') return;

    grid.innerHTML = RAILWAYS_INFO.quickStats
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

function renderHistory() {
    if (typeof ENGINEERING_MARVELS === 'undefined') return;
    const overviewEl = document.getElementById('rail-overview');
    const mechEl = document.getElementById('rail-mechanisms');
    const statusEl = document.getElementById('rail-status');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${ENGINEERING_MARVELS.overview}`;
    if (mechEl) mechEl.innerHTML = `<strong>Engineering Innovations:</strong> ${ENGINEERING_MARVELS.mechanisms}`;
    if (statusEl) statusEl.innerHTML = `<strong>Conservation Status:</strong> ${ENGINEERING_MARVELS.conservationStatus}`;
}

function renderLines() {
    const grid = document.getElementById('lines-grid');
    if (!grid || typeof MOUNTAIN_RAILWAYS === 'undefined') return;

    grid.innerHTML = MOUNTAIN_RAILWAYS.map(
        line => `
        <div class="line-card">
            <img src="${line.image}" alt="${line.name}" loading="lazy" />
            <div class="line-card-body">
                <div class="line-header">
                    <h3>${line.name} ${line.icon}</h3>
                    <span class="unesco-badge">UNESCO (${line.unescoYear})</span>
                </div>
                <p class="route-lbl"><strong>Route:</strong> ${line.route} (${line.length})</p>
                <p class="gauge-lbl"><strong>Gauge:</strong> ${line.gauge} | <strong>Highest:</strong> ${line.highestPoint}</p>
                <p>${line.description}</p>
                <div class="highlights-box">
                    <strong>Engineering Highlights:</strong>
                    <ul>
                        ${line.highlights.map(h => `<li>✨ ${h}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `
    ).join('');
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_IMAGES === 'undefined') return;

    grid.innerHTML = GALLERY_IMAGES.map(
        img => `
        <div class="gallery-card">
            <img src="${img.url}" alt="${img.caption}" loading="lazy" />
            <p>${img.caption}</p>
        </div>
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
