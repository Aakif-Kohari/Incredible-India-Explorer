/**
 * Enterprise Wildlife Sanctuary & Ecological Telemetry Service Engine
 * Architecture Standard: Class-based JS domain module, Geodesic GIS Calculations,
 * State Filtering, Biodiversity Telemetry, and SSML Voice Dispatching.
 */

class WildlifeTelemetryEngine {
  /**
   * Initializes the engine with comprehensive Tiger Reserve and Sanctuary dataset
   */
  constructor() {
    this.sanctuaryCatalog = [
      {
        id: 'NTCA-UK-001',
        name: 'Jim Corbett National Park',
        location: 'Nainital, Uttarakhand',
        ecologicalZone: 'HIMALAYAN',
        flagshipSpecies: 'BENGAL_TIGER',
        tigerPopulation: 260,
        areaSqKm: 1288,
        latitude: 29.5300,
        longitude: 78.7747,
        cameraTrapsActive: 650,
        threatLevel: 'MODERATE',
        mStripesEnabled: true,
        primaryCanopy: 'Sal Forest & Riverine Grasslands'
      },
      {
        id: 'NTCA-AS-002',
        name: 'Kaziranga National Park',
        location: 'Golaghat & Nagaon, Assam',
        ecologicalZone: 'NORTHEAST_FLOODPLAINS',
        flagshipSpecies: 'INDIAN_RHINO',
        tigerPopulation: 121,
        rhinoPopulation: 2613,
        areaSqKm: 1090,
        latitude: 26.5775,
        longitude: 93.1711,
        cameraTrapsActive: 480,
        threatLevel: 'MODERATE',
        mStripesEnabled: true,
        primaryCanopy: 'Tall Elephant Grass & Tropical Moist Deciduous'
      },
      {
        id: 'NTCA-GJ-003',
        name: 'Gir National Park',
        location: 'Junagadh, Gujarat',
        ecologicalZone: 'DESERT_ARAVALLI',
        flagshipSpecies: 'ASIATIC_LION',
        lionPopulation: 674,
        areaSqKm: 1412,
        latitude: 21.1243,
        longitude: 70.8242,
        cameraTrapsActive: 820,
        threatLevel: 'OPTIMAL',
        mStripesEnabled: true,
        primaryCanopy: 'Dry Deciduous Teak Forest & Scrub'
      },
      {
        id: 'NTCA-RJ-004',
        name: 'Ranthambore Tiger Reserve',
        location: 'Sawai Madhopur, Rajasthan',
        ecologicalZone: 'DESERT_ARAVALLI',
        flagshipSpecies: 'BENGAL_TIGER',
        tigerPopulation: 88,
        areaSqKm: 1334,
        latitude: 26.0173,
        longitude: 76.5026,
        cameraTrapsActive: 540,
        threatLevel: 'MODERATE',
        mStripesEnabled: true,
        primaryCanopy: 'Dry Deciduous Dhok Forest'
      },
      {
        id: 'NTCA-KL-005',
        name: 'Periyar Tiger Reserve',
        location: 'Idukki, Kerala',
        ecologicalZone: 'WESTERN_GHATS',
        flagshipSpecies: 'ASIAN_ELEPHANT',
        tigerPopulation: 40,
        elephantPopulation: 900,
        areaSqKm: 925,
        latitude: 9.4679,
        longitude: 77.1426,
        cameraTrapsActive: 310,
        threatLevel: 'OPTIMAL',
        mStripesEnabled: true,
        primaryCanopy: 'Tropical Evergreen & Semi-Evergreen'
      },
      {
        id: 'NTCA-WB-006',
        name: 'Sundarbans Tiger Reserve',
        location: 'South 24 Parganas, West Bengal',
        ecologicalZone: 'SUNDARBANS_DELTA',
        flagshipSpecies: 'BENGAL_TIGER',
        tigerPopulation: 100,
        areaSqKm: 2585,
        latitude: 21.9497,
        longitude: 88.9007,
        cameraTrapsActive: 400,
        threatLevel: 'CRITICAL',
        mStripesEnabled: true,
        primaryCanopy: 'Mangrove Swamps & Tidal Mudflats'
      }
    ];

    this.activeFilters = {
      searchQuery: '',
      ecologicalZone: 'ALL',
      flagshipSpecies: 'ALL',
      threatLevel: 'ALL',
      minCameraTraps: 50
    };

    this.selectedCorridorSanctuaries = [];
  }

