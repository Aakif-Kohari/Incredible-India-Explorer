/* ==========================================================================
   Koti Banal Houses Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const partData = {
        plinth: { title: 'Massive Stone Plinth', desc: 'The structure rests on a broad, heavy dry-stone plinth. This lowers the center of gravity, preventing the tall multi-story building from overturning during lateral seismic forces.' },
        frame: { title: 'Timber Frame Cage', desc: 'A continuous wooden framework runs through the entire height of the building. The wood acts as a ductile skeleton that can bend and flex without breaking, absorbing the shockwaves.' },
        infill: { title: 'Dry Stone Infill', desc: 'The spaces between the timber frame are filled with un-mortared stones. During an earthquake, these stones rattle and grind against each other, creating friction that dissipates seismic energy.' },
        roof: { title: 'Heavy Slate Roof', desc: 'The heavy stone-slab roof acts as a massive weight at the top. While this seems counterintuitive, it keeps the timber joints under constant compression, preventing them from pulling apart during violent shaking.' }
    };

    function init() {
        setupThemeToggle();
        setupBookmark();
        setupCutaway();
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
        const id = 'house-koti-banal';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/koti-banal-houses/index.html', title: 'Koti Banal Houses', thumbnail: 'https://placehold.co/100/78716c/fff', category: 'architecture' });
                updateBtn();
            }
        });
    }

    function setupCutaway() {
        const layers = document.querySelectorAll('.cutaway-layer');
        const titleEl = document.getElementById('info-title');
        const descEl = document.getElementById('info-desc');

        const updateInfo = (key, el) => {
            layers.forEach(l => l.classList.remove('active'));
            el.classList.add('active');
            if (partData[key]) {
                titleEl.textContent = partData[key].title;
                descEl.textContent = partData[key].desc;
            }
        };

        layers.forEach(layer => {
            const key = layer.dataset.part;
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
            window.Journey.registerSearchItems('frontend/koti-banal-houses/index.html', [
                { id: 'house-koti-banal', title: 'Koti Banal Houses', description: 'Earthquake-resistant architecture of Uttarakhand.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
