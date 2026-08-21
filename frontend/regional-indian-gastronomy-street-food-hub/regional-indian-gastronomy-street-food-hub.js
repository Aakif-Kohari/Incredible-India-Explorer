/**
 * Regional Indian Gastronomy & Street Food Hub JS Logic
 * Pure Vanilla JavaScript implementation adhering to repository architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    initGastronomyData();
    initGastronomyMap();
    initTimeline();
    setupEventListeners();
});

// Regional Street Foods Dataset
const DISHES_DATA = [
    {
        id: 'vada-pav',
        name: 'Mumbai Vada Pav',
        region: 'West',
        state: 'Maharashtra',
        origin: 'Dadarr, Mumbai',
        spicyLevel: '🌶️🌶️ Medium-Hot',
        price: '₹15 - ₹30',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
        desc: 'Deep-fried spiced potato fritter encased in a soft bread bun, served with fiery garlic chutney, fried green chilies, and mint dip.',
        lat: 19.0760,
        lng: 72.8777,
        hubName: 'Dadarr Station Food Street, Mumbai',
        ingredients: ['Spiced Potato Patty', 'Pav Bun', 'Dry Garlic Chutney', 'Fried Green Chili', 'Tamarind Dip'],
        history: 'Invented in 1966 by Ashok Vaidya outside Dadarr Railway Station to feed commuting factory workers quickly.'
    },
    {
        id: 'chole-bhature',
        name: 'Delhi Chole Bhature',
        region: 'North',
        state: 'Delhi',
        origin: 'Chandni Chowk, Old Delhi',
        spicyLevel: '🌶️🌶️🌶️ Spicy',
        price: '₹60 - ₹120',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop',
        desc: 'Piping hot, fluffy fried sourdough bread paired with rich, dark, aromatic chickpea curry cooked with raw pomegranate seeds and whole spices.',
        lat: 28.6562,
        lng: 77.2310,
        hubName: 'Chandni Chowk & Karol Bagh, Delhi',
        ingredients: ['Kabuli Chana', 'Anardana', 'Amchoor', 'Deep-fried Bhatura', 'Pickled Onions'],
        history: 'Originating post-1947 in Delhi, becoming the quintessential North Indian breakfast street food.'
    },
    {
        id: 'puchka',
        name: 'Kolkata Puchka',
        region: 'East',
        state: 'West Bengal',
        origin: 'Shyambazar, Kolkata',
        spicyLevel: '🌶️🌶️🌶️🌶️ Fiery',
        price: '₹20 - ₹40',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
        desc: 'Extra-crispy hollow wheat spheres filled with mashed spiced black chickpeas & boiled potatoes, drowned in ice-cold tangy tamarind-gondhoraj lime water.',
        lat: 22.5726,
        lng: 88.3639,
        hubName: 'Shyambazar & Park Street, Kolkata',
        ingredients: ['Whole Wheat Spheres', 'Mashed Potato', 'Black Chickpeas', 'Gondhoraj Lime Water', 'Tamarind'],
        history: 'Kolkata\'s iconic variant of Panipuri celebrated for its distinct Gondhoraj aroma and punchy spice mix.'
    },
    {
        id: 'masala-dosa',
        name: 'Mysore Masala Dosa',
        region: 'South',
        state: 'Karnataka',
        origin: 'Mysuru, Karnataka',
        spicyLevel: '🌶️ Mild-Medium',
        price: '₹50 - ₹90',
        img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop',
        desc: 'Crispy golden rice-lentil crepe smeared with a signature red garlic-chili chutney, stuffed with spiced potato mash and laden with pure ghee.',
        lat: 12.2958,
        lng: 76.6394,
        hubName: 'Mylari & Devaraja Market, Mysuru',
        ingredients: ['Fermented Batter', 'Red Garlic Paste', 'Potato Palya', 'Desi Ghee', 'Coconut Chutney'],
        history: 'Created in the royal kitchens of Mysuru and popularized by street vendors around Devaraja Market.'
    },
    {
        id: 'poha-jalebi',
        name: 'Indori Poha Jalebi',
        region: 'Central',
        state: 'Madhya Pradesh',
        origin: 'Sarafa Bazaar, Indore',
        spicyLevel: '🌶️ Mild & Sweet',
        price: '₹30 - ₹50',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop',
        desc: 'Steamed flattened rice tempered with mustard seeds and turmeric, topped with crispy Indori Sev and pomegranate, eaten alongside hot crispy syrup Jalebis.',
        lat: 22.7196,
        lng: 75.8577,
        hubName: 'Sarafa Night Bazaar, Indore',
        ingredients: ['Flattened Rice (Poha)', 'Indori Sev', 'Jeeravan Masala', 'Pomegranate', 'Sugar Syrup Jalebi'],
        history: 'Indore\'s signature breakfast staple sold at night markets that transform jewelry shops into street food hubs after dark.'
    },
    {
        id: 'momos',
        name: 'Sikkimese Steamed Momos',
        region: 'North-East',
        state: 'Sikkim',
        origin: 'Gangtok, Sikkim',
        spicyLevel: '🌶️🌶️🌶️ Hot Chili Dip',
        price: '₹60 - ₹110',
        img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
        desc: 'Delicate flour dumplings stuffed with juicy minced vegetables or meat, steamed to perfection and served with fiery Dalle Khursani chili sauce.',
        lat: 27.3389,
        lng: 88.6065,
        hubName: 'MG Marg, Gangtok',
        ingredients: ['Thin Dough', 'Minced Vegetables/Meat', 'Ginger-Garlic', 'Dalle Chili Paste', 'Clear Soup'],
        history: 'Brought by Tibetan and Nepalese communities, becoming the undisputed street food king of Sikkim and the North-East.'
    }
];

// Timeline Dataset
const TIMELINE_DATA = [
    {
        era: '3000 BCE - 1500 BCE',
        title: 'Indus Valley & Ancient Fermentation',
        desc: 'Earliest evidence of sesame oil extraction, clay oven tandoors, turmeric cultivation, and sourdough fermentation in the Indian subcontinent.'
    },
    {
        era: '16th - 18th Century',
        title: 'Mughal Imperial Kitchens & Royal Feasts',
        desc: 'Introduction of saffron infusions, dried fruits, rich gravies, slow-cooked Dum biryanis, and street kebabs across Delhi, Lucknow, and Hyderabad.'
    },
    {
        era: '19th Century',
        title: 'Colonial Era & Street Food Boom',
        desc: 'Rise of station-side food stalls, Dadarr Vada Pav, Kolkata Kathi rolls in Nizam\'s, and Portuguese-influenced Goan Pav and vindaloos.'
    },
    {
        era: '21st Century',
        title: 'Modern Street Food Telemetry & Fusion',
        desc: 'UNESCO recognition of regional culinary art forms, night markets, hygienic street food corridors, and global appreciation of Indian street gastronomy.'
    }
];

let map = null;

function initGastronomyData() {
    renderDishes(DISHES_DATA);
}

function renderDishes(dishes) {
    const container = document.getElementById('dishes-grid-container');
    if (!container) return;

    if (dishes.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">
                <i class="fa-solid fa-utensils" style="font-size: 2.5rem; margin-bottom: 12px; color: #ff9933;"></i>
                <p>No street food delicacies found matching your search query.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = dishes.map(dish => `
        <div class="dish-card">
            <div class="dish-img-wrapper">
                <img src="${dish.img}" alt="${dish.name}" class="dish-img" loading="lazy">
                <span class="dish-region-tag"><i class="fa-solid fa-location-dot"></i> ${dish.region} India</span>
                <span class="dish-spicy-level">${dish.spicyLevel}</span>
            </div>
            <div class="dish-content">
                <h3 class="dish-title">${dish.name}</h3>
                <span class="dish-origin"><i class="fa-solid fa-store"></i> ${dish.hubName}</span>
                <p class="dish-desc">${dish.desc}</p>
                <div class="dish-footer">
                    <span class="dish-price">${dish.price}</span>
                    <button class="btn-view-dish" onclick="openDishModal('${dish.id}')">View Recipe Vault</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initGastronomyMap() {
    const mapContainer = document.getElementById('gastronomy-map-container');
    if (!mapContainer || typeof L === 'undefined') return;

    map = L.map('gastronomy-map-container').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    DISHES_DATA.forEach(dish => {
        const marker = L.marker([dish.lat, dish.lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: sans-serif; color: #000; padding: 4px;">
                <h4 style="margin: 0 0 4px 0; color: #ff9933;">${dish.name}</h4>
                <p style="margin: 0 0 6px 0; font-size: 12px;"><b>Hub:</b> ${dish.hubName}</p>
                <p style="margin: 0; font-size: 11px; color: #555;">${dish.origin}</p>
            </div>
        `);
    });
}

function initTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = TIMELINE_DATA.map((item, index) => `
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
    const searchInput = document.getElementById('food-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterDishes();
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterDishes();
        });
    });

    const modalClose = document.getElementById('modal-close-btn');
    const modal = document.getElementById('food-modal');
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

function filterDishes() {
    const searchVal = (document.getElementById('food-search-input')?.value || '').toLowerCase();
    const activeRegion = document.querySelector('.filter-btn.active')?.dataset.region || 'all';

    const filtered = DISHES_DATA.filter(dish => {
        const matchesSearch = dish.name.toLowerCase().includes(searchVal) ||
                              dish.desc.toLowerCase().includes(searchVal) ||
                              dish.hubName.toLowerCase().includes(searchVal) ||
                              dish.state.toLowerCase().includes(searchVal);
        const matchesRegion = activeRegion === 'all' || dish.region === activeRegion;
        return matchesSearch && matchesRegion;
    });

    renderDishes(filtered);
}

window.openDishModal = function(id) {
    const dish = DISHES_DATA.find(d => d.id === id);
    if (!dish) return;

    const bodyContainer = document.getElementById('modal-body-container');
    const modal = document.getElementById('food-modal');
    if (!bodyContainer || !modal) return;

    bodyContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${dish.img}" alt="${dish.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 16px; margin-bottom: 16px;">
            <span style="display: inline-block; padding: 4px 12px; background: rgba(255,153,51,0.2); color: #ff9933; border-radius: 12px; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">${dish.state} • ${dish.region} India</span>
            <h2 style="font-size: 1.8rem; color: #fff; margin-bottom: 6px;">${dish.name}</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">${dish.hubName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #ffc107; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-mortar-pestle"></i> Key Ingredients</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${dish.ingredients.map(ing => `<span style="padding: 4px 10px; background: rgba(255,255,255,0.08); color: #cbd5e1; border-radius: 8px; font-size: 0.85rem;">${ing}</span>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #34d399; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-book-open"></i> Heritage & Story</h4>
            <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6;">${dish.history}</p>
        </div>
    `;

    modal.classList.add('active');
};
