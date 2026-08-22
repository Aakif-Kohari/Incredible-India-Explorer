document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = TANTIA_INFO.quickStats
            .map(s => `
                <div class="stat-pill">
                    <span class="stat-icon">${s.icon}</span>
                    <span class="stat-value">${s.value}</span>
                    <span class="stat-label">${s.label}</span>
                </div>
            `).join('');
    }

    const historyContent = document.getElementById('history-content');
    if (historyContent) {
        historyContent.innerHTML = `
            <h3>${HISTORY_TEXT.title}</h3>
            ${HISTORY_TEXT.paragraphs.map(p => `<p>${p}</p>`).join('')}
        `;
    }

    // ---- Interactive (expand/collapse) timeline ----
    const timelineEl = document.getElementById('tb-timeline');
    if (timelineEl) {
        timelineEl.innerHTML = TIMELINE_EVENTS
            .map((ev, i) => `
                <button type="button" class="tb-timeline-item" data-index="${i}" aria-expanded="false">
                    <div class="tb-timeline-dot"></div>
                    <div class="tb-timeline-content">
                        <span class="tb-timeline-era">${ev.era}</span>
                        <h4>${ev.title}</h4>
                        <p class="tb-timeline-desc">${ev.description}</p>
                    </div>
                    <span class="tb-timeline-caret">▾</span>
                </button>
            `).join('');

        timelineEl.querySelectorAll('.tb-timeline-item').forEach(item => {
            item.addEventListener('click', () => {
                const isOpen = item.classList.toggle('tb-timeline-open');
                item.setAttribute('aria-expanded', String(isOpen));
            });
        });
    }

    const resistanceGrid = document.getElementById('resistance-grid');
    if (resistanceGrid) {
        resistanceGrid.innerHTML = RESISTANCE_POINTS
            .map(r => `
                <div class="tb-card">
                    <h4>${r.title}</h4>
                    <p>${r.description}</p>
                </div>
            `).join('');
    }

    const legacyContent = document.getElementById('legacy-content');
    if (legacyContent) {
        legacyContent.innerHTML = LEGACY_TEXT.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    const galleryEl = document.getElementById('tb-gallery');
    if (galleryEl) {
        galleryEl.innerHTML = GALLERY_QUERIES
            .map(q => `<div class="tb-gallery-tile"><span>${q}</span></div>`)
            .join('');
    }

    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        referencesList.innerHTML = REFERENCES
            .map(r => `<li><a href="${r.link}" target="_blank" rel="noopener">${r.text}</a></li>`)
            .join('');
    }
});