/**
 * Majestic Waterfalls of India Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA
       ================================================================ */

    const WATERFALLS_DATA = [
        {
            id: "jog-falls",
            name: "Jog Falls",
            state: "Karnataka",
            river: "Sharavati",
            height: "253 meters",
            season: "Monsoon",
            tags: ["monsoon", "tallest"],
            description: "Jog Falls is the second-highest plunge waterfall in India. It is a major tourist attraction and is ranked 13th in the world by the waterfall database.",
            flow: "Varies greatly with the season; highly spectacular during the monsoon.",
            attractions: "Linganamakki Dam, Honnemaradu, Sigandur.",
            image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "dudhsagar",
            name: "Dudhsagar Falls",
            state: "Goa",
            river: "Mandovi",
            height: "310 meters",
            season: "Monsoon",
            tags: ["monsoon", "tallest"],
            description: "Dudhsagar literally translates to 'Sea of Milk'. This four-tiered waterfall is located on the Mandovi River in the Indian state of Goa.",
            flow: "Heavy during monsoons, creating a milky white appearance as it cascades down.",
            attractions: "Bhagwan Mahavir Wildlife Sanctuary, Tambdi Surla Temple.",
            image: "https://images.unsplash.com/photo-1599394676579-a1b73e35186b?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1599394676579-a1b73e35186b?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "nohkalikai",
            name: "Nohkalikai Falls",
            state: "Meghalaya",
            river: "Rainwater fed",
            height: "340 meters",
            season: "Year-round",
            tags: ["year-round", "tallest"],
            description: "The tallest plunge waterfall in India. Its name means 'Jump of Ka Likai', referring to a local legend. It plunges over the red sandstone cliffs of Cherrapunji.",
            flow: "Consistent throughout the year, but strongest during the heavy monsoons of Meghalaya.",
            attractions: "Mawsmai Cave, Seven Sisters Falls, Double Decker Living Root Bridge.",
            image: "https://images.unsplash.com/photo-1592683935213-90d16edb5709?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1592683935213-90d16edb5709?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "athirappilly",
            name: "Athirappilly Falls",
            state: "Kerala",
            river: "Chalakudy",
            height: "25 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "Often called the 'Niagara of India', Athirappilly is the largest waterfall in Kerala, situated in Thrissur district.",
            flow: "Powerful and wide during the monsoon, offering a majestic view.",
            attractions: "Vazhachal Waterfalls, Charpa Falls, Sholayar Dam.",
            image: "https://images.unsplash.com/photo-1621614769004-ee9cfa11794b?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1621614769004-ee9cfa11794b?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "shivanasamudra",
            name: "Shivanasamudra Falls",
            state: "Karnataka",
            river: "Kaveri",
            height: "98 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "A famous segmented waterfall on the Kaveri river. The island town of Shivanasamudra divides the river into twin waterfalls: Gaganachukki and Bharachukki.",
            flow: "Best visited during the monsoon when the Kaveri river is at its peak.",
            attractions: "Talakadu, Somnathpur Temple.",
            image: "https://images.unsplash.com/photo-1601249969186-53819e0750fc?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1601249969186-53819e0750fc?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "chitrakote",
            name: "Chitrakote Falls",
            state: "Chhattisgarh",
            river: "Indravati",
            height: "29 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "The widest waterfall in India, often referred to as the 'Niagara Falls of India'. Located in the Bastar district.",
            flow: "Extremely wide and muddy during the monsoon; calmer and clearer in winter.",
            attractions: "Kanger Valley National Park, Tirathgarh Falls.",
            image: "https://images.unsplash.com/photo-1610427953255-06f1577bd94b?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1610427953255-06f1577bd94b?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "kempty",
            name: "Kempty Falls",
            state: "Uttarakhand",
            river: "Mountain Streams",
            height: "12 meters",
            season: "Year-round",
            tags: ["year-round"],
            description: "A popular tourist destination near Mussoorie. The name 'Kempty' is probably derived from the word 'camp-tea'.",
            flow: "Perennial flow, though highest during the monsoon.",
            attractions: "Mussoorie Mall Road, Gun Hill, Lal Tibba.",
            image: "https://images.unsplash.com/photo-1596773229676-e13d98fb8a76?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1596773229676-e13d98fb8a76?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "hebbe",
            name: "Hebbe Falls",
            state: "Karnataka",
            river: "Bhadra",
            height: "168 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "Hidden inside the Bhadra Wildlife Sanctuary, this waterfall descends in two stages to form Dodda Hebbe (Big Falls) and Chikka Hebbe (Small Falls).",
            flow: "Strong during monsoon; requires an adventurous jeep ride to reach.",
            attractions: "Kemmangundi Hill Station, Z Point, Mullayanagiri.",
            image: "https://images.unsplash.com/photo-1606990479155-70e28fb60971?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1606990479155-70e28fb60971?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "hogenakkal",
            name: "Hogenakkal Falls",
            state: "Tamil Nadu",
            river: "Kaveri",
            height: "20 meters",
            season: "Year-round",
            tags: ["year-round"],
            description: "Referred to as the 'Niagara Falls of India', it is famous for medicinal baths and hide boat (coracle) rides.",
            flow: "Good flow year-round, but highly spectacular (and sometimes restricted for boating) during heavy monsoons.",
            attractions: "Coracle Rides, Melagiri Hills.",
            image: "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&q=40&w=400",
            url: "../hogenakkal-falls-explorer/index.html"
        },
        {
            id: "bhimlat",
            name: "Bhimlat Falls",
            state: "Rajasthan",
            river: "Mangli",
            height: "60 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "A well-kept secret in the arid state of Rajasthan. According to legend, it was created by Bhima (from the Mahabharata) to quench the thirst of his family.",
            flow: "Strictly seasonal; heavily dependent on monsoon rains.",
            attractions: "Bundi Fort, Taragarh Fort.",
            image: "https://images.unsplash.com/photo-1620959451996-037340c2be43?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1620959451996-037340c2be43?auto=format&fit=crop&q=40&w=400"
        },
        {
            id: "bishop",
            name: "Bishop Falls",
            state: "Meghalaya",
            river: "Umiam River",
            height: "135 meters",
            season: "Post-Monsoon",
            tags: ["monsoon"],
            description: "A spectacular three-tiered cascade plunging down the steep gorges of Shillong, famed for its twin relationship with Beadon Falls.",
            flow: "Powerful roar during monsoon; clearer three-tiered cascade post-monsoon.",
            attractions: "Beadon Falls, Umiam Lake.",
            image: "https://images.unsplash.com/photo-1601249969186-53819e0750fc?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1601249969186-53819e0750fc?auto=format&fit=crop&q=40&w=400",
            url: "../bishop-falls-explorer/index.html"
            id: "nohsngithiang",
            name: "Nohsngithiang Falls",
            state: "Meghalaya",
            river: "Monsoon Rainfall",
            height: "315 meters",
            season: "Monsoon",
            tags: ["monsoon"],
            description: "Also known as the Seven Sisters Falls, this majestic 315m segmented waterfall transforms the Khasi Hills cliffs during the monsoon.",
            flow: "Thundering seven streams in monsoon; completely dry in winter.",
            attractions: "Mawsmai Cave, Cherrapunji.",
            image: "https://images.unsplash.com/photo-1596773229676-e13d98fb8a76?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1596773229676-e13d98fb8a76?auto=format&fit=crop&q=40&w=400",
            url: "../nohsngithiang-falls-explorer/index.html"
        },
        {
            id: "vantawng",
            name: "Vantawng Falls",
            state: "Mizoram",
            river: "Vanva River",
            height: "229 meters",
            season: "Monsoon",
            tags: ["monsoon", "year-round"],
            description: "Mizoram's tallest waterfall, cascading 229 metres in a stunning two-tiered drop amid deep bamboo forests.",
            flow: "Massive roaring curtain in monsoon; clearer two-tiered cascade in winter.",
            attractions: "Thenzawl, Chhingpuii Thlan.",
            image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=40&w=400",
            url: "../vantawng-falls-explorer/index.html"
        },
        {
            id: "nuranang",
            name: "Nuranang Falls",
            state: "Arunachal Pradesh",
            river: "Nuranang River",
            height: "100 meters",
            season: "Monsoon",
            tags: ["monsoon", "year-round"],
            description: "Also known as Bong Bong Falls, a spectacular ~100m drop in the Himalayas.",
            flow: "Powerful in monsoon, serene and crystal clear in winter.",
            attractions: "Tawang, Sela Pass.",
            image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=40&w=400",
            url: "../nuranang-falls-explorer/index.html"
        },
        {
            id: "kempty",
            name: "Kempty Falls",
            state: "Uttarakhand",
            river: "Garhwal hill stream (Yamuna tributary)",
            height: "40-50 feet",
            season: "Year-round",
            tags: ["year-round"],
            description: "A five-tiered cascade near Mussoorie, developed as a tea-party spot in 1835.",
            flow: "Powerful and flood-prone in monsoon; clear and gentle March-June and Sept-Nov.",
            attractions: "Mussoorie Mall Road, Camel's Back Road, Lal Tibba.",
            image: "https://images.unsplash.com/photo-1467890947394-8171244e5410?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1467890947394-8171244e5410?auto=format&fit=crop&q=40&w=400",
            url: "../kempty-falls-explorer/index.html"
        },
        {
            id: "chitrakote",
            name: "Chitrakote Falls",
            state: "Chhattisgarh",
            river: "Indravati River",
            height: "29 meters",
            season: "Monsoon",
            tags: ["monsoon", "widest"],
            description: "India's widest waterfall, spreading nearly 300m across the Indravati in a horseshoe shape.",
            flow: "Roaring reddish-brown curtain in monsoon; narrower clear streams in the dry season.",
            attractions: "Tirathgarh Falls, Kanger Valley National Park, Kailash Caves.",
            image: "https://images.unsplash.com/photo-1620641622310-c1c243e4959c?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1620641622310-c1c243e4959c?auto=format&fit=crop&q=40&w=400",
            url: "../chitrakote-falls-explorer/index.html"
        },
        {
            id: "tirathgarh",
            name: "Tirathgarh Falls",
            state: "Chhattisgarh",
            river: "Munga Bahar (Kanger River tributary)",
            height: "91 meters",
            season: "Year-round",
            tags: ["year-round", "monsoon"],
            description: "A multi-tiered, milky-white cascade inside Kanger Valley National Park.",
            flow: "Full and flooded in monsoon; clear, milky-white and distinctly tiered Oct-Feb.",
            attractions: "Kanger Valley National Park, Kutumsar Caves, Kailash Caves, Chitrakote Falls.",
            image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=40&w=400",
            url: "../tirathgarh-falls-explorer/index.html"
        },
        {
            id: "barehipani",
            name: "Barehipani Falls",
            state: "Odisha",
            river: "Budhabalanga River",
            height: "399 meters",
            season: "Post-Monsoon",
            tags: ["tallest", "monsoon"],
            description: "India's 2nd highest two-tiered waterfall, cascading 399 meters amidst the core tiger habitats of Similipal National Park.",
            flow: "Roaring two-tiered silver torrent post-monsoon; perennial flow through ancient Meghasani basalt.",
            attractions: "Similipal Tiger Reserve, Joranda Falls, Meghasani Peak, Chahala.",
            image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=40&w=400",
            url: "../barehipani-falls-explorer/index.html"},
              {
            id: "soochipara",
            name: "Soochipara Falls",
            state: "Kerala",
            river: "Chaliyar River",
            height: "200 meters",
            season: "Post-Monsoon",
            tags: ["year-round", "tallest"],
            description: "A three-tiered cascade nestled in the dense montane evergreen rainforests of Wayanad, surrounded by Sentinel Rock cliffs.",
            flow: "Spectacular flow post-monsoon; safe natural plunge pool for swimming in winter.",
            attractions: "Chembra Peak, Meenmutty Falls, Kanthanpara Falls, Vellarimala.",
            image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=600",
            thumb: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=40&w=400",
            url: "../soochipara-falls-explorer/index.html"
        }
    ];

    /* ================================================================
       2. DOM ELEMENTS
       ================================================================ */

    const gridContainer = document.getElementById('waterfalls-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('waterfall-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.querySelector('.modal-close');

    /* ================================================================
       3. INIT & RENDER
       ================================================================ */

    document.addEventListener('DOMContentLoaded', () => {
        renderGrid(WATERFALLS_DATA);
        setupFilters();
        setupModal();
    });

    function renderGrid(data) {
        gridContainer.innerHTML = '';

        if (data.length === 0) {
            gridContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center;">No waterfalls found for this filter.</p>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('article');
            card.className = 'waterfall-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View details for ${escapeHTML(item.name)}`);
            card.dataset.id = item.id;

            card.innerHTML = `
                <div class="card-image">
                    <!-- lazy loading native attribute -->
                    <img src="${item.thumb}" alt="${escapeHTML(item.name)}" loading="lazy" width="400" height="300" />
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${escapeHTML(item.name)}</h3>
                        <span class="card-badge">${escapeHTML(item.season)}</span>
                    </div>
                    <div class="card-meta">
                        <span>📍 ${escapeHTML(item.state)}</span>
                        <span>📏 ${escapeHTML(item.height)}</span>
                    </div>
                </div>
            `;

            // Event Listeners for Modal or External URL
            const handleAction = () => {
                if (item.url) {
                    window.location.href = item.url;
                } else {
                    openModal(item);
                }
            };
            card.addEventListener('click', handleAction);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction();
                }
            });

            gridContainer.appendChild(card);
        });

        setupIntersectionObserver();
    }

    /* ================================================================
       4. INTERSECTION OBSERVER (Fade In)
       ================================================================ */

    function setupIntersectionObserver() {
        const cards = document.querySelectorAll('.waterfall-card');

        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            cards.forEach(card => card.classList.add('fade-in'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px 50px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    /* ================================================================
       5. FILTERING
       ================================================================ */

    function setupFilters() {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                let filteredData = WATERFALLS_DATA;

                if (filter !== 'all') {
                    filteredData = WATERFALLS_DATA.filter(item => item.tags.includes(filter));
                }

                renderGrid(filteredData);
            });
        });
    }

    /* ================================================================
       6. MODAL LOGIC
       ================================================================ */

    function setupModal() {
        const closeModal = () => {
            modal.setAttribute('hidden', '');
        };

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
                closeModal();
            }
        });
    }

    function openModal(data) {
        modalBody.innerHTML = `
            <div class="modal-hero">
                <img src="${data.image}" alt="${escapeHTML(data.name)}" loading="lazy" />
                <div class="modal-hero-overlay">
                    <h2 id="modal-title">${escapeHTML(data.name)}</h2>
                    <span class="card-badge">📍 ${escapeHTML(data.state)}</span>
                </div>
            </div>
            <div class="modal-info">
                <div class="modal-stats">
                    <div class="stat-item">
                        <h4>Height</h4>
                        <p>${escapeHTML(data.height)}</p>
                    </div>
                    <div class="stat-item">
                        <h4>River</h4>
                        <p>${escapeHTML(data.river)}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Best Season</h4>
                        <p>${escapeHTML(data.season)}</p>
                    </div>
                </div>
                
                <div class="modal-details">
                    <h4>About</h4>
                    <p>${escapeHTML(data.description)}</p>
                    
                    <h4>Seasonal Flow</h4>
                    <p>${escapeHTML(data.flow)}</p>
                    
                    <h4>Nearby Attractions</h4>
                    <p>${escapeHTML(data.attractions)}</p>
                </div>
            </div>
        `;

        modal.removeAttribute('hidden');
        // Set focus for accessibility
        modalCloseBtn.focus();
    }

    /* ================================================================
       7. UTILS
       ================================================================ */

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

})();
