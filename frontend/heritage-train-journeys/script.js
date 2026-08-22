/* script.js */

/*
 * HERITAGE JOURNEYS DATA
 * Add a new heritage journey here to have it appear automatically across the
 * cards, filter dropdowns, and expandable route details.
 * Required fields: id, name, category, region, significance ("unesco" | "tentative" | "notable"),
 * significanceLabel, historicalBackground, route, attractions (array), facts (array).
 */
const heritageJourneys = [
    {
        id: "darjeeling-himalayan-railway",
        name: "Darjeeling Himalayan Railway",
        category: "Mountain Railways",
        region: "West Bengal",
        significance: "unesco",
        significanceLabel: "UNESCO World Heritage Site (1999)",
        historicalBackground: "Opened in 1881, the 2-foot narrow-gauge \"Toy Train\" was built to connect the hill station of Darjeeling with the plains, and remains one of the earliest hill railways in Asia still in operation.",
        route: "New Jalpaiguri – Darjeeling, via Kurseong",
        attractions: ["Batasia Loop", "Ghum, one of the highest railway stations in India", "Kurseong hill town"],
        facts: [
            "Was among the first railways inscribed as a UNESCO World Heritage Site, in 1999.",
            "Climbs roughly 2,000 metres over its route using loops and zigzag reverses rather than tunnels."
        ]
    },
    {
        id: "nilgiri-mountain-railway",
        name: "Nilgiri Mountain Railway",
        category: "Mountain Railways",
        region: "Tamil Nadu",
        significance: "unesco",
        significanceLabel: "UNESCO World Heritage Site (2005 extension)",
        historicalBackground: "Opened in 1908, this metre-gauge railway was engineered to climb the steep Nilgiri hills using a rack-and-pinion system on its steepest sections, connecting the plains to the hill station of Udagamandalam (Ooty).",
        route: "Mettupalayam – Udagamandalam (Ooty), via Coonoor",
        attractions: ["Coonoor hill town", "Wellington", "Ooty Botanical Garden"],
        facts: [
            "Added to the UNESCO Mountain Railways of India listing as an extension in 2005.",
            "Uses a rack railway system for its steepest gradients, unique among India's hill railways."
        ]
    },
    {
        id: "kalka-shimla-railway",
        name: "Kalka–Shimla Railway",
        category: "Mountain Railways",
        region: "Himachal Pradesh",
        significance: "unesco",
        significanceLabel: "UNESCO World Heritage Site (2008)",
        historicalBackground: "Completed in 1903, this narrow-gauge line was built to connect the plains with Shimla, then the summer capital of British India, and is renowned for its extensive tunnels and multi-arched viaducts.",
        route: "Kalka – Shimla",
        attractions: ["Barog tunnel", "Multi-arched viaducts near Kanoh", "Shimla's colonial-era railway station"],
        facts: [
            "Runs through more than 100 tunnels and hundreds of bridges along its route.",
            "Recognised as a UNESCO World Heritage Site in 2008 as part of the Mountain Railways of India."
        ]
    },
    {
        id: "matheran-hill-railway",
        name: "Matheran Hill Railway",
        category: "Mountain Railways",
        region: "Maharashtra",
        significance: "tentative",
        significanceLabel: "On India's UNESCO Tentative List",
        historicalBackground: "Opened in 1907, this narrow-gauge line was built to connect the plains with the hill station of Matheran, which remains free of motor vehicles, giving the railway a rare, undisturbed setting.",
        route: "Neral – Matheran",
        attractions: ["One Kiss Point", "Panorama Point", "Matheran's vehicle-free hill town"],
        facts: [
            "Included on India's UNESCO Tentative List, though not yet formally inscribed as a World Heritage Site.",
            "Matheran remains one of the few hill stations in India where motor vehicles are banned."
        ]
    },
    {
        id: "fairy-queen-express",
        name: "Fairy Queen Express",
        category: "Steam & Historic Locomotive Experiences",
        region: "Delhi & Rajasthan",
        significance: "notable",
        significanceLabel: "Guinness World Record — Oldest Working Steam Locomotive",
        historicalBackground: "Built in 1855, the Fairy Queen locomotive is recognised by Guinness World Records as the oldest working steam locomotive in the world still in regular service, now used to haul a heritage tourist train.",
        route: "Delhi Cantonment – Alwar (near Sariska)",
        attractions: ["National Rail Museum, Delhi", "Sariska Tiger Reserve, near Alwar"],
        facts: [
            "The locomotive itself predates the Indian rebellion of 1857.",
            "Operated seasonally as a heritage tourist experience, typically pairing the rail journey with a wildlife excursion."
        ]
    },
    {
        id: "palace-on-wheels",
        name: "Palace on Wheels",
        category: "Historic Railway Experiences",
        region: "Rajasthan",
        significance: "notable",
        significanceLabel: "Heritage-Styled Luxury Tourist Train",
        historicalBackground: "Launched in 1982, this luxury tourist train was designed with carriages styled after the private saloons once used by Rajasthan's princely rulers, built to showcase the region's royal heritage to travellers.",
        route: "Delhi – Jaipur – Jaisalmer – Jodhpur – Udaipur – Bharatpur – Agra – Delhi (circuit)",
        attractions: ["Amber Fort, Jaipur", "Jaisalmer Fort", "Taj Mahal, Agra"],
        facts: [
            "Its interiors and branding evoke princely-era rail travel, though the train itself is a modern tourist service rather than an originally royal rake.",
            "Runs a week-long circuit covering several of Rajasthan's most visited heritage sites."
        ]
    },
    {
        id: "kangra-valley-railway",
        name: "Kangra Valley Railway",
        category: "Scenic Railway Journeys",
        region: "Himachal Pradesh",
        significance: "notable",
        significanceLabel: "Notable Scenic Narrow-Gauge Line",
        historicalBackground: "Opened in 1929, this narrow-gauge line runs through the foothills of the Dhauladhar range, offering scenic Himalayan views without the rack-and-pinion engineering of India's steepest hill railways.",
        route: "Pathankot – Joginder Nagar",
        attractions: ["Kangra Fort", "Views of the Dhauladhar range", "Baijnath temple town"],
        facts: [
            "One of the longest narrow-gauge lines in India by route length.",
            "Offers close-up views of the Dhauladhar Himalayan range for much of its journey."
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('heritage-grid');
    const noResults = document.getElementById('no-results');
    const filterStatus = document.getElementById('filter-status');
    const searchInput = document.getElementById('filter-search');
    const categorySelect = document.getElementById('filter-category');
    const regionSelect = document.getElementById('filter-region');
    const significanceSelect = document.getElementById('filter-significance');
    const clearButton = document.getElementById('clear-filters');

    const significanceLabels = {
        unesco: "UNESCO World Heritage Site",
        tentative: "UNESCO Tentative List",
        notable: "Notable Heritage Experience"
    };

    // 1. Quick Facts
    const quickFacts = [
        { label: "UNESCO Listed Lines", value: "3" },
        { label: "Oldest Locomotive", value: "Built 1855" },
        { label: "Categories", value: "5" },
        { label: "States Covered", value: "5" }
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

    // 2. Populate filter dropdowns from data
    function populateFilters() {
        const categories = [...new Set(heritageJourneys.map(j => j.category))].sort();
        const regions = [...new Set(heritageJourneys.map(j => j.region))].sort();
        const significances = [...new Set(heritageJourneys.map(j => j.significance))];

        categories.forEach(category => {
            const opt = document.createElement('option');
            opt.value = category;
            opt.textContent = category;
            categorySelect.appendChild(opt);
        });

        regions.forEach(region => {
            const opt = document.createElement('option');
            opt.value = region;
            opt.textContent = region;
            regionSelect.appendChild(opt);
        });

        significances.forEach(sig => {
            const opt = document.createElement('option');
            opt.value = sig;
            opt.textContent = significanceLabels[sig] || sig;
            significanceSelect.appendChild(opt);
        });
    }

    // 3. Render journey cards
    function renderJourneys(journeys) {
        if (journeys.length === 0) {
            grid.innerHTML = '';
            noResults.hidden = false;
            filterStatus.textContent = 'No heritage journeys found.';
            return;
        }

        noResults.hidden = true;
        filterStatus.textContent = `Showing ${journeys.length} of ${heritageJourneys.length} heritage journeys.`;

        grid.innerHTML = journeys.map(journey => `
            <div class="heritage-card" id="card-${journey.id}">
                <span class="significance-badge ${journey.significance}">${journey.significanceLabel}</span>
                <h3>${journey.name}</h3>
                <p class="heritage-card-region">${journey.region}</p>
                <span class="category-badge">${journey.category}</span>
                <p class="heritage-card-desc">${journey.historicalBackground}</p>
                <button type="button" class="btn-expand-journey" data-journey-id="${journey.id}" aria-expanded="false" aria-controls="details-${journey.id}">
                    View route &amp; attractions ▾
                </button>
                <div class="journey-route-list" id="details-${journey.id}">
                    <div class="route-stop"><strong>Route:</strong> ${journey.route}</div>
                    <div class="route-stop"><strong>Major attractions:</strong> ${journey.attractions.join(', ')}</div>
                    ${journey.facts.map(fact => `<div class="route-stop">${fact}</div>`).join('')}
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.btn-expand-journey').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = document.getElementById(`card-${btn.dataset.journeyId}`);
                const isExpanded = card.classList.toggle('expanded');
                btn.setAttribute('aria-expanded', String(isExpanded));
                btn.innerHTML = isExpanded ? 'Hide route &amp; attractions ▴' : 'View route &amp; attractions ▾';
            });
        });
    }

    // 4. Apply filters
    function applyFilters() {
        const query = searchInput.value.trim().toLowerCase();
        const category = categorySelect.value;
        const region = regionSelect.value;
        const significance = significanceSelect.value;

        const filtered = heritageJourneys.filter(journey => {
            const matchesQuery = !query ||
                journey.name.toLowerCase().includes(query) ||
                journey.region.toLowerCase().includes(query) ||
                journey.category.toLowerCase().includes(query);

            const matchesCategory = !category || journey.category === category;
            const matchesRegion = !region || journey.region === region;
            const matchesSignificance = !significance || journey.significance === significance;

            return matchesQuery && matchesCategory && matchesRegion && matchesSignificance;
        });

        renderJourneys(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    categorySelect.addEventListener('change', applyFilters);
    regionSelect.addEventListener('change', applyFilters);
    significanceSelect.addEventListener('change', applyFilters);

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = '';
        regionSelect.value = '';
        significanceSelect.value = '';
        applyFilters();
        searchInput.focus();
    });

    document.getElementById('filter-form').addEventListener('submit', (e) => e.preventDefault());

    // 5. Historical Timeline
    const history = [
        {
            year: "1855",
            title: "Fairy Queen Built",
            description: "The locomotive later known as the Fairy Queen is built — today recognised as the world's oldest working steam locomotive."
        },
        {
            year: "1881",
            title: "Darjeeling Himalayan Railway Opens",
            description: "The narrow-gauge \"Toy Train\" begins operating between the plains and the hill station of Darjeeling."
        },
        {
            year: "1903",
            title: "Kalka–Shimla Railway Completed",
            description: "The line connecting Kalka to Shimla, the summer capital of British India, is completed after extensive tunnelling and bridge-building."
        },
        {
            year: "1907",
            title: "Matheran Hill Railway Opens",
            description: "A narrow-gauge line begins service to the vehicle-free hill station of Matheran in Maharashtra."
        },
        {
            year: "1908",
            title: "Nilgiri Mountain Railway Opens",
            description: "India's only rack railway begins operating between Mettupalayam and Udagamandalam (Ooty)."
        },
        {
            year: "1929",
            title: "Kangra Valley Railway Opens",
            description: "A scenic narrow-gauge line begins service through the foothills of the Dhauladhar range in Himachal Pradesh."
        },
        {
            year: "1982",
            title: "Palace on Wheels Launched",
            description: "A luxury tourist train styled after princely-era saloons begins operating across Rajasthan's heritage circuit."
        },
        {
            year: "1999",
            title: "Darjeeling Railway Named UNESCO World Heritage Site",
            description: "The Darjeeling Himalayan Railway becomes the first Indian railway inscribed on the UNESCO World Heritage List."
        },
        {
            year: "2005",
            title: "Nilgiri Railway Added to UNESCO Listing",
            description: "The Nilgiri Mountain Railway is added as an extension to the Mountain Railways of India World Heritage listing."
        },
        {
            year: "2008",
            title: "Kalka–Shimla Railway Named UNESCO World Heritage Site",
            description: "The Kalka–Shimla Railway becomes the third Indian hill railway inscribed under the same UNESCO listing."
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

    // 6. Heritage Facts (trivia)
    const facts = [
        "India is home to three UNESCO World Heritage-listed mountain railways: Darjeeling, Nilgiri, and Kalka–Shimla — together listed as the \"Mountain Railways of India.\"",
        "The Nilgiri Mountain Railway is the only rack-and-pinion railway in India, needed to climb its steepest sections safely.",
        "The Fairy Queen, built in 1855, holds a Guinness World Record as the oldest working steam locomotive still in regular service anywhere in the world."
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

    // Initialize
    populateFilters();
    renderJourneys(heritageJourneys);
});