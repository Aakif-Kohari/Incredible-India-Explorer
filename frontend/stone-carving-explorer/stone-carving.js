document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTimeline();
    renderRegions();
    renderGallery();
    renderTools();
    renderArtisans();
    renderReferences();
    initThemeToggle();
    initParallax();
    initScrollReveal();
    initModal();
});

/* ──────────────────────────────────────────
   RENDER FUNCTIONS
────────────────────────────────────────── */

function renderStats() {
    const grid = document.getElementById('sc-stats-grid');
    if (!grid || typeof SC_INFO === 'undefined') return;
    grid.innerHTML = SC_INFO.quickStats.map(s => `
        <div class="sc-stat-item sc-reveal">
            <span class="sc-stat-icon">${s.icon}</span>
            <div class="sc-stat-value">${s.value}</div>
            <div class="sc-stat-label">${s.label}</div>
        </div>
    `).join('');
}

function renderTimeline() {
    const container = document.getElementById('sc-timeline');
    if (!container || typeof SC_TIMELINE === 'undefined') return;
    container.innerHTML = SC_TIMELINE.map((ev, i) => `
        <div class="sc-timeline-item sc-reveal sc-reveal-d${Math.min((i % 3) + 1, 3)}">
            <div class="sc-tl-era">${ev.era}</div>
            <div class="sc-tl-period">${ev.period}</div>
            <div class="sc-tl-title">
                <span class="sc-tl-icon">${ev.icon}</span>
                ${ev.title}
            </div>
            <p class="sc-tl-desc">${ev.description}</p>
        </div>
    `).join('');
}

function renderRegions() {
    const grid = document.getElementById('sc-regions-grid');
    if (!grid || typeof SC_REGIONS === 'undefined') return;
    grid.innerHTML = SC_REGIONS.map((r, i) => `
        <div class="sc-region-card sc-reveal sc-reveal-d${Math.min((i % 3) + 1, 3)}"
             id="${r.id}"
             style="--region-color: ${r.color};">
            <span class="sc-region-icon">${r.icon}</span>
            <div class="sc-region-name">${r.name}</div>
            <div class="sc-region-tagline">${r.tagline}</div>
            <div class="sc-region-meta">
                <div class="sc-region-meta-row">
                    <strong>Stone</strong>
                    <span>${r.stone}</span>
                </div>
                <div class="sc-region-meta-row">
                    <strong>Centres</strong>
                    <span>${r.centres}</span>
                </div>
            </div>
            <p class="sc-region-style">${r.style}</p>
            <span class="sc-region-unesco">🌐 ${r.unesco}</span>
        </div>
    `).join('');
}

