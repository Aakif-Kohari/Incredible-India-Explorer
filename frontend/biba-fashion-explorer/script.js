/* ==========================================================================
   Biba Fashion Explorer Application Logic
   Handles product line filters, timeline era filters, detail modals,
   social campaign player, dark/light theme toggle, and bookmarking.
   ========================================================================== */

(function () {
    'use strict';

    /**
     * Product catalog & fashion evolution lines.
     */
    const productsData = [
        {
            id: 'salwar-suits',
            name: 'Classic Salwar Kameez Suit Sets',
            category: 'suits',
            tagline: 'The Signature 3-Piece Ensemble',
            icon: '👘',
            desc: 'Biba\'s flagship 3-piece suit sets combining hand-printed dupattas, tailored kameez, and comfortable salwars.',
            details: 'Made from breathable cottons, silk blends, and chanderis with hand-block prints, gota patti borders, and vibrant color dyes.'
        },
        {
            id: 'anarkali-sets',
            name: 'Ready-to-Wear Floor-Length Anarkalis',
            category: 'suits',
            tagline: 'Regal Kalis & Flowy Festive Elegance',
            icon: '💃',
            desc: 'Royal flared Anarkali suits featuring rich kalis, embroidery, and sheer dupattas.',
            details: 'Revolutionized Indian festive wear by making elaborate Mughal-inspired Anarkalis available off-the-rack with perfect fitting.'
        },
        {
            id: 'kurtis-palazzos',
            name: 'Mix & Match Kurtis & Palazzos',
            category: 'fusion',
            tagline: 'Everyday Comfort Meets Indie-Chic',
            icon: '🥻',
            desc: 'Versatile cotton tunics, A-line kurtis, and wide-leg palazzo trousers for modern working women.',
            details: 'Popularized the mix-and-match concept where women could pair printed kurtis with contrasting palazzos or jeans.'
        },
        {
            id: 'sharara-sets',
            name: 'Festive Sharara & Gharara Sets',
            category: 'suits',
            tagline: 'Nostalgic Royal Festive Statement',
            icon: '✨',
            desc: 'Contemporary flared shararas paired with short kurtis and foil-printed dupattas.',
            details: 'Crafted with delicate mirror work, sequins, and metallic zari highlights for sangeet and Diwali celebrations.'
        },
        {
            id: 'biba-girls',
            name: 'Biba Girls Ethnic Kidswear',
            category: 'kids',
            tagline: 'Miniature Ethnic Elegance for Ages 2–15',
            icon: '👧',
            desc: 'Specialized ethnic kidswear line offering lightweight lehengas, Anarkalis, and suit sets for young girls.',
            details: 'Pioneered organized ethnic kidswear in India, crafted from soft non-itchy cottons with vibrant festive prints.'
        },
        {
            id: 'rohit-bal-collab',
            name: 'Rohit Bal x Biba Designer Collection',
            category: 'designer',
            tagline: 'Affordable High-Street Luxury Couture',
            icon: '👑',
            desc: 'Landmark collaboration with legendary Indian couturier Rohit Bal featuring opulent lotus & peacock motifs.',
            details: 'Broke traditional fashion barriers by bringing haute couture aesthetics to high-street retail stores at accessible price points.'
        },
        {
            id: 'anju-modi-collab',
            name: 'Anju Modi x Biba Heritage Range',
            category: 'designer',
            tagline: 'Traditional Craftsmanship & Timeless Silhouettes',
            icon: '🎨',
            desc: 'Couture collaboration with designer Anju Modi celebrating regal Indian heritage textiles and intricate embroidery.',
            details: 'Blends traditional handloom textures with modern silhouettes, recreating royal Indian court fashion.'
        },
        {
            id: 'lifestyle-accessories',
            name: 'Biba Lifestyle & Fragrance',
            category: 'fusion',
            tagline: 'Complete Ethnic Ensemble Accessories',
            icon: '🌺',
            desc: 'Fashion jewelry (jhumkas, bangles), ethnic footwear (mojris), and signature floral fragrances.',
            details: 'Transformed Biba from an apparel label into a complete lifestyle destination for head-to-toe ethnic styling.'
        }
    ];

    /**
     * Milestones chronology.
     */
    const timelineData = [
        {
            year: 1988,
            decade: '1988-1999',
            title: 'Home Venture Founded by Meena Bindra',
            tag: 'Founding',
            desc: 'Homemaker Meena Bindra borrows ₹8,000 to design and sell 40 hand-printed cotton salwar suits from her home in Mumbai.'
        },
        {
            year: 1993,
            decade: '1988-1999',
            title: 'Wholesale Supply to Premium Boutiques',
            tag: 'Commercial Breakthrough',
            desc: 'Biba signs major wholesale supply deals with famous Mumbai multi-brand stores including Benzer, Instyle, and Kemp\'s Corner.'
        },
        {
            year: 2002,
            decade: '2000-2011',
            title: 'Bollywood Wardrobe Partnership Debut',
            tag: 'Pop Culture Icon',
            desc: 'Partners with Bollywood film "Na Tum Jaano Na Hum" to style lead heroine Esha Deol and merchandise movie wardrobes in stores.'
        },
        {
            year: 2004,
            decade: '2000-2011',
            title: 'First Standalone EBO Store in Mumbai',
            tag: 'Retail Expansion',
            desc: 'Opens its first standalone Exclusive Brand Outlet (EBO) at Inorbit Mall, Malad, Mumbai, marking the pivot to direct-to-consumer retail.'
        },
        {
            year: 2010,
            decade: '2000-2011',
            title: 'Launch of "Biba Girls" Kidswear',
            tag: 'Category First',
            desc: 'Launches India\'s first organized ethnic kidswear brand for girls aged 2–15, capturing the festive family shopping market.'
        },
        {
            year: 2012,
            decade: '2012-present',
            title: 'Rohit Bal x Biba High-Street Couture',
            tag: 'Designer Collaboration',
            desc: 'Pioneers affordable luxury by collaborating with couturier Rohit Bal to bring high-fashion ethnic wear to retail malls.'
        },
        {
            year: 2015,
            decade: '2012-present',
            title: '"Change Is Beautiful" Social Awareness',
            tag: 'Progressive Advertising',
            desc: 'Launches award-winning ad films confronting dowry expectations and gender inequality in Indian marriage proposals.'
        },
        {
            year: 2024,
            decade: '2012-present',
            title: '300+ Stores Across 120+ Cities',
            tag: 'National Leadership',
            desc: 'Operates over 300 standalone EBO stores and 1,000+ shop-in-shops, maintaining leadership in contemporary Indian ethnic fashion.'
        }
    ];

    /**
     * Social campaign data for "Change Is Beautiful".
     */
    const campaignsData = {
        arranged: {
            title: 'Reimagining Arranged Marriage Meetings',
            year: '2015 Award-Winning Digital Campaign',
            narrative: 'The iconic film shows a traditional marriage meeting where the bride\'s father asks the groom if he knows how to cook. When the groom\'s family hesitates, the father gently states: "If my daughter is going to work after marriage, shouldn\'t her partner share the kitchen responsibilities?" The film went viral, challenging gender roles in Indian households.'
        },
        dowry: {
            title: 'Confronting Dowry Expectations',
            year: '2016 Social Awareness Film',
            narrative: 'Addresses covert financial demands during wedding negotiations. The bride\'s family asserts dignity and self-respect, demonstrating that modern Indian women are educated, financially independent, and equal partners rather than subjects of dowry demands.'
        },
        working: {
            title: 'Empowering Working Women',
            year: '2018 Modern Women Series',
            narrative: 'Celebrates women balancing careers, creative passions, and family lives. Highlighted how ready-to-wear kurtis and fusion palazzos provided comfortable, dignified style for women stepping out to lead businesses and institutions.'
        }
    };

    let activeCategory = 'all';
    let activeDecade = 'all';

    /**
     * DOM Initialization.
     */
    function init() {
        renderProducts();
        renderTimeline();
        renderCampaign('arranged');
        attachEventListeners();
        setupThemeToggle();
        setupBookmark();
        setupScrollObserver();
    }

    /**
     * Render Product Cards.
     */
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const filtered = activeCategory === 'all'
            ? productsData
            : productsData.filter(p => p.category === activeCategory);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--biba-text-muted);">No products found in this category.</p>';
            return;
        }

        grid.innerHTML = filtered.map(item => `
            <div class="product-card animate-on-scroll" data-id="${item.id}" role="listitem" tabindex="0">
                <div class="product-image-container">
                    <span class="product-category-tag">${item.category}</span>
                    <span class="product-card-icon" aria-hidden="true">${item.icon}</span>
                </div>
                <div class="product-card-body">
                    <h3 class="product-card-title">${item.name}</h3>
                    <div class="product-card-tagline">"${item.tagline}"</div>
                    <div class="product-card-desc">${item.desc}</div>
                    <button class="btn-view-details" aria-label="View details about ${item.name}">Explore Line →</button>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openProductModal(id);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const id = card.getAttribute('data-id');
                    openProductModal(id);
                }
            });
        });

        observeNewElements(grid);
    }

    /**
     * Render Timeline.
     */
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        const filtered = activeDecade === 'all'
            ? timelineData
            : timelineData.filter(item => item.decade === activeDecade);

        container.innerHTML = filtered.map(item => `
            <div class="timeline-item animate-on-scroll" role="listitem">
                <div class="timeline-header">
                    <span class="timeline-year">${item.year}</span>
                    <span class="timeline-tag">${item.tag}</span>
                </div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
            </div>
        `).join('');

        observeNewElements(container);
    }

    /**
     * Render Campaign Content.
     */
    function renderCampaign(campaignKey) {
        const display = document.getElementById('campaign-display');
        const data = campaignsData[campaignKey];
        if (!display || !data) return;

        display.innerHTML = `
            <div class="campaign-title-text">${data.title}</div>
            <span class="campaign-year-tag">🎬 ${data.year}</span>
            <div class="campaign-narrative">${data.narrative}</div>
        `;
    }

    /**
     * Open Detail Modal.
     */
    function openProductModal(productId) {
        const product = productsData.find(p => p.id === productId);
        const modal = document.getElementById('biba-modal');
        const body = document.getElementById('modal-body');
        if (!product || !modal || !body) return;

        body.innerHTML = `
            <div class="modal-header-banner">
                <div class="modal-product-icon" aria-hidden="true">${product.icon}</div>
                <h2 class="modal-product-title">${product.name}</h2>
                <div class="modal-product-tagline">"${product.tagline}"</div>
            </div>
            <div class="modal-content-body">
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Collection Category</div>
                    <div class="modal-detail-value" style="text-transform: capitalize;">${product.category}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Overview</div>
                    <div class="modal-detail-value">${product.desc}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Design & Fabric Highlights</div>
                    <div class="modal-detail-value">${product.details}</div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }

    /**
     * Attach Event Listeners.
     */
    function attachEventListeners() {
        // Product Category Filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                renderProducts();
            });
        });

        // Timeline Era Filters
        document.querySelectorAll('.decade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.decade-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeDecade = btn.getAttribute('data-decade');
                renderTimeline();
            });
        });

        // Campaign Selector Tabs
        document.querySelectorAll('.campaign-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.campaign-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const campaign = tab.getAttribute('data-campaign');
                renderCampaign(campaign);
            });
        });

        // Modal Close Button & Backdrop Click
        const modal = document.getElementById('biba-modal');
        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Setup Theme Toggle.
     */
    function setupThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        const currentTheme = localStorage.getItem('biba-explorer-theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleBtn.textContent = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('biba-explorer-theme', isDark ? 'dark' : 'light');
        });
    }

    /**
     * Setup Journey Bookmark.
     */
    function setupBookmark() {
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (!bookmarkBtn) return;

        const isBookmarked = localStorage.getItem('biba-explorer-bookmarked') === 'true';
        if (isBookmarked) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.textContent = '✓ Bookmarked to Journey';
        }

        bookmarkBtn.addEventListener('click', () => {
            const newState = !bookmarkBtn.classList.contains('bookmarked');
            if (newState) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.textContent = '✓ Bookmarked to Journey';
                localStorage.setItem('biba-explorer-bookmarked', 'true');
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                bookmarkBtn.textContent = '🔖 Bookmark Journey';
                localStorage.setItem('biba-explorer-bookmarked', 'false');
            }
        });
    }

    /**
     * Scroll Animation Observer.
     */
    function setupScrollObserver() {
        if ('IntersectionObserver' in window) {
            window.scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                window.scrollObserver.observe(el);
            });
        } else {
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('animated');
            });
        }
    }

    function observeNewElements(container) {
        if (window.scrollObserver) {
            container.querySelectorAll('.animate-on-scroll').forEach(el => {
                window.scrollObserver.observe(el);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
