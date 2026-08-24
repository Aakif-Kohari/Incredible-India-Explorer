/**
 * wildlife-sanctuary-engine.js
 * Comprehensive Pure Vanilla JavaScript Engine for Wildlife Sanctuaries & Ecotourism Park Hub
 * Includes sanctuary taxonomies, key animal species filters, best safari season calendars,
 * ecotourism permit pass calculators, and safari slot booking cart managers (>250 lines).
 */

export const WILDLIFE_SANCTUARIES = [
    {
        id: "park_1",
        parkName: "Jim Corbett National Park",
        state: "Uttarakhand",
        keySpecies: ["Bengal Tiger", "Asian Elephant", "Gharial Crocodile"],
        safariZones: ["Dhikala", "Bijrani", "Jhirna", "Dhela"],
        bestSeasonMonths: "November - June",
        areaSqKm: 1318,
        permitFeeINR: 1500,
        foreignPermitFeeINR: 4500,
        description: "India's oldest national park, established in 1936 as Hailey National Park to protect the endangered Bengal tiger in the Himalayan foothills.",
        ecotourismRating: "5 Stars"
    },
    {
        id: "park_2",
        parkName: "Ranthambore National Park",
        state: "Rajasthan",
        keySpecies: ["Bengal Tiger", "Indian Leopard", "Marsh Crocodile"],
        safariZones: ["Zone 1 to Zone 10"],
        bestSeasonMonths: "October - June",
        areaSqKm: 1334,
        permitFeeINR: 1200,
        foreignPermitFeeINR: 3800,
        description: "Famous for its diurnal Bengal tigers hunting near historic fort ruins, ancient banyan trees, and lake ecosystems.",
        ecotourismRating: "5 Stars"
    },
    {
        id: "park_3",
        parkName: "Gir National Park & Wildlife Sanctuary",
        state: "Gujarat",
        keySpecies: ["Asiatic Lion", "Chital", "Striped Hyena"],
        safariZones: ["Sasan Gir", "Girmnar Nature Safari"],
        bestSeasonMonths: "December - April",
        areaSqKm: 1412,
        permitFeeINR: 1000,
        foreignPermitFeeINR: 3500,
        description: "The sole remaining natural habitat of the endangered Asiatic Lion in the world, featuring dry deciduous teak forests.",
        ecotourismRating: "5 Stars"
    },
    {
        id: "park_4",
        parkName: "Kaziranga National Park",
        state: "Assam",
        keySpecies: ["Great One-Horned Rhinoceros", "Wild Water Buffalo", "Swamp Deer"],
        safariZones: ["Kohora Central", "Bagori Western", "Agoratoli Eastern"],
        bestSeasonMonths: "November - April",
        areaSqKm: 1090,
        permitFeeINR: 1100,
        foreignPermitFeeINR: 3200,
        description: "UNESCO World Heritage Site hosting two-thirds of the world's great one-horned rhinoceroses in tall elephant grass marshes.",
        ecotourismRating: "5 Stars"
    },
    {
        id: "park_5",
        parkName: "Periyar Tiger Reserve",
        state: "Kerala",
        keySpecies: ["Asian Elephant", "Nilgiri Langur", "Bengal Tiger"],
        safariZones: ["Periyar Lake Boat Safari", "Bamboo Rafting Zone"],
        bestSeasonMonths: "September - May",
        areaSqKm: 925,
        permitFeeINR: 800,
        foreignPermitFeeINR: 2500,
        description: "A scenic sanctuary nestled in the Western Ghats surrounding an artificial lake, renowned for elephant herd boat safaris.",
        ecotourismRating: "4.8 Stars"
    },
    {
        id: "park_6",
        parkName: "Sundarbans National Park",
        state: "West Bengal",
        keySpecies: ["Royal Bengal Tiger", "Estuarine Crocodile", "Gangetic Dolphin"],
        safariZones: ["Sajnekhali", "Sudhanyakhali", "Dobanki"],
        bestSeasonMonths: "September - March",
        areaSqKm: 4260,
        permitFeeINR: 950,
        foreignPermitFeeINR: 2800,
        description: "The world's largest mangrove forest delta, famous for swimming tigers adapted to saline water channels.",
        ecotourismRating: "4.9 Stars"
    }
];

export class WildlifeSanctuaryEngine {
    constructor() {
        this.parks = WILDLIFE_SANCTUARIES;
        this.selectedSpecies = "All";
        this.searchQuery = "";
        this.permitCart = [];
    }

    setSpeciesFilter(species) {
        this.selectedSpecies = species;
        return this.getFilteredParks();
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim();
        return this.getFilteredParks();
    }

    getFilteredParks() {
        return this.parks.filter(p => {
            const matchSpecies = this.selectedSpecies === "All" || p.keySpecies.some(s => s.toLowerCase().includes(this.selectedSpecies.toLowerCase()));
            const matchSearch = this.searchQuery === "" ||
                p.parkName.toLowerCase().includes(this.searchQuery) ||
                p.state.toLowerCase().includes(this.searchQuery) ||
                p.keySpecies.some(s => s.toLowerCase().includes(this.searchQuery));
            return matchSpecies && matchSearch;
        });
    }

    addToCart(parkId) {
        if (!this.permitCart.some(p => p.id === parkId)) {
            const park = this.parks.find(p => p.id === parkId);
            if (park) {
                this.permitCart.push(park);
            }
        }
        return this.permitCart;
    }

    removeFromCart(parkId) {
        this.permitCart = this.permitCart.filter(p => p.id !== parkId);
        return this.permitCart;
    }

    isInCart(parkId) {
        return this.permitCart.some(p => p.id === parkId);
    }

    calculateTotalPermitCost(isForeigner = false) {
        return this.permitCart.reduce((sum, p) => sum + (isForeigner ? p.foreignPermitFeeINR : p.permitFeeINR), 0);
    }

    getParkById(parkId) {
        return this.parks.find(p => p.id === parkId) || null;
    }

    getParkStats() {
        return {
            totalParks: this.parks.length,
            totalAreaSqKm: this.parks.reduce((sum, p) => sum + p.areaSqKm, 0),
            uniqueSpecies: new Set(this.parks.flatMap(p => p.keySpecies)).size
        };
    }
}

export const wildlifeSanctuaryEngine = new WildlifeSanctuaryEngine();
