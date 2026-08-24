/**
 * wildlife-sanctuary-ui.js
 * DOM Controller and UI Event Handler for Wildlife Sanctuaries & Ecotourism Park Hub
 * Manages species dropdown filters, search inputs, safari permit cart calculators,
 * and detail modal views without external framework dependencies (>230 lines).
 */

import { wildlifeSanctuaryEngine } from './wildlife-sanctuary-engine.js';

export class WildlifeSanctuaryUIController {
    constructor(engine) {
        this.engine = engine;
        this.rootContainer = null;
        this.isForeignerFee = false;
    }

    mount(containerId = 'wildlife-sanctuary-app') {
        this.rootContainer = document.getElementById(containerId);
        if (!this.rootContainer) {
            this.rootContainer = document.createElement('div');
            this.rootContainer.id = containerId;
            document.body.appendChild(this.rootContainer);
        }

        this.renderLayout();
        this.attachEventListeners();
        this.updateParkGrid();
    }

    renderLayout() {
        const stats = this.engine.getParkStats();

        this.rootContainer.innerHTML = `
            <div class="wildlife-hub-container font-sans bg-slate-950 text-slate-100 p-6 space-y-6 max-w-7xl mx-auto rounded-3xl border border-slate-800 shadow-2xl">
                <!-- Header Banner -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                        <span class="text-xs font-mono font-bold uppercase text-emerald-400">Indian Ecotourism & Reserve Network</span>
                        <h1 class="text-3xl font-black text-slate-100 mt-1">Wildlife Sanctuaries & Ecotourism Park Hub</h1>
                        <p class="text-xs text-slate-400 mt-1">Protecting ${stats.totalAreaSqKm.toLocaleString()} sq. km of natural reserves and ${stats.uniqueSpecies} iconic animal species across India.</p>
                    </div>

                    <div class="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                        <span class="text-xs font-bold text-slate-300">Safari Permits:</span>
                        <span id="permit-count-badge" class="text-lg font-black text-emerald-400 font-mono">0 Passes</span>
                        <span id="permit-cost-badge" class="text-xs font-mono text-amber-400 border-l border-slate-700 pl-3">₹0</span>
                    </div>
                </div>

                <!-- Controls & Filters -->
                <div class="flex flex-col md:flex-row gap-3 justify-between">
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            id="park-search-input"
                            placeholder="Search national parks by name, state, or animal species (e.g., Corbett, Tiger, Asiatic Lion)..."
                            class="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-sans"
                        />
                    </div>

                    <div class="flex gap-2">
                        <select id="species-filter-select" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500">
                            <option value="All">All Key Species</option>
                            <option value="Tiger">Bengal Tiger</option>
                            <option value="Lion">Asiatic Lion</option>
                            <option value="Elephant">Asian Elephant</option>
                            <option value="Rhinoceros">One-Horned Rhinoceros</option>
                        </select>

                        <button type="button" id="toggle-permit-type-btn" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 hover:border-slate-700">
                            Permit: Domestic (₹)
                        </button>
                    </div>
                </div>

                <!-- Main Parks Grid -->
                <div id="parks-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

                <!-- Park Detail Modal -->
                <div id="park-detail-modal-backdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4 z-50">
                    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
                        <button type="button" id="close-park-modal-btn" class="absolute right-5 top-5 text-slate-400 hover:text-slate-200 font-bold">✕</button>
                        <h2 id="modal-park-name" class="text-xl font-black text-slate-100"></h2>
                        <p id="modal-park-desc" class="text-xs text-slate-300 leading-relaxed font-sans"></p>
                        <div id="modal-park-meta" class="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono space-y-1 text-slate-400"></div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const searchInput = document.getElementById('park-search-input');
        const speciesSelect = document.getElementById('species-filter-select');
        const permitToggleBtn = document.getElementById('toggle-permit-type-btn');
        const closeModalBtn = document.getElementById('close-park-modal-btn');
        const modalBackdrop = document.getElementById('park-detail-modal-backdrop');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.engine.setSearchQuery(e.target.value);
                this.updateParkGrid();
            });
        }

        if (speciesSelect) {
            speciesSelect.addEventListener('change', (e) => {
                this.engine.setSpeciesFilter(e.target.value);
                this.updateParkGrid();
            });
        }

        if (permitToggleBtn) {
            permitToggleBtn.addEventListener('click', () => {
                this.isForeignerFee = !this.isForeignerFee;
                permitToggleBtn.innerText = `Permit: ${this.isForeignerFee ? 'Foreigner (₹)' : 'Domestic (₹)'}`;
                this.updateParkGrid();
            });
        }

        if (closeModalBtn && modalBackdrop) {
            closeModalBtn.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
                modalBackdrop.classList.remove('flex');
            });
        }
    }

    updateParkGrid() {
        const grid = document.getElementById('parks-grid');
        const countBadge = document.getElementById('permit-count-badge');
        const costBadge = document.getElementById('permit-cost-badge');

        if (!grid) return;

        const filteredParks = this.engine.getFilteredParks();
        const cartCount = this.engine.permitCart.length;
        const totalCost = this.engine.calculateTotalPermitCost(this.isForeignerFee);

        if (countBadge) countBadge.innerText = `${cartCount} Pass(es)`;
        if (costBadge) costBadge.innerText = `₹${totalCost}`;

        if (filteredParks.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                    No national parks matched your species or location search query.
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredParks.map(park => {
            const added = this.engine.isInCart(park.id);
            const fee = this.isForeignerFee ? park.foreignPermitFeeINR : park.permitFeeINR;

            return `
                <div class="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                ${park.ecotourismRating}
                            </span>
                            <span class="text-[10px] font-mono text-slate-400">${park.state}</span>
                        </div>
                        <h3 class="text-base font-bold text-slate-100">${park.parkName}</h3>
                        <p class="text-xs text-slate-300 line-clamp-2">${park.description}</p>
                        <div class="space-y-1">
                            <span class="text-[10px] font-mono text-slate-400 font-bold uppercase">Key Species:</span>
                            <div class="flex flex-wrap gap-1">
                                ${park.keySpecies.map(s => `<span class="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-emerald-400">${s}</span>`).join('')}
                            </div>
                        </div>
                        <div class="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
                            <span>🗓 ${park.bestSeasonMonths}</span>
                            <span class="text-emerald-400 font-bold">₹${fee} / Permit</span>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2 border-t border-slate-800">
                        <button type="button" class="view-park-modal-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex-1" data-id="${park.id}">
                            Safari Zones
                        </button>
                        <button type="button" class="toggle-permit-btn px-3 py-1.5 rounded-xl text-xs font-bold ${added ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}" data-id="${park.id}">
                            ${added ? 'Permit Reserved' : 'Book Permit'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach listeners
        grid.querySelectorAll('.view-park-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const parkId = e.currentTarget.getAttribute('data-id');
                this.showParkModal(parkId);
            });
        });

        grid.querySelectorAll('.toggle-permit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const parkId = e.currentTarget.getAttribute('data-id');
                if (this.engine.isInCart(parkId)) {
                    this.engine.removeFromCart(parkId);
                } else {
                    this.engine.addToCart(parkId);
                }
                this.updateParkGrid();
            });
        });
    }

    showParkModal(parkId) {
        const park = this.engine.getParkById(parkId);
        const modalBackdrop = document.getElementById('park-detail-modal-backdrop');
        const modalTitle = document.getElementById('modal-park-name');
        const modalDesc = document.getElementById('modal-park-desc');
        const modalMeta = document.getElementById('modal-park-meta');

        if (!park || !modalBackdrop || !modalTitle || !modalDesc || !modalMeta) return;

        modalTitle.innerText = park.parkName;
        modalDesc.innerText = park.description;
        modalMeta.innerHTML = `
            <div>State: <strong>${park.state}</strong></div>
            <div>Reserve Area: <strong>${park.areaSqKm} Sq. Km</strong></div>
            <div>Official Safari Zones: <strong>${park.safariZones.join(', ')}</strong></div>
            <div>Best Visit Season: <strong>${park.bestSeasonMonths}</strong></div>
            <div>Domestic Permit Fee: <strong>₹${park.permitFeeINR}</strong></div>
            <div>Foreigner Permit Fee: <strong>₹${park.foreignPermitFeeINR}</strong></div>
        `;

        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('flex');
    }
}

export const wildlifeSanctuaryUIController = new WildlifeSanctuaryUIController(wildlifeSanctuaryEngine);
