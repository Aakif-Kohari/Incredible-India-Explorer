/**
 * Peasant and Agrarian Resistance Explorer
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ================================================================
       1. HISTORICAL DATA
       ================================================================ */
    const movementsData = [
        {
            id: "indigo-revolt",
            title: "Indigo Revolt (Nil Bidroha)",
            period: "1859 - 1860",
            region: "Bengal",
            coords: [23.5, 88.5], // Nadia/Bengal general area
            causeType: "Exploitative Cultivation",
            causeDesc: "European planters forced peasants to grow indigo instead of food crops, offering negligible prices and enforcing contracts through physical violence and illegal confinement.",
            resistanceForm: "Refusal to cultivate. Peasants unitedly refused to sow indigo, physically resisted planter goondas (thugs), and later used legal channels and strikes.",
            outcome: "The British government formed the Indigo Commission in 1860, which reported in favor of the peasants. The planters were forced out of Bengal.",
            leaders: [
                { name: "Bishnucharan Biswas", context: "Led the initial uprising in Nadia district." },
                { name: "Digambar Biswas", context: "Co-leader in organizing peasant resistance in Nadia." }
            ]
        },
        {
            id: "pabna",
            title: "Pabna Agrarian Leagues",
            period: "1873 - 1876",
            region: "Bengal",
            coords: [24.0, 89.2], // Pabna, Sirajganj area
            causeType: "Tenancy/Eviction",
            causeDesc: "Zamindars routinely enhanced rents beyond legal limits and attempted to prevent ryots (tenants) from acquiring occupancy rights under the Act X of 1859.",
            resistanceForm: "Legal resistance and mass mobilization. Peasants formed agrarian leagues (sabhas) to pool funds for litigation and refused to pay the enhanced rents.",
            outcome: "Largely successful. The resistance forced the government to pass the Bengal Tenancy Act of 1885, providing better protection to occupancy ryots.",
            leaders: [
                { name: "Ishan Chandra Roy", context: "Prominent leader of the Pabna leagues." },
                { name: "Shambhu Pal", context: "Organized peasant resistance." }
            ]
        },
        {
            id: "deccan-riots",
            title: "Deccan Riots",
            period: "1875",
            region: "Maharashtra",
            coords: [18.5, 74.0], // Poona/Ahmednagar
            causeType: "Indebtedness",
            causeDesc: "The crash in cotton prices after the American Civil War, coupled with high land revenue demands, forced peasants into severe debt. Marwari and Gujarati moneylenders exploited the situation, seizing lands.",
            resistanceForm: "Social boycott of moneylenders followed by organized riots to destroy debt bonds, decrees, and account books.",
            outcome: "The government suppressed the riots but appointed the Deccan Riots Commission. This led to the Deccan Agriculturists' Relief Act (1879), offering some protection against moneylenders.",
            leaders: [
                { name: "Collective Leadership", context: "Locally organized by village headmen; no single prominent central leader." }
            ]
        },
        {
            id: "champaran",
            title: "Champaran Satyagraha",
            period: "1917",
            region: "Bihar",
            coords: [26.6, 84.5], // Champaran district
            causeType: "Exploitative Cultivation",
            causeDesc: "Under the 'tinkathia' system, European planters forced peasants to grow indigo on 3/20th of their land, extracting illegal dues and underpaying for the crop.",
            resistanceForm: "First civil disobedience movement led by Gandhi in India. Mass recording of peasant grievances, peaceful defiance of expulsion orders.",
            outcome: "Abolition of the tinkathia system. The Champaran Agrarian Act was passed, and some illegally exacted money was refunded.",
            leaders: [
                { name: "Mahatma Gandhi", context: "Invited by Rajkumar Shukla, led the investigation and satyagraha." },
                { name: "Rajkumar Shukla", context: "Local peasant who persuaded Gandhi to visit Champaran." }
            ]
        },
        {
            id: "kheda",
            title: "Kheda Satyagraha",
            period: "1918",
            region: "Gujarat",
            coords: [22.7, 72.6], // Kheda district
            causeType: "Land Revenue/Rent",
            causeDesc: "Crops failed due to drought, but the colonial government refused to remit land revenue, demanding full payment and seizing property of defaulters.",
            resistanceForm: "Non-payment of taxes. Peasants pledged not to pay revenue despite property confiscations and threats of arrest.",
            outcome: "The government secretly directed officials to recover revenue only from those who could afford to pay, effectively halting the coercive collections.",
            leaders: [
                { name: "Mahatma Gandhi", context: "Guided the movement." },
                { name: "Sardar Vallabhbhai Patel", context: "Primary organizer who mobilized the villages." }
            ]
        },
        {
            id: "moplah",
            title: "Moplah (Malabar) Rebellion",
            period: "1921",
            region: "Kerala",
            coords: [11.0, 76.0], // Malabar region
            causeType: "Tenancy/Eviction",
            causeDesc: "Oppressive tenancy conditions, rack-renting, and evictions by upper-caste Hindu landlords (Jenmis) backed by the British administration.",
            resistanceForm: "Started as a Khilafat movement but rapidly became an armed agrarian revolt against landlords and British officials.",
            outcome: "Brutally suppressed by the British military. Thousands of Moplahs were killed, and the agrarian character was overshadowed by communal violence.",
            leaders: [
                { name: "Ali Musliyar", context: "Key religious and agrarian leader." },
                { name: "Variyamkunnath Kunjahammed Haji", context: "Prominent leader who established a short-lived independent state." }
            ]
        },
        {
            id: "eka",
            title: "Eka Movement",
            period: "1921 - 1922",
            region: "Uttar Pradesh",
            coords: [27.0, 81.0], // Hardoi, Bahraich, Sitapur
            causeType: "Land Revenue/Rent",
            causeDesc: "Extraction of rent generally 50% higher than recorded rates, oppression by thikadars (contractors), and the practice of share-renting (batai).",
            resistanceForm: "Grassroots mobilization. Peasants took oaths ('eka' meaning unity) to pay only recorded rent, refuse forced labor, and not leave their lands when evicted.",
            outcome: "Severely repressed by the authorities. However, it forced the government to pass the Oudh Rent (Amendment) Act in 1921.",
            leaders: [
                { name: "Madari Pasi", context: "Lower-caste leader who spearheaded the militant phase of the movement." }
            ]
        },
        {
            id: "bardoli",
            title: "Bardoli Satyagraha",
            period: "1928",
            region: "Gujarat",
            coords: [21.1, 73.1], // Bardoli taluka
            causeType: "Land Revenue/Rent",
            causeDesc: "An arbitrary and unjustified 22% increase in land revenue assessment by the Bombay Presidency government.",
            resistanceForm: "Highly organized no-tax campaign. Peasants refused to pay, facing confiscation of land and cattle with massive solidarity.",
            outcome: "A complete victory. A committee investigated and found the hike unjustified, reducing the increase to just 6.03%. Returned confiscated lands.",
            leaders: [
                { name: "Sardar Vallabhbhai Patel", context: "Earned the title 'Sardar' for his brilliant organization and leadership of this movement." }
            ]
        },
        {
            id: "tebhaga",
            title: "Tebhaga Movement",
            period: "1946 - 1947",
            region: "Bengal",
            coords: [25.0, 89.0], // Widespread in Bengal
            causeType: "Tenancy/Eviction",
            causeDesc: "Sharecroppers (bargadars) had to give half their harvest to landlords (jotedars). The Floud Commission recommended reducing the landlord's share to one-third.",
            resistanceForm: "Sharecroppers refused to give 50%. They took the harvest to their own khamars (threshing floors) and demanded the two-thirds share ('Tebhaga').",
            outcome: "Met with severe police repression. Though it did not immediately result in legislation due to Partition, it set the stage for later land reforms.",
            leaders: [
                { name: "Kisan Sabha", context: "The movement was largely organized by the Bengal Provincial Kisan Sabha (Communist Party)." }
            ]
        }
    ];

    /* ================================================================
       2. DOM ELEMENTS
       ================================================================ */
    const causeFilter = document.getElementById('cause-filter');
    const regionFilter = document.getElementById('region-filter');
    const timelineTrack = document.getElementById('timeline-track');
    
    // Details panel elements
    const detailsCard = document.getElementById('movement-details');
    const emptyState = detailsCard.querySelector('.empty-state');
    const detailsContent = detailsCard.querySelector('.details-content');
    const detailTitle = document.getElementById('detail-title');
    const detailPeriod = document.getElementById('detail-period');
    const detailRegion = document.getElementById('detail-region');
    const detailCause = document.getElementById('detail-cause');
    const detailResistance = document.getElementById('detail-resistance');
    const detailOutcome = document.getElementById('detail-outcome');
    const leaderSection = document.getElementById('leader-section');
    const leaderCardsContainer = document.getElementById('leader-cards');

    let map;
    let mapMarkers = [];
    let activeMovementId = null;

    /* ================================================================
       3. MAP INITIALIZATION
       ================================================================ */
    function initMap() {
        const mapContainer = document.getElementById('resistance-map');
        if (!mapContainer || typeof L === 'undefined') return;

        // Center on India
        map = L.map('resistance-map', {
            center: [22.0, 79.0],
            zoom: 5,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18,
        }).addTo(map);

        map.on('click', () => {
            if (!map.scrollWheelZoom.enabled()) map.scrollWheelZoom.enable();
        });
        map.on('mouseout', () => {
            map.scrollWheelZoom.disable();
        });

        renderMarkers(movementsData);
    }

    function renderMarkers(data) {
        // Clear existing
        mapMarkers.forEach(m => map.removeLayer(m.marker));
        mapMarkers = [];

        data.forEach(movement => {
            const icon = L.divIcon({
                className: `map-marker-icon ${activeMovementId === movement.id ? 'marker-active' : ''}`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            const marker = L.marker(movement.coords, { icon }).addTo(map);
            
            marker.bindTooltip(`<strong>${movement.title}</strong><br>${movement.period}`, {
                direction: 'top',
                offset: [0, -10]
            });

            marker.on('click', () => {
                selectMovement(movement.id);
            });

            mapMarkers.push({ id: movement.id, marker });
        });
    }

    function highlightMarker(id) {
        if (!map) return;
        mapMarkers.forEach(m => {
            const el = m.marker.getElement();
            if (el) {
                if (m.id === id) {
                    el.classList.add('marker-active');
                    map.panTo(m.marker.getLatLng());
                } else {
                    el.classList.remove('marker-active');
                }
            }
        });
    }

    /* ================================================================
       4. TIMELINE & RENDERING
       ================================================================ */
    function renderTimeline(data) {
        timelineTrack.innerHTML = '';
        if (data.length === 0) {
            timelineTrack.innerHTML = '<p style="color:#aaa; text-align:center; padding: 20px;">No movements found for selected filters.</p>';
            return;
        }

        // Sort by year heuristically (first 4 digits)
        const sorted = [...data].sort((a, b) => {
            const yearA = parseInt(a.period.match(/\d{4}/)[0]);
            const yearB = parseInt(b.period.match(/\d{4}/)[0]);
            return yearA - yearB;
        });

        sorted.forEach(movement => {
            const item = document.createElement('div');
            item.className = `timeline-item ${activeMovementId === movement.id ? 'active' : ''}`;
            item.setAttribute('tabindex', '0');
            item.setAttribute('data-id', movement.id);
            item.innerHTML = `
                <div class="timeline-year">${movement.period}</div>
                <div>
                    <h4 class="timeline-title">${movement.title}</h4>
                    <p class="timeline-region">${movement.region}</p>
                </div>
            `;

            const handleSelect = (e) => {
                e.preventDefault();
                selectMovement(movement.id);
            };

            item.addEventListener('click', handleSelect);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSelect(e);
            });

            timelineTrack.appendChild(item);
        });
    }

    /* ================================================================
       5. SELECTION & FILTERING
       ================================================================ */
    function selectMovement(id) {
        activeMovementId = id;
        const movement = movementsData.find(m => m.id === id);
        if (!movement) return;

        // Update UI states
        document.querySelectorAll('.timeline-item').forEach(el => {
            if (el.getAttribute('data-id') === id) {
                el.classList.add('active');
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                el.classList.remove('active');
            }
        });
        
        highlightMarker(id);

        // Populate Details
        emptyState.classList.add('hidden');
        detailsContent.classList.remove('hidden');

        detailTitle.textContent = movement.title;
        detailPeriod.textContent = movement.period;
        detailRegion.textContent = movement.region;
        detailCause.textContent = movement.causeDesc;
        detailResistance.textContent = movement.resistanceForm;
        detailOutcome.textContent = movement.outcome;

        // Leaders
        if (movement.leaders && movement.leaders.length > 0) {
            leaderSection.classList.remove('hidden');
            leaderCardsContainer.innerHTML = movement.leaders.map(l => `
                <div class="leader-card">
                    <h5>${l.name}</h5>
                    <p>${l.context}</p>
                </div>
            `).join('');
        } else {
            leaderSection.classList.add('hidden');
            leaderCardsContainer.innerHTML = '';
        }
        
        // Mobile scroll to details
        if (window.innerWidth <= 950) {
            detailsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function applyFilters() {
        const cFilter = causeFilter.value;
        const rFilter = regionFilter.value;

        const filtered = movementsData.filter(m => {
            const matchCause = cFilter === 'all' || m.causeType === cFilter;
            const matchRegion = rFilter === 'all' || m.region === rFilter;
            return matchCause && matchRegion;
        });

        renderMarkers(filtered);
        renderTimeline(filtered);

        // Reset selection if active is filtered out
        if (activeMovementId && !filtered.find(m => m.id === activeMovementId)) {
            activeMovementId = null;
            emptyState.classList.remove('hidden');
            detailsContent.classList.add('hidden');
        }
    }

    /* ================================================================
       6. BOOTSTRAP
       ================================================================ */
    if (causeFilter) causeFilter.addEventListener('change', applyFilters);
    if (regionFilter) regionFilter.addEventListener('change', applyFilters);

    setTimeout(() => {
        initMap();
        renderTimeline(movementsData);
    }, 100);
});
