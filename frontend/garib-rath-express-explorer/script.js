/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Introduced", value: "2005–2006" },
        { label: "Service Type", value: "Long-Distance AC" },
        { label: "Coach Class", value: "AC 3-Tier Only" },
        { label: "First Route", value: "Saharsa – Amritsar" }
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
            year: "2005",
            title: "Concept Announced",
            description: "The Garib Rath concept was announced in the Indian Railway Budget 2005–06 by Railway Minister Lalu Prasad Yadav, aiming to make AC travel affordable for ordinary passengers."
        },
        {
            year: "2006",
            title: "Inaugural Run",
            description: "The first Garib Rath Express began operating on 4 October 2006 between Saharsa Junction in Bihar and Amritsar Junction in Punjab."
        },
        {
            year: "2007–2012",
            title: "Network Expansion",
            description: "Additional Garib Rath services were introduced connecting major metros, industrial hubs and pilgrimage centres across the country."
        },
        {
            year: "Present",
            title: "Ongoing Service",
            description: "Several Garib Rath routes continue to run today, while some have since been rebranded or reconfigured as passenger preferences have shifted toward newer AC train categories."
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

    // 3. Concept & Design Features
    const features = [
        {
            title: "All-AC 3-Tier Coaches",
            description: "Every coach on a Garib Rath rake is AC 3-Tier — there is no sleeper, AC 2-Tier or first-class accommodation on board."
        },
        {
            title: "Higher-Density Seating",
            description: "Coaches carry more berths per coach than a standard AC 3-Tier coach, lowering the cost per passenger and keeping fares affordable."
        },
        {
            title: "Pay-As-You-Use Amenities",
            description: "Bedrolls and full meals, complimentary on many premium AC trains, are typically offered on Garib Rath at an additional cost to keep base fares low."
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

    // 4. Routes & Destinations
    const routes = [
        {
            origin: "Saharsa Junction",
            destination: "Amritsar Junction",
            importantStations: ["Patna", "Lucknow", "Delhi", "Ambala"],
            regions: ["Bihar", "Uttar Pradesh", "Delhi", "Punjab"]
        },
        {
            origin: "Delhi Sarai Rohilla",
            destination: "Bikaner",
            importantStations: ["Rewari", "Sikar", "Churu"],
            regions: ["Delhi", "Haryana", "Rajasthan"]
        },
        {
            origin: "Kolkata",
            destination: "Yesvantpur (Bengaluru)",
            importantStations: ["Bhubaneswar", "Vijayawada", "Chennai"],
            regions: ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu", "Karnataka"]
        },
        {
            origin: "Chennai Egmore",
            destination: "Hazrat Nizamuddin (Delhi)",
            importantStations: ["Vijayawada", "Nagpur", "Jhansi"],
            regions: ["Tamil Nadu", "Andhra Pradesh", "Maharashtra", "Madhya Pradesh", "Delhi"]
        },
        {
            origin: "Bandra Terminus",
            destination: "Amritsar Junction",
            importantStations: ["Surat", "Vadodara", "Kota", "Delhi"],
            regions: ["Maharashtra", "Gujarat", "Rajasthan", "Delhi", "Punjab"]
        }
    ];

    const routesContainer = document.getElementById('routes-container');
    if (routesContainer) {
        routesContainer.innerHTML = routes.map(route => `
            <div class="route-card">
                <div>
                    <div class="origin-dest">${route.origin} → ${route.destination}</div>
                    <div class="stations"><strong>Via:</strong> ${route.importantStations.join(', ')}</div>
                </div>
                <div class="regions-tag">${route.regions.join(' · ')}</div>
            </div>
        `).join('');
    }

    // 5. Passenger Facilities
    const facilities = [
        {
            icon: "🛏️",
            title: "AC 3-Tier Berths",
            description: "Air-conditioned sleeping accommodation throughout the train, with side and main berths arranged in a higher-density layout."
        },
        {
            icon: "🔌",
            title: "Charging Points",
            description: "Refurbished rakes include mobile and device charging points at berths for long-distance convenience."
        },
        {
            icon: "🍽️",
            title: "On-Demand Catering",
            description: "Meals and snacks are generally available for purchase on board, rather than included automatically in the base fare."
        },
        {
            icon: "📢",
            title: "Passenger Information",
            description: "Station announcements and coach-level signage help passengers track upcoming stops on long overnight journeys."
        },
        {
            icon: "🛡️",
            title: "Safety Features",
            description: "Coaches are fitted with fire and smoke detection systems, along with standard emergency alarm chains in every compartment."
        },
        {
            icon: "🚻",
            title: "Bio-Toilets",
            description: "Newer rakes are fitted with zero-discharge bio-toilets, improving hygiene and reducing environmental impact along the route."
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
        "\"Garib Rath\" translates from Hindi as \"chariot of the poor,\" reflecting the service's affordability-first design goal.",
        "Garib Rath coaches typically seat around 81 berths per AC 3-Tier coach, compared to about 64 in a standard AC 3-Tier coach.",
        "The first Garib Rath Express connected Saharsa in Bihar to Amritsar in Punjab, linking a major source region for migrant labour to a key destination hub."
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