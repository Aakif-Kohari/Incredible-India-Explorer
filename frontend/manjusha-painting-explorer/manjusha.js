/**
 * Manjusha Painting Explorer — Controller Module
 * Renders the data module into the explorer page.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderStats(MANJUSHA_INFO.quickStats, 'quick-stats');
    renderProcess(MATERIALS_AND_METHOD, 'process-steps');
    renderMotifs(TRADITIONAL_MOTIFS, 'motif-grid');
    renderStories(MYTH_STORIES, 'stories-grid');
    renderArtisan(ARTISAN_COMMUNITY, 'artisan-community');
    renderGallery(GALLERY_IMAGES, 'gallery-grid');
    renderReferences(REFERENCES, 'references');
});

function initThemeToggle() {
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('manjusha-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    if (localStorage.getItem('manjusha-theme') === 'dark') {
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

function renderMotifs(motifs, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = motifs.map(motif => `
        <div class="motif-card">
            <h4>${motif.name}</h4>
            <p>${motif.description}</p>
        </div>
    `).join('');
}

function renderStories(stories, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = stories.map(story => `
        <div class="story-card">
            <div class="story-icon" aria-hidden="true">${story.icon}</div>
            <h3>${story.title}</h3>
            <p>${story.story}</p>
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
