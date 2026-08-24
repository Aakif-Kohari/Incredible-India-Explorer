/**
 * rajmachi-trek.js
 * Client-side script for Rajmachi Fort Trek Profile — Sahyadri Mountains, Maharashtra
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    renderHighlights();
    renderFortHistory();
    renderRoutes();
    renderMonsoonInfo();
    renderNearbyAttractions();
    initTrekCalculator();
    renderChecklist();
    renderGallery();
    initLightbox();
});

/* -------------------------------------------------------------------------- */
/* 1. Theme Toggler                                                           */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light-theme');
        if (isLight) {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleBtn.setAttribute('aria-pressed', 'true');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggleBtn.setAttribute('aria-pressed', 'false');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 2. ARIA Accessible Tab Switcher                                           */
/* -------------------------------------------------------------------------- */
function initTabs() {
    const tabBtns = document.querySelectorAll('.rajmachi-tab-btn');
    const tabPanels = document.querySelectorAll('.rajmachi-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });

            tabPanels.forEach(panel => {
                panel.classList.remove('active');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 3. Render Overview Highlights                                              */
/* -------------------------------------------------------------------------- */
function renderHighlights() {
    const container = document.getElementById('highlightsGrid');
    if (!container || typeof RAJMACHI_HIGHLIGHTS === 'undefined') return;

    container.innerHTML = RAJMACHI_HIGHLIGHTS.map(item => `
        <article class="rajmachi-card">
            <span class="rajmachi-card__icon" aria-hidden="true">${item.icon}</span>
            <span class="rajmachi-eyebrow">${item.category}</span>
            <h3 class="rajmachi-card__title">${item.title}</h3>
            <p class="rajmachi-card__desc">${item.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 4. Render Fort History                                                     */
/* -------------------------------------------------------------------------- */
function renderFortHistory() {
    const container = document.getElementById('fortHistoryContainer');
    if (!container || typeof RAJMACHI_FORT_HISTORY === 'undefined') return;

    const fh = RAJMACHI_FORT_HISTORY;

    container.innerHTML = fh.milestones.map((m, idx) => `
        <div class="rajmachi-timeline-step">
            <div class="rajmachi-timeline-step__meta">
                <span>MILESTONE ${idx + 1}</span>
            </div>
            <h3 class="rajmachi-timeline-step__title">🏰 Maratha & Sahyadri Heritage</h3>
            <p class="rajmachi-card__desc">${m}</p>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 5. Render Two Trekking Routes                                             */
/* -------------------------------------------------------------------------- */
function renderRoutes() {
    const container = document.getElementById('routesGrid');
    if (!container || typeof RAJMACHI_ROUTES === 'undefined') return;

    container.innerHTML = RAJMACHI_ROUTES.map(rt => `
        <article class="rajmachi-card">
            <span class="rajmachi-eyebrow">${rt.startingPoint} · ${rt.distance}</span>
            <h3 class="rajmachi-card__title">${rt.name}</h3>
            <p class="rajmachi-card__desc" style="margin-bottom:0.75rem;"><strong>Duration:</strong> ${rt.time} | <strong>Terrain:</strong> ${rt.terrain}</p>
            <p class="rajmachi-card__desc">${rt.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 6. Render Monsoon Info & Nearby                                            */
/* -------------------------------------------------------------------------- */
function renderMonsoonInfo() {
    const container = document.getElementById('monsoonGrid');
    if (!container || typeof RAJMACHI_MONSOON_INFO === 'undefined') return;

    const mi = RAJMACHI_MONSOON_INFO;

    container.innerHTML = mi.highlights.map(h => `
        <article class="rajmachi-card">
            <span class="rajmachi-eyebrow">Monsoon Feature</span>
            <h3 class="rajmachi-card__title">🌧️ Sahyadri Rains</h3>
            <p class="rajmachi-card__desc">${h}</p>
        </article>
    `).join('');
}

function renderNearbyAttractions() {
    const container = document.getElementById('nearbyGrid');
    if (!container || typeof RAJMACHI_NEARBY === 'undefined') return;

    container.innerHTML = RAJMACHI_NEARBY.map(nb => `
        <article class="rajmachi-card">
            <span class="rajmachi-eyebrow">${nb.category} · ${nb.distance}</span>
            <h3 class="rajmachi-card__title">${nb.name}</h3>
            <p class="rajmachi-card__desc">${nb.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 7. Interactive Trek Estimator                                             */
/* -------------------------------------------------------------------------- */
function initTrekCalculator() {
    const calcBtns = document.querySelectorAll('.rajmachi-calc-btn');
    const resAscent = document.getElementById('calcAscent');
    const resDescent = document.getElementById('calcDescent');
    const resWater = document.getElementById('calcWater');
    const resStart = document.getElementById('calcStart');

    if (!calcBtns.length || !resAscent) return;

    const estimates = {
        lonavala: {
            ascent: "3.5 – 4.5 hrs (15km flat walk)",
            descent: "3.0 – 4.0 hrs (Return walk)",
            water: "2.5 Liters",
            start: "7:00 AM at Lonavala Base"
        },
        kondhane: {
            ascent: "2.5 – 3.5 hrs (6km steep climb)",
            descent: "2.0 – 2.5 hrs (Descent via caves)",
            water: "3.0 Liters",
            start: "7:30 AM at Kondhane Village"
        }
    };

    calcBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const route = btn.getAttribute('data-route');
            if (!estimates[route]) return;

            calcBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resAscent.textContent = estimates[route].ascent;
            resDescent.textContent = estimates[route].descent;
            resWater.textContent = estimates[route].water;
            resStart.textContent = estimates[route].start;
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 8. Interactive Packing Checklist                                          */
/* -------------------------------------------------------------------------- */
function renderChecklist() {
    const container = document.getElementById('checklistGrid');
    if (!container || typeof RAJMACHI_CHECKLIST === 'undefined') return;

    container.innerHTML = RAJMACHI_CHECKLIST.map(item => `
        <label class="rajmachi-check-item" id="check-${item.id}">
            <input type="checkbox" data-id="${item.id}" />
            <div>
                <div class="rajmachi-check-item__name">
                    ${item.name} ${item.required ? '<span style="color:var(--rajmachi-emerald); font-size:0.75rem;">(Required)</span>' : ''}
                </div>
                <div class="rajmachi-check-item__reason">${item.reason}</div>
            </div>
        </label>
    `).join('');

    container.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        chk.addEventListener('change', (e) => {
            const parent = e.target.closest('.rajmachi-check-item');
            if (parent) {
                parent.classList.toggle('checked', e.target.checked);
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 9. Photo Gallery & Lightbox                                               */
/* -------------------------------------------------------------------------- */
function renderGallery() {
    const container = document.getElementById('galleryGrid');
    if (!container || typeof RAJMACHI_GALLERY === 'undefined') return;

    const getSvgPlaceholder = (category) => {
        return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rajmachi Fort Trek Gallery Image">
            <defs>
                <linearGradient id="rajmachiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#09130e" />
                    <stop offset="100%" stop-color="#0f1f18" />
                </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#rajmachiGrad)" />
            <path d="M0,230 L140,120 L240,180 L340,90 L400,230 Z" fill="#059669" opacity="0.85" />
            <path d="M0,250 L170,145 L280,215 L400,135 L400,250 Z" fill="#10b981" opacity="0.6" />
        </svg>`;
    };

    container.innerHTML = RAJMACHI_GALLERY.map(img => `
        <div class="rajmachi-gallery-card" tabindex="0" role="button" data-id="${img.id}">
            <div class="rajmachi-gallery-img-wrap">
                ${getSvgPlaceholder(img.category)}
            </div>
            <div class="rajmachi-gallery-card__body">
                <h3 class="rajmachi-gallery-card__title">${img.title}</h3>
                <p class="rajmachi-gallery-card__sub">${img.subtitle}</p>
                <div class="rajmachi-gallery-card__credit">${img.credit}</div>
            </div>
        </div>
    `).join('');
}

function initLightbox() {
    const modal = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const titleEl = document.getElementById('lightboxTitle');
    const captionEl = document.getElementById('lightboxCaption');
    const creditEl = document.getElementById('lightboxCredit');

    if (!modal || !closeBtn) return;

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.rajmachi-gallery-card');
        if (!card) return;

        const imgId = card.getAttribute('data-id');
        const imgData = RAJMACHI_GALLERY.find(g => g.id === imgId);
        if (!imgData) return;

        titleEl.textContent = imgData.title;
        captionEl.textContent = imgData.subtitle;
        if (creditEl) creditEl.textContent = imgData.credit;

        modal.removeAttribute('hidden');
        closeBtn.focus();
    });

    closeBtn.addEventListener('click', () => {
        modal.setAttribute('hidden', '');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.setAttribute('hidden', '');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
            modal.setAttribute('hidden', '');
        }
    });
}
