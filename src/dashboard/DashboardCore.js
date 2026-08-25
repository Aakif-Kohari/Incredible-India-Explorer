/**
 * DashboardCore entrypoint
 * Injects CSS programmatically, mounts components.
 */

import { ItineraryPlanner } from './ItineraryPlanner.js';
import { VirtualTourViewer } from './VirtualTourViewer.js';
import { dashboardInstance } from './DashboardService.js';

export class EnterpriseDashboardEnv {
    constructor(targetElementId) {
        this.targetId = targetElementId;
    }

    async mount() {
        this._injectStyles();

        const root = document.getElementById(this.targetId);
        if (!root) {
            console.error(`Mount target #${this.targetId} not found.`);
            return;
        }

        // Set wrapper class
        root.className = 'itinerary-dashboard-wrapper';

        // Create mounting points for components
        const plannerContainer = document.createElement('div');
        plannerContainer.id = 'da-planner-mount';
        root.appendChild(plannerContainer);

        const viewerContainer = document.createElement('div');
        viewerContainer.id = 'da-viewer-mount';
        root.appendChild(viewerContainer);

        // Initialize state
        await dashboardInstance.initialize();

        // Instantiate controllers
        this.planner = new ItineraryPlanner(plannerContainer);
        this.viewer = new VirtualTourViewer(viewerContainer);

        console.log("Enterprise Itinerary Dashboard Loaded.");
    }

    unmount() {
        if (this.planner) this.planner.destroy();
        if (this.viewer) this.viewer.destroy();

        const root = document.getElementById(this.targetId);
        if (root) {
            root.innerHTML = '';
            root.className = '';
        }
    }

    _injectStyles() {
        // If not using a bundler that auto-injects CSS, we explicitly link the styles
        if (!document.querySelector('link[href*="dashboard.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/src/styles/dashboard.css'; // Path assuming vite/express serves from root
            document.head.appendChild(link);
        }
    }
}
