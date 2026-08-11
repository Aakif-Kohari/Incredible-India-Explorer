document.addEventListener('DOMContentLoaded', () => {
    // ---- Stats grid ----
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = IRON_PILLAR_INFO.quickStats
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

    // ---- Material composition ----
    const compositionList = document.getElementById('composition-list');
    if (compositionList) {
        compositionList.innerHTML = COMPOSITION
            .map(c => `
                <div class="composition-row">
                    <span class="composition-label">${c.label}</span>
                    <span class="composition-value">${c.value}</span>
                </div>
            `).join('');
    }

    // ---- Modern engineering relevance ----
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

    // ---- Interactive corrosion comparison slider ----
    const slider = document.getElementById('year-slider');
    const ordinaryRust = document.getElementById('ordinary-rust');
    const pillarRust = document.getElementById('pillar-rust');
    const readout = document.getElementById('ip-readout');

    // Rust fill percentage for ordinary iron vs. the pillar at each stage index
    const ORDINARY_RUST_LEVELS = [0, 35, 75, 100];
    const PILLAR_RUST_LEVELS = [0, 4, 6, 8];

    function renderStage(index) {
        const stage = CORROSION_STAGES[index];
        if (ordinaryRust) ordinaryRust.style.height = `${ORDINARY_RUST_LEVELS[index]}%`;
        if (pillarRust) pillarRust.style.height = `${PILLAR_RUST_LEVELS[index]}%`;

        if (readout) {
            readout.innerHTML = `
                <span class="ip-year">Year ${stage.year} — ${stage.title}</span>
                <span class="ip-desc"><strong>Ordinary Iron:</strong> ${stage.ordinaryDescription}</span>
                <span class="ip-desc"><strong>Iron Pillar:</strong> ${stage.pillarDescription}</span>
            `;
        }
    }

    if (slider) {
        slider.addEventListener('input', (e) => {
            renderStage(Number(e.target.value));
        });
        renderStage(0);
    }
});