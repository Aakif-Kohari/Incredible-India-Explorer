/* ==========================================================================
   Chandipur Explorer Logic
   Handles tabs, lightbox, theme toggle, and Journey API.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Initialize all components and event listeners.
     */
    function init() {
        // Render all sections
        renderTidalComparison();
        renderTidalChart();
        renderFeatureGrid('ecology-grid', ecologyData);
        renderFeatureGrid('activities-grid', activitiesData);
        renderFeatureGrid('nearby-grid', nearbyData);
        renderGallery();

        // Setup interactions
        setupTabs();
        setupThemeToggle();
        setupBookmark();
        setupLightbox();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    /**
     * Setup tab switching with ARIA support.
     */
    function setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                contents.forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('hidden', '');
                });

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const panel = document.getElementById(tab.dataset.tab);
                if (panel) {
                    panel.classList.add('active');
                    panel.removeAttribute('hidden');
                }

                // Re-setup scroll animations for newly visible content
                setupScrollAnimations();
            });
        });
    }

    /**
     * Setup theme toggle with localStorage persistence.
     */
    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.textContent = isLight ? '☀️' : '🌙';
            toggle.setAttribute('aria-label', isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme');
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

        const id = 'beach-chandipur';

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
                    explorerPage: 'frontend/chandipur-beach/index.html',
                    title: 'Chandipur Beach',
                    thumbnail: 'https://placehold.co/100/38BDF8/fff',
                    category: 'beaches'
                });
                updateBtnText();
            }
        });
    }

    /**
     * Setup lightbox modal for gallery images.
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
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        if (window.chandipurObserver) {
            window.chandipurObserver.disconnect();
        }

        window.chandipurObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    window.chandipurObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            window.chandipurObserver.observe(el);
        });
    }

    /**
     * Integrate with Journey API for global search.
     */
    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/chandipur-beach/index.html', [
                {
                    id: 'beach-chandipur',
                    title: 'Chandipur Beach',
                    description: 'Odisha\'s unique vanishing sea where you can walk 5km into the ocean.',
                    link: '#'
                }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
