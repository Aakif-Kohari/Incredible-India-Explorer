/* ==========================================================================
   Chitrangudi Wetland Explorer Logic
   Handles tab switching, bird filtering, lightbox, and Journey API.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Bird species data for the interactive filter.
     * @type {Array<Object>}
     */
    const birdsData = [
        { id: 'painted-stork', name: 'Painted Stork', type: 'migratory', desc: 'Large wading birds that form massive nesting colonies in the tamarind trees.', img: 'https://placehold.co/400x200/0284c7/fff' },
        { id: 'spot-billed-pelican', name: 'Spot-billed Pelican', type: 'resident', desc: 'A spectacular resident breeder, known for its large pouch and cooperative fishing.', img: 'https://placehold.co/400x200/0284c7/fff' },
        { id: 'little-cormorant', name: 'Little Cormorant', type: 'resident', desc: 'Small, dark waterbirds frequently seen diving for fish in the shallow tank.', img: 'https://placehold.co/400x200/0284c7/fff' },
        { id: 'asian-openbill', name: 'Asian Openbill Stork', type: 'resident', desc: 'Specialized snail-eaters with a distinctive gap in their bill, common in the sanctuary.', img: 'https://placehold.co/400x200/0284c7/fff' },
        { id: 'ibis', name: 'Black-headed Ibis', type: 'migratory', desc: 'Elegant waders with curved bills that probe the mudflats for invertebrates.', img: 'https://placehold.co/400x200/0284c7/fff' },
        { id: 'night-heron', name: 'Black-crowned Night Heron', type: 'resident', desc: 'Nocturnal hunters that roost in the dense canopy during the day.', img: 'https://placehold.co/400x200/0284c7/fff' }
    ];

    let activeBirdFilter = 'all';

    function init() {
        renderBirds();
        setupTabs();
        setupThemeToggle();
        setupBookmark();
        setupLightbox();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    /**
     * Render bird cards based on the active filter.
     */
    function renderBirds() {
        const grid = document.getElementById('bird-grid');
        if (!grid) return;

        const filtered = activeBirdFilter === 'all'
            ? birdsData
            : birdsData.filter(b => b.type === activeBirdFilter);

        grid.innerHTML = filtered.map(bird => `
            <article class="bird-card animate-on-scroll">
                <div class="bird-card-img" style="background-image: url('${bird.img}')"></div>
                <div class="bird-card-content">
                    <span class="bird-tag">${bird.type}</span>
                    <h4>${bird.name}</h4>
                    <p>${bird.desc}</p>
                </div>
            </article>
        `).join('');

        if (window.scrollObserver) {
            grid.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
        }
    }

    function setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
                contents.forEach(c => { c.classList.remove('active'); c.setAttribute('hidden', ''); });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const panel = document.getElementById(tab.dataset.tab);
                if (panel) { panel.classList.add('active'); panel.removeAttribute('hidden'); }
            });
        });
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.textContent = isLight ? '☀️' : '🌙';
        });
        if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
    }

    function setupBookmark() {
        const btn = document.getElementById('bookmark-btn');
        if (!btn) return;
        const id = 'wetland-chitrangudi';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/chitrangudi-wetland-explorer/index.html', title: 'Chitrangudi Wetland', thumbnail: 'https://placehold.co/100/0284c7/fff', category: 'wetlands' });
                updateBtn();
            }
        });
    }

    function setupLightbox() {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const modalCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (!modal || !closeBtn) return;

        const openLightbox = (src, alt, caption) => {
            modalImg.src = src; modalImg.alt = alt; modalCaption.textContent = caption;
            modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); closeBtn.focus();
        };
        const closeLightbox = () => { modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); modalImg.src = ''; };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption));
            item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption); } });
        });
        closeBtn.addEventListener('click', closeLightbox);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeLightbox(); });
    }

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        window.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); window.scrollObserver.unobserve(entry.target); } });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
    }

    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/chitrangudi-wetland-explorer/index.html', [
                { id: 'wetland-chitrangudi', title: 'Chitrangudi Wetland', description: 'Bird sanctuary in Tamil Nadu known for nesting colonies.', link: '#' }
            ]);
        }
    }

    // Attach bird filter listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('bird-filter-btn')) {
            document.querySelectorAll('.bird-filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeBirdFilter = e.target.dataset.type;
            renderBirds();
        }
    });

    document.addEventListener('DOMContentLoaded', init);
})();
