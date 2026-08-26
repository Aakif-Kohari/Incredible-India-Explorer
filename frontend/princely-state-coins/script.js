/* ==========================================================================
   Princely State Coins Logic
   Handles map interactions, filtering, coin rendering, and comparison tool.
   ========================================================================== */
(function () {
    'use strict';

    let activeRegion = 'all';
    let activeStateId = null;
    let searchTerm = '';

    function init() {
        renderCoins();
        populateComparisonSelects();
        attachEventListeners();
        setupThemeToggle();
    }

    /**
     * Render coin cards based on active filters.
     */
    function renderCoins() {
        const grid = document.getElementById('coins-grid');
        const stateName = document.getElementById('selected-state-name');
        const stateDesc = document.getElementById('selected-state-desc');
        if (!grid) return;

        grid.innerHTML = '';

        let filteredStates = princelyStatesData;

        // Apply Region Filter
        if (activeRegion !== 'all') {
            filteredStates = filteredStates.filter(s => s.region === activeRegion);
        }

        // Apply State Selection
        if (activeStateId) {
            filteredStates = filteredStates.filter(s => s.id === activeStateId);
        }

        // Apply Search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredStates = filteredStates.filter(s =>
                s.name.toLowerCase().includes(term) ||
                s.ruler.toLowerCase().includes(term)
            );
        }

        if (filteredStates.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No coins found matching your criteria.</p>';
            return;
        }

        // Update Header
        if (activeStateId) {
            const state = filteredStates[0];
            stateName.textContent = state.name;
            stateDesc.textContent = `Ruled by ${state.ruler} (${state.period}). ${state.desc}`;
        } else {
            stateName.textContent = 'All Princely States';
            stateDesc.textContent = 'Select a state from the map or use the filters to explore their unique coinage.';
        }

        const fragment = document.createDocumentFragment();

        filteredStates.forEach(state => {
            state.coins.forEach(coin => {
                const card = document.createElement('article');
                card.className = 'coin-card animate-on-scroll';
                card.setAttribute('role', 'listitem');

                const img = document.createElement('div');
                img.className = 'coin-img';
                img.textContent = coin.metal === 'Gold' ? '🪙' : '🪙'; // Using emoji for placeholder
                img.style.color = coin.metal === 'Gold' ? '#D4AF37' : '#C0C0C0';

                const content = document.createElement('div');
                content.className = 'coin-content';

                const h3 = document.createElement('h3');
                h3.textContent = coin.name;

                const meta = document.createElement('div');
                meta.className = 'coin-meta';
                meta.innerHTML = `
                    <div class="meta-item"><span class="meta-label">State</span><span class="meta-value">${state.name}</span></div>
                    <div class="meta-item"><span class="meta-label">Metal</span><span class="meta-value">${coin.metal}</span></div>
                    <div class="meta-item"><span class="meta-label">Script</span><span class="meta-value">${coin.script}</span></div>
                    <div class="meta-item"><span class="meta-label">Mint</span><span class="meta-value">${coin.mint}</span></div>
                    <div class="meta-item"><span class="meta-label">Symbols</span><span class="meta-value">${coin.symbols}</span></div>
                    <div class="meta-item"><span class="meta-label">Period</span><span class="meta-value">${coin.year}</span></div>
                `;

                content.appendChild(h3);
                content.appendChild(meta);
                card.appendChild(img);
                card.appendChild(content);
                fragment.appendChild(card);
            });
        });

        grid.appendChild(fragment);
    }

    /**
     * Populate the comparison dropdowns.
     */
    function populateComparisonSelects() {
        const selectA = document.getElementById('select-a');
        const selectB = document.getElementById('select-b');
        if (!selectA || !selectB) return;

        let optionsHtml = '<option value="">Select a Coin</option>';
        princelyStatesData.forEach(state => {
            state.coins.forEach(coin => {
                optionsHtml += `<option value="${state.id}-${coin.name}">${coin.name} (${state.name})</option>`;
            });
        });

        selectA.innerHTML = optionsHtml;
        selectB.innerHTML = optionsHtml;
    }

    /**
     * Render comparison details when selection changes.
     */
    function renderComparisonDetails(slotId, selectVal) {
        const detailsEl = document.getElementById(`details-${slotId}`);
        if (!detailsEl) return;

        if (!selectVal) {
            detailsEl.innerHTML = '<p>Select a coin to view details.</p>';
            return;
        }

        const [stateId, coinName] = selectVal.split('-');
        const state = princelyStatesData.find(s => s.id === stateId);
        const coin = state.coins.find(c => c.name === coinName);

        detailsEl.innerHTML = `
            <strong>Ruler:</strong> ${state.ruler}<br>
            <strong>Metal:</strong> ${coin.metal}<br>
            <strong>Denomination:</strong> ${coin.denomination}<br>
            <strong>Script:</strong> ${coin.script}<br>
            <strong>Symbols:</strong> ${coin.symbols}<br>
            <strong>Mint:</strong> ${coin.mint}<br>
            <strong>Approx Year:</strong> ${coin.year}
        `;
    }

    function attachEventListeners() {
        // Region Filters
        document.querySelectorAll('.region-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.region-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                activeRegion = btn.dataset.region;
                activeStateId = null; // Clear state selection when changing region
                document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
                renderCoins();
            });
        });

        // Map Pins
        document.querySelectorAll('.map-pin').forEach(pin => {
            pin.addEventListener('click', () => {
                document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
                pin.classList.add('active');
                activeStateId = pin.dataset.state;
                renderCoins();
                document.getElementById('coins').scrollIntoView({ behavior: 'smooth' });
            });
            pin.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pin.click();
                }
            });
        });

        // Search
        document.getElementById('state-search').addEventListener('input', debounce((e) => {
            searchTerm = e.target.value;
            activeStateId = null;
            renderCoins();
        }, 300));

        // Comparison
        document.getElementById('select-a').addEventListener('change', (e) => renderComparisonDetails('a', e.target.value));
        document.getElementById('select-b').addEventListener('change', (e) => renderComparisonDetails('b', e.target.value));
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.textContent = isLight ? '☀️' : '🌙';
        });
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.textContent = '☀️';
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
