/**
 * Handicrafts Artisan Emporium & Studio Hub JS Logic
 * Pure Vanilla JavaScript implementation adhering to repository architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    initCraftsData();
    initArtisanMap();
    initHandicraftTimeline();
    setupEventListeners();
});

// Master Craft Clusters Dataset
const CRAFTS_DATA = [
    {
        id: 'jaipur-blue-pottery',
        name: 'Jaipur Blue Pottery',
        category: 'Pottery',
        state: 'Rajasthan',
        origin: 'Jaipur, Rajasthan',
        giTagged: 'GI Tagged 2008',
        artisanGuild: 'Turko-Persian Ceramic Guild',
        img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop',
        desc: 'Traditional quartz powder ceramics decorated with Egyptian blue and cobalt oxide copper glazes, fired at low heat without using clay.',
        lat: 26.9124,
        lng: 75.7873,
        hubName: 'Sanganer & Amer Craft Clusters, Jaipur',
        materials: ['Quartz Powder', 'Glass Frits', 'Multani Mitti', 'Cobalt Oxide', 'Copper Sulphate'],
        history: 'Introduced by Maharaja Sawai Ram Singh II in the 19th century from Persian artisans visiting Jaipur.'
    },
    {
        id: 'kashmiri-pashmina',
        name: 'Kashmiri Pashmina Shawls',
        category: 'Textiles',
        state: 'Jammu & Kashmir',
        origin: 'Srinagar, J&K',
        giTagged: 'GI Tagged 2005',
        artisanGuild: 'Changthangi Weaver Guild',
        img: 'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop',
        desc: 'Hand-spun underfleece of high-altitude Changthangi goats woven into ultra-soft shawls embellished with fine Sozni needle embroidery.',
        lat: 34.0837,
        lng: 74.7973,
        hubName: 'Old City Looms & Zadibal, Srinagar',
        materials: ['Changthangi Goat Down', 'Sozni Needle Silk', 'Natural Botanical Dyes'],
        history: 'Patronized by 15th-century ruler Sultan Zain-ul-Abidin who invited Persian master weavers to Kashmir.'
    },
    {
        id: 'madhubani-paintings',
        name: 'Madhubani Mithila Art',
        category: 'Paintings',
        state: 'Bihar',
        origin: 'Madhubani, Mithila',
        giTagged: 'GI Tagged 2007',
        artisanGuild: 'Mithila Mahila Kalakar Guild',
        img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
        desc: 'Intricate geometrical folk paintings created using twigs, nibs, matchsticks, and natural mineral dyes depicting Hindu deities and nature.',
        lat: 26.3533,
        lng: 86.0719,
        hubName: 'Ranti & Jitwarpur Villages, Madhubani',
        materials: ['Handmade Cowdung Paper', 'Twig Nibs', 'Rice Powder Paste', 'Turmeric', 'Indigo'],
        history: 'Dating back to the Ramayana era when King Janaka commissioned artists to paint walls for Sita\'s wedding.'
    },
    {
        id: 'dhokra-bronze',
        name: 'Bastar Dhokra Art',
        category: 'Metalware',
        state: 'Chhattisgarh',
        origin: 'Bastar, Chhattisgarh',
        giTagged: 'GI Tagged 2012',
        artisanGuild: 'Ghadwa Artisan Metal Guild',
        img: 'https://images.unsplash.com/photo-1567000997465-b10887263590?q=80&w=800&auto=format&fit=crop',
        desc: 'Non-ferrous metal casting using the ancient 4,000-year-old lost-wax technique (Cire Perdue) featuring tribal motifs and figurines.',
        lat: 19.0744,
        lng: 82.0298,
        hubName: 'Kondagaon Craft Village, Bastar',
        materials: ['Beeswax Threads', 'Clay Molds', 'Scrap Brass & Bronze', 'River Bed Mud'],
        history: 'Direct technological lineage from the Indus Valley Dancing Girl artifact discovered at Mohenjo-Daro.'
    },
    {
        id: 'channapatna-toys',
        name: 'Channapatna Lacquer Toys',
        category: 'Woodcraft',
        state: 'Karnataka',
        origin: 'Channapatna, Ramanagara',
        giTagged: 'GI Tagged 2006',
        artisanGuild: 'Gombegala Ooru Toy Guild',
        img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop',
        desc: 'Eco-friendly turned wooden toys crafted from Wrightia tinctoria (Aale mara) wood, coated with non-toxic natural shellac and vegetable dyes.',
        lat: 12.6518,
        lng: 77.2089,
        hubName: 'Channapatna Craft Complex, Karnataka',
        materials: ['Wrightia Wood', 'Natural Shellac', 'Turmeric & Vegetable Dyes', 'Lathe Machine'],
        history: 'Tipu Sultan invited Persian artisans in the late 18th century to train local woodcrafters in lacquerware.'
    },
    {
        id: 'tanjore-gold-paintings',
        name: 'Thanjavur Gold Foil Art',
        category: 'Paintings',
        state: 'Tamil Nadu',
        origin: 'Thanjavur, Tamil Nadu',
        giTagged: 'GI Tagged 2007',
        artisanGuild: 'Chola Classical Art Guild',
        img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
        desc: 'Classical South Indian icon painting characterized by rich gold leaf foil overlay, semi-precious Jaipur gemstones, and gesso relief work.',
        lat: 10.7870,
        lng: 79.1378,
        hubName: 'South Zone Cultural Center, Thanjavur',
        materials: ['22ct Gold Leaf Foil', 'Jaipur Gemstones', 'Gesso Paste', 'Jackwood Board'],
        history: 'Flourished under the Maratha rulers and Nayakas of Thanjavur in the 16th century.'
    }
];

// Timeline Dataset
const HANDICRAFT_TIMELINE = [
    {
        era: '2500 BCE',
        title: 'Indus Valley & Lost-Wax Metallurgy',
        desc: 'First known bronze casting of the Dancing Girl in Mohenjo-Daro and terra-cotta pottery wheels in Harappa.'
    },
    {
        era: '3rd Century BCE',
        title: 'Mauryan Stone & Pillar Carving',
        desc: 'Asokan stone pillars with polished sandstone capitals, establishing Indian stone carving standards.'
    },
    {
        era: '16th Century CE',
        title: 'Mughal & Chola Golden Age',
        desc: 'Integration of Persian inlay work (Pietra Dura), royal Zardozi gold embroidery, and Tanjore gold foil arts.'
    },
    {
        era: 'Modern Era',
        title: 'GI Tag Certification & Global Fair Trade',
        desc: 'Over 220 craft clusters registered under Geographical Indications, establishing international artisan studio hubs.'
    }
];

let map = null;

function initCraftsData() {
    renderCrafts(CRAFTS_DATA);
}

function renderCrafts(crafts) {
    const container = document.getElementById('crafts-grid-container');
    if (!container) return;

    if (crafts.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">
                <i class="fa-solid fa-palette" style="font-size: 2.5rem; margin-bottom: 12px; color: #d4af37;"></i>
                <p>No master craft guilds found matching your filter criteria.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = crafts.map(craft => `
        <div class="craft-card">
            <div class="craft-img-wrapper">
                <img src="${craft.img}" alt="${craft.name}" class="craft-img" loading="lazy">
                <span class="craft-cat-tag"><i class="fa-solid fa-layer-group"></i> ${craft.category}</span>
                <span class="craft-gi-badge">${craft.giTagged}</span>
            </div>
            <div class="craft-content">
                <h3 class="craft-title">${craft.name}</h3>
                <span class="craft-origin"><i class="fa-solid fa-location-dot"></i> ${craft.hubName}</span>
                <p class="craft-desc">${craft.desc}</p>
                <div class="craft-footer">
                    <span class="craft-artisan-count"><i class="fa-solid fa-users"></i> ${craft.artisanGuild}</span>
                    <button class="btn-view-craft" onclick="openCraftModal('${craft.id}')">View Studio Vault</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initArtisanMap() {
    const mapContainer = document.getElementById('artisan-map-container');
    if (!mapContainer || typeof L === 'undefined') return;

    map = L.map('artisan-map-container').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    CRAFTS_DATA.forEach(craft => {
        const marker = L.marker([craft.lat, craft.lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: sans-serif; color: #000; padding: 4px;">
                <h4 style="margin: 0 0 4px 0; color: #d4af37;">${craft.name}</h4>
                <p style="margin: 0 0 6px 0; font-size: 12px;"><b>Cluster:</b> ${craft.hubName}</p>
                <p style="margin: 0; font-size: 11px; color: #555;"><b>Status:</b> ${craft.giTagged}</p>
            </div>
        `);
    });
}

function initHandicraftTimeline() {
    const container = document.getElementById('handicraft-timeline-container');
    if (!container) return;

    container.innerHTML = HANDICRAFT_TIMELINE.map((item, index) => `
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
    const searchInput = document.getElementById('craft-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterCrafts();
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterCrafts();
        });
    });

    const modalClose = document.getElementById('craft-modal-close-btn');
    const modal = document.getElementById('craft-modal');
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

function filterCrafts() {
    const searchVal = (document.getElementById('craft-search-input')?.value || '').toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';

    const filtered = CRAFTS_DATA.filter(craft => {
        const matchesSearch = craft.name.toLowerCase().includes(searchVal) ||
                              craft.desc.toLowerCase().includes(searchVal) ||
                              craft.hubName.toLowerCase().includes(searchVal) ||
                              craft.state.toLowerCase().includes(searchVal);
        const matchesCategory = activeCategory === 'all' || craft.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    renderCrafts(filtered);
}

window.openCraftModal = function(id) {
    const craft = CRAFTS_DATA.find(c => c.id === id);
    if (!craft) return;

    const bodyContainer = document.getElementById('craft-modal-body-container');
    const modal = document.getElementById('craft-modal');
    if (!bodyContainer || !modal) return;

    bodyContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${craft.img}" alt="${craft.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 16px; margin-bottom: 16px;">
            <span style="display: inline-block; padding: 4px 12px; background: rgba(212,175,55,0.2); color: #d4af37; border-radius: 12px; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">${craft.state} • ${craft.giTagged}</span>
            <h2 style="font-size: 1.8rem; color: #fff; margin-bottom: 6px;">${craft.name}</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">${craft.hubName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #facc15; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-cubes"></i> Raw Materials & Technique</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${craft.materials.map(mat => `<span style="padding: 4px 10px; background: rgba(255,255,255,0.08); color: #cbd5e1; border-radius: 8px; font-size: 0.85rem;">${mat}</span>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <h4 style="color: #38bdf8; font-size: 1.05rem; margin-bottom: 8px;"><i class="fa-solid fa-book-open"></i> Guild History & Heritage</h4>
            <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6;">${craft.history}</p>
        </div>
    `;

    modal.classList.add('active');
};
