import { MinistryCard } from './MinistryCard.js';

export function MinistryGrid(ministries) {
    if (ministries.length === 0) {
        return `<div class="no-results">No ministries found matching your criteria.</div>`;
    }

    const cardsHtml = ministries.map((m, i) => MinistryCard(m, i)).join('');

    return `
        <div class="ministry-grid">
            ${cardsHtml}
        </div>
    `;
}
