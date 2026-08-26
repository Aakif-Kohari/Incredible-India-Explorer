/* ==========================================================================
   Senapati Bapat Explorer Logic
   Handles tabs, timeline rendering, lightbox, and Journey API integration.
   ========================================================================== */
(function() {
    'use strict';

    function init() {
        renderTimeline();
        setupTabs();
        setupThemeToggle();
        setupBookmark();
        setupLightbox();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    /**
     * Render the historical timeline using safe DOM APIs.
     */
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container || typeof bapatTimeline === 'undefined') return;

        const fragment = document.createDocumentFragment();

        bapatTimeline.forEach(event => {
            const item = document.createElement('div');
            item.className = 'timeline-item animate-on-scroll';

            const year = document.createElement('div');
            year.className = 'timeline-year';
            year.textContent = event.year;

            const title = document.createElement('div');
            title.className = 'timeline-title';
            title.textContent = event.title;

            const desc = document.createElement('div');
            desc.className = 'timeline-desc';
            desc.textContent = event.desc;

            item.appendChild(year);
            item.appendChild(title);
            item.appendChild(desc);
            fragment.appendChild(item);
        });

        container.appendChild(fragment);

        if (window.scrollObserver) {
            container.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
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
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.textContent = '☀️';
        }
    }

    function setupBookmark() {
        const btn = document.getElementById('bookmark-btn');
        if (!btn) return;
        const id = 'freedom-bapat';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/senapati-bapat-explorer/index.html', title: 'Senapati Bapat', thumbnail: 'https://placehold.co/100/D84315/fff', category: 'freedom-fighters' });
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
            window.Journey.registerSearchItems('frontend/senapati-bapat-explorer/index.html', [
                { id: 'freedom-bapat', title: 'Senapati Bapat', description: 'Leader of the Mulshi Satyagraha and Maharashtra freedom fighter.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
