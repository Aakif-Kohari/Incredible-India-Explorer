import { MinistryDetail } from './MinistryDetail.js';

export function MinistryCard(ministry, index) {
    const detailId = `ministry-detail-${index}`;

    return `
        <div class="ministry-card" data-index="${index}">
            <div class="ministry-card-header">
                <div class="ministry-badge">${ministry.shortName}</div>
                <div class="ministry-card-title">
                    <h3>${ministry.name}</h3>
                    <p class="ministry-category">${ministry.category}</p>
                </div>
            </div>
            <div class="ministry-card-body">
                <div class="ministry-minister">
                    <span class="minister-label">Minister</span>
                    <span class="minister-name">${ministry.minister}</span>
                </div>
                <p class="ministry-overview">${ministry.overview}</p>
                <button class="ministry-expand-btn" aria-expanded="false" aria-controls="${detailId}" data-index="${index}">
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 6 8 10 12 6"></polyline>
                    </svg>
                </button>
            </div>
            <div class="ministry-detail-panel" id="${detailId}" hidden>
                ${MinistryDetail(ministry)}
            </div>
        </div>
    `;
}
