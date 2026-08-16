/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Service", value: "Rajdhani Express" },
        { label: "Purpose", value: "Long-distance connectivity" },
        { label: "Network", value: "Indian Railways" },
        { label: "Focus", value: "Capital-city connectivity" }
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
            year: "1969",
            title: "Rajdhani concept introduced",
            description: "The first Rajdhani service established a faster connection between New Delhi and Kolkata."
        },
        {
            year: "Expansion",
            title: "Network development",
            description: "Rajdhani services were progressively introduced on additional major routes across India."
        },
        {
            year: "Modern era",
            title: "Continued evolution",
            description: "The network has evolved alongside changes in railway infrastructure, rolling stock and passenger services, setting new standards."
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
    const rajdhaniServices = [
        {
            name: "Mumbai Rajdhani",
            origin: "Mumbai Central",
            destination: "New Delhi",
            majorStations: ["Mumbai Central", "Surat", "Vadodara", "Kota", "New Delhi"],
            description: "A major Rajdhani service connecting Mumbai with India's national capital."
        },
        {
            name: "Bengaluru Rajdhani",
            origin: "KSR Bengaluru",
            destination: "Hazrat Nizamuddin",
            majorStations: ["KSR Bengaluru", "Dharwad", "Pune", "Bhopal", "Hazrat Nizamuddin"],
            description: "A long-distance Rajdhani service linking Bengaluru with Delhi."
        },
        {
            name: "Kolkata Rajdhani",
            origin: "Howrah",
            destination: "New Delhi",
            majorStations: ["Howrah", "Dhanbad", "Gaya", "Kanpur", "New Delhi"],
            description: "Connects Kolkata and Delhi through an important east-west railway corridor."
        }
    ];

    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        rajdhaniServices.forEach(service => {
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

    // 4. Passenger Facilities
    const facilities = [
        {
            title: "Accommodation",
            description: "Different Rajdhani services use appropriate passenger accommodation classes (1AC, 2AC, 3AC)."
        },
        {
            title: "Catering",
            description: "Catering services are provided according to the service and applicable railway arrangements."
        },
        {
            title: "Passenger Information",
            description: "Passengers receive journey and service information through onboard and station systems."
        },
        {
            title: "Comfort",
            description: "Rajdhani services are designed for long-distance passenger travel with dedicated accommodation and air-conditioning."
        }
    ];

    const facilitiesContainer = document.getElementById('facilities-container');
    if (facilitiesContainer) {
        facilities.forEach(facility => {
            const el = document.createElement('div');
            el.className = 'facility-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <h3>${facility.title}</h3>
                <p>${facility.description}</p>
            `;
            facilitiesContainer.appendChild(el);
        });
    }

    // 5. Trivia Data
    const facts = [
        "The Rajdhani concept was introduced to provide an important fast connection to India's national capital.",
        "The network expanded beyond its original service as additional major cities received Rajdhani connections.",
        "Rajdhani services form part of India's important long-distance passenger railway network."
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
