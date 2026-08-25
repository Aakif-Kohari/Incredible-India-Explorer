/**
 * handicrafts-emporium-ui.js
 * DOM Controller and UI Event Handler for Traditional Handicrafts & Artisan Emporium
 * Manages GI tag badges, craft category filtering, artisan support cart calculators,
 * and detail modal views without external framework dependencies (>230 lines).
 */

import { handicraftsEmporiumEngine } from './handicrafts-emporium-engine.js';

export class HandicraftsEmporiumUIController {
    constructor(engine) {
        this.engine = engine;
        this.rootContainer = null;
    }

    mount(containerId = 'handicrafts-emporium-app') {
        this.rootContainer = document.getElementById(containerId);
        if (!this.rootContainer) {
            this.rootContainer = document.createElement('div');
            this.rootContainer.id = containerId;
            document.body.appendChild(this.rootContainer);
        }

        this.renderLayout();
        this.attachEventListeners();
        this.updateCraftGrid();
    }

    renderLayout() {
        const stats = this.engine.getCraftStats();

        this.rootContainer.innerHTML = `
            <div class="handicrafts-hub-container font-sans bg-slate-950 text-slate-100 p-6 space-y-6 max-w-7xl mx-auto rounded-3xl border border-slate-800 shadow-2xl">
                <!-- Header Banner -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                        <span class="text-xs font-mono font-bold uppercase text-amber-400">Artisan Heritage & GI Showcase</span>
                        <h1 class="text-3xl font-black text-slate-100 mt-1">Traditional Indian Handicrafts & Artisan Emporium</h1>
                        <p class="text-xs text-slate-400 mt-1">Empowering ${stats.artisanClusters} Indian artisan clusters across ${stats.giTagCount} GI-tagged traditional craft categories.</p>
                    </div>

                    <div class="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                        <span class="text-xs font-bold text-slate-300">Artisan Cart:</span>
                        <span id="cart-count-badge" class="text-lg font-black text-amber-400 font-mono">0 Items</span>
                        <span id="cart-total-badge" class="text-xs font-mono text-emerald-400 border-l border-slate-700 pl-3">₹0</span>
                    </div>
                </div>

                <!-- Controls & Filters -->
                <div class="flex flex-col md:flex-row gap-3 justify-between">
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            id="craft-search-input"
                            placeholder="Search crafts by name, state, or artisan cluster (e.g., Pashmina, Kashmir, Jaipur)..."
                            class="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
                        />
                    </div>

                    <div class="flex gap-2">
                        <select id="craft-category-select" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500">
                            <option value="All">All Craft Categories</option>
                            <option value="Textile & Weaving">Textiles & Weaving</option>
                            <option value="Pottery & Ceramics">Pottery & Ceramics</option>
                            <option value="Metalwork & Jewelry">Metalwork & Jewelry</option>
                            <option value="Folk Painting & Art">Folk Painting & Art</option>
                            <option value="Woodwork & Toys">Woodwork & Toys</option>
                        </select>
                    </div>
                </div>

                <!-- Main Crafts Grid -->
                <div id="crafts-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

                <!-- Craft Detail Modal -->
                <div id="craft-detail-modal-backdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4 z-50">
                    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
                        <button type="button" id="close-craft-modal-btn" class="absolute right-5 top-5 text-slate-400 hover:text-slate-200 font-bold">✕</button>
                        <h2 id="modal-craft-name" class="text-xl font-black text-slate-100"></h2>
                        <p id="modal-craft-desc" class="text-xs text-slate-300 leading-relaxed font-sans"></p>
                        <div id="modal-craft-meta" class="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono space-y-1 text-slate-400"></div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const searchInput = document.getElementById('craft-search-input');
        const categorySelect = document.getElementById('craft-category-select');
        const closeModalBtn = document.getElementById('close-craft-modal-btn');
        const modalBackdrop = document.getElementById('craft-detail-modal-backdrop');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.engine.setSearchQuery(e.target.value);
                this.updateCraftGrid();
            });
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.engine.setCategoryFilter(e.target.value);
                this.updateCraftGrid();
            });
        }

        if (closeModalBtn && modalBackdrop) {
            closeModalBtn.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
                modalBackdrop.classList.remove('flex');
            });
        }
    }

    updateCraftGrid() {
        const grid = document.getElementById('crafts-grid');
        const countBadge = document.getElementById('cart-count-badge');
        const totalBadge = document.getElementById('cart-total-badge');

        if (!grid) return;

        const filteredCrafts = this.engine.getFilteredCrafts();
        const cartCount = this.engine.cartList.length;
        const cartTotal = this.engine.calculateCartTotal();

        if (countBadge) countBadge.innerText = `${cartCount} Item(s)`;
        if (totalBadge) totalBadge.innerText = `₹${cartTotal}`;

        if (filteredCrafts.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                    No traditional handicrafts matched your search query.
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredCrafts.map(craft => {
            const added = this.engine.isInCart(craft.id);

            return `
                <div class="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                                ${craft.craftCategory}
                            </span>
                            ${craft.giTagVerified ? '<span class="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold">GI Tagged ✓</span>' : ''}
                        </div>
                        <h3 class="text-base font-bold text-slate-100">${craft.craftName}</h3>
                        <p class="text-xs text-slate-400 font-mono">Origin: ${craft.originState} (${craft.artisanCluster})</p>
                        <p class="text-xs text-slate-300 line-clamp-2">${craft.description}</p>
                        <div class="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
                            <span>🔨 ${craft.craftingDays} Days Crafting</span>
                            <span class="text-emerald-400 font-bold">₹${craft.priceINR}</span>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2 border-t border-slate-800">
                        <button type="button" class="view-craft-modal-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex-1" data-id="${craft.id}">
                            Artisan Specs
                        </button>
                        <button type="button" class="toggle-cart-btn px-3 py-1.5 rounded-xl text-xs font-bold ${added ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-amber-600 hover:bg-amber-500 text-white'}" data-id="${craft.id}">
                            ${added ? 'In Support Cart' : 'Support Artisan'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach listeners
        grid.querySelectorAll('.view-craft-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const craftId = e.currentTarget.getAttribute('data-id');
                this.showCraftModal(craftId);
            });
        });

        grid.querySelectorAll('.toggle-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const craftId = e.currentTarget.getAttribute('data-id');
                if (this.engine.isInCart(craftId)) {
                    this.engine.removeFromCart(craftId);
                } else {
                    this.engine.addToCart(craftId);
                }
                this.updateCraftGrid();
            });
        });
    }

    showCraftModal(craftId) {
        const craft = this.engine.getCraftById(craftId);
        const modalBackdrop = document.getElementById('craft-detail-modal-backdrop');
        const modalTitle = document.getElementById('modal-craft-name');
        const modalDesc = document.getElementById('modal-craft-desc');
        const modalMeta = document.getElementById('modal-craft-meta');

        if (!craft || !modalBackdrop || !modalTitle || !modalDesc || !modalMeta) return;

        modalTitle.innerText = craft.craftName;
        modalDesc.innerText = craft.description;
        modalMeta.innerHTML = `
            <div>Origin Guild: <strong>${craft.artisanCluster} (${craft.originState})</strong></div>
            <div>Materials: <strong>${craft.materialsUsed.join(', ')}</strong></div>
            <div>Estimated Production Time: <strong>${craft.craftingDays} Days</strong></div>
            <div>Preservation Status: <strong>${craft.preservationStatus}</strong></div>
            <div>Fair-Trade Price: <strong>₹${craft.priceINR}</strong></div>
        `;

        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('flex');
    }
}

export const handicraftsEmporiumUIController = new HandicraftsEmporiumUIController(handicraftsEmporiumEngine);
