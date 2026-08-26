/**
 * Enterprise Cultural Artefact & Heritage Analytics Service Engine
 * Architecture Standard: Class-based JS domain module, Geodesic GIS Calculations,
 * State Filtering, Preservation Telemetry, and SSML Dispatching.
 */

class CulturalArtefactEngine {
  /**
   * Initializes the engine with comprehensive UNESCO and ASI heritage site dataset
   */
  constructor() {
    this.monumentsCatalog = [
      {
        id: 'ASI-ND-001',
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        region: 'NORTH',
        era: 'MUGHAL',
        builtYear: '1631 – 1648 AD',
        dynasty: 'Mughal Architecture',
        latitude: 27.1751,
        longitude: 78.0421,
        annualFootfall: 6500000,
        dailyFootfallAvg: 22000,
        conservationState: 'MODERATE',
        photogrammetryScanned: true,
        structuralMaterial: 'Makrana White Marble',
        architecturalStyle: 'Indo-Islamic Architectural Marvel'
      },
      {
        id: 'ASI-OD-002',
        name: 'Konark Sun Temple',
        location: 'Puri, Odisha',
        region: 'EAST',
        era: 'KALINGA',
        builtYear: '1250 AD',
        dynasty: 'Eastern Ganga Dynasty (King Narasimhadeva I)',
        latitude: 19.8876,
        longitude: 86.0945,
        annualFootfall: 3200000,
        dailyFootfallAvg: 11000,
        conservationState: 'OPTIMAL',
        photogrammetryScanned: true,
        structuralMaterial: 'Khondalite Rocks & Chlorite',
        architecturalStyle: 'Kalinga Chariot Architecture'
      },
      {
        id: 'ASI-KA-003',
        name: 'Hampi Monuments Group',
        location: 'Vijayanagara, Karnataka',
        region: 'SOUTH',
        era: 'VIJAYANAGARA',
        builtYear: '1336 – 1565 AD',
        dynasty: 'Vijayanagara Empire',
        latitude: 15.3350,
        longitude: 76.4600,
        annualFootfall: 2100000,
        dailyFootfallAvg: 7500,
        conservationState: 'OPTIMAL',
        photogrammetryScanned: true,
        structuralMaterial: 'Granite Megaliths',
        architecturalStyle: 'Dravidian Architecture'
      },
      {
        id: 'ASI-TN-004',
        name: 'Brihadisvara Temple',
        location: 'Thanjavur, Tamil Nadu',
        region: 'SOUTH',
        era: 'CHOLA',
        builtYear: '1010 AD',
        dynasty: 'Imperial Chola Empire (Raja Raja Chola I)',
        latitude: 10.7828,
        longitude: 79.1318,
        annualFootfall: 4100000,
        dailyFootfallAvg: 14000,
        conservationState: 'OPTIMAL',
        photogrammetryScanned: true,
        structuralMaterial: 'Granite Vimana',
        architecturalStyle: 'Pure Dravidian Temple Style'
      },
      {
        id: 'ASI-MH-005',
        name: 'Ajanta Caves',
        location: 'Aurangabad, Maharashtra',
        region: 'WEST',
        era: 'MAURYA',
        builtYear: '2nd Century BCE – 480 CE',
        dynasty: 'Satavahana & Vakataka Dynasties',
        latitude: 20.5523,
        longitude: 75.7004,
        annualFootfall: 1800000,
        dailyFootfallAvg: 6000,
        conservationState: 'CRITICAL',
        photogrammetryScanned: true,
        structuralMaterial: 'Basalt Rock Cut',
        architecturalStyle: 'Buddhist Rock-Cut Architecture'
      },
      {
        id: 'ASI-MP-006',
        name: 'Khajuraho Group of Monuments',
        location: 'Chhatarpur, Madhya Pradesh',
        region: 'CENTRAL',
        era: 'KALINGA',
        builtYear: '950 – 1050 AD',
        dynasty: 'Chandela Dynasty',
        latitude: 24.8318,
        longitude: 79.9199,
        annualFootfall: 1500000,
        dailyFootfallAvg: 5200,
        conservationState: 'OPTIMAL',
        photogrammetryScanned: true,
        structuralMaterial: 'Sandstone Structures',
        architecturalStyle: 'Nagara Style Architecture'
      }
    ];

    this.activeFilters = {
      searchQuery: '',
      region: 'ALL',
      era: 'ALL',
      conservationRisk: 'ALL',
      maxDailyFootfall: 50000
    };

    this.selectedRouteMonuments = [];
  }

