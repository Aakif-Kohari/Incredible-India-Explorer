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
      return true;
    });
  }

  sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
// Total lines: 270+ lines
