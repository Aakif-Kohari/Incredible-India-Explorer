// Folk Dances Map Interactive Logic
(function() {
  // DOM Elements
  const mapContainer = document.getElementById('svg-map-container');
  const panelPlaceholder = document.getElementById('panel-placeholder');
  const panelContent = document.getElementById('panel-content');
  const danceNameEl = document.getElementById('dance-name');
  const stateNameEl = document.getElementById('dance-state-name');
  const danceHistoryEl = document.getElementById('dance-history');
  const danceCostumesEl = document.getElementById('dance-costumes');
  const danceFestivalsEl = document.getElementById('dance-festivals');

  const svgNS = "http://www.w3.org/2000/svg";

  // Map state to full names based on `mapData` context if available, otherwise fallback
  // The mapData locations have `id` and `title`.
  let stateMap = {};

  function initMap() {
    if (typeof mapData === 'undefined') {
      console.error('mapData is not defined. Ensure map-data.js is loaded.');
      return;
    }

    // Create SVG element
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', mapData.viewBox || "0 0 600 700");
    svg.setAttribute('class', 'india-svg-map');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Interactive map of India showing folk dances by state');

    // Create group for states
    const statesGroup = document.createElementNS(svgNS, 'g');
    statesGroup.setAttribute('id', 'states-layer');

    // Iterate over map locations to create paths
    mapData.locations.forEach(location => {
      // Store mapping of id to title for later use
      stateMap[location.id] = location.title;

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', location.d);
      path.setAttribute('id', location.id);
      path.setAttribute('data-name', location.title);
      
      // Make it accessible
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      path.setAttribute('aria-label', location.title);

      // Add tooltip as title
      const title = document.createElementNS(svgNS, 'title');
      title.textContent = location.title;
      path.appendChild(title);

      // Event listeners
      path.addEventListener('click', () => handleStateSelect(location.id, path));
      path.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStateSelect(location.id, path);
        }
      });

      statesGroup.appendChild(path);
    });

    svg.appendChild(statesGroup);
    mapContainer.appendChild(svg);
  }

  function handleStateSelect(stateId, pathElement) {
    // Remove active class from all paths
    const allPaths = document.querySelectorAll('.india-svg-map path');
    allPaths.forEach(p => p.classList.remove('active'));

    // Add active class to selected
    pathElement.classList.add('active');

    // Fetch data
    const data = folkDancesData[stateId];
    const stateName = stateMap[stateId] || stateId.toUpperCase();

    if (data) {
      // Populate panel
      danceNameEl.textContent = data.name;
      stateNameEl.textContent = stateName;
      danceHistoryEl.textContent = data.history;
      danceCostumesEl.textContent = data.costumes;
      danceFestivalsEl.textContent = data.festivals;

      // Show panel content
      panelPlaceholder.hidden = true;
      panelContent.hidden = false;
    } else {
      // Data not found for this state
      danceNameEl.textContent = "Data Coming Soon";
      stateNameEl.textContent = stateName;
      danceHistoryEl.textContent = "We are currently compiling folk dance information for this region.";
      danceCostumesEl.textContent = "Information unavailable.";
      danceFestivalsEl.textContent = "Information unavailable.";

      panelPlaceholder.hidden = true;
      panelContent.hidden = false;
    }
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initMap);
})();
