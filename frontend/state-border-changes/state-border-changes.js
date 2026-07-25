/**
 * How India Changes Across States Explorer
 * Enables state-to-state border transition comparisons across languages, food, attire, climate, architecture, etc.
 */

(function () {
    'use strict';

    const STATE_DATA = {
        'Punjab': {
            language: 'Punjabi (Gurmukhi script)',
            food: 'Makki di Roti & Sarson da Saag, Butter Chicken, Lassi',
            attire: 'Phulkari Suits, Kurta Pajama with Turban (Pagg)',
            climate: 'Subtropical Semi-Arid, extreme summers & cold winters',
            architecture: 'Sikh architecture, domes, intricate jali work, Golden Temple style',
            vegetation: 'Agricultural alluvial plains, Wheat fields, Eucalyptus',
            tradition: 'Bhangra & Giddha dance, Baisakhi festival'
        },
        'Rajasthan': {
            language: 'Rajasthani / Hindi (Devanagari script)',
            food: 'Dal Baati Churma, Ker Sangri, Laal Maas',
            attire: 'Ghagra Choli with Odhni, Angrakha & Colorful Safa (Turban)',
            climate: 'Arid to Semi-Arid Desert (Thar)',
            architecture: 'Sandstone forts, Haveli architecture, Jharokhas, stepwells',
            vegetation: 'Thorn forest, Khejri trees, Cacti, Arid scrub',
            tradition: 'Ghoomar dance, Teej & Gangaur festivals, Kathputli puppetry'
        },
        'Tamil Nadu': {
            language: 'Tamil (Tamil script)',
            food: 'Dosa, Idli, Sambar, Chettinad Spicy Curries, Filter Coffee',
            attire: 'Kanchipuram Silk Saree, Veshti (Dhoti) & Shirt',
            climate: 'Tropical Maritime, Northeast Monsoon rainfall',
            architecture: 'Dravidian temple architecture, soaring Gopurams, pillared mandapas',
            vegetation: 'Tropical dry evergreen, Palmyra palms, Coastal mangroves',
            tradition: 'Bharatanatyam dance, Pongal harvest festival, Carnatic music'
        },
        'Kerala': {
            language: 'Malayalam (Malayalam script)',
            food: 'Appam with Stew, Sadya on Banana Leaf, Fish Molee, Coconut oil dishes',
            attire: 'Mundum Neryathum (Kasavu Saree), White Mundu with Gold Border',
            climate: 'Tropical Monsoon, heavy rainfall & lush greenery',
            architecture: 'Sloping tiled roofs, timber architecture (Kuttanad/Nalukettu style)',
            vegetation: 'Coconut palms, Rubber plantations, Spices, Tropical rainforest',
            tradition: 'Kathakali & Mohiniyattam, Onam festival, Snake Boat Races (Vallam Kali)'
        },
        'West Bengal': {
            language: 'Bengali (Bengali script)',
            food: 'Machher Jhol (Fish curry), Rosogolla, Mishti Doi, Shorshe Ilish',
            attire: 'Tant & Garad Sarees (Red-bordered white saree), Kurta Pyjama',
            climate: 'Tropical Wet & Dry, humid monsoons',
            architecture: 'Terracotta temples (Bishnupur style), Colonial Victorian mansions',
            vegetation: 'Sundarbans mangroves, Paddy fields, Jute plantations',
            tradition: 'Durga Puja festival, Rabindra Sangeet, Baul music'
        },
        'Odisha': {
            language: 'Odia (Odia script)',
            food: 'Dalma, Pakhala Bhata, Chhena Poda, Jagannath Mahaprasad',
            attire: 'Sambalpuri & Bomkai Ikkat Sarees, Dhoti & Sambalpuri Kurtas',
            climate: 'Tropical Humid monsoon climate',
            architecture: 'Kalinga temple architecture, curvilinear Shikhara (Jagannath Temple)',
            vegetation: 'Sal forests, Coastal mangroves (Bhitarkanika), Casuarina',
            tradition: 'Odissi classical dance, Rath Yatra at Puri, Pattachitra art'
        },
        'Maharashtra': {
            language: 'Marathi (Devanagari script)',
            food: 'Puran Poli, Vada Pav, Misal Pav, Pithla Bhakri',
            attire: 'Nauvari (9-yard) Saree, Pheta (Headgear), Kurta-Dhoti',
            climate: 'Tropical wet and dry (Coastal Konkan vs plateau)',
            architecture: 'Maratha Fort architecture (hill and sea forts), Wada courtyards',
            vegetation: 'Western Ghats evergreen, Teak, Mango groves (Alphonso)',
            tradition: 'Ganesh Chaturthi, Lavani dance, Powada ballads'
        },
        'Goa': {
            language: 'Konkani (Devanagari & Roman scripts)',
            food: 'Fish Curry Rice, Bebinca, Pork Vindaloo, Feni',
            attire: 'Pano Bhaju saree, Casual coastal attire, Kunbi saree',
            climate: 'Tropical Maritime, warm & humid year-round',
            architecture: 'Portuguese Colonial architecture, tiled Portuguese houses, historic cathedrals',
            vegetation: 'Coconut palms, Cashew plantations, Mangroves, Western Ghats biodiversity',
            tradition: 'Shigmo festival, Goa Carnival, Fugdi folk dance'
        },
        'Assam': {
            language: 'Assamese (Assamese script)',
            food: 'Masor Tenga (Sour fish curry), Duck curry, Khar, Pitha',
            attire: 'Muga Silk Mekhela Chador, Dhoti & Gamosa',
            climate: 'Subtropical Humid, heavy monsoon & riverine plains',
            architecture: 'Ahom dynasty architecture (Rang Ghar, Talatal Ghar), Chang ghar (stilt houses)',
            vegetation: 'Tea gardens, Assam tropical evergreen forests, Riverine grasslands',
            tradition: 'Bihu festival & dance, Sattriya classical dance, Tea culture'
        },
        'Meghalaya': {
            language: 'Khasi, Garo, Pnar (English & Roman scripts)',
            food: 'Jadoh (Rice with pork), Tungrymbai, Bamboo shoot curry',
            attire: 'Jainsem (Khasi women), Dakmanda (Garo women)',
            climate: 'Subtropical Highland, cool & wet (Mawsynram/Cherrapunji)',
            architecture: 'Living Root Bridges, traditional wooden and bamboo hill dwellings',
            vegetation: 'Sacred groves, Subtropical pine forests, Orchids, Pitcher plants',
            tradition: 'Shad Suk Mynsiem, Nongkrem dance, Matrilineal social structure'
        }
    };

    const DIMENSIONS = [
        { key: 'language', label: 'Language & Script', icon: 'fa-language' },
        { key: 'food', label: 'Cuisine & Food', icon: 'fa-bowl-food' },
        { key: 'attire', label: 'Attire & Dress', icon: 'fa-shirt' },
        { key: 'climate', label: 'Climate & Geography', icon: 'fa-cloud-sun' },
        { key: 'architecture', label: 'Architecture & Dwellings', icon: 'fa-gopuram' },
        { key: 'vegetation', label: 'Flora & Vegetation', icon: 'fa-tree' },
        { key: 'tradition', label: 'Traditions & Festivals', icon: 'fa-masks-theater' }
    ];

    function init() {
        const fromSelect = document.getElementById('from-state-select');
        const toSelect = document.getElementById('to-state-select');
        const swapBtn = document.getElementById('swap-states-btn');
        const searchInput = document.getElementById('bc-search-input');
        const badgeFrom = document.getElementById('badge-from-state');
        const badgeTo = document.getElementById('badge-to-state');
        const grid = document.getElementById('bc-grid');

        if (!fromSelect || !toSelect || !grid) return;

        const stateNames = Object.keys(STATE_DATA).sort();

        // Populate dropdown options
        function populateOptions() {
            fromSelect.innerHTML = stateNames.map(s => `<option value="${s}">${s}</option>`).join('');
            toSelect.innerHTML = stateNames.map(s => `<option value="${s}">${s}</option>`).join('');

            fromSelect.value = 'Punjab';
            toSelect.value = 'Rajasthan';
        }

        function renderComparison() {
            const fromState = fromSelect.value;
            const toState = toSelect.value;
            const query = (searchInput?.value || '').trim().toLowerCase();

            if (badgeFrom) badgeFrom.textContent = fromState;
            if (badgeTo) badgeTo.textContent = toState;

            const fromInfo = STATE_DATA[fromState];
            const toInfo = STATE_DATA[toState];

            if (!fromInfo || !toInfo) return;

            const filteredDimensions = DIMENSIONS.filter(dim => {
                if (!query) return true;
                const labelMatch = dim.label.toLowerCase().includes(query);
                const fromMatch = (fromInfo[dim.key] || '').toLowerCase().includes(query);
                const toMatch = (toInfo[dim.key] || '').toLowerCase().includes(query);
                return labelMatch || fromMatch || toMatch;
            });

            if (filteredDimensions.length === 0) {
                grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--bc-text-muted);">
                    <i class="fa-solid fa-circle-exclamation" style="font-size:2rem; margin-bottom:10px;"></i>
                    <p>No border changes found matching "${query}". Try another search term!</p>
                </div>`;
                return;
            }

            grid.innerHTML = filteredDimensions.map(dim => `
                <div class="bc-card">
                    <div class="bc-card-icon"><i class="fa-solid ${dim.icon}"></i></div>
                    <h3>${dim.label}</h3>
                    <div class="comparison-cols">
                        <div class="col-from">
                            <div class="col-title">${fromState}</div>
                            <div class="col-content">${fromInfo[dim.key]}</div>
                        </div>
                        <div class="col-to">
                            <div class="col-title">${toState}</div>
                            <div class="col-content">${toInfo[dim.key]}</div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        fromSelect.addEventListener('change', renderComparison);
        toSelect.addEventListener('change', renderComparison);

        swapBtn?.addEventListener('click', () => {
            const temp = fromSelect.value;
            fromSelect.value = toSelect.value;
            toSelect.value = temp;
            renderComparison();
        });

        searchInput?.addEventListener('input', renderComparison);

        document.querySelectorAll('.bc-preset-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                fromSelect.value = chip.dataset.from;
                toSelect.value = chip.dataset.to;
                renderComparison();
            });
        });

        populateOptions();
        renderComparison();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
