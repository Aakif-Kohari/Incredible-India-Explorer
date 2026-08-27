// Brands of India — interactive brand explorer
// Issue #2631: Wipro — Explore the Evolution of an Indian Technology Brand
//
// This file keeps the existing Brands of India experience intact while adding
// a richer, data-driven Wipro profile with:
// - transformation milestones
// - business/service evolution
// - global expansion highlights
// - source links
// - interactive timeline controls
// - keyboard accessible details
// - reusable filtering and rendering helpers
//
// The implementation is intentionally dependency-free so it works with the
// existing static frontend and does not require a framework migration.

const brandsData = [
    {
        id: 'tata',
        name: 'Tata Group',
        logoEmoji: '🏢',
        industry: 'Conglomerate',
        year: 1868,
        era: 'pre-1900',
        origin: 'MH',
        originName: 'Mumbai, Maharashtra',
        desc: 'A global conglomerate encompassing salt to software, founded by Jamsetji Tata.',
        link: '#'
    },
    {
        id: 'reliance',
        name: 'Reliance Industries',
        logoEmoji: '🛢️',
        industry: 'Conglomerate',
        year: 1957,
        era: '1948-2000',
        origin: 'MH',
        originName: 'Mumbai, Maharashtra',
        desc: 'A multinational conglomerate company, playing a massive role in energy, retail, and telecom.',
        link: '#'
    },
    {
        id: 'amul',
        name: 'Amul',
        logoEmoji: '🥛',
        industry: 'Food & Beverages',
        year: 1946,
        era: '1900-1947',
        origin: 'GJ',
        originName: 'Anand, Gujarat',
        desc: "An Indian dairy cooperative society that sparked India's White Revolution.",
        link: '#'
    },
    {
        id: 'mahindra',
        name: 'Mahindra & Mahindra',
        logoEmoji: '🚜',
        industry: 'Automotive',
        year: 1945,
        era: '1900-1947',
        origin: 'PB',
        originName: 'Ludhiana, Punjab',
        desc: "One of India's major vehicle manufacturers and a leading tractor manufacturer.",
        link: '#'
    },
    {
        id: 'infosys',
        name: 'Infosys',
        logoEmoji: '💻',
        industry: 'Technology',
        year: 1981,
        era: '1948-2000',
        origin: 'MH',
        originName: 'Pune, Maharashtra',
        desc: 'A global leader in next-generation digital services and consulting.',
        link: '#'
    },
    {
        id: 'wipro',
        name: 'Wipro',
        logoEmoji: '🌻',
        industry: 'Technology',
        year: 1945,
        era: '1900-1947',
        origin: 'MH',
        originName: 'Amalner, Maharashtra',
        desc: 'Started as a vegetable-oil manufacturer and transformed into a global technology and consulting company.',
        link: '#'
    },
    {
        id: 'royal-enfield',
        name: 'Royal Enfield (India)',
        logoEmoji: '🏍️',
        industry: 'Automotive',
        year: 1955,
        era: '1948-2000',
        origin: 'TN',
        originName: 'Chennai, Tamil Nadu',
        desc: 'The oldest global motorcycle brand in continuous production, known for the iconic Bullet.',
        link: '#'
    },
    {
        id: 'parle',
        name: 'Parle Products',
        logoEmoji: '🍪',
        industry: 'FMCG',
        year: 1929,
        era: '1900-1947',
        origin: 'MH',
        originName: 'Mumbai, Maharashtra',
        desc: "Makers of Parle-G, one of India's best-known biscuit brands.",
        link: '#'
    },
    {
        id: 'zee',
        name: 'Zee Entertainment',
        logoEmoji: '📺',
        industry: 'Media & Entertainment',
        year: 1992,
        era: '1948-2000',
        origin: 'MH',
        originName: 'Mumbai, Maharashtra',
        desc: "One of India's pioneering private television entertainment companies.",
        link: '../zee-media-brand/index.html'
    },
    {
        id: 'haldirams',
        name: "Haldiram's",
        logoEmoji: '🥨',
        industry: 'Food & Beverages',
        year: 1937,
        era: '1900-1947',
        origin: 'RJ',
        originName: 'Bikaner, Rajasthan',
        desc: 'A major Indian sweets, snacks, and restaurant company.',
        link: '#'
    },
    {
        id: 'godrej',
        name: 'Godrej Group',
        logoEmoji: '🔐',
        industry: 'Conglomerate',
        year: 1897,
        era: 'pre-1900',
        origin: 'MH',
        originName: 'Mumbai, Maharashtra',
        desc: 'Started with locks and expanded into consumer products, real estate, engineering, and agriculture.',
        link: '#'
    },
    {
        id: 'britannia',
        name: 'Britannia Industries',
        logoEmoji: '🍞',
        industry: 'Food & Beverages',
        year: 1892,
        era: 'pre-1900',
        origin: 'WB',
        originName: 'Kolkata, West Bengal',
        desc: "One of India's oldest existing companies, best known for its biscuit products.",
        link: '#'
    }
];

