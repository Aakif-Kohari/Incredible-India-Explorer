/* =========================================================================
   Sohrai Painting Explorer — Script Module
   Issue #1699
   Handles: tab navigation, theme toggle, bookmark, history / pigments /
   motifs / gallery rendering, gallery filters, references rendering,
   lightbox, and the interactive wall-art visualizer (canvas painting +
   traditional motif stamps).
   ========================================================================= */

function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    renderInfo();
    renderHistory();
    renderPigments();
    renderMotifs();
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
        const bookmarks = JSON.parse(localStorage.getItem('sohrai_bookmarked') || 'false');
        if (bookmarks) {
            btn.textContent = '✓ Bookmarked';
            btn.setAttribute('aria-pressed', 'true');
        }
    } catch (e) { /* localStorage may be unavailable */ }

    btn.addEventListener('click', () => {
        try {
            const isBookmarked = JSON.parse(localStorage.getItem('sohrai_bookmarked') || 'false');
            const newState = !isBookmarked;
            localStorage.setItem('sohrai_bookmarked', JSON.stringify(newState));
            btn.textContent = newState ? '✓ Bookmarked' : '🔖 Bookmark to My Journey';
            btn.setAttribute('aria-pressed', newState ? 'true' : 'false');
        } catch (e) {
            console.error('Failed to toggle bookmark:', e);
        }
    });
}

// ── Render: Info ─────────────────────────────────────────────────
function renderInfo() {
    return window.SOHRAI_DATA && window.SOHRAI_DATA.info;
}

