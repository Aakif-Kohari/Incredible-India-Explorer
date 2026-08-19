document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = VELU_INFO.quickStats
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

    const timelineEl = document.getElementById('vn-timeline');
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

    const campaignsGrid = document.getElementById('campaigns-grid');
    if (campaignsGrid) {
        campaignsGrid.innerHTML = MILITARY_CAMPAIGNS
            .map(c => `
                <div class="vn-card">
                    <h4>${c.title}</h4>
                    <p>${c.note}</p>
                </div>
            `).join('');
    }

    const alliancesGrid = document.getElementById('alliances-grid');
    if (alliancesGrid) {
        alliancesGrid.innerHTML = ALLIANCES
            .map(a => `
                <div class="vn-card">
                    <h4>${a.title}</h4>
                    <p>${a.note}</p>
                </div>
            `).join('');
    }

    // Gallery: static placeholder tiles (wire up to a real asset source
    // or image_search integration later).
    const galleryEl = document.getElementById('vn-gallery');
    if (galleryEl) {
        galleryEl.innerHTML = GALLERY_QUERIES
            .map(q => `<div class="vn-gallery-tile"><span>${q}</span></div>`)
            .join('');
    }

    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        referencesList.innerHTML = REFERENCES
            .map(r => `<li><a href="${r.link}" target="_blank" rel="noopener">${r.text}</a></li>`)
            .join('');
    }
});