const wiproProfile = {
    id: 'wipro',
    name: 'Wipro',
    shortName: 'Wipro Limited',
    logo: '🌻',
    founded: 1945,
    origin: 'Amalner, Maharashtra',
    industry: 'Technology & Consulting',
    headline: 'From a vegetable-oil business in Amalner to a global technology and consulting company.',
    overview:
        "Wipro's story is an example of long-term business transformation. The company began in 1945 as Western India Vegetable Products and gradually diversified before building a major technology business.",
    transformationSummary:
        'The transformation was not a single event. It developed through diversification, the emergence of information technology as a core business, international expansion, and a sustained shift toward digital, cloud, engineering, and consulting services.',
    milestones: [
        {
            year: 1945,
            title: 'Western India Vegetable Products begins',
            category: 'Origins',
            description:
                'The company begins operations in Amalner, Maharashtra, initially producing vegetable oils and related consumer products.',
            significance:
                'This establishes the original industrial and consumer-products foundation from which the later technology company grows.'
        },
        {
            year: 1960,
            title: 'Diversification era',
            category: 'Diversification',
            description:
                'The business expands beyond its original product category into additional consumer and industrial activities.',
            significance:
                'Diversification gives the company experience operating across different markets rather than depending on a single product line.'
        },
        {
            year: 1977,
            title: 'Wipro name adopted',
            category: 'Brand Evolution',
            description:
                'The company adopts the Wipro identity, reflecting its increasingly diversified business direction.',
            significance:
                "The new identity becomes the platform for the company's later move into information technology."
        },
        {
            year: 1980,
            title: 'Information technology becomes a strategic focus',
            category: 'Technology',
            description:
                'Wipro enters the Indian computer and information-technology business as the local technology market develops.',
            significance: 'Technology becomes a major growth engine and changes the long-term character of the company.'
        },
        {
            year: 1982,
            title: 'Computer manufacturing and software capabilities expand',
            category: 'Technology',
            description: 'Wipro develops capabilities across computing hardware and software services.',
            significance:
                'The company begins building the technical delivery model that later supports its international services business.'
        },
        {
            year: 1990,
            title: 'International technology delivery grows',
            category: 'Global Expansion',
            description:
                'Wipro increasingly serves international customers and builds the operational base needed for cross-border technology delivery.',
            significance:
                'The business begins moving from an India-focused technology operation toward a global services model.'
        },
        {
            year: 1999,
            title: 'Technology services scale internationally',
            category: 'Global Expansion',
            description:
                'The technology business continues expanding its international customer base and delivery capabilities.',
            significance: "International services become central to Wipro's growth strategy."
        },
        {
            year: 2000,
            title: 'Global technology identity strengthens',
            category: 'Transformation',
            description:
                'Wipro enters the new millennium with technology and information services at the centre of its corporate identity.',
            significance:
                'The company is now recognisable primarily as a technology services business rather than its original consumer-products operation.'
        },
        {
            year: 2004,
            title: 'Milestone as a global technology company',
            category: 'Global Expansion',
            description:
                'Wipro continues increasing its international presence and scale across enterprise technology services.',
            significance: "The global delivery model becomes a defining feature of Wipro's business."
        },
        {
            year: 2010,
            title: 'Cloud and digital capabilities accelerate',
            category: 'Digital',
            description:
                'The company broadens its portfolio as cloud computing, analytics, mobility, and digital transformation become increasingly important.',
            significance:
                'Wipro shifts from traditional application and infrastructure services toward higher-value transformation work.'
        },
        {
            year: 2015,
            title: 'Digital transformation becomes core',
            category: 'Digital',
            description:
                'Wipro expands its digital, engineering, cybersecurity, cloud, analytics, and consulting capabilities.',
            significance:
                'The service portfolio becomes more aligned with the technology priorities of global enterprises.'
        },
        {
            year: 2020,
            title: 'Cloud-first enterprise transformation',
            category: 'Modern Era',
            description:
                'Wipro strengthens cloud, cybersecurity, engineering, data, and digital capabilities to support changing enterprise requirements.',
            significance:
                'The company increasingly positions itself as a transformation partner rather than only an outsourcing provider.'
        },
        {
            year: 2021,
            title: 'New leadership and refreshed growth strategy',
            category: 'Modern Era',
            description:
                'A refreshed corporate strategy focuses on stronger client relationships, growth, talent, and technology-led transformation.',
            significance:
                "The strategy reinforces Wipro's positioning as a global technology services and consulting company."
        },
        {
            year: 2022,
            title: 'Engineering, cloud and consulting portfolio expands',
            category: 'Services',
            description:
                'Wipro continues investing in engineering, cloud, cybersecurity, data, AI, and consulting capabilities.',
            significance:
                'The portfolio reflects the increasingly integrated nature of modern enterprise technology programmes.'
        },
        {
            year: 2023,
            title: 'AI and automation become strategic themes',
            category: 'AI',
            description:
                'Generative AI, automation, data platforms, and intelligent enterprise services become increasingly important areas of technology investment.',
            significance: "AI becomes part of the next phase of Wipro's digital transformation proposition."
        },
        {
            year: 2024,
            title: 'AI-led transformation emphasis',
            category: 'AI',
            description:
                'Wipro continues expanding AI, cloud, cybersecurity, engineering, and consulting offerings for global clients.',
            significance:
                'The modern business model connects consulting, engineering, cloud and AI rather than treating them as isolated services.'
        },
        {
            year: 2025,
            title: 'Global technology and consulting platform',
            category: 'Modern Era',
            description:
                'Wipro continues operating as a global technology services and consulting organisation serving enterprises across regions and industries.',
            significance:
                'The transformation from its 1945 origins to a global technology company is now firmly established.'
        }
    ],
    serviceGroups: [
        {
            name: 'Consulting',
            icon: '🧭',
            description:
                'Business and technology consulting that helps organisations define transformation priorities and operating models.',
            examples: [
                'Business transformation',
                'Technology strategy',
                'Operating model design',
                'Industry consulting'
            ]
        },
        {
            name: 'Cloud',
            icon: '☁️',
            description:
                'Cloud transformation, migration, modernisation and managed services for enterprise environments.',
            examples: ['Cloud migration', 'Cloud modernisation', 'Hybrid cloud', 'Cloud operations']
        },
        {
            name: 'Data & AI',
            icon: '🧠',
            description:
                'Data engineering, analytics, artificial intelligence and automation capabilities for enterprise use cases.',
            examples: ['Data platforms', 'Analytics', 'Generative AI', 'Intelligent automation']
        },
        {
            name: 'Cybersecurity',
            icon: '🛡️',
            description:
                'Security strategy, risk management, identity, threat detection and managed cybersecurity services.',
            examples: ['Security operations', 'Identity', 'Risk management', 'Threat protection']
        },
        {
            name: 'Engineering',
            icon: '⚙️',
            description:
                'Digital engineering and product development capabilities supporting connected and software-defined businesses.',
            examples: ['Product engineering', 'Application engineering', 'Embedded systems', 'Quality engineering']
        },
        {
            name: 'Business Process Services',
            icon: '🔄',
            description: 'Technology-enabled business process and operations services supporting enterprise functions.',
            examples: ['Operations', 'Process transformation', 'Automation', 'Managed services']
        }
    ],
    globalRegions: [
        {
            region: 'North America',
            focus: 'Major enterprise technology and consulting market',
            detail: 'Wipro serves organisations across the United States and Canada through consulting, technology delivery, engineering, cloud, data and managed services.'
        },
        {
            region: 'Europe',
            focus: 'Technology transformation and regulated industries',
            detail: 'European operations support enterprises across industries with cloud, cybersecurity, engineering, consulting and digital services.'
        },
        {
            region: 'Asia Pacific',
            focus: 'Digital growth and regional delivery',
            detail: "The region contributes to Wipro's international customer base and technology delivery network."
        },
        {
            region: 'Middle East & Africa',
            focus: 'Enterprise modernization',
            detail: 'Wipro supports organisations pursuing technology modernisation and digital transformation across the region.'
        },
        {
            region: 'India',
            focus: 'Origins, talent and delivery',
            detail: "India remains central to Wipro's history, talent ecosystem, technology delivery and corporate identity."
        }
    ],
    transformationStages: [
        {
            label: '1945–1976',
            title: 'Consumer and industrial foundation',
            description: 'Wipro begins with vegetable oils and gradually diversifies into other businesses.',
            metric: 'Diversification'
        },
        {
            label: '1977–1989',
            title: 'Brand and technology transition',
            description: 'The Wipro identity emerges while information technology becomes a strategic growth area.',
            metric: 'Technology'
        },
        {
            label: '1990–2009',
            title: 'Global services scale',
            description:
                'International customers and technology services become increasingly important to the business.',
            metric: 'Globalisation'
        },
        {
            label: '2010–2019',
            title: 'Digital transformation',
            description:
                'Cloud, analytics, mobility, engineering and digital services broaden the technology portfolio.',
            metric: 'Digital'
        },
        {
            label: '2020–present',
            title: 'AI-led technology and consulting',
            description:
                'AI, cloud, cybersecurity, data, engineering and consulting converge into a modern enterprise transformation proposition.',
            metric: 'AI + Cloud'
        }
    ],
    sources: [
        {
            title: 'Wipro — About Us',
            url: 'https://www.wipro.com/about-us/',
            type: 'Official'
        },
        {
            title: 'Wipro — Our History',
            url: 'https://www.wipro.com/about-us/our-history/',
            type: 'Official'
        },
        {
            title: 'Wipro — Services',
            url: 'https://www.wipro.com/services/',
            type: 'Official'
        },
        {
            title: 'Wipro — Investor Relations',
            url: 'https://www.wipro.com/investors/',
            type: 'Official'
        }
    ]
};

