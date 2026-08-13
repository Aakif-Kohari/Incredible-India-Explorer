document.addEventListener('DOMContentLoaded', () => {
    // ---- Stats grid ----
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = CATARACT_INFO.quickStats
            .map(s => `
                <div class="stat-pill">
                    <span class="stat-icon">${s.icon}</span>
                    <span class="stat-value">${s.value}</span>
                    <span class="stat-label">${s.label}</span>
                </div>
            `).join('');
    }

    // ---- History ----
    const historyContent = document.getElementById('history-content');
    if (historyContent) {
        historyContent.innerHTML = `
            <h3>${HISTORY_TEXT.title}</h3>
            ${HISTORY_TEXT.paragraphs.map(p => `<p>${p}</p>`).join('')}
        `;
    }

    // ---- Timeline ----
    const timelineEl = document.getElementById('cs-timeline');
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

    // ---- Comparison table ----
    const comparisonBody = document.getElementById('comparison-body');
    if (comparisonBody) {
        comparisonBody.innerHTML = COMPARISON_ROWS
            .map(r => `
                <tr>
                    <td>${r.aspect}</td>
                    <td>${r.ancient}</td>
                    <td>${r.modern}</td>
                </tr>
            `).join('');
    }

    // ---- Medical significance ----
    const significanceGrid = document.getElementById('significance-grid');
    if (significanceGrid) {
        significanceGrid.innerHTML = SIGNIFICANCE_POINTS
            .map(p => `
                <div class="principle-card">
                    <h4>${p.title}</h4>
                    <p>${p.description}</p>
                </div>
            `).join('');
    }

    // ---- References ----
    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        referencesList.innerHTML = REFERENCES
            .map(r => `<li><a href="${r.link}" target="_blank" rel="noopener">${r.text}</a></li>`)
            .join('');
    }
});