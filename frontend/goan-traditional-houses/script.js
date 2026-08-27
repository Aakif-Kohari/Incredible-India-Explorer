/* ==========================================================================
   Goan Traditional Houses Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const elementData = {
        roof: { title: 'Mangalore Tile Roof', desc: 'Steeply pitched roofs covered with overlapping Mangalore clay tiles. The steep angle ensures rapid runoff during the torrential Goan monsoons, while the clay provides excellent thermal insulation against the tropical heat.' },
        balcony: { title: 'Balcao (Seating Verandah)', desc: 'A covered porch with built-in cement seating facing the street. It serves as a semi-public space where the family interacts with the village life, reflecting the extroverted nature of Goan culture influenced by the Portuguese.' },
        windows: { title: 'Oyster Shell Windows', desc: 'Large, ornate windows fitted with translucent oyster shells instead of glass. The shells filter the harsh sunlight into a soft, pearlescent glow while allowing the sea breeze to ventilate the interiors.' },
        verandah: { title: 'Grand Entrance Stairs', desc: 'Wide, sweeping staircases lead up to the main door. Raising the house on a high plinth protected it from monsoon floods and demonstrated the social status and wealth of the homeowner.' },
        plinth: { title: 'Laterite Stone Base', desc: 'The foundation and walls are constructed from locally quarried laterite stone. This porous, iron-rich stone is incredibly durable, resists moisture, and is naturally resistant to termites.' }
    };

    function init() {
        setupThemeToggle();
        setupBookmark();
        setupFacade();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            toggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
        if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
    }

    function setupBookmark() {
        const btn = document.getElementById('bookmark-btn');
        const id = 'house-goan';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/goan-traditional-houses/index.html', title: 'Goan Traditional Houses', thumbnail: 'https://placehold.co/100/e11d48/fff', category: 'architecture' });
                updateBtn();
            }
        });
    }

    function setupFacade() {
        const hotspots = document.querySelectorAll('.hotspot');
        const titleEl = document.getElementById('info-title');
        const descEl = document.getElementById('info-desc');

        const updateInfo = (key, el) => {
            hotspots.forEach(h => h.classList.remove('active'));
            el.classList.add('active');
            if (elementData[key]) {
                titleEl.textContent = elementData[key].title;
                descEl.textContent = elementData[key].desc;
            }
        };

        hotspots.forEach(hotspot => {
            const key = hotspot.dataset.element;
            hotspot.addEventListener('click', () => updateInfo(key, hotspot));
            hotspot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateInfo(key, hotspot); }
            });
        });
    }

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    function setupJourneyIntegration() {
        if (window.Journey && window.Journey.registerSearchItems) {
            window.Journey.registerSearchItems('frontend/goan-traditional-houses/index.html', [
                { id: 'house-goan', title: 'Goan Traditional Houses', description: 'Indo-Portuguese architectural blend.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
