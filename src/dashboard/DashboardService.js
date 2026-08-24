/**
 * Enterprise Itinerary Dashboard Service
 *
 * This complex service layer orchestrates business logic, state management, and mock API
 * data for the Incredible India Explorer dashboard. It uses modern ES6+ patterns,
 * functional data transformations, and simulated asynchronous operations.
 */

class DashboardState {
  constructor() {
    this.state = {
      isLoaded: false,
      selectedDestinations: [],
      itinerary: null,
      currentView: 'planner', // 'planner' | 'viewer' | 'analytics'
      activeTourSite: null,
      searchQuery: '',
      filters: { region: 'all', type: 'all' },
    };
    this.listeners = new Set();
  }

  getState() {
    return { ...this.state };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export class DashboardService {
  constructor() {
    this.store = new DashboardState();
    this.mockDatabase = this._generateMockData();
  }

  /**
   * Generates a massive, structured dataset of Indian heritage sites to satisfy
   * enterprise application data requirements without a real backend.
   */
  _generateMockData() {
    return [
      { id: '1', name: 'Taj Mahal', region: 'North', type: 'Monument', lat: 27.1751, lng: 78.0421, popularity: 99, description: 'An immense mausoleum of white marble, built in Agra.' },
      { id: '2', name: 'Jaipur City Palace', region: 'West', type: 'Palace', lat: 26.9239, lng: 75.8267, popularity: 95, description: 'A complex of courtyards, gardens and buildings right in the center of the Old City.' },
      { id: '3', name: 'Ajanta Caves', region: 'West', type: 'Cave', lat: 20.5519, lng: 75.7033, popularity: 92, description: 'Approximately 30 rock-cut Buddhist cave monuments.' },
      { id: '4', name: 'Hampi Ruins', region: 'South', type: 'Ruins', lat: 15.3350, lng: 76.4600, popularity: 94, description: 'A UNESCO World Heritage Site located in east-central Karnataka.' },
      { id: '5', name: 'Meenakshi Temple', region: 'South', type: 'Temple', lat: 9.9195, lng: 78.1193, popularity: 96, description: 'Historic Hindu temple located on the southern bank of the Vaigai River in Madurai.' },
      { id: '6', name: 'Varanasi Ghats', region: 'North', type: 'Cultural', lat: 25.3176, lng: 83.0062, popularity: 98, description: 'Riverfront steps leading to the banks of the River Ganges.' },
      { id: '7', name: 'Khajuraho Group of Monuments', region: 'Central', type: 'Temple', lat: 24.8318, lng: 79.9199, popularity: 91, description: 'Group of Hindu and Jain temples in Chhatarpur district.' },
      { id: '8', name: 'Sundarbans National Park', region: 'East', type: 'Wildlife', lat: 21.9497, lng: 89.1833, popularity: 90, description: 'Large coastal mangrove forest, shared by India and Bangladesh.' },
      { id: '9', name: 'Victoria Memorial', region: 'East', type: 'Museum', lat: 22.5448, lng: 88.3426, popularity: 93, description: 'A large marble building in Kolkata, West Bengal.' },
      { id: '10', name: 'Red Fort', region: 'North', type: 'Fort', lat: 28.6562, lng: 77.2410, popularity: 97, description: 'Historic fort in the city of Delhi.' },
      { id: '11', name: 'Mysore Palace', region: 'South', type: 'Palace', lat: 12.3051, lng: 76.6551, popularity: 96, description: 'Historical palace and a royal residence at Mysore.' },
      { id: '12', name: 'Gateway of India', region: 'West', type: 'Monument', lat: 18.9220, lng: 72.8347, popularity: 95, description: 'Arch-monument built in the early 20th century in the city of Mumbai.' },
      { id: '13', name: 'Sanchi Stupa', region: 'Central', type: 'Monument', lat: 23.4871, lng: 77.7397, popularity: 89, description: 'Buddhist complex, famous for its Great Stupa.' },
      { id: '14', name: 'Bodh Gaya', region: 'East', type: 'Temple', lat: 24.6959, lng: 84.9912, popularity: 94, description: 'Religious site and place of pilgrimage associated with the Mahabodhi Temple Complex.' },
      { id: '15', name: 'Qutub Minar', region: 'North', type: 'Monument', lat: 28.5245, lng: 77.1855, popularity: 96, description: 'A minaret and "victory tower" that forms part of the Qutb complex.' },
      { id: '16', name: 'Amer Fort', region: 'West', type: 'Fort', lat: 26.9855, lng: 75.8513, popularity: 97, description: 'Fort located in Amer, Rajasthan.' },
      { id: '17', name: 'Rani ki Vav', region: 'West', type: 'Monument', lat: 23.8589, lng: 72.1009, popularity: 88, description: 'Intricately constructed stepwell situated in the town of Patan.' },
      { id: '18', name: 'Elephanta Caves', region: 'West', type: 'Cave', lat: 18.9633, lng: 72.9315, popularity: 90, description: 'Collection of cave temples predominantly dedicated to the Hindu god Shiva.' },
      { id: '19', name: 'Brihadisvara Temple', region: 'South', type: 'Temple', lat: 10.7828, lng: 79.1318, popularity: 93, description: 'Hindu temple dedicated to Shiva located in Thanjavur.' },
      { id: '20', name: 'Konark Sun Temple', region: 'East', type: 'Temple', lat: 19.8876, lng: 86.0945, popularity: 92, description: '13th-century CE Sun temple at Konark.' }
    ];
  }

  async initialize() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.store.setState({ isLoaded: true });
        resolve(this.store.getState());
      }, 500);
    });
  }

  /**
   * Retrieves paginated, filtered, and sorted destinations.
   */
  async fetchDestinations(query, filters, page = 1, limit = 10) {
    return new Promise(resolve => {
      setTimeout(() => {
        let results = [...this.mockDatabase];
        
        if (query) {
          const lowerQuery = query.toLowerCase();
          results = results.filter(site => 
            site.name.toLowerCase().includes(lowerQuery) || 
            site.description.toLowerCase().includes(lowerQuery)
          );
        }

        if (filters.region && filters.region !== 'all') {
          results = results.filter(site => site.region === filters.region);
        }

        if (filters.type && filters.type !== 'all') {
          results = results.filter(site => site.type === filters.type);
        }

        results.sort((a, b) => b.popularity - a.popularity);
        
        const total = results.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginated = results.slice(start, end);

        resolve({ data: paginated, total, page, limit });
      }, 300);
    });
  }

  /**
   * Calculate an optimal itinerary route using a greedy nearest-neighbor algorithm.
   */
  generateOptimizedItinerary(siteIds) {
    const sites = this.mockDatabase.filter(s => siteIds.includes(s.id));
    if (sites.length < 2) return sites;

    let unvisited = [...sites];
    let route = [unvisited.shift()];
    
    while (unvisited.length > 0) {
      const current = route[route.length - 1];
      let nearestDist = Infinity;
      let nearestIdx = -1;
      
      for (let i = 0; i < unvisited.length; i++) {
        const candidate = unvisited[i];
        // Haversine approximation would go here; using simple euclidean for dummy logic
        const dist = Math.sqrt(
          Math.pow(current.lat - candidate.lat, 2) + 
          Math.pow(current.lng - candidate.lng, 2)
        );
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      }
      
      route.push(unvisited.splice(nearestIdx, 1)[0]);
    }

    // Generate simulated timeline facts
    return route.map((site, index) => ({
      ...site,
      day: Math.floor(index / 2) + 1,
      estimatedArrival: `${8 + (index * 4) % 12}:00 ${((index * 4) + 8) >= 12 && ((index * 4) + 8) < 24 ? 'PM' : 'AM'}`
    }));
  }

  addDestinationToItinerary(siteId) {
    const state = this.store.getState();
    if (!state.selectedDestinations.includes(siteId)) {
      this.store.setState({ 
        selectedDestinations: [...state.selectedDestinations, siteId] 
      });
    }
  }

  removeDestinationFromItinerary(siteId) {
    const state = this.store.getState();
    this.store.setState({
      selectedDestinations: state.selectedDestinations.filter(id => id !== siteId)
    });
  }

  commitItinerary() {
    const state = this.store.getState();
    if (state.selectedDestinations.length === 0) return;
    
    const optimizedRoute = this.generateOptimizedItinerary(state.selectedDestinations);
    this.store.setState({ itinerary: optimizedRoute, currentView: 'analytics' });
  }

  openVirtualTour(siteId) {
    const site = this.mockDatabase.find(s => s.id === siteId);
    if (site) {
      this.store.setState({ activeTourSite: site, currentView: 'viewer' });
    }
  }

  closeVirtualTour() {
    this.store.setState({ activeTourSite: null, currentView: 'planner' });
  }
}

// Export singleton instance for the app
export const dashboardInstance = new DashboardService();
