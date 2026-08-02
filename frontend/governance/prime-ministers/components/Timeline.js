import { PMCard } from './PMCard.js';

export function Timeline(pmList) {
    if (!pmList || pmList.length === 0) {
        return `
            <div class="no-results-card">
                <div class="no-results-icon">🔍</div>
                <h3>No Prime Ministers Found</h3>
                <p>We couldn't find any match for your current search or political party filter criteria.</p>
                <button id="btn-reset-filters" class="btn-reset">Reset All Filters</button>
            </div>
        `;
    }

    const cardsHtml = pmList.map((pm, index) => PMCard(pm, index)).join('');

    return `
        <div class="timeline-container">
            <div class="timeline-line"></div>
            ${cardsHtml}
        </div>
    `;
}
