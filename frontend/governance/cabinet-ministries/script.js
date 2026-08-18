import { ministries, categories } from './data.js';
import { MinistryGrid } from './components/MinistryGrid.js';
import { SearchBar } from './components/SearchBar.js';
import { CategoryFilter } from './components/CategoryFilter.js';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('cabinet-ministries-app');

    const controlsHtml = `
        <div class="controls-wrapper">
            ${SearchBar()}
            ${CategoryFilter(categories)}
        </div>
        <div id="grid-root"></div>
    `;
    appContainer.innerHTML = controlsHtml;

    const gridRoot = document.getElementById('grid-root');
    const searchInput = document.getElementById('ministry-search');
    const categorySelect = document.getElementById('category-filter');

    function render(data) {
        gridRoot.style.opacity = '0';
        setTimeout(() => {
            gridRoot.innerHTML = MinistryGrid(data);
            attachExpandListeners();
            gridRoot.style.opacity = '1';
        }, 150);
    }

    function applyFilters() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        const filtered = ministries.filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(query) ||
                                  m.shortName.toLowerCase().includes(query) ||
                                  m.minister.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        render(filtered);
    }

    function attachExpandListeners() {
        document.querySelectorAll('.ministry-expand-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                const detailPanel = document.getElementById(`ministry-detail-${index}`);
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';

                if (isExpanded) {
                    detailPanel.hidden = true;
                    btn.setAttribute('aria-expanded', 'false');
                    btn.querySelector('span').textContent = 'View Details';
                    btn.classList.remove('expanded');
                } else {
                    detailPanel.hidden = false;
                    btn.setAttribute('aria-expanded', 'true');
                    btn.querySelector('span').textContent = 'Hide Details';
                    btn.classList.add('expanded');
                }
            });
        });
    }

    searchInput.addEventListener('input', applyFilters);
    categorySelect.addEventListener('change', applyFilters);

    render(ministries);
});
