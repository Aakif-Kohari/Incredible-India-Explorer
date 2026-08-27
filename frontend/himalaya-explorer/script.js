/* ==========================================================================
   Himalaya Explorer Logic
   Handles product category filtering, tab management, and Journey integration.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Comprehensive product data organized by categories.
     * @type {Array<Object>}
     */
    const productsData = [
        { id: 'neem-face-wash', name: 'Neem Face Wash', category: 'skincare', desc: 'India\'s #1 face wash with Neem and Turmeric for clear, acne-free skin.', img: 'https://placehold.co/400x300/10b981/fff' },
        { id: 'aloe-vera-gel', name: 'Aloe Vera Gel', category: 'skincare', desc: 'Pure Aloe Vera gel for moisturizing, soothing, and healing skin naturally.', img: 'https://placehold.co/400x300/10b981/fff' },
        { id: 'anti-dandruff-shampoo', name: 'Anti-Dandruff Shampoo', category: 'haircare', desc: 'Tea Tree and Aloe Vera formula for dandruff-free, healthy scalp and hair.', img: 'https://placehold.co/400x300/10b981/fff' },
        { id: 'protein-hair-cream', name: 'Protein Hair Cream', category: 'haircare', desc: 'Enriched with Amla and Cactus for strong, nourished, and manageable hair.', img: 'https://placehold.co/400x300/10b981/fff' },
        { id: 'gentle-baby-wipes', name: 'Gentle Baby Wipes', category: 'baby-care', desc: 'Alcohol-free wipes with Olive Oil and Chamomile for baby\'s delicate skin.', img: 'https://placehold.co/400x300/fbbf24/000' },
        { id: 'baby-lotion', name: 'Baby Lotion', category: 'baby-care', desc: 'Olive Oil and Almond Oil blend for soft, moisturized baby skin.', img: 'https://placehold.co/400x300/fbbf24/000' },
        { id: 'liv52', name: 'Liv.52', category: 'healthcare', desc: 'World\'s best-selling liver supplement, protecting liver health since 1955.', img: 'https://placehold.co/400x300/059669/fff' },
        { id: 'cough-syrup', name: 'Cough Syrup', category: 'healthcare', desc: 'Herbal cough relief with Tulsi, Vasaka, and Honey for effective action.', img: 'https://placehold.co/400x300/059669/fff' },
        { id: 'hand-wash', name: 'Hand Wash', category: 'personal-care', desc: 'Antibacterial hand wash with Neem and Orange for clean, protected hands.', img: 'https://placehold.co/400x300/10b981/fff' },
        { id: 'body-lotion', name: 'Body Lotion', category: 'personal-care', desc: 'Cocoa Butter and Wheat Germ Oil for deep moisturization and soft skin.', img: 'https://placehold.co/400x300/10b981/fff' }
    ];

    /**
     * Category descriptions for the info panel.
     * @type {Object}
     */
    const categoryInfo = {
        all: {
            title: 'All Product Categories',
            desc: 'Explore Himalaya\'s comprehensive range of herbal personal care and healthcare products, spanning skincare, haircare, baby care, and wellness supplements.'
        },
        skincare: {
            title: 'Skincare Range',
            desc: 'Himalaya\'s skincare products combine Ayurvedic herbs like Neem, Turmeric, and Aloe Vera with modern dermatological science for effective, gentle skincare solutions.'
        },
        haircare: {
            title: 'Haircare Solutions',
            desc: 'Herbal haircare formulations featuring Amla, Bhringraj, and Tea Tree Oil to address dandruff, hair fall, and promote healthy hair growth naturally.'
        },
        'personal-care': {
            title: 'Personal Care',
            desc: 'Daily essentials including hand wash, body lotions, and hygiene products infused with natural ingredients for gentle, effective personal care.'
        },
        healthcare: {
            title: 'Healthcare Products',
            desc: 'Research-backed Ayurvedic supplements and medicines, including the iconic Liv.52, addressing various health concerns with natural formulations.'
        },
        'baby-care': {
            title: 'Baby Care Range',
            desc: 'Gentle, safe products for babies featuring Olive Oil, Almond Oil, and Chamomile, designed specifically for delicate baby skin and hair.'
        }
    };

    let activeCategory = 'all';

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
     * Render products based on active category filter.
     */
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        const categoryTitle = document.getElementById('category-title');
        const categoryDesc = document.getElementById('category-description');

        if (!grid || !categoryTitle || !categoryDesc) return;

        const filtered = activeCategory === 'all'
            ? productsData
            : productsData.filter(p => p.category === activeCategory);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found in this category.</p>';
        } else {
            grid.innerHTML = filtered.map(product => `
                <article class="product-card animate-on-scroll" role="listitem">
                    <div class="product-img" style="background-image: url('${product.img}')"></div>
                    <div class="product-content">
                        <span class="product-tag">${product.category}</span>
                        <h4>${product.name}</h4>
                        <p>${product.desc}</p>
                    </div>
                </article>
            `).join('');
        }

        // Update category info panel
        if (categoryInfo[activeCategory]) {
            categoryTitle.textContent = categoryInfo[activeCategory].title;
            categoryDesc.textContent = categoryInfo[activeCategory].desc;
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
        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.category-tab').forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                activeCategory = tab.dataset.category;
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

        const id = 'brand-himalaya';

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
                    explorerPage: 'frontend/himalaya-explorer/index.html',
                    title: 'Himalaya',
                    thumbnail: 'https://placehold.co/100/10b981/fff',
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
            window.Journey.registerSearchItems('frontend/himalaya-explorer/index.html', [
                {
                    id: 'brand-himalaya',
                    title: 'Himalaya',
                    description: 'India\'s leading herbal personal care brand since 1930.',
                    link: '#'
                }
            ]);
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
})();
