/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Introduced", value: "1988" },
        { label: "Service Type", value: "Daytime intercity" },
        { label: "Primary Role", value: "Fast city-to-city connectivity" },
        { label: "Coach Type", value: "Primarily chair-car" }
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
            year: "1988",
            title: "Shatabdi Concept Introduced",
            description: "The first Shatabdi Express was introduced between New Delhi and Jhansi (later extended to Bhopal) to commemorate the birth centenary of Jawaharlal Nehru."
        },
        {
            year: "Network Expansion",
            title: "Linking Major Cities",
            description: "The success of the initial route led to the rapid expansion of the Shatabdi network, connecting major metropolitan cities and business hubs across India."
        },
        {
            year: "Modernization",
            title: "Upgrading the Fleet",
            description: "Over the years, the network has seen significant upgrades, including the introduction of modern LHB coaches for enhanced safety and passenger comfort."
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


    // 3. Major Services Data
    const shatabdiServices = [
        {
            name: "New Delhi–Bhopal Shatabdi Express",
            origin: "New Delhi",
            destination: "Bhopal",
            majorStations: ["Agra Cantt", "Gwalior", "Jhansi"],
            description: "The pioneer Shatabdi service, connecting the national capital to the heart of India."
        },
        {
            name: "New Delhi–Ajmer Shatabdi Express",
            origin: "New Delhi",
            destination: "Ajmer",
            majorStations: ["Gurgaon", "Rewari", "Alwar", "Jaipur"],
            description: "An important daytime link between Delhi and the heritage cities of Rajasthan."
        },
        {
            name: "New Delhi–Chandigarh Shatabdi Express",
            origin: "New Delhi",
            destination: "Chandigarh",
            majorStations: ["Ambala Cantt"],
            description: "Provides fast, reliable business and tourism connectivity to the planned city of Chandigarh."
        }
    ];

    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        shatabdiServices.forEach(service => {
            const el = document.createElement('article');
            el.className = 'service-card';
            el.tabIndex = 0;
            
            const stationsHtml = service.majorStations.map(s => `<li>${s}</li>`).join('');
            
            el.innerHTML = `
                <h3 class="service-title">${service.name}</h3>
                <div class="service-route">
                    <p><strong>Origin:</strong> ${service.origin}</p>
                    <p><strong>Destination:</strong> ${service.destination}</p>
                </div>
                <div>
                    <h4 class="service-stations-header">Major stations</h4>
                    <ul class="service-stations">
                        ${stationsHtml}
                    </ul>
                </div>
                <p class="service-desc">${service.description}</p>
            `;
            servicesContainer.appendChild(el);
        });
    }

    // 4. Route Visualization Example (Bhopal Shatabdi)
    const routeContainer = document.getElementById('route-container');
    if (routeContainer) {
        routeContainer.innerHTML = `
            <div class="route-node">
                <span class="node-label">Origin</span>
                <h3 class="node-city">New Delhi</h3>
            </div>
            <div class="route-connector" aria-hidden="true">
                <span>Agra</span>
                <span class="dot"></span>
                <span>Gwalior</span>
                <span class="dot"></span>
                <span>Jhansi</span>
            </div>
            <div class="route-node">
                <span class="node-label">Destination</span>
                <h3 class="node-city">Bhopal</h3>
            </div>
        `;
    }

    // 5. Passenger Facilities
    const facilities = [
        {
            icon: "🪑",
            title: "Comfortable Seating",
            description: "Features primarily AC Chair Car and Executive Class seating for daytime travel comfort."
        },
        {
            icon: "🍽️",
            title: "On-board Catering",
            description: "Complimentary meals and refreshments are typically served directly at the passenger's seat."
        },
        {
            icon: "📢",
            title: "Passenger Information",
            description: "Equipped with public address systems and displays for journey updates."
        },
        {
            icon: "⚡",
            title: "Passenger Amenities",
            description: "Charging points, reading lights, and large windows for enjoying the scenery."
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
        "The word 'Shatabdi' translates to 'centenary' in Hindi, Sanskrit, and several other Indian languages, marking the centenary of Jawaharlal Nehru.",
        "Shatabdi Express trains are among the fastest daytime trains in India, consistently maintaining high average speeds.",
        "They are designed to complete their journeys and return to their origin stations within the same day."
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
