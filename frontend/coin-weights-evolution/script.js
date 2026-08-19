/* ==========================================================================
   Coin Weights Evolution Logic
   Handles visual scale rendering, comparison tool, and dynamic sizing.
   ========================================================================== */
(function () {
    'use strict';

    // Max weight for scale calculation (e.g., 12 grams = 100% width)
    const MAX_SCALE_WEIGHT = 12.0;

    function init() {
        renderScaleBars();
        populateComparisonSelects();
        attachEventListeners();
        setupThemeToggle();
    }

    /**
     * Render the horizontal bar chart showing relative coin weights.
     */
    function renderScaleBars() {
        const container = document.getElementById('scale-bars');
        if (!container) return;

        const fragment = document.createDocumentFragment();

        coinWeightsData.forEach(coin => {
            const row = document.createElement('div');
            row.className = 'scale-bar-row animate-on-scroll';

            const label = document.createElement('div');
            label.className = 'bar-label';

            const h4 = document.createElement('h4');
            h4.textContent = coin.name;

            const p = document.createElement('p');
            p.textContent = `${coin.period} • ${coin.metal}`;

            label.appendChild(h4);
            label.appendChild(p);

            const track = document.createElement('div');
            track.className = 'bar-track';

            const fill = document.createElement('div');
            fill.className = `bar-fill ${coin.metal.toLowerCase()}`;
            // Calculate width percentage based on max scale
            const widthPct = Math.min((coin.weight / MAX_SCALE_WEIGHT) * 100, 100);
            fill.style.width = '0%'; // Start at 0 for animation
            fill.textContent = `${coin.weight}g`;

            track.appendChild(fill);
            row.appendChild(label);
            row.appendChild(track);
            fragment.appendChild(row);

            // Animate width after append
            setTimeout(() => {
                fill.style.width = `${widthPct}%`;
            }, 100);
        });

        container.appendChild(fragment);

        // Setup scroll observer for animation
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            container.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
        }
    }

    /**
     * Populate the A/B comparison dropdowns.
     */
    function populateComparisonSelects() {
        const selectA = document.getElementById('select-a');
        const selectB = document.getElementById('select-b');
        if (!selectA || !selectB) return;

        let optionsHtml = '<option value="">Select a Coin</option>';
        coinWeightsData.forEach(coin => {
            optionsHtml += `<option value="${coin.id}">${coin.name} (${coin.weight}g)</option>`;
        });

        selectA.innerHTML = optionsHtml;
        selectB.innerHTML = optionsHtml;
    }

    /**
     * Render the visual and details for a comparison slot.
     */
    function renderSlot(slotId, coinId) {
        const visual = document.getElementById(`visual-${slotId}`);
        const details = document.getElementById(`details-${slotId}`);
        if (!visual || !details) return;

        if (!coinId) {
            visual.className = 'slot-visual';
            visual.textContent = '?';
            visual.style.width = '150px';
            visual.style.height = '150px';
            details.innerHTML = '<p>Select a coin to view its historical weight and context.</p>';
            updateDiffIndicator();
            return;
        }

        const coin = coinWeightsData.find(c => c.id === coinId);

        // Update Visual (Size proportional to weight)
        visual.className = `slot-visual ${coin.metal.toLowerCase()}`;
        // Base size 100px, scale up based on weight (max ~150px for 11.66g)
        const size = 80 + (coin.weight * 6);
        visual.style.width = `${size}px`;
        visual.style.height = `${size}px`;
        visual.textContent = `${coin.weight}g`;

        // Update Details
        details.innerHTML = `
            <strong>Dynasty / Period</strong>
            ${coin.dynasty} (${coin.period})
            <strong>Region</strong>
            ${coin.region}
            <div class="weight-val">${coin.weight} grams ${coin.uncertainty}</div>
            <strong>Historical Context</strong>
            ${coin.desc}
            <strong>Evidence</strong>
            ${coin.evidence}
        `;

        updateDiffIndicator();
    }

    /**
     * Calculate and display the weight difference between Coin A and Coin B.
     */
    function updateDiffIndicator() {
        const selectA = document.getElementById('select-a');
        const selectB = document.getElementById('select-b');
        const indicator = document.getElementById('diff-indicator');
        if (!selectA || !selectB || !indicator) return;

        const coinA = coinWeightsData.find(c => c.id === selectA.value);
        const coinB = coinWeightsData.find(c => c.id === selectB.value);

        if (!coinA || !coinB) {
            indicator.textContent = 'Select Both';
            return;
        }

        const diff = Math.abs(coinA.weight - coinB.weight).toFixed(2);
        const pct = ((Math.max(coinA.weight, coinB.weight) / Math.min(coinA.weight, coinB.weight)) * 100 - 100).toFixed(0);

        indicator.innerHTML = `Diff: ${diff}g<br><span style="font-size:0.8rem; color:var(--text-secondary)">${pct}% heavier</span>`;
    }

    function attachEventListeners() {
        document.getElementById('select-a').addEventListener('change', (e) => renderSlot('a', e.target.value));
        document.getElementById('select-b').addEventListener('change', (e) => renderSlot('b', e.target.value));
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
