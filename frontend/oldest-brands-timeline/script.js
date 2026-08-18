/* ==========================================================================
   Oldest Brands Timeline Logic
   Handles decade filtering, search, modal details, and Journey integration.
   ========================================================================== */
(function () {
    'use strict';

    /**
     * Comprehensive dataset of India's oldest surviving brands.
     * Each brand includes founding year, founder, industry, milestones, and current status.
     * @type {Array<Object>}
     */
    const brandsData = [
        {
            id: 'allahabad-bank',
            name: 'Allahabad Bank',
            year: 1865,
            decade: '1800',
            founder: 'Founded by European merchants',
            industry: 'banking',
            origin: 'Allahabad (Prayagraj), Uttar Pradesh',
            description: 'India\'s oldest joint-stock bank, pioneering modern banking during British rule.',
            milestones: [
                '1865: Established as India\'s first joint-stock bank',
                '1901: Opened branches across major Indian cities',
                '1969: Nationalized along with 13 other major banks',
                '2020: Merged with Indian Bank'
            ],
            status: 'Merged with Indian Bank in 2020 as part of government consolidation. Legacy continues through Indian Bank\'s operations.'
        },
        {
            id: 'tata',
            name: 'Tata Group',
            year: 1868,
            decade: '1800',
            founder: 'Jamsetji Nusserwanji Tata',
            industry: 'conglomerate',
            origin: 'Mumbai, Maharashtra',
            description: 'India\'s oldest and largest conglomerate, spanning steel, automobiles, IT, and hospitality.',
            milestones: [
                '1868: Jamsetji Tata establishes trading firm',
                '1907: Tata Steel founded, Asia\'s first integrated steel company',
                '1945: TEL (now Tata Motors) established',
                '1968: TCS launched, pioneering India\'s IT industry',
                '2022: Group revenue crosses $150 billion'
            ],
            status: 'Today: Global conglomerate with 100+ companies, operations in 100+ countries, and 965,000+ employees. Includes TCS, Tata Motors, Tata Steel, and Taj Hotels.'
        },
        {
            id: 'bombay-dyeing',
            name: 'Bombay Dyeing',
            year: 1879,
            decade: '1800',
            founder: 'Nowrosjee Wadia',
            industry: 'textiles',
            origin: 'Mumbai, Maharashtra',
            description: 'India\'s oldest textile company, revolutionizing the textile industry in India.',
            milestones: [
                '1879: Founded in Bombay (Mumbai)',
                '1900s: Pioneered modern textile manufacturing',
                '1950s: Diversified into home textiles',
                '1990s: Launched retail chain across India',
                '2020s: Focus on sustainable fashion'
            ],
            status: 'Active: One of India\'s leading home textiles and fashion retailers with presence in 1,000+ exclusive stores and online platforms.'
        },
        {
            id: 'britannia',
            name: 'Britannia Industries',
            year: 1892,
            decade: '1800',
            founder: 'British investors (later Indian-owned)',
            industry: 'food',
            origin: 'Kolkata, West Bengal',
            description: 'India\'s iconic biscuit brand, serving generations of Indian families.',
            milestones: [
                '1892: Established in Calcutta',
                '1920s: Became household name for biscuits',
                '1950s: Indian entrepreneurs took control',
                '1982: Wadia Group acquired majority stake',
                '2018: Listed separately on stock exchanges'
            ],
            status: 'Today: India\'s #2 biscuit manufacturer, producing Good Day, Tiger, Marie Gold, and 50-50 brands with 60%+ household penetration.'
        },
        {
            id: 'godrej',
            name: 'Godrej Group',
            year: 1897,
            decade: '1800',
            founder: 'Pirojsha & Ardeshir Godrej',
            industry: 'conglomerate',
            origin: 'Mumbai, Maharashtra',
            description: 'From India\'s first lock without keys to a diversified empire spanning multiple industries.',
            milestones: [
                '1897: Invented world\'s first lock without keys',
                '1923: Started manufacturing safes and furniture',
                '1958: Launched Godrej Soaps',
                '1990s: Entered real estate and appliances',
                '2020s: Revenue crosses $7 billion'
            ],
            status: 'Today: Diversified conglomerate in real estate, appliances, furniture, security, and consumer goods. Serves 1.2+ billion consumers globally.'
        },
        {
            id: 'dabur',
            name: 'Dabur India',
            year: 1884,
            decade: '1800',
            founder: 'Dr. S.K. Burman',
            industry: 'consumer',
            origin: 'Kolkata, West Bengal',
            description: 'India\'s trusted Ayurvedic brand, making herbal healthcare accessible to the masses.',
            milestones: [
                '1884: Founded as Ayurvedic pharmacy in Kolkata',
                '1896: Launched Chyawanprash, now iconic product',
                '1952: Became public limited company',
                '1994: Initial public offering on stock exchanges',
                '2024: Revenue exceeds ₹10,000 crore'
            ],
            status: 'Today: Leading FMCG company with 500+ Ayurvedic formulations, presence in 120+ countries, and revenue over ₹10,000 crore.'
        },
        {
            id: 'pnb',
            name: 'Punjab National Bank',
            year: 1894,
            decade: '1800',
            founder: 'Lala Lajpat Rai & others',
            industry: 'banking',
            origin: 'Lahore (now Pakistan), relocated to Delhi',
            description: 'India\'s first bank started with solely Indian capital, symbolizing financial independence.',
            milestones: [
                '1894: Founded in Lahore with Indian capital',
                '1947: Relocated to Delhi after Partition',
                '1969: Nationalized by Government of India',
                '2019: Merged with Oriental Bank of Commerce and United Bank',
                '2020: Became India\'s second-largest public sector bank'
            ],
            status: 'Today: One of India\'s largest public sector banks with 11,000+ branches, serving 120+ million customers across India.'
        },
        {
            id: 'raymonds',
            name: 'Raymond Ltd.',
            year: 1925,
            decade: '1920',
            founder: 'Singhania Family',
            industry: 'textiles',
            origin: 'Thane, Maharashtra',
            description: 'India\'s premier woolen mill, shaping formal fashion for generations of Indian men.',
            milestones: [
                '1925: Established woolen mill in Thane',
                '1950s: Became synonymous with quality suiting',
                '1980s: Launched "Raymond - The Complete Man" campaign',
                '2000s: Diversified into readymade garments',
                '2020s: Focus on sustainable luxury'
            ],
            status: 'Today: Leading Indian suiting and readymade garment brand with 800+ exclusive outlets and strong B2B presence.'
        },
        {
            id: 'mtr',
            name: 'MTR Foods',
            year: 1924,
            decade: '1920',
            founder: 'Parameshwara Maiya',
            industry: 'food',
            origin: 'Bengaluru, Karnataka',
            description: 'Pioneers of packaged South Indian foods, preserving traditional recipes for the modern era.',
            milestones: [
                '1924: Started as restaurant in Bengaluru',
                '1950s: Invented Rava Idli during rice shortage',
                '1960s: Started packaging spice mixes',
                '2007: Acquired by Orkla (Norway)',
                '2020s: Exports to 40+ countries'
            ],
            status: 'Today: Leading packaged South Indian foods brand, exporting to 40+ countries. MTR restaurant remains iconic Bengaluru landmark.'
        },
        {
            id: 'himalaya',
            name: 'Himalaya Wellness',
            year: 1930,
            decade: '1920',
            founder: 'M. Manal',
            industry: 'pharmaceutical',
            origin: 'Bengaluru, Karnataka',
            description: 'India\'s leading herbal personal care brand, combining Ayurveda with modern science.',
            milestones: [
                '1930: Founded as Himalaya Drug Company',
                '1934: Launched Liv.52, revolutionary liver supplement',
                '2000: Entered personal care with Face Wash range',
                '2012: Crossed ₹1000 crore revenue',
                '2020: Presence in 100+ countries'
            ],
            status: 'Today: Global herbal personal care leader with 300+ scientists, 1000+ research papers, and products in 100+ countries.'
        },
        {
            id: 'haldirams',
            name: 'Haldiram\'s',
            year: 1937,
            decade: '1920',
            founder: 'Ganga Bishan Agarwal (Haldiram)',
            industry: 'food',
            origin: 'Bikaner, Rajasthan',
            description: 'From a small sweet shop to India\'s largest snack foods empire.',
            milestones: [
                '1937: Started as sweet shop in Bikaner',
                '1950s: Began packaging bhujia for export',
                '1970s: Expanded to Nagpur and Delhi',
                '2000s: Revenue surpasses ₹10,000 crore',
                '2020s: Multiple family branches run separate empires'
            ],
            status: 'Today: India\'s largest snack foods company with combined revenue exceeding ₹10,000 crore across multiple family-run entities.'
        },
        {
            id: 'amul',
            name: 'Amul (GCMMF)',
            year: 1946,
            decade: '1940',
            founder: 'Tribhuvandas Patel & Verghese Kurien',
            industry: 'consumer',
            origin: 'Anand, Gujarat',
            description: 'India\'s milk cooperative revolution, empowering millions of dairy farmers.',
            milestones: [
                '1946: Kaira District Milk Union established',
                '1955: "Amul" brand launched',
                '1965: Operation Flood launched, India\'s White Revolution',
                '1973: GCMMF formed as apex marketing body',
                '2023: Revenue crosses ₹70,000 crore'
            ],
            status: 'Today: World\'s largest vegetarian cheese brand, 3.6 million farmer members, presence in 50+ countries, and revenue over ₹70,000 crore.'
        },
        {
            id: 'wipro',
            name: 'Wipro Limited',
            year: 1945,
            decade: '1940',
            founder: 'M.H. Hasham Premji',
            industry: 'conglomerate',
            origin: 'Mumbai, Maharashtra (later Bengaluru)',
            description: 'From vegetable oil manufacturer to global IT services giant.',
            milestones: [
                '1945: Founded as Western India Vegetable Products',
                '1966: Azim Premji takes over at age 21',
                '1980: Entered IT hardware manufacturing',
                '2000: Listed on NYSE, became IT major',
                '2020: Azim Premji Foundation receives $7.6 billion endowment'
            ],
            status: 'Today: Global IT services company with 250,000+ employees, operations in 60+ countries, and revenue over $11 billion.'
        },
        {
            id: 'bajaj',
            name: 'Bajaj Group',
            year: 1945,
            decade: '1940',
            founder: 'Jamnalal Bajaj',
            industry: 'automotive',
            origin: 'Pune, Maharashtra',
            description: 'India\'s mobility pioneer, from bicycles to world\'s largest three-wheeler manufacturer.',
            milestones: [
                '1945: Bajaj Auto founded',
                '1948: Started manufacturing two-wheelers',
                '1972: Launched iconic Bajaj Chetak scooter',
                '2000s: Became world\'s largest 3-wheeler manufacturer',
                '2020: Launched electric vehicle range'
            ],
            status: 'Today: World\'s #1 three-wheeler manufacturer, #3 motorcycle manufacturer globally. Exports to 70+ countries.'
        },
        {
            id: 'cosco',
            name: 'Cosco Sports',
            year: 1935,
            decade: '1920',
            founder: 'Saini Family',
            industry: 'consumer',
            origin: 'Delhi',
            description: 'India\'s trusted sporting goods brand empowering athletes across generations.',
            milestones: [
                '1935: Founded as sports equipment supplier',
                '1950s: Established manufacturing facilities',
                '1980s: Expanded product range',
                '2000s: Modern branding and retail presence',
                '2020s: E-commerce and export expansion'
            ],
            status: 'Today: Leading Indian sporting goods brand with presence in 500+ retail outlets across 50+ cities.'
        },
        {
            id: 'nivia',
            name: 'Nivia Sports',
            year: 1934,
            decade: '1920',
            founder: 'Saini Family (Freewill Sports)',
            industry: 'consumer',
            origin: 'Jalandhar, Punjab',
            description: 'India\'s premier football manufacturer with FIFA Quality Pro certification.',
            milestones: [
                '1934: Founded as Freewill Sports in Jalandhar',
                '1962: Launched "Nivia" premium brand',
                '1998: Official NFL match ball supplier',
                '2014: Ashtang receives FIFA Quality Pro certification',
                '2017: Official match ball for FIFA U-17 World Cup'
            ],
            status: 'Today: Exports to 70+ countries, official supplier for ISL, I-League, and international tournaments.'
        }
    ];

    let activeDecade = 'all';
    let activeIndustry = 'all';
    let searchTerm = '';

    /**
     * Initialize all interactive features when DOM is ready.
     */
    function init() {
        renderBrands();
        updateStats();
        attachEventListeners();
        setupThemeToggle();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    /**
     * Render brands based on active filters.
     */
    function renderBrands() {
        const container = document.getElementById('brands-timeline');
        const noResults = document.getElementById('no-results');

        if (!container) return;

        const filtered = brandsData.filter(brand => {
            const matchDecade = activeDecade === 'all' || brand.decade === activeDecade;
            const matchIndustry = activeIndustry === 'all' || brand.industry === activeIndustry;
            const matchSearch = searchTerm === '' ||
                brand.name.toLowerCase().includes(searchTerm) ||
                brand.founder.toLowerCase().includes(searchTerm) ||
                brand.industry.toLowerCase().includes(searchTerm) ||
                brand.origin.toLowerCase().includes(searchTerm);

            return matchDecade && matchIndustry && matchSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = '';
            noResults.hidden = false;
            return;
        }

        noResults.hidden = true;

        container.innerHTML = filtered.map(brand => {
            const age = new Date().getFullYear() - brand.year;
            return `
                <article class="brand-card animate-on-scroll" data-brand-id="${brand.id}" role="listitem">
                    <div class="brand-header">
                        <div class="brand-year">${brand.year}</div>
                        <h3 class="brand-name">${brand.name}</h3>
                        <div class="brand-founder">By ${brand.founder}</div>
                    </div>
                    <div class="brand-content">
                        <p>${brand.description}</p>
                    </div>
                    <div class="brand-footer">
                        <span class="brand-industry">${brand.industry}</span>
                        <span class="brand-age">${age} years</span>
                    </div>
                </article>
            `;
        }).join('');

        // Attach click handlers to open modal
        container.querySelectorAll('.brand-card').forEach(card => {
            card.addEventListener('click', () => {
                const brandId = card.dataset.brandId;
                const brand = brandsData.find(b => b.id === brandId);
                if (brand) openBrandModal(brand);
            });

            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const brandId = card.dataset.brandId;
                    const brand = brandsData.find(b => b.id === brandId);
                    if (brand) openBrandModal(brand);
                }
            });
        });

        // Re-observe new elements
        if (window.scrollObserver) {
            container.querySelectorAll('.animate-on-scroll').forEach(el => {
                window.scrollObserver.observe(el);
            });
        }
    }

    /**
     * Open brand detail modal.
     */
    function openBrandModal(brand) {
        const modal = document.getElementById('brand-modal');
        if (!modal) return;

        const age = new Date().getFullYear() - brand.year;

        document.getElementById('modal-badge').textContent = `${brand.year} · ${age} Years`;
        document.getElementById('modal-title').textContent = brand.name;
        document.getElementById('modal-meta').textContent = `${brand.founder} · ${brand.origin}`;
        document.getElementById('modal-founder').textContent = `${brand.name} was founded in ${brand.year} by ${brand.founder} in ${brand.origin}. ${brand.description}`;

        const milestonesList = document.getElementById('modal-milestones');
        milestonesList.innerHTML = brand.milestones.map(m => `<li>${m}</li>`).join('');

        document.getElementById('modal-status').textContent = brand.status;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.getElementById('modal-close').focus();
    }

    /**
     * Close brand detail modal.
     */
    function closeBrandModal() {
        const modal = document.getElementById('brand-modal');
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    /**
     * Update hero statistics based on filtered brands.
     */
    function updateStats() {
        const statTotal = document.getElementById('stat-total');
        const statYears = document.getElementById('stat-years');
        const statIndustries = document.getElementById('stat-industries');

        if (statTotal) statTotal.textContent = brandsData.length;

        if (statYears) {
            const oldest = Math.min(...brandsData.map(b => b.year));
            const age = new Date().getFullYear() - oldest;
            statYears.textContent = `${age}+`;
        }

        if (statIndustries) {
            const unique = new Set(brandsData.map(b => b.industry));
            statIndustries.textContent = unique.size;
        }
    }

    /**
     * Attach event listeners to interactive elements.
     */
    function attachEventListeners() {
        // Decade filters
        document.querySelectorAll('.decade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.decade-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                activeDecade = btn.dataset.decade;
                renderBrands();
            });
        });

        // Industry filter
        const industryFilter = document.getElementById('industry-filter');
        if (industryFilter) {
            industryFilter.addEventListener('change', (e) => {
                activeIndustry = e.target.value;
                renderBrands();
            });
        }

        // Search input
        const searchInput = document.getElementById('brand-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                searchTerm = e.target.value.toLowerCase();
                renderBrands();
            }, 300));
        }

        // Modal close
        const modalClose = document.getElementById('modal-close');
        const modal = document.getElementById('brand-modal');

        if (modalClose) modalClose.addEventListener('click', closeBrandModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeBrandModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeBrandModal();
            }
        });
    }

    /**
     * Debounce helper for search input.
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
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
            window.Journey.registerSearchItems('frontend/oldest-brands-timeline/index.html', [
                {
                    id: 'oldest-brands',
                    title: 'India\'s Oldest Surviving Brands',
                    description: 'Interactive timeline of 150+ years of Indian enterprise.',
                    link: '#'
                }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();

