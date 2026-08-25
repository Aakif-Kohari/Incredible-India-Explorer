/**
 * didda.js
 * Client-side script for Queen Didda of Kashmir Profile — Medieval Kashmir
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    renderHighlights();
    renderChapters();
    renderEvidenceVsPortrayal();
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
    const tabBtns = document.querySelectorAll('.didda-tab-btn');
    const tabPanels = document.querySelectorAll('.didda-tab-content');

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
    if (!container || typeof DIDDA_HIGHLIGHTS === 'undefined') return;

    container.innerHTML = DIDDA_HIGHLIGHTS.map(item => `
        <article class="didda-card">
            <span class="didda-card__icon" aria-hidden="true">${item.icon}</span>
            <span class="didda-eyebrow">${item.category}</span>
            <h3 class="didda-card__title">${item.title}</h3>
            <p class="didda-card__desc">${item.description}</p>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 4. Render Chapters                                                         */
/* -------------------------------------------------------------------------- */
function renderChapters() {
    const container = document.getElementById('chaptersGrid');
    if (!container || typeof DIDDA_CHAPTERS === 'undefined') return;

    container.innerHTML = DIDDA_CHAPTERS.map(ch => `
        <article class="didda-card" style="margin-bottom:1.5rem;">
            <span class="didda-eyebrow">${ch.eyebrow}</span>
            <h3 class="didda-card__title" style="font-size:1.4rem; margin-bottom:0.75rem;">${ch.title}</h3>
            <p class="didda-card__desc" style="font-size:1.05rem; font-weight:500; margin-bottom:1rem; color:var(--didda-text);">${ch.summary}</p>
            <ul style="padding-left:1.25rem; color:var(--didda-text-dim); display:flex; flex-direction:column; gap:0.5rem;">
                ${ch.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 5. Render Evidence vs Portrayal Comparison                                 */
/* -------------------------------------------------------------------------- */
function renderEvidenceVsPortrayal() {
    const container = document.getElementById('evidenceGrid');
    if (!container || typeof DIDDA_EVIDENCE_VS_PORTRAYAL === 'undefined') return;

    container.innerHTML = DIDDA_EVIDENCE_VS_PORTRAYAL.map(item => `
        <div class="didda-comp-card">
            <h3 class="didda-comp-header">📌 ${item.topic}</h3>
            <div class="didda-comp-box didda-comp-box--evidence">
                <div class="didda-comp-box__title">📜 Historical Evidence (Rajatarangini & Coins)</div>
                <p class="didda-card__desc">${item.historicalEvidence}</p>
            </div>
            <div class="didda-comp-box didda-comp-box--portrayal">
                <div class="didda-comp-box__title">📖 Later Literary Portrayals & Folklore</div>
                <p class="didda-card__desc">${item.literaryPortrayal}</p>
            </div>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 6. Render Chronological Timeline                                          */
/* -------------------------------------------------------------------------- */
function renderTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container || typeof DIDDA_TIMELINE === 'undefined') return;

    container.innerHTML = DIDDA_TIMELINE.map(t => `
        <div class="didda-timeline-step">
            <div class="didda-timeline-step__meta">
                <span>${t.year}</span>
            </div>
            <h3 class="didda-timeline-step__title">${t.title}</h3>
            <p class="didda-card__desc">${t.description}</p>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 7. Render Academic Sources & References                                    */
/* -------------------------------------------------------------------------- */
function renderSources() {
    const container = document.getElementById('sourcesList');
    if (!container || typeof DIDDA_SOURCES === 'undefined') return;

    container.innerHTML = DIDDA_SOURCES.map(s => `
        <div class="didda-source-item">
            <div class="didda-source-item__citation">📚 ${s.citation}</div>
            <div class="didda-source-item__notes">${s.notes}</div>
        </div>
    `).join('');
}
