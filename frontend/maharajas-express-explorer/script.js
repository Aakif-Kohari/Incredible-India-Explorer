/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Quick Facts
    const quickFacts = [
        { label: "Train Type", value: "Luxury Tourist Train" },
        { label: "Coaches", value: "23" },
        { label: "Inaugurated", value: "March 2010" },
        { label: "Major Regions", value: "Rajasthan, UP, MP" }
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
            year: "2010",
            title: "Inaugural Run",
            description: "The Maharajas' Express was launched in March 2010 as a joint venture between IRCTC and Cox and Kings India."
        },
        {
            year: "2011",
            title: "Exclusive IRCTC Operation",
            description: "The joint venture ended, and IRCTC took over the complete operation and management of the train."
        },
        {
            year: "2012-2018",
            title: "World's Leading Luxury Train",
            description: "Won the prestigious 'World's Leading Luxury Train' award at the World Travel Awards for seven consecutive years."
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


    // 3. Train Design & Accommodation
    const accommodations = [
        {
            icon: "👑",
            title: "Presidential Suite (Navratana)",
            description: "An entire carriage comprising two bedrooms, a living area, and a private bathroom with a bathtub. The pinnacle of railway luxury."
        },
        {
            icon: "💎",
            title: "Suite & Junior Suite",
            description: "Spacious suites equipped with large panoramic windows, en-suite bathrooms, and dedicated butler service."
        },
        {
            icon: "🛏️",
            title: "Deluxe Cabin",
            description: "Luxurious twin/double bed cabins featuring climate control, LCD TVs, and high-end toiletries."
        },
        {
            icon: "🖼️",
            title: "Regal Interiors",
            description: "Each coach is named after a precious stone (like Moti, Heera) and decorated to reflect the opulence of Indian royalty."
        }
    ];

    const designContainer = document.getElementById('design-container');
    if (designContainer) {
        accommodations.forEach(acc => {
            const el = document.createElement('div');
            el.className = 'design-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="card-icon" aria-hidden="true">${acc.icon}</div>
                <h3 class="card-title">${acc.title}</h3>
                <p class="card-desc">${acc.description}</p>
            `;
            designContainer.appendChild(el);
        });
    }

    // 4. Major Itineraries
    const itineraries = [
        {
            name: "Heritage of India",
            duration: "6 Nights / 7 Days",
            start: "Mumbai",
            end: "Delhi",
            destinations: ["Udaipur", "Jodhpur", "Bikaner", "Jaipur", "Ranthambore", "Agra"]
        },
        {
            name: "Indian Panorama",
            duration: "6 Nights / 7 Days",
            start: "Delhi",
            end: "Delhi",
            destinations: ["Jaipur", "Ranthambore", "Fatehpur Sikri", "Agra", "Orchha", "Khajuraho", "Varanasi"]
        },
        {
            name: "The Indian Splendour",
            duration: "6 Nights / 7 Days",
            start: "Delhi",
            end: "Mumbai",
            destinations: ["Agra", "Ranthambore", "Jaipur", "Bikaner", "Jodhpur", "Udaipur"]
        },
        {
            name: "Treasures of India",
            duration: "3 Nights / 4 Days",
            start: "Delhi",
            end: "Delhi",
            destinations: ["Agra", "Ranthambore", "Jaipur"]
        }
    ];

    const itContainer = document.getElementById('itineraries-container');
    if (itContainer) {
        itineraries.forEach(route => {
            const el = document.createElement('div');
            el.className = 'itinerary-card';
            el.tabIndex = 0;
            
            const destHTML = route.destinations.map(d => `<span>${d}</span>`).join('');
            
            el.innerHTML = `
                <h3 class="card-title">${route.name}</h3>
                <div class="itinerary-meta">${route.duration} | ${route.start} ➝ ${route.end}</div>
                <div class="route-stations">
                    ${destHTML}
                </div>
            `;
            itContainer.appendChild(el);
        });
    }

    // 5. Destinations & Experiences
    const destinations = [
        {
            icon: "🏰",
            title: "Agra & Taj Mahal",
            description: "Experience the iconic Taj Mahal, Agra Fort, and a Champagne breakfast overlooking the monument."
        },
        {
            icon: "🐅",
            title: "Ranthambore Safari",
            description: "Thrilling jeep safaris in Ranthambore National Park to spot the elusive Bengal Tiger."
        },
        {
            icon: "🐘",
            title: "Jaipur - The Pink City",
            description: "Explore the Amber Fort, City Palace, and enjoy exclusive elephant polo matches."
        },
        {
            icon: "🌅",
            title: "Varanasi & River Ganges",
            description: "Witness the mesmerizing Ganga Aarti ceremony from a private boat ride at dusk."
        }
    ];

    const destContainer = document.getElementById('destinations-container');
    if (destContainer) {
        destinations.forEach(dest => {
            const el = document.createElement('div');
            el.className = 'dest-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="card-icon" aria-hidden="true">${dest.icon}</div>
                <h3 class="card-title">${dest.title}</h3>
                <p class="card-desc">${dest.description}</p>
            `;
            destContainer.appendChild(el);
        });
    }

    // 6. Dining & Facilities
    const facilities = [
        {
            icon: "🍽️",
            title: "Mayur Mahal & Rang Mahal",
            description: "Two exquisite fine-dining restaurants serving Indian and international cuisines on gold-plated cutlery."
        },
        {
            icon: "🍷",
            title: "Rajah Club & Safari Bar",
            description: "Two dedicated lounge bars offering the finest wines, spirits, and a relaxed club atmosphere."
        },
        {
            icon: "🔔",
            title: "Personal Valet Service",
            description: "A dedicated 24-hour butler assigned to every carriage to cater to all passenger needs."
        },
        {
            icon: "🛡️",
            title: "Modern Safety & Tech",
            description: "Equipped with pneumatic suspension for ride comfort, CCTV cameras, and electronic safes in every cabin."
        }
    ];

    const facContainer = document.getElementById('facilities-container');
    if (facContainer) {
        facilities.forEach(fac => {
            const el = document.createElement('div');
            el.className = 'facility-card';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="card-icon" aria-hidden="true">${fac.icon}</div>
                <h3 class="card-title">${fac.title}</h3>
                <p class="card-desc">${fac.description}</p>
            `;
            facContainer.appendChild(el);
        });
    }

    // 7. Trivia Data
    const facts = [
        "The Maharajas' Express Presidential Suite, spanning an entire carriage, is a first of its kind in international luxury trains.",
        "The train has a total passenger capacity of only 88 guests, ensuring an exclusive and personalized experience.",
        "It features an onboard water filtration plant to provide safe, clean drinking water to all guests."
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
