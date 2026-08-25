/**
 * Raymond Brand Explorer — Interactive Engine
 *
 * Handles:
 *  - Milestone timeline rendering (search + category filter)
 *  - Fashion brands grid rendering
 *  - Interactive Textile-to-Fashion Journey (5-stage accordion)
 *  - Advertising Evolution cards rendering
 *  - Dark/Light theme toggle (matching global project pattern)
 *  - Navbar hamburger menu toggle
 */

document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════════════════════════
    // DATA — Milestones
    // ══════════════════════════════════════════════════════════════
    const milestonesData = [
        {
            year: '1925',
            title: 'Raymond Woollen Mills Established at Thane',
            desc: 'The Raymond Woollen Mills are founded at Thane, Maharashtra, on the banks of the Ulhas River, initially producing coarse woollen blankets and cloth for the local market under the Wadia group.',
            impact: "Birth of India's Most Iconic Textile Mill",
            category: 'founding'
        },
        {
            year: '1944',
            title: 'Acquired by Lala Kailashpat Singhania (J.K. Group)',
            desc: 'Industrialist Lala Kailashpat Singhania of the J.K. Group acquires Raymond Woollen Mills. He invests in European-grade machinery and shifts the production focus from coarse woollens to high-quality worsted suiting fabric — a defining pivot.',
            impact: 'Transition to Premium Worsted Suiting',
            category: 'founding'
        },
        {
            year: '1958',
            title: 'Vijaypat Singhania Joins Leadership',
            desc: "Lala Kailashpat Singhania's son Vijaypat Singhania takes over active management of Raymond. Under his leadership over the next four decades, Raymond transforms from a regional textile mill into a nationally trusted lifestyle brand.",
            impact: 'The Visionary Era Begins',
            category: 'founding'
        },
        {
            year: '1960s',
            title: "India's Largest Integrated Worsted Textile Mill",
            desc: "By the 1960s, Raymond's Thane mill complex has expanded into India's largest integrated worsted suiting manufacturer, producing fabric used by tailors and clothing brands across the country. Export relationships begin forming.",
            impact: 'National Market Leadership in Suiting Fabric',
            category: 'textile'
        },
        {
            year: '1968',
            title: 'Raymond Retail Showrooms Launch',
            desc: 'Raymond opens its first dedicated retail fabric showrooms, directly connecting with consumers who purchase fabric for tailored garments. This retail push builds consumer brand recognition beyond just trade channels.',
            impact: 'From B2B Mill to Consumer-Facing Brand',
            category: 'textile'
        },
        {
            year: '1970s',
            title: 'Export Growth to Global Markets',
            desc: "Raymond's fine worsted fabrics begin reaching international clothing brands and exporters. The company's fabric quality — particularly its Super series worsted cloth — earns recognition from global fashion manufacturers.",
            impact: 'Raymond Fabric Goes Global',
            category: 'textile'
        },
        {
            year: '1983',
            title: '"The Complete Man" Campaign Launches',
            desc: "Mudra Communications creates the iconic \"The Complete Man\" campaign for Raymond under Vijaypat Singhania's direction. The campaign positions Raymond as a lifestyle aspiration — a sensitive, successful, well-dressed Indian man — far beyond a mere fabric brand.",
            impact: "India's Most Enduring Fashion Identity is Born",
            category: 'advertising'
        },
        {
            year: '1986',
            title: 'Park Avenue — Premium Menswear Brand Launched',
            desc: "Raymond launches Park Avenue as its premium menswear ready-to-wear brand, targeting urban professional men seeking tailored shirts, trousers, suits and accessories. Park Avenue becomes one of India's most recognisable formal menswear labels.",
            impact: "Raymond's First Step into Branded Fashion",
            category: 'fashion'
        },
        {
            year: '1990s',
            title: 'ColorPlus — Colour-Led Fashion Brand',
            desc: "Raymond introduces ColorPlus, a casual and semi-formal brand emphasising colour blocking, chinos, polo shirts and knitwear. ColorPlus successfully expands Raymond's reach to a younger, more colour-conscious urban consumer.",
            impact: 'Entering the Casual Fashion Segment',
            category: 'fashion'
        },
        {
            year: '1997',
            title: 'KamaSutra Brand Acquired',
            desc: "Raymond acquires the KamaSutra condom brand, marking the company's first move beyond the textiles and apparel category. The brand positions Raymond in the FMCG personal care segment.",
            impact: 'Diversification Beyond Fashion',
            category: 'fashion'
        },
        {
            year: '2000',
            title: 'Parx — Casual Wear Brand for Youth',
            desc: 'Raymond launches Parx, a youth-oriented casual wear brand featuring denim-inspired separates, casual trousers and shirts, targeting 18–30 year olds seeking affordable, fashionable everyday clothing under a Raymond umbrella brand.',
            impact: "Reaching India's Youth Market",
            category: 'fashion'
        },
        {
            year: '2006',
            title: 'Leadership Transition — Gautam Singhania Takes Over',
            desc: 'Gautam Singhania, son of Vijaypat Singhania, takes over as Chairman and Managing Director of Raymond. He embarks on an aggressive retail expansion strategy, growing the Raymond Shop network across India.',
            impact: 'New Leadership, Retail Expansion Era',
            category: 'founding'
        },
        {
            year: '2015',
            title: 'Ethnix — Indian Ethnic Wear Brand',
            desc: "Raymond launches Ethnix, its dedicated Indian ethnic menswear brand, offering sherwanis, kurta sets, nehru jackets and indo-western garments. Ethnix directly targets India's large and growing wedding and festive occasion menswear market.",
            impact: 'Entering the Ethnic Fashion Segment',
            category: 'fashion'
        },
        {
            year: '2019–2022',
            title: 'Raymond Demerger — Real Estate Spin-Off',
            desc: "Raymond undertakes a significant corporate restructuring, separating its real estate assets (the Thane mill land and residential projects) from its core textile and lifestyle businesses. This sharpens Raymond's focus on its fashion and textile identity.",
            impact: 'Sharpened Focus on Fashion & Lifestyle',
            category: 'founding'
        },
        {
            year: '2020s',
            title: 'Omni-Channel Expansion — 1,500+ Retail Outlets',
            desc: 'Under Gautam Singhania, Raymond operates over 1,500 retail outlets across India, including Raymond Shops, Park Avenue stores, and Ethnix outlets, alongside a growing e-commerce presence. The brand also exports worsted fabric to over 60 countries.',
            impact: 'Century-Old Mill Brand Becomes Digital-Age Retailer',
            category: 'fashion'
        }
    ];

    // ══════════════════════════════════════════════════════════════
    // DATA — Fashion Brands
    // ══════════════════════════════════════════════════════════════
    const fashionBrandsData = [
        {
            icon: '🧵',
            title: 'Raymond Fabrics',
            category: 'Worsted Suiting',
            desc: "The flagship textile brand — Raymond's core offering since 1925. India's largest worsted suiting fabric manufacturer, exporting to over 60 countries. Known for its Super 120s, Super 150s, and premium fabric collections.",
            items: 'Merino Wool Suiting · Fine Worsted Fabrics · Premium Blends · Export Collections'
        },
        {
            icon: '👔',
            title: 'Park Avenue',
            category: 'Premium Menswear',
            desc: "Launched in 1986, Park Avenue is Raymond's premium ready-to-wear menswear brand targeting urban professionals. Known for precision tailoring, formal shirts, structured suits, and premium accessories.",
            items: 'Formal Suits · Dress Shirts · Trousers · Ties & Accessories'
        },
        {
            icon: '🎨',
            title: 'ColorPlus',
            category: 'Smart Casual',
            desc: 'A colour-driven smart casual fashion brand introduced in the 1990s, ColorPlus brings chinos, polo shirts, knitwear, and casual blazers to the wardrobe-conscious urban Indian man. Known for its signature rich colour palette.',
            items: 'Chinos · Polo Shirts · Knitwear · Casual Blazers'
        },
        {
            icon: '🏄',
            title: 'Parx',
            category: 'Youth Casual',
            desc: "Launched in 2000, Parx is Raymond's casual lifestyle brand aimed at the 18–30 age segment. Offering everyday casual wear — jeans, casual shirts, T-shirts and cargo trousers — at accessible price points under the Raymond umbrella.",
            items: 'Casual Shirts · Denim · T-Shirts · Cargo Trousers'
        },
        {
            icon: '🎭',
            title: 'Ethnix by Raymond',
            category: 'Indian Ethnic Wear',
            desc: "Launched in 2015 and significantly expanded in subsequent years, Ethnix is Raymond's dedicated Indian ethnic menswear brand. Offering designer sherwanis, kurta-churidar sets, Nehru jackets, and indo-western fusion garments for weddings and festivals.",
            items: 'Sherwanis · Kurta Sets · Nehru Jackets · Indo-Western'
        },
        {
            icon: '✂️',
            title: 'Raymond Made to Measure',
            category: 'Bespoke Tailoring',
            desc: "Raymond's premium made-to-measure tailoring service, combining the brand's heritage of fine worsted fabric with personalised tailoring. Customers choose fabric grade, lining, and cut specifications for custom-fitted garments.",
            items: 'Custom Suits · Bespoke Shirts · Made-to-Order Trousers'
        }
    ];

    // ══════════════════════════════════════════════════════════════
    // DATA — Textile → Fashion Journey Stages
    // ══════════════════════════════════════════════════════════════
    const journeyStages = [
        {
            id: 'stage-textile-mfg',
            stage: '01',
            icon: '🏭',
            title: 'Textile Manufacturing',
            period: '1925 – 1960s',
            description: 'Raymond begins as a pure woollen textile mill — producing blankets and coarse cloth, then pivoting to fine worsted suiting after the Singhania acquisition in 1944. The Thane mill is expanded and modernised with European machinery.',
            products: ['Woollen blankets', 'Coarse cloth', 'Merino wool suiting', 'Worsted fabric for trade'],
            significance: "Raymond establishes itself as India's largest integrated manufacturer of worsted suiting fabric, supplying tailors, garment makers, and exporters. The quality foundation is laid — fabric excellence becomes the brand's bedrock."
        },
        {
            id: 'stage-premium-fabric',
            stage: '02',
            icon: '🧶',
            title: 'Premium Fabric & Suiting',
            period: '1960s – 1982',
            description: 'Raymond opens retail showrooms directly to consumers, transitioning from a business-to-business mill supplier to a consumer-recognised fabric brand. The "Raymond Shops" allow customers to choose fabric for tailored garments, building brand loyalty.',
            products: ['Super 100s worsted suiting', 'Fine Merino fabric for tailoring', 'Export-quality cloth'],
            significance: 'Raymond evolves from invisible mill supplier to visible consumer brand. Buying "Raymond fabric" becomes a mark of taste and social standing across India\'s growing urban middle class.'
        },
        {
            id: 'stage-mens-apparel',
            stage: '03',
            icon: '👔',
            title: 'Men\'s Branded Apparel',
            period: '1983 – 2000',
            description: '"The Complete Man" campaign launches in 1983, giving Raymond an emotional lifestyle identity far beyond fabric. Park Avenue is born in 1986 as India\'s first major premium ready-to-wear menswear brand under the Raymond umbrella. ColorPlus follows in the 1990s.',
            products: ['Park Avenue formal suits', 'Raymond dress shirts', 'Premium tailored trousers', 'ColorPlus chinos & polos'],
            significance: 'Raymond crosses the critical threshold from textile company to fashion brand. Ready-to-wear apparel lines allow the brand to move beyond tailoring-dependent consumers into a modern retail-ready fashion identity.'
        },
        {
            id: 'stage-multibrand',
            stage: '04',
            icon: '🛍️',
            title: 'Multi-Brand Fashion Portfolio',
            period: '2000 – 2015',
            description: 'Raymond builds a full fashion brand family addressing different consumer segments: Parx for youth casual, KamaSutra for personal care, continued ColorPlus expansion, and aggressive retail network growth under Gautam Singhania\'s leadership from 2006.',
            products: ['Parx casual wear', 'KamaSutra personal care', 'Park Avenue suits & formals', 'ColorPlus smart casuals', 'Raymond Made to Measure'],
            significance: 'Raymond transitions from a single-brand textile company to a diversified fashion portfolio house, covering the full spectrum of Indian men\'s wardrobe needs. The retail network crosses 700+ stores nationally.'
        },
        {
            id: 'stage-lifestyle',
            stage: '05',
            icon: '✨',
            title: 'Lifestyle Brand Identity',
            period: '2015 – Present',
            description: 'Ethnix enters the ethnic wear segment (2015). A corporate demerger (2019–2022) separates real estate from the core brand, sharpening Raymond\'s lifestyle and fashion focus. Omni-channel retail and digital presence are expanded, with 1,500+ outlets nationally.',
            products: ['Ethnix sherwanis & kurtas', 'Park Avenue Premium', 'Raymond Contemporary Fabrics', 'Made to Measure bespoke'],
            significance: 'A century after its founding, Raymond stands as India\'s most complete men\'s lifestyle and fashion brand — anchored in its textile manufacturing heritage, yet forward-looking in retail, digital, and multi-segment fashion identity.'
        }
    ];

    // ══════════════════════════════════════════════════════════════
    // DATA — Advertising Evolution
    // ══════════════════════════════════════════════════════════════
    const adEvolutionData = [
        {
            decade: '1983 — Launch',
            title: '"The Complete Man" — A Revolutionary Concept',
            desc: 'Mudra Communications launches The Complete Man for Raymond: a sensitive, professionally successful, well-dressed Indian man. Romanticised print ads set an aspirational tone unlike any Indian fashion brand before it.'
        },
        {
            decade: '1990s',
            title: 'Television & Emotional Storytelling',
            desc: 'The Complete Man evolves into emotional TV commercials — a father interacting tenderly with his child, a man expressing gentleness and depth. These ads are credited as pivotal in shaping aspirational masculinity in Indian advertising.'
        },
        {
            decade: '2000s',
            title: 'Park Avenue & Urban Masculinity',
            desc: 'Park Avenue develops its own advertising voice — sharper, more metropolitan, targeted at yuppie and corporate India. Raymond campaigns continue "The Complete Man" thread while Park Avenue addresses the confident urban professional.'
        },
        {
            decade: '2010s',
            title: 'Festival Campaigns & Digital Integration',
            desc: 'Raymond produces high-production festival campaigns around Diwali, Eid, and wedding season. Digital channels are integrated with behind-the-scenes content, fabric stories, and social media engagement with younger consumers.'
        },
        {
            decade: '2020s',
            title: 'Modern Storytelling & Ethnix Launch',
            desc: 'The Ethnix brand launches dedicated campaigns celebrating the richness of Indian ethnic occasion wear. Raymond refreshes The Complete Man for a new generation — more diverse, more contemporary — while preserving the campaign\'s emotional core.'
        }
    ];

    // ══════════════════════════════════════════════════════════════
    // TIMELINE RENDERING
    // ══════════════════════════════════════════════════════════════
    const timelineContainer = document.getElementById('timelineContainer');
    const searchInput = document.getElementById('timelineSearch');
    const filterChips = document.querySelectorAll('.filter-chip');

    let currentFilter = 'all';
    let searchQuery = '';

    function renderTimeline() {
        if (!timelineContainer) return;

        const filtered = milestonesData.filter(item => {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                item.year.toLowerCase().includes(q) ||
                item.title.toLowerCase().includes(q) ||
                item.desc.toLowerCase().includes(q) ||
                item.impact.toLowerCase().includes(q);

            if (!matchesSearch) return false;
            if (currentFilter === 'all') return true;
            return item.category === currentFilter;
        });

        timelineContainer.innerHTML = '';

        if (filtered.length === 0) {
            timelineContainer.innerHTML = `
                <div style="text-align: center; padding: 44px; color: var(--raymond-text-muted);">
                    No milestone records found matching your filter criteria.
                </div>`;
            return;
        }

        filtered.forEach(item => {
            const el = document.createElement('div');
            el.className = 'milestone-entry';
            el.innerHTML = `
                <div class="milestone-year">${item.year}</div>
                <div class="milestone-title-group">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <span class="milestone-cat-badge ${item.category}">${item.category}</span>
                </div>
                <div class="milestone-impact">✦ ${item.impact}</div>`;
            timelineContainer.appendChild(el);
        });
    }

    // Filter chip listeners
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-filter');
            renderTimeline();
        });
    });

    // Search listener
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchQuery = e.target.value.trim();
            renderTimeline();
        });
    }

    // ══════════════════════════════════════════════════════════════
    // FASHION BRANDS RENDERING
    // ══════════════════════════════════════════════════════════════
    function renderBrands() {
        const grid = document.getElementById('brandsGrid');
        if (!grid) return;

        fashionBrandsData.forEach(brand => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-icon">${brand.icon}</div>
                <h3>${brand.title}</h3>
                <span class="product-cat-badge">${brand.category}</span>
                <p class="product-desc">${brand.desc}</p>
                <div class="product-items">${brand.items}</div>`;
            grid.appendChild(card);
        });
    }

    // ══════════════════════════════════════════════════════════════
    // INTERACTIVE TEXTILE → FASHION JOURNEY RENDERING
    // ══════════════════════════════════════════════════════════════
    function renderJourney() {
        const container = document.getElementById('journeyContainer');
        if (!container) return;

        journeyStages.forEach((stage) => {
            // Wrapper (for list role)
            const wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'listitem');

            // Toggle button
            const btn = document.createElement('button');
            btn.className = 'journey-stage-btn';
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-controls', `${stage.id}-detail`);
            btn.setAttribute('id', `${stage.id}-btn`);
            btn.setAttribute('type', 'button');
            btn.innerHTML = `
                <span class="journey-stage-num">${stage.stage}</span>
                <span class="journey-stage-icon" aria-hidden="true">${stage.icon}</span>
                <div class="journey-stage-header">
                    <div class="journey-stage-title">${stage.title}</div>
                    <div class="journey-stage-period">${stage.period}</div>
                </div>
                <span class="journey-stage-arrow" aria-hidden="true">▼</span>`;

            // Detail panel
            const detail = document.createElement('div');
            detail.className = 'journey-detail';
            detail.setAttribute('id', `${stage.id}-detail`);
            detail.setAttribute('role', 'region');
            detail.setAttribute('aria-labelledby', `${stage.id}-btn`);
            detail.setAttribute('hidden', '');

            const productItems = stage.products
                .map(p => `<li>${p}</li>`)
                .join('');

            detail.innerHTML = `
                <div class="journey-detail-inner">
                    <div class="journey-detail-block">
                        <h4>What Changed</h4>
                        <p>${stage.description}</p>
                    </div>
                    <div class="journey-detail-block">
                        <h4>Key Products &amp; Offerings</h4>
                        <ul class="journey-products-list">${productItems}</ul>
                    </div>
                    <div class="journey-significance">
                        <p><strong>Significance:</strong> ${stage.significance}</p>
                    </div>
                </div>`;

            // Toggle interaction
            btn.addEventListener('click', () => {
                const isOpen = btn.getAttribute('aria-expanded') === 'true';

                // Close all others (accordion pattern)
                container.querySelectorAll('.journey-stage-btn').forEach(b => {
                    b.setAttribute('aria-expanded', 'false');
                    b.classList.remove('active');
                });
                container.querySelectorAll('.journey-detail').forEach(d => {
                    d.classList.remove('open');
                    d.setAttribute('hidden', '');
                });

                if (!isOpen) {
                    btn.setAttribute('aria-expanded', 'true');
                    btn.classList.add('active');
                    detail.removeAttribute('hidden');
                    // Small rAF delay so display:block registers before transition
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            detail.classList.add('open');
                        });
                    });
                }
            });

            wrapper.appendChild(btn);
            wrapper.appendChild(detail);
            container.appendChild(wrapper);
        });
    }

    // ══════════════════════════════════════════════════════════════
    // ADVERTISING EVOLUTION RENDERING
    // ══════════════════════════════════════════════════════════════
    function renderAdEvolution() {
        const col = document.getElementById('adEvolutionContainer');
        if (!col) return;

        adEvolutionData.forEach(era => {
            const card = document.createElement('div');
            card.className = 'ad-era-card';
            card.innerHTML = `
                <div class="ad-era-decade">${era.decade}</div>
                <div class="ad-era-title">${era.title}</div>
                <p class="ad-era-desc">${era.desc}</p>`;
            col.appendChild(card);
        });
    }

    // ══════════════════════════════════════════════════════════════
    // THEME TOGGLE
    // ══════════════════════════════════════════════════════════════
    function initThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) return;

        function applyTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                themeBtn.textContent = '🌙';
                themeBtn.setAttribute('aria-label', 'Switch to Dark Mode');
            } else {
                document.body.classList.remove('light-theme');
                themeBtn.textContent = '☀️';
                themeBtn.setAttribute('aria-label', 'Switch to Light Mode');
            }
        }

        // Read current preference
        let savedTheme = 'dark';
        try {
            savedTheme = JSON.parse(localStorage.getItem('iie_storage') || '{}').theme ||
                         localStorage.getItem('theme') || 'dark';
        } catch (e) { /* ignore */ }
        applyTheme(savedTheme);

        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-theme');
            const next = isLight ? 'dark' : 'light';
            applyTheme(next);
            try {
                localStorage.setItem('theme', next);
                const store = JSON.parse(localStorage.getItem('iie_storage') || '{}');
                store.theme = next;
                localStorage.setItem('iie_storage', JSON.stringify(store));
            } catch (e) { /* ignore */ }
        });
    }

    // ══════════════════════════════════════════════════════════════
    // NAVBAR HAMBURGER TOGGLE
    // ══════════════════════════════════════════════════════════════
    function initNavbar() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu    = document.getElementById('nav-menu');
        const navbar     = document.getElementById('navbar');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            // Close menu when a link is clicked
            navMenu.querySelectorAll('a.nav-link, a.dropdown-item').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Navbar scroll shadow
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, { passive: true });
        }

        // Dropdown toggle (Brands & Heritage)
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu   = document.querySelector('.dropdown-menu');
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', e => {
                e.stopPropagation();
                const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
                dropdownToggle.setAttribute('aria-expanded', !isExpanded);
                dropdownMenu.classList.toggle('open');
            });

            document.addEventListener('click', () => {
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownMenu.classList.remove('open');
            });
        }
    }

    // ══════════════════════════════════════════════════════════════
    // INITIALISE
    // ══════════════════════════════════════════════════════════════
    renderTimeline();
    renderBrands();
    renderJourney();
    renderAdEvolution();
    initThemeToggle();
    initNavbar();
});