const stateNames = {
    AP: 'Andhra Pradesh',
    AR: 'Arunachal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CG: 'Chhattisgarh',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OD: 'Odisha',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TS: 'Telangana',
    TR: 'Tripura',
    UP: 'Uttar Pradesh',
    UK: 'Uttarakhand',
    WB: 'West Bengal',
    JK: 'Jammu & Kashmir',
    LA: 'Ladakh',
    DL: 'Delhi',
    PY: 'Puducherry'
};

const categoryOrder = [
    'Origins',
    'Diversification',
    'Brand Evolution',
    'Technology',
    'Global Expansion',
    'Transformation',
    'Digital',
    'Services',
    'Modern Era',
    'AI'
];

const dom = {};

function cacheDom() {
    dom.grid = document.getElementById('brands-grid');
    dom.noResults = document.getElementById('no-results');
    dom.searchInput = document.getElementById('brand-search');
    dom.industryFilter = document.getElementById('industry-filter');
    dom.yearFilter = document.getElementById('year-filter');
    dom.mapWrapper = document.getElementById('india-map-wrapper');
    dom.resetMapBtn = document.getElementById('reset-map-btn');
    dom.timelineContainer = document.getElementById('brands-timeline');
}

const state = {
    activeStateFilter: null,
    selectedBrandId: null,
    selectedCategory: 'all',
    timelineIndex: 0
};

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function normalise(value) {
    return String(value || '')
        .trim()
        .toLowerCase();
}

