// Ujjain Explorer JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initAstronomyViz();
    initTimeline();
    initMonuments();
    initTradeMap();
});

function initAstronomyViz() {
    const bg = document.getElementById('astronomy-viz-bg');
    if (!bg) return;
    
    // Create random stars
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        bg.appendChild(star);
    }
}

function initTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;
    
    const events = [
        { date: 'c. 6th Century BCE', title: 'Capital of Avanti', desc: 'Ujjain emerges as the capital of the Avanti kingdom, one of the 16 Mahajanapadas.' },
        { date: 'c. 3rd Century BCE', title: 'Ashoka as Viceroy', desc: 'Mauryan Emperor Ashoka serves as the viceroy of Ujjain before ascending to the throne.' },
        { date: 'c. 4th Century CE', title: 'Gupta Empire Golden Age', desc: 'Under Chandragupta II (Vikramaditya), Ujjain becomes a flourishing center of art, literature, and science, home to the Navaratnas including Kalidasa.' },
        { date: 'c. 6th-7th Century CE', title: 'Center of Astronomy', desc: 'Brahmagupta and later Bhaskaracharya (12th C) write foundational treatises on mathematics and astronomy here.' },
        { date: '1235 CE', title: 'Invasion by Iltutmish', desc: 'The city faces destruction during the Delhi Sultanate invasion, but eventually rebuilds.' },
        { date: '18th Century CE', title: 'Maratha Revival', desc: 'The Scindia dynasty takes control, restoring temples including the Mahakaleshwar Jyotirlinga, and Jai Singh II builds the Vedh Shala observatory.' }
    ];
    
    events.forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.classList.add('timeline-event');
        eventEl.innerHTML = `
            <span class="timeline-date">${event.date}</span>
            <h3 class="timeline-title">${event.title}</h3>
            <p class="timeline-desc">${event.desc}</p>
        `;
        timelineContainer.appendChild(eventEl);
    });
}

function initMonuments() {
    const monumentExplorer = document.getElementById('monument-explorer');
    if (!monumentExplorer) return;
    
    const monuments = [
        { name: 'Mahakaleshwar Jyotirlinga', desc: 'One of the 12 Jyotirlingas, a major pilgrimage site rebuilt extensively during the Maratha period.' },
        { name: 'Vedh Shala (Jantar Mantar)', desc: 'An 18th-century observatory built by Maharaja Jai Singh II to measure time and celestial movements.' },
        { name: 'Kalideh Palace', desc: 'Situated on an island in the Kshipra river, showing Persian architectural influences from the Mandu Sultans.' },
        { name: 'Bhartrihari Caves', desc: 'Ancient caves where the stepbrother of King Vikramaditya is said to have meditated.' }
    ];
    
    monuments.forEach(mon => {
        const monEl = document.createElement('div');
        monEl.classList.add('monument-card');
        monEl.innerHTML = `
            <h3>${mon.name}</h3>
            <p>${mon.desc}</p>
        `;
        monumentExplorer.appendChild(monEl);
    });
}

function initTradeMap() {
    const svg = document.getElementById('trade-map-svg');
    if (!svg) return;
    
    // Simplistic SVG map for representation
    const mapData = {
        cities: [
            { id: 'ujjain', name: 'Ujjain', x: 350, y: 250, r: 8 },
            { id: 'mathura', name: 'Mathura', x: 350, y: 150, r: 5 },
            { id: 'pataliputra', name: 'Pataliputra', x: 550, y: 180, r: 6 },
            { id: 'bharuch', name: 'Bharuch (Barygaza)', x: 200, y: 300, r: 6 },
            { id: 'pratishthana', name: 'Pratishthana (Paithan)', x: 320, y: 380, r: 5 }
        ],
        routes: [
            { from: 'ujjain', to: 'mathura' },
            { from: 'ujjain', to: 'bharuch' },
            { from: 'ujjain', to: 'pratishthana' },
            { from: 'mathura', to: 'pataliputra' }
        ]
    };
    
    // Draw Routes
    mapData.routes.forEach(route => {
        const fromCity = mapData.cities.find(c => c.id === route.from);
        const toCity = mapData.cities.find(c => c.id === route.to);
        if (fromCity && toCity) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromCity.x);
            line.setAttribute('y1', fromCity.y);
            line.setAttribute('x2', toCity.x);
            line.setAttribute('y2', toCity.y);
            line.classList.add('trade-route');
            svg.appendChild(line);
        }
    });
    
    // Draw Cities
    mapData.cities.forEach(city => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', city.x);
        circle.setAttribute('cy', city.y);
        circle.setAttribute('r', city.r);
        circle.classList.add('city-node');
        
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', city.x + 10);
        label.setAttribute('y', city.y + 4);
        label.classList.add('city-label');
        label.textContent = city.name;
        
        svg.appendChild(circle);
        svg.appendChild(label);
    });
}
