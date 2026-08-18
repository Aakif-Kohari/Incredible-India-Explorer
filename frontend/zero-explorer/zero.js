document.addEventListener('DOMContentLoaded', () => {
    // ---- Stats grid ----
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = ZERO_INFO.quickStats
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
    const timelineList = document.getElementById('timeline-list');
    if (timelineList) {
        timelineList.innerHTML = TIMELINE
            .map(t => `
                <div class="timeline-item">
                    <div class="timeline-era">${t.era}</div>
                    <div class="timeline-body">
                        <h4>${t.title}</h4>
                        <p>${t.description}</p>
                    </div>
                </div>
            `).join('');
    }

    // ---- Number line description ----
    const numberLineDesc = document.getElementById('number-line-desc');
    if (numberLineDesc) {
        numberLineDesc.textContent = NUMBER_LINE_INFO.description;
    }

    // ---- Comparison table ----
    const comparisonBody = document.getElementById('comparison-body');
    if (comparisonBody) {
        comparisonBody.innerHTML = COMPARISON_ROWS
            .map(r => `
                <tr>
                    <td>${r.aspect}</td>
                    <td>${r.before}</td>
                    <td>${r.after}</td>
                </tr>
            `).join('');
    }

    // ---- Modern applications ----
    const applicationsGrid = document.getElementById('applications-grid');
    if (applicationsGrid) {
        applicationsGrid.innerHTML = APPLICATIONS
            .map(a => `
                <div class="principle-card">
                    <h4>${a.title}</h4>
                    <p>${a.description}</p>
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

    // ---- Interactive number line ----
    const slider = document.getElementById('number-line-slider');
    const marker = document.getElementById('number-line-marker');
    const valueEl = document.getElementById('number-line-value');
    const factEl = document.getElementById('number-line-fact');

    const MIN = -10;
    const MAX = 10;

    function factFor(value) {
        if (value === 0) return "Zero — the anchor point. Neither positive nor negative.";
        if (value > 0) return `${value} is ${value} step${value === 1 ? '' : 's'} to the right of zero (positive).`;
        return `${value} is ${Math.abs(value)} step${Math.abs(value) === 1 ? '' : 's'} to the left of zero (negative).`;
    }

    function updateMarker(value) {
        const percent = ((value - MIN) / (MAX - MIN)) * 100;
        marker.style.left = `${percent}%`;
        marker.textContent = String(value);
        valueEl.textContent = String(value);
        factEl.textContent = factFor(value);
        marker.classList.toggle('is-zero', value === 0);
    }

    if (slider && marker) {
        slider.addEventListener('input', (e) => {
            updateMarker(Number(e.target.value));
        });
        updateMarker(0);
    }
});