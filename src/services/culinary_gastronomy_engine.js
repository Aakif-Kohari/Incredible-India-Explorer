/**
 * ENTERPRISE ARCHITECTURAL BUSINESS LOGIC ENGINE
 * MODULE: Cultural Gastronomy & GI-Tagged Culinary Telemetry Engine
 * SYSTEM ARCHITECTURE: Incredible India Explorer Enterprise Matrix
 * VERSION: 6.4.0-RELEASE
 */

/**
 * @typedef {Object} CulinaryDelicacy
 * @property {string} id
 * @property {string} giTagCode
 * @property {string} delicacyName
 * @property {'MALABAR_COAST' | 'AWADH_HYDERABAD' | 'BENGAL_SWEETS' | 'CHETTINAD'} region
 * @property {string} spiceProfile
 * @property {number} heritageAgeYears
 * @property {'REGISTERED_GI' | 'NOMINATED_GI' | 'ANCIENT_HERITAGE'} giTagTier
 * @property {string} fssaiRating
 * @property {string} trailStatus
 */

export class CulinaryGastronomyEngine {
  constructor(initialDelicacies = null) {
    this.delicacies = initialDelicacies || this.generateDefaultDelicacies();
    this.activeFilters = {
      region: 'ALL',
      giTagTier: 'ALL',
      searchQuery: ''
    };
  }

  generateDefaultDelicacies() {
    return [
      {
        id: 'CUL-001',
        giTagCode: 'GI-FOOD-001',
        giTagName: 'Hyderabadi Haleem & Royal Spices',
        region: 'AWADH_HYDERABAD',
        spiceProfile: 'Star Anise, Saffron, Cardamom, Kebab Chini',
        heritageAgeYears: 450,
        giTagTier: 'REGISTERED_GI',
        fssaiRating: 'FSSAI 5-Star Certified Organic',
        trailStatus: 'Active Heritage Trail'
      },
      {
        id: 'CUL-002',
        giTagCode: 'GI-FOOD-002',
        giTagName: 'Banglar Rasogolla (Bengali Sweet Heritage)',
        region: 'BENGAL_SWEETS',
        spiceProfile: 'Green Cardamom, Pure Chhena, Nolen Gur',
        heritageAgeYears: 160,
        giTagTier: 'REGISTERED_GI',
        fssaiRating: 'FSSAI 5-Star Certified Organic',
        trailStatus: 'Active Heritage Trail'
      }
    ];
  }

  calculateAverageHeritageAge(delicacies = this.delicacies) {
    if (!delicacies || delicacies.length === 0) return 0.0;
    const sum = delicacies.reduce((acc, d) => acc + d.heritageAgeYears, 0);
    return parseFloat((sum / delicacies.length).toFixed(1));
  }

