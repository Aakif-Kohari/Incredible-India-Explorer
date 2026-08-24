/* ==========================================================================
   Onam Components
   Safe DOM rendering functions for Onam sections.
   ========================================================================== */

/**
 * Render the 10-day Onam timeline.
 */
function renderOnamTimeline() {
    const container = document.getElementById('onam-timeline');
    if (!container) return;
    const fragment = document.createDocumentFragment();

    onamTimeline.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item animate-on-scroll';

        const day = document.createElement('div');
        day.className = 'timeline-day';
        day.textContent = event.day;

        const title = document.createElement('div');
        title.className = 'timeline-title';
        title.textContent = title.textContent = event.title; // Note: fixed assignment

        const desc = document.createElement('div');
        desc.className = 'timeline-desc';
        desc.textContent = event.desc;

        item.appendChild(day);
        item.appendChild(title);
        item.appendChild(desc);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/**
 * Render the traditions grid cards.
 */
function renderTraditions() {
    const grid = document.getElementById('traditions-grid');
    if (!grid) return;
    const fragment = document.createDocumentFragment();

    onamTraditions.forEach(t => {
        const card = document.createElement('article');
        card.className = 'tradition-card animate-on-scroll';

        const h4 = document.createElement('h4');
        h4.textContent = t.title;

        const p = document.createElement('p');
        p.textContent = t.desc;

        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

/**
 * Render the interactive Sadya menu explorer.
 */
function renderSadyaExplorer() {
    const container = document.getElementById('sadya-explorer');
    if (!container || sadyaMenu.length === 0) return;

    const menu = document.createElement('div');
    menu.className = 'sadya-menu';
    menu.setAttribute('role', 'tablist');

    const details = document.createElement('div');
    details.className = 'sadya-details';
    details.setAttribute('role', 'tabpanel');

    sadyaMenu.forEach((dish, index) => {
        const btn = document.createElement('button');
        btn.className = `sadya-btn ${index === 0 ? 'active' : ''}`;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        btn.textContent = dish.name;

        btn.addEventListener('click', () => {
            menu.querySelectorAll('.sadya-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            updateSadyaDetails(dish, details);
        });

        menu.appendChild(btn);
    });

    container.appendChild(menu);
    container.appendChild(details);
    updateSadyaDetails(sadyaMenu[0], details);
}

function updateSadyaDetails(dish, container) {
    container.innerHTML = ''; // Safe clear
    const h3 = document.createElement('h3');
    h3.textContent = dish.name;
    const type = document.createElement('p');
    type.style.color = 'var(--accent)';
    type.style.fontWeight = '600';
    type.textContent = `Category: ${dish.type}`;
    const desc = document.createElement('p');
    desc.textContent = dish.desc;

    container.appendChild(h3);
    container.appendChild(type);
    container.appendChild(desc);
}

/**
 * Render the visual gallery.
 */
function renderOnamGallery() {
    const grid = document.getElementById('onam-gallery');
    if (!grid) return;

    const images = [
        { src: 'https://placehold.co/400x400/FFB703/1A2421?text=Pookalam', alt: 'Intricate Pookalam', caption: 'A vibrant floral carpet welcoming Mahabali' },
        { src: 'https://placehold.co/400x400/2D6A4F/fff?text=Vallam+Kali', alt: 'Snake Boat Race', caption: 'Chundan Vallams racing in the backwaters' },
        { src: 'https://placehold.co/400x400/FB8500/fff?text=Sadya', alt: 'Onam Sadya', caption: 'The grand 26-course vegetarian feast' },
        { src: 'https://placehold.co/400x400/FFB703/1A2421?text=Kathakali', alt: 'Kathakali Dance', caption: 'Classical dance-drama performance' }
    ];

    const fragment = document.createDocumentFragment();
    images.forEach(img => {
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
