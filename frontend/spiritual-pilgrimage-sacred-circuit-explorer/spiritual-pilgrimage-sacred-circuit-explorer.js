/**
 * Spiritual Pilgrimage & Sacred Circuit Explorer JS Logic
 * Pure Vanilla JavaScript implementation adhering to repository architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    initPilgrimageData();
    initPilgrimageMap();
    initPilgrimageTimeline();
    setupEventListeners();
});

// Sacred Circuit Dataset
const PILGRIMAGE_DATA = [
    {
        id: 'kedarnath-dham',
        name: 'Kedarnath Temple & Yatra',
        tradition: 'Hinduism',
        circuit: 'Char Dham & 12 Jyotirlingas',
        state: 'Uttarakhand',
        location: 'Rudraprayag, Garhwal Himalayas',
        altitude: '3,583m (11,755ft)',
        duration: '4 - 6 Days',
        img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop',
        desc: 'Revered Shiva shrine nestled near the Chorabari Glacier, forming the centerpiece of the Himalayan Chota Char Dham Yatra.',
        lat: 30.7352,
        lng: 79.0669,
        hubName: 'Kedarnath Valley & Gaurikund Trek Trail',
        keyHighlights: ['Mandakini River Confluence', 'Bhairavnath Temple', '16km Mountain Trek', 'Ancient Stone Architecture'],
        history: 'Believed to have been originally built by the Pandavas and revived by Adi Shankaracharya in the 8th century CE.'
    },
    {
        id: 'bodh-gaya',
        name: 'Bodh Gaya Mahabodhi Temple',
        tradition: 'Buddhism',
        circuit: 'Buddhist Sacred Trail',
        state: 'Bihar',
        location: 'Gaya, Bihar',
        altitude: '112m (367ft)',
        duration: '2 - 3 Days',
        img: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=800&auto=format&fit=crop',
        desc: 'UNESCO World Heritage site where Siddhartha Gautama attained Supreme Enlightenment (Bodhi) beneath the sacred Bodhi Tree.',
        lat: 24.6960,
        lng: 84.9914,
        hubName: 'Mahabodhi Complex & International Monasteries',
        keyHighlights: ['Sacred Bodhi Tree', 'Vajrasana (Diamond Throne)', '80-ft Great Buddha Statue', 'Muchalinda Lake'],
        history: 'First temple built by Emperor Ashoka in the 3rd century BCE to commemorate Gautama Buddha\'s enlightenment.'
    },
    {
        id: 'golden-temple',
        name: 'Sri Harmandir Sahib (Golden Temple)',
        tradition: 'Sikhism',
        circuit: 'Sikh Takht Pilgrimage',
        state: 'Punjab',
        location: 'Amritsar, Punjab',
        altitude: '234m (768ft)',
        duration: '1 - 2 Days',
        img: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?q=80&w=800&auto=format&fit=crop',
        desc: 'The holiest Gurdwara of Sikhism surrounded by the Amrit Sarovar (Pool of Nectar), famous for 24/7 Guru ka Langar serving thousands daily.',
        lat: 31.6200,
        lng: 74.8765,
        hubName: 'Amritsar Heritage Street & Sarovar',
        keyHighlights: ['Amrit Sarovar', 'Akal Takht', 'Gold Leaf Foil Dome', 'World\'s Largest Community Kitchen'],
        history: 'Designed by Guru Arjan Dev in 1589 who invited Sufi saint Mian Mir to lay its foundation stone.'
    },
    {
        id: 'ajmer-sharif',
        name: 'Dargah Ajmer Sharif',
        tradition: 'Sufism',
        circuit: 'Sufi Spiritual Corridor',
        state: 'Rajasthan',
        location: 'Ajmer, Rajasthan',
        altitude: '486m (1,594ft)',
        duration: '1 - 2 Days',
        img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop',
        desc: 'Revered Sufi shrine of saint Khwaja Moinuddin Chishti, attracting millions of multi-faith devotees seeking spiritual peace.',
        lat: 26.4560,
        lng: 74.6283,
        hubName: 'Taragarh Hill Footsteps, Ajmer',
        keyHighlights: ['Buland Darwaza', 'Mehfil Khana', 'Giant Degs (Cooking Cauldrons)', 'Qawwali Courtyard'],
        history: 'Established in the 13th century, patronized by Mughal emperors Akbar and Shah Jahan.'
    },
    {
        id: 'varanasi-kashi',
        name: 'Kashi Vishwanath & Ganga Ghats',
        tradition: 'Hinduism',
        circuit: '12 Jyotirlingas & Panchkroshi',
        state: 'Uttar Pradesh',
        location: 'Varanasi, UP',
        altitude: '81m (266ft)',
        duration: '2 - 4 Days',
        img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop',
        desc: 'The spiritual heart of India located on the banks of the sacred Ganges, famous for the Kashi Vishwanath corridor and evening Ganga Aarti.',
        lat: 25.3109,
        lng: 83.0107,
        hubName: 'Dashashwamedh & Manikarnika Ghats, Varanasi',
        keyHighlights: ['Kashi Vishwanath Corridor', 'Ganga Aarti Telemetry', 'Boat Ride at Dawn', 'Ancient Ghat Architecture'],
        history: 'One of the world\'s oldest continuously inhabited cities, celebrated in Vedic scriptures as the abode of Lord Shiva.'
    },
    {
        id: 'palitana-jain',
        name: 'Palitana Shatrunjaya Temples',
        tradition: 'Jainism',
        circuit: 'Jain Holy Tirthas',
        state: 'Gujarat',
        location: 'Palitana, Bhavnagar',
        altitude: '603m (1,978ft)',
        duration: '2 Days',
        img: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=800&auto=format&fit=crop',
        desc: 'The world\'s only mountain with over 860 marble-carved Jain temples, dedicated to Lord Rishabhdev on Shatrunjaya Hill.',
        lat: 21.5222,
        lng: 71.8322,
        hubName: 'Shatrunjaya Sacred Hill Trail',
        keyHighlights: ['3,800 Marble Steps Trek', 'Adishwar Temple', 'Pure White Carved Marble', 'Sun-lit Temple Complex'],
        history: 'Constructed over 900 years starting from the 11th century by generations of Jain devotees and guilds.'
    }
];

// Timeline Dataset
const PILGRIMAGE_TIMELINE = [
    {
        era: '1500 BCE - 500 BCE',
        title: 'Vedic Scriptures & River Reverence',
        desc: 'Rigvedic hymns venerating the Indus and Saraswati rivers, laying the foundation for sacred confluences (Prayags).'
    },
    {
        era: '6th Century BCE',
        title: 'Dawn of Buddhism & Jainism',
        desc: 'Gautama Buddha\'s enlightenment at Bodh Gaya and Lord Mahavira\'s teachings establishing non-violence pilgrim trails.'
    },
    {
        era: '8th Century CE',
        title: 'Adi Shankaracharya\'s Char Dham Establishment',
        desc: 'Unification of India\'s four cardinal corners—Badrinath, Dwarka, Puri, and Rameswaram—into the sacred Char Dham Yatra.'
    },
    {
        era: '13th - 17th Century',
        title: 'Bhakti & Sufi Spiritual Convergence',
        desc: 'Rise of multi-faith pilgrimage shrines, Sikh Takht Gurdwaras, and Chishti Sufi Dargahs fostering inter-faith harmony.'
    }
];

let map = null;

function initPilgrimageData() {
    renderCircuits(PILGRIMAGE_DATA);
}

function renderCircuits(circuits) {
    const container = document.getElementById('circuits-grid-container');
    if (!container) return;

    if (circuits.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">
                <i class="fa-solid fa-om" style="font-size: 2.5rem; margin-bottom: 12px; color: #ff9933;"></i>
                <p>No sacred pilgrimage destinations found matching your search query.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = circuits.map(c => `
        <div class="circuit-card">
            <div class="circuit-img-wrapper">
                <img src="${c.img}" alt="${c.name}" class="circuit-img" loading="lazy">
                <span class="circuit-trad-tag"><i class="fa-solid fa-place-of-worship"></i> ${c.tradition}</span>
                <span class="circuit-alt-badge">${c.altitude}</span>
            </div>
            <div class="circuit-content">
                <h3 class="circuit-title">${c.name}</h3>
                <span class="circuit-location"><i class="fa-solid fa-location-dot"></i> ${c.hubName}</span>
                <p class="circuit-desc">${c.desc}</p>
                <div class="circuit-footer">
                    <span class="circuit-duration"><i class="fa-solid fa-clock"></i> ${c.duration}</span>
                    <button class="btn-view-circuit" onclick="openPilgrimageModal('${c.id}')">View Yatra Guide</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initPilgrimageMap() {
    const mapContainer = document.getElementById('pilgrimage-map-container');
    if (!mapContainer || typeof L === 'undefined') return;

    map = L.map('pilgrimage-map-container').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    PILGRIMAGE_DATA.forEach(c => {
        const marker = L.marker([c.lat, c.lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: sans-serif; color: #000; padding: 4px;">
                <h4 style="margin: 0 0 4px 0; color: #ff9933;">${c.name}</h4>
                <p style="margin: 0 0 6px 0; font-size: 12px;"><b>Circuit:</b> ${c.circuit}</p>
                <p style="margin: 0; font-size: 11px; color: #555;"><b>Tradition:</b> ${c.tradition}</p>
            </div>
        `);
    });
}

function initPilgrimageTimeline() {
    const container = document.getElementById('pilgrimage-timeline-container');
    if (!container) return;

    container.innerHTML = PILGRIMAGE_TIMELINE.map((item, index) => `
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
    const searchInput = document.getElementById('pilgrimage-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterCircuits();
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterCircuits();
        });
    });

    const modalClose = document.getElementById('pilgrimage-modal-close-btn');
    const modal = document.getElementById('pilgrimage-modal');
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

function filterCircuits() {
    const searchVal = (document.getElementById('pilgrimage-search-input')?.value || '').toLowerCase();
    const activeTradition = document.querySelector('.filter-btn.active')?.dataset.tradition || 'all';

    const filtered = PILGRIMAGE_DATA.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchVal) ||
                              c.desc.toLowerCase().includes(searchVal) ||
                              c.hubName.toLowerCase().includes(searchVal) ||
                              c.state.toLowerCase().includes(searchVal);
        const matchesTradition = activeTradition === 'all' || c.tradition === activeTradition;
        return matchesSearch && matchesTradition;
    });

    renderCircuits(filtered);
}

window.openPilgrimageModal = function(id) {
    const c = PILGRIMAGE_DATA.find(item => item.id === id);
    if (!c) return;

    const bodyContainer = document.getElementById('pilgrimage-modal-body-container');
    const modal = document.getElementById('pilgrimage-modal');
    if (!bodyContainer || !modal) return;

    bodyContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${c.img}" alt="${c.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 16px; margin-bottom: 16px;">
            <span style="display: inline-block; padding: 4px 12px; background: rgba(255,153,51,0.2); color: #ff9933; border-radius: 12px; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">${c.state} • ${c.circuit}</span>
            <h2 style="font-size: 1.8rem; color: #fff; margin-bottom: 6px;">${c.name}</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">${c.hubName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #ffd700; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-star"></i> Key Spiritual Highlights</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${c.keyHighlights.map(h => `<span style="padding: 4px 10px; background: rgba(255,255,255,0.08); color: #cbd5e1; border-radius: 8px; font-size: 0.85rem;">${h}</span>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #38bdf8; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-book-open"></i> Sacred Origins & Philosophy</h4>
            <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6;">${c.history}</p>
        </div>
    `;

    modal.classList.add('active');
};
