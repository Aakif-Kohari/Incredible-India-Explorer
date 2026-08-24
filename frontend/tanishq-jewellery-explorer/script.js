/* ==========================================================================
   Tanishq Jewellery Explorer Application Logic
   Handles category filters, timeline era filters, Karatmeter purity testing
   simulator, detail modal popups, theme toggle, and journey bookmarking.
   ========================================================================== */

(function () {
    'use strict';

    /**
     * Tanishq jewellery category catalog.
     */
    const productsData = [
        {
            id: 'traditional-gold',
            name: '22K Traditional Gold Collections',
            category: 'gold',
            tagline: '100% Hallmarked 22K Yellow Gold',
            icon: '👑',
            desc: 'Timeless gold bangles, necklaces, waistbands, and jhumkas crafted with 91.6% pure hallmarked gold.',
            details: 'Made with zero-compromise hallmarking and itemized billing. Tanishq guaranteed 100% return value on gold content.'
        },
        {
            id: 'temple-gold',
            name: 'Temple Jewellery & Kasu Mala',
            category: 'gold',
            tagline: 'Sacred Motifs & South Indian Heritage',
            icon: '🛕',
            desc: 'Recreation of chiseled temple sculptures depicting Goddess Lakshmi, peacocks, and coin necklaces (Kasu Mala).',
            details: 'Hand-carved by master goldsmiths in South India using traditional nakashi and antique gold finishing techniques.'
        },
        {
            id: 'diamond-solitaires',
            name: 'Certified Diamonds & Solitaires',
            category: 'diamond',
            tagline: 'Conflict-Free International Certification',
            icon: '💎',
            desc: 'Brilliant-cut diamond chokers, solitaires, and festive diamond necklaces certified by IGI and GIA.',
            details: 'Every diamond is ethically sourced and passes 100% automated laser inscription & clarity verification.'
        },
        {
            id: 'kundan-polki',
            name: 'Kundan & Polki Heritage Sets',
            category: 'kundan',
            tagline: 'Royal Rajasthani & Mughal Meenakari Art',
            icon: '📿',
            desc: 'Uncut diamonds (Polki) set in 22K gold foils with vibrant reverse enameling (Meenakari).',
            details: 'Inspired by royal court jewellery of Rajasthan and Awadh. Features natural emeralds, rubies, and freshwater pearls.'
        },
        {
            id: 'mia-by-tanishq',
            name: 'Mia by Tanishq (Everyday Wear)',
            category: 'subbrand',
            tagline: 'Lightweight 14K & 18K Workwear Jewellery',
            icon: '✨',
            desc: 'Modern, chic, lightweight gold and diamond pieces designed for everyday office wear.',
            details: 'Pioneered functional daily wear jewellery for young working women—lightweight, scratch-resistant, and contemporary.'
        },
        {
            id: 'rivaah-wedding',
            name: 'Rivaah Wedding Jewellery',
            category: 'subbrand',
            tagline: 'Crafted for 15+ Regional Indian Brides',
            icon: '👰',
            desc: 'Dedicated bridal brand designed specifically for regional wedding customs across India.',
            details: 'Customized bridal trousseaus for Punjabi, Bengali, Tamil, Maharashtrian, Gujarati, and Malayali brides.'
        },
        {
            id: 'zoya-luxury',
            name: 'Zoya Fine Jewellery',
            category: 'subbrand',
            tagline: 'Bespoke Luxury Boutique Brand',
            icon: '🌟',
            desc: 'Ultra-luxury boutique brand for connoisseurs featuring rare gemstones and limited-edition design stories.',
            details: 'Displayed in exclusive high-fashion boutiques, drawing inspiration from architecture, art movements, and nature.'
        }
    ];

    /**
     * Timeline milestones.
     */
    const timelineData = [
        {
            year: 1994,
            decade: '1994-2005',
            title: 'Launch under Titan Company / Tata Group',
            tag: 'Founding',
            desc: 'Xerxes Desai coins the name "Tanishq" and registers the brand under Titan Company to organize Indian gold retail.'
        },
        {
            year: 1996,
            decade: '1994-2005',
            title: 'First Showroom Opened in Chennai',
            tag: 'Retail Debut',
            desc: 'Opens its landmark first showroom on Cathedral Road, Chennai, introducing fixed making charges and transparent billing.'
        },
        {
            year: 1998,
            decade: '1994-2005',
            title: 'Invention of the Karatmeter',
            tag: 'Purity Revolution',
            desc: 'Imports X-ray Karatmeters into showrooms, offering free gold purity testing and exposing widespread market under-caratage.'
        },
        {
            year: 2008,
            decade: '2006-2016',
            title: 'Launch of Golden Harvest Scheme & Jodhaa Akbar',
            tag: 'Consumer Innovation',
            desc: 'Introduces monthly gold savings plans and crafts authentic royal gold jewellery for the blockbuster film "Jodhaa Akbar".'
        },
        {
            year: 2011,
            decade: '2006-2016',
            title: 'Launch of "Mia by Tanishq"',
            tag: 'Workwear Brand',
            desc: 'Launches Mia, creating a brand-new segment of affordable lightweight gold & diamond jewellery for working women.'
        },
        {
            year: 2017,
            decade: '2017-present',
            title: 'Launch of "Rivaah" Wedding Brand',
            tag: 'Bridal Pioneer',
            desc: 'Unveils Rivaah, catering specifically to regional bridal traditions across 15+ distinct Indian wedding cultures.'
        },
        {
            year: 2024,
            decade: '2017-present',
            title: '400+ Showrooms & Global Flagships',
            tag: 'Global Presence',
            desc: 'Operates 400+ stores across 240+ cities in India alongside international flagships in New York, Dubai, Singapore, and Abu Dhabi.'
        }
    ];

    let activeCategory = 'all';
    let activeDecade = 'all';

    /**
     * DOM Initialization.
     */
    function init() {
        renderProducts();
        renderTimeline();
        setupKaratmeterSimulator();
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
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--tanishq-text-muted);">No collections found in this category.</p>';
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
     * Karatmeter Simulator Logic.
     */
    function setupKaratmeterSimulator() {
        const btn22k = document.getElementById('scan-22k-btn');
        const btn18k = document.getElementById('scan-18k-btn');
        const btnLocal = document.getElementById('scan-local-btn');
        const valEl = document.getElementById('km-value');
        const purityEl = document.getElementById('km-purity');

        if (!valEl || !purityEl) return;

        if (btn22k) {
            btn22k.addEventListener('click', () => {
                valEl.textContent = '22.00 K';
                purityEl.textContent = '✓ 91.6% Pure Gold (Tanishq BIS Hallmarked 22K)';
                purityEl.style.color = '#38bdf8';
                playScanBeep();
            });
        }

        if (btn18k) {
            btn18k.addEventListener('click', () => {
                valEl.textContent = '18.00 K';
                purityEl.textContent = '✓ 75.0% Pure Gold (Tanishq Diamond Setting 18K)';
                purityEl.style.color = '#38bdf8';
                playScanBeep();
            });
        }

        if (btnLocal) {
            btnLocal.addEventListener('click', () => {
                valEl.textContent = '19.20 K ⚠️';
                purityEl.textContent = '❌ Under-Caratage Alert! Only 80.0% Pure (Common Impurity in Unorganized Local Gold)';
                purityEl.style.color = '#f87171';
                playScanBeep();
            });
        }
    }

    function playScanBeep() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } catch (e) {}
    }

    /**
     * Open Detail Modal.
     */
    function openProductModal(productId) {
        const product = productsData.find(p => p.id === productId);
        const modal = document.getElementById('tanishq-modal');
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
                    <div class="modal-detail-label">Purity & Craftsmanship Guarantee</div>
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

        // Modal Close Button & Backdrop Click
        const modal = document.getElementById('tanishq-modal');
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

        const currentTheme = localStorage.getItem('tanishq-explorer-theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleBtn.textContent = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('tanishq-explorer-theme', isDark ? 'dark' : 'light');
        });
    }

    /**
     * Setup Journey Bookmark.
     */
    function setupBookmark() {
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (!bookmarkBtn) return;

        const isBookmarked = localStorage.getItem('tanishq-explorer-bookmarked') === 'true';
        if (isBookmarked) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.textContent = '✓ Bookmarked to Journey';
        }

        bookmarkBtn.addEventListener('click', () => {
            const newState = !bookmarkBtn.classList.contains('bookmarked');
            if (newState) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.textContent = '✓ Bookmarked to Journey';
                localStorage.setItem('tanishq-explorer-bookmarked', 'true');
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                bookmarkBtn.textContent = '🔖 Bookmark Journey';
                localStorage.setItem('tanishq-explorer-bookmarked', 'false');
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
