/* =========================================================================
   Kerala Mural Explorer — Script Module
   Issue #1697
   Handles: tab navigation, theme toggle, bookmark, history / pigments /
   temples / gallery rendering, gallery filters, references rendering,
   lightbox, and the interactive mural visualizer (canvas painting +
   traditional deity/motif stamps).
   ========================================================================= */

function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    renderInfo();
    renderHistory();
    renderPigments();
    renderTemples();
    renderGalleryFilters();
    renderGallery('all');
    renderReferences();
    initLightbox();
    initVisualizer();
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

    try {
        const bookmarks = JSON.parse(localStorage.getItem('kerala_bookmarked') || 'false');
        if (bookmarks) {
            btn.textContent = '✓ Bookmarked';
            btn.setAttribute('aria-pressed', 'true');
        }
    } catch (e) { /* localStorage may be unavailable */ }

    btn.addEventListener('click', () => {
        try {
            const isBookmarked = JSON.parse(localStorage.getItem('kerala_bookmarked') || 'false');
            const newState = !isBookmarked;
            localStorage.setItem('kerala_bookmarked', JSON.stringify(newState));
            btn.textContent = newState ? '✓ Bookmarked' : '🔖 Bookmark to My Journey';
            btn.setAttribute('aria-pressed', newState ? 'true' : 'false');
        } catch (e) {
            console.error('Failed to toggle bookmark:', e);
        }
    });
}

// ── Render: Info ─────────────────────────────────────────────────
function renderInfo() {
    return window.KERALA_DATA && window.KERALA_DATA.info;
}

// ── Render: History ──────────────────────────────────────────────
function renderHistory() {
    const container = document.getElementById('history-content');
    if (!container || !window.KERALA_DATA) return;
    const items = window.KERALA_DATA.history || [];
    container.innerHTML = items.map(item => `
        <div class="history-item">
            <h3>${escapeHtml(item.heading)}</h3>
            <p>${escapeHtml(item.body)}</p>
        </div>
    `).join('');
}

// ── Render: Pigments ─────────────────────────────────────────────
function renderPigments() {
    const container = document.getElementById('pigments-grid');
    if (!container || !window.KERALA_DATA) return;
    const pigments = window.KERALA_DATA.pigments || [];
    container.innerHTML = pigments.map(p => `
        <article class="pigment-card">
            <img src="${escapeAttr(p.imageUrl)}" alt="${escapeAttr(p.name)} — natural pigment" loading="lazy" />
            <div class="pigment-card-body">
                <h3><span class="pigment-color-swatch" style="background-color: ${escapeAttr(p.color)};" aria-hidden="true"></span>${escapeHtml(p.name)}</h3>
                <p>${escapeHtml(p.description)}</p>
            </div>
        </article>
    `).join('');
}

// ── Render: Temples ──────────────────────────────────────────────
function renderTemples() {
    const container = document.getElementById('temples-grid');
    if (!container || !window.KERALA_DATA) return;
    const temples = window.KERALA_DATA.temples || [];
    container.innerHTML = temples.map(t => `
        <article class="temple-card">
            <img src="${escapeAttr(t.imageUrl)}" alt="${escapeAttr(t.name)} — Kerala temple mural" loading="lazy" />
            <div class="temple-card-body">
                <div class="temple-meta">${escapeHtml(t.location)} · ${escapeHtml(t.era)}</div>
                <h3>${escapeHtml(t.name)}</h3>
                <p>${escapeHtml(t.description)}</p>
            </div>
        </article>
    `).join('');
}

