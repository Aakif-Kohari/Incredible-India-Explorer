/**
 * durgavati.js
 * Client-side script for Rani Durgavati Profile — Gond Kingdom, 16th Century Central India
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    renderHighlights();
    renderSections();
    renderEvidenceVsRetelling();
    renderTimeline();
    renderSources();
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
    const tabBtns = document.querySelectorAll('.durgavati-tab-btn');
    const tabPanels = document.querySelectorAll('.durgavati-tab-content');

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
/* 3. Render Highlights                                                       */
/* -------------------------------------------------------------------------- */
function renderHighlights() {
    const container = document.getElementById('highlightsGrid');
    if (!container || typeof DURGAVATI_HIGHLIGHTS === 'undefined') return;

    container.innerHTML = DURGAVATI_HIGHLIGHTS.map(item => `
        <article class="durgavati-card">
            <span class="durgavati-card__icon" aria-hidden="true">${item.icon}</span>
            <span class="durgavati-eyebrow">${item.category}</span>
            <h3 class="durgavati-card__title">${item.title}</h3>
            <p class="durgavati-card__desc">${item.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 4. Render Historical Sections                                              */
/* -------------------------------------------------------------------------- */
function renderSections() {
    const container = document.getElementById('sectionsGrid');
    if (!container || typeof DURGAVATI_SECTIONS === 'undefined') return;

    container.innerHTML = DURGAVATI_SECTIONS.map(sec => `
        <article class="durgavati-card" style="margin-bottom:1.5rem;">
            <span class="durgavati-eyebrow">${sec.eyebrow}</span>
            <h3 class="durgavati-card__title" style="font-size:1.4rem; margin-bottom:0.75rem;">${sec.title}</h3>
            <p class="durgavati-card__desc" style="font-size:1.05rem; font-weight:500; margin-bottom:1rem; color:var(--durgavati-text);">${sec.summary}</p>
            <ul style="padding-left:1.25rem; color:var(--durgavati-text-dim); display:flex; flex-direction:column; gap:0.5rem;">
                ${sec.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 5. Render Evidence vs Retelling Comparison                                 */
/* -------------------------------------------------------------------------- */
function renderEvidenceVsRetelling() {
    const container = document.getElementById('evidenceGrid');
    if (!container || typeof DURGAVATI_EVIDENCE_VS_RETELLING === 'undefined') return;

    container.innerHTML = DURGAVATI_EVIDENCE_VS_RETELLING.map(item => `
        <div class="durgavati-comp-card">
            <h3 class="durgavati-comp-header">📌 ${item.topic}</h3>
            <div class="durgavati-comp-box durgavati-comp-box--evidence">
                <div class="durgavati-comp-box__title">📜 Historical Evidence (Akbarnama & Primary Sources)</div>
                <p class="durgavati-card__desc">${item.historicalEvidence}</p>
            </div>
            <div class="durgavati-comp-box durgavati-comp-box--retelling">
                <div class="durgavati-comp-box__title">📖 Later Folklore & Commemorative Traditions</div>
                <p class="durgavati-card__desc">${item.popularRetelling}</p>
            </div>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 6. Render Chronological Timeline                                          */
/* -------------------------------------------------------------------------- */
function renderTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container || typeof DURGAVATI_TIMELINE === 'undefined') return;

    container.innerHTML = DURGAVATI_TIMELINE.map(t => `
        <div class="durgavati-timeline-step">
            <div class="durgavati-timeline-step__meta">
                <span>${t.year}</span>
            </div>
            <h3 class="durgavati-timeline-step__title">${t.title}</h3>
            <p class="durgavati-card__desc">${t.description}</p>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 7. Render Academic Sources & References                                    */
/* -------------------------------------------------------------------------- */
function renderSources() {
    const container = document.getElementById('sourcesList');
    if (!container || typeof DURGAVATI_SOURCES === 'undefined') return;

    container.innerHTML = DURGAVATI_SOURCES.map(s => `
        <div class="durgavati-source-item">
            <div class="durgavati-source-item__citation">📚 ${s.citation}</div>
            <div class="durgavati-source-item__notes">${s.notes}</div>
        </div>
    `).join('');
}
