/* ==========================================================================
   Indian Art Forms Visualizer Landing Page Logic
   Vanilla JS handling search, filters, and dynamic rendering.
   ========================================================================== */

/**
 * Comprehensive dataset of Indian Art Forms.
 * Includes data for parallel PRs (#1681, #1682, #1683, #1684).
 * @type {Array<Object>}
 */
const artFormsData = [
    { id: 'madhubani', name: 'Madhubani Painting', region: 'Bihar', category: 'madhubani', desc: 'Folk art from the Mithila region, known for intricate geometric and floral patterns.', img: 'https://placehold.co/400x300/e11d48/fff', link: '../madhubani-painting-explorer/index.html' },
    { id: 'warli', name: 'Warli Art', region: 'Maharashtra', category: 'warli', desc: 'Tribal art form using basic geometric shapes to depict daily life and nature.', img: 'https://placehold.co/400x300/78350f/fff', link: '../warli-art-explorer/index.html' },
    { id: 'pattachitra', name: 'Pattachitra Art', region: 'Odisha', category: 'pattachitra', desc: 'Scroll painting tradition deeply rooted in mythological and religious themes.', img: 'https://placehold.co/400x300/b45309/fff', link: '../pattachitra-art-explorer/index.html' },
    { id: 'kalamkari', name: 'Kalamkari Art', region: 'Andhra Pradesh', category: 'kalamkari', desc: 'Hand-painted or block-printed cotton textile art depicting epics and folklore.', img: 'https://placehold.co/400x300/065f46/fff', link: '../kalamkari-art-explorer/index.html' },
    { id: 'tanchoi', name: 'Tanchoi Weaving', region: 'Varanasi', category: 'other', desc: 'Intricate brocade weaving technique blending Indian and Chinese traditions.', img: 'https://placehold.co/400x300/4c1d95/fff' },
    { id: 'phad', name: 'Phad Painting', region: 'Rajasthan', category: 'other', desc: 'Traditional scroll painting depicting folk deities like Pabuji and Devnarayan.', img: 'https://placehold.co/400x300/be123c/fff' },
    { id: 'miniature', name: 'Rajput Miniature', region: 'Rajasthan', category: 'other', desc: 'Highly detailed, small-scale paintings often illustrating royal courts and ragas.', img: 'https://placehold.co/400x300/0369a1/fff' },
    { id: 'thangka', name: 'Thangka Painting', region: 'Himalayas', category: 'other', desc: 'Sacred Tibetan Buddhist scroll paintings depicting deities and mandalas.', img: 'https://placehold.co/400x300/1e3a8a/d4af37', link: '../thangka-painting-explorer/index.html' },
    { id: 'gond', name: 'Gond Art', region: 'Madhya Pradesh', category: 'other', desc: 'Tribal art characterized by vibrant colors and dot/line patterns.', img: 'https://placehold.co/400x300/15803d/fff' }
];

let currentCategory = 'all';
let searchTerm = '';

function init() {
    renderFeatured();
    renderGallery();
    attachEventListeners();
    setupThemeToggle();
    setupScrollAnimations();
}

function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    const featured = artFormsData.filter(a => ['madhubani', 'warli', 'pattachitra', 'kalamkari'].includes(a.category));

    grid.innerHTML = featured.map(art => `
        <div class="featured-card animate-on-scroll">
            <div class="featured-img" style="background-image: url('${art.img}')">
                <span class="featured-badge">${art.region}</span>
            </div>
            <div class="featured-content">
                <h3>${art.name}</h3>
                <p>${art.desc}</p>
                <a href="${art.link}" class="btn-explore" aria-label="Explore ${art.name}">Explore Gallery &rarr;</a>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.featured-card').forEach(el => observer.observe(el));
}

function renderGallery() {
    const grid = document.getElementById('art-grid');
    const filtered = artFormsData.filter(art => {
        const matchCat = currentCategory === 'all' || art.category === currentCategory;
        const matchSearch = art.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            art.region.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No art forms found matching your criteria.</p>';
        return;
    }

    grid.innerHTML = filtered.map(art => `
        <div class="art-card animate-on-scroll" role="listitem" tabindex="0" ${art.link ? `onclick="window.location.href='${art.link}'"` : ''}>
            <div class="art-card-img" style="background-image: url('${art.img}')"></div>
            <div class="art-card-content">
                <h4>${art.name}</h4>
                <p>${art.desc}</p>
                <div class="art-card-tags">
                    <span class="tag">${art.region}</span>
                    <span class="tag">${art.category}</span>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.art-card').forEach(el => observer.observe(el));
}

function attachEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            currentCategory = btn.dataset.category;
            renderGallery();
        });
    });

    const searchInput = document.getElementById('art-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchTerm = e.target.value;
            renderGallery();
        }, 300));
    }
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.textContent = isLight ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        toggle.textContent = '☀️';
    }
}

let observer;
function setupScrollAnimations() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.addEventListener('DOMContentLoaded', init);
