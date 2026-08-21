/**
 * Eco-Tourism National Parks & Wildlife Hub JS Logic
 * Pure Vanilla JavaScript implementation adhering to repository architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    initWildlifeData();
    initWildlifeMap();
    initWildlifeTimeline();
    setupEventListeners();
});

// National Parks & Reserves Dataset
const PARKS_DATA = [
    {
        id: 'jim-corbett-np',
        name: 'Jim Corbett National Park',
        ecosystem: 'Tiger Reserve',
        state: 'Uttarakhand',
        location: 'Ramnagar, Nainital District',
        status: 'Project Tiger #1 (1973)',
        bestTime: 'Nov - June',
        img: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=800&auto=format&fit=crop',
        desc: 'India\'s oldest national park nestled in the Himalayan foothills, world-famous for Royal Bengal Tigers, wild Asian elephants, and Dhikala grasslands.',
        lat: 29.5300,
        lng: 78.7747,
        hubName: 'Dhikala & Bijrani Safari Gates',
        fauna: ['Royal Bengal Tiger', 'Asian Elephant', 'Gharial Crocodile', 'Sambar Deer'],
        history: 'Established in 1936 as Hailey National Park, renamed after legendary hunter-turned-conservationist Jim Corbett.'
    },
    {
        id: 'kaziranga-np',
        name: 'Kaziranga National Park',
        ecosystem: 'Grassland & Wetlands',
        state: 'Assam',
        location: 'Golaghat & Nagaon',
        status: 'UNESCO World Heritage',
        bestTime: 'Nov - April',
        img: 'https://images.unsplash.com/photo-1581852017103-68accd5509b7?q=80&w=800&auto=format&fit=crop',
        desc: 'Home to two-thirds of the world\'s Great Indian One-Horned Rhinoceros, featuring fertile Brahmaputra tall elephant grass swamps.',
        lat: 26.5775,
        lng: 93.1711,
        hubName: 'Kohora & Bagori Range Gates',
        fauna: ['One-Horned Rhinoceros', 'Wild Water Buffalo', 'Eastern Swam Deer (Barasingha)', 'Capped Langur'],
        history: 'Declared a protected reserve in 1905 by Lord Curzon after Mary Curzon requested rhino conservation efforts.'
    },
    {
        id: 'gir-np',
        name: 'Gir National Park & Sanctuary',
        ecosystem: 'Dry Deciduous & Scrub',
        state: 'Gujarat',
        location: 'Junagadh & Sasan Gir',
        status: 'Sole Asiatic Lion Habitat',
        bestTime: 'Dec - April',
        img: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=800&auto=format&fit=crop',
        desc: 'The last refuge of the endangered Asiatic Lion in the wild, surrounded by teak forests, rocky ridges, and Maldhari tribal settlements.',
        lat: 21.1243,
        lng: 70.8242,
        hubName: 'Sasan Gir Orientation Center',
        fauna: ['Asiatic Lion', 'Indian Leopard', 'Chowsingha (4-Horned Antelope)', 'Chinkara Gazelle'],
        history: 'Saved from near-extinction by the Nawab of Junagadh in 1900 when lion numbers fell below 20 individuals.'
    },
    {
        id: 'hemis-high-altitude-np',
        name: 'Hemis High Altitude National Park',
        ecosystem: 'High Altitude Alpine',
        state: 'Ladakh',
        location: 'Leh District, Trans-Himalayas',
        status: 'Snow Leopard Capital',
        bestTime: 'May - Sept / Winter Trek',
        img: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=800&auto=format&fit=crop',
        desc: 'India\'s largest national park located north of the Himalayas, home to the world\'s highest density of wild Snow Leopards.',
        lat: 33.9870,
        lng: 77.5670,
        hubName: 'Rumbak Valley Trek Trail',
        fauna: ['Snow Leopard (Shan)', 'Bharal (Blue Sheep)', 'Tibetan Wolf', 'Eurasian Brown Bear'],
        history: 'Established in 1981 to protect fragile trans-Himalayan high-altitude alpine ecosystems above 3,000m.'
    },
    {
        id: 'sundarbans-np',
        name: 'Sundarbans National Park',
        ecosystem: 'Mangrove Forest',
        state: 'West Bengal',
        location: 'Ganges Delta, South 24 Parganas',
        status: 'UNESCO World Heritage',
        bestTime: 'Sept - March',
        img: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=800&auto=format&fit=crop',
        desc: 'The world\'s largest halophytic mangrove forest, renowned for amphibious tiger telemetry, saltwater crocodiles, and estuarine turtles.',
        lat: 21.9497,
        lng: 88.9007,
        hubName: 'Sajnekhali & Dobanki Watchtowers',
        fauna: ['Swimming Royal Bengal Tiger', 'Estuarine Saltwater Crocodile', 'Irrawaddy Dolphin', 'Batagur Baska Turtle'],
        history: 'Declared a National Park in 1984 and a UNESCO Biosphere Reserve in 1989 due to unique deltaic biodiversity.'
    },
    {
        id: 'periyar-tiger-reserve',
        name: 'Periyar National Park & Wildlife Sanctuary',
        ecosystem: 'Tiger Reserve',
        state: 'Kerala',
        location: 'Thekkady, Western Ghats',
        status: 'Project Elephant & Tiger',
        bestTime: 'Oct - May',
        img: 'https://images.unsplash.com/photo-1581852017103-68accd5509b7?q=80&w=800&auto=format&fit=crop',
        desc: 'Picturesque bio-reserve in the Cardamom Hills surrounding artificial Periyar Lake, famous for boat safaris and wild elephant herds.',
        lat: 9.4679,
        lng: 77.1435,
        hubName: 'Thekkady Boat Landing & Bamboo Rafting',
        fauna: ['Asian Elephant', 'Royal Bengal Tiger', 'Nilgiri Langur', 'Malabar Giant Squirrel'],
        history: 'Formed in 1934 as Neliyampatty Sanctuary by the Maharaja of Travancore Chithira Thirunal Balarama Varma.'
    }
];

// Timeline Dataset
const WILDLIFE_TIMELINE = [
    {
        era: '3rd Century BCE',
        title: 'Asokan Edicts & Earliest Animal Laws',
        desc: 'Emperor Asoka carved Pillar Edicts prohibiting animal slaughter and establishing protected forest sanctuaries.'
    },
    {
        era: '1936 CE',
        title: 'Hailey National Park (Corbett)',
        desc: 'India\'s first national park established in the United Provinces, pioneering modern national reserve legislation.'
    },
    {
        era: '1973 CE',
        title: 'Launch of Project Tiger',
        desc: 'Government of India launched Project Tiger from Jim Corbett, establishing 9 initial tiger reserves to halt extinction.'
    },
    {
        era: 'Modern Era',
        title: '55 Tiger Reserves & GPS Collar Telemetry',
        desc: 'Over 3,682 tigers recorded in 2023 census, smart camera trap monitoring, and eco-sensitive corridor protection.'
    }
];

let map = null;

function initWildlifeData() {
    renderParks(PARKS_DATA);
}

function renderParks(parks) {
    const container = document.getElementById('parks-grid-container');
    if (!container) return;

    if (parks.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">
                <i class="fa-solid fa-tree" style="font-size: 2.5rem; margin-bottom: 12px; color: #ff9933;"></i>
                <p>No national parks found matching your search query.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = parks.map(p => `
        <div class="park-card">
            <div class="park-img-wrapper">
                <img src="${p.img}" alt="${p.name}" class="park-img" loading="lazy">
                <span class="park-eco-tag"><i class="fa-solid fa-mountain-sun"></i> ${p.ecosystem}</span>
                <span class="park-status-badge">${p.status}</span>
            </div>
            <div class="park-content">
                <h3 class="park-title">${p.name}</h3>
                <span class="park-location"><i class="fa-solid fa-location-dot"></i> ${p.hubName}</span>
                <p class="park-desc">${p.desc}</p>
                <div class="park-footer">
                    <span class="park-best-time"><i class="fa-solid fa-calendar-check"></i> ${p.bestTime}</span>
                    <button class="btn-view-park" onclick="openWildlifeModal('${p.id}')">View Safari Guide</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initWildlifeMap() {
    const mapContainer = document.getElementById('wildlife-map-container');
    if (!mapContainer || typeof L === 'undefined') return;

    map = L.map('wildlife-map-container').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PARKS_DATA.forEach(p => {
        const marker = L.marker([p.lat, p.lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: sans-serif; color: #000; padding: 4px;">
                <h4 style="margin: 0 0 4px 0; color: #ff9933;">${p.name}</h4>
                <p style="margin: 0 0 6px 0; font-size: 12px;"><b>Gate:</b> ${p.hubName}</p>
                <p style="margin: 0; font-size: 11px; color: #555;"><b>Status:</b> ${p.status}</p>
            </div>
        `);
    });
}

function initWildlifeTimeline() {
    const container = document.getElementById('wildlife-timeline-container');
    if (!container) return;

    container.innerHTML = WILDLIFE_TIMELINE.map((item, index) => `
        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
                <div class="timeline-era">${item.era}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-text">${item.desc}</p>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    const searchInput = document.getElementById('wildlife-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterParks();
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterParks();
        });
    });

    const modalClose = document.getElementById('wildlife-modal-close-btn');
    const modal = document.getElementById('wildlife-modal');
    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

function filterParks() {
    const searchVal = (document.getElementById('wildlife-search-input')?.value || '').toLowerCase();
    const activeEcosystem = document.querySelector('.filter-btn.active')?.dataset.ecosystem || 'all';

    const filtered = PARKS_DATA.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal) ||
                              p.desc.toLowerCase().includes(searchVal) ||
                              p.hubName.toLowerCase().includes(searchVal) ||
                              p.state.toLowerCase().includes(searchVal);
        const matchesEco = activeEcosystem === 'all' || p.ecosystem === activeEcosystem;
        return matchesSearch && matchesEco;
    });

    renderParks(filtered);
}

window.openWildlifeModal = function(id) {
    const p = PARKS_DATA.find(item => item.id === id);
    if (!p) return;

    const bodyContainer = document.getElementById('wildlife-modal-body-container');
    const modal = document.getElementById('wildlife-modal');
    if (!bodyContainer || !modal) return;

    bodyContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${p.img}" alt="${p.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 16px; margin-bottom: 16px;">
            <span style="display: inline-block; padding: 4px 12px; background: rgba(255,153,51,0.2); color: #ff9933; border-radius: 12px; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">${p.state} • ${p.status}</span>
            <h2 style="font-size: 1.8rem; color: #fff; margin-bottom: 6px;">${p.name}</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">${p.hubName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #facc15; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-paw"></i> Key Wildlife Species</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${p.fauna.map(f => `<span style="padding: 4px 10px; background: rgba(255,255,255,0.08); color: #cbd5e1; border-radius: 8px; font-size: 0.85rem;">${f}</span>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #34d399; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-book-open"></i> Conservation History & Bio-Corridor</h4>
            <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6;">${p.history}</p>
        </div>
    `;

    modal.classList.add('active');
};
