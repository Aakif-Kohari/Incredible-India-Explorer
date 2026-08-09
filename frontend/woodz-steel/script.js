import { WOOTZ_DATA } from './wootz-steel-data.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderStats();
    renderHeroImage();
    renderHistory();
    renderProcess();
    renderBeforeAfter();
    renderModernApplications();
    renderGallery();
    renderReferences();
    renderFacts();
});

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

function initNavbar() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container || !WOOTZ_DATA.stats) return;

    container.innerHTML = WOOTZ_DATA.stats
        .map(
            (stat) => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

function renderHeroImage() {
    const wrap = document.getElementById('hero-image-wrap');
    if (!wrap || !WOOTZ_DATA.heroImage) return;

    wrap.innerHTML = `
        <img src="${WOOTZ_DATA.heroImage.url}" alt="${WOOTZ_DATA.heroImage.caption}" loading="lazy" />
        <figcaption>${WOOTZ_DATA.heroImage.caption}</figcaption>
    `;
}

function renderHistory() {
    const title = document.getElementById('history-title');
    const content = document.getElementById('history-content');
    if (title) title.textContent = WOOTZ_DATA.history.title;
    if (content) content.textContent = WOOTZ_DATA.history.content;
}

function renderProcess() {
    const title = document.getElementById('process-title');
    const content = document.getElementById('process-content');
    const diagram = document.getElementById('process-diagram');

    if (title) title.textContent = WOOTZ_DATA.productionProcess.title;
    if (content) content.textContent = WOOTZ_DATA.productionProcess.content;

    if (diagram && WOOTZ_DATA.productionProcess.steps) {
        diagram.innerHTML = WOOTZ_DATA.productionProcess.steps
            .map(
                (s, index, arr) => `
            <div class="process-step">
                <div class="step-number">${s.step}</div>
                <div class="step-body">
                    <h4>${s.title}</h4>
                    <p>${s.detail}</p>
                </div>
            </div>
            ${index < arr.length - 1 ? '<div class="step-connector" aria-hidden="true"></div>' : ''}
        `
            )
            .join('');
    }

    const processImageWrap = document.getElementById('process-image-wrap');
    if (processImageWrap && WOOTZ_DATA.processImage) {
        processImageWrap.innerHTML = `
            <img src="${WOOTZ_DATA.processImage.url}" alt="${WOOTZ_DATA.processImage.caption}" loading="lazy" />
            <figcaption>${WOOTZ_DATA.processImage.caption}</figcaption>
        `;
    }
}

function renderBeforeAfter() {
    const title = document.getElementById('before-after-title');
    const beforeTitle = document.getElementById('before-title');
    const afterTitle = document.getElementById('after-title');
    const beforePoints = document.getElementById('before-points');
    const afterPoints = document.getElementById('after-points');

    if (title) title.textContent = WOOTZ_DATA.beforeAfter.title;
    if (beforeTitle) beforeTitle.textContent = WOOTZ_DATA.beforeAfter.before.title;
    if (afterTitle) afterTitle.textContent = WOOTZ_DATA.beforeAfter.after.title;

    if (beforePoints) {
        beforePoints.innerHTML = WOOTZ_DATA.beforeAfter.before.points
            .map((p) => `<li>${p}</li>`)
            .join('');
    }

    if (afterPoints) {
        afterPoints.innerHTML = WOOTZ_DATA.beforeAfter.after.points
            .map((p) => `<li>${p}</li>`)
            .join('');
    }
}

function renderModernApplications() {
    const title = document.getElementById('modern-title');
    const content = document.getElementById('modern-content');
    if (title) title.textContent = WOOTZ_DATA.modernApplications.title;
    if (content) content.textContent = WOOTZ_DATA.modernApplications.content;
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || !WOOTZ_DATA.gallery) return;

    container.innerHTML = WOOTZ_DATA.gallery
        .map(
            (g) => `
        <div class="gallery-card">
            <img src="${g.url}" alt="${g.title}" loading="lazy" />
            <div class="gallery-info">
                <h4>${g.title}</h4>
                <p>${g.caption}</p>
            </div>
        </div>
    `
        )
        .join('');
}

function renderReferences() {
    const container = document.getElementById('references-list');
    if (!container || !WOOTZ_DATA.references) return;

    container.innerHTML = WOOTZ_DATA.references
        .map(
            (ref) => `
        <a class="reference-card" href="${ref.url}" target="_blank" rel="noopener noreferrer">
            <h4>${ref.title}</h4>
            <span class="reference-source">${ref.source}</span>
        </a>
    `
        )
        .join('');
}

function renderFacts() {
    const container = document.getElementById('facts-grid');
    if (!container || !WOOTZ_DATA.facts) return;

    container.innerHTML = WOOTZ_DATA.facts
        .map((f) => `<div class="trivia-box">💡 ${f}</div>`)
        .join('');
}