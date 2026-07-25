import { primeMinisters } from './data.js';
import { Timeline } from './components/Timeline.js';
import { SearchBar } from './components/SearchBar.js';
import { PartyFilter } from './components/PartyFilter.js';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('pm-timeline-app');
    
    // Extract unique parties for the filter dropdown
    const uniqueParties = [...new Set(primeMinisters.map(pm => pm.party))].sort();

    // Render static controls (Search and Filter)
    const controlsHtml = `
        <div class="controls-wrapper">
            ${SearchBar()}
            ${PartyFilter(uniqueParties)}
        </div>
        <div id="timeline-root"></div>
    `;
    appContainer.innerHTML = controlsHtml;

    const timelineRoot = document.getElementById('timeline-root');
    const searchInput = document.getElementById('pm-search');
    const partySelect = document.getElementById('party-filter');

    // Function to render the timeline based on filtered data
    function render(data) {
        // Simple fade out/in effect
        timelineRoot.style.opacity = '0';
        setTimeout(() => {
            timelineRoot.innerHTML = Timeline(data);
            timelineRoot.style.opacity = '1';
        }, 150);
    }

    // Function to apply filters
    function applyFilters() {
        const query = searchInput.value.toLowerCase();
        const selectedParty = partySelect.value;

        const filtered = primeMinisters.filter(pm => {
            const matchesSearch = pm.name.toLowerCase().includes(query);
            const matchesParty = selectedParty === 'All' || pm.party === selectedParty;
            return matchesSearch && matchesParty;
        });

        render(filtered);
    }

    // Event Listeners for interactive filtering
    searchInput.addEventListener('input', applyFilters);
    partySelect.addEventListener('change', applyFilters);

    // Initial render
    render(primeMinisters);
});
