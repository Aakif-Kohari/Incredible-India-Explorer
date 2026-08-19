/* ==========================================================================
   Cosco Explorer Logic
   Handles sport-based filtering, product explorer, and Journey integration.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Comprehensive product data organized by sports categories.
     * @type {Array<Object>}
     */
    const productsData = [
        { id: 'cricket-bat-english', name: 'English Willow Cricket Bat', sport: 'cricket', desc: 'Professional-grade English Willow bat for serious cricketers, offering excellent stroke play and durability.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'cricket-ball-leather', name: 'Leather Cricket Ball', sport: 'cricket', desc: 'Premium leather cricket balls meeting international standards, used in tournaments and professional matches.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'cricket-pads', name: 'Cricket Batting Pads', sport: 'cricket', desc: 'Lightweight protective batting pads with high-density foam for maximum protection and comfort.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'hockey-stick-composite', name: 'Composite Hockey Stick', sport: 'hockey', desc: 'Advanced composite material hockey stick for better ball control and powerful shots.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'hockey-ball', name: 'Hockey Balls Pack', sport: 'hockey', desc: 'Tournament-quality hockey balls with consistent bounce and durability for practice and matches.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'football-match', name: 'Match Football', sport: 'football', desc: 'FIFA-approved match football with superior grip and flight characteristics for professional play.', img: 'https://placehold.co/400x300/f97316/fff' },
        { id: 'football-training', name: 'Training Football', sport: 'football', desc: 'Durable training football designed for daily practice sessions and skill development.', img: 'https://placehold.co/400x300/f97316/fff' },
        { id: 'tt-racket-pro', name: 'Professional TT Racket', sport: 'table-tennis', desc: 'Competition-grade table tennis racket with high-spin rubber for advanced players.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'tt-balls-pack', name: 'Table Tennis Balls', sport: 'table-tennis', desc: 'ITTF-approved table tennis balls with consistent bounce and durability for tournaments.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'badminton-racket', name: 'Badminton Racket', sport: 'badminton', desc: 'Carbon fiber badminton racket for power and control, suitable for intermediate to advanced players.', img: 'https://placehold.co/400x300/0ea5e9/fff' },
        { id: 'shuttlecocks-feather', name: 'Feather Shuttlecocks', sport: 'badminton', desc: 'Premium goose feather shuttlecocks for professional tournaments and serious practice sessions.', img: 'https://placehold.co/400x300/0ea5e9/fff' }
    ];

    /**
     * Sport descriptions for the info panel.
     * @type {Object}
     */
    const sportInfo = {
        all: {
            title: 'All Sports Equipment',
            desc: 'Explore Cosco\'s comprehensive range of sporting goods across multiple disciplines, from cricket and hockey to table tennis and badminton.'
        },
        cricket: {
            title: 'Cricket Equipment',
            desc: 'Professional cricket gear including English Willow bats, leather balls, and protective equipment meeting international standards for serious cricketers.'
        },
        hockey: {
            title: 'Hockey Equipment',
            desc: 'Advanced hockey sticks and accessories designed for better ball control, powerful shots, and durability in competitive play.'
        },
        football: {
            title: 'Football Gear',
            desc: 'FIFA-approved match and training footballs with superior grip, flight characteristics, and durability for all skill levels.'
        },
        'table-tennis': {
            title: 'Table Tennis Equipment',
            desc: 'Professional-grade rackets and ITTF-approved balls for competitive table tennis players and enthusiasts.'
        },
        badminton: {
            title: 'Badminton Equipment',
            desc: 'Carbon fiber rackets and premium shuttlecocks for power, control, and professional-level performance.'
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

        // Update sport info panel
        if (sportInfo[activeSport]) {
            sportTitle.textContent = sportInfo[activeSport].title;
            sportDesc.textContent = sportInfo[activeSport].desc;
        }

        // Re-observe new elements for scroll animation
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
        // Sport filters
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

        const id = 'brand-cosco';

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
                    explorerPage: 'frontend/cosco-explorer/index.html',
                    title: 'Cosco',
                    thumbnail: 'https://placehold.co/100/0ea5e9/fff',
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
            window.Journey.registerSearchItems('frontend/cosco-explorer/index.html', [
                {
                    id: 'brand-cosco',
                    title: 'Cosco',
                    description: 'India\'s trusted sporting goods brand since 1935.',
                    link: '#'
                }
            ]);
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
})();
