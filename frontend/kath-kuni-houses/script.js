/* ==========================================================================
   Kath Kuni Houses Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const layerData = {
        base: { title: 'Dry Stone Base', desc: 'The foundation is built using large, uncut river stones without any mortar. This allows the base to shift slightly during tremors without cracking, acting as a flexible plinth.' },
        sill: { title: 'Timber Sill (Dori)', desc: 'A continuous wooden beam runs horizontally over the stone base. This distributes the load of the upper walls evenly and prevents moisture from wicking up from the ground into the timber.' },
        fill: { title: 'Stone Infill', desc: 'The cavity between the inner and outer wooden frames is packed tightly with stone and mud. This creates a massive thermal buffer, keeping the house warm in winter and cool in summer.' },
        corner: { title: 'Interlocking Corners', desc: 'The most defining feature. Alternate wooden beams interlock at the corners (like a log cabin) without nails. This creates a flexible, earthquake-resistant cage that holds the structure together.' },
        roof: { title: 'Slate Roof', desc: 'Heavy, locally quarried slate tiles are laid over wooden purlins. The steep pitch sheds snow rapidly, and the weight of the stone helps anchor the roof against high mountain winds.' }
    };

    function init() {
        setupThemeToggle();
        setupBookmark();
        setupDiagram();
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
        const id = 'house-kath-kuni';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/kath-kuni-houses/index.html', title: 'Kath Kuni Houses', thumbnail: 'https://placehold.co/100/b45309/fff', category: 'architecture' });
                updateBtn();
            }
        });
    }

    function setupDiagram() {
        const layers = document.querySelectorAll('.layer');
        const titleEl = document.getElementById('info-title');
        const descEl = document.getElementById('info-desc');

        const updateInfo = (key, el) => {
            layers.forEach(l => l.classList.remove('active'));
            el.classList.add('active');
            if (layerData[key]) {
                titleEl.textContent = layerData[key].title;
                descEl.textContent = layerData[key].desc;
            }
        };

        layers.forEach(layer => {
            const key = layer.dataset.info;
            layer.setAttribute('tabindex', '0');
            layer.addEventListener('click', () => updateInfo(key, layer));
            layer.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateInfo(key, layer); }
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
            window.Journey.registerSearchItems('frontend/kath-kuni-houses/index.html', [
                { id: 'house-kath-kuni', title: 'Kath Kuni Houses', description: 'Timber-stone architecture of Himachal.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