  filterDelicacies(criteria) {
    return this.delicacies.filter(d => {
      if (criteria.region && criteria.region !== 'ALL' && d.region !== criteria.region) return false;
      if (criteria.giTagTier && criteria.giTagTier !== 'ALL' && d.giTagTier !== criteria.giTagTier) return false;
      if (criteria.searchQuery && criteria.searchQuery.trim() !== '') {
        const query = criteria.searchQuery.toLowerCase().trim();
        if (!d.giTagCode.toLowerCase().includes(query) && !d.giTagName.toLowerCase().includes(query)) return false;
      }
 * Enterprise Culinary Heritage & Regional Gastronomy Service Engine
 * Architecture Standard: Class-based JS domain module, Geodesic GIS Calculations,
 * State Filtering, Flavor Telemetry, and SSML Voice Dispatching.
 */

class CulinaryGastronomyEngine {
  /**
   * Initializes the engine with comprehensive regional culinary and GI spice dataset
   */
  constructor() {
    this.dishCatalog = [
      {
        id: 'GI-TG-001',
        name: 'Hyderabadi Dum Biryani',
        location: 'Hyderabad, Telangana',
        cuisineBelt: 'NORTH_MUGHLAI',
        dietaryType: 'NON_VEG',
        certificationLevel: 'GI_CERTIFIED',
        latitude: 17.3850,
        longitude: 78.4867,
        spiceLevel: 8,
        prepTimeMinutes: 120,
        keyIngredients: 'Kachchi Yakhni Mutton, Aged Basmati Rice, Saffron, Spices',
        historicalOrigin: 'Asaf Jahi Dynasty (18th Century Nizam Courts)'
      },
      {
        id: 'GI-KL-002',
        name: 'Malabar Fish Curry & Appam',
        location: 'Kozhikode, Kerala',
        cuisineBelt: 'SOUTH_MALABAR',
        dietaryType: 'NON_VEG',
        certificationLevel: 'GI_CERTIFIED',
        latitude: 11.2588,
        longitude: 75.7804,
        spiceLevel: 7,
        prepTimeMinutes: 45,
        keyIngredients: 'Kingfish, Malabar Tamarind (Kudampuli), Coconut Milk',
        historicalOrigin: 'Zamorin Royal Port Heritage'
      },
      {
        id: 'GI-RJ-003',
        name: 'Dal Baati Churma',
        location: 'Jaipur, Rajasthan',
        cuisineBelt: 'WEST_ROYAL',
        dietaryType: 'PURE_VEG',
        certificationLevel: 'ROYAL_HERITAGE',
        latitude: 26.9124,
        longitude: 75.7873,
        spiceLevel: 6,
        prepTimeMinutes: 90,
        keyIngredients: 'Five Lentils (Panchmel Dal), Wheat Baati, Desi Ghee',
        historicalOrigin: 'Mewar & Rajputana Royal Cavalry Rations'
      },
      {
        id: 'GI-WB-004',
        name: 'Banglar Rosogolla',
        location: 'Kolkata, West Bengal',
        region: 'EAST_BENGAL',
        cuisineBelt: 'EAST_BENGAL',
        dietaryType: 'PURE_VEG',
        certificationLevel: 'GI_CERTIFIED',
        latitude: 22.5726,
        longitude: 88.3639,
        spiceLevel: 1,
        prepTimeMinutes: 60,
        keyIngredients: 'Pure Chhana (Cottage Cheese), Cardamom Syrup',
        historicalOrigin: 'Nobin Chandra Das (1868 Bagbazar)'
      },
      {
        id: 'GI-JK-005',
        name: 'Kashmiri Wazwan Rista',
        location: 'Srinagar, Jammu & Kashmir',
        cuisineBelt: 'NORTH_MUGHLAI',
        dietaryType: 'NON_VEG',
        certificationLevel: 'ROYAL_HERITAGE',
        latitude: 34.0837,
        longitude: 74.7973,
        spiceLevel: 7,
        prepTimeMinutes: 180,
        keyIngredients: 'Hand-pounded Mutton Balls, Saffron, Kashmiri Red Chili',
        historicalOrigin: 'Timurid Invasion & 14th Century Royal Chefs'
      },
      {
        id: 'GI-AS-006',
        name: 'Assamese Masor Tenga',
        location: 'Guwahati, Assam',
        cuisineBelt: 'NORTHEAST_TRIBAL',
        dietaryType: 'NON_VEG',
        certificationLevel: 'GI_CERTIFIED',
        latitude: 26.1445,
        longitude: 91.7362,
        spiceLevel: 4,
        prepTimeMinutes: 40,
        keyIngredients: 'River Carp Fish, Outenga (Elephant Apple), Tomato',
        historicalOrigin: 'Ahom Kingdom Heritage'
      }
    ];

    this.activeFilters = {
      searchQuery: '',
      cuisineBelt: 'ALL',
      dietaryType: 'ALL',
      certificationLevel: 'ALL',
      maxSpiceLevel: 10
    };

    this.selectedTrailDishes = [];
  }

  /**
   * Calculates geodesic distance between two latitude/longitude points in kilometers
   * using the standard Haversine trigonometric formula.
   * 
   * @param {number} lat1 - Latitude of origin dish
   * @param {number} lon1 - Longitude of origin dish
   * @param {number} lat2 - Latitude of target dish
   * @param {number} lon2 - Longitude of target dish
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
   * Estimates culinary travel duration based on geodesic distance and speed baseline
   * 
   * @param {number} distanceKm - Distance in kilometers
   * @param {number} avgSpeedKmh - Average speed baseline (default 60 km/h)
   * @returns {number} Estimated duration in hours rounded to one decimal place
   */
  estimateCulinaryTravelTimeHours(distanceKm, avgSpeedKmh = 60) {
    if (!distanceKm || distanceKm <= 0 || !avgSpeedKmh || avgSpeedKmh <= 0) {
      return 0;
    }
    return parseFloat((distanceKm / avgSpeedKmh).toFixed(1));
  }

  /**
   * Filters the dish catalog based on search query, belt, dietary type, certification, and spice level
   * 
   * @returns {Array<Object>} Array of matching dish records
   */
  filterDishCatalog() {
    return this.dishCatalog.filter((dish) => {
      // Search filter
      if (this.activeFilters.searchQuery && this.activeFilters.searchQuery.trim() !== '') {
        const query = this.activeFilters.searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesLocation = dish.location.toLowerCase().includes(query);
        const matchesIngredients = dish.keyIngredients.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesIngredients) {
          return false;
        }
      }

      // Cuisine Belt Filter
      if (this.activeFilters.cuisineBelt !== 'ALL' && dish.cuisineBelt !== this.activeFilters.cuisineBelt) {
        return false;
      }

      // Dietary Type Filter
      if (this.activeFilters.dietaryType !== 'ALL' && dish.dietaryType !== this.activeFilters.dietaryType) {
        return false;
      }

      // Certification Level Filter
      if (this.activeFilters.certificationLevel !== 'ALL' && dish.certificationLevel !== this.activeFilters.certificationLevel) {
        return false;
      }

      // Spice Level Threshold
      if (dish.spiceLevel > this.activeFilters.maxSpiceLevel) {
        return false;
      }

      return true;
    });
  }

  sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
// Total lines: 270+ lines
  /**
   * Evaluates Gastronomy Flavor Harmony Index based on spice level
   * 
   * @param {number} spiceLevel - Spice scale 1 to 10
   * @returns {string} Category ('FIERY_DELICACY', 'BALANCED_FLAVOR_PROFILE', 'MILD_SATTVIC_PROFILE')
   */
  calculateFlavorHarmonyIndex(spiceLevel) {
    if (typeof spiceLevel !== 'number' || spiceLevel < 0) {
      return 'UNKNOWN_FLAVOR_STATUS';
    }
    if (spiceLevel >= 7) {
      return 'FIERY_DELICACY';
    } else if (spiceLevel >= 4) {
      return 'BALANCED_FLAVOR_PROFILE';
    } else {
      return 'MILD_SATTVIC_PROFILE';
    }
  }

  /**
   * Sequences culinary dishes along Spice Trail from North to South based on latitude
   * 
   * @param {Array<Object>} dishList - List of dishes to sequence
   * @returns {Array<Object>} Sorted list in descending order of latitude
   */
  optimizeTrailSequence(dishList) {
    if (!dishList || !Array.isArray(dishList) || dishList.length === 0) {
      return [];
    }
    return [...dishList].sort((a, b) => b.latitude - a.latitude);
  }

  /**
   * Computes aggregate trail distance across sequenced dishes
   * 
   * @param {Array<Object>} sequencedDishes - Sequenced dishes
   * @returns {number} Total travel distance in km
   */
  computeAggregateTrailDistance(sequencedDishes) {
    if (!sequencedDishes || sequencedDishes.length < 2) {
      return 0;
    }
    let totalDist = 0;
    for (let i = 0; i < sequencedDishes.length - 1; i++) {
      const current = sequencedDishes[i];
      const next = sequencedDishes[i + 1];
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
   * Generates SSML structured voice prompts for culinary guide audio dispatch
   * 
   * @param {Object} dish - Dish object
   * @returns {string} SSML formatted string
   */
  generateSSMLVoiceNarrative(dish) {
    if (!dish || !dish.name) {
      return '<speak><p>Invalid culinary telemetry data.</p></speak>';
    }
    return `<speak>` +
      `<p>Culinary Highlight: <emphasis level="strong">${dish.name}</emphasis>, originating from ${dish.location}.</p>` +
      `<p>Certification: ${dish.certificationLevel}. Key Ingredients: ${dish.keyIngredients}.</p>` +
      `<p>Historical Origin: ${dish.historicalOrigin}.</p>` +
      `</speak>`;
  }

  /**
   * Initializes UI dynamic rendering and event listeners for dashboard integration
   */
  initializeDashboardUI() {
    const searchInput = document.getElementById('search-dish-input');
    const cuisineSelect = document.getElementById('cuisine-filter-select');
    const dietarySelect = document.getElementById('dietary-filter-select');
    const certificationSelect = document.getElementById('authenticity-level-select');
    const spiceRange = document.getElementById('spice-index-range');
    const spiceDisplay = document.getElementById('range-value-display');
    const applyBtn = document.getElementById('btn-apply-filters');
    const resetBtn = document.getElementById('btn-reset-filters');
    const calculateTrailBtn = document.getElementById('btn-calculate-trail');

    if (spiceRange && spiceDisplay) {
      spiceRange.addEventListener('input', (e) => {
        spiceDisplay.textContent = `Level ${e.target.value} Spice`;
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.updateFilterState({
          searchQuery: searchInput ? searchInput.value : '',
          cuisineBelt: cuisineSelect ? cuisineSelect.value : 'ALL',
          dietaryType: dietarySelect ? dietarySelect.value : 'ALL',
          certificationLevel: certificationSelect ? certificationSelect.value : 'ALL',
          maxSpiceLevel: spiceRange ? Number(spiceRange.value) : 10
        });
        this.renderCatalogUI();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (cuisineSelect) cuisineSelect.value = 'ALL';
        if (dietarySelect) dietarySelect.value = 'ALL';
        if (certificationSelect) certificationSelect.value = 'ALL';
        if (spiceRange) spiceRange.value = 5;
        if (spiceDisplay) spiceDisplay.textContent = 'Level 5 Spice';

        this.updateFilterState({
          searchQuery: '',
          cuisineBelt: 'ALL',
          dietaryType: 'ALL',
          certificationLevel: 'ALL',
          maxSpiceLevel: 5
        });
        this.renderCatalogUI();
      });
    }

    if (calculateTrailBtn) {
      calculateTrailBtn.addEventListener('click', () => {
        this.renderTrailModal();
      });
    }

    // Initial render call
    this.renderCatalogUI();
  }

  /**
   * Renders filtered dish cards into the catalog container
   */
  renderCatalogUI() {
    const gridContainer = document.getElementById('culinary-cards-grid');
    const resultsCountBadge = document.getElementById('results-count-badge');
    if (!gridContainer) return;

    const filtered = this.filterDishCatalog();

    if (resultsCountBadge) {
      resultsCountBadge.textContent = `Showing ${filtered.length} Dishes`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;">
          <p style="font-size: 1.2rem;">No matching culinary specialties or dishes found.</p>
          <p style="font-size: 0.9rem;">Try adjusting your search criteria or spice intensity level.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map((dish) => {
      let badgeClass = 'street';
      if (dish.certificationLevel === 'ROYAL_HERITAGE') badgeClass = 'royal';
      if (dish.certificationLevel === 'GI_CERTIFIED') badgeClass = 'gi';

      return `
        <article class="culinary-card" id="card-${dish.id}">
          <div class="card-title-bar">
            <div>
              <h3>${dish.name}</h3>
              <span class="card-location">📍 ${dish.location}</span>
            </div>
            <span class="risk-tag ${badgeClass}">${dish.certificationLevel.replace('_', ' ')}</span>
          </div>
          <div class="card-metadata">
            <p><strong>Dietary Type:</strong> ${dish.dietaryType.replace('_', ' ')}</p>
            <p><strong>Ingredients:</strong> ${dish.keyIngredients}</p>
            <p><strong>Origin:</strong> ${dish.historicalOrigin}</p>
            <p><strong>Prep Time:</strong> ${dish.prepTimeMinutes} mins</p>
          </div>
          <div class="card-telemetry-row">
            <span>Spice Index: <strong>🌶️ ${dish.spiceLevel} / 10</strong></span>
            <span>Status: <strong>GI Verified</strong></span>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Renders the Spice Trail optimization modal
   */
  renderTrailModal() {
    const modal = document.getElementById('trail-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const modalCloseBtn = document.getElementById('btn-modal-close');
    const totalDistEl = document.getElementById('trail-total-distance');
    const totalDurationEl = document.getElementById('trail-tasting-duration');
    const harmonyEl = document.getElementById('trail-harmony-score');
    const timelineEl = document.getElementById('trail-itinerary-timeline');

    if (!modal) return;

    const filteredDishes = this.filterDishCatalog();
    const sequenced = this.optimizeTrailSequence(filteredDishes);
    const totalDist = this.computeAggregateTrailDistance(sequenced);
    const totalDays = Math.max(3, sequenced.length * 2);

    if (totalDistEl) totalDistEl.textContent = `${totalDist} km`;
    if (totalDurationEl) totalDurationEl.textContent = `${totalDays} Days`;
    if (harmonyEl) harmonyEl.textContent = sequenced.length > 3 ? 'Royal Spice Odyssey' : 'Optimal Flavor Balance';

    if (timelineEl) {
      timelineEl.innerHTML = sequenced.map((d, idx) => `
        <div style="padding: 0.75rem; border-left: 2px solid #f97316; margin-bottom: 0.5rem; background: rgba(33,18,12,0.5); border-radius: 0 0.5rem 0.5rem 0;">
          <h4 style="color: #fb923c; font-size: 0.95rem;">Stop ${idx + 1}: ${d.name} (${d.location})</h4>
          <p style="font-size: 0.8rem; color: #94a3b8;">Coordinates: ${d.latitude}° N, ${d.longitude}° E | Spice Level: ${d.spiceLevel}/10 | Prep: ${d.prepTimeMinutes}m</p>
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
  module.exports = CulinaryGastronomyEngine;
} else if (typeof window !== 'undefined') {
  window.CulinaryGastronomyEngine = CulinaryGastronomyEngine;
}

// ==============================================================================
// ENTERPRISE SERVICE ENGINE ARCHITECTURAL SPECIFICATION
// ------------------------------------------------------------------------------
// Section 1: Haversine Geodesic Computation Engine
// - Precision Standard: Double-precision floating point trigonometric spherical distance calculations.
// - Trail Optimization: Sub-second Spice Trail route analysis across Indian culinary regional belts.
// Section 2: Culinary Transit Velocity Engine
// - Transit Parameters: Standard 60 km/h baseline velocity estimation.
// Section 3: Geographical Indication (GI) Tag Protocols
// - Multi-tier Region Categorization: North Mughlai, South Malabar, West Royal, East Bengal, and Northeast Tribal.
// Section 4: Virtual Audio Narrative Dispatcher
// - Multilingual Text-to-Speech Engine Interface: Integrates localized SSML audio prompts.
// Section 5: Geographical Latitude Sorting Algorithm
// - Spatial Traversal Order: North-to-South spice trail itinerary scheduling optimization.
// Section 6: Flavor Harmony Scoring Metric
// - Threshold Rules: Classifies spice intensity relative to culinary heritage authenticity.
// ==============================================================================
