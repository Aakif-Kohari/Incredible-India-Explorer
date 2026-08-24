document.addEventListener('DOMContentLoaded', () => {
    
    // Timeline Data
    const timelineData = [
        {
            year: '1932',
            title: 'The Birth of Tata Airlines',
            description: 'J.R.D. Tata piloted the first flight from Karachi to Bombay in a single-engine De Havilland Puss Moth, carrying mail.',
            route: 'Karachi → Ahmedabad → Bombay',
            showRoute: true
        },
        {
            year: '1946',
            title: 'Air India & The Maharaja',
            description: 'Tata Airlines becomes a public limited company under the name Air India. The iconic Maharaja mascot is born.',
            route: '',
            showRoute: false
        },
        {
            year: '1948',
            title: 'First International Flight',
            description: 'A Lockheed Constellation L-749 named "Malabar Princess" took off from Bombay to London, marking India\'s first international flight.',
            route: 'Bombay → Cairo → Geneva → London',
            showRoute: true
        },
        {
            year: '1953',
            title: 'Nationalization',
            description: 'The Government of India passed the Air Corporations Act, nationalizing the carrier as Air India International Limited.',
            route: '',
            showRoute: false
        },
        {
            year: '1960',
            title: 'The Jet Age Begins',
            description: 'Air India enters the jet age with its first Boeing 707, named "Gauri Shankar", becoming the first Asian airline to operate a jet aircraft.',
            route: 'Bombay → London → New York',
            showRoute: true
        },
        {
            year: '1971',
            title: 'The Jumbo Era',
            description: 'Air India receives its first Boeing 747-200, "Emperor Ashoka", introducing a new era of luxury travel with "Palace in the Sky" livery.',
            route: '',
            showRoute: false
        },
        {
            year: '2022',
            title: 'Return to Tata',
            description: 'After 69 years as a government-owned enterprise, Air India is officially handed back to the Tata Group, beginning a massive transformation journey.',
            route: '',
            showRoute: false
        }
    ];

    const timelineEventsContainer = document.getElementById('timeline-events');
    const detailYear = document.getElementById('detail-year');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const routeMap = document.getElementById('route-map');
    const routeInfo = document.getElementById('route-info');
    const timelineDetails = document.getElementById('timeline-details');

    // Initialize timeline
    if (timelineEventsContainer) {
        timelineData.forEach((item, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'timeline-event';
            eventDiv.dataset.index = index;
            
            eventDiv.innerHTML = `
                <div class="event-year">${item.year}</div>
                <div class="event-dot"></div>
            `;
            
            eventDiv.addEventListener('click', () => updateTimelineDetails(index));
            timelineEventsContainer.appendChild(eventDiv);
        });
        
        // Select first item by default
        setTimeout(() => updateTimelineDetails(0), 500);
    }

    function updateTimelineDetails(index) {
        const data = timelineData[index];
        if (!data) return;
        
        // Update active class
        document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
        document.querySelector(`.timeline-event[data-index="${index}"]`).classList.add('active');
        
        // Add subtle animation effect
        timelineDetails.style.opacity = '0';
        timelineDetails.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            detailYear.textContent = data.year;
            detailTitle.textContent = data.title;
            detailDesc.textContent = data.description;
            
            if (data.showRoute) {
                routeInfo.textContent = data.route;
                routeMap.style.display = 'flex';
            } else {
                routeMap.style.display = 'none';
            }
            
            timelineDetails.style.opacity = '1';
            timelineDetails.style.transform = 'translateY(0)';
        }, 300);
    }

    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});