function getEraForYear(year) {
    if (year < 1900) return 'pre-1900';
    if (year <= 1947) return '1900-1947';
    if (year <= 2000) return '1948-2000';
    return 'post-2000';
}

function getBrandById(id) {
    return brandsData.find(brand => brand.id === id) || null;
}

function getWiproMilestones(category = 'all') {
    if (category === 'all') return wiproProfile.milestones;
    return wiproProfile.milestones.filter(item => item.category === category);
}

function createBrandCard(brand) {
    const isWipro = brand.id === 'wipro';
    const stateLabel = stateNames[brand.origin] || brand.originName;

    return `
    <article class="brand-card${isWipro ? ' brand-card--featured' : ''}" data-brand-id="${escapeHtml(brand.id)}">
      <div class="brand-logo-container" aria-hidden="true">
        ${escapeHtml(brand.logoEmoji)}
      </div>
      <div class="brand-info">
        <h3 class="brand-name">${escapeHtml(brand.name)}</h3>
        <div class="brand-meta">
          <span title="Industry">${escapeHtml(brand.industry)}</span>
          <span title="Founded Year">${escapeHtml(brand.year)}</span>
          <span title="Origin">${escapeHtml(stateLabel)}</span>
        </div>
        <p class="brand-desc">${escapeHtml(brand.desc)}</p>
        ${
            isWipro
                ? `<button type="button" class="brand-explore wipro-explore-btn" data-wipro-action="open">Explore Wipro's transformation</button>`
                : `<a href="${escapeHtml(brand.link)}" class="brand-explore">Explore</a>`
        }
      </div>
    </article>
  `;
}

function renderBrands(brands) {
    if (!dom.grid || !dom.noResults) return;

    dom.grid.innerHTML = brands.map(createBrandCard).join('');
    dom.noResults.classList.toggle('hidden', brands.length !== 0);

    const wiproButton = dom.grid.querySelector("[data-wipro-action='open']");
    if (wiproButton) {
        wiproButton.addEventListener('click', () => openWiproProfile());
    }

    dom.grid.querySelectorAll('.brand-card').forEach(card => {
        card.addEventListener('keydown', handleCardKeyboard);
    });
}

function matchesSearch(brand, searchTerm) {
    if (!searchTerm) return true;

    const haystack = [brand.name, brand.industry, brand.originName, brand.desc, String(brand.year)]
        .join(' ')
        .toLowerCase();

    return haystack.includes(searchTerm);
}

function filterBrands() {
    const searchTerm = normalise(dom.searchInput?.value);
    const industry = dom.industryFilter?.value || 'all';
    const era = dom.yearFilter?.value || 'all';

    const filtered = brandsData.filter(brand => {
        const searchMatches = matchesSearch(brand, searchTerm);
        const industryMatches = industry === 'all' || brand.industry === industry;
        const eraMatches = era === 'all' || brand.era === era;
        const stateMatches = !state.activeStateFilter || brand.origin === state.activeStateFilter;

        return searchMatches && industryMatches && eraMatches && stateMatches;
    });

    renderBrands(filtered);
    updateFilterSummary(filtered);
}

function updateFilterSummary(filtered) {
    const existing = document.getElementById('brand-filter-summary');
    if (!existing) return;

    const stateText = state.activeStateFilter
        ? ` · ${escapeHtml(stateNames[state.activeStateFilter] || state.activeStateFilter)}`
        : '';

    existing.textContent = `${filtered.length} brand${filtered.length === 1 ? '' : 's'} shown${stateText}`;
}

function createFilterSummary() {
    if (!dom.grid?.parentElement) return;

    const wrapper = dom.grid.parentElement;
    let summary = document.getElementById('brand-filter-summary');

    if (!summary) {
        summary = document.createElement('p');
        summary.id = 'brand-filter-summary';
        summary.className = 'brand-filter-summary';
        summary.setAttribute('aria-live', 'polite');
        wrapper.insertBefore(summary, dom.grid);
    }
}

function initMap() {
    if (!dom.mapWrapper || typeof indiaMapSvg === 'undefined') return;

    dom.mapWrapper.innerHTML = indiaMapSvg;
    const paths = dom.mapWrapper.querySelectorAll('path');

    paths.forEach(path => {
        const code = path.getAttribute('id') || '';
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');

        title.textContent = stateNames[code] || code || 'Indian state';
        path.appendChild(title);

        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', `Filter brands from ${stateNames[code] || code}`);

        const activate = () => selectMapState(code, path);
        path.addEventListener('click', activate);
        path.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                activate();
            }
        });
    });
}

function selectMapState(code, path) {
    if (!code) return;

    const paths = dom.mapWrapper.querySelectorAll('path');
    paths.forEach(item => item.classList.remove('active'));

    if (state.activeStateFilter === code) {
        state.activeStateFilter = null;
        if (dom.resetMapBtn) dom.resetMapBtn.style.display = 'none';
    } else {
        state.activeStateFilter = code;
        path.classList.add('active');
        if (dom.resetMapBtn) dom.resetMapBtn.style.display = 'inline-block';
    }

    filterBrands();
}

function resetMapFilter() {
    state.activeStateFilter = null;

    dom.mapWrapper?.querySelectorAll('path').forEach(path => path.classList.remove('active'));

    if (dom.resetMapBtn) dom.resetMapBtn.style.display = 'none';
    filterBrands();
}

function createTimelineItem(brand) {
    return `
    <button
      type="button"
      class="timeline-item"
      data-brand-id="${escapeHtml(brand.id)}"
      aria-label="Open ${escapeHtml(brand.name)} profile"
    >
      <span class="timeline-year">${escapeHtml(brand.year)}</span>
      <span class="timeline-content">
        <span class="timeline-name">${escapeHtml(brand.name)} ${escapeHtml(brand.logoEmoji)}</span>
        <span class="timeline-desc">Founded in ${escapeHtml(brand.originName)}</span>
      </span>
    </button>
  `;
}

function renderTimeline() {
    if (!dom.timelineContainer) return;

    const sortedBrands = [...brandsData].sort((a, b) => a.year - b.year);
    dom.timelineContainer.innerHTML = sortedBrands.map(createTimelineItem).join('');

    dom.timelineContainer.querySelectorAll('[data-brand-id]').forEach(item => {
        item.addEventListener('click', () => {
            const brandId = item.getAttribute('data-brand-id');
            if (brandId === 'wipro') {
                openWiproProfile();
            }
        });
    });
}

function createModalShell() {
    const existing = document.getElementById('wipro-profile-modal');
    if (existing) return existing;

    const modal = document.createElement('div');
    modal.id = 'wipro-profile-modal';
    modal.className = 'wipro-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'wipro-modal-title');
    modal.hidden = true;

    modal.innerHTML = `
    <div class="wipro-modal__backdrop" data-wipro-action="close"></div>
    <div class="wipro-modal__dialog" tabindex="-1">
      <button type="button" class="wipro-modal__close" data-wipro-action="close" aria-label="Close Wipro profile">×</button>
      <div id="wipro-modal-content"></div>
    </div>
  `;

    document.body.appendChild(modal);

    modal.querySelectorAll("[data-wipro-action='close']").forEach(element => {
        element.addEventListener('click', closeWiproProfile);
    });

    return modal;
}

function renderWiproModalContent() {
    const content = document.getElementById('wipro-modal-content');
    if (!content) return;

    content.innerHTML = `
    <header class="wipro-hero">
      <div class="wipro-hero__icon" aria-hidden="true">${wiproProfile.logo}</div>
      <div>
        <p class="wipro-eyebrow">Indian Brand Evolution</p>
        <h2 id="wipro-modal-title">${escapeHtml(wiproProfile.name)}</h2>
        <p class="wipro-hero__headline">${escapeHtml(wiproProfile.headline)}</p>
      </div>
    </header>

    <nav class="wipro-tabs" aria-label="Wipro profile sections">
      <button type="button" class="wipro-tab is-active" data-wipro-tab="overview">Overview</button>
      <button type="button" class="wipro-tab" data-wipro-tab="timeline">Timeline</button>
      <button type="button" class="wipro-tab" data-wipro-tab="services">Services</button>
      <button type="button" class="wipro-tab" data-wipro-tab="global">Global Expansion</button>
      <button type="button" class="wipro-tab" data-wipro-tab="sources">Sources</button>
    </nav>

    <div class="wipro-panel" data-wipro-panel="overview">
      ${renderOverviewPanel()}
    </div>
    <div class="wipro-panel" data-wipro-panel="timeline" hidden>
      ${renderTimelinePanel()}
    </div>
    <div class="wipro-panel" data-wipro-panel="services" hidden>
      ${renderServicesPanel()}
    </div>
    <div class="wipro-panel" data-wipro-panel="global" hidden>
      ${renderGlobalPanel()}
    </div>
    <div class="wipro-panel" data-wipro-panel="sources" hidden>
      ${renderSourcesPanel()}
    </div>
  `;

    bindWiproTabs();
    bindMilestoneControls();
}

function renderOverviewPanel() {
    const stages = wiproProfile.transformationStages
        .map(
            (stage, index) => `
        <article class="wipro-stage" data-stage-index="${index}">
          <span class="wipro-stage__label">${escapeHtml(stage.label)}</span>
          <h3>${escapeHtml(stage.title)}</h3>
          <p>${escapeHtml(stage.description)}</p>
          <strong>${escapeHtml(stage.metric)}</strong>
        </article>
      `
        )
        .join('');

    return `
    <section class="wipro-section">
      <div class="wipro-section__heading">
        <p class="wipro-kicker">The transformation</p>
        <h3>From consumer products to global technology</h3>
      </div>
      <p>${escapeHtml(wiproProfile.overview)}</p>
      <p>${escapeHtml(wiproProfile.transformationSummary)}</p>
    </section>

    <section class="wipro-section">
      <div class="wipro-section__heading">
        <p class="wipro-kicker">Transformation map</p>
        <h3>Five stages of Wipro's evolution</h3>
      </div>
      <div class="wipro-stages">${stages}</div>
    </section>

    <section class="wipro-stat-grid" aria-label="Wipro profile facts">
      <div class="wipro-stat">
        <span>Founded</span>
        <strong>${wiproProfile.founded}</strong>
      </div>
      <div class="wipro-stat">
        <span>Origin</span>
        <strong>Amalner</strong>
      </div>
      <div class="wipro-stat">
        <span>Original sector</span>
        <strong>Vegetable oils</strong>
      </div>
      <div class="wipro-stat">
        <span>Modern focus</span>
        <strong>Technology & consulting</strong>
      </div>
    </section>
  `;
}

function renderTimelinePanel() {
    const categories = categoryOrder
        .filter(category => wiproProfile.milestones.some(item => item.category === category))
        .map(
            category => `
        <option value="${escapeHtml(category)}">${escapeHtml(category)}</option>
      `
        )
        .join('');

    return `
    <section class="wipro-section">
      <div class="wipro-section__heading">
        <p class="wipro-kicker">Major milestones</p>
        <h3>Wipro's transformation timeline</h3>
      </div>

      <div class="wipro-timeline-controls">
        <label for="wipro-category-filter">Filter by phase</label>
        <select id="wipro-category-filter">
          <option value="all">All phases</option>
          ${categories}
        </select>
      </div>

      <div class="wipro-milestones" id="wipro-milestones">
        ${renderMilestones('all')}
      </div>
    </section>
  `;
}

function renderMilestones(category) {
    const milestones = getWiproMilestones(category);

    return milestones
        .map(
            (item, index) => `
        <article class="wipro-milestone" data-milestone-index="${index}">
          <div class="wipro-milestone__year">${escapeHtml(item.year)}</div>
          <div class="wipro-milestone__body">
            <span class="wipro-milestone__category">${escapeHtml(item.category)}</span>
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.description)}</p>
            <div class="wipro-milestone__significance">
              <strong>Why it matters:</strong>
              <span>${escapeHtml(item.significance)}</span>
            </div>
          </div>
        </article>
      `
        )
        .join('');
}

function renderServicesPanel() {
    const cards = wiproProfile.serviceGroups
        .map(
            service => `
        <article class="wipro-service-card">
          <div class="wipro-service-card__icon" aria-hidden="true">${escapeHtml(service.icon)}</div>
          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.description)}</p>
          <ul>
            ${service.examples.map(example => `<li>${escapeHtml(example)}</li>`).join('')}
          </ul>
        </article>
      `
        )
        .join('');

    return `
    <section class="wipro-section">
      <div class="wipro-section__heading">
        <p class="wipro-kicker">What Wipro does today</p>
        <h3>Technology, consulting and transformation services</h3>
      </div>
      <p>
        Wipro's modern portfolio connects consulting with technology delivery,
        engineering, cloud, data, AI, cybersecurity and managed services.
      </p>
      <div class="wipro-service-grid">${cards}</div>
    </section>
  `;
}

function renderGlobalPanel() {
    const regions = wiproProfile.globalRegions
        .map(
            region => `
        <article class="wipro-region-card">
          <h3>${escapeHtml(region.region)}</h3>
          <p class="wipro-region-card__focus">${escapeHtml(region.focus)}</p>
          <p>${escapeHtml(region.detail)}</p>
        </article>
      `
        )
        .join('');

    return `
    <section class="wipro-section">
      <div class="wipro-section__heading">
        <p class="wipro-kicker">Global expansion</p>
        <h3>From an Indian origin to a worldwide delivery network</h3>
      </div>
      <p>
        International technology services became a central part of Wipro's
        evolution. The company now serves enterprises across multiple regions,
        combining global delivery with local market capabilities.
      </p>
      <div class="wipro-region-grid">${regions}</div>
    </section>
  `;
}

function renderSourcesPanel() {
    const sources = wiproProfile.sources
        .map(
            source => `
        <li class="wipro-source">
          <span class="wipro-source__type">${escapeHtml(source.type)}</span>
          <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(source.title)}
          </a>
        </li>
      `
        )
        .join('');

    return `
    <section class="wipro-section">
      <div class="wipro-section__heading">
        <p class="wipro-kicker">References</p>
        <h3>Sources for the Wipro profile</h3>
      </div>
      <p>
        The profile is designed as an educational overview. Use the linked
        sources for authoritative corporate information and current service details.
      </p>
      <ul class="wipro-sources">${sources}</ul>
    </section>
  `;
}

function bindWiproTabs() {
    const modal = document.getElementById('wipro-profile-modal');
    if (!modal) return;

    const tabs = modal.querySelectorAll('[data-wipro-tab]');
    const panels = modal.querySelectorAll('[data-wipro-panel]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-wipro-tab');

            tabs.forEach(item => {
                const active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', String(active));
            });

            panels.forEach(panel => {
                panel.hidden = panel.getAttribute('data-wipro-panel') !== target;
            });

            if (target === 'timeline') {
                bindMilestoneControls();
            }
        });
    });

    tabs.forEach(tab => {
        tab.setAttribute('aria-selected', String(tab.classList.contains('is-active')));
    });
}

function bindMilestoneControls() {
    const filter = document.getElementById('wipro-category-filter');
    const list = document.getElementById('wipro-milestones');

    if (!filter || !list) return;
    if (filter.dataset.bound === 'true') return;

    filter.dataset.bound = 'true';
    filter.addEventListener('change', () => {
        list.innerHTML = renderMilestones(filter.value);
    });
}

function ensureWiproStyles() {
    if (document.getElementById('wipro-profile-styles')) return;

    const style = document.createElement('style');
    style.id = 'wipro-profile-styles';
    style.textContent = `
    .brand-card--featured {
      border: 1px solid rgba(255, 193, 7, 0.35);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    .brand-explore.wipro-explore-btn {
      border: 0;
      cursor: pointer;
      font: inherit;
    }

    .brand-filter-summary {
      margin: 0 0 0.75rem;
      opacity: 0.72;
      font-size: 0.9rem;
    }

    .wipro-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      padding: 1rem;
    }

    .wipro-modal[hidden] {
      display: none;
    }

    .wipro-modal__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(4, 8, 18, 0.78);
      backdrop-filter: blur(6px);
    }

    .wipro-modal__dialog {
      position: relative;
      width: min(1120px, 96vw);
      max-height: 92vh;
      overflow: auto;
      border-radius: 22px;
      padding: 1.25rem;
      background: var(--surface, #111827);
      color: var(--text, #f8fafc);
      box-shadow: 0 28px 90px rgba(0, 0, 0, 0.4);
    }

    .wipro-modal__close {
      position: sticky;
      float: right;
      top: 0;
      z-index: 2;
      width: 2.5rem;
      height: 2.5rem;
      border: 0;
      border-radius: 999px;
      cursor: pointer;
      font-size: 1.5rem;
      background: rgba(127, 127, 127, 0.16);
      color: inherit;
    }

    .wipro-hero {
      display: flex;
      gap: 1rem;
      align-items: center;
      padding: 1rem 3rem 1.5rem 0.5rem;
    }

    .wipro-hero__icon {
      display: grid;
      width: 4.5rem;
      height: 4.5rem;
      flex: 0 0 auto;
      place-items: center;
      border-radius: 18px;
      font-size: 2.5rem;
      background: linear-gradient(135deg, rgba(255, 193, 7, 0.24), rgba(255, 255, 255, 0.06));
    }

    .wipro-eyebrow,
    .wipro-kicker {
      margin: 0 0 0.35rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.72rem;
      font-weight: 700;
      opacity: 0.68;
    }

    .wipro-hero h2 {
      margin: 0;
      font-size: clamp(1.8rem, 4vw, 3rem);
    }

    .wipro-hero__headline {
      max-width: 760px;
      margin: 0.5rem 0 0;
      line-height: 1.6;
      opacity: 0.82;
    }

    .wipro-tabs {
      display: flex;
      gap: 0.4rem;
      overflow-x: auto;
      margin: 0 0 1.25rem;
      padding: 0.3rem;
      border-radius: 14px;
      background: rgba(127, 127, 127, 0.1);
    }

    .wipro-tab {
      flex: 0 0 auto;
      border: 0;
      border-radius: 10px;
      padding: 0.65rem 0.9rem;
      cursor: pointer;
      background: transparent;
      color: inherit;
      opacity: 0.7;
    }

    .wipro-tab.is-active {
      opacity: 1;
      background: rgba(255, 193, 7, 0.18);
    }

    .wipro-section {
      margin-bottom: 1.5rem;
    }

    .wipro-section__heading h3 {
      margin: 0 0 0.75rem;
      font-size: 1.35rem;
    }

    .wipro-section p {
      line-height: 1.7;
    }

    .wipro-stages,
    .wipro-service-grid,
    .wipro-region-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.8rem;
    }

    .wipro-stage,
    .wipro-service-card,
    .wipro-region-card,
    .wipro-stat {
      padding: 1rem;
      border: 1px solid rgba(127, 127, 127, 0.2);
      border-radius: 16px;
      background: rgba(127, 127, 127, 0.07);
    }

    .wipro-stage__label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 700;
      opacity: 0.65;
    }

    .wipro-stage h3,
    .wipro-service-card h3,
    .wipro-region-card h3 {
      margin: 0 0 0.5rem;
    }

    .wipro-stage strong {
      font-size: 0.78rem;
      opacity: 0.7;
    }

    .wipro-stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 0.75rem;
    }

    .wipro-stat span,
    .wipro-stat strong {
      display: block;
    }

    .wipro-stat span {
      margin-bottom: 0.3rem;
      font-size: 0.8rem;
      opacity: 0.65;
    }

    .wipro-stat strong {
      line-height: 1.35;
    }

    .wipro-timeline-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .wipro-timeline-controls select {
      border: 1px solid rgba(127, 127, 127, 0.3);
      border-radius: 10px;
      padding: 0.55rem 0.7rem;
      background: inherit;
      color: inherit;
    }

    .wipro-milestones {
      display: grid;
      gap: 0.8rem;
    }

    .wipro-milestone {
      display: grid;
      grid-template-columns: 90px 1fr;
      gap: 1rem;
      padding: 1rem;
      border-left: 3px solid rgba(255, 193, 7, 0.65);
      border-radius: 0 14px 14px 0;
      background: rgba(127, 127, 127, 0.07);
    }

    .wipro-milestone__year {
      font-size: 1.2rem;
      font-weight: 800;
    }

    .wipro-milestone__category,
    .wipro-region-card__focus {
      display: inline-block;
      margin-bottom: 0.35rem;
      font-size: 0.75rem;
      font-weight: 700;
      opacity: 0.65;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .wipro-milestone h4 {
      margin: 0 0 0.4rem;
      font-size: 1.05rem;
    }

    .wipro-milestone__significance {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
      margin-top: 0.65rem;
      font-size: 0.9rem;
      opacity: 0.78;
    }

    .wipro-service-card__icon {
      margin-bottom: 0.5rem;
      font-size: 1.7rem;
    }

    .wipro-service-card ul {
      margin: 0.8rem 0 0;
      padding-left: 1.1rem;
      line-height: 1.7;
    }

    .wipro-region-card__focus {
      color: inherit;
    }

    .wipro-sources {
      display: grid;
      gap: 0.65rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .wipro-source {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      padding: 0.8rem;
      border-radius: 12px;
      background: rgba(127, 127, 127, 0.07);
    }

    .wipro-source__type {
      flex: 0 0 auto;
      padding: 0.2rem 0.45rem;
      border-radius: 999px;
      font-size: 0.68rem;
      font-weight: 800;
      background: rgba(255, 193, 7, 0.18);
    }

    .wipro-source a {
      overflow-wrap: anywhere;
    }

    @media (max-width: 640px) {
      .wipro-modal {
        padding: 0;
      }

      .wipro-modal__dialog {
        width: 100%;
        max-height: 100vh;
        border-radius: 0;
      }

      .wipro-hero {
        align-items: flex-start;
      }

      .wipro-milestone {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      .wipro-source {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `;

    document.head.appendChild(style);
}

function openWiproProfile() {
    ensureWiproStyles();

    const modal = createModalShell();
    renderWiproModalContent();

    modal.hidden = false;
    state.selectedBrandId = 'wipro';
    document.body.style.overflow = 'hidden';

    const dialog = modal.querySelector('.wipro-modal__dialog');
    dialog?.focus();
}

function closeWiproProfile() {
    const modal = document.getElementById('wipro-profile-modal');
    if (!modal) return;

    modal.hidden = true;
    state.selectedBrandId = null;
    document.body.style.overflow = '';
}

function handleCardKeyboard(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const brandId = event.currentTarget.getAttribute('data-brand-id');
    if (brandId === 'wipro') {
        event.preventDefault();
        openWiproProfile();
    }
}

function handleGlobalKeyboard(event) {
    const modal = document.getElementById('wipro-profile-modal');
    if (!modal || modal.hidden) return;

    if (event.key === 'Escape') {
        closeWiproProfile();
        return;
    }

    if (event.key !== 'Tab') return;

    const focusable = modal.querySelectorAll("button, a, select, input, [tabindex]:not([tabindex='-1'])");

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function bindEvents() {
    dom.searchInput?.addEventListener('input', filterBrands);
    dom.industryFilter?.addEventListener('change', filterBrands);
    dom.yearFilter?.addEventListener('change', filterBrands);
    dom.resetMapBtn?.addEventListener('click', resetMapFilter);
    document.addEventListener('keydown', handleGlobalKeyboard);
}

function initialiseBrandExplorer() {
    cacheDom();
    createFilterSummary();
    ensureWiproStyles();
    initMap();
    bindEvents();
    renderBrands(brandsData);
    renderTimeline();
    updateFilterSummary(brandsData);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseBrandExplorer);
} else {
    initialiseBrandExplorer();
}
