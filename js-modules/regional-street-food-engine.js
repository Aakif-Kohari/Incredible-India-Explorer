/**
 * regional-street-food-engine.js
 * Comprehensive Pure Vanilla JavaScript Engine for Indian Regional Cuisine & Street Food Explorer
 * Features dish taxonomies, spice heat meters, ingredient breakdown, dietary filters, regional map lookup,
 * bookmarking cart management, and interactive recipe step generators.
 */

export const STREET_FOOD_SPECIALTIES = [
    {
        id: "sf_1",
        dishName: "Mumbai Vada Pav",
        state: "Maharashtra",
        region: "West",
        spiceLevel: "High",
        dietary: "Veg",
        prepTimeMinutes: 20,
        priceEstINR: 30,
        calories: 290,
        mainIngredients: ["Boiled Potatoes", "Gram Flour (Besan)", "Pav Bun", "Dry Garlic Chutney", "Green Chilies"],
        description: "Deep-fried spiced potato dumpling inside a soft bread bun, served with spicy garlic-coconut chutney and fried green chilies.",
        recipeSteps: [
            "Boil and mash potatoes with mustard seeds, curry leaves, turmeric, and minced garlic.",
            "Form into round spiced potato balls.",
            "Dip in spiced gram flour (besan) batter and deep-fry in hot oil until golden.",
            "Slice pav bun, spread dry garlic chutney, insert hot vada, and serve with fried green chili."
        ]
    },
    {
        id: "sf_2",
        dishName: "Kolkata Kathi Roll",
        state: "West Bengal",
        region: "East",
        spiceLevel: "Medium",
        dietary: "Non-Veg",
        prepTimeMinutes: 30,
        priceEstINR: 120,
        calories: 450,
        mainIngredients: ["Skewer-Roasted Chicken", "Paratha Flatbread", "Lime Juice", "Sliced Onions", "Green Chilies"],
        description: "Skewer-roasted marinated chicken or paneer wrapped in a crisp egg-layered paratha flatbread with tangy lime and onions.",
        recipeSteps: [
            "Marinate chicken cubes in yogurt, mustard oil, and ginger-garlic paste for 2 hours.",
            "Grill chicken skewers over open charcoal fire until charred and juicy.",
            "Pan-fry a flaky whole wheat paratha, beating an egg on top as it cooks.",
            "Wrap grilled chicken, raw onion slices, green chilies, and lime juice inside the rolled paratha."
        ]
    },
    {
        id: "sf_3",
        dishName: "Indori Poha & Jalebi",
        state: "Madhya Pradesh",
        region: "Central",
        spiceLevel: "Mild",
        dietary: "Veg",
        prepTimeMinutes: 15,
        priceEstINR: 40,
        calories: 320,
        mainIngredients: ["Flattened Rice (Poha)", "Fennel Seeds", "Crispy Sev", "Maida Jalebi Batter", "Sugar Syrup"],
        description: "Steamed flattened rice spiced with fennel and turmeric, served alongside hot crispy syrup-soaked jalebis and crunchy sev.",
        recipeSteps: [
            "Wash flattened rice gently and drain water completely.",
            "Temper mustard seeds, fennel seeds, and green chilies in oil.",
            "Add poha, turmeric, and sugar; steam on low heat for 5 minutes.",
            "Deep-fry jalebi spirals, soak in saffron sugar syrup, and serve piping hot alongside poha topped with Indori sev."
        ]
    },
    {
        id: "sf_4",
        dishName: "Hyderabadi Haleem",
        state: "Telangana",
        region: "South",
        spiceLevel: "Medium",
        dietary: "Non-Veg",
        prepTimeMinutes: 120,
        priceEstINR: 250,
        calories: 580,
        mainIngredients: ["Mutton Shoulder", "Broken Wheat (Dalia)", "Lentils", "Pure Ghee", "Fried Onions", "Cashews"],
        description: "A rich, slow-cooked stew of mutton, lentils, and cracked wheat pounded into a smooth paste with aromatic spices and ghee.",
        recipeSteps: [
            "Soak lentils and broken wheat overnight.",
            "Slow-cook mutton with ginger, garlic, and royal garam masala until meat falls off the bone.",
            "Combine wheat, lentils, and cooked meat in a large cauldron.",
            "Pound continuously with wooden mallets for 2 hours until thick and paste-like. Garnish with caramelized onions and fried cashews."
        ]
    },
    {
        id: "sf_5",
        dishName: "Delhi Chole Bhature",
        state: "Delhi NCR",
        region: "North",
        spiceLevel: "High",
        dietary: "Veg",
        prepTimeMinutes: 45,
        priceEstINR: 140,
        calories: 620,
        mainIngredients: ["Kabuli Chana", "Fermented Bhature Dough", "Pomegranate Powder", "Amchoor", "Green Chili Pickle"],
        description: "Dark, tangy spiced chickpeas simmered in tea-infused gravy, served with puffed fermented flour bhaturas.",
        recipeSteps: [
            "Pressure cook chickpeas with tea bags and black cardamom for dark color.",
            "Simmer cooked chole with pomegranate seed powder, dried mango powder, and ghee tempering.",
            "Roll fermented maida dough into oval discs.",
            "Deep fry in smoking hot oil until bhaturas puff up like balloons. Serve with pickled chilies."
        ]
    },
    {
        id: "sf_6",
        dishName: "Sikkimese Steamed Vegetable Momos",
        state: "Sikkim",
        region: "North-East",
        spiceLevel: "Medium",
        dietary: "Veg",
        prepTimeMinutes: 35,
        priceEstINR: 90,
        calories: 220,
        mainIngredients: ["Fine Flour Wrapper", "Minced Cabbage & Onion", "Paneer", "Ginger", "Dalle Khursani Chili Chutney"],
        description: "Delicate hand-pleated dumplings filled with spiced minced vegetables, served with fiery red Dalle Khursani chili sauce.",
        recipeSteps: [
            "Knead smooth dough using flour and water; rest for 20 minutes.",
            "Finely chop cabbage, onions, paneer, and ginger; season with salt and white pepper.",
            "Roll thin circular wrappers, fill with vegetable mixture, and pleat edges tightly.",
            "Steam in bamboo steamer for 10-12 minutes until translucent. Serve hot with red chili chutney."
        ]
    }
];

