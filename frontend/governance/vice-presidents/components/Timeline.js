import { VicePresidentCard } from './VicePresidentCard.js';

export function Timeline(vps) {
    if (vps.length === 0) {
        return `<div class="no-results">No Vice Presidents found matching your criteria.</div>`;
    }
    
    // Separate the dots navigation from the cards grid
    const dotsHtml = vps.map(vp => `
        <div class="timeline-nav-item" data-target="vp-${vp.originalIndex}" title="${vp.name} (${vp.electionYear.substring(0,4)})">
            <div class="timeline-dot"></div>
            <div class="timeline-year-label">${vp.electionYear.substring(0,4)}</div>
        </div>
    `).join('');

    const cardsHtml = vps.map(vp => `
        <div class="card-wrapper">
            ${VicePresidentCard(vp, vp.originalIndex)}
        </div>
    `).join('');
    
    return `
        <div class="timeline-container">
            <div class="timeline-nav-wrapper">
                <div class="timeline-track"></div>
                <div class="timeline-nav">
                    ${dotsHtml}
                </div>
            </div>
            <div class="cards-grid">
                ${cardsHtml}
            </div>
        </div>
    `;
}
