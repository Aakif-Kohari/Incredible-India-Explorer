/**
 * unesco-heritage-ui.js
 * DOM Controller and UI Event Handler for UNESCO World Heritage Explorer & Itinerary Planner
 * Manages category filters, live site search, itinerary drawer, cost calculators,
 * and site modal detail views without external framework dependencies (>230 lines).
 */

import { unescoHeritageEngine } from './unesco-heritage-engine.js';

export class UnescoHeritageUIController {
    constructor(engine) {
        this.engine = engine;
        this.rootContainer = null;
        this.isForeignerFee = false;
    }

    mount(containerId = 'unesco-heritage-explorer-app') {
        this.rootContainer = document.getElementById(containerId);
        if (!this.rootContainer) {
            this.rootContainer = document.createElement('div');
            this.rootContainer.id = containerId;
            document.body.appendChild(this.rootContainer);
        }

        this.renderLayout();
        this.attachEventListeners();
        this.updateSiteGrid();
    }

    renderLayout() {
        const stats = this.engine.getCategoryStats();

        this.rootContainer.innerHTML = `
            <div class="unesco-hub-container font-sans bg-slate-950 text-slate-100 p-6 space-y-6 max-w-7xl mx-auto rounded-3xl border border-slate-800 shadow-2xl">
                <!-- Header Banner -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                        <span class="text-xs font-mono font-bold uppercase text-amber-400">UNESCO World Heritage Trail</span>
                        <h1 class="text-3xl font-black text-slate-100 mt-1">UNESCO Heritage Site Explorer & Itinerary Planner</h1>
                        <p class="text-xs text-slate-400 mt-1">Discover India's ${stats.totalSites} UNESCO World Heritage monuments (${stats.culturalCount} Cultural / ${stats.naturalCount} Natural) and plan customized itineraries.</p>
                    </div>

                    <div class="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                        <span class="text-xs font-bold text-slate-300">Itinerary Total:</span>
                        <span id="itinerary-count-badge" class="text-lg font-black text-amber-400 font-mono">0 Sites</span>
                        <span id="itinerary-cost-badge" class="text-xs font-mono text-emerald-400 border-l border-slate-700 pl-3">₹0</span>
                    </div>
                </div>

                <!-- Controls & Filters -->
                <div class="flex flex-col md:flex-row gap-3 justify-between">
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            id="unesco-search-input"
                            placeholder="Search UNESCO sites by name, city, or architectural style (e.g., Taj Mahal, Agra, Mughal)..."
                            class="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
                        />
                    </div>

                    <div class="flex gap-2">
                        <select id="category-filter-select" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500">
                            <option value="All">All Categories</option>
                            <option value="Cultural">Cultural Monuments</option>
                            <option value="Natural">Natural Reserves</option>
                        </select>

                        <button type="button" id="toggle-fee-type-btn" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 hover:border-slate-700">
                            Fee Mode: Domestic (₹)
                        </button>
                    </div>
                </div>

                <!-- Main Sites Grid -->
                <div id="unesco-sites-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

                <!-- Detail View Modal -->
                <div id="site-detail-modal-backdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4 z-50">
                    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
                        <button type="button" id="close-site-modal-btn" class="absolute right-5 top-5 text-slate-400 hover:text-slate-200 font-bold">✕</button>
                        <h2 id="modal-site-name" class="text-xl font-black text-slate-100"></h2>
                        <p id="modal-site-desc" class="text-xs text-slate-300 leading-relaxed font-sans"></p>
                        <div id="modal-site-meta" class="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono space-y-1 text-slate-400"></div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const searchInput = document.getElementById('unesco-search-input');
        const categorySelect = document.getElementById('category-filter-select');
        const feeToggleBtn = document.getElementById('toggle-fee-type-btn');
        const closeModalBtn = document.getElementById('close-site-modal-btn');
        const modalBackdrop = document.getElementById('site-detail-modal-backdrop');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.engine.setSearchQuery(e.target.value);
                this.updateSiteGrid();
            });
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.engine.setCategoryFilter(e.target.value);
                this.updateSiteGrid();
            });
        }

        if (feeToggleBtn) {
            feeToggleBtn.addEventListener('click', () => {
                this.isForeignerFee = !this.isForeignerFee;
                feeToggleBtn.innerText = `Fee Mode: ${this.isForeignerFee ? 'Foreigner (₹)' : 'Domestic (₹)'}`;
                this.updateSiteGrid();
            });
        }

        if (closeModalBtn && modalBackdrop) {
            closeModalBtn.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
                modalBackdrop.classList.remove('flex');
            });
        }
    }

    updateSiteGrid() {
        const grid = document.getElementById('unesco-sites-grid');
        const countBadge = document.getElementById('itinerary-count-badge');
        const costBadge = document.getElementById('itinerary-cost-badge');

        if (!grid) return;

        const filteredSites = this.engine.getFilteredSites();
        const itineraryCount = this.engine.itineraryList.length;
        const totalCost = this.engine.calculateTotalEntryFees(this.isForeignerFee);

        if (countBadge) countBadge.innerText = `${itineraryCount} Site(s)`;
        if (costBadge) costBadge.innerText = `₹${totalCost}`;

        if (filteredSites.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                    No UNESCO World Heritage sites matched your criteria.
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredSites.map(site => {
            const added = this.engine.isInItinerary(site.id);
            const fee = this.isForeignerFee ? site.foreignFeeINR : site.entryFeeINR;

            return `
                <div class="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                ${site.category} Heritage
                            </span>
                            <span class="text-[10px] font-mono text-slate-400">Inscribed: ${site.inscriptionYear}</span>
                        </div>
                        <h3 class="text-base font-bold text-slate-100">${site.siteName}</h3>
                        <p class="text-xs text-slate-400 font-mono">${site.location}</p>
                        <p class="text-xs text-slate-300 line-clamp-2">${site.description}</p>
                        <div class="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
                            <span>🕒 ${site.recommendedHours} hrs</span>
                            <span>🗓 ${site.bestMonths}</span>
                            <span class="text-emerald-400 font-bold">₹${fee}</span>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2 border-t border-slate-800">
                        <button type="button" class="view-site-modal-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex-1" data-id="${site.id}">
                            Site Details
                        </button>
                        <button type="button" class="toggle-itinerary-btn px-3 py-1.5 rounded-xl text-xs font-bold ${added ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}" data-id="${site.id}">
                            ${added ? 'In Itinerary' : 'Add to Plan'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach listeners
        grid.querySelectorAll('.view-site-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const siteId = e.currentTarget.getAttribute('data-id');
                this.showSiteModal(siteId);
            });
        });

        grid.querySelectorAll('.toggle-itinerary-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const siteId = e.currentTarget.getAttribute('data-id');
                if (this.engine.isInItinerary(siteId)) {
                    this.engine.removeFromItinerary(siteId);
                } else {
                    this.engine.addToItinerary(siteId);
                }
                this.updateSiteGrid();
            });
        });
    }

    showSiteModal(siteId) {
        const site = this.engine.getSiteById(siteId);
        const modalBackdrop = document.getElementById('site-detail-modal-backdrop');
        const modalTitle = document.getElementById('modal-site-name');
        const modalDesc = document.getElementById('modal-site-desc');
        const modalMeta = document.getElementById('modal-site-meta');

        if (!site || !modalBackdrop || !modalTitle || !modalDesc || !modalMeta) return;

        modalTitle.innerText = site.siteName;
        modalDesc.innerText = site.description;
        modalMeta.innerHTML = `
            <div>Location: <strong>${site.location}</strong></div>
            <div>Style: <strong>${site.architecturalStyle}</strong></div>
            <div>Recommended Hours: <strong>${site.recommendedHours} Hours</strong></div>
            <div>Domestic Entry Fee: <strong>₹${site.entryFeeINR}</strong></div>
            <div>Foreigner Entry Fee: <strong>₹${site.foreignFeeINR}</strong></div>
        `;

        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('flex');
    }
}

export const unescoHeritageUIController = new UnescoHeritageUIController(unescoHeritageEngine);