export class RegionalStreetFoodEngine {
    constructor() {
        this.dishes = STREET_FOOD_SPECIALTIES;
        this.bookmarkedIds = new Set();
        this.selectedRegion = "All";
        this.selectedDietary = "All";
        this.searchQuery = "";
        this.activeRecipe = null;
    }

    setRegionFilter(region) {
        this.selectedRegion = region;
        return this.getFilteredDishes();
    }

    setDietaryFilter(dietary) {
        this.selectedDietary = dietary;
        return this.getFilteredDishes();
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim();
        return this.getFilteredDishes();
    }

    getFilteredDishes() {
        return this.dishes.filter(d => {
            const matchRegion = this.selectedRegion === "All" || d.region === this.selectedRegion;
            const matchDietary = this.selectedDietary === "All" || d.dietary === this.selectedDietary;
            const matchSearch = this.searchQuery === "" ||
                d.dishName.toLowerCase().includes(this.searchQuery) ||
                d.state.toLowerCase().includes(this.searchQuery) ||
                d.description.toLowerCase().includes(this.searchQuery);
            return matchRegion && matchDietary && matchSearch;
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

    isBookmarked(dishId) {
        return this.bookmarkedIds.has(dishId);
    }

    getDishById(dishId) {
        return this.dishes.find(d => d.id === dishId) || null;
    }

    calculateTotalEstimatedCost(dishIds) {
        return this.dishes
            .filter(d => dishIds.includes(d.id))
            .reduce((sum, d) => sum + d.priceEstINR, 0);
    }

    setActiveRecipe(dishId) {
        this.activeRecipe = this.getDishById(dishId);
        return this.activeRecipe;
    }

    getRegionalStats() {
        const stats = {
            totalDishes: this.dishes.length,
            vegCount: this.dishes.filter(d => d.dietary === "Veg").length,
            nonVegCount: this.dishes.filter(d => d.dietary === "Non-Veg").length,
            regionsCovered: new Set(this.dishes.map(d => d.region)).size
        };
        return stats;
    }

    renderCardHTML(dish) {
        const isBookmarked = this.isBookmarked(dish.id);
        const dietaryBadgeClass = dish.dietary === "Veg" ? "veg-badge" : "non-veg-badge";

        return `
            <div class="street-food-card" data-id="${dish.id}">
                <div class="street-food-header">
                    <span class="badge ${dietaryBadgeClass}">${dish.dietary}</span>
                    <span class="region-tag">${dish.region} India (${dish.state})</span>
                </div>
                <h3 class="dish-title">${dish.dishName}</h3>
                <p class="dish-desc">${dish.description}</p>
                <div class="dish-meta font-mono">
                    <span>⏱ ${dish.prepTimeMinutes} mins</span>
                    <span>🔥 ${dish.spiceLevel} Spice</span>
                    <span>💰 ₹${dish.priceEstINR}</span>
                </div>
                <div class="dish-ingredients">
                    <strong>Ingredients:</strong> ${dish.mainIngredients.join(", ")}
                </div>
                <div class="dish-actions">
                    <button type="button" class="btn-recipe" onclick="window.regionalExplorerUI.openRecipe('${dish.id}')">View Recipe</button>
                    <button type="button" class="btn-bookmark ${isBookmarked ? 'active' : ''}" onclick="window.regionalExplorerUI.toggleBookmark('${dish.id}')">
                        ${isBookmarked ? 'Saved to Trail' : 'Bookmark Dish'}
                    </button>
                </div>
            </div>
        `;
    }
}

export class RegionalExplorerUI {
    constructor(engine) {
        this.engine = engine;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.render();
    }

    toggleBookmark(dishId) {
        this.engine.toggleBookmark(dishId);
        this.render();
    }

    openRecipe(dishId) {
        const dish = this.engine.setActiveRecipe(dishId);
        if (!dish) return;

        alert(`--- RECIPE INSTRUCTIONS FOR ${dish.dishName.toUpperCase()} ---\n\n` + dish.recipeSteps.map((s, i) => `${i + 1}. ${s}`).join("\n\n"));
    }

    render() {
        if (!this.container) return;

        const dishes = this.engine.getFilteredDishes();
        const stats = this.engine.getRegionalStats();

        let html = `
            <div class="explorer-wrapper space-y-4">
                <div class="explorer-banner bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 class="text-xl font-bold text-slate-100">Regional Indian Street Food & Culinary Explorer Engine</h2>
                    <p class="text-xs text-slate-400">Discover authentic street food specialties across ${stats.regionsCovered} regions of India (${stats.vegCount} Veg / ${stats.nonVegCount} Non-Veg).</p>
                </div>
                <div class="explorer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${dishes.map(d => this.engine.renderCardHTML(d)).join("")}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }
}

export const regionalStreetFoodEngine = new RegionalStreetFoodEngine();
