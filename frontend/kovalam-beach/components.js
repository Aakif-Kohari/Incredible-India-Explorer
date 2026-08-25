/* ==========================================================================
   Kovalam Components
   Safe DOM rendering functions for Kovalam sections.
   ========================================================================== */

/**
 * Render a grid of feature cards (used for beaches and activities).
 * @param {string} containerId - The ID of the grid container.
 * @param {Array} data - The array of objects to render.
 */
function renderFeatureGrid(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'feature-card animate-on-scroll';

        const img = document.createElement('div');
        img.className = 'feature-img';
        img.style.backgroundImage = `url('${item.img}')`;
        img.setAttribute('role', 'img');
        img.setAttribute('aria-label', item.name);

        const content = document.createElement('div');
        content.className = 'feature-content';

        const h4 = document.createElement('h4');
        h4.textContent = item.name;

        const p = document.createElement('p');
        p.textContent = item.desc;

        content.appendChild(h4);
        content.appendChild(p);
        card.appendChild(img);
        card.appendChild(content);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Render the visual gallery.
 */
function renderKovalamGallery() {
    const grid = document.getElementById('kovalam-gallery');
    if (!grid) return;

    const fragment = document.createDocumentFragment();
    kovalamGallery.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.tabIndex = 0;
        item.dataset.img = img.src;
        item.dataset.caption = img.caption;
        item.setAttribute('role', 'listitem');

        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt;
        imgEl.loading = 'lazy';

        item.appendChild(imgEl);
        fragment.appendChild(item);
    });

    grid.appendChild(fragment);
}
