/**
 * Virtual Tour Viewer Component
 * A robust modal orchestration for simulating interactive 3D environments
 * and detailed metrics for the specified cultural location.
 */
import { dashboardInstance } from './DashboardService.js';

export class VirtualTourViewer {
    constructor(containerElement) {
        this.container = containerElement;
        this.unsubscribe = dashboardInstance.store.subscribe((state) => this.render(state));
        // Initial silent render to setup DOM structure
        this.render(dashboardInstance.store.getState());
    }

    destroy() {
        this.unsubscribe();
    }

    render(state) {
        if (!state.activeTourSite) {
            this.container.innerHTML = `<div id="da-viewer-portal" class="da-viewer-modal"></div>`;
            return;
        }

        const site = state.activeTourSite;

        // Simulate complex internal dashboard for the location
        this.container.innerHTML = `
      <div id="da-viewer-portal" class="da-viewer-modal active">
        <div class="da-viewer-content glass-panel" style="display:flex; flex-direction:column;">
          <button class="close-viewer-btn" id="close-tour">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div style="flex:1; display:flex; flex-direction:column; gap:1.5rem;">
            <div style="border-bottom: 1px solid var(--da-border); padding-bottom:1rem;">
              <h2 style="margin:0 0 0.5rem 0; font-size:1.8rem; color:var(--da-primary-color);">${site.name} Virtual Data Room</h2>
              <div style="display:flex; gap:1rem;">
                <span class="da-badge">Lat: ${site.lat}</span>
                <span class="da-badge">Lng: ${site.lng}</span>
                <span class="da-badge">Popularity Index: ${site.popularity}%</span>
                <span class="da-badge">${site.region} India</span>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 2fr 1fr; gap: 2rem; flex:1;">
              <div style="background:rgba(0,0,0,0.4); border-radius:12px; border:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; flex-direction:column; gap:1rem;">
                <!-- Simulated 3D Space -->
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--da-primary-color)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.6;"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="15" x2="12" y2="22"></line><line x1="2" y1="12" x2="9" y2="12"></line><line x1="15" y1="12" x2="22" y2="12"></line></svg>
                <p style="color:var(--da-text-medium); font-size:1rem; margin:0;">Enterprise 3D Module Offline</p>
                <p style="color:var(--da-text-medium); font-size:0.8rem; text-align:center; max-width:80%;">High-resolution immersive mapping logic would dynamically load here via WebGL/Canvas integration.</p>
              </div>

              <div style="display:flex; flex-direction:column; gap:1rem;">
                <div class="glass-panel" style="padding:1rem;">
                  <h4 style="margin:0 0 0.5rem 0; color:white;">Historic Context</h4>
                  <p style="margin:0; font-size:0.9rem; color:var(--da-text-medium); line-height:1.5;">${site.description}. Extensively preserved to maintain architectural integrity, meeting national heritage standards.</p>
                </div>

                <div class="glass-panel" style="padding:1rem; flex:1;">
                  <h4 style="margin:0 0 0.5rem 0; color:white;">AI Forecasting Metrics</h4>
                  <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem; color:var(--da-text-medium); display:flex; flex-direction:column; gap:0.5rem;">
                    <li style="display:flex; justify-content:space-between;"><span>Expected Footfall Today:</span> <strong style="color:white;">~12,450</strong></li>
                    <li style="display:flex; justify-content:space-between;"><span>Optimal Visit Time:</span> <strong style="color:white;">08:00 AM AST</strong></li>
                    <li style="display:flex; justify-content:space-between;"><span>Weather Index:</span> <strong style="color:white;">Favorable</strong></li>
                    <li style="display:flex; justify-content:space-between;"><span>Security Level:</span> <strong style="color:var(--da-primary-color);">Alpha-Secure</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

        setTimeout(() => {
            const closeBtn = document.getElementById('close-tour');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => dashboardInstance.closeVirtualTour());
            }
        }, 0);
    }
}
