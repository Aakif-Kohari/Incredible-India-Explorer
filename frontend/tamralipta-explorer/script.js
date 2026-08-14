// Tamralipta Explorer JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initCoastlineViz();
    initRiverCompare();
    initTimeline();
    initTradeMap();
});

function initCoastlineViz() {
    const bg = document.getElementById('coastline-viz-bg');
    if (!bg) return;
    
    const svgHTML = `
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style="width: 100%; height: 100%;">
        <path fill="#0083b0" fill-opacity="0.3" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        <path fill="#00b4db" fill-opacity="0.5" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>`;
    
    bg.innerHTML = svgHTML;
}

function initRiverCompare() {
    const btn = document.getElementById('toggle-river-btn');
    const ancientMap = document.querySelector('.ancient-map');
    const modernMap = document.querySelector('.modern-map');
    
    if (!btn || !ancientMap || !modernMap) return;
    
    let isAncient = true;
    
    btn.addEventListener('click', () => {
        if (isAncient) {
            ancientMap.classList.remove('active');
            modernMap.classList.add('active');
            btn.textContent = 'Toggle Ancient View';
        } else {
            modernMap.classList.remove('active');
            ancientMap.classList.add('active');
            btn.textContent = 'Toggle Modern View';
        }
        isAncient = !isAncient;
    });
}

function initTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;
    
    const events = [
        { date: '3rd Century BCE', title: 'Mauryan Era Port', desc: 'Tamralipta flourishes as a prominent eastern port under Ashoka, facilitating trade and the spread of Buddhism.' },
        { date: '5th Century CE', title: 'Fa-Hien\'s Visit', desc: 'Chinese pilgrim Fa-Hien visits, describing the port with 24 Buddhist monasteries and documenting its maritime links to Sri Lanka.' },
        { date: '7th Century CE', title: 'Xuanzang and I-Tsing', desc: 'Xuanzang notes its commercial wealth and agricultural richness. I-Tsing arrives by sea from China via Srivijaya.' },
        { date: '8th-12th Century CE', title: 'Pala & Sena Dynasties', desc: 'Continued trade dominance with Southeast Asia, evidenced by rich archaeological finds of pottery and coins.' },
        { date: 'Post-12th Century CE', title: 'Port Decline', desc: 'Siltation of the Rupnarayan river and shifting coastlines gradually render the port inaccessible to large ships, leading to its decline.' }
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

function initTradeMap() {
    const svg = document.getElementById('trade-map-svg');
    if (!svg) return;
    
    // Simplistic SVG map representing the Bay of Bengal network
    const mapData = {
        ports: [
            { id: 'tamralipta', name: 'Tamralipta', x: 200, y: 100, r: 8 },
            { id: 'srilanka', name: 'Sri Lanka (Tamraparni)', x: 150, y: 350, r: 6 },
            { id: 'suvarnabhumi', name: 'Suvarnabhumi (SE Asia)', x: 600, y: 250, r: 7 },
            { id: 'china', name: 'China (Guangzhou)', x: 750, y: 100, r: 6 }
        ],
        routes: [
            { from: 'tamralipta', to: 'srilanka' },
            { from: 'tamralipta', to: 'suvarnabhumi' },
            { from: 'srilanka', to: 'suvarnabhumi' },
            { from: 'suvarnabhumi', to: 'china' }
        ]
    };
    
    // Draw Routes
    mapData.routes.forEach(route => {
        const fromPort = mapData.ports.find(p => p.id === route.from);
        const toPort = mapData.ports.find(p => p.id === route.to);
        if (fromPort && toPort) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromPort.x);
            line.setAttribute('y1', fromPort.y);
            line.setAttribute('x2', toPort.x);
            line.setAttribute('y2', toPort.y);
            line.classList.add('maritime-route');
            svg.appendChild(line);
        }
    });
    
    // Draw Ports
    mapData.ports.forEach(port => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', port.x);
        circle.setAttribute('cy', port.y);
        circle.setAttribute('r', port.r);
        circle.classList.add('port-node');
        
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', port.x + 12);
        label.setAttribute('y', port.y + 5);
        label.classList.add('port-label');
        label.textContent = port.name;
        
        svg.appendChild(circle);
        svg.appendChild(label);
    });
}
