/* ==========================================================================
   Nuranang Components
   Safe DOM rendering for elevation bars, seasons, and route timeline.
   ========================================================================== */

/**
 * Renders the elevation visualization bars.
 */
function renderElevation() {
    const container = document.getElementById('elevation-visual');
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);
    const fragment = document.createDocumentFragment();

    const title = document.createElement('h3');
    title.textContent = 'Altitude Profile (Meters)';
    title.style.marginTop = '0';
    title.style.marginBottom = '1.5rem';
    title.style.color = 'var(--text-primary)';
    fragment.appendChild(title);

    nuranangElevation.forEach(loc => {
        const bar = document.createElement('div');
        bar.className = 'elev-bar';

        const label = document.createElement('div');
        label.className = 'elev-label';
        label.textContent = loc.label;

        const track = document.createElement('div');
        track.className = 'elev-track';

        const fill = document.createElement('div');
        fill.className = 'elev-fill';
        fill.style.width = '0%';
        fill.textContent = `${loc.height}m`;

        setTimeout(() => {
            fill.style.width = `${(loc.height / loc.max) * 100}%`;
        }, 100);

        track.appendChild(fill);
        bar.appendChild(label);
        bar.appendChild(track);
        fragment.appendChild(bar);
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

    nuranangSeasons.forEach(season => {
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

/**
 * Renders the route timeline.
 */
function renderRouteTimeline() {
    const container = document.getElementById('route-timeline');
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);
    const fragment = document.createDocumentFragment();

    nuranangRoute.forEach(step => {
        const item = document.createElement('div');
        item.className = 'route-item animate-on-scroll';

        const title = document.createElement('div');
        title.className = 'route-title';
        title.textContent = step.title;

        const desc = document.createElement('div');
        desc.className = 'route-desc';
        desc.textContent = step.desc;

        item.appendChild(title);
        item.appendChild(desc);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}
