import { vicePresidents } from './data.js';
import { Timeline } from './components/Timeline.js';
import { SearchBar } from './components/SearchBar.js';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('vp-explorer-app');
    
    const indexedVPs = vicePresidents.map((p, i) => ({ ...p, originalIndex: i }));

    const controlsHtml = `
        <div class="controls-wrapper">
            ${SearchBar()}
        </div>
        <div id="timeline-root"></div>
    `;
    appContainer.innerHTML = controlsHtml;

    const timelineRoot = document.getElementById('timeline-root');
    const searchInput = document.getElementById('vp-search');

    function attachScrollListeners() {
        const navItems = document.querySelectorAll('.timeline-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-target');
                const targetCard = document.getElementById(targetId);
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add a highlight class temporarily
                    targetCard.classList.add('highlight');
                    setTimeout(() => targetCard.classList.remove('highlight'), 1500);
                }
            });
        });
    }

    function render(data) {
        timelineRoot.style.opacity = '0';
        setTimeout(() => {
            timelineRoot.innerHTML = Timeline(data);
            attachScrollListeners();
            timelineRoot.style.opacity = '1';
        }, 150);
    }

    function applyFilters() {
        const query = searchInput.value.toLowerCase();

        const filtered = indexedVPs.filter(p => {
            const matchesName = p.name.toLowerCase().includes(query);
            const matchesYear = p.electionYear.includes(query);
            return matchesName || matchesYear;
        });

        render(filtered);
    }

    searchInput.addEventListener('input', applyFilters);

    render(indexedVPs);
});