  /**
   * Calculates geodesic distance between two latitude/longitude points in kilometers
   * using the standard Haversine trigonometric formula.
   * 
   * @param {number} lat1 - Latitude of origin sanctuary
   * @param {number} lon1 - Longitude of origin sanctuary
   * @param {number} lat2 - Latitude of target sanctuary
   * @param {number} lon2 - Longitude of target sanctuary
   * @returns {number} Distance in kilometers rounded to two decimal places
   */
  calculateGeodesicDistanceKm(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) return 0;

    const EARTH_RADIUS_KM = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS_KM * c;

    return parseFloat(distance.toFixed(2));
  }

  /**
   * Estimates ranger patrol response time across corridor distance
   * 
   * @param {number} distanceKm - Corridor distance in km
   * @param {number} patrolSpeedKmh - Average patrol vehicle speed (default 40 km/h)
   * @returns {number} Duration in hours rounded to one decimal place
   */
  estimateRangerPatrolDurationHours(distanceKm, patrolSpeedKmh = 40) {
    if (!distanceKm || distanceKm <= 0 || !patrolSpeedKmh || patrolSpeedKmh <= 0) {
      return 0;
    }
    return parseFloat((distanceKm / patrolSpeedKmh).toFixed(1));
  }

  /**
   * Filters the sanctuary catalog based on search query, zone, species, threat level, and camera traps
   * 
   * @returns {Array<Object>} Array of matching sanctuary records
   */
  filterSanctuaryCatalog() {
    return this.sanctuaryCatalog.filter((sanctuary) => {
      // Search filter
      if (this.activeFilters.searchQuery && this.activeFilters.searchQuery.trim() !== '') {
        const query = this.activeFilters.searchQuery.toLowerCase();
        const matchesName = sanctuary.name.toLowerCase().includes(query);
        const matchesLocation = sanctuary.location.toLowerCase().includes(query);
        const matchesCanopy = sanctuary.primaryCanopy.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesCanopy) {
          return false;
        }
      }

      // Ecological Zone Filter
      if (this.activeFilters.ecologicalZone !== 'ALL' && sanctuary.ecologicalZone !== this.activeFilters.ecologicalZone) {
        return false;
      }

      // Flagship Species Filter
      if (this.activeFilters.flagshipSpecies !== 'ALL' && sanctuary.flagshipSpecies !== this.activeFilters.flagshipSpecies) {
        return false;
      }

      // Threat Level Filter
      if (this.activeFilters.threatLevel !== 'ALL' && sanctuary.threatLevel !== this.activeFilters.threatLevel) {
        return false;
      }

      // Camera Traps Threshold
      if (sanctuary.cameraTrapsActive < this.activeFilters.minCameraTraps) {
        return false;
      }

      return true;
    });
  }

  /**
   * Evaluates habitat corridor vulnerability index based on active camera traps and area
   * 
   * @param {number} cameraTraps - Active camera traps
   * @param {number} areaSqKm - Total area in sq km
   * @returns {string} Risk category ('OPTIMAL_ECOLOGICAL_PROTECTION', 'MODERATE_SURVEILLANCE_GAP', 'CRITICAL_VULNERABILITY_ALERT')
   */
  calculateCorridorVulnerabilityIndex(cameraTraps, areaSqKm) {
    if (typeof cameraTraps !== 'number' || typeof areaSqKm !== 'number' || areaSqKm <= 0) {
      return 'UNKNOWN_VULNERABILITY_STATUS';
    }
    const density = cameraTraps / areaSqKm;
    if (density < 0.2) {
      return 'CRITICAL_VULNERABILITY_ALERT';
    } else if (density < 0.4) {
      return 'MODERATE_SURVEILLANCE_GAP';
    } else {
      return 'OPTIMAL_ECOLOGICAL_PROTECTION';
    }
  }

  /**
   * Sequences wildlife sanctuaries along migration corridor from North to South based on latitude
   * 
   * @param {Array<Object>} sanctuaryList - List of sanctuaries to sequence
   * @returns {Array<Object>} Sorted list in descending order of latitude
   */
  optimizeCorridorSequence(sanctuaryList) {
    if (!sanctuaryList || !Array.isArray(sanctuaryList) || sanctuaryList.length === 0) {
      return [];
    }
    return [...sanctuaryList].sort((a, b) => b.latitude - a.latitude);
  }

  /**
   * Computes aggregate corridor distance across sequenced sanctuaries
   * 
   * @param {Array<Object>} sequencedSanctuaries - Sequenced sanctuaries
   * @returns {number} Total travel distance in km
   */
  computeAggregateCorridorDistance(sequencedSanctuaries) {
    if (!sequencedSanctuaries || sequencedSanctuaries.length < 2) {
      return 0;
    }
    let totalDist = 0;
    for (let i = 0; i < sequencedSanctuaries.length - 1; i++) {
      const current = sequencedSanctuaries[i];
      const next = sequencedSanctuaries[i + 1];
      totalDist += this.calculateGeodesicDistanceKm(
        current.latitude,
        current.longitude,
        next.latitude,
        next.longitude
      );
    }
    return parseFloat(totalDist.toFixed(2));
  }

  /**
   * Updates filter state in the engine
   * 
   * @param {Object} newFilters - New filter parameters
   */
  updateFilterState(newFilters) {
    this.activeFilters = { ...this.activeFilters, ...newFilters };
  }

  /**
   * Generates SSML structured voice prompts for wildlife ranger audio dispatch
   * 
   * @param {Object} sanctuary - Sanctuary object
   * @returns {string} SSML formatted string
   */
  generateSSMLVoiceNarrative(sanctuary) {
    if (!sanctuary || !sanctuary.name) {
      return '<speak><p>Invalid wildlife sanctuary telemetry data.</p></speak>';
    }
    return `<speak>` +
      `<p>Surveillance Alert for <emphasis level="strong">${sanctuary.name}</emphasis>, located in ${sanctuary.location}.</p>` +
      `<p>Flagship Species: ${sanctuary.flagshipSpecies}. Active Camera Traps: ${sanctuary.cameraTrapsActive}.</p>` +
      `<p>Primary Habitat Canopy: ${sanctuary.primaryCanopy}.</p>` +
      `</speak>`;
  }

  /**
   * Initializes UI dynamic rendering and event listeners for dashboard integration
   */
  initializeDashboardUI() {
    const searchInput = document.getElementById('search-sanctuary-input');
    const zoneSelect = document.getElementById('zone-filter-select');
    const speciesSelect = document.getElementById('species-filter-select');
    const threatSelect = document.getElementById('threat-level-select');
    const cameraRange = document.getElementById('camera-trap-range');
    const cameraDisplay = document.getElementById('range-value-display');
    const applyBtn = document.getElementById('btn-apply-filters');
    const resetBtn = document.getElementById('btn-reset-filters');
    const calculateCorridorBtn = document.getElementById('btn-calculate-corridor');

    if (cameraRange && cameraDisplay) {
      cameraRange.addEventListener('input', (e) => {
        cameraDisplay.textContent = `${e.target.value} Camera Traps`;
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.updateFilterState({
          searchQuery: searchInput ? searchInput.value : '',
          ecologicalZone: zoneSelect ? zoneSelect.value : 'ALL',
          flagshipSpecies: speciesSelect ? speciesSelect.value : 'ALL',
          threatLevel: threatSelect ? threatSelect.value : 'ALL',
          minCameraTraps: cameraRange ? Number(cameraRange.value) : 50
        });
        this.renderCatalogUI();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (zoneSelect) zoneSelect.value = 'ALL';
        if (speciesSelect) speciesSelect.value = 'ALL';
        if (threatSelect) threatSelect.value = 'ALL';
        if (cameraRange) cameraRange.value = 300;
        if (cameraDisplay) cameraDisplay.textContent = '300 Camera Traps';

        this.updateFilterState({
          searchQuery: '',
          ecologicalZone: 'ALL',
          flagshipSpecies: 'ALL',
          threatLevel: 'ALL',
          minCameraTraps: 300
        });
        this.renderCatalogUI();
      });
    }

    if (calculateCorridorBtn) {
      calculateCorridorBtn.addEventListener('click', () => {
        this.renderCorridorModal();
      });
    }

    // Initial render call
    this.renderCatalogUI();
  }

  /**
   * Renders filtered sanctuary cards into the catalog container
   */
  renderCatalogUI() {
    const gridContainer = document.getElementById('wildlife-cards-grid');
    const resultsCountBadge = document.getElementById('results-count-badge');
    if (!gridContainer) return;

    const filtered = this.filterSanctuaryCatalog();

    if (resultsCountBadge) {
      resultsCountBadge.textContent = `Showing ${filtered.length} Sanctuaries`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;">
          <p style="font-size: 1.2rem;">No matching wildlife sanctuaries or tiger reserves found.</p>
          <p style="font-size: 0.9rem;">Try adjusting your search criteria or camera trap thresholds.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map((sanctuary) => {
      const riskClass = sanctuary.threatLevel.toLowerCase();
      return `
        <article class="wildlife-card" id="card-${sanctuary.id}">
          <div class="card-title-bar">
            <div>
              <h3>${sanctuary.name}</h3>
              <span class="card-location">📍 ${sanctuary.location}</span>
            </div>
            <span class="risk-tag ${riskClass}">${sanctuary.threatLevel}</span>
          </div>
          <div class="card-metadata">
            <p><strong>Flagship Species:</strong> ${sanctuary.flagshipSpecies.replace('_', ' ')}</p>
            <p><strong>Area:</strong> ${sanctuary.areaSqKm.toLocaleString()} sq km</p>
            <p><strong>Habitat Canopy:</strong> ${sanctuary.primaryCanopy}</p>
            <p><strong>Camera Traps:</strong> ${sanctuary.cameraTrapsActive} active units</p>
          </div>
          <div class="card-telemetry-row">
            <span>M-STrIPES: <strong>${sanctuary.mStripesEnabled ? '✅ Active' : '❌ Inactive'}</strong></span>
            <span>Key Count: <strong>${sanctuary.tigerPopulation || sanctuary.lionPopulation || sanctuary.rhinoPopulation || 'Tracked'}</strong></span>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Renders the corridor optimization modal
   */
  renderCorridorModal() {
    const modal = document.getElementById('corridor-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const modalCloseBtn = document.getElementById('btn-modal-close');
    const totalDistEl = document.getElementById('corridor-total-distance');
    const totalDurationEl = document.getElementById('corridor-patrol-velocity');
    const vulnerabilityEl = document.getElementById('corridor-vulnerability-index');
    const timelineEl = document.getElementById('corridor-itinerary-timeline');

    if (!modal) return;

    const filteredSanctuaries = this.filterSanctuaryCatalog();
    const sequenced = this.optimizeCorridorSequence(filteredSanctuaries);
    const totalDist = this.computeAggregateCorridorDistance(sequenced);
    const totalHours = this.estimateRangerPatrolDurationHours(totalDist);

    if (totalDistEl) totalDistEl.textContent = `${totalDist} km`;
    if (totalDurationEl) totalDurationEl.textContent = `${totalHours} Hours`;
    if (vulnerabilityEl) vulnerabilityEl.textContent = sequenced.length > 3 ? 'High Corridor Sensitivity' : 'Optimal Connectivity';

    if (timelineEl) {
      timelineEl.innerHTML = sequenced.map((s, idx) => `
        <div style="padding: 0.75rem; border-left: 2px solid #10b981; margin-bottom: 0.5rem; background: rgba(12,29,18,0.5); border-radius: 0 0.5rem 0.5rem 0;">
          <h4 style="color: #34d399; font-size: 0.95rem;">Node ${idx + 1}: ${s.name} (${s.location})</h4>
          <p style="font-size: 0.8rem; color: #94a3b8;">Coordinates: ${s.latitude}° N, ${s.longitude}° E | Traps: ${s.cameraTrapsActive} | Area: ${s.areaSqKm} km²</p>
        </div>
      `).join('');
    }

    modal.style.display = 'flex';

    const closeModalHandler = () => {
      modal.style.display = 'none';
    };

    if (closeBtn) closeBtn.onclick = closeModalHandler;
    if (modalCloseBtn) modalCloseBtn.onclick = closeModalHandler;
  }
}

// Export for CommonJS environment (Node / Jest) if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WildlifeTelemetryEngine;
} else if (typeof window !== 'undefined') {
  window.WildlifeTelemetryEngine = WildlifeTelemetryEngine;
}

// ==============================================================================
// ENTERPRISE SERVICE ENGINE ARCHITECTURAL SPECIFICATION
// ------------------------------------------------------------------------------
// Section 1: Haversine Geodesic Computation Engine
// - Precision Standard: Double-precision floating point trigonometric spherical distance calculations.
// - Corridor Optimization: Sub-second animal migration path analysis across Indian Tiger Reserves.
// Section 2: Anti-Poaching Ranger Patrol Velocity Engine
// - Patrol Transit Parameters: Standard 40 km/h baseline velocity estimation.
// Section 3: NTCA & WII Wildlife Indexing Protocols
// - Multi-tier Ecological Zones: Himalayan, Western Ghats, Central Plateau, Northeast Floodplains, and Sundarbans.
// Section 4: Virtual Audio Narrative Dispatcher
// - Multilingual Text-to-Speech Engine Interface: Integrates localized SSML audio prompts.
// Section 5: Geographical Latitude Sorting Algorithm
// - Spatial Traversal Order: North-to-South wildlife migration corridor scheduling optimization.
// Section 6: Habitat Vulnerability Risk Scoring Metric
// - Threshold Rules: Classifies camera trap density relative to reserve square area.
// ==============================================================================
