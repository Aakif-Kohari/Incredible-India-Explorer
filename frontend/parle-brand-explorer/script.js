/* ==========================================================================
   Parle Brand Explorer Logic
   Handles dynamic filtering, interactive packaging timeline, jingle jukebox player,
   regional distribution view, bookmarking, modal detail view, and theme toggling.
   ========================================================================== */

(function () {
    'use strict';

    /**
     * Major milestones in Parle's 95+ years evolution.
     */
    const timelineData = [
        {
            year: 1929,
            decade: '1920-1940',
            title: 'Founding of Parle Confectionery',
            tag: 'Origins',
            desc: 'Mohanlal Dayal Chauhan acquires a small factory in Vile Parle, Mumbai. Inspired by the Swadeshi movement, Parle imports German machinery to manufacture indigenous sweets.'
        },
        {
            year: 1939,
            decade: '1920-1940',
            title: 'Launch of Parle Gluco Biscuit',
            tag: 'Category Creation',
            desc: 'Parle introduces Parle Gluco as an affordable, energy-rich biscuit for common Indians, offering a nutritious Swadeshi alternative to expensive imported British brands.'
        },
        {
            year: 1947,
            decade: '1920-1940',
            title: 'Serving Independent India & Armed Forces',
            tag: 'Patriotism',
            desc: 'Post-Independence, wheat shortages led Parle to campaign for barley biscuit consumption. Parle became a vital ration supplier to the Indian Armed Forces.'
        },
        {
            year: 1963,
            decade: '1950-1970',
            title: 'Monaco Introduced: India\'s First Salted Biscuit',
            tag: 'Product Innovation',
            desc: 'Parle introduces Monaco, inventing the savory salted biscuit segment in India and establishing a teatime party classic.'
        },
        {
            year: 1971,
            decade: '1950-1970',
            title: 'KrackJack Launch: The Sweet & Salty Pioneer',
            tag: 'Category First',
            desc: 'KrackJack debuts as India\'s very first sweet-and-salty cracker, setting off a massive cultural trend in biscuit flavor profiles.'
        },
        {
            year: 1977,
            decade: '1950-1970',
            title: 'Rebranding to "Parle-G"',
            tag: 'Brand Protection',
            desc: 'To counter rampant market knock-offs and fake glucose biscuits, Parle Gluco rebrands to Parle-G with a signature yellow wrapper featuring the iconic Parle Girl illustration.'
        },
        {
            year: 1983,
            decade: '1980-2000',
            title: 'Melody Toffee & "Melody Hai Kisliye?"',
            tag: 'Confectionery Icon',
            desc: 'Parle launches Melody chocolate toffee with one of Indian advertising\'s most memorable tagline questions: "Melody Hai Kisliye?".'
        },
        {
            year: 1985,
            decade: '1980-2000',
            title: 'Frooti Launch in Revolutionary Tetra Pak',
            tag: 'Beverage Disruptor',
            desc: 'Parle Agro introduces Frooti, pioneering ready-to-drink mango juice in hygienic green Tetra Paks, revolutionizing India\'s soft drink industry.'
        },
        {
            year: 1989,
            decade: '1980-2000',
            title: 'Mango Bite Hit Candy',
            tag: 'Flavored Candy',
            desc: 'Launch of Mango Bite, capturing the real taste of Alphonso mangoes and becoming India\'s highest-selling boiled hard candy.'
        },
        {
            year: 1996,
            decade: '1980-2000',
            title: 'Hide & Seek: Premium Choco-Chip Cookie',
            tag: 'Deluxe Cookies',
            desc: 'Parle launches Hide & Seek, introducing real chocolate chip cookies to Indian consumers and capturing the youth segment.'
        },
        {
            year: 2011,
            decade: '2010-present',
            title: '$1 Billion Retail Sales Milestone',
            tag: 'Global Record',
            desc: 'Parle-G becomes the first Indian fast-moving consumer goods (FMCG) brand to cross $1 Billion (₹5,000 Crore) in single-brand retail sales.'
        },
        {
            year: 2024,
            decade: '2010-present',
            title: 'World\'s #1 Selling Biscuit Brand',
            tag: 'Market Leadership',
            desc: 'Nielsen and Kantar reaffirm Parle-G as the world\'s largest-selling biscuit brand by volume, sold in over 8 million retail outlets across the globe.'
        }
    ];

    /**
     * Iconic Parle product catalog.
     */
    const productsData = [
        {
            id: 'parle-g',
            name: 'Parle-G',
            category: 'biscuits',
            tagline: 'G Mane Genius',
            year: 1939,
            icon: '🍪',
            desc: 'India\'s quintessential glucose biscuit and the world\'s largest selling biscuit brand by volume.',
            details: 'Made from premium wheat, sugar, and milk solids. Loved across all demographic strata in India as the ultimate tea-dunking companion.'
        },
        {
            id: 'monaco',
            name: 'Monaco',
            category: 'biscuits',
            tagline: 'Life Namkeen Banaye',
            year: 1963,
            icon: '🥨',
            desc: 'India\'s first light, crispy salted biscuit, perfect for toppings and evening snacks.',
            details: 'Features a signature perforated edge design and savory salt dusting that transformed Indian party appetizers.'
        },
        {
            id: 'krackjack',
            name: 'KrackJack',
            category: 'biscuits',
            tagline: 'Sweet & Salty Twist',
            year: 1971,
            icon: '🍘',
            desc: 'The original dual-flavored biscuit blending sweet sugar crystals with savory saltiness.',
            details: 'Pioneered the sweet-and-salty cracker segment in India and inspired the popular Krack & Jack advertising duo.'
        },
        {
            id: 'hide-and-seek',
            name: 'Hide & Seek',
            category: 'biscuits',
            tagline: 'Don\'t Hide, Just Seek',
            year: 1996,
            icon: '🍫',
            desc: 'Indulgent chocolate chip cookies loaded with real chocolate chips.',
            details: 'Created a brand-new premium cookie market in India, popular among teenagers and young adults.'
        },
        {
            id: 'twenty-twenty',
            name: '20-20 Cookies',
            category: 'biscuits',
            tagline: 'Butter & Cashew Delight',
            year: 2008,
            icon: '🧈',
            desc: 'Rich butter and cashew cookies crafted for quick teatime enjoyment.',
            details: 'Named in honor of the fast-paced Twenty20 cricket format, capturing instant snacking culture.'
        },
        {
            id: 'melody',
            name: 'Melody',
            category: 'confectionery',
            tagline: 'Melody Hai Kisliye? Melody Khao Khud Jan Jao!',
            year: 1983,
            icon: '🍬',
            desc: 'Dual-layered chocolate toffee with a rich caramel shell and molten chocolate center.',
            details: 'Famous for creating one of India\'s most viral advertisement slogans that remains active 40 years later.'
        },
        {
            id: 'mango-bite',
            name: 'Mango Bite',
            category: 'confectionery',
            tagline: 'The Real Mango Candy',
            year: 1989,
            icon: '🥭',
            desc: 'Tangy-sweet boiled candy infused with authentic Alphonso mango flavor.',
            details: 'Remains a schoolyard favorite and birthday party staple for Indian children across generations.'
        },
        {
            id: 'poppins',
            name: 'Poppins',
            category: 'confectionery',
            tagline: 'Dum Diga Diga, Poppins Khaa',
            year: 1950,
            icon: '🔴',
            desc: 'Multi-colored fruity lozenges packed in iconic roll wrappers.',
            details: 'Offered 8 distinct fruit flavors in a single roll, encouraging kids to swap colors with friends.'
        },
        {
            id: 'kismi',
            name: 'Kismi Toffee',
            category: 'confectionery',
            tagline: 'Elachi & Coconut Blast',
            year: 1975,
            icon: '🥥',
            desc: 'Unique blend of real cardamom (elaichi) and cream caramel toffee.',
            details: 'Expanded into Kismi Rose, Rajbhog, and Pan flavors while remaining an affordable 50p/₹1 treat.'
        },
        {
            id: 'frooti',
            name: 'Frooti',
            category: 'beverages',
            tagline: 'Fresh \'n\' Juicy!',
            year: 1985,
            icon: '🧃',
            desc: 'India\'s pioneer packaged mango drink made from rich mango pulp.',
            details: 'Introduced the iconic square Tetra Pak format and later pet bottles, becoming synonymous with Indian summer refreshment.'
        },
        {
            id: 'appy-fizz',
            name: 'Appy Fizz',
            category: 'beverages',
            tagline: 'The Champagne of Fruit Drinks',
            year: 2005,
            icon: '🍾',
            desc: 'Sparkling apple juice drink in a stylish black bottle.',
            details: 'Created India\'s first carbonated fruit juice category, targeting youth with slick urban branding.'
        },
        {
            id: 'parle-wafers',
            name: 'Parle Wafers & Snacks',
            category: 'snacks',
            tagline: 'Halki Fulki Hunger',
            year: 2010,
            icon: '🍟',
            desc: 'Crispy potato wafers in Classic Salted, Piri Piri, and Cream & Onion flavors.',
            details: 'Made with select high-grade potatoes and zero trans-fat oils to compete in India\'s modern snack market.'
        }
    ];

    /**
     * Packaging evolution stages.
     */
    const packagingData = {
        '1939': {
            era: '1939 Waxed Paper Wrapper',
            icon: '📜',
            title: 'Original Swadeshi Wax Paper',
            desc: 'The initial Parle Gluco biscuits were wrapped in simple, hand-sealed butter wax paper printed with red ink to keep moisture out during humid Indian monsoons.',
            features: [
                'First indigenous glucose biscuit packaging in India',
                'Hand-wrapped wax paper sealing',
                'Simple red typography emphasizing "Energy for All"'
            ]
        },
        '1960': {
            era: '1960s Parle Girl Debut',
            icon: '👧',
            title: 'Creation of the Iconic Parle Girl',
            desc: 'Everest Advertising artist Maganlal Dahiya illustrated the plump, curtsy-smiling Parle Girl, creating one of India\'s most recognized mascot illustrations.',
            features: [
                'Debut of the iconic Parle Girl illustration',
                'Yellow & brown wax wrapper pattern',
                'Visual identity designed to help non-literate buyers spot genuine Parle'
            ]
        },
        '1977': {
            era: '1977 Rebrand to Parle-G',
            icon: '🟡',
            title: 'Red & Yellow Signature Wrapper',
            desc: 'To protect the brand against look-alike imitators, Parle Gluco officially changed its name to "Parle-G" and introduced a bright yellow foil-wrapped package.',
            features: [
                'Formal change from Parle Gluco to Parle-G',
                'Bright canary-yellow packaging with red border stripes',
                '"G for Glucose" printed prominently'
            ]
        },
        '2000': {
            era: '2000s Poly-Foil Modernization',
            icon: '✨',
            title: 'Automated High-Speed Poly Packaging',
            desc: 'Parle upgraded to multi-layer protective poly-foil flow wrap, extending shelf life and ensuring factory freshness across 8 million retail shops.',
            features: [
                'Hermetically sealed poly-foil film',
                'Enhanced moisture barrier for remote supply chains',
                '"G Mane Genius" brand positioning tagline'
            ]
        },
        '2020': {
            era: 'Modern & Sustainable',
            icon: '♻️',
            title: 'Eco-Friendly & Value Multi-Packs',
            desc: 'Introduction of recyclable flexible laminate packaging, mini ₹2-₹5 trial packs, and family-size eco cartons for modern supermarket chains.',
            features: [
                'Recyclable mono-material laminate research',
                'Value packs tailored for urban and rural retail formats',
                'QR code authentication and nutrition labeling'
            ]
        }
    };

    /**
     * Advertising history campaigns & jukebox playlist items.
     */
    const adCampaignsData = [
        {
            year: '1980s',
            title: 'Swad Bhare, Shakti Bhare',
            desc: 'Classic Doordarshan era commercial showing growing kids, athletes, and army personnel deriving strength from Parle-G.'
        },
        {
            year: '1990s',
            title: 'Bharat Ka Apna Biscuit',
            desc: 'Patriotic campaign anchoring Parle-G as a household staple that built the nation across generations.'
        },
        {
            year: '2000s',
            title: 'G Mane Genius',
            desc: 'Iconic tagline shift redefining "G" from Glucose to Genius, showcasing curious kids solving real-life challenges.'
        },
        {
            year: '2013',
            title: 'Roko Mat, Toko Mat',
            desc: 'Empowering campaign celebrating childhood curiosity and encouraging parents to let kids explore their full potential.'
        },
        {
            year: '2020',
            title: 'G Mane Genius - Gratitude to Heroes',
            desc: 'Moving pandemic campaign honoring frontline workers and healthcare heroes feeding communities across India.'
        }
    ];

    const jinglesData = [
        {
            id: 'jingle-1',
            brand: 'Parle-G',
            slogan: '"Swad Bhare, Shakti Bhare"',
            year: '1980s Doordarshan Anthem',
            quote: '"Swaad Bhare, Shakti Bhare, Parle-G!" - The nostalgic theme tune that played every Sunday morning before weekly TV serials.',
            audioText: '♪ Swaad Bhare, Shakti Bhare, Parle-G... G Mane Genius! ♪'
        },
        {
            id: 'jingle-2',
            brand: 'Melody',
            slogan: '"Melody Hai Kisliye?"',
            year: '1983 - Present Tagline',
            quote: '"Melody hai kisliye? Melody khao, khud jaan jao!" - One of India\'s most enduring commercial catchphrases.',
            audioText: '♪ Melody hai kisliye? Melody khao, khud jaan jao! ♪'
        },
        {
            id: 'jingle-3',
            brand: 'Frooti',
            slogan: '"Fresh \'n\' Juicy!"',
            year: '1985 Launch Campaign',
            quote: '"Mango Frooti, Fresh \'n\' Juicy!" - Sung by millions of school kids during summer vacations.',
            audioText: '♪ Mango Frooti, Fresh \'n\' Juicy! ♪'
        },
        {
            id: 'jingle-4',
            brand: 'KrackJack',
            slogan: '"Krack & Jack Sweet-Salty Twist"',
            year: '1990s Comedy Ad Series',
            quote: '"Thoda Sweet, Thoda Salty!" - Featuring comedy dual-characters debating contrast flavors.',
            audioText: '♪ Krack & Jack... Thoda Sweet, Thoda Salty! ♪'
        },
        {
            id: 'jingle-5',
            brand: 'Hide & Seek',
            slogan: '"Don\'t Hide, Just Seek"',
            year: '1996 Youth Campaign',
            quote: '"Don\'t Hide, Just Seek..." - Smooth romantic acoustic jingle capturing teenage crush moments.',
            audioText: '♪ Don\'t hide... just seek the taste of real chocolate! ♪'
        }
    ];

    /**
     * Regional distribution coverage data.
     */
    const regionalData = {
        north: {
            title: 'North Zone Supply Chain',
            hubs: 'Major Hubs: Neemrana, Bahadurgarh, Pantnagar',
            desc: 'Covers Delhi-NCR, Punjab, Haryana, Uttar Pradesh, Rajasthan, Himachal Pradesh, and Jammu & Kashmir with 30+ manufacturing lines ensuring supply to high-altitude Himalayan checkposts.'
        },
        west: {
            title: 'West Zone (Corporate HQ & Birthplace)',
            hubs: 'Major Hubs: Vile Parle (Mumbai), Khopoli, Bhuj',
            desc: 'The original homeland of Parle since 1929. Houses global headquarters, central R&D facilities, and high-capacity coastal export shipping infrastructure.'
        },
        south: {
            title: 'South Zone Network',
            hubs: 'Major Hubs: Bengaluru, Chennai, Hyderabad',
            desc: 'Serves Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, and Kerala with localized multi-lingual packaging and dense village-level retail logistics.'
        },
        east: {
            title: 'East & North-East Zone',
            hubs: 'Major Hubs: Kolkata, Guwahati',
            desc: 'Connects West Bengal, Odisha, Bihar, Jharkhand, and all Seven Sister states of the North-East via specialized tea-stall distribution networks.'
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
        renderPackaging('1939');
        renderAdCampaigns();
        renderJinglePlaylist();
        renderRegionalInfo('north');
        attachEventListeners();
        setupThemeToggle();
        setupBookmark();
        setupScrollObserver();
    }

    /**
     * Render Timeline Items based on selected era filter.
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
     * Render Product Cards based on category filter.
     */
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const filtered = activeCategory === 'all'
            ? productsData
            : productsData.filter(p => p.category === activeCategory);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--parle-text-muted);">No products found in this category.</p>';
            return;
        }

        grid.innerHTML = filtered.map(item => `
            <div class="product-card animate-on-scroll" data-id="${item.id}" role="listitem" tabindex="0">
                <div class="product-image-container">
                    <span class="product-category-tag">${item.category}</span>
                    <span class="product-card-icon" aria-hidden="true">${item.icon}</span>
                    <span class="product-launch-year">Est. ${item.year}</span>
                </div>
                <div class="product-card-body">
                    <h3 class="product-card-title">${item.name}</h3>
                    <div class="product-card-tagline">"${item.tagline}"</div>
                    <div class="product-card-desc">${item.desc}</div>
                    <button class="btn-view-details" aria-label="View details about ${item.name}">View Details →</button>
                </div>
            </div>
        `).join('');

        // Attach modal triggers
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
     * Render Packaging Era Display.
     */
    function renderPackaging(eraKey) {
        const display = document.getElementById('packaging-display');
        const data = packagingData[eraKey];
        if (!display || !data) return;

        display.innerHTML = `
            <div class="packaging-visual-box">
                <div class="packaging-visual-icon" aria-hidden="true">${data.icon}</div>
                <div class="packaging-era-badge">${data.era}</div>
            </div>
            <div class="packaging-info">
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <ul class="packaging-key-features">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    /**
     * Render Advertising Historical Timeline Items.
     */
    function renderAdCampaigns() {
        const container = document.getElementById('ad-timeline-list');
        if (!container) return;

        container.innerHTML = adCampaignsData.map(item => `
            <div class="ad-timeline-item">
                <div class="ad-year">${item.year}</div>
                <div class="ad-campaign-title">${item.title}</div>
                <div class="ad-campaign-desc">${item.desc}</div>
            </div>
        `).join('');
    }

    /**
     * Render Jingle Jukebox Playlist.
     */
    function renderJinglePlaylist() {
        const playlist = document.getElementById('jingle-playlist');
        if (!playlist) return;

        playlist.innerHTML = jinglesData.map((jingle, index) => `
            <div class="jingle-item ${index === 0 ? 'active' : ''}" data-id="${jingle.id}" role="listitem" tabindex="0">
                <div>
                    <div class="jingle-item-title">${jingle.slogan}</div>
                    <div class="jingle-item-brand">${jingle.brand} (${jingle.year})</div>
                </div>
                <span>▶</span>
            </div>
        `).join('');

        playlist.querySelectorAll('.jingle-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                selectJingle(id);
            });
        });
    }

    /**
     * Select & Play Jingle in Jukebox Player.
     */
    function selectJingle(jingleId) {
        const jingle = jinglesData.find(j => j.id === jingleId);
        if (!jingle) return;

        document.getElementById('player-brand-tag').textContent = jingle.brand;
        document.getElementById('player-slogan-title').textContent = jingle.slogan;
        document.getElementById('player-year').textContent = jingle.year;
        document.getElementById('player-quote').textContent = jingle.quote;

        // Highlight playlist item
        document.querySelectorAll('.jingle-item').forEach(el => {
            if (el.getAttribute('data-id') === jingleId) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Trigger synth audio cue
        playSynthJingle(jingle.audioText);
    }

    /**
     * Synthesize audio chime effect using Web Audio API for interactive feedback.
     */
    function playSynthJingle(textPrompt) {
        const statusEl = document.getElementById('audio-status');
        if (statusEl) statusEl.textContent = `Playing: "${textPrompt}"`;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            const notes = [261.63, 329.63, 392.00, 523.25]; // C E G C
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
                gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.4);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + idx * 0.15);
                osc.stop(ctx.currentTime + idx * 0.15 + 0.4);
            });
        } catch (e) {
            // Audio context fallback if muted/restricted by browser policy
        }
    }

    /**
     * Render Regional Distribution Info.
     */
    function renderRegionalInfo(regionKey) {
        const display = document.getElementById('region-info-display');
        const data = regionalData[regionKey];
        if (!display || !data) return;

        display.innerHTML = `
            <div class="region-info-header">
                <h4>${data.title}</h4>
                <span class="region-info-hubs">${data.hubs}</span>
            </div>
            <div class="region-info-desc">${data.desc}</div>
        `;
    }

    /**
     * Open Product Details Modal.
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
                    <div class="modal-detail-label">Established Year</div>
                    <div class="modal-detail-value">${product.year}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Category</div>
                    <div class="modal-detail-value" style="text-transform: capitalize;">${product.category}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Overview</div>
                    <div class="modal-detail-value">${product.desc}</div>
                </div>
                <div class="modal-detail-row">
                    <div class="modal-detail-label">Cultural Impact & Legacy</div>
                    <div class="modal-detail-value">${product.details}</div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }

    /**
     * Attach Event Listeners to UI Filters & Controls.
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

        // Packaging Era Tabs
        document.querySelectorAll('.packaging-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.packaging-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const era = tab.getAttribute('data-era');
                renderPackaging(era);
            });
        });

        // Regional Distribution Tabs
        document.querySelectorAll('.region-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.region-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const region = tab.getAttribute('data-region');
                renderRegionalInfo(region);
            });
        });

        // Play Jingle Audio Demo Button
        const playBtn = document.getElementById('play-jingle-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                const activeItem = document.querySelector('.jingle-item.active');
                const id = activeItem ? activeItem.getAttribute('data-id') : 'jingle-1';
                const jingle = jinglesData.find(j => j.id === id);
                if (jingle) playSynthJingle(jingle.audioText);
            });
        }

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
     * Theme Toggle Handler (Dark/Light Mode).
     */
    function setupThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        const currentTheme = localStorage.getItem('parle-explorer-theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleBtn.textContent = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('parle-explorer-theme', isDark ? 'dark' : 'light');
        });
    }

    /**
     * Journey Bookmark Integration Handler.
     */
    function setupBookmark() {
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (!bookmarkBtn) return;

        const isBookmarked = localStorage.getItem('parle-explorer-bookmarked') === 'true';
        if (isBookmarked) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.textContent = '✓ Bookmarked to Journey';
        }

        bookmarkBtn.addEventListener('click', () => {
            const newState = !bookmarkBtn.classList.contains('bookmarked');
            if (newState) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.textContent = '✓ Bookmarked to Journey';
                localStorage.setItem('parle-explorer-bookmarked', 'true');
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                bookmarkBtn.textContent = '🔖 Bookmark Journey';
                localStorage.setItem('parle-explorer-bookmarked', 'false');
            }
        });
    }

    /**
     * Intersection Observer for Smooth Scroll Animations.
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
            // Fallback for older browsers
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

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