// ── Render: Gallery Filters ───────────────────────────────────────
function renderGalleryFilters() {
    const container = document.getElementById('gallery-filters');
    if (!container || !window.KERALA_DATA) return;
    const categories = window.KERALA_DATA.galleryCategories || [];
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
    if (!container || !window.KERALA_DATA) return;
    const items = (window.KERALA_DATA.gallery || []).filter(item =>
        category === 'all' || item.category === category
    );
    container.innerHTML = items.map(g => `
        <article class="gallery-card" data-image="${escapeAttr(g.imageUrl)}" data-title="${escapeAttr(g.title)}" data-caption="${escapeAttr(g.description)}">
            <img src="${escapeAttr(g.imageUrl)}" alt="${escapeAttr(g.title)} — Kerala mural" loading="lazy" />
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
    if (!container || !window.KERALA_DATA) return;
    const refs = window.KERALA_DATA.references || [];
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
        if (card.dataset.lightboxBound === 'true') return;
        card.dataset.lightboxBound = 'true';
        card.addEventListener('click', () => {
            imgEl.src = card.dataset.image || '';
            imgEl.alt = card.dataset.title || 'Kerala mural';
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
        closeBtn.onclick = closeLightbox;
    }
    modal.onclick = (e) => {
        if (e.target === modal) closeLightbox();
    };
    document.onkeydown = (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeLightbox();
    };
}

// ── Interactive Mural Visualizer ──────────────────────────────────
function initVisualizer() {
    const canvas = document.getElementById('kerala-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Setup canvas for high-DPI displays ──────────────────────
    function setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        // Fill with a base lime-plaster colour.
        ctx.fillStyle = '#e8e0c8';
        ctx.fillRect(0, 0, rect.width, rect.height);
        // Add subtle texture.
        for (let i = 0; i < 300; i++) {
            ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '180, 160, 120' : '60, 40, 20'}, 0.05)`;
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            const r = Math.random() * 6;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    setupCanvas();

    // ── State ────────────────────────────────────────────────────
    let isDrawing = false;
    let currentTool = 'brush';
    let currentColor = '#c0392b'; // temple red default
    let brushSize = 8;
    let lastX = 0;
    let lastY = 0;

    // ── Build the colour palette ────────────────────────────────
    const paletteEl = document.getElementById('color-palette');
    const pigments = (window.KERALA_DATA && window.KERALA_DATA.pigments) || [];
    paletteEl.innerHTML = pigments.map((p, i) => `
        <button
            type="button"
            class="color-swatch${i === 0 ? ' active' : ''}"
            style="background-color: ${escapeAttr(p.color)};"
            data-color="${escapeAttr(p.color)}"
            data-name="${escapeAttr(p.name)}"
            aria-label="${escapeAttr(p.name)}"
            aria-pressed="${i === 0 ? 'true' : 'false'}"
        ></button>
    `).join('');

    paletteEl.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            paletteEl.querySelectorAll('.color-swatch').forEach(s => {
                s.classList.remove('active');
                s.setAttribute('aria-pressed', 'false');
            });
            swatch.classList.add('active');
            swatch.setAttribute('aria-pressed', 'true');
            currentColor = swatch.dataset.color;
        });
    });

    // ── Tool selection ──────────────────────────────────────────
    const toolSelect = document.getElementById('tool-select');
    toolSelect.addEventListener('change', (e) => {
        currentTool = e.target.value;
    });

    // ── Brush size ──────────────────────────────────────────────
    const brushSizeInput = document.getElementById('brush-size');
    brushSizeInput.addEventListener('input', (e) => {
        brushSize = parseInt(e.target.value, 10) || 8;
    });

    // ── Drawing helpers ─────────────────────────────────────────
    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    }

    function startDraw(e) {
        e.preventDefault();
        const { x, y } = getCanvasCoords(e);
        lastX = x;
        lastY = y;

        if (currentTool === 'brush') {
            isDrawing = true;
            ctx.fillStyle = currentColor;
            ctx.beginPath();
            ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            stampMotif(currentTool, x, y);
        }
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const { x, y } = getCanvasCoords(e);

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    }

    function endDraw() {
        isDrawing = false;
    }

    // ── Motif stamps ─────────────────────────────────────────────
    function stampMotif(motif, cx, cy) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const size = 50;

        switch (motif) {
            case 'ganesha':
                drawGaneshaMotif(size);
                break;
            case 'lotus':
                drawLotusMotif(size);
                break;
            case 'sun':
                drawSunMotif(size);
                break;
            case 'fish':
                drawFishMotif(size);
                break;
            case 'border':
                drawBorderPattern(size);
                break;
        }

        ctx.restore();
    }

    function drawGaneshaMotif(s) {
        // Head (simplified elephant head)
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.2, s * 0.6, s * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Trunk
        ctx.beginPath();
        ctx.moveTo(0, s * 0.2);
        ctx.quadraticCurveTo(s * 0.2, s * 0.6, 0, s * 0.8);
        ctx.stroke();
        // Ears
        ctx.beginPath();
        ctx.arc(-s * 0.6, -s * 0.2, s * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(s * 0.6, -s * 0.2, s * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        // Eyes (dots)
        ctx.beginPath();
        ctx.arc(-s * 0.2, -s * 0.3, 3, 0, Math.PI * 2);
        ctx.arc(s * 0.2, -s * 0.3, 3, 0, Math.PI * 2);
        ctx.fill();
        // Crown
        ctx.beginPath();
        ctx.moveTo(-s * 0.3, -s * 0.7);
        ctx.lineTo(0, -s);
        ctx.lineTo(s * 0.3, -s * 0.7);
        ctx.stroke();
    }

    function drawLotusMotif(s) {
        // 8-petal lotus
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.ellipse(
                Math.cos(angle) * s * 0.4,
                Math.sin(angle) * s * 0.4,
                s * 0.2,
                s * 0.5,
                angle + Math.PI / 2,
                0,
                Math.PI * 2
            );
            ctx.stroke();
        }
        // Center
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawSunMotif(s) {
        // Outer circle
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        // Rays
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * s * 0.5, Math.sin(angle) * s * 0.5);
            ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
            ctx.stroke();
        }
        // Face (dots for eyes, line for mouth)
        ctx.beginPath();
        ctx.arc(-s * 0.15, -s * 0.1, 3, 0, Math.PI * 2);
        ctx.arc(s * 0.15, -s * 0.1, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, s * 0.15, s * 0.15, 0, Math.PI);
        ctx.stroke();
    }

    function drawFishMotif(s) {
        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Tail
        ctx.beginPath();
        ctx.moveTo(s, 0);
        ctx.lineTo(s * 1.5, -s * 0.3);
        ctx.lineTo(s * 1.5, s * 0.3);
        ctx.closePath();
        ctx.stroke();
        // Eye
        ctx.beginPath();
        ctx.arc(-s * 0.5, -s * 0.1, 3, 0, Math.PI * 2);
        ctx.fill();
        // Scales (decorative)
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(-s * 0.2 + i * s * 0.3, 0, s * 0.15, Math.PI, Math.PI * 2);
            ctx.stroke();
        }
    }

    function drawBorderPattern(s) {
        // Draw a horizontal decorative border at the click point
        const step = s * 0.4;
        for (let i = -3; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(i * step, 0, s * 0.15, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(-3 * step, s * 0.2);
        ctx.lineTo(3 * step, s * 0.2);
        ctx.moveTo(-3 * step, -s * 0.2);
        ctx.lineTo(3 * step, -s * 0.2);
        ctx.stroke();
    }

    // ── Mouse + touch events ────────────────────────────────────
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', endDraw);

    // ── Clear & Save buttons ────────────────────────────────────
    document.getElementById('btn-clear').addEventListener('click', () => {
        setupCanvas();
    });

    document.getElementById('btn-save').addEventListener('click', () => {
        try {
            const link = document.createElement('a');
            link.download = 'my-kerala-mural.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Failed to save canvas:', err);
            alert('Could not save the painting. Your browser may block downloads.');
        }
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
