document.addEventListener('DOMContentLoaded', () => {
    // ---- Stats grid ----
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = ZINC_INFO.quickStats
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

    // ---- Scientific principles ----
    const principlesGrid = document.getElementById('principles-grid');
    if (principlesGrid) {
        principlesGrid.innerHTML = SCIENTIFIC_PRINCIPLES
            .map(p => `
                <div class="principle-card">
                    <h4>${p.title}</h4>
                    <p>${p.description}</p>
                </div>
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

    // ---- Interactive step-through distillation process ----
    const retortEl = document.getElementById('retort-vessel');
    const tubeEl = document.getElementById('condenser-tube');
    const vaporDot = document.getElementById('vapor-dot');
    const condenserEl = document.getElementById('condenser-vessel');
    const nextBtn = document.getElementById('zinc-next-btn');
    const resetBtn = document.getElementById('zinc-reset-btn');
    const readoutEl = document.getElementById('zinc-step-readout');

    let stepIndex = -1; // -1 = not started

    function renderStep() {
        // Reset visual states
        retortEl?.classList.remove('is-active', 'is-heating');
        tubeEl?.classList.remove('is-active');
        vaporDot?.classList.remove('is-visible', 'is-descending');
        condenserEl?.classList.remove('is-active', 'is-filled');

        if (stepIndex < 0) {
            readoutEl.innerHTML = `<span>Click "Next Step" to begin the distillation cycle.</span>`;
            nextBtn.textContent = '▶ Next Step';
            return;
        }

        const step = PROCESS_STEPS[stepIndex];
        readoutEl.innerHTML = `
            <span class="zinc-step-title">${step.title}</span>
            <span class="zinc-step-desc">${step.description}</span>
        `;

        if (stepIndex === 0) {
            retortEl?.classList.add('is-active');
        } else if (stepIndex === 1) {
            retortEl?.classList.add('is-active', 'is-heating');
        } else if (stepIndex === 2) {
            retortEl?.classList.add('is-active', 'is-heating');
            tubeEl?.classList.add('is-active');
            vaporDot?.classList.add('is-visible', 'is-descending');
        } else if (stepIndex === 3) {
            tubeEl?.classList.add('is-active');
            condenserEl?.classList.add('is-active', 'is-filled');
        }

        nextBtn.textContent = stepIndex >= PROCESS_STEPS.length - 1 ? '✓ Cycle Complete' : '▶ Next Step';
        if (stepIndex >= PROCESS_STEPS.length - 1) {
            nextBtn.disabled = true;
        }
    }

    nextBtn?.addEventListener('click', () => {
        if (stepIndex >= PROCESS_STEPS.length - 1) return;
        stepIndex += 1;
        renderStep();
    });

    resetBtn?.addEventListener('click', () => {
        stepIndex = -1;
        nextBtn.disabled = false;
        renderStep();
    });

    renderStep();
});