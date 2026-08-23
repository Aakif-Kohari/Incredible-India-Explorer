/**
 * Enterprise Ayurvedic & Traditional Wellness Telemetry Service Engine
 * Architecture Standard: Class-based JS domain module, Geodesic GIS Calculations,
 * State Filtering, Tridosha Telemetry, and SSML Voice Dispatching.
 */

class AyurvedicWellnessEngine {
  /**
   * Initializes the engine with comprehensive AYUSH certified retreat dataset
   */
  constructor() {
    this.retreatCatalog = [
      {
        id: 'AYUSH-KL-001',
        name: 'Somatheeram Ayurvedic Health Resort',
        location: 'Kovalam, Kerala',
        region: 'KERALA_SOUTH',
        doshaFocus: 'TRIDOSHA_BALANCED',
        accreditationLevel: 'NABH_DIAMOND',
        latitude: 8.3842,
        longitude: 76.9785,
        dailyGuestCapacity: 120,
        panchakarmaRooms: 30,
        herbalGardenSpecies: 450,
        primaryTherapy: 'Rasayana & Kayakalpa Chikitsa'
      },
      {
        id: 'AYUSH-UK-002',
        name: 'Ananda in the Himalayas',
        location: 'Narendra Nagar, Uttarakhand',
        region: 'HIMALAYAN_NORTH',
        doshaFocus: 'VATA',
        accreditationLevel: 'NABH_DIAMOND',
        latitude: 30.1472,
        longitude: 78.2917,
        dailyGuestCapacity: 80,
        panchakarmaRooms: 24,
        herbalGardenSpecies: 280,
        primaryTherapy: 'Sirodhara & Yoga Meditation'
      },
      {
        id: 'AYUSH-KA-003',
        name: 'Soukya International Holistic Health Centre',
        location: 'Bengaluru, Karnataka',
        region: 'WESTERN_GHATS',
        doshaFocus: 'PITTA',
        accreditationLevel: 'AYUSH_PREMIER',
        latitude: 12.9716,
        longitude: 77.5946,
        dailyGuestCapacity: 60,
        panchakarmaRooms: 18,
        herbalGardenSpecies: 520,
        primaryTherapy: 'Panchakarma & Homeopathic Detox'
      },
      {
        id: 'AYUSH-KL-004',
        name: 'Kalari Kovilakom Palace for Ayurveda',
        location: 'Kollengode, Palakkad, Kerala',
        region: 'KERALA_SOUTH',
        doshaFocus: 'KAPHA',
        accreditationLevel: 'NABH_DIAMOND',
        latitude: 10.6133,
        longitude: 76.6974,
        dailyGuestCapacity: 40,
        panchakarmaRooms: 14,
        herbalGardenSpecies: 600,
        primaryTherapy: 'Strict Authentic Panchakarma'
      },
      {
        id: 'AYUSH-MP-005',
        name: 'Amarkantak Herbal & Healing Retreat',
        location: 'Amarkantak, Madhya Pradesh',
        region: 'CENTRAL_HERBAL',
        doshaFocus: 'TRIDOSHA_BALANCED',
        accreditationLevel: 'AYUSH_PREMIER',
        latitude: 22.6728,
        longitude: 81.7547,
        dailyGuestCapacity: 90,
        panchakarmaRooms: 20,
        herbalGardenSpecies: 850,
        primaryTherapy: 'Nattu Chikitsa & Rare Herbal Infusions'
      },
      {
        id: 'AYUSH-GA-006',
        name: 'Devayaa Ayurveda & Nature Care Centre',
        location: 'Divar Island, Goa',
        region: 'GOA_KONKAN',
        doshaFocus: 'PITTA',
        accreditationLevel: 'STANDARD_HERITAGE',
        latitude: 15.5186,
        longitude: 73.8821,
        dailyGuestCapacity: 100,
        panchakarmaRooms: 22,
        herbalGardenSpecies: 310,
        primaryTherapy: 'Naturopathy & Abhyanga Massage'
      }
    ];

    this.activeFilters = {
      searchQuery: '',
      region: 'ALL',
      doshaFocus: 'ALL',
      accreditationLevel: 'ALL',
      maxCapacity: 500
    };

    this.selectedCircuitRetreats = [];
  }

