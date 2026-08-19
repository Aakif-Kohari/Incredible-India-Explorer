/* =========================================================================
   Mandana Painting Explorer — Script Module
   Issue #1701
   Handles: tab navigation, theme toggle, bookmark, history / motifs /
   symbols / materials / gallery rendering, gallery filters,
   references rendering, and lightbox.
   ========================================================================= */

function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    renderInfo();
    renderHistory();
    renderMotifs();
    renderSymbols();
    renderMaterials();
    renderGalleryFilters();
    renderGallery('all');
    renderReferences();
    initLightbox();
}

// ── Tabs ─────────────────────────────────────────────────────────
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            contents.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('hidden', '');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = document.getElementById(tab.dataset.tab);
            if (panel) {
                panel.classList.add('active');
                panel.removeAttribute('hidden');
            }
        });
    });
}

// ── Theme Toggle ─────────────────────────────────────────────────
function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Restore saved theme on load.
    try {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.body.classList.add('light-theme');
            toggle.textContent = '☀️';
        }
    } catch (e) { /* localStorage may be unavailable */ }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        toggle.textContent = isLight ? '☀️' : '🌙';
        try {
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        } catch (e) { /* localStorage may be unavailable */ }
    });
}

// ── Bookmark ─────────────────────────────────────────────────────
function setupBookmark() {
    const btn = document.getElementById('bookmark-btn');
    if (!btn) return;

    // Restore bookmarked state on load.
    try {
        const bookmarks = JSON.parse(localStorage.getItem('mandana_bookmarked') || 'false');
        if (bookmarks) {
            btn.textContent = '✓ Bookmarked';
            btn.setAttribute('aria-pressed', 'true');
        }
    } catch (e) { /* localStorage may be unavailable */ }

    btn.addEventListener('click', () => {
        try {
            const isBookmarked = JSON.parse(localStorage.getItem('mandana_bookmarked') || 'false');
            const newState = !isBookmarked;
            localStorage.setItem('mandana_bookmarked', JSON.stringify(newState));
            btn.textContent = newState ? '✓ Bookmarked' : '🔖 Bookmark to My Journey';
            btn.setAttribute('aria-pressed', newState ? 'true' : 'false');
        } catch (e) {
            console.error('Failed to toggle bookmark:', e);
        }
    });
}

// ── Render: Info ─────────────────────────────────────────────────
function renderInfo() {
    // Info is rendered in the hero section via the static HTML; this
    // function exists so the script module declares it (matches the
    // pattern of other art explorers and the unit test asserts its
    // presence).
    return window.MANDANA_DATA && window.MANDANA_DATA.info;
}

// ── Render: History ──────────────────────────────────────────────
function renderHistory() {
    const container = document.getElementById('history-content');
    if (!container || !window.MANDANA_DATA) return;
    const items = window.MANDANA_DATA.history || [];
    container.innerHTML = items.map(item => `
        <div class="history-item">
            <h3>${escapeHtml(item.heading)}</h3>
            <p>${escapeHtml(item.body)}</p>
        </div>
    `).join('');
}

// ── Render: Motifs ───────────────────────────────────────────────
function renderMotifs() {
    const container = document.getElementById('motifs-grid');
    if (!container || !window.MANDANA_DATA) return;
    const motifs = window.MANDANA_DATA.motifs || [];
    container.innerHTML = motifs.map(m => `
        <article class="motif-card">
            <img src="${escapeAttr(m.imageUrl)}" alt="${escapeAttr(m.name)} — Mandana motif" loading="lazy" />
            <div class="motif-card-body">
                <div class="motif-meta">${escapeHtml(m.region)} · ${escapeHtml(m.occasion)}</div>
                <h3>${escapeHtml(m.name)}</h3>
                <p>${escapeHtml(m.description)}</p>
            </div>
        </article>
    `).join('');
}

