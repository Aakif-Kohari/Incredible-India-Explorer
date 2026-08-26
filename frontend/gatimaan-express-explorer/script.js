/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Introduced", value: "2016" },
        { label: "Service Type", value: "Semi-High-Speed" },
        { label: "Top Speed", value: "160 km/h" },
        { label: "Coach Type", value: "LHB Chair Car" }
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
            title: "Inaugural Run",
            description: "Gatimaan Express was flagged off on April 5, 2016, operating between Hazrat Nizamuddin (Delhi) and Agra Cantonment."
        },
        {
            year: "2018",
            title: "Extension to Gwalior",
            description: "In February 2018, the service was extended up to Gwalior."
        },
        {
            year: "2018",
            title: "Extension to Jhansi",
            description: "Shortly after, in April 2018, the route was further extended to Virangana Lakshmibai (Jhansi), providing better connectivity."
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


    // 3. Route Visualization
    const routeContainer = document.getElementById('route-container');
    if (routeContainer) {
        routeContainer.innerHTML = `
            <div class="route-node">
                <span class="node-label">Origin</span>
                <h3 class="node-city">Delhi (NZM)</h3>
            </div>
            <div class="route-connector" aria-hidden="true">
                <span>Agra Cantt</span>
                <span class="dot"></span>
                <span>Gwalior</span>
            </div>
            <div class="route-node">
                <span class="node-label">Destination</span>
                <h3 class="node-city">Jhansi (VGLJ)</h3>
            </div>
        `;
    }

    // 4. Train Features
    const features = [
        {
            title: "High-Speed Operation",
            description: "Designed for a maximum operational speed of 160 km/h between Delhi and Agra, facilitated by a powerful WAP-5 locomotive."
        },
        {
            title: "Modern LHB Coaches",
            description: "Equipped with Linke Hofmann Busch (LHB) coaches known for their anti-telescopic safety features."
        },
        {
            title: "Bio-Toilets",
            description: "Features zero-discharge bio-toilets for improved hygiene and environmental compliance."
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

    // 5. Passenger Facilities
    const facilities = [
        {
            icon: "🪑",
            title: "Executive & AC Chair Car",
            description: "Offers spacious Executive Class and standard AC Chair Car seating for a comfortable day journey."
        },
        {
            icon: "🍽️",
            title: "Premium Catering",
            description: "Passengers are served high-quality meals, often with choices of Indian and Continental cuisine."
        },
        {
            icon: "📢",
            title: "Passenger Info System",
            description: "Features GPS-based passenger information systems and sliding doors in coaches."
        },
        {
            icon: "🛡️",
            title: "Train Hostesses",
            description: "It introduced airline-style train hostesses/stewards for passenger assistance."
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
        "Gatimaan Express covers the 188 km distance between Delhi and Agra in just about 100 minutes.",
        "It was the first train in India to feature train hostesses, similar to airlines.",
        "To achieve 160 km/h, the tracks on the Delhi-Agra route were specially upgraded with robust fencing and improved signaling."
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
