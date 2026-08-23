/* script.js */

/*
 * SERVICES DATA
 * Add a new Antyodaya Express service here to have it appear automatically
 * in both the route/service cards and the "Routes & Destinations" list.
 * Required fields: name, origin, destination, majorStations (array), regions (array), description.
 */
const antyodayaServices = [
    {
        name: "Ernakulam–Howrah Antyodaya Express",
        origin: "Ernakulam Junction",
        destination: "Howrah Junction",
        majorStations: ["Coimbatore", "Chennai", "Vijayawada", "Bhubaneswar"],
        regions: ["Kerala", "Tamil Nadu", "Andhra Pradesh", "Odisha", "West Bengal"],
        description: "India's first Antyodaya Express service, flagged off in 2016, connecting Kerala to eastern India on a fully unreserved, high-capacity rake."
    },
    {
        name: "Yesvantpur–Garib Nath Antyodaya Express",
        origin: "Yesvantpur (Bengaluru)",
        destination: "Garib Nath (Darbhanga)",
        majorStations: ["Guntakal", "Nagpur", "Varanasi", "Patna"],
        regions: ["Karnataka", "Andhra Pradesh", "Maharashtra", "Uttar Pradesh", "Bihar"],
        description: "Connects Bengaluru, a major destination for migrant workers, directly with Darbhanga in Bihar, a key source region."
    },
    {
        name: "Lokmanya Tilak Terminus–Gorakhpur Antyodaya Express",
        origin: "Lokmanya Tilak Terminus (Mumbai)",
        destination: "Gorakhpur",
        majorStations: ["Bhusaval", "Jabalpur", "Lucknow"],
        regions: ["Maharashtra", "Madhya Pradesh", "Uttar Pradesh"],
        description: "Links Mumbai's industrial workforce with eastern Uttar Pradesh, one of the country's largest source regions for long-distance migrant travel."
    },
    {
        name: "Anand Vihar–Bhagalpur Antyodaya Express",
        origin: "Anand Vihar Terminal (Delhi)",
        destination: "Bhagalpur",
        majorStations: ["Kanpur", "Lucknow", "Chhapra"],
        regions: ["Delhi", "Uttar Pradesh", "Bihar"],
        description: "A fully unreserved superfast link between the national capital and eastern Bihar, serving one of India's busiest labour-migration corridors."
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Introduced", value: "2016" },
        { label: "Service Type", value: "Superfast, Unreserved" },
        { label: "Coach Class", value: "High-Capacity General" },
        { label: "First Route", value: "Ernakulam – Howrah" }
    ];

    const factsContainer = document.getElementById('quick-facts-container');
    if (factsContainer) {
        quickFacts.forEach(fact => {
            const el = document.createElement('div');
            el.className = 'fact-card';
            el.innerHTML = `
                <div class="fact-label">${fact.label}</div>
                <div class="fact-value">${fact.value}</div>
            `;
            factsContainer.appendChild(el);
        });
    }

    // 2. Timeline Data
    const history = [
        {
            year: "2016",
            title: "Concept Announced",
            description: "Antyodaya Express was announced in the Railway Budget 2016–17 by Railway Minister Suresh Prabhu, aimed at providing safe, high-capacity unreserved travel."
        },
        {
            year: "2016",
            title: "Inaugural Run",
            description: "The first Antyodaya Express was flagged off between Ernakulam Junction in Kerala and Howrah Junction in West Bengal."
        },
        {
            year: "2016–2018",
            title: "Network Expansion",
            description: "New Antyodaya services were introduced on other high-demand unreserved corridors, connecting major employment hubs with migrant-labour source regions."
        },
        {
            year: "Present",
            title: "Ongoing Service",
            description: "Antyodaya Express services continue to operate on select long-distance routes, offering a dedicated high-capacity unreserved alternative to standard general coaches."
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        history.forEach(item => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            timelineContainer.appendChild(el);
        });
    }

    // Timeline Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

    // 3. Train Design Features
    const features = [
        {
            title: "High-Capacity Coaches",
            description: "Every coach is a purpose-built, high-capacity unreserved (General) coach, seating and accommodating significantly more passengers than a standard general coach."
        },
        {
            title: "LHB Coach Platform",
            description: "Built on the Linke Hofmann Busch (LHB) platform, offering anti-telescopic safety features and a smoother, higher-speed-capable ride."
        },
        {
            title: "Wider Doorways",
            description: "Coaches feature wider doorways designed for faster, safer boarding and deboarding on busy unreserved platforms."
        }
    ];

    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer) {
        features.forEach(feature => {
            const el = document.createElement('div');
            el.className = 'feature-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            featuresContainer.appendChild(el);
        });
    }

    // 4. Routes & Destinations (data-driven, extensible)
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = antyodayaServices.map(service => `
            <div class="service-card" tabindex="0">
                <h3>${service.name}</h3>
                <div class="service-route">${service.origin} → ${service.destination}</div>
                <div class="service-stations"><strong>Via:</strong> ${service.majorStations.join(', ')}</div>
                <p class="service-desc">${service.description}</p>
            </div>
        `).join('');
    }

    const routesContainer = document.getElementById('routes-container');
    if (routesContainer) {
        routesContainer.innerHTML = antyodayaServices.map(service => `
            <div class="route-card">
                <div>
                    <div class="origin-dest">${service.origin} → ${service.destination}</div>
                    <div class="stations"><strong>Via:</strong> ${service.majorStations.join(', ')}</div>
                </div>
                <div class="regions-tag">${service.regions.join(' · ')}</div>
            </div>
        `).join('');
    }

    // 5. Passenger Facilities
    const facilities = [
        {
            icon: "💺",
            title: "High-Capacity Seating",
            description: "High-density unreserved seating designed to safely accommodate more passengers than a conventional general coach."
        },
        {
            icon: "🔌",
            title: "Charging Points",
            description: "Mobile charging points fitted in the coaches — a notable first for unreserved-class travel in India."
        },
        {
            icon: "🚰",
            title: "Drinking Water",
            description: "Onboard drinking water facilities, with RO water points provided at many originating and major stations."
        },
        {
            icon: "📢",
            title: "Passenger Information",
            description: "Station announcements and coach signage help passengers track the journey on long, multi-state routes."
        },
        {
            icon: "🚻",
            title: "Bio-Toilets",
            description: "Coaches are fitted with zero-discharge bio-toilets, improving hygiene compared to older-style general coaches."
        },
        {
            icon: "🛡️",
            title: "Safety Features",
            description: "CCTV coverage, fire-retardant materials and LED lighting are standard across Antyodaya Express rakes."
        }
    ];

    const facilitiesContainer = document.getElementById('facilities-container');
    if (facilitiesContainer) {
        facilities.forEach(facility => {
            const el = document.createElement('div');
            el.className = 'facility-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="facility-icon" aria-hidden="true">${facility.icon}</div>
                <h3>${facility.title}</h3>
                <p>${facility.description}</p>
            `;
            facilitiesContainer.appendChild(el);
        });
    }

    // 6. Interesting Facts
    const facts = [
        "\"Antyodaya\" means the upliftment of the last and most disadvantaged person, a philosophy also behind India's Antyodaya Anna Yojana welfare scheme.",
        "Antyodaya Express was among the first Indian Railways services to fit mobile charging points inside fully unreserved coaches.",
        "The first Antyodaya Express connected Ernakulam in Kerala with Howrah in West Bengal, spanning several states along India's eastern and southern coasts."
    ];

    const triviaContainer = document.getElementById('trivia-container');
    if (triviaContainer) {
        facts.forEach(fact => {
            const el = document.createElement('div');
            el.className = 'trivia-card';
            el.tabIndex = 0;
            el.innerHTML = `<p>${fact}</p>`;
            triviaContainer.appendChild(el);
        });
    }

});