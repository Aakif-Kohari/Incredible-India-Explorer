/**
 * regional-street-food-engine.js
 * Pure JavaScript engine for Indian Regional Cuisine & Street Food Explorer
 */

export const STREET_FOOD_SPECIALTIES = [
    {
        id: "sf_1",
        dishName: "Mumbai Vada Pav",
        state: "Maharashtra",
        region: "West",
        spiceLevel: "High",
        dietary: "Veg",
        description: "Deep-fried spiced potato dumpling inside a soft bread bun, served with spicy garlic-coconut chutney."
    },
    {
        id: "sf_2",
        dishName: "Kolkata Kathi Roll",
        state: "West Bengal",
        region: "East",
        spiceLevel: "Medium",
        dietary: "Non-Veg",
        description: "Skewer-roasted marinated chicken or paneer wrapped in a crisp paratha bread with green chilies."
    },
    {
        id: "sf_3",
        dishName: "Indori Poha & Jalebi",
        state: "Madhya Pradesh",
        region: "Central",
        spiceLevel: "Mild",
        dietary: "Veg",
        description: "Steamed flattened rice spiced with fennel and turmeric, served with crispy syrup-soaked jalebis."
    }
];

export class RegionalStreetFoodEngine {
    constructor() {
        this.dishes = STREET_FOOD_SPECIALTIES;
        this.bookmarkedIds = new Set();
    }

    filterDishes(region = 'All', dietary = 'All') {
        return this.dishes.filter(d => {
            const matchRegion = region === 'All' || d.region === region;
            const matchDietary = dietary === 'All' || d.dietary === dietary;
            return matchRegion && matchDietary;
        });
    }

    toggleBookmark(dishId) {
        if (this.bookmarkedIds.has(dishId)) {
            this.bookmarkedIds.delete(dishId);
        } else {
            this.bookmarkedIds.add(dishId);
        }
        return Array.from(this.bookmarkedIds);
    }
}

export const regionalStreetFoodEngine = new RegionalStreetFoodEngine();
