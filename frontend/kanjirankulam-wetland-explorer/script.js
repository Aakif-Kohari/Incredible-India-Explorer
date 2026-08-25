/* ==========================================================================
   Kanjirankulam Wetland Explorer Logic
   Handles tab switching, lightbox, and Journey API integration.
   ========================================================================== */
(function () {
    'use strict';

    function init() {
        setupTabs();
        setupThemeToggle();
        setupBookmark();
        setupLightbox();
        setupScrollAnimations();
        setupJourneyIntegration();
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
        const id = 'wetland-kanjirankulam';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/kanjirankulam-wetland-explorer/index.html', title: 'Kanjirankulam Wetland', thumbnail: 'https://placehold.co/100/0d9488/fff', category: 'wetlands' });
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
            window.Journey.registerSearchItems('frontend/kanjirankulam-wetland-explorer/index.html', [
                { id: 'wetland-kanjirankulam', title: 'Kanjirankulam Wetland', description: 'Seasonal bird sanctuary famous for nesting Pelicans and Storks.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
