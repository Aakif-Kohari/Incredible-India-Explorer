/**
 * Vada Pav Explorer — Interactive Logic
 * Handles dynamic rendering, keyboard accessibility, and state management for Mumbai Street-Food Explorer.
 */

document.addEventListener('DOMContentLoaded', () => {
    initQuickFacts();
    initIngredients();
    initPreparationSteps();
    initStreetCulture();
    initVariations();
    initStreetFoodExplorer();
    initSources();
});

function initQuickFacts() {
    const list = document.getElementById('vp-facts-list');
    if (!list || typeof VADA_PAV_DATA === 'undefined') return;

    const facts = [
        { label: 'Origin Year', val: VADA_PAV_DATA.quickFacts.originYear },
        { label: 'Creator', val: VADA_PAV_DATA.quickFacts.creator },
        { label: 'Original Location', val: VADA_PAV_DATA.quickFacts.originLocation },
        { label: 'Cultural Significance', val: VADA_PAV_DATA.quickFacts.culturalTag },
        { label: 'Average Price', val: VADA_PAV_DATA.quickFacts.priceRange },
        { label: 'Core Components', val: VADA_PAV_DATA.quickFacts.keyComponents }
    ];

    list.innerHTML = facts.map(f => `
        <li class="vp-fact-item">
            <span class="vp-fact-label">${f.label}</span>
            <span class="vp-fact-val">${f.val}</span>
        </li>
    `).join('');
}

function initIngredients() {
    const container = document.getElementById('vp-ingredients-container');
    if (!container || typeof VADA_PAV_DATA === 'undefined') return;

    container.innerHTML = VADA_PAV_DATA.ingredients.map(ing => `
        <article class="vp-ingredient-card">
            <span class="vp-ingredient-icon" role="img" aria-label="${ing.name}">${ing.icon}</span>
            <h3 class="vp-ingredient-name">${ing.name}</h3>
            <span class="vp-ingredient-role">${ing.role}</span>
            <p class="vp-ingredient-desc">${ing.desc}</p>
        </article>
    `).join('');
}

function initPreparationSteps() {
    const container = document.getElementById('vp-prep-container');
    if (!container || typeof VADA_PAV_DATA === 'undefined') return;

    container.innerHTML = VADA_PAV_DATA.preparationSteps.map(step => `
        <div class="vp-prep-step">
            <div class="vp-step-num" aria-hidden="true">${step.stepNumber}</div>
            <div class="vp-step-content">
                <h3>Step ${step.stepNumber}: ${step.title}</h3>
                <p>${step.desc}</p>
            </div>
        </div>
    `).join('');
}

function initStreetCulture() {
    const container = document.getElementById('vp-culture-container');
    if (!container || typeof VADA_PAV_DATA === 'undefined') return;

    container.innerHTML = VADA_PAV_DATA.streetCulture.details.map(item => `
        <div class="vp-card">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </div>
    `).join('');
}

function initVariations() {
    const container = document.getElementById('vp-variations-container');
    if (!container || typeof VADA_PAV_DATA === 'undefined') return;

    container.innerHTML = VADA_PAV_DATA.variations.map(varItem => `
        <div class="vp-variation-card">
            <h4>${varItem.name}</h4>
            <span class="vp-variation-tag">${varItem.type}</span>
            <p>${varItem.desc}</p>
        </div>
    `).join('');
}

/* ==========================================================================
   Mumbai Street-Food Explorer Interaction Logic
   ========================================================================== */
let activeFoodId = 'vada-pav';

function initStreetFoodExplorer() {
    const listContainer = document.getElementById('vp-explorer-list');
    if (!listContainer || typeof VADA_PAV_DATA === 'undefined') return;

    // Render list of food selector buttons
    listContainer.innerHTML = VADA_PAV_DATA.explorerItems.map(item => {
        const isSelected = item.id === activeFoodId;
        return `
            <button type="button"
                    class="vp-food-item-btn ${isSelected ? 'active-card' : ''}"
                    data-id="${item.id}"
                    role="tab"
                    aria-selected="${isSelected}"
                    tabindex="${isSelected ? '0' : '-1'}"
                    id="tab-${item.id}"
                    aria-controls="panel-explorer">
                <div>
                    <span class="vp-food-item-title">${item.name}</span>
                    <span class="vp-food-item-sub">${item.region}</span>
                </div>
                <span class="vp-active-indicator" aria-hidden="true">✓</span>
            </button>
        `;
    }).join('');

    // Attach click and keyboard event listeners
    const buttons = listContainer.querySelectorAll('.vp-food-item-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => selectFoodItem(btn.dataset.id));

        btn.addEventListener('keydown', (e) => {
            let targetIndex = null;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                targetIndex = (index + 1) % buttons.length;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                targetIndex = (index - 1 + buttons.length) % buttons.length;
            }

            if (targetIndex !== null) {
                e.preventDefault();
                buttons[targetIndex].focus();
                selectFoodItem(buttons[targetIndex].dataset.id);
            }
        });
    });

    // Initial render of detail panel
    renderExplorerDetail(activeFoodId);
}

function selectFoodItem(foodId) {
    if (!foodId || foodId === activeFoodId) return;

    activeFoodId = foodId;

    const listContainer = document.getElementById('vp-explorer-list');
    const buttons = listContainer.querySelectorAll('.vp-food-item-btn');

    buttons.forEach(btn => {
        const isSelected = btn.dataset.id === foodId;
        btn.classList.toggle('active-card', isSelected);
        btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        btn.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    renderExplorerDetail(foodId);
}

function renderExplorerDetail(foodId) {
    const detailContainer = document.getElementById('vp-explorer-detail-panel');
    if (!detailContainer || typeof VADA_PAV_DATA === 'undefined') return;

    const food = VADA_PAV_DATA.explorerItems.find(item => item.id === foodId) || VADA_PAV_DATA.explorerItems[0];

    detailContainer.innerHTML = `
        <div class="vp-detail-img-wrapper">
            <img src="${food.image}" alt="${food.alt}" class="vp-detail-img" loading="lazy" />
            <span class="vp-detail-region-badge"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${food.region}</span>
        </div>
        <div class="vp-detail-body">
            <h3 class="vp-detail-title">${food.name}</h3>
            <p class="vp-detail-tagline">${food.tagline}</p>
            
            <p class="vp-detail-section-title">Context & Origin</p>
            <p class="vp-detail-text">${food.context}</p>
            
            <p class="vp-detail-section-title">Cultural Connection</p>
            <p class="vp-detail-text">${food.connection}</p>
            
            <p class="vp-detail-section-title">Key Ingredients</p>
            <div class="vp-chip-row">
                ${food.keyIngredients.map(ing => `<span class="vp-chip">${ing}</span>`).join('')}
            </div>
        </div>
    `;
}

function initSources() {
    const container = document.getElementById('vp-sources-container');
    if (!container || typeof VADA_PAV_DATA === 'undefined') return;

    container.innerHTML = VADA_PAV_DATA.sources.map(src => `
        <li class="vp-source-item">
            <a href="${src.url}" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> ${src.title}
            </a>
        </li>
    `).join('');
}
