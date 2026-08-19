export function EquipmentGrid(equipment, filter) {
    const filtered = filter === 'All' ? equipment : equipment.filter(e => e.category === filter);

    if (filtered.length === 0) {
        return `<div class="no-results">No equipment found for this category.</div>`;
    }

    const categories = [...new Set(equipment.map(e => e.category))].sort();

    const filterBtnsHtml = categories.map(c => `
        <button class="equip-filter-btn ${filter === c ? 'active' : ''}" data-filter="${c}">${c}</button>
    `).join('');

    const cardsHtml = filtered.map(item => `
        <div class="equipment-card" data-category="${item.category}">
            <div class="equip-card-top">
                <span class="equip-category-badge" data-service="${item.service}">${item.category}</span>
                <span class="equip-service">${item.service}</span>
            </div>
            <h4 class="equip-name">${item.name}</h4>
            <p class="equip-type">${item.type}</p>
            <p class="equip-origin">Origin: ${item.origin}</p>
            <p class="equip-description">${item.description}</p>
        </div>
    `).join('');

    return `
        <div class="equipment-filter-bar">
            <button class="equip-filter-btn ${filter === 'All' ? 'active' : ''}" data-filter="All">All</button>
            ${filterBtnsHtml}
        </div>
        <div class="equipment-grid">
            ${cardsHtml}
        </div>
    `;
}
