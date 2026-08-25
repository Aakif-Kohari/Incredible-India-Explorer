/**
 * Wellness & Ayurvedic Retreat Health Hub JS Logic
 * Pure Vanilla JavaScript implementation adhering to repository architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    initWellnessData();
    initWellnessMap();
    initWellnessTimeline();
    setupEventListeners();
});

// Wellness Retreats Dataset
const RETREATS_DATA = [
    {
        id: 'kerala-panchakarma',
        name: 'Soukya Ayurvedic Panchakarma Sanctuary',
        discipline: 'Ayurveda',
        state: 'Kerala',
        location: 'Palakkad & Alappuzha Backwaters',
        rating: '⭐ 4.9 (AYUSH Gold)',
        duration: '14 - 21 Days',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
        desc: 'Authentic 5-fold Panchakarma purification retreat combining Abhyanga herbal oil massage, Shirodhara, and organic medicinal cuisine.',
        lat: 10.8505,
        lng: 76.2711,
        hubName: 'Palakkad Ayurvedic Heritage Valley',
        therapies: ['Abhyanga Oil Massage', 'Shirodhara Mind Bath', 'Nasyam Herbal Drops', 'Kizhi Herbal Compress'],
        history: 'Preserving 8th-century Ashta Vaidya traditions of Kerala, practicing classical Sushruta herbal formulations.'
    },
    {
        id: 'rishikesh-yoga-ashram',
        name: 'Parmarth Niketan Himalayan Yoga Ashram',
        discipline: 'Yoga',
        state: 'Uttarakhand',
        location: 'Rishikesh, Ganges Riverfront',
        rating: '⭐ 4.8 (UNESCO Recognized)',
        duration: '7 - 14 Days',
        img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
        desc: 'World-renowned spiritual yoga sanctuary offering classical Hatha, Ashtanga Vinyasa, Pranayama, and sunset Ganga Aarti meditation.',
        lat: 30.1166,
        lng: 78.3185,
        hubName: 'Swarg Ashram & Ram Jhula Corridor',
        therapies: ['Classical Hatha Yoga', 'Chakra Meditation', 'Pranayama Breathwork', 'Sound Bowl Healing'],
        history: 'Founded in 1942 on the sacred banks of the Ganges, establishing Rishikesh as the Yoga Capital of the World.'
    },
    {
        id: 'soukya-holistic-naturopathy',
        name: 'Jindal Naturecure Naturopathy Institute',
        discipline: 'Naturopathy',
        state: 'Karnataka',
        location: 'Bengaluru Suburbs',
        rating: '⭐ 4.7 (NABH Accredited)',
        duration: '7 - 10 Days',
        img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
        desc: 'Drugless holistic healthcare center specializing in hydrotherapy, mud packs, acupuncture, fasting detox, and therapeutic yoga.',
        lat: 13.0489,
        lng: 77.4647,
        hubName: 'Jindal Health Park & Eco Sanctuary',
        therapies: ['Full Body Mud Bath', 'Underwater Hydrotherapy', 'Acupressure Detox', 'Juice Fasting Protocol'],
        history: 'Pioneered non-invasive Naturopathy in South India combining ancient nature-cure laws with modern diagnostic telemetry.'
    },
    {
        id: 'kalaripayattu-marma-healing',
        name: 'Kalaripayattu Marma Therapy Center',
        discipline: 'Siddha',
        state: 'Kerala',
        origin: 'Thiruvananthapuram',
        location: 'Trivandrum Coast',
        rating: '⭐ 4.9 (Traditional Master)',
        duration: '5 - 12 Days',
        img: 'https://images.unsplash.com/photo-1512290900673-3d085954a2a1?q=80&w=800&auto=format&fit=crop',
        desc: 'Ancient martial art neuro-muscular bone alignment and vital point (108 Marma points) manipulation therapy using herbal oils.',
        lat: 8.5241,
        lng: 76.9366,
        hubName: 'Kalari Gurukulam & Healing Pit',
        therapies: ['Uzhichil Foot Massage', 'Marma Point Stimulation', 'Kizhi Herbal Poultice', 'Spinal Realignment'],
        history: 'Originated over 3,000 years ago as the battlefield medical recovery system for ancient Kalari warriors.'
    },
    {
        id: 'ananda-in-himalayas',
        name: 'Ananda Himalayan Wellness Palace',
        discipline: 'Ayurveda',
        state: 'Uttarakhand',
        location: 'Narendra Nagar, Tehri Garhwal',
        rating: '⭐ 5.0 (Global Luxury Award)',
        duration: '7 - 21 Days',
        img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
        desc: '100-acre Maharaja estate perched above Rishikesh, delivering bespoke Ayurvedic detox, Vedanta philosophy, and hydrotherapy retreats.',
        lat: 30.1652,
        lng: 78.2911,
        hubName: 'Tehri Garhwal Himalayan Forest Sanctuary',
        therapies: ['Pizhichil Warm Oil Bath', 'Takradhara Cooling Therapy', 'Vedanta Meditation', 'Organic Sattvic Cuisine'],
        history: 'Former palace of the Maharaja of Tehri Garhwal transformed into India\'s premier luxury Ayurvedic retreat.'
    },
    {
        id: 'kaivalyadhama-yoga',
        name: 'Kaivalyadhama Yoga Research Institute',
        discipline: 'Yoga',
        state: 'Maharashtra',
        location: 'Lonavala, Sahyadri Hills',
        rating: '⭐ 4.8 (Ministry of AYUSH)',
        duration: '7 - 14 Days',
        img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
        desc: 'Pioneering scientific yoga institute integrating traditional Patanjali Yoga Sutras with modern laboratory medical research.',
        lat: 18.7547,
        lng: 73.4063,
        hubName: 'Sahyadri Hill Station Campus',
        therapies: ['Shatkarma Kriya Detox', 'Scientific Asana Therapy', 'Yoganidra Relaxation', 'Herbal Naturopathy'],
        history: 'Established in 1924 by Swami Kuvalayananda as the first research center dedicated to scientific validation of Yoga.'
    }
];

// Timeline Dataset
const WELLNESS_TIMELINE = [
    {
        era: '3000 BCE',
        title: 'Vedic Atharvaveda & Herbal Roots',
        desc: 'Earliest recorded medical references to herbal plants, Soma infusions, and pulse diagnostics in ancient Vedic texts.'
    },
    {
        era: '6th Century BCE',
        title: 'Charaka & Sushruta Samhitas',
        desc: 'Codification of internal medicine (Charaka) and plastic/reconstructive surgery with 125 surgical instruments (Sushruta).'
    },
    {
        era: '2nd Century BCE',
        title: 'Patanjali\'s Eight-Limbed Yoga Sutras',
        desc: 'Systematization of Raja Yoga (Asana, Pranayama, Dhyana) into a holistic science for mental purification and enlightenment.'
    },
    {
        era: 'Modern Era',
        title: 'Global AYUSH Recognition & Eco-Retreats',
        desc: 'Establishment of the Ministry of AYUSH, International Day of Yoga, and world accreditation for Panchakarma detox centers.'
    }
];

let map = null;

function initWellnessData() {
    renderRetreats(RETREATS_DATA);
}

function renderRetreats(retreats) {
    const container = document.getElementById('retreats-grid-container');
    if (!container) return;

    if (retreats.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">
                <i class="fa-solid fa-spa" style="font-size: 2.5rem; margin-bottom: 12px; color: #10b981;"></i>
                <p>No wellness retreats found matching your search query.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = retreats.map(r => `
        <div class="retreat-card">
            <div class="retreat-img-wrapper">
                <img src="${r.img}" alt="${r.name}" class="retreat-img" loading="lazy">
                <span class="retreat-disc-tag"><i class="fa-solid fa-leaf"></i> ${r.discipline}</span>
                <span class="retreat-rating-badge">${r.rating}</span>
            </div>
            <div class="retreat-content">
                <h3 class="retreat-title">${r.name}</h3>
                <span class="retreat-location"><i class="fa-solid fa-location-dot"></i> ${r.hubName}</span>
                <p class="retreat-desc">${r.desc}</p>
                <div class="retreat-footer">
                    <span class="retreat-duration"><i class="fa-solid fa-calendar-days"></i> ${r.duration}</span>
                    <button class="btn-view-retreat" onclick="openWellnessModal('${r.id}')">View Healing Plan</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initWellnessMap() {
    const mapContainer = document.getElementById('wellness-map-container');
    if (!mapContainer || typeof L === 'undefined') return;

    map = L.map('wellness-map-container').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    RETREATS_DATA.forEach(r => {
        const marker = L.marker([r.lat, r.lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: sans-serif; color: #000; padding: 4px;">
                <h4 style="margin: 0 0 4px 0; color: #10b981;">${r.name}</h4>
                <p style="margin: 0 0 6px 0; font-size: 12px;"><b>Hub:</b> ${r.hubName}</p>
                <p style="margin: 0; font-size: 11px; color: #555;"><b>Discipline:</b> ${r.discipline}</p>
            </div>
        `);
    });
}

function initWellnessTimeline() {
    const container = document.getElementById('wellness-timeline-container');
    if (!container) return;

    container.innerHTML = WELLNESS_TIMELINE.map((item, index) => `
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
    const searchInput = document.getElementById('wellness-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterRetreats();
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterRetreats();
        });
    });

    const modalClose = document.getElementById('wellness-modal-close-btn');
    const modal = document.getElementById('wellness-modal');
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

function filterRetreats() {
    const searchVal = (document.getElementById('wellness-search-input')?.value || '').toLowerCase();
    const activeDiscipline = document.querySelector('.filter-btn.active')?.dataset.discipline || 'all';

    const filtered = RETREATS_DATA.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchVal) ||
                              r.desc.toLowerCase().includes(searchVal) ||
                              r.hubName.toLowerCase().includes(searchVal) ||
                              r.state.toLowerCase().includes(searchVal);
        const matchesDiscipline = activeDiscipline === 'all' || r.discipline === activeDiscipline;
        return matchesSearch && matchesDiscipline;
    });

    renderRetreats(filtered);
}

window.openWellnessModal = function(id) {
    const r = RETREATS_DATA.find(item => item.id === id);
    if (!r) return;

    const bodyContainer = document.getElementById('wellness-modal-body-container');
    const modal = document.getElementById('wellness-modal');
    if (!bodyContainer || !modal) return;

    bodyContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${r.img}" alt="${r.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 16px; margin-bottom: 16px;">
            <span style="display: inline-block; padding: 4px 12px; background: rgba(16,185,129,0.2); color: #34d399; border-radius: 12px; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">${r.state} • ${r.discipline}</span>
            <h2 style="font-size: 1.8rem; color: #fff; margin-bottom: 6px;">${r.name}</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">${r.hubName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #ffd700; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-leaf"></i> Key Therapeutic Programs</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${r.therapies.map(t => `<span style="padding: 4px 10px; background: rgba(255,255,255,0.08); color: #cbd5e1; border-radius: 8px; font-size: 0.85rem;">${t}</span>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #38bdf8; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-book-open"></i> Lineage & Scientific Principles</h4>
            <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6;">${r.history}</p>
        </div>
    `;

    modal.classList.add('active');
};
