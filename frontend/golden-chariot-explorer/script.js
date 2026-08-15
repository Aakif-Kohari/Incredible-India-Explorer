/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Train Type", value: "Luxury Tourist Train" },
        { label: "Region", value: "South India" },
        { label: "Inaugurated", value: "2008" },
        { label: "Major Destinations", value: "Hampi, Mysuru, Goa" }
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
            year: "2008",
            title: "Inaugural Journey",
            description: "The Golden Chariot commenced its first journey on March 10, 2008, introducing luxury train travel to South India."
        },
        {
            year: "2010",
            title: "Southern Splendour Route",
            description: "Expanded its operations to cover a new route called 'Southern Splendour' spanning three states."
        },
        {
            year: "2013",
            title: "Award Recognition",
            description: "Won the title of 'Asia's Leading Luxury Train' at the World Travel Awards."
        },
        {
            year: "2020",
            title: "Revamp and IRCTC Management",
            description: "Operations were taken over by IRCTC, and the train underwent a significant refurbishment to upgrade passenger amenities."
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


    // 3. Routes & Destinations
    const routes = [
        {
            name: "Pride of Karnataka (6 Nights/7 Days)",
            description: "A comprehensive tour of Karnataka's wildlife, heritage, and the beaches of Goa.",
            start: "Bengaluru",
            end: "Bengaluru",
            destinations: ["Bandipur", "Mysuru", "Halebidu", "Chikmagalur", "Hampi", "Badami", "Goa"]
        },
        {
            name: "Jewels of South (6 Nights/7 Days)",
            description: "A cultural exploration covering majestic temples and palaces across multiple states.",
            start: "Bengaluru",
            end: "Bengaluru",
            destinations: ["Mysuru", "Hampi", "Mahabalipuram", "Thanjavur", "Chettinad", "Kumarakom", "Kochi"]
        },
        {
            name: "Glimpses of Karnataka (3 Nights/4 Days)",
            description: "A short getaway capturing the essence of Karnataka's heritage.",
            start: "Bengaluru",
            end: "Bengaluru",
            destinations: ["Bandipur", "Mysuru", "Hampi"]
        }
    ];

    const routesContainer = document.getElementById('routes-container');
    if (routesContainer) {
        routes.forEach(route => {
            const el = document.createElement('div');
            el.className = 'route-card';
            el.tabIndex = 0;
            
            const destinationsHTML = route.destinations.map(d => `<span>${d}</span>`).join('');
            
            el.innerHTML = `
                <h3>${route.name}</h3>
                <p><strong>${route.start} ↺</strong></p>
                <p>${route.description}</p>
                <div class="route-stations">
                    ${destinationsHTML}
                </div>
            `;
            routesContainer.appendChild(el);
        });
    }

    // 4. Luxury Experience
    const luxuryFacilities = [
        {
            icon: "🛏️",
            title: "Royal Accommodation",
            description: "Features 44 cabins named after dynasties (Kadamba, Hoysala, etc.) with en-suite bathrooms, Wi-Fi, and LCD TVs."
        },
        {
            icon: "🍽️",
            title: "Fine Dining",
            description: "Two restaurants, Nala and Ruchi, serve exquisite Indian and continental cuisine with impeccable service."
        },
        {
            icon: "🍸",
            title: "Madira Lounge Bar",
            description: "A luxurious lounge bar named after the mythological drink of the gods, perfect for relaxing evenings."
        },
        {
            icon: "💆‍♀️",
            title: "Arogya Spa & Fitness",
            description: "An onboard spa offering Ayurvedic massages, alongside a fully equipped fitness center."
        }
    ];

    const luxuryContainer = document.getElementById('luxury-container');
    if (luxuryContainer) {
        luxuryFacilities.forEach(facility => {
            const el = document.createElement('div');
            el.className = 'luxury-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="card-icon" aria-hidden="true">${facility.icon}</div>
                <h3>${facility.title}</h3>
                <p>${facility.description}</p>
            `;
            luxuryContainer.appendChild(el);
        });
    }
    
    // 5. South Indian Heritage
    const heritageHighlights = [
        {
            icon: "🏛️",
            title: "Hampi's Ruins",
            description: "Explore the UNESCO World Heritage site of Hampi, the capital of the magnificent Vijayanagara Empire."
        },
        {
            icon: "🏰",
            title: "Mysore Palace",
            description: "Witness the grandeur of the Indo-Saracenic architecture at the official residence of the Wadiyar dynasty."
        },
        {
            icon: "🐅",
            title: "Bandipur National Park",
            description: "Experience a wildlife safari in one of India's premier tiger reserves."
        },
        {
            icon: "🏖️",
            title: "Goan Churches & Beaches",
            description: "Visit the stunning churches of Old Goa and relax by the Arabian Sea."
        }
    ];

    const heritageContainer = document.getElementById('heritage-container');
    if (heritageContainer) {
        heritageHighlights.forEach(highlight => {
            const el = document.createElement('div');
            el.className = 'heritage-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="card-icon" aria-hidden="true">${highlight.icon}</div>
                <h3>${highlight.title}</h3>
                <p>${highlight.description}</p>
            `;
            heritageContainer.appendChild(el);
        });
    }

    // 6. Trivia Data
    const facts = [
        "The train's logo features the mythical elephant-headed lion (Yali) intertwined with a chariot.",
        "The purple and gold exterior color scheme was inspired by the Mysore Maharaja's royal colors.",
        "Each coach is designed to reflect the architectural aesthetics of the erstwhile ruling dynasties of Karnataka."
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