// ── Render: History ──────────────────────────────────────────────
function renderHistory() {
    const container = document.getElementById('history-content');
    if (!container || !window.SOHRAI_DATA) return;
    const items = window.SOHRAI_DATA.history || [];
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
    if (!container || !window.SOHRAI_DATA) return;
    const pigments = window.SOHRAI_DATA.pigments || [];
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

// ── Render: Motifs ───────────────────────────────────────────────
function renderMotifs() {
    const container = document.getElementById('motifs-grid');
    if (!container || !window.SOHRAI_DATA) return;
    const motifs = window.SOHRAI_DATA.motifs || [];
    container.innerHTML = motifs.map(m => `
        <article class="motif-card">
            <img src="${escapeAttr(m.imageUrl)}" alt="${escapeAttr(m.name)} — Sohrai motif" loading="lazy" />
            <div class="motif-card-body">
                <div class="motif-meta">${escapeHtml(m.region)} · ${escapeHtml(m.occasion)}</div>
                <h3>${escapeHtml(m.name)}</h3>
                <p>${escapeHtml(m.description)}</p>
            </div>
        </article>
    `).join('');
}

// ── Render: Gallery Filters ───────────────────────────────────────
function renderGalleryFilters() {
    const container = document.getElementById('gallery-filters');
    if (!container || !window.SOHRAI_DATA) return;
    // Check if the container exists — the HTML doesn't have one for this explorer.
    // We'll create it dynamically if needed.
    let filtersEl = container;
    if (!filtersEl) {
        const galleryTab = document.getElementById('gallery');
        if (!galleryTab) return;
        filtersEl = document.createElement('div');
        filtersEl.className = 'gallery-filters';
        filtersEl.id = 'gallery-filters';
        galleryTab.insertBefore(filtersEl, galleryTab.firstChild.nextSibling);
    }
    const categories = window.SOHRAI_DATA.galleryCategories || [];
    filtersEl.innerHTML = categories.map((c, i) => `
        <button
            type="button"
            class="filter-btn${i === 0 ? ' active' : ''}"
            data-category="${escapeAttr(c.id)}"
            aria-pressed="${i === 0 ? 'true' : 'false'}"
        >${escapeHtml(c.label)}</button>
    `).join('');

    filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filtersEl.querySelectorAll('.filter-btn').forEach(b => {
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
    if (!container || !window.SOHRAI_DATA) return;
    const items = (window.SOHRAI_DATA.gallery || []).filter(item =>
        category === 'all' || item.category === category
    );
    container.innerHTML = items.map(g => `
        <article class="gallery-card" data-image="${escapeAttr(g.imageUrl)}" data-title="${escapeAttr(g.title)}" data-caption="${escapeAttr(g.description)}">
            <img src="${escapeAttr(g.imageUrl)}" alt="${escapeAttr(g.title)} — Sohrai painting" loading="lazy" />
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
    if (!container || !window.SOHRAI_DATA) return;
    const refs = window.SOHRAI_DATA.references || [];
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
        // Avoid double-binding.
        if (card.dataset.lightboxBound === 'true') return;
        card.dataset.lightboxBound = 'true';
        card.addEventListener('click', () => {
            imgEl.src = card.dataset.image || '';
            imgEl.alt = card.dataset.title || 'Sohrai painting';
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

// ── Interactive Wall Art Visualizer ──────────────────────────────
function initVisualizer() {
    const canvas = document.getElementById('sohrai-canvas');
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
        // Fill with a base mud-plaster colour so the canvas reads as a wall.
        ctx.fillStyle = '#8b5a2b';
        ctx.fillRect(0, 0, rect.width, rect.height);
        // Add a subtle texture.
        for (let i = 0; i < 200; i++) {
            ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255, 240, 200' : '60, 40, 20'}, 0.05)`;
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            const r = Math.random() * 8;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    setupCanvas();

    // ── State ────────────────────────────────────────────────────
    let isDrawing = false;
    let currentTool = 'brush';
    let currentColor = '#f8f0e0'; // chalk white default
    let brushSize = 8;
    let lastX = 0;
    let lastY = 0;

    // ── Build the colour palette ────────────────────────────────
    const paletteEl = document.getElementById('color-palette');
    const pigments = (window.SOHRAI_DATA && window.SOHRAI_DATA.pigments) || [];
    paletteEl.innerHTML = pigments.map((p, i) => `
        <button
            type="button"
            class="color-swatch${i === 3 ? ' active' : ''}"
            style="background-color: ${escapeAttr(p.color)};"
            data-color="${escapeAttr(p.color)}"
            data-name="${escapeAttr(p.name)}"
            aria-label="${escapeAttr(p.name)}"
            aria-pressed="${i === 3 ? 'true' : 'false'}"
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
            // Draw a dot for a single click.
            ctx.fillStyle = currentColor;
            ctx.beginPath();
            ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Stamp a motif.
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
    // Each motif is drawn programmatically using the canvas API,
    // styled with the current pigment colour.
    function stampMotif(motif, cx, cy) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const size = 60;

        switch (motif) {
            case 'cow':
                drawCowMotif(size);
                break;
            case 'elephant':
                drawElephantMotif(size);
                break;
            case 'peacock':
                drawPeacockMotif(size);
                break;
            case 'tree':
                drawTreeMotif(size);
                break;
            case 'flower':
                drawFlowerMotif(size);
                break;
            case 'sun':
                drawSunMotif(size);
                break;
        }

        ctx.restore();
    }

    function drawCowMotif(s) {
        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Head
        ctx.beginPath();
        ctx.arc(s, -s * 0.3, s * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        // Horns
        ctx.beginPath();
        ctx.moveTo(s * 1.1, -s * 0.5);
        ctx.lineTo(s * 1.3, -s * 0.8);
        ctx.moveTo(s * 1.2, -s * 0.4);
        ctx.lineTo(s * 1.5, -s * 0.6);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(-s * 0.7, s * 0.4);
        ctx.lineTo(-s * 0.7, s * 0.9);
        ctx.moveTo(-s * 0.3, s * 0.5);
        ctx.lineTo(-s * 0.3, s * 0.9);
        ctx.moveTo(s * 0.3, s * 0.5);
        ctx.lineTo(s * 0.3, s * 0.9);
        ctx.moveTo(s * 0.7, s * 0.4);
        ctx.lineTo(s * 0.7, s * 0.9);
        ctx.stroke();
        // Decorative dots inside body (Sohrai signature)
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * s * 0.4, Math.sin(angle) * s * 0.2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawElephantMotif(s) {
        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.6, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Head
        ctx.beginPath();
        ctx.arc(-s, -s * 0.1, s * 0.4, 0, Math.PI * 2);
        ctx.stroke();
        // Trunk
        ctx.beginPath();
        ctx.moveTo(-s * 1.3, 0);
        ctx.quadraticCurveTo(-s * 1.8, s * 0.3, -s * 1.5, s * 0.7);
        ctx.stroke();
        // Ear
        ctx.beginPath();
        ctx.arc(-s, -s * 0.3, s * 0.2, 0, Math.PI * 2);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(-s * 0.6, s * 0.5);
        ctx.lineTo(-s * 0.6, s * 1);
        ctx.moveTo(-s * 0.2, s * 0.5);
        ctx.lineTo(-s * 0.2, s * 1);
        ctx.moveTo(s * 0.2, s * 0.5);
        ctx.lineTo(s * 0.2, s * 1);
        ctx.moveTo(s * 0.6, s * 0.5);
        ctx.lineTo(s * 0.6, s * 1);
        ctx.stroke();
        // Decorative dots
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * s * 0.5, Math.sin(angle) * s * 0.3, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawPeacockMotif(s) {
        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.3, s * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Head
        ctx.beginPath();
        ctx.arc(0, -s * 0.5, s * 0.15, 0, Math.PI * 2);
        ctx.stroke();
        // Tail feathers (fanned)
        for (let i = -3; i <= 3; i++) {
            const angle = (i / 6) * Math.PI;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(
                Math.sin(angle) * s * 0.8,
                -s * 0.5 + Math.cos(angle) * s * 0.3,
                Math.sin(angle) * s,
                -s * 0.8 + Math.cos(angle) * s * 0.2
            );
            ctx.stroke();
            // Dot at tip
            ctx.beginPath();
            ctx.arc(Math.sin(angle) * s, -s * 0.8 + Math.cos(angle) * s * 0.2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawTreeMotif(s) {
        // Trunk
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.lineTo(0, -s * 0.3);
        ctx.stroke();
        // Branches (symmetric)
        for (let i = -2; i <= 2; i++) {
            if (i === 0) continue;
            const y = -s * 0.2 - Math.abs(i) * s * 0.15;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.quadraticCurveTo(i * s * 0.4, y - s * 0.2, i * s * 0.8, y - s * 0.3);
            ctx.stroke();
            // Leaves (dots)
            ctx.beginPath();
            ctx.arc(i * s * 0.8, y - s * 0.3, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        // Roots
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.quadraticCurveTo(-s * 0.5, s * 1.2, -s * 0.8, s * 1.1);
        ctx.moveTo(0, s);
        ctx.quadraticCurveTo(s * 0.5, s * 1.2, s * 0.8, s * 1.1);
        ctx.stroke();
        // Top dot
        ctx.beginPath();
        ctx.arc(0, -s * 0.4, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFlowerMotif(s) {
        // 6-petal flower
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.ellipse(
                Math.cos(angle) * s * 0.5,
                Math.sin(angle) * s * 0.5,
                s * 0.25,
                s * 0.4,
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
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * s * 0.5, Math.sin(angle) * s * 0.5);
            ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
            ctx.stroke();
        }
        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2);
        ctx.fill();
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
            link.download = 'my-sohrai-painting.png';
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
