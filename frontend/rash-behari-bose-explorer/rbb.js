document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = RBB_INFO.quickStats
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

    const timelineEl = document.getElementById('rbb-timeline');
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

    const internationalGrid = document.getElementById('international-grid');
    if (internationalGrid) {
        internationalGrid.innerHTML = INTERNATIONAL_ACTIVITIES
            .map(a => `
                <div class="principle-card">
                    <h4>${a.title}</h4>
                    <p>${a.description}</p>
                </div>
            `).join('');
    }

    const inaContent = document.getElementById('ina-content');
    if (inaContent) {
        inaContent.innerHTML = INA_TEXT.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        referencesList.innerHTML = REFERENCES
            .map(r => `<li><a href="${r.link}" target="_blank" rel="noopener">${r.text}</a></li>`)
            .join('');
    }
});