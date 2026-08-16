// Vaishali Explorer JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initPoliticalVisualizer();
    initTimeline();
    initMonuments();
    initInteractiveMap();
});

// 1. Political System Visualizer Logic
function initPoliticalVisualizer() {
    const nodes = document.querySelectorAll('.assembly-node');
    const infoPanel = document.getElementById('assembly-info-panel');
    if (!nodes.length || !infoPanel) return;

    const descriptions = {
        assembly: '<strong>Santhagara (Central Assembly Hall):</strong> The sovereign supreme assembly of Vaishali. It consisted of 7,707 clan chiefs (known as Rajas) who gathered to discuss foreign policy, treaties, war, and internal laws. Decisions were made using voting wood sticks (salakas), representing a remarkably early form of direct ballot democracy.',
        president: '<strong>Ganapramukh (President / Chief Consul):</strong> Elected by the assembly for a set term. The Ganapramukh presided over assembly debates, held chief executive authority, and represented the republic in international negotiations.',
        vp: '<strong>Uparaja (Vice-Consul / Deputy):</strong> Elected by the Rajas to support the Ganapramukh in daily governance, civil administration, and coordinating assembly councils.',
        military: '<strong>Senapati (Commander-in-Chief / General):</strong> Appointed by the assembly to lead the military forces. Responsible for the city fortifications (the triple concentric walls of Vaishali) and defense of the republic against imperial threats like Magadha.',
        treasury: '<strong>Bhandagarika (Chancellor of the Exchequer / Treasurer):</strong> Oversaw taxation, collection of agricultural revenues, trade guild regulations, and financial distributions for civic architecture, roads, and fortifications.'
    };

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            // Remove active classes
            nodes.forEach(n => n.classList.remove('active'));
            
            // Add active to current
            node.classList.add('active');
            
            // Update info panel
            const role = node.dataset.role;
            infoPanel.innerHTML = descriptions[role] || '';
            
            // Smooth focus scroll if on mobile
            if (window.innerWidth < 768) {
                infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

// 2. Historical Timeline Data and Logic
function initTimeline() {
    const timelineContainer = document.getElementById('vaishali-timeline');
    if (!timelineContainer) return;

    const events = [
        {
            date: 'c. 6th Century BCE',
            title: 'Founding of the Vajji Republic',
            desc: 'The Licchavis and neighboring clans unite to establish the Vajji Confederacy, setting up its capital in Vaishali. They build a democratic governance model based on popular assemblies.'
        },
        {
            date: '599 BCE',
            title: 'Birth of Lord Mahavira',
            desc: 'Vardhamana Mahavira is born at Kundagrama, a suburb of Vaishali, to King Siddhartha and Queen Trishala. Vaishali becomes a seminal center of Jain spiritual thought.'
        },
        {
            date: 'c. 483 BCE',
            title: 'Buddha\'s Last Sermon & Relic Division',
            desc: 'Gautama Buddha delivers his final sermon at Vaishali, announcing his upcoming Mahaparinirvana. After his cremation, the Licchavis receive 1/8th of his ashes and build a mud stupa over them.'
        },
        {
            date: '383 BCE',
            title: 'The Second Buddhist Council',
            desc: 'Convened by King Kalasoka in Vaishali to resolve doctrinal disputes regarding monastic rules, cementing Vaishali\'s position as a pillar of early Buddhist history.'
        },
        {
            date: 'c. 250 BCE',
            title: 'Ashoka\'s Inscription & Monolithic Pillar',
            desc: 'Mauryan Emperor Ashoka visits Vaishali, erects the famous polished sandstone pillar topped by a single lion, and builds a brick stupa beside the coronation tank.'
        },
        {
            date: 'c. 4th - 5th Century CE',
            title: 'Gupta Dynasty & Travelogues',
            desc: 'Vaishali continues to flourish under early Gupta administration, but Chinese pilgrim Faxian records its gradual decline. Later, Xuanzang (7th C) describes the city as mostly in ruins.'
        },
        {
            date: '1861 CE',
            title: 'Rediscovery by Alexander Cunningham',
            desc: 'The founder of the Archaeological Survey of India identifies the modern village of Basarh in Bihar as ancient Vaishali, starting scientific excavations.'
        },
        {
            date: '1958 - 1962 CE',
            title: 'Relic Stupa Excavation',
            desc: 'Archaeologist Dr. A. S. Altekar excavates the Relic Stupa and discovers the relic casket containing Buddha\'s ashes, now housed in the Patna Museum.'
        }
    ];

    events.forEach(event => {
        const node = document.createElement('div');
        node.classList.add('timeline-node');
        node.innerHTML = `
            <div class="timeline-node-date">${event.date}</div>
            <h3>${event.title}</h3>
            <p>${event.desc}</p>
        `;
        timelineContainer.appendChild(node);
    });
}

// 3. Monument Explorer Data and Logic
const monumentsData = [
    {
        id: 'ashokan-pillar',
        name: 'Ashokan Lion Pillar',
        type: 'Buddhist / Mauryan',
        category: 'buddhist',
        desc: 'A pristine, single-piece polished sandstone monolithic pillar erected by Emperor Ashoka. Unlike other pillars, it features a single seated lion facing north, the direction Buddha took on his final journey. Beside the pillar sits the Ananda Stupa and a brick Coronation Tank.'
    },
    {
        id: 'relic-stupa',
        name: 'Buddha Relic Stupa',
        type: 'Buddhist / Archaeological',
        category: 'buddhist',
        desc: 'One of the eight original stupas constructed immediately after Buddha\'s death. Archaeological excavations here in 1958 unearthed a sacred grey soapstone relic casket containing cremated remains, conch shells, and punch-marked coins.'
    },
    {
        id: 'coronation-tank',
        name: 'Abhisheka Pushkarini',
        type: 'Archaeological / Vajji',
        category: 'archaeological',
        desc: 'A large ancient pond (reservoir) whose waters were considered sacred. Newly elected representatives (Rajas) of the Licchavi assembly had to bathe in this tank before taking their oaths of office at the Santhagara.'
    },
    {
        id: 'raja-vishal-garh',
        name: 'Raja Vishal ka Garh',
        type: 'Archaeological / Political',
        category: 'archaeological',
        desc: 'A massive fort mound covering over 80 acres, identified as the ancient parliament house of the Vajji Republic. Excavations uncovered brick ramparts, ring wells, and early historic pottery from the Mauryan and Shunga eras.'
    },
    {
        id: 'kundagram',
        name: 'Kundalpur (Kundagram)',
        type: 'Jain / Spiritual',
        category: 'jain',
        desc: 'Located close to main Vaishali, this site is historically identified as the birthplace of Lord Mahavira, the founder of modern Jainism. A beautiful temple stands here commemorating his birth and teachings.'
    }
];

function initMonuments() {
    const grid = document.getElementById('vaishali-monument-grid');
    if (!grid) return;

    monumentsData.forEach(mon => {
        const card = document.createElement('div');
        card.classList.add('monument-explore-card');
        
        let themeClass = 'arch-theme';
        if (mon.category === 'buddhist') themeClass = 'buddhist-theme';
        if (mon.category === 'jain') themeClass = 'jain-theme';
        
        card.classList.add(themeClass);
        card.setAttribute('data-id', mon.id);

        card.innerHTML = `
            <span class="monument-type">${mon.type}</span>
            <h3>${mon.name}</h3>
            <p>${mon.desc}</p>
        `;
        
        card.addEventListener('click', () => {
            // Highlight marker on map
            highlightMapMarker(mon.id);
        });

        grid.appendChild(card);
    });
}

// 4. Interactive Map Logic
const mapPins = [
    { id: 'relic-stupa', name: 'Buddha Relic Stupa', x: 330, y: 150, category: 'buddhist' },
    { id: 'ashokan-pillar', name: 'Ashokan Lion Pillar', x: 420, y: 120, category: 'buddhist' },
    { id: 'coronation-tank', name: 'Coronation Tank', x: 440, y: 200, category: 'archaeological' },
    { id: 'raja-vishal-garh', name: 'Raja Vishal ka Garh', x: 550, y: 250, category: 'archaeological' },
    { id: 'kundagram', name: 'Kundalpur (Mahavira Birthplace)', x: 260, y: 340, category: 'jain' }
];

function initInteractiveMap() {
    const svg = document.getElementById('vaishali-svg-map');
    const markerDetails = document.getElementById('map-marker-details');
    const controls = document.querySelectorAll('.map-layer-btn');
    if (!svg || !markerDetails) return;

    // Render SVG Map Pins
    mapPins.forEach(pin => {
        const color = pin.category === 'buddhist' ? '#eab308' : (pin.category === 'jain' ? '#a855f7' : '#3b82f6');
        
        // Group for marker and label
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', `map-marker ${pin.category}`);
        group.setAttribute('id', `marker-${pin.id}`);
        group.style.setProperty('--marker-glow', color);

        // Pulse Ring
        const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulse.setAttribute('cx', pin.x);
        pulse.setAttribute('cy', pin.y);
        pulse.setAttribute('r', 8);
        pulse.setAttribute('fill', 'none');
        pulse.setAttribute('stroke', color);
        pulse.setAttribute('stroke-width', 2);
        pulse.setAttribute('class', 'map-marker-pulse');
        
        // Solid Center Circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pin.x);
        circle.setAttribute('cy', pin.y);
        circle.setAttribute('r', 7);
        circle.setAttribute('fill', color);

        // Label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', pin.x + 12);
        label.setAttribute('y', pin.y + 4);
        label.setAttribute('fill', '#fff');
        label.setAttribute('font-size', '11');
        label.setAttribute('font-family', '"Outfit", sans-serif');
        label.setAttribute('font-weight', '500');
        label.textContent = pin.name;

        group.appendChild(pulse);
        group.appendChild(circle);
        group.appendChild(label);
        
        group.addEventListener('click', () => {
            selectMarker(pin.id);
        });

        svg.appendChild(group);
    });

    // Layer Filtering Logic
    controls.forEach(btn => {
        btn.addEventListener('click', () => {
            controls.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.layer;
            const markers = svg.querySelectorAll('.map-marker');
            
            markers.forEach(marker => {
                if (filter === 'all' || marker.classList.contains(filter)) {
                    marker.style.opacity = '1';
                    marker.style.pointerEvents = 'auto';
                } else {
                    marker.style.opacity = '0.15';
                    marker.style.pointerEvents = 'none';
                }
            });
        });
    });
}

function selectMarker(id) {
    const details = document.getElementById('map-marker-details');
    const mon = monumentsData.find(m => m.id === id);
    if (!mon || !details) return;

    // Highlight map marker group
    const svg = document.getElementById('vaishali-svg-map');
    svg.querySelectorAll('.map-marker').forEach(m => m.classList.remove('highlighted-pin'));
    document.getElementById(`marker-${id}`)?.classList.add('highlighted-pin');

    // Update Details Box
    const icon = mon.category === 'buddhist' ? '☸️' : (mon.category === 'jain' ? '💎' : '🏛️');
    details.innerHTML = `
        <div style="text-align: left;">
            <h4 style="margin: 0 0 6px; color: var(--vai-gold); font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                <span>${icon}</span> ${mon.name}
            </h4>
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.45; color: var(--vai-text);">${mon.desc}</p>
        </div>
    `;

    // Highlight card in explorer grid
    const cards = document.querySelectorAll('.monument-explore-card');
    cards.forEach(c => c.classList.remove('active-card'));
    const activeCard = document.querySelector(`.monument-explore-card[data-id="${id}"]`);
    if (activeCard) {
        activeCard.classList.add('active-card');
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function highlightMapMarker(id) {
    selectMarker(id);
    document.querySelector('.interactive-map-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
