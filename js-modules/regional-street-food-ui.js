/**
 * regional-street-food-ui.js
 * DOM Controller and UI Event Handler for Regional Indian Cuisine Explorer
 * Handles interactive search filters, bookmarking cart totals, recipe modal overlays,
 * and dynamic card rendering without external framework dependencies.
 */

import { regionalStreetFoodEngine } from './regional-street-food-engine.js';

export class RegionalStreetFoodUIController {
    constructor(engine) {
        this.engine = engine;
        this.rootContainer = null;
    }

    mount(containerId = 'regional-food-explorer-app') {
        this.rootContainer = document.getElementById(containerId);
        if (!this.rootContainer) {
            // Create a fallback wrapper container in DOM if missing
            this.rootContainer = document.createElement('div');
            this.rootContainer.id = containerId;
            document.body.appendChild(this.rootContainer);
        }

        this.renderLayout();
        this.attachEventListeners();
        this.updateDishGrid();
    }

    renderLayout() {
        const stats = this.engine.getRegionalStats();

        this.rootContainer.innerHTML = `
            <div class="street-food-hub-container font-sans bg-slate-950 text-slate-100 p-6 space-y-6 max-w-7xl mx-auto rounded-3xl border border-slate-800 shadow-2xl">
                <!-- Header Banner -->
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                        <span class="text-xs font-mono font-bold uppercase text-amber-400">Culinary Heritage Trail</span>
                        <h1 class="text-3xl font-black text-slate-100 mt-1">Regional Indian Cuisine & Street Food Explorer</h1>
                        <p class="text-xs text-slate-400 mt-1">Explore authentic street food recipes, spice levels, and regional flavors across India.</p>
                    </div>

                    <div class="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                        <span class="text-xs font-bold text-slate-300">Bookmarked Dishes:</span>
                        <span id="bookmark-count-badge" class="text-lg font-black text-amber-400 font-mono">0</span>
                        <span id="bookmark-cost-badge" class="text-xs font-mono text-emerald-400 border-l border-slate-700 pl-3">₹0</span>
                    </div>
                </div>

                <!-- Controls & Filters -->
                <div class="flex flex-col md:flex-row gap-3 justify-between">
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            id="street-food-search-input"
                            placeholder="Search dishes by name, state, or ingredients (e.g., Vada Pav, Maharashtra, Chicken)..."
                            class="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
                        />
                    </div>

                    <div class="flex gap-2">
                        <select id="region-filter-select" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500">
                            <option value="All">All Regions</option>
                            <option value="North">North India</option>
                            <option value="South">South India</option>
                            <option value="East">East India</option>
                            <option value="West">West India</option>
                            <option value="Central">Central India</option>
                            <option value="North-East">North-East India</option>
                        </select>

                        <select id="dietary-filter-select" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500">
                            <option value="All">All Diets</option>
                            <option value="Veg">Vegetarian Only</option>
                            <option value="Non-Veg">Non-Vegetarian</option>
                        </select>
                    </div>
                </div>

                <!-- Dishes Grid -->
                <div id="street-food-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

                <!-- Recipe Modal Overlay -->
                <div id="recipe-modal-backdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4 z-50">
                    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
                        <button type="button" id="close-recipe-modal-btn" class="absolute right-5 top-5 text-slate-400 hover:text-slate-200 font-bold">✕</button>
                        <h2 id="modal-recipe-title" class="text-xl font-black text-slate-100"></h2>
                        <div id="modal-recipe-steps" class="space-y-3 text-xs text-slate-300 font-sans leading-relaxed"></div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const searchInput = document.getElementById('street-food-search-input');
        const regionSelect = document.getElementById('region-filter-select');
        const dietarySelect = document.getElementById('dietary-filter-select');
        const closeModalBtn = document.getElementById('close-recipe-modal-btn');
        const modalBackdrop = document.getElementById('recipe-modal-backdrop');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.engine.setSearchQuery(e.target.value);
                this.updateDishGrid();
            });
        }

        if (regionSelect) {
            regionSelect.addEventListener('change', (e) => {
                this.engine.setRegionFilter(e.target.value);
                this.updateDishGrid();
            });
        }

        if (dietarySelect) {
            dietarySelect.addEventListener('change', (e) => {
                this.engine.setDietaryFilter(e.target.value);
                this.updateDishGrid();
            });
        }

        if (closeModalBtn && modalBackdrop) {
            closeModalBtn.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
                modalBackdrop.classList.remove('flex');
            });
        }
    }

    updateDishGrid() {
        const grid = document.getElementById('street-food-grid');
        const bookmarkBadge = document.getElementById('bookmark-count-badge');
        const costBadge = document.getElementById('bookmark-cost-badge');

        if (!grid) return;

        const filteredDishes = this.engine.getFilteredDishes();
        const bookmarkedList = Array.from(this.engine.bookmarkedIds);

        if (bookmarkBadge) bookmarkBadge.innerText = bookmarkedList.length;
        if (costBadge) {
            const totalCost = this.engine.calculateTotalEstimatedCost(bookmarkedList);
            costBadge.innerText = `₹${totalCost}`;
        }

        if (filteredDishes.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                    No regional specialties matched your search filters. Try resetting the region or dietary selection.
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredDishes.map(dish => {
            const isSaved = this.engine.isBookmarked(dish.id);
            return `
                <div class="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${dish.dietary === 'Veg' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'}">
                                ${dish.dietary}
                            </span>
                            <span class="text-[10px] font-mono text-amber-400 font-bold">${dish.region} India (${dish.state})</span>
                        </div>
                        <h3 class="text-base font-bold text-slate-100">${dish.dishName}</h3>
                        <p class="text-xs text-slate-400 line-clamp-2">${dish.description}</p>
                        <div class="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
                            <span>⏱ ${dish.prepTimeMinutes} mins</span>
                            <span>🔥 ${dish.spiceLevel}</span>
                            <span class="text-emerald-400 font-bold">₹${dish.priceEstINR}</span>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2 border-t border-slate-800">
                        <button type="button" class="view-recipe-btn px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex-1" data-id="${dish.id}">
                            View Recipe
                        </button>
                        <button type="button" class="bookmark-btn px-3 py-1.5 rounded-xl text-xs font-bold ${isSaved ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}" data-id="${dish.id}">
                            ${isSaved ? 'Bookmarked' : 'Save'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach dynamic button handlers
        grid.querySelectorAll('.view-recipe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dishId = e.currentTarget.getAttribute('data-id');
                this.showRecipeModal(dishId);
            });
        });

        grid.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dishId = e.currentTarget.getAttribute('data-id');
                this.engine.toggleBookmark(dishId);
                this.updateDishGrid();
            });
        });
    }

    showRecipeModal(dishId) {
        const dish = this.engine.getDishById(dishId);
        const modalBackdrop = document.getElementById('recipe-modal-backdrop');
        const modalTitle = document.getElementById('modal-recipe-title');
        const modalSteps = document.getElementById('modal-recipe-steps');

        if (!dish || !modalBackdrop || !modalTitle || !modalSteps) return;

        modalTitle.innerText = `${dish.dishName} (${dish.state})`;
        modalSteps.innerHTML = dish.recipeSteps.map((step, idx) => `
            <div class="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                <p class="flex-1">${step}</p>
            </div>
        `).join('');

        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('flex');
    }
}

export const regionalStreetFoodUIController = new RegionalStreetFoodUIController(regionalStreetFoodEngine);
