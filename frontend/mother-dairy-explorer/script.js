/* ==========================================================================
   Mother Dairy Explorer Application Logic
   Handles milestone filtering, product category filters, detail modals,
   bulk token milk booth simulator, supply chain tabs, theme toggle, and bookmarking.
   ========================================================================== */

(function () {
    'use strict';

    /**
     * Historical timeline milestones.
     */
    const timelineData = [
        {
            year: 1974,
            decade: '1970s',
            title: 'Establishment Under Operation Flood II',
            tag: 'Founding',
            desc: 'Mother Dairy is commissioned in Delhi under Operation Flood by the National Dairy Development Board (NDDB), chaired by Dr. Verghese Kurien.'
        },
        {
            year: 1975,
            decade: '1970s',
            title: 'Launch of Bulk Vending Token Milk',
            tag: 'Urban Innovation',
            desc: 'Pioneered token-operated bulk milk vending booths across Delhi, delivering fresh, chilled, pasteurized milk without single-use plastic waste.'
        },
        {
            year: 1988,
            decade: '1980s-1990s',
            title: 'Launch of Safal Fruit & Vegetable Brand',
            tag: 'Horticulture Link',
            desc: 'NDDB establishes Safal in Mangolpuri, Delhi—India\'s first large-scale automated fruit & vegetable auction and processing unit linking 50,000+ growers directly to consumers.'
        },
        {
            year: 1989,
            decade: '1980s-1990s',
            title: 'Dhara Edible Oil Launch under Golden Flow',
            tag: 'Market Stabilization',
            desc: 'NDDB launches Dhara edible oils to protect Indian consumers from rampant cooking oil price volatility and artificial market shortages.'
        },
        {
            year: 1996,
            decade: '1980s-1990s',
            title: 'Introduction of Poly-Pack Pouch Milk',
            tag: 'Product Expansion',
            desc: 'Mother Dairy expands into convenient multi-grade pouch milk (Full Cream, Toned, Double Toned, Cow Milk) to serve expanding suburban households.'
        },
        {
            year: 2005,
            decade: '2000s-present',
            title: 'National Geographic Expansion',
            tag: 'Pan-India Reach',
            desc: 'Mother Dairy expands operations beyond Delhi-NCR into major metros including Mumbai, Hyderabad, Bengaluru, UP, Punjab, and West Bengal.'
        },
        {
            year: 2015,
            decade: '2000s-present',
            title: 'Probiotic & Value-Added Dairy Innovations',
            tag: 'Health Focus',
            desc: 'Launches b-Fit probiotic dahi, premium ice creams, specialized cow milk, and Safal organic frozen produce.'
        },
        {
            year: 2024,
            decade: '2000s-present',
            title: '50 Lakh Liters Daily Milestone',
            tag: 'Modern Powerhouse',
            desc: 'Processes over 5,000,000 liters of milk daily across state-of-the-art automated plants, supporting over 600,000 dairy farmers across India.'
        }
    ];

    /**
     * Mother Dairy product portfolio.
     */
    const productsData = [
        {
            id: 'token-milk',
            name: 'Bulk Vended Token Milk',
            category: 'milk',
            tagline: 'Fresh, Chilled & Eco-Friendly',
            icon: '🥛',
            desc: 'The original Mother Dairy milk dispensed via automated token booths.',
            details: 'Chilled at 4°C and standardized for optimal nutrition. Eliminates plastic pouches and remains an affordable daily staple across Delhi-NCR.'
        },
        {
            id: 'poly-full-cream',
            name: 'Full Cream Poly Pack Milk',
            category: 'milk',
            tagline: 'Rich, Creamy & Wholesome',
            icon: '🍶',
            desc: 'High-fat pasteurized milk ideal for making rich curd, sweets, and tea.',
            details: 'Contains minimum 6.0% fat and 9.0% SNF (Solids-Not-Fat), providing essential calcium, proteins, and vitamins.'
        },
        {
            id: 'toned-cow-milk',
            name: 'Mother Dairy Cow Milk',
            category: 'milk',
            tagline: 'Easy to Digest Nutrition',
            icon: '🐄',
            desc: 'Naturally light cow milk specially pasteurized for infants and elderly.',
            details: 'Contains a natural golden hue from beta-carotene and balanced fat content (3.5% fat), making it gentle on digestion.'
        },
        {
            id: 'dahi-mishti-doi',
            name: 'Dahi & Mishti Doi',
            category: 'dairy',
            tagline: 'Traditional Indian Fermented Delights',
            icon: '🥣',
            desc: 'Set curd made from pasteurized milk and authentic sweet Bengali Mishti Doi.',
            details: 'Prepared using active lactic cultures under sterile laboratory conditions, offering gut-friendly probiotics and thick creamy texture.'
        },
        {
            id: 'paneer',
            name: 'Mother Dairy Fresh Paneer',
            category: 'dairy',
            tagline: 'Soft, Pure & Protein Rich',
            icon: '🧀',
            desc: 'Hygienically packed fresh cottage cheese crafted without artificial preservatives.',
            details: 'Retains moisture and delicate texture, making it perfect for Indian curries, tikkas, and grilling.'
        },
        {
            id: 'ghee-butter',
            name: 'Pure Cow Ghee & Butter',
            category: 'dairy',
            tagline: 'Aromatic & Golden Goodness',
            icon: '🧈',
            desc: 'Traditional clarified butter with rich granular texture and salted cream butter.',
            details: 'Slow-churned using traditional methods to preserve natural aroma and golden color. Essential for Indian cooking and rituals.'
        },
        {
            id: 'ice-creams-kulfi',
            name: 'Ice Creams & Matka Kulfi',
            category: 'dairy',
            tagline: '100% Real Milk Indulgence',
            icon: '🍦',
            desc: 'Delicious sundaes, cassattas, tubs, and traditional clay-pot Matka Kulfis.',
            details: 'Made from 100% genuine milk solids rather than vegetable oils (frozen desserts), ensuring authentic dairy creaminess.'
        },
        {
            id: 'safal-frozen-peas',
            name: 'Safal Frozen Peas & Sweet Corn',
            category: 'safal',
            tagline: 'Farm-Fresh IQF Frozen Goodness',
            icon: '🫛',
            desc: 'Individual Quick Frozen (IQF) green peas and sweet corn harvested at peak sweetness.',
            details: 'Sourced directly from contract farmers in Punjab and Himachal Pradesh, blast-frozen within hours of harvest without added color.'
        },
        {
            id: 'safal-juices-produce',
            name: 'Safal Fresh Produce & Juices',
            category: 'safal',
            tagline: 'Fresh From Farms to Neighborhood Booths',
            icon: '🍎',
            desc: 'Fresh fruits, vegetables, and 100% fruit juices available at 300+ Safal kiosks.',
            details: 'Tested for pesticide residues and priced fairly to support horticulture farmers and health-conscious urban shoppers.'
        },
        {
            id: 'dhara-mustard-oil',
            name: 'Dhara Kachi Ghani Mustard Oil',
            category: 'dhara',
            tagline: 'Purity & Pungency Guaranteed',
            icon: '🪔',
            desc: 'Cold-pressed mustard oil with authentic strong aroma and natural antioxidants.',
            details: 'Extracted using traditional cold press (kachi ghani) technology, retaining omega-3 fatty acids and natural flavor.'
        },
        {
            id: 'dhara-refined-oil',
            name: 'Dhara Refined Sunflower & Rice Bran Oil',
            category: 'dhara',
            tagline: 'Light & Heart-Healthy Cooking',
            icon: '🌻',
            desc: 'High-smoke point refined cooking oils enriched with Vitamins A & D.',
            details: 'Formulated for low absorption during frying, promoting cardiovascular wellness for modern Indian families.'
        }
    ];

    /**
     * Supply chain flow steps.
     */
    const supplyFlowData = {
        village: {
            title: '1. Village Level Milk Procurement',
            desc: 'Milk is collected twice daily from over 600,000 smallholder farmers across thousands of Village Dairy Cooperative Societies (VDCS). Automated milk analyzers instantly test fat & SNF content, depositing payments directly into farmers\' bank accounts.'
        },
        testing: {
            title: '2. Multi-Stage Quality Testing & Rapid Chilling',
            desc: 'Collected milk is immediately chilled to below 4°C at Bulk Milk Chilling Centers (BMCC) within 2 hours of milking. Samples undergo 27 stringent quality checks for adulterants, antibiotics, and bacterial count before tanker dispatch.'
        },
        processing: {
            title: '3. Automated Dairy Processing Plants',
            desc: 'Insulated stainless steel tankers transport chilled milk to mega-processing plants in Delhi-NCR. Milk undergoes clarification, standardization, pasteurization (72°C for 15 sec), and homogenization under hermetically sealed automated CIP systems.'
        },
        booth: {
            title: '4. Neighborhood Booth & Retail Delivery',
            desc: 'Chilled milk tankers reload insulated storage tanks at 1,500+ neighborhood Mother Dairy booths before 5:00 AM every morning, making fresh bulk vended token milk and pouch packs accessible within walking distance of Indian homes.'
        }
    };

    let activeDecade = 'all';
    let activeCategory = 'all';

    /**
     * DOM Initialization.
     */
    function init() {
        renderTimeline();
        renderProducts();
        renderSupplyFlow('village');
        attachEventListeners();
        setupTokenBoothSimulator();
        setupThemeToggle();
        setupBookmark();
        setupScrollObserver();
    }

    /**
     * Render Milestone Timeline.
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
     * Render Product Cards.
     */
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const filtered = activeCategory === 'all'
            ? productsData
            : productsData.filter(p => p.category === activeCategory);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--dairy-text-muted);">No products found in this category.</p>';
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
                    <button class="btn-view-details" aria-label="View details about ${item.name}">View Details →</button>
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
     * Render Supply Chain Flow Step.
     */
    function renderSupplyFlow(flowKey) {
        const display = document.getElementById('supply-flow-display');
        const data = supplyFlowData[flowKey];
        if (!display || !data) return;

        display.innerHTML = `
            <div class="supply-flow-title">${data.title}</div>
            <div class="supply-flow-desc">${data.desc}</div>
        `;
    }

    /**
     * Interactive Token Booth Simulator.
     */
    function setupTokenBoothSimulator() {
        const insertBtn = document.getElementById('insert-token-btn');
        const coinSlot = document.getElementById('coin-slot');
        const resetBtn = document.getElementById('reset-booth-btn');
        const stream = document.getElementById('milk-stream');
        const fillLevel = document.getElementById('milk-fill-level');
        const statusText = document.getElementById('booth-status-text');

        if (!insertBtn || !stream || !fillLevel || !statusText) return;

        let isDispensing = false;

        function triggerDispense() {
            if (isDispensing) return;
            isDispensing = true;

            statusText.textContent = 'Token inserted... Dispensing 1 Liter of fresh chilled milk!';
            stream.classList.add('dispensing');
            fillLevel.style.height = '100%';

            // Synth sound feedback
            playDispenseSound();

            setTimeout(() => {
                stream.classList.remove('dispensing');
                statusText.textContent = '✓ 1 Liter Milk Container Filled! Pure & Hygienic.';
                isDispensing = false;
            }, 1600);
        }

        function resetBooth() {
            fillLevel.style.height = '0%';
            stream.classList.remove('dispensing');
            statusText.textContent = 'Container emptied. Insert token to dispense milk!';
            isDispensing = false;
        }

        insertBtn.addEventListener('click', triggerDispense);
        if (coinSlot) coinSlot.addEventListener('click', triggerDispense);
        if (resetBtn) resetBtn.addEventListener('click', resetBooth);
    }

    function playDispenseSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 1.5);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.5);
        } catch (e) {}
    }

    /**
     * Open Product Detail Modal.
     */
    function openProductModal(productId) {
        const product = productsData.find(p => p.id === productId);
        const modal = document.getElementById('product-modal');
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
                    <div class="modal-detail-label">Brand / Category</div>
                    <div class="modal-detail-value" style="text-transform: capitalize;">${product.category}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Overview</div>
                    <div class="modal-detail-value">${product.desc}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Nutritional Value & Quality Assurance</div>
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
        // Timeline Era Buttons
        document.querySelectorAll('.decade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.decade-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeDecade = btn.getAttribute('data-decade');
                renderTimeline();
            });
        });

        // Product Category Buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                renderProducts();
            });
        });

        // Supply Chain Flow Tabs
        document.querySelectorAll('.supply-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.supply-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const flow = tab.getAttribute('data-flow');
                renderSupplyFlow(flow);
            });
        });

        // Modal Close Button & Backdrop Click
        const modal = document.getElementById('product-modal');
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

        const currentTheme = localStorage.getItem('mother-dairy-explorer-theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleBtn.textContent = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('mother-dairy-explorer-theme', isDark ? 'dark' : 'light');
        });
    }

    /**
     * Setup Journey Bookmark.
     */
    function setupBookmark() {
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (!bookmarkBtn) return;

        const isBookmarked = localStorage.getItem('mother-dairy-explorer-bookmarked') === 'true';
        if (isBookmarked) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.textContent = '✓ Bookmarked to Journey';
        }

        bookmarkBtn.addEventListener('click', () => {
            const newState = !bookmarkBtn.classList.contains('bookmarked');
            if (newState) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.textContent = '✓ Bookmarked to Journey';
                localStorage.setItem('mother-dairy-explorer-bookmarked', 'true');
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                bookmarkBtn.textContent = '🔖 Bookmark Journey';
                localStorage.setItem('mother-dairy-explorer-bookmarked', 'false');
            }
        });
    }

    /**
     * Intersection Observer for Scroll Animations.
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
