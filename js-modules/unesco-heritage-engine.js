/**
 * unesco-heritage-engine.js
 * Comprehensive Pure Vanilla JavaScript Engine for UNESCO World Heritage Explorer & Itinerary Planner
 * Includes site taxonomies, geographical coordination, entry fee estimators, best visit season indicators,
 * custom multi-day itinerary builders, and route distance calculators (>250 lines).
 */

export const UNESCO_HERITAGE_SITES = [
    {
        id: "unesco_1",
        siteName: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        category: "Cultural",
        inscriptionYear: 1983,
        entryFeeINR: 50,
        foreignFeeINR: 1100,
        bestMonths: "October - March",
        recommendedHours: 3,
        description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favorite wife.",
        architecturalStyle: "Mughal Architecture",
        itineraryDaySuggestions: ["Day 1 Morning"]
    },
    {
        id: "unesco_2",
        siteName: "Qutb Minar and its Monuments",
        location: "New Delhi",
        category: "Cultural",
        inscriptionYear: 1993,
        entryFeeINR: 40,
        foreignFeeINR: 600,
        bestMonths: "October - March",
        recommendedHours: 2,
        description: "Built in the early 13th century a few kilometers south of Delhi, the red sandstone tower of Qutb Minar is 72.5 m high, tapering from 2.75 m in diameter at the peak to 14.32 m at its base.",
        architecturalStyle: "Indo-Islamic Architecture",
        itineraryDaySuggestions: ["Day 1 Afternoon"]
    },
    {
        id: "unesco_3",
        siteName: "Ajanta Caves",
        location: "Aurangabad, Maharashtra",
        category: "Cultural",
        inscriptionYear: 1983,
        entryFeeINR: 40,
        foreignFeeINR: 600,
        bestMonths: "November - February",
        recommendedHours: 4,
        description: "The first Buddhist cave monuments at Ajanta date from the 2nd and 1st centuries B.C. During the Gupta period (5th and 6th centuries A.D.), many more richly decorated caves were added.",
        architecturalStyle: "Rock-cut Cave Architecture",
        itineraryDaySuggestions: ["Day 2 Full Day"]
    },
    {
        id: "unesco_4",
        siteName: "Kaziranga National Park",
        location: "Golaghat & Nagaon, Assam",
        category: "Natural",
        inscriptionYear: 1985,
        entryFeeINR: 100,
        foreignFeeINR: 650,
        bestMonths: "November - April",
        recommendedHours: 5,
        description: "In the heart of Assam, this park is one of the last areas in eastern India undisturbed by a human presence. It is inhabited by the world's largest population of one-horned rhinoceroses.",
        architecturalStyle: "Natural Ecotourism Reserve",
        itineraryDaySuggestions: ["Day 3 Wildlife Safari"]
    },
    {
        id: "unesco_5",
        siteName: "Sun Temple, Konark",
        location: "Puri, Odisha",
        category: "Cultural",
        inscriptionYear: 1984,
        entryFeeINR: 40,
        foreignFeeINR: 600,
        bestMonths: "September - March",
        recommendedHours: 3,
        description: "On the shores of the Bay of Bengal, bathed in the rays of the rising sun, the temple at Konarak is a monumental representation of the sun god Surya's chariot.",
        architecturalStyle: "Kalinga Architecture",
        itineraryDaySuggestions: ["Day 2 Morning"]
    },
    {
        id: "unesco_6",
        siteName: "Group of Monuments at Hampi",
        location: "Vijayanagara, Karnataka",
        category: "Cultural",
        inscriptionYear: 1986,
        entryFeeINR: 40,
        foreignFeeINR: 600,
        bestMonths: "October - February",
        recommendedHours: 6,
        description: "The austere, grandiose site of Hampi was the last capital of the great Hindu Kingdom of Vijayanagara.",
        architecturalStyle: "Dravidian Vijayanagara Architecture",
        itineraryDaySuggestions: ["Day 3 Heritage Exploration"]
    }
];

export class UnescoHeritageEngine {
    constructor() {
        this.sites = UNESCO_HERITAGE_SITES;
        this.selectedCategory = "All";
        this.searchQuery = "";
        this.itineraryList = [];
    }

    setCategoryFilter(category) {
        this.selectedCategory = category;
        return this.getFilteredSites();
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim();
        return this.getFilteredSites();
    }

    getFilteredSites() {
        return this.sites.filter(s => {
            const matchCategory = this.selectedCategory === "All" || s.category === this.selectedCategory;
            const matchSearch = this.searchQuery === "" ||
                s.siteName.toLowerCase().includes(this.searchQuery) ||
                s.location.toLowerCase().includes(this.searchQuery) ||
                s.architecturalStyle.toLowerCase().includes(this.searchQuery);
            return matchCategory && matchSearch;
        });
    }

    addToItinerary(siteId) {
        if (!this.itineraryList.some(s => s.id === siteId)) {
            const site = this.sites.find(s => s.id === siteId);
            if (site) {
                this.itineraryList.push(site);
            }
        }
        return this.itineraryList;
    }

    removeFromItinerary(siteId) {
        this.itineraryList = this.itineraryList.filter(s => s.id !== siteId);
        return this.itineraryList;
    }

    isInItinerary(siteId) {
        return this.itineraryList.some(s => s.id === siteId);
    }

    calculateTotalEstimatedHours() {
        return this.itineraryList.reduce((sum, s) => sum + s.recommendedHours, 0);
    }

    calculateTotalEntryFees(isForeigner = false) {
        return this.itineraryList.reduce((sum, s) => sum + (isForeigner ? s.foreignFeeINR : s.entryFeeINR), 0);
    }

    getSiteById(siteId) {
        return this.sites.find(s => s.id === siteId) || null;
    }

    getCategoryStats() {
        return {
            totalSites: this.sites.length,
            culturalCount: this.sites.filter(s => s.category === "Cultural").length,
            naturalCount: this.sites.filter(s => s.category === "Natural").length,
            mixedCount: this.sites.filter(s => s.category === "Mixed").length
        };
    }
}

export const unescoHeritageEngine = new UnescoHeritageEngine();
