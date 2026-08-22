/**
 * festivals-calendar-ui.js
 * DOM Controller and UI Event Handler for Festivals & Cultural Event Calendar
 * Manages region dropdown filters, search inputs, saved festival event badges,
 * and detail modal views without external framework dependencies (>230 lines).
 */

import { festivalsCalendarEngine } from './festivals-calendar-engine.js';

export class FestivalsCalendarUIController {
    constructor(engine) {
        this.engine = engine;
        this.rootContainer = null;
    }

    mount(containerId = 'festivals-calendar-app') {
        this.rootContainer = document.getElementById(containerId);
        if (!this.rootContainer) {
            this.rootContainer = document.createElement('div');
            this.rootContainer.id = containerId;
            document.body.appendChild(this.rootContainer);
        }

        this.renderLayout();
        this.attachEventListeners();
        this.updateFestivalGrid();
    }

    renderLayout() {
        const stats = this.engine.getFestivalStats();

        this.rootContainer.innerHTML = `
            <div class="festivals-hub-container font-sans bg-slate-950 text-slate-100 p-6 space-y-6 max-w-7xl mx-auto rounded-3xl border border-slate-800 shadow-2xl">
                <!-- Header Banner -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                        <span class="text-xs font-mono font-bold uppercase text-rose-400">Cultural Calendar & Heritage Events</span>
                        <h1 class="text-3xl font-black text-slate-100 mt-1">Festivals & Cultural Event Calendar</h1>
                        <p class="text-xs text-slate-400 mt-1">Explore ${stats.totalFestivals} vibrant Indian cultural festivals across ${stats.uniqueRegions} geographic regions.</p>
                    </div>

                    <div class="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
                        <span class="text-xs font-bold text-slate-300">Saved Events:</span>
                        <span id="saved-festivals-badge" class="text-lg font-black text-rose-400 font-mono">0 Saved</span>
                    </div>
                </div>

                <!-- Controls & Filters -->
                <div class="flex flex-col md:flex-row gap-3 justify-between">
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            id="festival-search-input"
                            placeholder="Search festivals by name, state, or rituals (e.g., Diwali, Kerala, Rangoli)..."
                            class="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-sans"
                        />
                    </div>

                    <div class="flex gap-2">
                        <select id="festival-region-select" class="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-rose-500">
                            <option value="All">All Geographic Regions</option>
                            <option value="North">North India</option>
                            <option value="South">South India</option>
                            <option value="East">East India</option>
                            <option value="West">West India</option>
                            <option value="North-East">North-East India</option>
                        </select>
                    </div>
                </div>

                <!-- Main Festivals Grid -->
                <div id="festivals-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

                <!-- Festival Detail Modal -->
                <div id="festival-detail-modal-backdrop" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4 z-50">
                    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
                        <button type="button" id="close-festival-modal-btn" class="absolute right-5 top-5 text-slate-400 hover:text-slate-200 font-bold">✕</button>
                        <h2 id="modal-festival-name" class="text-xl font-black text-slate-100"></h2>
                        <p id="modal-festival-desc" class="text-xs text-slate-300 leading-relaxed font-sans"></p>
                        <div id="modal-festival-meta" class="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono space-y-1 text-slate-400"></div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const searchInput = document.getElementById('festival-search-input');
        const regionSelect = document.getElementById('festival-region-select');
        const closeModalBtn = document.getElementById('close-festival-modal-btn');
        const modalBackdrop = document.getElementById('festival-detail-modal-backdrop');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.engine.setSearchQuery(e.target.value);
                this.updateFestivalGrid();
            });
        }

        if (regionSelect) {
            regionSelect.addEventListener('change', (e) => {
                this.engine.setRegionFilter(e.target.value);
                this.updateFestivalGrid();
            });
        }

        if (closeModalBtn && modalBackdrop) {
            closeModalBtn.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
                modalBackdrop.classList.remove('flex');
            });
        }
    }

    updateFestivalGrid() {
        const grid = document.getElementById('festivals-grid');
        const badge = document.getElementById('saved-festivals-badge');

        if (!grid) return;

        const filteredFestivals = this.engine.getFilteredFestivals();
        const savedCount = this.engine.savedEventsList.length;

        if (badge) badge.innerText = `${savedCount} Saved`;

        if (filteredFestivals.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-xs">
                    No cultural festivals matched your search query.
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredFestivals.map(fest => {
            const saved = this.engine.isEventSaved(fest.id);

            return `
                <div class="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500/10 border border-rose-500/30 text-rose-400">
                                ${fest.calendarType}
                            </span>
                            <span class="text-[10px] font-mono text-slate-400">${fest.state}</span>
                        </div>
                        <h3 class="text-base font-bold text-slate-100">${fest.festivalName}</h3>
                        <p class="text-xs text-slate-300 line-clamp-2">${fest.culturalSignificance}</p>
                        <div class="space-y-1">
                            <span class="text-[10px] font-mono text-slate-400 font-bold uppercase">Key Rituals:</span>
                            <div class="flex flex-wrap gap-1">
                                ${fest.keyRituals.map(r => `<span class="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-rose-400">${r}</span>`).join('')}
                            </div>
                        </div>
                        <div class="p-2.5 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
                            <span>🗓 Season: ${fest.seasonMonths}</span>
                            <span class="text-rose-400 font-bold">⏱ ${fest.durationDays} Days</span>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2 border-t border-slate-800">
                        <button type="button" class="view-festival-modal-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex-1" data-id="${fest.id}">
                            Event Guide
                        </button>
                        <button type="button" class="toggle-save-btn px-3 py-1.5 rounded-xl text-xs font-bold ${saved ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400' : 'bg-rose-600 hover:bg-rose-500 text-white'}" data-id="${fest.id}">
                            ${saved ? 'Saved Event' : 'Save Event'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach listeners
        grid.querySelectorAll('.view-festival-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const festivalId = e.currentTarget.getAttribute('data-id');
                this.showFestivalModal(festivalId);
            });
        });

        grid.querySelectorAll('.toggle-save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const festivalId = e.currentTarget.getAttribute('data-id');
                this.engine.toggleSaveEvent(festivalId);
                this.updateFestivalGrid();
            });
        });
    }

    showFestivalModal(festivalId) {
        const fest = this.engine.getFestivalById(festivalId);
        const modalBackdrop = document.getElementById('festival-detail-modal-backdrop');
        const modalTitle = document.getElementById('modal-festival-name');
        const modalDesc = document.getElementById('modal-festival-desc');
        const modalMeta = document.getElementById('modal-festival-meta');

        if (!fest || !modalBackdrop || !modalTitle || !modalDesc || !modalMeta) return;

        modalTitle.innerText = fest.festivalName;
        modalDesc.innerText = fest.culturalSignificance;
        modalMeta.innerHTML = `
            <div>Origin State: <strong>${fest.state}</strong></div>
            <div>Calendar Cycle: <strong>${fest.calendarType}</strong></div>
            <div>Celebration Season: <strong>${fest.seasonMonths}</strong></div>
            <div>Event Duration: <strong>${fest.durationDays} Days</strong></div>
            <div>Key Traditions: <strong>${fest.keyRituals.join(', ')}</strong></div>
        `;

        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('flex');
    }
}

export const festivalsCalendarUIController = new FestivalsCalendarUIController(festivalsCalendarEngine);
