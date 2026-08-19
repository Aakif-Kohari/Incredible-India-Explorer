document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = BAGHA_JATIN_INFO.quickStats
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

    const timelineEl = document.getElementById('bj-timeline');
    if (timelineEl) {
        timelineEl.innerHTML = TIMELINE_EVENTS
            .map(ev => `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="timeline-era">${ev.era}</span>
                        <h4>${ev.title}</h4>
                        <p>${ev.description}</p>
                    </div>
                </div>
            `).join('');
    }

    const networkGrid = document.getElementById('network-grid');
    if (networkGrid) {
        networkGrid.innerHTML = NETWORK_POINTS
            .map(n => `
                <div class="bj-card">
                    <h4>${n.title}</h4>
                    <p>${n.description}</p>
                </div>
            `).join('');
    }

    const legacyContent = document.getElementById('legacy-content');
    if (legacyContent) {
        legacyContent.innerHTML = LEGACY_TEXT.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    const galleryEl = document.getElementById('bj-gallery');
    if (galleryEl) {
        galleryEl.innerHTML = GALLERY_QUERIES
            .map(q => `<div class="bj-gallery-tile"><span>${q}</span></div>`)
            .join('');
    }

    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        referencesList.innerHTML = REFERENCES
            .map(r => `<li><a href="${r.link}" target="_blank" rel="noopener">${r.text}</a></li>`)
            .join('');
    }
});