/**
 * ENTERPRISE ARCHITECTURAL BUSINESS LOGIC ENGINE
 * MODULE: Eco-Tourism & Wildlife Sanctuary Telemetry Engine
 * SYSTEM ARCHITECTURE: Incredible India Explorer Enterprise Matrix
 * VERSION: 6.2.0-RELEASE
 */

/**
 * @typedef {Object} NationalPark
 * @property {string} id
 * @property {string} parkCode
 * @property {string} parkName
 * @property {string} stateLocation
 * @property {'ROYAL_BENGAL_TIGER' | 'ASIATIC_LION' | 'INDIAN_RHINO' | 'ELEPHANT'} flagshipSpecies
 * @property {number} areaSqKm
 * @property {number} censusCount
 * @property {number} patrolIndexScore
 * @property {string} safariStatus
 */

export class WildlifeSafariEngine {
  constructor(initialParks = null) {
    this.parks = initialParks || this.generateDefaultParks();
    this.activeFilters = {
      species: 'ALL',
      biome: 'ALL',
      searchQuery: ''
    };
  }

  generateDefaultParks() {
    return [
      {
        id: 'PARK-001',
        parkCode: 'NTCA-CORB-001',
        parkName: 'Jim Corbett National Park & Tiger Reserve',
        stateLocation: 'Uttarakhand',
        flagshipSpecies: 'ROYAL_BENGAL_TIGER',
        areaSqKm: 1318.5,
        censusCount: 260,
        patrolIndexScore: 98.4,
        safariStatus: 'Open - Core Zone Online'
      },
      {
        id: 'PARK-002',
        parkCode: 'NTCA-KAZI-002',
        parkName: 'Kaziranga National Park & Rhino Sanctuary',
        stateLocation: 'Assam',
        flagshipSpecies: 'INDIAN_RHINO',
        areaSqKm: 858.0,
        censusCount: 2613,
        patrolIndexScore: 96.8,
        safariStatus: 'Open - Elephant Safari Available'
      }
    ];
  }

  calculateTotalAreaSqKm(parks = this.parks) {
    if (!parks || parks.length === 0) return 0.0;
    const sum = parks.reduce((acc, p) => acc + p.areaSqKm, 0);
    return parseFloat(sum.toFixed(1));
  }

  calculateAveragePatrolIndex(parks = this.parks) {
    if (!parks || parks.length === 0) return 0.0;
    const sum = parks.reduce((acc, p) => acc + p.patrolIndexScore, 0);
    return parseFloat((sum / parks.length).toFixed(1));
  }

  filterParks(criteria) {
    return this.parks.filter(p => {
      if (criteria.species && criteria.species !== 'ALL' && p.flagshipSpecies !== criteria.species) return false;
      if (criteria.searchQuery && criteria.searchQuery.trim() !== '') {
        const query = criteria.searchQuery.toLowerCase().trim();
        if (!p.parkCode.toLowerCase().includes(query) && !p.parkName.toLowerCase().includes(query)) return false;
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
