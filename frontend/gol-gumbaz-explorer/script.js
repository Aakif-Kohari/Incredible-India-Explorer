/* ==========================================================================
   Gol Gumbaz Explorer Logic
   Handles tab switching, lightbox gallery, and Journey API integration.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Initialize all interactive features when DOM is ready.
     */
    function init() {
        setupTabs();
        setupThemeToggle();
        setupBookmark();
        setupLightbox();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    /**
     * Setup tab switching functionality with ARIA support.
     */
    function setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                contents.forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('hidden', '');
                });

                // Activate selected tab
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const panel = document.getElementById(tab.dataset.tab);
                if (panel) {
                    panel.classList.add('active');
                    panel.removeAttribute('hidden');
                }
            });
        });
    }

    /**
     * Setup theme toggle functionality with localStorage persistence.
     */
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

    /**
     * Setup bookmark functionality with Journey API.
     */
    function setupBookmark() {
        const btn = document.getElementById('bookmark-btn');
        if (!btn) return;

        const id = 'monument-gol-gumbaz';

        const updateBtnText = () => {
            if (window.Journey && window.Journey.isSaved(id)) {
                btn.textContent = '✅ Saved to Journey';
            } else {
                btn.textContent = '🔖 Bookmark to My Journey';
            }
        };

        updateBtnText();

        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({
                    id,
                    explorerPage: 'frontend/gol-gumbaz-explorer/index.html',
                    title: 'Gol Gumbaz',
                    thumbnail: 'https://placehold.co/100/d97706/fff',
                    category: 'monuments'
                });
                updateBtnText();
            }
        });
    }

    /**
     * Setup lightbox modal for gallery images with keyboard support.
     */
    function setupLightbox() {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const modalCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!modal || !closeBtn) return;

        const openLightbox = (src, alt, caption) => {
            modalImg.src = src;
            modalImg.alt = alt;
            modalCaption.textContent = caption;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            closeBtn.focus();
        };

        const closeLightbox = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            modalImg.src = '';
        };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption);
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeLightbox();
        });
    }

    /**
     * Setup scroll animations using IntersectionObserver.
     */
    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    /**
     * Integrate with Journey API for global search.
     */
    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/gol-gumbaz-explorer/index.html', [
                {
                    id: 'monument-gol-gumbaz',
                    title: 'Gol Gumbaz',
                    description: 'Karnataka\'s monumental dome and acoustic marvel of the Adil Shahi dynasty.',
                    link: '#'
                }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
