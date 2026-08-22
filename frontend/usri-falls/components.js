/* ==========================================================================
   Usri Falls Components
   Safe DOM rendering for structure, seasons, and attractions.
   ========================================================================== */

/**
 * Renders a generic feature grid.
 */
function renderFeatureGrid(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'feature-card animate-on-scroll';

        const h4 = document.createElement('h4');
        h4.textContent = item.title;

        const p = document.createElement('p');
        p.textContent = item.desc;

        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the seasonal comparison cards.
 */
function renderSeasonComparison() {
    const container = document.getElementById('season-comparison');
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);
    const fragment = document.createDocumentFragment();

    usriSeasons.forEach(season => {
        const card = document.createElement('div');
        card.className = 'season-card animate-on-scroll';

        const img = document.createElement('div');
        img.className = 'season-img';
        img.style.backgroundImage = `url('${season.img}')`;
        img.setAttribute('role', 'img');
        img.setAttribute('aria-label', season.title);

        const content = document.createElement('div');
        content.className = 'season-content';

        const h4 = document.createElement('h4');
        h4.textContent = season.title;

        const p = document.createElement('p');
        p.textContent = season.desc;

        content.appendChild(h4);
        content.appendChild(p);

        card.appendChild(img);
        card.appendChild(content);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}
