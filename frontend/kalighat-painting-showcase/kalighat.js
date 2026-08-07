/**
 * Kalighat Painting Showcase — Controller Module
 * Renders the data module into the showcase page.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderStats(KALIGHAT_INFO.quickStats, 'quick-stats');
    renderHistory(HISTORY_CHAPTERS, 'history-timeline');
    renderBrushwork(BRUSHWORK_STEPS, 'brushwork-steps');
    renderThemes(THEMES, 'themes-grid');
    renderArtisan(ARTIST_COMMUNITY, 'artist-community');
    renderGallery(GALLERY_IMAGES, 'gallery-grid');
    renderReferences(REFERENCES, 'references');
});

function initThemeToggle() {
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('kalighat-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    if (localStorage.getItem('kalighat-theme') === 'dark') {
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

function renderBrushwork(steps, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = steps.map(step => `
        <div class="brush-step">
            <div class="step-number">${String(step.step).padStart(2, '0')}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');
}

function renderThemes(themes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = themes.map(theme => `
        <div class="theme-card theme-${theme.category.toLowerCase().replace(/[^a-z]+/g, '-')}">
            <div class="theme-icon" aria-hidden="true">${theme.icon}</div>
            <span class="theme-category">${theme.category}</span>
            <h4>${theme.name}</h4>
            <p>${theme.description}</p>
        </div>
    `).join('');
}

function renderArtisan(community, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <h2>${community.title}</h2>
        <p>${community.description}</p>
    `;
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
