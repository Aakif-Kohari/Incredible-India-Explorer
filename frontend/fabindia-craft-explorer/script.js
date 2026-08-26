/* ==========================================================================
   Fabindia Craft Explorer Application Logic
   Handles craft filters, textile selectors, detail modals, product evolution
   timeline filtering, dark/light theme toggle, and journey bookmarking.
   ========================================================================== */

(function () {
    'use strict';

    /**
     * Living Indian craft traditions sustained by Fabindia.
     */
    const craftsData = [
        {
            id: 'ajrakh',
            name: 'Ajrakh Block Printing',
            category: 'printing',
            region: 'Kutch (Gujarat) & Barmer (Rajasthan)',
            tagline: 'Complex 16-step natural resist printing',
            icon: '🎨',
            desc: 'Ancient block printing technique using carved wooden blocks, natural indigo, madder, and geometric star motifs.',
            details: 'Requires 16 precise steps of washing, dyeing, and printing. Symbolizes harmony with nature and relies on mineral-rich river water.'
        },
        {
            id: 'dabu',
            name: 'Dabu Mud-Resist Printing',
            category: 'printing',
            region: 'Bagru (Rajasthan)',
            tagline: 'Earthy mud-resist block printing',
            icon: '🧱',
            desc: 'Traditional technique where black mud paste, lime, and gum are applied with blocks before dip-dyeing in natural indigo.',
            details: 'Produces subtle cracked clay textures on cotton fabric. Celebrated for its rustic earth tones and organic floral motifs.'
        },
        {
            id: 'kalamkari',
            name: 'Kalamkari Hand Painting',
            category: 'printing',
            region: 'Srikalahasti & Machilipatnam (Andhra Pradesh)',
            tagline: 'Pen-drawn mythological & floral textile art',
            icon: '✒️',
            desc: 'Intricate textile art executed with bamboo pens (kalam) using natural vegetable dyes derived from pomegranate rind and madder root.',
            details: 'Requires 23 meticulous steps of cloth treatment, milk washing, and hand drawing without synthetic chemicals.'
        },
        {
            id: 'chanderi',
            name: 'Chanderi Weaving',
            category: 'weaving',
            region: 'Chanderi (Madhya Pradesh)',
            tagline: 'Sheer gossamer silk-cotton weave with zari',
            icon: '🧵',
            desc: 'Lightweight handloom weave crafted from fine silk and unspun cotton yarns embellished with gold zari borders.',
            details: 'Patronized by Scindia and Bundela royals. Celebrated for its translucent sheer texture and shimmering metallic zari motifs.'
        },
        {
            id: 'maheshwari',
            name: 'Maheshwari Handloom',
            category: 'weaving',
            region: 'Maheshwar (Madhya Pradesh)',
            tagline: 'Reversible borders & geometric weaves',
            icon: '👑',
            desc: 'Handloom textile tradition commissioned by Queen Ahilyabai Holkar in the 18th century, featuring reversible border designs (bugdi).',
            details: 'Woven with fine cotton and silk threads, taking inspiration from the stone carvings of Maheshwar Fort.'
        },
        {
            id: 'jamdani',
            name: 'Jamdani Fine Muslin',
            category: 'weaving',
            region: 'West Bengal',
            tagline: 'UNESCO Intangible Cultural Heritage weave',
            icon: '🌾',
            desc: 'Feather-light supplementary weft technique where intricate floral motifs appear to float on translucent muslin.',
            details: 'Woven painstakingly by hand without mechanical shuttles. Master weavers spend up to a year crafting a single sari.'
        },
        {
            id: 'ikat',
            name: 'Pochampally & Patola Ikat',
            category: 'weaving',
            region: 'Telangana & Gujarat',
            tagline: 'Resist tie-dyed yarn warp & weft weaving',
            icon: '🔷',
            desc: 'Intricate resist dyeing technique where warp and weft yarns are tied and dyed before weaving to create blurred geometric patterns.',
            details: 'Requires mathematical alignment of dyed yarns during loom setup. Known as "Poetry of the Loom".'
        },
        {
            id: 'tussar',
            name: 'Tussar Wild Silk',
            category: 'weaving',
            region: 'Jharkhand & Chhattisgarh',
            tagline: 'Rich textured wild forest silk',
            icon: '🦋',
            desc: 'Eco-friendly wild silk reeled from Antheraea silkworms living in tropical oak forests, prized for its natural gold sheen.',
            details: 'Has a distinctive porous texture and natural thermal comfort, keeping wearers cool in summer and warm in winter.'
        },
        {
            id: 'chikankari',
            name: 'Lucknowi Chikankari',
            category: 'embroidery',
            region: 'Lucknow (Uttar Pradesh)',
            tagline: 'Delicate white-on-white shadow embroidery',
            icon: '🪡',
            desc: 'Refined Mughal shadow needlework featuring 32 distinct stitch types like bakhiya, phanda, and tepchi on fine cotton and georgette.',
            details: 'Empowers over 250,000 women artisans in Awadh. Fabindia popularized Chikankari kurtas as modern everyday office wear.'
        },
        {
            id: 'phulkari',
            name: 'Punjab Phulkari',
            category: 'embroidery',
            region: 'Punjab',
            tagline: 'Vibrant flower-work floss silk embroidery',
            icon: '🌸',
            desc: 'Lively folk embroidery executed from the reverse side of coarse khadi cloth using colorful un-twisted floss silk (pat) thread.',
            details: 'Traditionally embroidered by grandmothers for brides. Celebrates geometric diamond grids and floral energy.'
        },
        {
            id: 'kantha',
            name: 'Bengal Kantha Stitching',
            category: 'embroidery',
            region: 'West Bengal & Tripura',
            tagline: 'Repurposed running stitch embroidery',
            icon: '📜',
            desc: 'Heritage quilting technique using simple running stitches to transform layered fabrics into story-telling textiles.',
            details: 'Represents rural recycling traditions, depicting village flora, fauna, and folklore in rippling quilted textures.'
        }
    ];

    /**
     * Textile categories and natural dye guides.
     */
    const textileData = {
        cotton: {
            title: 'Handloom Cotton & Malmal',
            origin: 'Weaver Clusters across Andhra, UP, Bengal, & Tamil Nadu',
            desc: 'Breathable, skin-friendly natural cotton hand-spun and hand-woven on traditional pit looms. Offers superior moisture absorption and soft drape for India\'s tropical climate.'
        },
        silk: {
            title: 'Pure Tussar, Mulberry & Chanderi Silk',
            origin: 'Jharkhand, Madhya Pradesh, West Bengal, & Karnataka',
            desc: 'Authentic wild Tussar and fine Mulberry silks hand-reeled by indigenous forest communities. Prized for their natural sheen, rich texture, and elegant formal drape.'
        },
        khadi: {
            title: 'Khadi (Homespun Freedom Fabric)',
            origin: 'Khadi Cooperatives in Gujarat, Rajasthan, & UP',
            desc: 'Hand-spun yarn woven into durable fabric on handlooms. Symbolizes Swadeshi self-reliance, zero carbon footprint, and unique tactile texture.'
        },
        linen: {
            title: 'Pure Flax Linen',
            origin: 'Flax Weaver Hubs in Bengal & South India',
            desc: 'Crafted from 100% natural flax plant fibers. Highly durable, thermo-regulating, and pre-washed for effortless indie-chic everyday comfort.'
        },
        dyes: {
            title: 'Natural Indigo, Madder & Plant Dyes',
            origin: 'Rajasthan, Gujarat, & Andhra Pradesh',
            desc: 'Eco-conscious colors extracted from fermented indigo leaves (blue), madder roots (red), pomegranate rinds (yellow), and iron rust (black) without toxic synthetic runoff.'
        }
    };

    /**
     * Product evolution chronology.
     */
    const timelineData = [
        {
            year: 1960,
            decade: '1960s-1970s',
            title: 'Founding as Handloom Exporter',
            tag: 'Origins',
            desc: 'John Bissell establishes Fabindia to export hand-woven upholstery, rugs, and bedspreads to North American and European design houses.'
        },
        {
            year: 1976,
            decade: '1960s-1970s',
            title: 'First Retail Store in New Delhi',
            tag: 'Retail Pivot',
            desc: 'Opens its landmark boutique store in Greater Kailash, New Delhi, making handloom home furnishings accessible to Indian urban homes.'
        },
        {
            year: 1980,
            decade: '1980s-1990s',
            title: 'Debut of Handloom Kurtas & Garments',
            tag: 'Apparel Revolution',
            desc: 'Introduces handloom cotton kurtas, churidars, and dupattas, redefining casual Indian ethnic wear for professionals, artists, and students.'
        },
        {
            year: 1998,
            decade: '1980s-1990s',
            title: 'Sarees, Womenswear & Indo-Western Lines',
            tag: 'Category Growth',
            desc: 'Expands into authentic handloom sarees (Chanderi, Maheshwari, Tussar) and western indie tops, dresses, and trousers.'
        },
        {
            year: 2004,
            decade: '2000s-present',
            title: 'Launch of Fabindia Organic & Personal Care',
            tag: 'Lifestyle Shift',
            desc: 'Introduces certified organic food products (pulses, spices, honey) and chemical-free herbal personal care products rooted in Ayurveda.'
        },
        {
            year: 2007,
            decade: '2000s-present',
            title: 'Community Owned Companies (COCs)',
            tag: 'Artisan Empowerment',
            desc: 'Pioneers artisan micro-market equity models, making over 26,000 rural craftspeople shareholders in regional supply companies.'
        },
        {
            year: 2017,
            decade: '2000s-present',
            title: 'Fabcafe & Large Experience Centers',
            tag: 'Modern Retailing',
            desc: 'Launches multi-story Experience Centers featuring Fabcafe (healthy regional Indian dining), alteration studios, and craft workshops.'
        },
        {
            year: 2024,
            decade: '2000s-present',
            title: 'Global Ambassador of Craft',
            tag: 'Worldwide Presence',
            desc: 'Operates 300+ stores across 100+ cities in India and international capitals, empowering 55,000+ artisans across 20+ states.'
        }
    ];

    let activeCategory = 'all';
    let activeDecade = 'all';

    /**
     * DOM Initialization.
     */
    function init() {
        renderCrafts();
        renderTextile('cotton');
        renderTimeline();
        attachEventListeners();
        setupThemeToggle();
        setupBookmark();
        setupScrollObserver();
    }

    /**
     * Render Crafts Grid.
     */
    function renderCrafts() {
        const grid = document.getElementById('crafts-grid');
        if (!grid) return;

        const filtered = activeCategory === 'all'
            ? craftsData
            : craftsData.filter(c => c.category === activeCategory);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--craft-text-muted);">No craft traditions found in this category.</p>';
            return;
        }

        grid.innerHTML = filtered.map(item => `
            <div class="craft-card animate-on-scroll" data-id="${item.id}" role="listitem" tabindex="0">
                <div class="craft-image-container">
                    <span class="craft-region-tag">${item.category}</span>
                    <span class="craft-card-icon" aria-hidden="true">${item.icon}</span>
                </div>
                <div class="craft-card-body">
                    <h3 class="craft-card-title">${item.name}</h3>
                    <div class="craft-card-tagline">📍 ${item.region}</div>
                    <div class="craft-card-desc">${item.desc}</div>
                    <button class="btn-view-details" aria-label="View details about ${item.name}">Explore Technique →</button>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.craft-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openCraftModal(id);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const id = card.getAttribute('data-id');
                    openCraftModal(id);
                }
            });
        });

        observeNewElements(grid);
    }

    /**
     * Render Textile Fabric Info.
     */
    function renderTextile(fabricKey) {
        const display = document.getElementById('textile-info-display');
        const data = textileData[fabricKey];
        if (!display || !data) return;

        display.innerHTML = `
            <div class="textile-info-header">
                <h4>${data.title}</h4>
                <span class="textile-origin-tag">📍 ${data.origin}</span>
            </div>
            <div class="textile-info-desc">${data.desc}</div>
        `;
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
     * Open Craft Technique Detail Modal.
     */
    function openCraftModal(craftId) {
        const craft = craftsData.find(c => c.id === craftId);
        const modal = document.getElementById('craft-modal');
        const body = document.getElementById('modal-body');
        if (!craft || !modal || !body) return;

        body.innerHTML = `
            <div class="modal-header-banner">
                <div class="modal-product-icon" aria-hidden="true">${craft.icon}</div>
                <h2 class="modal-product-title">${craft.name}</h2>
                <div class="modal-product-tagline">📍 ${craft.region}</div>
            </div>
            <div class="modal-content-body">
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Craft Category</div>
                    <div class="modal-detail-value" style="text-transform: capitalize;">${craft.category}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Technique Overview</div>
                    <div class="modal-detail-value">${craft.desc}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Heritage & Production Process</div>
                    <div class="modal-detail-value">${craft.details}</div>
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
        // Craft Category Filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                renderCrafts();
            });
        });

        // Textile Tabs
        document.querySelectorAll('.textile-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.textile-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const fabric = tab.getAttribute('data-fabric');
                renderTextile(fabric);
            });
        });

        // Evolution Timeline Buttons
        document.querySelectorAll('.decade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.decade-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeDecade = btn.getAttribute('data-decade');
                renderTimeline();
            });
        });

        // Modal Close Button & Backdrop Click
        const modal = document.getElementById('craft-modal');
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

        const currentTheme = localStorage.getItem('fabindia-explorer-theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleBtn.textContent = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('fabindia-explorer-theme', isDark ? 'dark' : 'light');
        });
    }

    /**
     * Setup Journey Bookmark.
     */
    function setupBookmark() {
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (!bookmarkBtn) return;

        const isBookmarked = localStorage.getItem('fabindia-explorer-bookmarked') === 'true';
        if (isBookmarked) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.textContent = '✓ Bookmarked to Journey';
        }

        bookmarkBtn.addEventListener('click', () => {
            const newState = !bookmarkBtn.classList.contains('bookmarked');
            if (newState) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.textContent = '✓ Bookmarked to Journey';
                localStorage.setItem('fabindia-explorer-bookmarked', 'true');
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                bookmarkBtn.textContent = '🔖 Bookmark Journey';
                localStorage.setItem('fabindia-explorer-bookmarked', 'false');
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
