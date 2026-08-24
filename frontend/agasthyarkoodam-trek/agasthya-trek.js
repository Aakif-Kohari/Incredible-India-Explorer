/**
 * agasthya-trek.js
 * Client-side script for Agasthyarkoodam Trek Profile — Thiruvananthapuram, Kerala
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    renderHighlights();
    renderBiodiversity();
    renderRouteSteps();
    renderPermits();
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
    const tabBtns = document.querySelectorAll('.agasthya-tab-btn');
    const tabPanels = document.querySelectorAll('.agasthya-tab-content');

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
    if (!container || typeof AGASTHYA_HIGHLIGHTS === 'undefined') return;

    container.innerHTML = AGASTHYA_HIGHLIGHTS.map(item => `
        <article class="agasthya-card">
            <span class="agasthya-card__icon" aria-hidden="true">${item.icon}</span>
            <span class="agasthya-eyebrow">${item.category}</span>
            <h3 class="agasthya-card__title">${item.title}</h3>
            <p class="agasthya-card__desc">${item.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 4. Render Biodiversity Info                                                */
/* -------------------------------------------------------------------------- */
function renderBiodiversity() {
    const container = document.getElementById('biodiversityCards');
    if (!container || typeof AGASTHYA_BIODIVERSITY_INFO === 'undefined') return;

    const bio = AGASTHYA_BIODIVERSITY_INFO;

    container.innerHTML = `
        <article class="agasthya-card">
            <span class="agasthya-eyebrow">Flora Sanctuary</span>
            <h3 class="agasthya-card__title">🌱 Botanical Diversity</h3>
            <p class="agasthya-card__desc">
                <strong>Medicinal Plants:</strong> ${bio.totalMedicinalPlants}.<br/>
                <strong>Key Herb:</strong> ${bio.keyHerb}.<br/>
                <strong>Endemics:</strong> ${bio.endemicSpeciesCount}.
            </p>
        </article>
        <article class="agasthya-card">
            <span class="agasthya-eyebrow">Wildlife Corridor</span>
            <h3 class="agasthya-card__title">🐘 Key Wildlife Species</h3>
            <ul style="color:var(--agasthya-text-dim); font-size:0.95rem; margin-left:1.2rem; line-height:1.7;">
                ${bio.faunaHighlights.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </article>
    `;
}

/* -------------------------------------------------------------------------- */
/* 5. Render Route Steps                                                      */
/* -------------------------------------------------------------------------- */
function renderRouteSteps() {
    const container = document.getElementById('routeStepsContainer');
    if (!container || typeof AGASTHYA_ROUTE_STEPS === 'undefined') return;

    container.innerHTML = AGASTHYA_ROUTE_STEPS.map(step => `
        <div class="agasthya-timeline-step">
            <div class="agasthya-timeline-step__meta">
                <span>${step.day.toUpperCase()}</span> · 
                <span>STAGE ${step.step}</span> · 
                <span>${step.elevation}</span> · 
                <span>${step.distance}</span>
            </div>
            <h3 class="agasthya-timeline-step__title">${step.title}</h3>
            <p class="agasthya-card__desc">${step.description}</p>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 6. Render Permits & Safety Rules                                           */
/* -------------------------------------------------------------------------- */
function renderPermits() {
    const container = document.getElementById('permitsGrid');
    if (!container || typeof AGASTHYA_PERMITS_SAFETY === 'undefined') return;

    container.innerHTML = AGASTHYA_PERMITS_SAFETY.map(p => `
        <article class="agasthya-card">
            <span class="agasthya-card__icon" aria-hidden="true">${p.icon}</span>
            <h3 class="agasthya-card__title">${p.title}</h3>
            <p class="agasthya-card__desc">${p.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 7. Interactive Trek Estimator                                             */
/* -------------------------------------------------------------------------- */
function initTrekCalculator() {
    const calcBtns = document.querySelectorAll('.agasthya-calc-btn');
    const resDay1 = document.getElementById('calcDay1');
    const resDay2 = document.getElementById('calcDay2');
    const resWater = document.getElementById('calcWater');

    if (!calcBtns.length || !resDay1) return;

    const estimates = {
        fast: {
            day1: "4.5 – 5.5 hrs (Bonacaud to Athirumala)",
            day2: "6.0 – 7.0 hrs (Summit push & return)",
            water: "3.0 Liters / day"
        },
        moderate: {
            day1: "6.0 – 7.0 hrs (Bonacaud to Athirumala)",
            day2: "8.0 – 9.0 hrs (Summit push & return)",
            water: "3.5 Liters / day"
        },
        strenuous: {
            day1: "7.5 – 8.5 hrs (Bonacaud to Athirumala)",
            day2: "10.0 – 11.0 hrs (Summit push & return)",
            water: "4.0 Liters / day"
        }
    };

    calcBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pace = btn.getAttribute('data-pace');
            if (!estimates[pace]) return;

            calcBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resDay1.textContent = estimates[pace].day1;
            resDay2.textContent = estimates[pace].day2;
            resWater.textContent = estimates[pace].water;
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 8. Interactive Packing Checklist                                          */
/* -------------------------------------------------------------------------- */
function renderChecklist() {
    const container = document.getElementById('checklistGrid');
    if (!container || typeof AGASTHYA_CHECKLIST === 'undefined') return;

    container.innerHTML = AGASTHYA_CHECKLIST.map(item => `
        <label class="agasthya-check-item" id="check-${item.id}">
            <input type="checkbox" data-id="${item.id}" />
            <div>
                <div class="agasthya-check-item__name">
                    ${item.name} ${item.required ? '<span style="color:var(--agasthya-emerald-light); font-size:0.75rem;">(Required)</span>' : ''}
                </div>
                <div class="agasthya-check-item__reason">${item.reason}</div>
            </div>
        </label>
    `).join('');

    container.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        chk.addEventListener('change', (e) => {
            const parent = e.target.closest('.agasthya-check-item');
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
    if (!container || typeof AGASTHYA_GALLERY === 'undefined') return;

    const getSvgPlaceholder = (category) => {
        return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Agasthyarkoodam Trek Gallery Image">
            <defs>
                <linearGradient id="agasthyaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0a140f" />
                    <stop offset="100%" stop-color="#11221a" />
                </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#agasthyaGrad)" />
            <path d="M0,230 L140,110 L240,170 L340,80 L400,230 Z" fill="#059669" opacity="0.8" />
            <path d="M0,250 L180,140 L290,210 L400,130 L400,250 Z" fill="#10b981" opacity="0.6" />
        </svg>`;
    };

    container.innerHTML = AGASTHYA_GALLERY.map(img => `
        <div class="agasthya-gallery-card" tabindex="0" role="button" data-id="${img.id}">
            <div class="agasthya-gallery-img-wrap">
                ${getSvgPlaceholder(img.category)}
            </div>
            <div class="agasthya-gallery-card__body">
                <h3 class="agasthya-gallery-card__title">${img.title}</h3>
                <p class="agasthya-gallery-card__sub">${img.subtitle}</p>
                <div class="agasthya-gallery-card__credit">${img.credit}</div>
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
        const card = e.target.closest('.agasthya-gallery-card');
        if (!card) return;

        const imgId = card.getAttribute('data-id');
        const imgData = AGASTHYA_GALLERY.find(g => g.id === imgId);
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
