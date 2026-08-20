/* ==========================================================================
   Travel Itinerary Planner Logic
   STRICTLY uses document.createElement() for all dynamic rendering.
   NO innerHTML string concatenation is used.
   ========================================================================== */
(function () {
    'use strict';

    let selectedStates = [];

    /**
     * Initialize the planner when DOM is ready.
     */
    function init() {
        renderStateSelector();
        attachEventListeners();
        setupThemeToggle();
        setupJourneyIntegration();
    }

    /**
     * Render the state selection grid using safe DOM APIs.
     */
    function renderStateSelector() {
        const grid = document.getElementById('state-grid');
        if (!grid) return;

        // Clear existing content safely
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        const fragment = document.createDocumentFragment();

        statesData.forEach(state => {
            const label = document.createElement('label');
            label.className = 'state-card';
            label.setAttribute('for', `state-${state.id}`);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `state-${state.id}`;
            checkbox.value = state.id;
            checkbox.setAttribute('aria-label', `Select ${state.name}`);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'state-info';

            const nameP = document.createElement('p');
            nameP.className = 'state-name';
            nameP.textContent = state.name;

            const regionP = document.createElement('p');
            regionP.className = 'state-region';
            regionP.textContent = state.region;

            const tagsP = document.createElement('p');
            tagsP.className = 'state-tags';
            tagsP.textContent = state.tags;

            infoDiv.appendChild(nameP);
            infoDiv.appendChild(regionP);
            infoDiv.appendChild(tagsP);

            label.appendChild(checkbox);
            label.appendChild(infoDiv);

            // Handle visual selection state
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    label.classList.add('selected');
                } else {
                    label.classList.remove('selected');
                }
            });

            fragment.appendChild(label);
        });

        grid.appendChild(fragment);
    }

    /**
     * Attach event listeners to buttons.
     */
    function attachEventListeners() {
        const btnGenerate = document.getElementById('btn-generate');
        const btnClear = document.getElementById('btn-clear');
        const btnPrint = document.getElementById('btn-print');
        const btnCopy = document.getElementById('btn-copy');

        if (btnGenerate) btnGenerate.addEventListener('click', generateItinerary);
        if (btnClear) btnClear.addEventListener('click', clearSelection);
        if (btnPrint) btnPrint.addEventListener('click', () => window.print());
        if (btnCopy) btnCopy.addEventListener('click', copySummary);
    }

    /**
     * Clear all selected states and reset the UI.
     */
    function clearSelection() {
        const checkboxes = document.querySelectorAll('.state-card input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.checked = false;
            cb.closest('.state-card').classList.remove('selected');
        });
        selectedStates = [];

        document.getElementById('itinerary-content').hidden = true;
        document.getElementById('empty-state').hidden = false;
    }

    /**
     * Generate the itinerary based on selected states.
     * Optimizes travel flow by grouping nearby states.
     */
    function generateItinerary() {
        const checkboxes = document.querySelectorAll('.state-card input[type="checkbox"]:checked');
        const selectedIds = Array.from(checkboxes).map(cb => cb.value);

        if (selectedIds.length === 0) {
            alert('Please select at least one state to generate your itinerary.');
            return;
        }

        // Optimize order: group by region for logical travel flow
        const optimizedIds = optimizeTravelFlow(selectedIds);
        const selectedData = optimizedIds.map(id => statesData.find(s => s.id === id));

        renderItinerary(selectedData);
    }

    /**
     * Optimize travel flow by grouping states from the same region together.
     * @param {Array<string>} ids - Array of selected state IDs.
     * @returns {Array<string>} Optimized array of state IDs.
     */
    function optimizeTravelFlow(ids) {
        const optimized = [];
        const usedIds = new Set();

        // Iterate through region groups to keep nearby states together
        Object.values(stateRegions).forEach(regionStates => {
            regionStates.forEach(id => {
                if (ids.includes(id) && !usedIds.has(id)) {
                    optimized.push(id);
                    usedIds.add(id);
                }
            });
        });

        // Add any remaining states not in the predefined regions
        ids.forEach(id => {
            if (!usedIds.has(id)) {
                optimized.push(id);
            }
        });

        return optimized;
    }

    /**
     * Render the complete itinerary using safe DOM APIs.
     * @param {Array<Object>} states - Array of state data objects.
     */
    function renderItinerary(states) {
        const emptyState = document.getElementById('empty-state');
        const content = document.getElementById('itinerary-content');
        const statsContainer = document.getElementById('summary-stats');
        const dailyContainer = document.getElementById('daily-itinerary');
        const foodGrid = document.getElementById('food-grid');

        if (!content || !statsContainer || !dailyContainer || !foodGrid) return;

        // Clear existing content safely
        while (statsContainer.firstChild) statsContainer.removeChild(statsContainer.firstChild);
        while (dailyContainer.firstChild) dailyContainer.removeChild(dailyContainer.firstChild);
        while (foodGrid.firstChild) foodGrid.removeChild(foodGrid.firstChild);

        emptyState.hidden = true;
        content.hidden = false;

        // Calculate totals
        let totalDays = 0;
        let totalAttractions = 0;
        const uniqueFoods = new Set();

        states.forEach(state => {
            totalDays += state.suggestedDays;
            totalAttractions += state.attractions.length;
            state.foods.forEach(f => uniqueFoods.add(f.name));
        });

        // Render Summary Stats
        renderStats(statsContainer, states.length, totalDays, totalAttractions, uniqueFoods.size);

        // Render Daily Itinerary Cards
        let currentDay = 1;
        states.forEach(state => {
            renderDayCard(dailyContainer, state, currentDay);
            currentDay += state.suggestedDays;
        });

        // Render Food Explorer
        renderFoodExplorer(foodGrid, states);

        // Scroll to top of itinerary
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Render summary statistics boxes.
     */
    function renderStats(container, stateCount, days, attractions, foods) {
        const stats = [
            { value: stateCount, label: 'States' },
            { value: `${days} Days`, label: 'Duration' },
            { value: attractions, label: 'Attractions' },
            { value: foods, label: 'Food Experiences' }
        ];

        const fragment = document.createDocumentFragment();

        stats.forEach(stat => {
            const box = document.createElement('div');
            box.className = 'stat-box';

            const val = document.createElement('div');
            val.className = 'stat-value';
            val.textContent = stat.value;

            const lbl = document.createElement('div');
            lbl.className = 'stat-label';
            lbl.textContent = stat.label;

            box.appendChild(val);
            box.appendChild(lbl);
            fragment.appendChild(box);
        });

        container.appendChild(fragment);
    }

    /**
     * Render a single day/state itinerary card.
     */
    function renderDayCard(container, state, startDay) {
        const card = document.createElement('article');
        card.className = 'day-card';

        // Header
        const header = document.createElement('div');
        header.className = 'day-header';

        const num = document.createElement('div');
        num.className = 'day-number';
        num.textContent = `Day ${startDay}–${startDay + state.suggestedDays - 1}`;

        const st = document.createElement('div');
        st.className = 'day-state';
        st.textContent = state.name;

        header.appendChild(num);
        header.appendChild(st);
        card.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.className = 'day-body';

        // Must Visit Section
        const sightsSec = document.createElement('div');
        sightsSec.className = 'day-section';
        const sightsH = document.createElement('h4');
        sightsH.textContent = 'Must Visit';
        sightsSec.appendChild(sightsH);
        const sightsUl = document.createElement('ul');
        state.attractions.forEach(a => {
            const li = document.createElement('li');
            li.textContent = a;
            sightsUl.appendChild(li);
        });
        sightsSec.appendChild(sightsUl);
        body.appendChild(sightsSec);

        // Foods Section
        const foodSec = document.createElement('div');
        foodSec.className = 'day-section';
        const foodH = document.createElement('h4');
        foodH.textContent = 'Foods to Try';
        foodSec.appendChild(foodH);
        const foodUl = document.createElement('ul');
        state.foods.forEach(f => {
            const li = document.createElement('li');
            li.textContent = f.name;
            foodUl.appendChild(li);
        });
        foodSec.appendChild(foodUl);
        body.appendChild(foodSec);

        // Experience Section
        const expSec = document.createElement('div');
        expSec.className = 'day-section';
        const expH = document.createElement('h4');
        expH.textContent = 'Cultural Experience';
        expSec.appendChild(expH);
        const expUl = document.createElement('ul');
        state.experiences.forEach(e => {
            const li = document.createElement('li');
            li.textContent = e;
            expUl.appendChild(li);
        });
        expSec.appendChild(expUl);
        body.appendChild(expSec);

        // Travel Tip
        const tipDiv = document.createElement('div');
        tipDiv.className = 'travel-tip';
        const tipStrong = document.createElement('strong');
        tipStrong.textContent = '💡 Travel Tip';
        const tipText = document.createTextNode(state.tip);
        tipDiv.appendChild(tipStrong);
        tipDiv.appendChild(tipText);
        body.appendChild(tipDiv);

        card.appendChild(body);
        container.appendChild(card);
    }

    /**
     * Render the food explorer section, deduplicating foods.
     */
    function renderFoodExplorer(container, states) {
        const fragment = document.createDocumentFragment();
        const seenFoods = new Set();

        states.forEach(state => {
            state.foods.forEach(food => {
                if (!seenFoods.has(food.name)) {
                    seenFoods.add(food.name);

                    const card = document.createElement('div');
                    card.className = 'food-card';

                    const icon = document.createElement('div');
                    icon.className = 'food-icon';
                    icon.textContent = food.icon;

                    const name = document.createElement('h4');
                    name.className = 'food-name';
                    name.textContent = food.name;

                    const meta = document.createElement('div');
                    meta.className = 'food-meta';

                    const st = document.createElement('span');
                    st.className = 'food-state';
                    st.textContent = state.name;

                    const cat = document.createElement('span');
                    cat.textContent = food.category;

                    meta.appendChild(st);
                    meta.appendChild(cat);

                    card.appendChild(icon);
                    card.appendChild(name);
                    card.appendChild(meta);
                    fragment.appendChild(card);
                }
            });
        });

        container.appendChild(fragment);
    }

    /**
     * Copy itinerary summary to clipboard.
     */
    function copySummary() {
        const cards = document.querySelectorAll('.day-card');
        let summary = "MY INCREDIBLE INDIA ITINERARY\n";
        summary += "==============================\n\n";

        cards.forEach(card => {
            const day = card.querySelector('.day-number').textContent;
            const state = card.querySelector('.day-state').textContent;
            summary += `${day} - ${state}\n`;

            const sections = card.querySelectorAll('.day-section');
            sections.forEach(sec => {
                const title = sec.querySelector('h4').textContent;
                const items = Array.from(sec.querySelectorAll('li')).map(li => li.textContent).join(', ');
                if (items) summary += `${title}: ${items}\n`;
            });

            const tip = card.querySelector('.travel-tip');
            if (tip) summary += `Tip: ${tip.textContent.replace('💡 Travel Tip', '').trim()}\n`;
            summary += "\n";
        });

        navigator.clipboard.writeText(summary).then(() => {
            const btn = document.getElementById('btn-copy');
            const originalText = btn.textContent;
            btn.textContent = '✅ Copied!';
            setTimeout(() => { btn.textContent = originalText; }, 2000);
        }).catch(() => {
            alert('Failed to copy to clipboard. Please try again.');
        });
    }

    /**
     * Setup theme toggle functionality.
     */
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

    /**
     * Integrate with Journey API for global search.
     */
    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/itinerary-planner/index.html', [
                {
                    id: 'tool-itinerary-planner',
                    title: 'Travel Itinerary Planner',
                    description: 'Generate personalized multi-state travel itineraries across India.',
                    link: '#'
                }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
