/**
 * naiki-devi.js
 * Client-side script for Queen Naiki Devi Profile — 12th Century Chaulukya Gujarat
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
    const tabBtns = document.querySelectorAll('.naiki-tab-btn');
    const tabPanels = document.querySelectorAll('.naiki-tab-content');

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
    if (!container || typeof NAIKI_HIGHLIGHTS === 'undefined') return;

    container.innerHTML = NAIKI_HIGHLIGHTS.map(item => `
        <article class="naiki-card">
            <span class="naiki-card__icon" aria-hidden="true">${item.icon}</span>
            <span class="naiki-eyebrow">${item.category}</span>
            <h3 class="naiki-card__title">${item.title}</h3>
            <p class="naiki-card__desc">${item.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 4. Render Historical Sections                                              */
/* -------------------------------------------------------------------------- */
function renderSections() {
    const container = document.getElementById('sectionsGrid');
    if (!container || typeof NAIKI_SECTIONS === 'undefined') return;

    container.innerHTML = NAIKI_SECTIONS.map(sec => `
        <article class="naiki-card" style="margin-bottom:1.5rem;">
            <span class="naiki-eyebrow">${sec.eyebrow}</span>
            <h3 class="naiki-card__title" style="font-size:1.4rem; margin-bottom:0.75rem;">${sec.title}</h3>
            <p class="naiki-card__desc" style="font-size:1.05rem; font-weight:500; margin-bottom:1rem; color:var(--naiki-text);">${sec.summary}</p>
            <ul style="padding-left:1.25rem; color:var(--naiki-text-dim); display:flex; flex-direction:column; gap:0.5rem;">
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
    if (!container || typeof NAIKI_EVIDENCE_VS_RETELLING === 'undefined') return;

    container.innerHTML = NAIKI_EVIDENCE_VS_RETELLING.map(item => `
        <div class="naiki-comp-card">
            <h3 class="naiki-comp-header">📌 ${item.topic}</h3>
            <div class="naiki-comp-box naiki-comp-box--evidence">
                <div class="naiki-comp-box__title">📜 Historical Evidence (Prabandhas, Chronicles & Charters)</div>
                <p class="naiki-card__desc">${item.historicalEvidence}</p>
            </div>
            <div class="naiki-comp-box naiki-comp-box--retelling">
                <div class="naiki-comp-box__title">📖 Later Literary Retellings & Bardic Traditions</div>
                <p class="naiki-card__desc">${item.popularRetelling}</p>
            </div>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 6. Render Chronological Timeline                                          */
/* -------------------------------------------------------------------------- */
function renderTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container || typeof NAIKI_TIMELINE === 'undefined') return;

    container.innerHTML = NAIKI_TIMELINE.map(t => `
        <div class="naiki-timeline-step">
            <div class="naiki-timeline-step__meta">
                <span>${t.year}</span>
            </div>
            <h3 class="naiki-timeline-step__title">${t.title}</h3>
            <p class="naiki-card__desc">${t.description}</p>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 7. Render Academic Sources & References                                    */
/* -------------------------------------------------------------------------- */
function renderSources() {
    const container = document.getElementById('sourcesList');
    if (!container || typeof NAIKI_SOURCES === 'undefined') return;

    container.innerHTML = NAIKI_SOURCES.map(s => `
        <div class="naiki-source-item">
            <div class="naiki-source-item__citation">📚 ${s.citation}</div>
            <div class="naiki-source-item__notes">${s.notes}</div>
        </div>
    `).join('');
}
