document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = SIDHU_INFO.quickStats
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

    const timelineEl = document.getElementById('sm-timeline');
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

    const rebellionGrid = document.getElementById('rebellion-grid');
    if (rebellionGrid) {
        rebellionGrid.innerHTML = REBELLION_POINTS
            .map(r => `
                <div class="sm-card">
                    <h4>${r.title}</h4>
                    <p>${r.description}</p>
                </div>
            `).join('');
    }

    const significanceContent = document.getElementById('significance-content');
    if (significanceContent) {
        significanceContent.innerHTML = SIGNIFICANCE_TEXT.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    const galleryEl = document.getElementById('sm-gallery');
    if (galleryEl) {
        galleryEl.innerHTML = GALLERY_QUERIES
            .map(q => `<div class="sm-gallery-tile"><span>${q}</span></div>`)
            .join('');
    }

    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        referencesList.innerHTML = REFERENCES
            .map(r => `<li><a href="${r.link}" target="_blank" rel="noopener">${r.text}</a></li>`)
            .join('');
    }
});