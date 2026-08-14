/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Train Type", value: "Semi-High-Speed EMU" },
        { label: "Service Category", value: "Premium Intercity" },
        { label: "Manufacturer", value: "Integral Coach Factory" },
        { label: "Max Speed", value: "160 km/h" }
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
            year: "2018",
            title: "Project Initiation",
            description: "Developed as 'Train 18', the first prototype was built in just 18 months by ICF Chennai."
        },
        {
            year: "Feb 2019",
            title: "First Commercial Run",
            description: "Flagged off on the New Delhi–Varanasi route, marking its commercial debut."
        },
        {
            year: "2022-Present",
            title: "Vande Bharat 2.0 & Expansion",
            description: "Introduced updated versions (Vande Bharat 2.0) with lighter weight, better acceleration, and enhanced safety (Kavach). The network rapidly expanded across states."
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


    // 3. Design & Technology
    const technologies = [
        {
            icon: "🚄",
            title: "Aerodynamic Design",
            description: "The nose cone has an aerodynamic design similar to a bullet train, reducing air resistance at high speeds."
        },
        {
            icon: "🔌",
            title: "Engine-less EMU",
            description: "It uses an electric multiple unit (EMU) configuration, meaning propulsion is distributed across coaches rather than having a separate locomotive."
        },
        {
            icon: "🚪",
            title: "Automatic Plug Doors",
            description: "Features automatic, centrally-controlled plug doors that offer better sound insulation and safety."
        },
        {
            icon: "🛑",
            title: "Regenerative Braking",
            description: "Advanced braking systems that save up to 30% of electrical energy."
        }
    ];

    const techContainer = document.getElementById('technology-container');
    if (techContainer) {
        technologies.forEach(tech => {
            const el = document.createElement('div');
            el.className = 'tech-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="card-icon" aria-hidden="true">${tech.icon}</div>
                <h3>${tech.title}</h3>
                <p>${tech.description}</p>
            `;
            techContainer.appendChild(el);
        });
    }

    // 4. Major Routes
    const routes = [
        {
            name: "New Delhi – Varanasi",
            stations: "Delhi • Kanpur • Prayagraj • Varanasi",
            description: "The inaugural route, significantly reducing travel time to the holy city."
        },
        {
            name: "New Delhi – Shri Mata Vaishno Devi Katra",
            stations: "Delhi • Ambala • Ludhiana • Jammu Tawi • Katra",
            description: "A crucial pilgrimage route offering a fast day-connection to Katra."
        },
        {
            name: "Mumbai Central – Gandhinagar Capital",
            stations: "Mumbai • Surat • Vadodara • Ahmedabad • Gandhinagar",
            description: "A major western business corridor route connecting two economic hubs."
        },
        {
            name: "Chennai – Mysuru",
            stations: "Chennai • Bengaluru • Mysuru",
            description: "The first Vande Bharat in South India, linking key tech and heritage cities."
        }
    ];

    const routesContainer = document.getElementById('routes-container');
    if (routesContainer) {
        routes.forEach(route => {
            const el = document.createElement('div');
            el.className = 'route-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <h3>${route.name}</h3>
                <p>${route.description}</p>
                <div class="route-stations">${route.stations}</div>
            `;
            routesContainer.appendChild(el);
        });
    }

    // 5. Passenger Facilities
    const facilities = [
        {
            icon: "💺",
            title: "Revolving Seats",
            description: "Executive class coaches feature seats that can rotate 180 degrees to face the direction of travel."
        },
        {
            icon: "📱",
            title: "Onboard Wi-Fi & Infotainment",
            description: "Equipped with passenger information screens and Wi-Fi for infotainment content."
        },
        {
            icon: "♿",
            title: "Accessibility Features",
            description: "Includes Divyangjan-friendly (wheelchair accessible) washrooms and Braille lettering."
        },
        {
            icon: "🛡️",
            title: "Kavach Safety System",
            description: "Equipped with 'Kavach', the indigenous Train Collision Avoidance System (TCAS)."
        }
    ];

    const facilitiesContainer = document.getElementById('facilities-container');
    if (facilitiesContainer) {
        facilities.forEach(facility => {
            const el = document.createElement('div');
            el.className = 'facility-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="card-icon" aria-hidden="true">${facility.icon}</div>
                <h3>${facility.title}</h3>
                <p>${facility.description}</p>
            `;
            facilitiesContainer.appendChild(el);
        });
    }

    // 6. Trivia Data
    const facts = [
        "Vande Bharat Express can accelerate to 100 km/h in just 52 seconds.",
        "It was entirely designed and manufactured in India at a fraction of the cost of importing similar trains.",
        "The train has an intelligent air-conditioning system that adjusts cooling based on the passenger load."
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
