/* ==========================================================================
   Ganesh Chaturthi Explorer Logic
   Handles tab switching, map interactions, theme toggling, and Journey API.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Initialize all components and event listeners.
     */
    function init() {
        // Render all sections
        renderPandals();
        renderTimeline();
        renderFoods();

        // Setup interactions
        setupTabs();
        setupMapInteractions();
        setupThemeToggle();
        setupBookmark();
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

                // Re-setup scroll animations for newly visible content
                setupScrollAnimations();
            });
        });
    }

    /**
     * Setup map pin interactions.
     */
    function setupMapInteractions() {
        const pins = document.querySelectorAll('.map-pin');
        pins.forEach(pin => {
            pin.setAttribute('tabindex', '0');
            pin.setAttribute('role', 'button');

            const handleClick = () => {
                pin.style.transform = 'translate(-50%, -50%) scale(1.3)';
                setTimeout(() => {
                    pin.style.transform = 'translate(-50%, -50%)';
                }, 300);
            };

            pin.addEventListener('click', handleClick);
            pin.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
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

        // Restore saved theme
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

        const id = 'festival-ganesh-chaturthi';

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
                    explorerPage: 'frontend/ganesh-chaturthi/index.html',
                    title: 'Ganesh Chaturthi',
                    thumbnail: 'https://placehold.co/100/FF6F00/fff',
                    category: 'festivals'
                });
                updateBtnText();
            }
        });
    }

    /**
     * Setup scroll animations using IntersectionObserver.
     */
    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        // Disconnect previous observer if exists
        if (window.ganeshObserver) {
            window.ganeshObserver.disconnect();
        }

        window.ganeshObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    window.ganeshObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            window.ganeshObserver.observe(el);
        });
    }

    /**
     * Integrate with Journey API for global search.
     */
    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/ganesh-chaturthi/index.html', [
                {
                    id: 'festival-ganesh-chaturthi',
                    title: 'Ganesh Chaturthi',
                    description: 'The 10-day festival celebrating Lord Ganesha\'s arrival.',
                    link: '#'
                }
            ]);
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
})();