function renderGallery() {
    const grid = document.getElementById('sc-gallery-grid');
    if (!grid || typeof SC_GALLERY === 'undefined') return;
    grid.innerHTML = SC_GALLERY.map((item, i) => `
        <div class="sc-gallery-card sc-reveal sc-reveal-d${Math.min((i % 3) + 1, 3)}"
             data-index="${i}"
             role="button"
             tabindex="0"
             aria-label="View details: ${item.title}">
            <div class="sc-gallery-thumb" style="background: linear-gradient(135deg, ${item.color}22, ${item.color}08);">
                <span>${item.emoji}</span>
                <span class="sc-gallery-tag">${item.tag}</span>
            </div>
            <div class="sc-gallery-body">
                <h3>${item.title}</h3>
                <div class="sc-gallery-region-period">${item.region} · ${item.period}</div>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');

    // Click events
    grid.querySelectorAll('.sc-gallery-card').forEach(card => {
        const idx = parseInt(card.dataset.index, 10);
        const open = () => openModal(idx);
        card.addEventListener('click', open);
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
    });
}

function renderTools() {
    const grid = document.getElementById('sc-tools-grid');
    if (!grid || typeof SC_TOOLS === 'undefined') return;
    grid.innerHTML = SC_TOOLS.map((t, i) => `
        <div class="sc-tool-card sc-reveal sc-reveal-d${Math.min((i % 3) + 1, 3)}">
            <div class="sc-tool-head">
                <div class="sc-tool-icon">${t.icon}</div>
                <div>
                    <div class="sc-tool-name">${t.name}</div>
                    <div class="sc-tool-category">${t.category}</div>
                </div>
            </div>
            <p class="sc-tool-desc">${t.description}</p>
            <div class="sc-tool-uses">
                ${t.uses.map(u => `<span class="sc-tool-use-pill">${u}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderArtisans() {
    const grid = document.getElementById('sc-artisans-grid');
    if (!grid || typeof SC_ARTISANS === 'undefined') return;
    grid.innerHTML = SC_ARTISANS.map((a, i) => `
        <div class="sc-artisan-card sc-reveal sc-reveal-d${Math.min((i % 3) + 1, 3)}"
             style="--artisan-color: ${a.color};">
            <div class="sc-artisan-head">
                <div class="sc-artisan-icon">${a.icon}</div>
                <div>
                    <div class="sc-artisan-name">${a.name}</div>
                    <div class="sc-artisan-region">${a.region}</div>
                </div>
            </div>
            <p class="sc-artisan-tradition">${a.tradition}</p>
            <p class="sc-artisan-specialty">${a.specialty}</p>
            <div class="sc-artisan-meta">
                <div class="sc-artisan-recognition">
                    <span class="sc-artisan-meta-label">🏆 Recognition:</span>
                    <span>${a.recognition}</span>
                </div>
                <div class="sc-artisan-threat">
                    <span class="sc-artisan-meta-label">⚠️ Challenge:</span>
                    <span>${a.threat}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderReferences() {
    const list = document.getElementById('sc-refs-list');
    if (!list || typeof SC_REFERENCES === 'undefined') return;
    list.innerHTML = SC_REFERENCES.map(ref => `
        <li>
            <span class="sc-ref-icon">📚</span>
            <a href="${ref.link}" target="_blank" rel="noopener noreferrer">${ref.text}</a>
        </li>
    `).join('');
}

/* ──────────────────────────────────────────
   GALLERY MODAL
────────────────────────────────────────── */
function initModal() {
    const modal   = document.getElementById('sc-modal');
    const closeBtn = document.getElementById('sc-modal-close');
    if (!modal) return;

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(idx) {
    const item = SC_GALLERY[idx];
    if (!item) return;

    document.getElementById('sc-modal-emoji').textContent    = item.emoji;
    document.getElementById('sc-modal-tag').textContent      = item.tag;
    document.getElementById('sc-modal-title').textContent    = item.title;
    document.getElementById('sc-modal-region-period').textContent = `${item.region} · ${item.period}`;
    document.getElementById('sc-modal-material').textContent = `Material: ${item.material}`;
    document.getElementById('sc-modal-desc').textContent     = item.description;

    const modal = document.getElementById('sc-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Trap focus
    document.getElementById('sc-modal-close').focus();
}

function closeModal() {
    const modal = document.getElementById('sc-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ──────────────────────────────────────────
   THEME TOGGLE
────────────────────────────────────────── */
function initThemeToggle() {
    const btn = document.getElementById('sc-theme-toggle');
    if (!btn) return;

    const stored = localStorage.getItem('theme');
    const isLight = stored === 'light' || document.body.classList.contains('light-theme');
    btn.textContent = isLight ? '🌙' : '☀️';

    btn.addEventListener('click', () => {
        const nowLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', nowLight ? 'light' : 'dark');
        btn.textContent = nowLight ? '🌙' : '☀️';
    });
}

/* ──────────────────────────────────────────
   PARALLAX
────────────────────────────────────────── */
function initParallax() {
    const bg = document.getElementById('sc-hero-bg');
    if (!bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.addEventListener('scroll', () => {
        bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }, { passive: true });
}

/* ──────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────── */
function initScrollReveal() {
    const targets = document.querySelectorAll('.sc-reveal');
    if (!targets.length) return;
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => io.observe(el));
}
