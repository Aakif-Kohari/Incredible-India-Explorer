/* ==========================================================================
   Dabur Explorer Logic
   Handles timeline filtering, product categories, and Journey API integration.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Comprehensive timeline data for Dabur's evolution from 1884 to present.
     * @type {Array<Object>}
     */
    const timelineData = [
        { year: 1884, decade: '1800', title: 'Foundation', desc: 'Dr. S.K. Burman establishes Dabur in Kolkata as an Ayurvedic pharmacy, focusing on herbal remedies for common diseases.' },
        { year: 1896, decade: '1800', title: 'Chyawanprash Launch', desc: 'Dabur Chyawanprash is introduced, becoming one of India\'s most trusted immunity boosters and a flagship product.' },
        { year: 1919, decade: '1900', title: 'Expansion Phase', desc: 'Dabur begins expanding beyond Kolkata, establishing distribution networks across Bengal and neighboring states.' },
        { year: 1935, decade: '1900', title: 'Manufacturing Unit', desc: 'First modern manufacturing facility established in Sahibabad, marking the transition from artisanal to industrial production.' },
        { year: 1952, decade: '1950', title: 'Post-Independence Growth', desc: 'Dabur incorporates as a public limited company, positioning itself for national expansion in independent India.' },
        { year: 1970, decade: '1950', title: 'Diversification', desc: 'Company diversifies into personal care products, launching Dabur Amla Hair Oil, which becomes a market leader.' },
        { year: 1984, decade: '1950', title: 'Centennial Celebration', desc: 'Dabur completes 100 years, launching the Dabur Research Foundation to advance Ayurvedic research and development.' },
        { year: 1994, decade: '1950', title: 'IPO & Public Listing', desc: 'Dabur goes public with an Initial Public Offering, raising capital for aggressive expansion and modernization.' },
        { year: 2000, decade: '2000', title: 'Global Expansion', desc: 'Dabur enters international markets, establishing presence in Middle East, Africa, and Southeast Asia.' },
        { year: 2007, decade: '2000', title: 'Fem Care Acquisition', desc: 'Acquires Fem Care Pharma, strengthening its position in the personal care and beauty segment.' },
        { year: 2013, decade: '2000', title: 'Hajmola Dominance', desc: 'Hajmola digestive tablets become a cultural phenomenon, capturing 75% market share in the digestive category.' },
        { year: 2020, decade: '2000', title: 'COVID Response', desc: 'Dabur ramps up production of immunity products like Chyawanprash and herbal sanitizers during the pandemic.' },
        { year: 2024, decade: '2000', title: '140 Years Legacy', desc: 'Celebrates 140 years with revenue exceeding ₹10,000 crore, serving over 1 billion consumers globally.' }
    ];

    /**
     * Product categories data with descriptions and examples.
     * @type {Array<Object>}
     */
    const productsData = [
        { id: 'chyawanprash', name: 'Chyawanprash', category: 'ayurveda', desc: 'Traditional Ayurvedic immunity booster with 40+ herbs, consumed by millions of Indian families for over a century.', img: 'https://placehold.co/400x300/16a34a/fff' },
        { id: 'amla-oil', name: 'Dabur Amla Hair Oil', category: 'personal-care', desc: 'India\'s leading hair oil enriched with Amla (Indian Gooseberry), promoting hair strength and growth.', img: 'https://placehold.co/400x300/16a34a/fff' },
        { id: 'hajmola', name: 'Hajmola', category: 'foods', desc: 'Digestive tablets with tangy flavors, a cultural icon available in multiple variants like Regular, Imli, and Pudina.', img: 'https://placehold.co/400x300/eab308/000' },
        { id: 'honey', name: 'Dabur Honey', category: 'foods', desc: '100% pure honey sourced from Indian forests, trusted for its purity and health benefits.', img: 'https://placehold.co/400x300/eab308/000' },
        { id: 'red-toothpaste', name: 'Dabur Red Toothpaste', category: 'healthcare', desc: 'Ayurvedic toothpaste with clove and other herbs, offering complete oral care without harsh chemicals.', img: 'https://placehold.co/400x300/dc2626/fff' },
        { id: 'gulabari', name: 'Gulabari Rose Water', category: 'personal-care', desc: 'Pure rose water used as a natural skin toner and cleanser, a beauty staple for generations.', img: 'https://placehold.co/400x300/ec4899/fff' },
        { id: 'pain-relief', name: 'Dabur Pain Relief Oil', category: 'healthcare', desc: 'Ayurvedic massage oil for joint and muscle pain, formulated with traditional herbs like Mahanarayan.', img: 'https://placehold.co/400x300/16a34a/fff' },
        { id: 'real-juice', name: 'Real Fruit Juices', category: 'foods', desc: 'Premium fruit juice brand offering 100% pure juices in various flavors, acquired by Dabur in 2007.', img: 'https://placehold.co/400x300/f97316/fff' }
    ];

    let activeDecade = 'all';
    let activeCategory = 'all';

    /**
     * Initialize all interactive features when DOM is ready.
     */
    function init() {
        renderTimeline();
        renderProducts();
        attachEventListeners();
        setupThemeToggle();
        setupBookmark();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    /**
     * Render the timeline based on active decade filter.
     */
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        const filtered = activeDecade === 'all'
            ? timelineData
            : timelineData.filter(item => item.decade === activeDecade);

        container.innerHTML = filtered.map(item => `
            <div class="timeline-item animate-on-scroll" role="listitem">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
            </div>
        `).join('');

        // Re-observe new elements for scroll animation
        if (window.scrollObserver) {
            container.querySelectorAll('.animate-on-scroll').forEach(el => {
                window.scrollObserver.observe(el);
            });
        }
    }

    /**
     * Render product cards based on active category filter.
     */
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const filtered = activeCategory === 'all'
            ? productsData
            : productsData.filter(p => p.category === activeCategory);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found in this category.</p>';
            return;
        }

        grid.innerHTML = filtered.map(product => `
            <article class="product-card animate-on-scroll" role="listitem">
                <div class="product-img" style="background-image: url('${product.img}')"></div>
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <div class="product-category">${product.category}</div>
                    <p>${product.desc}</p>
                </div>
            </article>
        `).join('');

        // Re-observe new elements
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
        // Timeline decade filters
        document.querySelectorAll('.decade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.decade-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeDecade = btn.dataset.decade;
                renderTimeline();
            });
        });

        // Product category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.dataset.category;
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

        const id = 'brand-dabur';

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
                    explorerPage: 'frontend/dabur-explorer/index.html',
                    title: 'Dabur',
                    thumbnail: 'https://placehold.co/100/16a34a/fff',
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
            window.Journey.registerSearchItems('frontend/dabur-explorer/index.html', [
                {
                    id: 'brand-dabur',
                    title: 'Dabur',
                    description: 'India\'s trusted Ayurvedic brand since 1884.',
                    link: '#'
                }
            ]);
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
})();
