/**
 * Itinerary Planner UI Component
 * Renders the stateful planner section where users can browse sites,
 * search/filter locations, and generate algorithms using greedy nearest-neighbor.
 */
import { dashboardInstance } from './DashboardService.js';

export class ItineraryPlanner {
    constructor(containerElement) {
        this.container = containerElement;
        this.unsubscribe = dashboardInstance.store.subscribe((state) => this.render(state));

        // Initial fetch
        dashboardInstance.fetchDestinations('', { region: 'all', type: 'all' }).then(res => {
            this.sitesList = res.data;
            this.render(dashboardInstance.store.getState());
        });
    }

    destroy() {
        this.unsubscribe();
    }

    handleSearch(e) {
        const query = e.target.value;
        dashboardInstance.fetchDestinations(query, { region: 'all', type: 'all' }).then(res => {
            this.sitesList = res.data;
            this.render(dashboardInstance.store.getState());
        });
    }

    handleFilterRegion(e) {
        dashboardInstance.fetchDestinations('', { region: e.target.value, type: 'all' }).then(res => {
            this.sitesList = res.data;
            this.render(dashboardInstance.store.getState());
        });
    }

    render(state) {
        if (state.currentView !== 'planner' && state.currentView !== 'analytics') return;

        this.container.innerHTML = `
      <div class="da-header animate-enter">
        <h1>Enterprise Explorer & Itinerary Route Optimization</h1>
        <div class="da-controls">
          <input type="text" id="da-search" class="da-search-bar" placeholder="Search heritage sites (e.g., Taj Mahal)..." value="${state.searchQuery || ''}">
          <select id="da-region" class="da-search-bar" style="width: auto;">
            <option value="all">All Regions</option>
            <option value="North">North India</option>
            <option value="South">South India</option>
            <option value="East">East India</option>
            <option value="West">West India</option>
            <option value="Central">Central India</option>
          </select>
          <button id="da-commit-btn" class="da-btn" ${state.selectedDestinations.length < 2 ? 'disabled style="opacity:0.5"' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Generate AI Optimized Route
          </button>
        </div>
      </div>

      <div class="da-grid animate-enter">
        <aside class="da-sidebar glass-panel">
          <h2 style="margin-top:0; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">Available Destinations</h2>
          ${this.renderSitesList(state)}
        </aside>

        <main class="da-main glass-panel">
          ${state.currentView === 'analytics' && state.itinerary ? this.renderAnalytics(state) : this.renderEmptyState(state)}
        </main>
      </div>
    `;

        // Attach local listeners
        setTimeout(() => this.attachListeners(state), 0);
    }

    renderSitesList(state) {
        if (!this.sitesList || this.sitesList.length === 0) {
            return `<p style="color:var(--da-text-medium); font-size:0.9rem;">No destinations match your criteria.</p>`;
        }

        return this.sitesList.map(site => {
            const isSelected = state.selectedDestinations.includes(site.id);
            return `
        <div class="site-card" data-id="${site.id}" style="${isSelected ? 'border-color:var(--da-primary-color); background: rgba(252, 163, 17, 0.1);' : ''}">
          <div class="site-card-header">
            <h3>${site.name}</h3>
            <span class="da-badge">${site.type}</span>
          </div>
          <p>${site.description}</p>
          <div style="margin-top:10px; display:flex; gap:10px;">
            <button class="da-btn secondary btn-toggle" data-id="${site.id}" style="font-size:0.8rem; padding: 0.3rem 0.6rem;">
              ${isSelected ? 'Remove' : 'Add to Itinerary'}
            </button>
            <button class="da-btn secondary btn-view" data-id="${site.id}" style="font-size:0.8rem; padding: 0.3rem 0.6rem;">View Details</button>
          </div>
        </div>
      `;
        }).join('');
    }

    renderEmptyState(state) {
        const selCount = state.selectedDestinations.length;
        return `
      <div class="da-empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <h3>Your Canvas is Empty</h3>
        <p>Select at least 2 destinations from the left panel.<br>Currently Selected: <strong>${selCount}</strong></p>
        ${selCount === 1 ? '<p style="color:var(--da-primary-color); margin-top:10px;">Select 1 more to unlock AI generation.</p>' : ''}
      </div>
    `;
    }

    renderAnalytics(state) {
        const routeHtml = state.itinerary.map((node, i) => `
      <div class="timeline-item">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <h4 style="margin:0; font-size:1.1rem; color:var(--da-primary-color);">${i + 1}. ${node.name}</h4>
            <span style="font-size:0.85rem; color:var(--da-text-medium);">Day ${node.day}</span>
          </div>
          <div class="da-badge">ETA: ${node.estimatedArrival}</div>
        </div>
        <p style="margin:8px 0 0; font-size:0.9rem;">${node.description}</p>
      </div>
    `).join('');

        return `
      <div style="margin-bottom: 2rem; display:flex; justify-content:space-between; align-items:center;">
        <h2 style="margin:0;">Optimized AI Route Plan</h2>
        <button id="da-reset-btn" class="da-btn secondary" style="padding: 0.4rem 1rem;">Reset Plan</button>
      </div>
      <div class="timeline-container">
        ${routeHtml}
      </div>
    `;
    }

    attachListeners(state) {
        const searchInput = document.getElementById('da-search');
        if (searchInput) {
            // Debounce logic simulation
            searchInput.addEventListener('input', (e) => {
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => this.handleSearch(e), 500);
            });
        }

        const regionSelect = document.getElementById('da-region');
        if (regionSelect) {
            regionSelect.addEventListener('change', (e) => this.handleFilterRegion(e));
        }

        const commitBtn = document.getElementById('da-commit-btn');
        if (commitBtn && state.selectedDestinations.length >= 2) {
            commitBtn.addEventListener('click', () => dashboardInstance.commitItinerary());
        }

        const resetBtn = document.getElementById('da-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                dashboardInstance.store.setState({ selectedDestinations: [], itinerary: null, currentView: 'planner' });
            });
        }

        // Connect toggle lists
        document.querySelectorAll('.btn-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (state.selectedDestinations.includes(id)) {
                    dashboardInstance.removeDestinationFromItinerary(id);
                } else {
                    dashboardInstance.addDestinationToItinerary(id);
                }
            });
        });

        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                dashboardInstance.openVirtualTour(id);
            });
        });
    }
}