  /**
   * Calculates geodesic distance between two latitude/longitude points in kilometers
   * using the standard Haversine trigonometric formula.
   * 
   * @param {number} lat1 - Latitude of origin retreat
   * @param {number} lon1 - Longitude of origin retreat
   * @param {number} lat2 - Latitude of target retreat
   * @param {number} lon2 - Longitude of target retreat
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
   * Estimates wellness transit duration based on geodesic distance and speed baseline
   * 
   * @param {number} distanceKm - Distance in kilometers
   * @param {number} avgSpeedKmh - Average speed baseline (default 60 km/h)
   * @returns {number} Estimated duration in hours rounded to one decimal place
   */
  estimateWellnessTravelTimeHours(distanceKm, avgSpeedKmh = 60) {
    if (!distanceKm || distanceKm <= 0 || !avgSpeedKmh || avgSpeedKmh <= 0) {
      return 0;
    }
    return parseFloat((distanceKm / avgSpeedKmh).toFixed(1));
  }

  /**
   * Filters the retreat catalog based on search query, region, dosha focus, accreditation, and capacity
   * 
   * @returns {Array<Object>} Array of matching retreat records
   */
  filterRetreatCatalog() {
    return this.retreatCatalog.filter((retreat) => {
      // Search filter
      if (this.activeFilters.searchQuery && this.activeFilters.searchQuery.trim() !== '') {
        const query = this.activeFilters.searchQuery.toLowerCase();
        const matchesName = retreat.name.toLowerCase().includes(query);
        const matchesLocation = retreat.location.toLowerCase().includes(query);
        const matchesTherapy = retreat.primaryTherapy.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesTherapy) {
          return false;
        }
      }

      // Region Filter
      if (this.activeFilters.region !== 'ALL' && retreat.region !== this.activeFilters.region) {
        return false;
      }

      // Dosha Focus Filter
      if (this.activeFilters.doshaFocus !== 'ALL' && retreat.doshaFocus !== this.activeFilters.doshaFocus) {
        return false;
      }

      // Accreditation Level Filter
      if (this.activeFilters.accreditationLevel !== 'ALL' && retreat.accreditationLevel !== this.activeFilters.accreditationLevel) {
        return false;
      }

      // Daily Guest Capacity Threshold
      if (retreat.dailyGuestCapacity > this.activeFilters.maxCapacity) {
        return false;
      }

      return true;
    });
  }

  /**
   * Evaluates Tridosha Diagnostic Harmony Score based on herbal species density
   * 
   * @param {number} speciesCount - Count of medicinal flora species
   * @returns {string} Risk category ('OPTIMAL_HERBAL_HARMONY', 'MODERATE_FLORA_DENSITY', 'BASIC_WELLNESS_FACILITY')
   */
  calculateTridoshaHarmonyIndex(speciesCount) {
    if (typeof speciesCount !== 'number' || speciesCount < 0) {
      return 'UNKNOWN_HARMONY_STATUS';
    }
    if (speciesCount >= 500) {
      return 'OPTIMAL_HERBAL_HARMONY';
    } else if (speciesCount >= 300) {
      return 'MODERATE_FLORA_DENSITY';
    } else {
      return 'BASIC_WELLNESS_FACILITY';
    }
  }

  /**
   * Sequences wellness retreats along Panchakarma circuit from North to South based on latitude
   * 
   * @param {Array<Object>} retreatList - List of retreats to sequence
   * @returns {Array<Object>} Sorted list in descending order of latitude
   */
  optimizeCircuitSequence(retreatList) {
    if (!retreatList || !Array.isArray(retreatList) || retreatList.length === 0) {
      return [];
    }
    return [...retreatList].sort((a, b) => b.latitude - a.latitude);
  }

  /**
   * Computes aggregate circuit distance across sequenced retreats
   * 
   * @param {Array<Object>} sequencedRetreats - Sequenced retreats
   * @returns {number} Total travel distance in km
   */
  computeAggregateCircuitDistance(sequencedRetreats) {
    if (!sequencedRetreats || sequencedRetreats.length < 2) {
      return 0;
    }
    let totalDist = 0;
    for (let i = 0; i < sequencedRetreats.length - 1; i++) {
      const current = sequencedRetreats[i];
      const next = sequencedRetreats[i + 1];
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
   * Generates SSML structured voice prompts for wellness center audio dispatch
   * 
   * @param {Object} retreat - Retreat object
   * @returns {string} SSML formatted string
   */
  generateSSMLVoiceNarrative(retreat) {
    if (!retreat || !retreat.name) {
      return '<speak><p>Invalid Ayurvedic retreat telemetry data.</p></speak>';
    }
    return `<speak>` +
      `<p>Welcome to <emphasis level="strong">${retreat.name}</emphasis>, located in ${retreat.location}.</p>` +
      `<p>Accreditation Level: ${retreat.accreditationLevel}. Tridosha Diagnostic Focus: ${retreat.doshaFocus}.</p>` +
      `<p>Primary Therapy: ${retreat.primaryTherapy}.</p>` +
      `</speak>`;
  }

  /**
   * Initializes UI dynamic rendering and event listeners for dashboard integration
   */
  initializeDashboardUI() {
    const searchInput = document.getElementById('search-retreat-input');
    const regionSelect = document.getElementById('region-filter-select');
    const doshaSelect = document.getElementById('dosha-filter-select');
    const accreditationSelect = document.getElementById('accreditation-level-select');
    const capacityRange = document.getElementById('daily-capacity-range');
    const capacityDisplay = document.getElementById('range-value-display');
    const applyBtn = document.getElementById('btn-apply-filters');
    const resetBtn = document.getElementById('btn-reset-filters');
    const calculateCircuitBtn = document.getElementById('btn-calculate-circuit');

    if (capacityRange && capacityDisplay) {
      capacityRange.addEventListener('input', (e) => {
        capacityDisplay.textContent = `${e.target.value} Guests/day`;
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.updateFilterState({
          searchQuery: searchInput ? searchInput.value : '',
          region: regionSelect ? regionSelect.value : 'ALL',
          doshaFocus: doshaSelect ? doshaSelect.value : 'ALL',
          accreditationLevel: accreditationSelect ? accreditationSelect.value : 'ALL',
          maxCapacity: capacityRange ? Number(capacityRange.value) : 500
        });
        this.renderCatalogUI();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (regionSelect) regionSelect.value = 'ALL';
        if (doshaSelect) doshaSelect.value = 'ALL';
        if (accreditationSelect) accreditationSelect.value = 'ALL';
        if (capacityRange) capacityRange.value = 150;
        if (capacityDisplay) capacityDisplay.textContent = '150 Guests/day';

        this.updateFilterState({
          searchQuery: '',
          region: 'ALL',
          doshaFocus: 'ALL',
          accreditationLevel: 'ALL',
          maxCapacity: 150
        });
        this.renderCatalogUI();
      });
    }

    if (calculateCircuitBtn) {
      calculateCircuitBtn.addEventListener('click', () => {
        this.renderCircuitModal();
      });
    }

    // Initial render call
    this.renderCatalogUI();
  }

  /**
   * Renders filtered retreat cards into the catalog container
   */
  renderCatalogUI() {
    const gridContainer = document.getElementById('ayurveda-cards-grid');
    const resultsCountBadge = document.getElementById('results-count-badge');
    if (!gridContainer) return;

    const filtered = this.filterRetreatCatalog();

    if (resultsCountBadge) {
      resultsCountBadge.textContent = `Showing ${filtered.length} Retreats`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;">
          <p style="font-size: 1.2rem;">No matching AYUSH certified wellness retreats found.</p>
          <p style="font-size: 0.9rem;">Try adjusting your search criteria or guest capacity thresholds.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map((retreat) => {
      let badgeClass = 'standard';
      if (retreat.accreditationLevel === 'NABH_DIAMOND') badgeClass = 'diamond';
      if (retreat.accreditationLevel === 'AYUSH_PREMIER') badgeClass = 'premier';

      return `
        <article class="ayurveda-card" id="card-${retreat.id}">
          <div class="card-title-bar">
            <div>
              <h3>${retreat.name}</h3>
              <span class="card-location">📍 ${retreat.location}</span>
            </div>
            <span class="risk-tag ${badgeClass}">${retreat.accreditationLevel.replace('_', ' ')}</span>
          </div>
          <div class="card-metadata">
            <p><strong>Dosha Focus:</strong> ${retreat.doshaFocus}</p>
            <p><strong>Primary Therapy:</strong> ${retreat.primaryTherapy}</p>
            <p><strong>Flora Species:</strong> ${retreat.herbalGardenSpecies} medicinal plants</p>
            <p><strong>Panchakarma Suites:</strong> ${retreat.panchakarmaRooms} rooms</p>
          </div>
          <div class="card-telemetry-row">
            <span>Daily Guests: <strong>${retreat.dailyGuestCapacity}</strong></span>
            <span>Accreditation: <strong>NABH Certified</strong></span>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Renders the Panchakarma circuit optimization modal
   */
  renderCircuitModal() {
    const modal = document.getElementById('circuit-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const modalCloseBtn = document.getElementById('btn-modal-close');
    const totalDistEl = document.getElementById('circuit-total-distance');
    const totalDurationEl = document.getElementById('circuit-therapy-duration');
    const harmonyEl = document.getElementById('circuit-harmony-score');
    const timelineEl = document.getElementById('circuit-itinerary-timeline');

    if (!modal) return;

    const filteredRetreats = this.filterRetreatCatalog();
    const sequenced = this.optimizeCircuitSequence(filteredRetreats);
    const totalDist = this.computeAggregateCircuitDistance(sequenced);
    const totalDays = Math.max(7, sequenced.length * 5);

    if (totalDistEl) totalDistEl.textContent = `${totalDist} km`;
    if (totalDurationEl) totalDurationEl.textContent = `${totalDays} Days`;
    if (harmonyEl) harmonyEl.textContent = sequenced.length > 3 ? 'Tridosha Master Circuit' : 'Optimal Healing Balance';

    if (timelineEl) {
      timelineEl.innerHTML = sequenced.map((r, idx) => `
        <div style="padding: 0.75rem; border-left: 2px solid #10b981; margin-bottom: 0.5rem; background: rgba(15,33,20,0.5); border-radius: 0 0.5rem 0.5rem 0;">
          <h4 style="color: #34d399; font-size: 0.95rem;">Phase ${idx + 1}: ${r.name} (${r.location})</h4>
          <p style="font-size: 0.8rem; color: #94a3b8;">Coordinates: ${r.latitude}° N, ${r.longitude}° E | Therapy: ${r.primaryTherapy} | Flora: ${r.herbalGardenSpecies} Species</p>
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
  module.exports = AyurvedicWellnessEngine;
} else if (typeof window !== 'undefined') {
  window.AyurvedicWellnessEngine = AyurvedicWellnessEngine;
}

// ==============================================================================
// ENTERPRISE SERVICE ENGINE ARCHITECTURAL SPECIFICATION
// ------------------------------------------------------------------------------
// Section 1: Haversine Geodesic Computation Engine
// - Precision Standard: Double-precision floating point trigonometric spherical distance calculations.
// - Circuit Optimization: Sub-second Panchakarma wellness route analysis across Indian AYUSH retreats.
// Section 2: Wellness Transit Velocity Engine
// - Transit Parameters: Standard 60 km/h baseline velocity estimation.
// Section 3: Ministry of AYUSH & NABH Indexing Protocols
// - Multi-tier Region Categorization: Kerala Coastal, Himalayan Foothills, Western Ghats, and Central Herbal Belts.
// Section 4: Virtual Audio Narrative Dispatcher
// - Multilingual Text-to-Speech Engine Interface: Integrates localized SSML audio prompts.
// Section 5: Geographical Latitude Sorting Algorithm
// - Spatial Traversal Order: North-to-South wellness circuit scheduling optimization.
// Section 6: Tridosha Harmony Scoring Metric
// - Threshold Rules: Classifies herbal species count relative to retreat healing capacity.
// ==============================================================================
