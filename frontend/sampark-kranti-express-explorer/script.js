/* script.js */

/*
 * SERVICES DATA
 * Add a new Sampark Kranti service here to have it appear automatically
 * in both the "Major Services" cards and the "Routes & Connectivity" list.
 * Required fields: name, origin, destination, majorStations (array), regions (array), description.
 */
const sparkKrantiServices = [
    {
        name: "Bengaluru–Nizamuddin Sampark Kranti Express",
        origin: "Bengaluru",
        destination: "Hazrat Nizamuddin (Delhi)",
        majorStations: ["Guntakal", "Bhopal", "Jhansi", "Agra"],
        regions: ["Karnataka", "Andhra Pradesh", "Madhya Pradesh", "Uttar Pradesh", "Delhi"],
        description: "Connects Karnataka's state capital directly with the national capital, one of the longest-running Sampark Kranti services."
    },
    {
        name: "Chennai–Nizamuddin Sampark Kranti Express",
        origin: "Chennai Central",
        destination: "Hazrat Nizamuddin (Delhi)",
        majorStations: ["Vijayawada", "Nagpur", "Bhopal", "Jhansi"],
        regions: ["Tamil Nadu", "Andhra Pradesh", "Maharashtra", "Madhya Pradesh", "Delhi"],
        description: "A superfast link between Tamil Nadu's capital and Delhi, cutting across the Deccan plateau and central India."
    },
    {
        name: "Kerala Sampark Kranti Express",
        origin: "Thiruvananthapuram",
        destination: "Hazrat Nizamuddin (Delhi)",
        majorStations: ["Kozhikode", "Coimbatore", "Nagpur", "Bhopal"],
        regions: ["Kerala", "Tamil Nadu", "Maharashtra", "Madhya Pradesh", "Delhi"],
        description: "One of the longest Sampark Kranti routes, connecting Kerala's capital to Delhi across nearly the length of the country."
    },
    {
        name: "Bhopal–Nizamuddin Sampark Kranti Express",
        origin: "Rani Kamalapati (Bhopal)",
        destination: "Hazrat Nizamuddin (Delhi)",
        majorStations: ["Jhansi", "Gwalior", "Agra"],
        regions: ["Madhya Pradesh", "Uttar Pradesh", "Delhi"],
        description: "A relatively short, fast link giving Madhya Pradesh's capital quick, direct access to Delhi."
    },
    {
        name: "Jammu Tawi–Delhi Sampark Kranti Express",
        origin: "Jammu Tawi",
        destination: "New Delhi",
        majorStations: ["Pathankot", "Ludhiana", "Ambala"],
        regions: ["Jammu & Kashmir", "Punjab", "Haryana", "Delhi"],
        description: "Provides fast, fully-reserved connectivity between Jammu and the national capital across the Punjab plains."
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Introduced", value: "2003–2004" },
        { label: "Service Type", value: "Superfast, Reserved" },
        { label: "Coach Classes", value: "Sleeper, AC 3-Tier, AC 2-Tier" },
        { label: "Network Hub", value: "New Delhi" }
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
            year: "2003–04",
            title: "Concept Introduced",
            description: "Sampark Kranti services were introduced to give state capitals and major cities superfast, fully-reserved connectivity to New Delhi."
        },
        {
            year: "Mid-2000s",
            title: "Network Grows",
            description: "New Sampark Kranti routes were added connecting cities such as Bengaluru, Chennai, Thiruvananthapuram and Bhopal to the capital."
        },
        {
            year: "2010s",
            title: "Coach Upgrades",
            description: "Many Sampark Kranti rakes were upgraded with LHB coaches, improving safety, ride quality and passenger amenities."
        },
        {
            year: "Present",
            title: "Ongoing Service",
            description: "Sampark Kranti Express services continue to operate across the country, forming a core part of India's superfast, reserved-only rail network."
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

    // 3. Major Sampark Kranti Services (data-driven, extensible)
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = sparkKrantiServices.map(service => `
            <div class="service-card" tabindex="0">
                <h3>${service.name}</h3>
                <div class="service-route">${service.origin} → ${service.destination}</div>
                <div class="service-stations"><strong>Via:</strong> ${service.majorStations.join(', ')}</div>
                <p class="service-desc">${service.description}</p>
            </div>
        `).join('');
    }

    // 4. Routes & Connectivity (built from the same services data)
    const routesContainer = document.getElementById('routes-container');
    if (routesContainer) {
        routesContainer.innerHTML = sparkKrantiServices.map(service => `
            <div class="route-card">
                <div>
                    <div class="origin-dest">${service.origin} → ${service.destination}</div>
                    <div class="stations"><strong>Via:</strong> ${service.majorStations.join(', ')}</div>
                </div>
                <div class="regions-tag">${service.regions.join(' · ')}</div>
            </div>
        `).join('');
    }

    // 5. Passenger Experience
    const facilities = [
        {
            icon: "🛏️",
            title: "Mixed Coach Classes",
            description: "Most rakes carry Sleeper Class, AC 3-Tier and AC 2-Tier coaches together, letting passengers choose the class that suits their budget."
        },
        {
            icon: "🔌",
            title: "Charging Points",
            description: "Upgraded LHB coaches include charging points at berths for mobile devices and laptops."
        },
        {
            icon: "🍽️",
            title: "Pantry & Catering",
            description: "Many Sampark Kranti services run a pantry car, with meals and snacks available for purchase during the journey."
        },
        {
            icon: "📢",
            title: "Passenger Information",
            description: "Station announcements and coach displays help passengers track the train's progress on long, multi-state journeys."
        },
        {
            icon: "🛡️",
            title: "Safety Features",
            description: "LHB coaches include anti-telescopic design and fire/smoke detection, along with emergency alarm chains in every coach."
        },
        {
            icon: "♿",
            title: "Reserved Seating",
            description: "As a fully-reserved superfast service, seating and berths are confirmed in advance, avoiding overcrowding in unreserved coaches."
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

    // 6. Trivia Data
    const facts = [
        "\"Sampark Kranti\" translates from Hindi as \"contact revolution,\" reflecting the goal of direct connectivity to the national capital.",
        "Unlike Rajdhani or Duronto trains, most Sampark Kranti services carry a mix of Sleeper and AC classes rather than being all-AC.",
        "The Kerala Sampark Kranti Express, linking Thiruvananthapuram to Delhi, covers one of the longest routes in the entire Sampark Kranti network."
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