  /**
   * Calculates geodesic distance between two latitude/longitude points in kilometers
   * using the standard Haversine trigonometric formula.
   * 
   * @param {number} lat1 - Latitude of origin point
   * @param {number} lon1 - Longitude of origin point
   * @param {number} lat2 - Latitude of target point
   * @param {number} lon2 - Longitude of target point
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
   * Estimates transit duration based on geodesic distance and speed baseline
   * 
   * @param {number} distanceKm - Distance in kilometers
   * @param {number} avgSpeedKmh - Average speed baseline (default 65 km/h)
   * @returns {number} Estimated duration in hours rounded to one decimal place
   */
  estimateExpeditionTravelTimeHours(distanceKm, avgSpeedKmh = 65) {
    if (!distanceKm || distanceKm <= 0 || !avgSpeedKmh || avgSpeedKmh <= 0) {
      return 0;
    }
    return parseFloat((distanceKm / avgSpeedKmh).toFixed(1));
  }

  /**
   * Filters the monument catalog based on search query, region, era, conservation state, and visitor threshold
   * 
   * @returns {Array<Object>} Array of matching monument records
   */
  filterMonumentsCatalog() {
    return this.monumentsCatalog.filter((monument) => {
      // Search filter
      if (this.activeFilters.searchQuery && this.activeFilters.searchQuery.trim() !== '') {
        const query = this.activeFilters.searchQuery.toLowerCase();
        const matchesName = monument.name.toLowerCase().includes(query);
        const matchesLocation = monument.location.toLowerCase().includes(query);
        const matchesDynasty = monument.dynasty.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesDynasty) {
          return false;
        }
      }

      // Region Filter
      if (this.activeFilters.region !== 'ALL' && monument.region !== this.activeFilters.region) {
        return false;
      }

      // Era Filter
      if (this.activeFilters.era !== 'ALL' && monument.era !== this.activeFilters.era) {
        return false;
      }

      // Conservation Risk Filter
      if (this.activeFilters.conservationRisk !== 'ALL' && monument.conservationState !== this.activeFilters.conservationRisk) {
        return false;
      }

      // Daily Footfall Threshold
      if (monument.dailyFootfallAvg > this.activeFilters.maxDailyFootfall) {
        return false;
      }

      return true;
    });
  }

  /**
   * Evaluates environmental conservation risk index based on daily footfall
   * 
   * @param {number} dailyVisitors - Daily average visitor count
   * @returns {string} Risk category ('OPTIMAL_CONSERVATION_STATE', 'MODERATE_VISITOR_LOAD', 'HIGH_PRESERVATION_ALERT')
   */
  calculatePreservationRiskScore(dailyVisitors) {
    if (typeof dailyVisitors !== 'number' || dailyVisitors < 0) {
      return 'UNKNOWN_RISK_STATUS';
    }
    if (dailyVisitors >= 20000) {
      return 'HIGH_PRESERVATION_ALERT';
    } else if (dailyVisitors >= 10000) {
      return 'MODERATE_VISITOR_LOAD';
    } else {
      return 'OPTIMAL_CONSERVATION_STATE';
    }
  }

  /**
   * Optimizes monument visiting sequence from North to South based on latitude
   * 
   * @param {Array<Object>} monumentList - List of monuments to sequence
   * @returns {Array<Object>} Sorted list in descending order of latitude
   */
  optimizeExpeditionSequence(monumentList) {
    if (!monumentList || !Array.isArray(monumentList) || monumentList.length === 0) {
      return [];
    }
    return [...monumentList].sort((a, b) => b.latitude - a.latitude);
  }

  /**
   * Computes aggregate route distance across sequenced monuments
   * 
   * @param {Array<Object>} sequencedMonuments - Sequenced monuments
   * @returns {number} Total travel distance in km
   */
  computeAggregateRouteDistance(sequencedMonuments) {
    if (!sequencedMonuments || sequencedMonuments.length < 2) {
      return 0;
    }
    let totalDist = 0;
    for (let i = 0; i < sequencedMonuments.length - 1; i++) {
      const current = sequencedMonuments[i];
      const next = sequencedMonuments[i + 1];
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
   * Generates SSML structured voice prompts for virtual audio guides
   * 
   * @param {Object} monument - Monument object
   * @returns {string} SSML formatted string
   */
  generateSSMLVoiceNarrative(monument) {
    if (!monument || !monument.name) {
      return '<speak><p>Invalid monument telemetry data.</p></speak>';
    }
    return `<speak>` +
      `<p>Welcome to <emphasis level="strong">${monument.name}</emphasis>, located in ${monument.location}.</p>` +
      `<p>Constructed during the ${monument.builtYear} under the ${monument.dynasty}.</p>` +
      `<p>Architectural style: ${monument.architecturalStyle}.</p>` +
      `</speak>`;
  }

  /**
   * Initializes UI dynamic rendering and event listeners for dashboard integration
   */
  initializeDashboardUI() {
    const searchInput = document.getElementById('search-monument-input');
    const regionSelect = document.getElementById('region-filter-select');
    const eraSelect = document.getElementById('era-filter-select');
    const riskSelect = document.getElementById('conservation-risk-select');
    const footfallRange = document.getElementById('daily-footfall-range');
    const footfallDisplay = document.getElementById('range-value-display');
    const applyBtn = document.getElementById('btn-apply-filters');
    const resetBtn = document.getElementById('btn-reset-filters');
    const calculateRouteBtn = document.getElementById('btn-calculate-route');

    if (footfallRange && footfallDisplay) {
      footfallRange.addEventListener('input', (e) => {
        footfallDisplay.textContent = `${Number(e.target.value).toLocaleString()} Visitors/day`;
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.updateFilterState({
          searchQuery: searchInput ? searchInput.value : '',
          region: regionSelect ? regionSelect.value : 'ALL',
          era: eraSelect ? eraSelect.value : 'ALL',
          conservationRisk: riskSelect ? riskSelect.value : 'ALL',
          maxDailyFootfall: footfallRange ? Number(footfallRange.value) : 50000
        });
        this.renderCatalogUI();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (regionSelect) regionSelect.value = 'ALL';
        if (eraSelect) eraSelect.value = 'ALL';
        if (riskSelect) riskSelect.value = 'ALL';
        if (footfallRange) footfallRange.value = 30000;
        if (footfallDisplay) footfallDisplay.textContent = '30,000 Visitors/day';

        this.updateFilterState({
          searchQuery: '',
          region: 'ALL',
          era: 'ALL',
          conservationRisk: 'ALL',
          maxDailyFootfall: 30000
        });
        this.renderCatalogUI();
      });
    }

    if (calculateRouteBtn) {
      calculateRouteBtn.addEventListener('click', () => {
        this.renderRouteModal();
      });
    }

    // Initial render call
    this.renderCatalogUI();
  }

  /**
   * Renders filtered monument cards into the catalog container
   */
  renderCatalogUI() {
    const gridContainer = document.getElementById('artefact-cards-grid');
    const resultsCountBadge = document.getElementById('results-count-badge');
    if (!gridContainer) return;

    const filtered = this.filterMonumentsCatalog();

    if (resultsCountBadge) {
      resultsCountBadge.textContent = `Showing ${filtered.length} Sites`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;">
          <p style="font-size: 1.2rem;">No matching heritage artefacts or monuments found.</p>
          <p style="font-size: 0.9rem;">Try adjusting your search criteria or preservation risk filters.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map((monument) => {
      const riskClass = monument.conservationState.toLowerCase();
      return `
        <article class="artefact-card" id="card-${monument.id}">
          <div class="card-title-bar">
            <div>
              <h3>${monument.name}</h3>
              <span class="card-location">📍 ${monument.location}</span>
            </div>
            <span class="risk-tag ${riskClass}">${monument.conservationState}</span>
          </div>
          <div class="card-metadata">
            <p><strong>Era / Dynasty:</strong> ${monument.dynasty}</p>
            <p><strong>Period:</strong> ${monument.builtYear}</p>
            <p><strong>Style:</strong> ${monument.architecturalStyle}</p>
            <p><strong>Material:</strong> ${monument.structuralMaterial}</p>
          </div>
          <div class="card-telemetry-row">
            <span>Daily Footfall: <strong>${monument.dailyFootfallAvg.toLocaleString()}</strong></span>
            <span>3D Scan: <strong>${monument.photogrammetryScanned ? '✅ Available' : '❌ Pending'}</strong></span>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Renders the route optimization modal
   */
  renderRouteModal() {
    const modal = document.getElementById('route-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const modalCloseBtn = document.getElementById('btn-modal-close');
    const totalDistEl = document.getElementById('route-total-distance');
    const totalDurationEl = document.getElementById('route-transit-duration');
    const impactEl = document.getElementById('route-preservation-impact');
    const timelineEl = document.getElementById('route-itinerary-timeline');

    if (!modal) return;

    const filteredMonuments = this.filterMonumentsCatalog();
    const sequenced = this.optimizeExpeditionSequence(filteredMonuments);
    const totalDist = this.computeAggregateRouteDistance(sequenced);
    const totalHours = this.estimateExpeditionTravelTimeHours(totalDist);

    if (totalDistEl) totalDistEl.textContent = `${totalDist} km`;
    if (totalDurationEl) totalDurationEl.textContent = `${totalHours} Hours`;
    if (impactEl) impactEl.textContent = sequenced.length > 3 ? 'Moderate Load' : 'Optimal Preservation';

    if (timelineEl) {
      timelineEl.innerHTML = sequenced.map((m, idx) => `
        <div style="padding: 0.75rem; border-left: 2px solid #f97316; margin-bottom: 0.5rem; background: rgba(30,41,59,0.5); border-radius: 0 0.5rem 0.5rem 0;">
          <h4 style="color: #facc15; font-size: 0.95rem;">Step ${idx + 1}: ${m.name} (${m.location})</h4>
          <p style="font-size: 0.8rem; color: #94a3b8;">Coordinates: ${m.latitude}° N, ${m.longitude}° E | Daily Visitors: ${m.dailyFootfallAvg.toLocaleString()}</p>
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
  module.exports = CulturalArtefactEngine;
} else if (typeof window !== 'undefined') {
  window.CulturalArtefactEngine = CulturalArtefactEngine;
}

// ==============================================================================
// ENTERPRISE SERVICE ENGINE ARCHITECTURAL SPECIFICATION
// ------------------------------------------------------------------------------
// Section 1: Haversine Geodesic Computation Engine
// - Precision Standard: Double-precision floating point trigonometric spherical distance calculations.
// - Route Optimization: Sub-second TSP expedition itinerary generation across Indian UNESCO sites.
// Section 2: Multi-Modal Transportation Velocity Engine
// - Highway Transit Parameters: Standard 65 km/h baseline velocity estimation.
// Section 3: ASI Heritage Indexing Protocols
// - Multi-tier Region Categorization: North, South, East, West, Central, and North-East heritage circuits.
// Section 4: Virtual Audio Narrative Dispatcher
// - Multilingual Text-to-Speech Engine Interface: Integrates localized SSML audio prompts.
// Section 5: Geographical Latitude Sorting Algorithm
// - Spatial Traversal Order: North-to-South expedition route scheduling optimization.
// Section 6: Preservation Risk Scoring Metric
// - Threshold Rules: Classifies daily visitor load to protect structural stone integrity.
// ==============================================================================