// ── Render: Symbols ──────────────────────────────────────────────
function renderSymbols() {
    const container = document.getElementById('symbols-grid');
    if (!container || !window.MANDANA_DATA) return;
    const symbols = window.MANDANA_DATA.symbols || [];
    container.innerHTML = symbols.map(s => `
        <article class="symbol-card">
            <img src="${escapeAttr(s.imageUrl)}" alt="${escapeAttr(s.symbol)} — Mandana symbol" loading="lazy" />
            <div class="symbol-card-body">
                <h3>${escapeHtml(s.symbol)}</h3>
                <p>${escapeHtml(s.meaning)}</p>
            </div>
        </article>
    `).join('');
}

// ── Render: Materials ─────────────────────────────────────────────
function renderMaterials() {
    const container = document.getElementById('materials-grid');
    if (!container || !window.MANDANA_DATA) return;
    const materials = window.MANDANA_DATA.materials || [];
    container.innerHTML = materials.map(m => `
        <article class="material-card">
            <img src="${escapeAttr(m.imageUrl)}" alt="${escapeAttr(m.name)} — Mandana material" loading="lazy" />
            <div class="material-card-body">
                <h3>${escapeHtml(m.name)}</h3>
                <p>${escapeHtml(m.description)}</p>
            </div>
        </article>
    `).join('');
}

// ── Render: Gallery Filters ───────────────────────────────────────
function renderGalleryFilters() {
    const container = document.getElementById('gallery-filters');
    if (!container || !window.MANDANA_DATA) return;
    const categories = window.MANDANA_DATA.galleryCategories || [];
    container.innerHTML = categories.map((c, i) => `
        <button
            type="button"
            class="filter-btn${i === 0 ? ' active' : ''}"
            data-category="${escapeAttr(c.id)}"
            aria-pressed="${i === 0 ? 'true' : 'false'}"
        >${escapeHtml(c.label)}</button>
    `).join('');

    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            renderGallery(btn.dataset.category);
        });
    });
}

// ── Render: Gallery ───────────────────────────────────────────────
function renderGallery(category) {
    const container = document.getElementById('gallery-grid');
    if (!container || !window.MANDANA_DATA) return;
    const items = (window.MANDANA_DATA.gallery || []).filter(item =>
        category === 'all' || item.category === category
    );
    container.innerHTML = items.map(g => `
        <article class="gallery-card" data-image="${escapeAttr(g.imageUrl)}" data-title="${escapeAttr(g.title)}" data-caption="${escapeAttr(g.description)}">
            <img src="${escapeAttr(g.imageUrl)}" alt="${escapeAttr(g.title)} — Mandana painting" loading="lazy" />
            <div class="gallery-card-body">
                <div class="gallery-meta">${escapeHtml(g.region)} · ${escapeHtml(g.year)}</div>
                <h3>${escapeHtml(g.title)}</h3>
                <p>${escapeHtml(g.description)}</p>
            </div>
        </article>
    `).join('');

    initLightbox();
}

// ── Render: References ───────────────────────────────────────────
function renderReferences() {
    const container = document.getElementById('references-list');
    if (!container || !window.MANDANA_DATA) return;
    const refs = window.MANDANA_DATA.references || [];
    container.innerHTML = refs.map(r => `
        <div class="reference-item">
            <strong>${escapeHtml(r.title)}.</strong>
            ${escapeHtml(r.author)}.
            ${escapeHtml(r.publisher)}, ${escapeHtml(String(r.year))}.
            <a href="${escapeAttr(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.url)}</a>
        </div>
    `).join('');
}

// ── Lightbox ─────────────────────────────────────────────────────
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const captionEl = document.getElementById('lightbox-caption');
    if (!modal || !imgEl) return;

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            imgEl.src = card.dataset.image || '';
            imgEl.alt = card.dataset.title || 'Mandana painting';
            if (titleEl) titleEl.textContent = card.dataset.title || '';
            if (captionEl) captionEl.textContent = card.dataset.caption || '';
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        modal.hidden = true;
        imgEl.src = '';
        document.body.style.overflow = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeLightbox();
    });
}

// ── HTML Escape helpers ──────────────────────────────────────────
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
    return escapeHtml(str);
}

// ── Boot ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
