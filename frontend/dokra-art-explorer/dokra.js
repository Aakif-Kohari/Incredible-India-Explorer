/**
 * Dokra Art Explorer — Controller Module
 * Renders the data module into the explorer page.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderStats(DOKRA_INFO.quickStats, 'quick-stats');
    renderHistory(HISTORY_CHAPTERS, 'history-timeline');
    renderProcess(LOST_WAX_PROCESS, 'process-steps');
    renderCommunities(ARTISAN_COMMUNITIES, 'communities-grid');
    renderGallery(GALLERY_IMAGES, 'gallery-grid');
    renderReferences(REFERENCES, 'references');
});

function initThemeToggle() {
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dokra-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    if (localStorage.getItem('dokra-theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function renderStats(stats, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">${stat.icon}</span>
            <div>
                <h4>${stat.label}</h4>
                <p>${stat.value}</p>
            </div>
        </div>
    `).join('');
}

function renderHistory(chapters, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = chapters.map(chapter => `
        <div class="history-entry">
            <div class="history-period">${chapter.period}</div>
            <h4>${chapter.title}</h4>
            <p>${chapter.description}</p>
        </div>
    `).join('');
}

function renderProcess(steps, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = steps.map(step => `
        <div class="process-step">
            <div class="step-number">${String(step.step).padStart(2, '0')}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');
}

function renderCommunities(communities, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = communities.map(community => `
        <div class="community-card">
            <h4>${community.name}</h4>
            <p>${community.description}</p>
        </div>
    `).join('');
}

function renderGallery(images, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = images.map(image => `
        <figure class="gallery-item">
            <img src="${image.url}" alt="${image.caption}" loading="lazy" onerror="this.closest('.gallery-item').style.display='none';">
            <figcaption>${image.caption}</figcaption>
        </figure>
    `).join('');
}

function renderReferences(references, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = references.map(ref => `
        <li>
            <a href="${ref.link}" target="_blank" rel="noopener noreferrer">${ref.text}</a>
        </li>
    `).join('');
}
