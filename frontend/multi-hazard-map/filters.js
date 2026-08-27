/**
 * Filters Module
 * Handles the rendering and interaction logic for hazard category filters.
 */

/**
 * Renders the hazard filter buttons in the UI.
 */
function renderHazardFilters() {
    const filterContainer = document.getElementById('hazard-filters');
    if (!filterContainer) return;

    // Add "All" button first
    const allBtn = createFilterButton('all', 'All Hazards', '🗺️', true);
    filterContainer.appendChild(allBtn);

    // Add individual hazard buttons
    HAZARD_CATEGORIES.forEach(hazard => {
        const btn = createFilterButton(hazard.id, hazard.name, hazard.icon, false);
        filterContainer.appendChild(btn);
    });

    // Attach event listeners to all filter buttons
    const buttons = filterContainer.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Update map and sidebar
            const filterId = this.getAttribute('data-hazard');
            if (window.hazardMapInstance) {
                addHazardMarkersToMap(window.hazardMapInstance, filterId);
            }

            if (filterId === 'all') {
                updateSidebar('All Hazards', 'Select a specific hazard filter or state to view detailed risk profiles and disaster-preparedness resources.', []);
            } else {
                const hazard = HAZARD_CATEGORIES.find(h => h.id === filterId);
                if (hazard) {
                    updateSidebar(`${hazard.icon} ${hazard.name}`, hazard.description, hazard.resources);
                }
            }
        });
    });
}

/**
 * Creates a filter button element.
 * @param {string} id - The hazard ID or 'all'.
 * @param {string} name - The display name of the hazard.
 * @param {string} icon - The emoji icon for the hazard.
 * @param {boolean} isActive - Whether the button should be active by default.
 * @returns {HTMLElement} The created button element.
 */
function createFilterButton(id, name, icon, isActive) {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${isActive ? 'active' : ''}`;
    btn.setAttribute('data-hazard', id);
    btn.setAttribute('role', 'checkbox');
    btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
    btn.innerHTML = `<span>${icon}</span> <span>${name}</span>`;
    return btn;
}
