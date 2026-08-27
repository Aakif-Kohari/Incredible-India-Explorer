/**
 * State Data Module
 * Maps Indian states to their primary hazard risks for the state-wise exploration feature.
 */

const STATE_HAZARD_DATA = {
    'Andhra Pradesh': { primary: ['cyclone', 'heatwave', 'flood'], secondary: ['drought', 'earthquake'] },
    'Arunachal Pradesh': { primary: ['earthquake', 'landslide', 'avalanche'], secondary: ['flood'] },
    'Assam': { primary: ['flood', 'earthquake', 'landslide'], secondary: ['cyclone'] },
    'Bihar': { primary: ['flood', 'lightning', 'earthquake'], secondary: ['drought'] },
    'Chhattisgarh': { primary: ['drought', 'flood', 'wildfire'], secondary: ['heatwave'] },
    'Delhi': { primary: ['heatwave', 'earthquake', 'flood'], secondary: ['lightning'] },
    'Goa': { primary: ['flood', 'cyclone', 'landslide'], secondary: ['tsunami'] },
    'Gujarat': { primary: ['earthquake', 'cyclone', 'drought'], secondary: ['flood', 'heatwave'] },
    'Haryana': { primary: ['heatwave', 'flood', 'earthquake'], secondary: ['drought'] },
    'Himachal Pradesh': { primary: ['landslide', 'earthquake', 'avalanche'], secondary: ['flood', 'wildfire'] },
    'Jharkhand': { primary: ['lightning', 'drought', 'flood'], secondary: ['wildfire'] },
    'Karnataka': { primary: ['flood', 'drought', 'landslide'], secondary: ['cyclone', 'heatwave'] },
    'Kerala': { primary: ['flood', 'landslide', 'cyclone'], secondary: ['heatwave'] },
    'Madhya Pradesh': { primary: ['drought', 'flood', 'wildfire'], secondary: ['heatwave', 'earthquake'] },
    'Maharashtra': { primary: ['flood', 'drought', 'cyclone'], secondary: ['earthquake', 'landslide'] },
    'Manipur': { primary: ['earthquake', 'landslide', 'flood'], secondary: ['wildfire'] },
    'Meghalaya': { primary: ['flood', 'landslide', 'lightning'], secondary: ['earthquake'] },
    'Mizoram': { primary: ['landslide', 'earthquake', 'flood'], secondary: ['wildfire'] },
    'Nagaland': { primary: ['earthquake', 'landslide', 'flood'], secondary: ['wildfire'] },
    'Odisha': { primary: ['cyclone', 'flood', 'lightning'], secondary: ['drought', 'heatwave'] },
    'Punjab': { primary: ['flood', 'heatwave', 'earthquake'], secondary: ['drought'] },
    'Rajasthan': { primary: ['drought', 'heatwave', 'flood'], secondary: ['earthquake', 'wildfire'] },
    'Sikkim': { primary: ['earthquake', 'landslide', 'avalanche'], secondary: ['flood'] },
    'Tamil Nadu': { primary: ['cyclone', 'flood', 'heatwave'], secondary: ['drought', 'tsunami'] },
    'Telangana': { primary: ['heatwave', 'drought', 'flood'], secondary: ['lightning'] },
    'Tripura': { primary: ['flood', 'landslide', 'earthquake'], secondary: ['cyclone'] },
    'Uttar Pradesh': { primary: ['flood', 'heatwave', 'earthquake'], secondary: ['drought', 'lightning'] },
    'Uttarakhand': { primary: ['landslide', 'flood', 'earthquake'], secondary: ['avalanche', 'wildfire'] },
    'West Bengal': { primary: ['cyclone', 'flood', 'lightning'], secondary: ['landslide', 'earthquake'] }
};

window.STATE_HAZARD_DATA = STATE_HAZARD_DATA;

/**
 * Populates the state dropdown selector in the UI.
 */
function populateStateSelector() {
    const selectElement = document.getElementById('state-select');
    if (!selectElement) return;

    const states = Object.keys(STATE_HAZARD_DATA).sort();

    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        selectElement.appendChild(option);
    });

    selectElement.addEventListener('change', function () {
        const selectedState = this.value;
        if (selectedState === 'all') {
            resetMapToDefault();
        } else {
            highlightStateHazards(selectedState);
        }
    });
}

/**
 * Resets the map view to show all of India.
 */
function resetMapToDefault() {
    if (window.hazardMapInstance) {
        window.hazardMapInstance.setView([20.5937, 78.9629], 5);
        updateSidebar('All of India', 'Select a specific hazard filter or state to view detailed risk profiles and disaster-preparedness resources.', []);
    }
}

/**
 * Highlights hazards specific to the selected state and updates the sidebar.
 * @param {string} stateName - The name of the selected state.
 */
function highlightStateHazards(stateName) {
    const data = STATE_HAZARD_DATA[stateName];
    if (!data) return;

    let description = `<strong>${stateName}</strong> faces multiple natural hazards. `;
    description += `Primary risks include: ${data.primary.map(h => getHazardName(h)).join(', ')}. `;
    description += `Secondary risks include: ${data.secondary.map(h => getHazardName(h)).join(', ')}.`;

    // Gather resources from primary hazards
    let resources = [];
    data.primary.forEach(hazardId => {
        const hazard = HAZARD_CATEGORIES.find(h => h.id === hazardId);
        if (hazard) {
            resources = resources.concat(hazard.resources);
        }
    });

    // Remove duplicates from resources
    resources = [...new Set(resources)];

    updateSidebar(`${stateName} Risk Profile`, description, resources);

    // In a full implementation, this would filter the map layers to show only markers relevant to this state.
    console.log(`Filtering map for ${stateName} hazards:`, data.primary);
}

/**
 * Helper to get human-readable hazard name from ID.
 * @param {string} id - Hazard category ID.
 * @returns {string} Human-readable name.
 */
function getHazardName(id) {
    const hazard = HAZARD_CATEGORIES.find(h => h.id === id);
    return hazard ? hazard.name : id;
}
