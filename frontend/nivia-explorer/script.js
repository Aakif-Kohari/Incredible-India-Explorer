/* ==========================================================================
   Nivia Explorer Logic
   Handles sport-by-sport filtering, football showcase, and Journey integration.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Comprehensive product data organized by sports categories.
     * @type {Array<Object>}
     */
    const productsData = [
        { id: 'ashtang-football', name: 'Nivia Ashtang', sport: 'football', desc: '8-panel FIFA Quality Pro certified match ball used in ISL and international tournaments.', img: 'https://placehold.co/400x300/dc2626/fff' },
        { id: 'encounter-football', name: 'Nivia Encounter', sport: 'football', desc: 'Training and match football with durable PU leather and consistent flight characteristics.', img: 'https://placehold.co/400x300/dc2626/fff' },
        { id: 'storm-football', name: 'Nivia Storm', sport: 'football', desc: 'All-weather football designed for rough surfaces and intensive training sessions.', img: 'https://placehold.co/400x300/dc2626/fff' },
        { id: 'goalkeeper-gloves', name: 'Pro Goalkeeper Gloves', sport: 'football', desc: 'Premium latex palm goalkeeper gloves offering superior grip and finger protection.', img: 'https://placehold.co/400x300/dc2626/fff' },
        { id: 'basketball-official', name: 'Nivia Pro Basketball', sport: 'basketball', desc: 'Official size and weight basketball with superior grip for indoor and outdoor courts.', img: 'https://placehold.co/400x300/f97316/fff' },
        { id: 'basketball-training', name: 'Nivia Street Ball', sport: 'basketball', desc: 'Durable rubber basketball designed for outdoor street courts and practice sessions.', img: 'https://placehold.co/400x300/f97316/fff' },
        { id: 'volleyball-match', name: 'Nivia Ashtang Volleyball', sport: 'volleyball', desc: 'Competition-grade volleyball with soft touch cover and perfect weight balance.', img: 'https://placehold.co/400x300/eab308/000' },
        { id: 'volleyball-training', name: 'Nivia Training Volleyball', sport: 'volleyball', desc: 'Durable training volleyball suitable for school and club practice sessions.', img: 'https://placehold.co/400x300/eab308/000' },
        { id: 'athletics-shoes', name: 'Nivia Sprint Spikes', sport: 'athletics', desc: 'Lightweight track spikes for sprinters, featuring aggressive spike plate for maximum traction.', img: 'https://placehold.co/400x300/1e40af/fff' },
        { id: 'running-shoes', name: 'Nivia Marathon Pro', sport: 'athletics', desc: 'Long-distance running shoes with advanced cushioning for marathon and training runs.', img: 'https://placehold.co/400x300/1e40af/fff' },
        { id: 'football-jersey', name: 'Team Jersey', sport: 'sports-wear', desc: 'Breathable polyester jerseys with moisture-wicking technology for peak performance.', img: 'https://placehold.co/400x300/059669/fff' },
        { id: 'sports-shorts', name: 'Performance Shorts', sport: 'sports-wear', desc: 'Lightweight training shorts with stretch fabric for unrestricted movement.', img: 'https://placehold.co/400x300/059669/fff' },
        { id: 'football-boots', name: 'Nivia Dominos Boots', sport: 'football', desc: 'Professional football boots with firm ground studs for superior traction and ball control.', img: 'https://placehold.co/400x300/dc2626/fff' }
    ];

    /**
     * Sport descriptions for the info panel.
     * @type {Object}
     */
    const sportInfo = {
        all: {
            title: 'All Nivia Products',
            desc: 'Explore Nivia\'s comprehensive range spanning footballs, basketballs, athletics gear, and sports apparel - all engineered for peak performance.'
        },
        football: {
            title: 'Football Equipment',
            desc: 'Nivia\'s flagship category featuring FIFA-certified match balls, training footballs, goalkeeper gloves, and professional football boots trusted by champions.'
        },
        basketball: {
            title: 'Basketball Gear',
            desc: 'High-performance basketballs engineered for superior grip, consistent bounce, and durability across indoor and outdoor courts.'
        },
        volleyball: {
            title: 'Volleyball Equipment',
            desc: 'Competition and training volleyballs designed for perfect weight, soft touch, and reliable performance in matches.'
        },
        athletics: {
            title: 'Athletics Equipment',
            desc: 'Track spikes, running shoes, and performance gear for sprinters, marathoners, and athletes across disciplines.'
        },
        'sports-wear': {
            title: 'Sports Wear',
            desc: 'Breathable jerseys, performance shorts, and training apparel featuring moisture-wicking technology for maximum comfort.'
        }
    };

    let activeSport = 'all';

    /**
     * Initialize all interactive features when DOM is ready.
     */
    function init() {
        renderProducts();
        attachEventListeners();
        setupThemeToggle();
        setupBookmark();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    /**
     * Render products based on active sport filter.
     */
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        const sportTitle = document.getElementById('sport-title');
        const sportDesc = document.getElementById('sport-description');

        if (!grid || !sportTitle || !sportDesc) return;

        const filtered = activeSport === 'all'
            ? productsData
            : productsData.filter(p => p.sport === activeSport);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found for this sport.</p>';
        } else {
            grid.innerHTML = filtered.map(product => `
                <article class="product-card animate-on-scroll" role="listitem">
                    <div class="product-img" style="background-image: url('${product.img}')"></div>
                    <div class="product-content">
                        <span class="sport-tag">${product.sport}</span>
                        <h4>${product.name}</h4>
                        <p>${product.desc}</p>
                    </div>
                </article>
            `).join('');
        }

        if (sportInfo[activeSport]) {
            sportTitle.textContent = sportInfo[activeSport].title;
            sportDesc.textContent = sportInfo[activeSport].desc;
        }

        if (window.scrollObserver) {
            grid.querySelectorAll('.animate-on-scroll').forEach(el => {
                window.scrollObserver.observe(el);
            });
        }
    }

    /**
     * Attach event listeners to interactive elements.
     */
    function attachEventListeners() {
        document.querySelectorAll('.sport-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.sport-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                activeSport = btn.dataset.sport;
                renderProducts();
            });
        });
    }

    /**
     * Setup theme toggle functionality.
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

        const id = 'brand-nivia';

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
                    explorerPage: 'frontend/nivia-explorer/index.html',
                    title: 'Nivia',
                    thumbnail: 'https://placehold.co/100/dc2626/fff',
                    category: 'brands'
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
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        window.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    window.scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            window.scrollObserver.observe(el);
        });
    }

    /**
     * Integrate with Journey API for global search.
     */
    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/nivia-explorer/index.html', [
                {
                    id: 'brand-nivia',
                    title: 'Nivia',
                    description: 'India\'s premier football and sports equipment brand since 1934.',
                    link: '#'
                }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
