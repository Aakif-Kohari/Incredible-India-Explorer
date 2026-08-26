/* ==========================================================================
   Waterfalls Explorer Logic
   Handles filtering, searching, theme toggling, and scroll animations.
   ========================================================================== */
(function () {
    'use strict';

    let activeCategory = 'all';
    let searchTerm = '';
    let filterState = 'all';
    let filterType = 'all';
    let filterSeason = 'all';

    function init() {
        populateFilters();
        renderMapPins(waterfallsData);
        renderStats();
        applyFilters();
        attachEventListeners();
        setupThemeToggle();
        setupScrollAnimations();
        updateHeroStats();
    }

    function updateHeroStats() {
        document.getElementById('total-falls').textContent = waterfallsData.length;
        const states = new Set(waterfallsData.map(f => f.state));
        document.getElementById('total-states').textContent = states.size;
    }

    function populateFilters() {
        const stateSelect = document.getElementById('filter-state');
        const typeSelect = document.getElementById('filter-type');
        const seasonSelect = document.getElementById('filter-season');

        const states = [...new Set(waterfallsData.map(f => f.state))].sort();
        states.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s; opt.textContent = s;
            stateSelect.appendChild(opt);
        });

        const types = [...new Set(waterfallsData.map(f => f.type))].sort();
        types.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t; opt.textContent = t.charAt(0).toUpperCase() + t.slice(1);
            typeSelect.appendChild(opt);
        });

        const seasons = [...new Set(waterfallsData.map(f => f.season))].sort();
        seasons.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s; opt.textContent = s;
            seasonSelect.appendChild(opt);
        });
    }

    function applyFilters() {
        let filtered = [...waterfallsData];

        if (activeCategory !== 'all') {
            filtered = filtered.filter(f => f.type === activeCategory);
        }
        if (filterState !== 'all') {
            filtered = filtered.filter(f => f.state === filterState);
        }
        if (filterType !== 'all') {
            filtered = filtered.filter(f => f.type === filterType);
        }
        if (filterSeason !== 'all') {
            filtered = filtered.filter(f => f.season === filterSeason);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(f =>
                f.name.toLowerCase().includes(term) ||
                f.state.toLowerCase().includes(term) ||
                f.river.toLowerCase().includes(term)
            );
        }

        renderWaterfallCards(filtered);
        setupScrollAnimations(); // Re-observe new cards
    }

    function attachEventListeners() {
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.dataset.cat;
                applyFilters();
            });
        });

        document.getElementById('search-input').addEventListener('input', debounce((e) => {
            searchTerm = e.target.value;
            applyFilters();
        }, 300));

        document.getElementById('filter-state').addEventListener('change', (e) => { filterState = e.target.value; applyFilters(); });
        document.getElementById('filter-type').addEventListener('change', (e) => { filterType = e.target.value; applyFilters(); });
        document.getElementById('filter-season').addEventListener('change', (e) => { filterSeason = e.target.value; applyFilters(); });
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
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

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        if (window.waterfallObserver) window.waterfallObserver.disconnect();

        window.waterfallObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    window.waterfallObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            window.waterfallObserver.observe(el);
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
