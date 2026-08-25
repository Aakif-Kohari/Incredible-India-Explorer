/**
 * meesapulimala-trek.js
 * Client-side script for Meesapulimala Trek Profile — Munnar, Idukki, Kerala
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    renderHighlights();
    renderEcosystem();
    renderViewpoints();
    renderRouteSteps();
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
    const tabBtns = document.querySelectorAll('.meesa-tab-btn');
    const tabPanels = document.querySelectorAll('.meesa-tab-content');

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
    if (!container || typeof MEESAPULIMALA_HIGHLIGHTS === 'undefined') return;

    container.innerHTML = MEESAPULIMALA_HIGHLIGHTS.map(item => `
        <article class="meesa-card">
            <span class="meesa-card__icon" aria-hidden="true">${item.icon}</span>
            <span class="meesa-eyebrow">${item.category}</span>
            <h3 class="meesa-card__title">${item.title}</h3>
            <p class="meesa-card__desc">${item.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 4. Render Ecosystem Info                                                   */
/* -------------------------------------------------------------------------- */
function renderEcosystem() {
    const container = document.getElementById('ecosystemFeatures');
    if (!container || typeof MEESAPULIMALA_ECOSYSTEM === 'undefined') return;

    const eco = MEESAPULIMALA_ECOSYSTEM;

    container.innerHTML = eco.features.map(feat => `
        <article class="meesa-card">
            <span class="meesa-eyebrow">Natural Feature</span>
            <h3 class="meesa-card__title">🌿 Shola-Grassland Characteristic</h3>
            <p class="meesa-card__desc">${feat}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 5. Render Viewpoints & Nearby                                              */
/* -------------------------------------------------------------------------- */
function renderViewpoints() {
    const container = document.getElementById('viewpointsGrid');
    if (!container || typeof MEESAPULIMALA_VIEWPOINTS === 'undefined') return;

    container.innerHTML = MEESAPULIMALA_VIEWPOINTS.map(vp => `
        <article class="meesa-card">
            <span class="meesa-eyebrow">Elevation: ${vp.altitude}</span>
            <h3 class="meesa-card__title">📍 ${vp.title}</h3>
            <p class="meesa-card__desc">${vp.description}</p>
        </article>
    `).join('');
}

function renderNearbyAttractions() {
    const container = document.getElementById('nearbyGrid');
    if (!container || typeof MEESAPULIMALA_NEARBY === 'undefined') return;

    container.innerHTML = MEESAPULIMALA_NEARBY.map(nb => `
        <article class="meesa-card">
            <span class="meesa-eyebrow">${nb.category} · ${nb.distance}</span>
            <h3 class="meesa-card__title">${nb.name}</h3>
            <p class="meesa-card__desc">${nb.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 6. Render Route Timeline Steps                                             */
/* -------------------------------------------------------------------------- */
function renderRouteSteps() {
    const container = document.getElementById('routeStepsContainer');
    if (!container || typeof MEESAPULIMALA_ROUTE_STEPS === 'undefined') return;

    container.innerHTML = MEESAPULIMALA_ROUTE_STEPS.map(step => `
        <div class="meesa-timeline-step">
            <div class="meesa-timeline-step__meta">
                <span>STAGE ${step.step}</span> · 
                <span>${step.elevation}</span> · 
                <span>${step.distance}</span> · 
                <span>${step.time}</span>
            </div>
            <h3 class="meesa-timeline-step__title">${step.title}</h3>
            <p class="meesa-card__desc">${step.description}</p>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 7. Interactive Trek Estimator                                             */
/* -------------------------------------------------------------------------- */
function initTrekCalculator() {
    const calcBtns = document.querySelectorAll('.meesa-calc-btn');
    const resAscent = document.getElementById('calcAscent');
    const resDescent = document.getElementById('calcDescent');
    const resWater = document.getElementById('calcWater');
    const resStart = document.getElementById('calcStart');

    if (!calcBtns.length || !resAscent) return;

    const estimates = {
        fast: {
            ascent: "3.5 – 4.0 hrs",
            descent: "2.0 – 2.5 hrs",
            water: "2.5 Liters",
            start: "7:30 AM"
        },
        moderate: {
            ascent: "4.5 – 5.0 hrs",
            descent: "3.0 – 3.5 hrs",
            water: "3.5 Liters",
            start: "7:00 AM"
        },
        strenuous: {
            ascent: "5.5 – 6.5 hrs",
            descent: "4.0 – 4.5 hrs",
            water: "4.0 Liters",
            start: "6:30 AM"
        }
    };

    calcBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pace = btn.getAttribute('data-pace');
            if (!estimates[pace]) return;

            calcBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resAscent.textContent = estimates[pace].ascent;
            resDescent.textContent = estimates[pace].descent;
            resWater.textContent = estimates[pace].water;
            resStart.textContent = estimates[pace].start;
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 8. Interactive Packing Checklist                                          */
/* -------------------------------------------------------------------------- */
function renderChecklist() {
    const container = document.getElementById('checklistGrid');
    if (!container || typeof MEESAPULIMALA_CHECKLIST === 'undefined') return;

    container.innerHTML = MEESAPULIMALA_CHECKLIST.map(item => `
        <label class="meesa-check-item" id="check-${item.id}">
            <input type="checkbox" data-id="${item.id}" />
            <div>
                <div class="meesa-check-item__name">
                    ${item.name} ${item.required ? '<span style="color:var(--meesa-emerald); font-size:0.75rem;">(Required)</span>' : ''}
                </div>
                <div class="meesa-check-item__reason">${item.reason}</div>
            </div>
        </label>
    `).join('');

    container.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        chk.addEventListener('change', (e) => {
            const parent = e.target.closest('.meesa-check-item');
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
    if (!container || typeof MEESAPULIMALA_GALLERY === 'undefined') return;

    const getSvgPlaceholder = (category) => {
        return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Meesapulimala Gallery Image">
            <defs>
                <linearGradient id="meesaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#09130e" />
                    <stop offset="100%" stop-color="#0f1f18" />
                </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#meesaGrad)" />
            <path d="M0,220 L130,110 L230,170 L340,75 L400,220 Z" fill="#059669" opacity="0.85" />
            <path d="M0,250 L170,140 L280,210 L400,130 L400,250 Z" fill="#10b981" opacity="0.6" />
        </svg>`;
    };

    container.innerHTML = MEESAPULIMALA_GALLERY.map(img => `
        <div class="meesa-gallery-card" tabindex="0" role="button" data-id="${img.id}">
            <div class="meesa-gallery-img-wrap">
                ${getSvgPlaceholder(img.category)}
            </div>
            <div class="meesa-gallery-card__body">
                <h3 class="meesa-gallery-card__title">${img.title}</h3>
                <p class="meesa-gallery-card__sub">${img.subtitle}</p>
                <div class="meesa-gallery-card__credit">${img.credit}</div>
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
        const card = e.target.closest('.meesa-gallery-card');
        if (!card) return;

        const imgId = card.getAttribute('data-id');
        const imgData = MEESAPULIMALA_GALLERY.find(g => g.id === imgId);
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
