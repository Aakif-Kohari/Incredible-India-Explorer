/* ==========================================================================
   Usri Falls Logic
   Handles tabs, scroll animations, and Journey API.
   ========================================================================== */
(function () {
    'use strict';

    function init() {
        renderFeatureGrid('structure-grid', usriStructure);
        renderSeasonComparison();
        renderFeatureGrid('attractions-grid', usriAttractions);
        setupTabs();
        setupThemeToggle();
        setupBookmark();
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
                setupScrollAnimations(); // Re-observe
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
        const id = 'waterfall-usri';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/usri-falls/index.html', title: 'Usri Falls', thumbnail: 'https://placehold.co/100/4CAF50/fff', category: 'waterfalls' });
                updateBtn();
            }
        });
    }

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        if (window.usriObserver) window.usriObserver.disconnect();

        window.usriObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    window.usriObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            window.usriObserver.observe(el);
        });
    }

    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/usri-falls/index.html', [
                { id: 'waterfall-usri', title: 'Usri Falls', description: 'The three-stream forest cascade of Giridih, Jharkhand.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();

