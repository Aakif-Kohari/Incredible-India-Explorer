/**
 * Interactive Indian Rivers Map Engine
 * Handles rendering SVG river paths, click/keyboard interactions, and info card updates.
 */

(function () {
    "use strict";

    // Data for the 7 major rivers
    const riversData = [
        {
            id: "ganga",
            name: "Ganga",
            subtitle: "From Gangotri Glacier to Bay of Bengal",
            length: "2,525 km",
            statesCrossed: ["Uttarakhand", "Uttar Pradesh", "Bihar", "Jharkhand", "West Bengal"],
            significance: "The most sacred river to Hindus, supporting hundreds of millions of people in its massive basin.",
            pathD: "M 300 120 L 360 190 L 480 220 L 580 250 L 620 310"
        },
        {
            id: "yamuna",
            name: "Yamuna",
            subtitle: "From Yamunotri Glacier to Triveni Sangam",
            length: "1,376 km",
            statesCrossed: ["Uttarakhand", "Himachal Pradesh", "Haryana", "Delhi", "Uttar Pradesh"],
            significance: "The longest tributary in India, flowing past the historic cities of Delhi and Agra.",
            pathD: "M 280 110 L 270 170 L 310 200 L 360 220 L 420 230"
        },
        {
            id: "brahmaputra",
            name: "Brahmaputra",
            subtitle: "From Angsi Glacier (Tibet) to Bay of Bengal",
            length: "2,900 km",
            statesCrossed: ["Arunachal Pradesh", "Assam"],
            significance: "A mighty trans-boundary river famous for its immense volume and creating the Majuli river island.",
            pathD: "M 650 100 L 620 150 L 550 180 L 530 220 L 560 280"
        },
        {
            id: "godavari",
            name: "Godavari",
            subtitle: "From Trimbakeshwar to Bay of Bengal",
            length: "1,465 km",
            statesCrossed: ["Maharashtra", "Telangana", "Andhra Pradesh", "Chhattisgarh", "Odisha"],
            significance: "Known as 'Dakshin Ganga' (Ganges of the South), it is the second-longest river in India.",
            pathD: "M 240 340 L 320 360 L 420 370 L 490 390 L 530 420"
        },
        {
            id: "krishna",
            name: "Krishna",
            subtitle: "From Mahabaleshwar to Hamsaladeevi",
            length: "1,400 km",
            statesCrossed: ["Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh"],
            significance: "A major source of irrigation for Southern India, fed by the heavy monsoon rains of the Western Ghats.",
            pathD: "M 230 380 L 300 410 L 390 420 L 460 430 L 510 450"
        },
        {
            id: "narmada",
            name: "Narmada",
            subtitle: "From Amarkantak to Arabian Sea",
            length: "1,312 km",
            statesCrossed: ["Madhya Pradesh", "Maharashtra", "Gujarat"],
            significance: "The largest west-flowing river in India, flowing through a rift valley between the Vindhya and Satpura ranges.",
            pathD: "M 440 310 Q 320 300 190 280"
        },
        {
            id: "kaveri",
            name: "Kaveri",
            subtitle: "From Talakaveri to Bay of Bengal",
            length: "805 km",
            statesCrossed: ["Karnataka", "Tamil Nadu", "Kerala (basin)", "Puducherry"],
            significance: "A sacred river of southern India, forming an extensive and fertile delta before emptying into the sea.",
            pathD: "M 270 470 Q 340 480 420 520"
        }
    ];

    // DOM Elements
    const riverPathsGroup = document.getElementById('river-paths-group');
    const infoCard = document.getElementById('river-info-card');

    /**
     * Initializes the map by rendering all river paths and attaching event listeners.
     */
    function initMap() {
        if (!riverPathsGroup) return;

        riversData.forEach(river => {
            // Create SVG path element for the river
            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathEl.setAttribute('d', river.pathD);
            pathEl.setAttribute('class', 'river-path');
            pathEl.setAttribute('data-id', river.id);
            
            // Accessibility attributes
            pathEl.setAttribute('tabindex', '0');
            pathEl.setAttribute('role', 'button');
            pathEl.setAttribute('aria-label', `River ${river.name}`);

            // Event Listeners
            pathEl.addEventListener('click', () => selectRiver(river.id));
            
            // Keyboard interaction (Enter / Space to select)
            pathEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectRiver(river.id);
                }
            });

            riverPathsGroup.appendChild(pathEl);
        });
    }

    /**
     * Handles river selection: updates UI and renders the information card.
     * @param {string} riverId - The ID of the selected river.
     */
    function selectRiver(riverId) {
        // Reset active state for all paths
        const allPaths = riverPathsGroup.querySelectorAll('.river-path');
        allPaths.forEach(path => path.classList.remove('active'));

        // Set active state for selected path
        const activePath = riverPathsGroup.querySelector(`[data-id="${riverId}"]`);
        if (activePath) {
            activePath.classList.add('active');
        }

        // Find river data
        const river = riversData.find(r => r.id === riverId);
        if (river && infoCard) {
            renderInfoCard(river);
        }
    }

    /**
     * Renders the dynamic content into the information card.
     * @param {Object} river - The river data object.
     */
    function renderInfoCard(river) {
        // Remove empty state class
        infoCard.classList.remove('default-state');
        
        infoCard.innerHTML = `
            <div class="river-details-header animate-fade">
                <h2 class="river-name">${river.name}</h2>
                <p class="river-subtitle">${river.subtitle}</p>
            </div>
            
            <div class="river-stat-grid animate-fade" style="animation-delay: 0.1s;">
                <div class="river-stat-item">
                    <p class="stat-label">Total Length</p>
                    <p class="stat-value">${river.length}</p>
                </div>
                <div class="river-stat-item">
                    <p class="stat-label">States Crossed</p>
                    <p class="stat-value">${river.statesCrossed.join(', ')}</p>
                </div>
            </div>
            
            <div class="river-significance animate-fade" style="animation-delay: 0.2s;">
                <strong>Significance:</strong> ${river.significance}
            </div>
        `;
    }

    // Initialize the module when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', initMap);

})();
