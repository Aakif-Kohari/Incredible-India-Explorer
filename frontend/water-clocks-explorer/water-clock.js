document.addEventListener('DOMContentLoaded', () => {
    // ---- Stats grid ----
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = WATER_CLOCK_INFO.quickStats
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

    // ---- References ----
    const referencesList = document.getElementById('references-list');
    if (referencesList) {
        referencesList.innerHTML = REFERENCES
            .map(r => `<li><a href="${r.link}" target="_blank" rel="noopener">${r.text}</a></li>`)
            .join('');
    }

    // ---- Interactive sinking-bowl visualizer ----
    const GHATI_DURATION_SECONDS = 8; // scaled-down demo duration for one "ghati"
    const waterEl = document.getElementById('wc-water');
    const bowlEl = document.getElementById('wc-bowl');
    const startBtn = document.getElementById('wc-start-btn');
    const resetBtn = document.getElementById('wc-reset-btn');
    const elapsedEl = document.getElementById('wc-elapsed');
    const ghatiCountEl = document.getElementById('wc-ghati-count');

    let lastFrameTime = null;
    let rafId = null;
    let ghatiCount = 0;
    let elapsedSec = 0;
    let running = false;

    function render(progress) {
        bowlEl.style.transform = `translateY(${progress * 90}px) rotate(${progress * 8}deg)`;
        bowlEl.style.opacity = String(1 - progress * 0.15);
        elapsedEl.textContent = `${elapsedSec.toFixed(1)}s`;
    }

    function tick(now) {
        if (lastFrameTime === null) lastFrameTime = now;
        elapsedSec += (now - lastFrameTime) / 1000;
        lastFrameTime = now;

        const progress = Math.min(elapsedSec / GHATI_DURATION_SECONDS, 1);
        render(progress);

        if (progress >= 1) {
            ghatiCount += 1;
            ghatiCountEl.textContent = String(ghatiCount);
            elapsedSec = 0; // reset bowl for next cycle
            render(0);
        }

        if (running) rafId = requestAnimationFrame(tick);
    }

    startBtn?.addEventListener('click', () => {
        if (!running) {
            // Start or resume
            running = true;
            waterEl.classList.add('wc-water-active');
            lastFrameTime = null;
            rafId = requestAnimationFrame(tick);
            startBtn.textContent = '⏸ Pause';
        } else {
            // Pause in place
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            waterEl.classList.remove('wc-water-active');
            startBtn.textContent = '▶ Resume Sinking';
        }
    });

    resetBtn?.addEventListener('click', () => {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        lastFrameTime = null;
        elapsedSec = 0;
        ghatiCount = 0;
        ghatiCountEl.textContent = '0';
        elapsedEl.textContent = '0.0s';
        bowlEl.style.transform = 'translateY(0) rotate(0deg)';
        bowlEl.style.opacity = '1';
        waterEl.classList.remove('wc-water-active');
        startBtn.textContent = '▶ Start Sinking Bowl';
    });
});