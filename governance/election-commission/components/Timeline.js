import { CommissionerCard } from './CommissionerCard.js';

export function Timeline(cecs) {
    if (cecs.length === 0) {
        return `<div class="no-results">No Commissioners found matching your criteria.</div>`;
    }
    
    // Separate the dots navigation from the cards grid
    const dotsHtml = cecs.map(cec => `
        <div class="timeline-nav-item" data-target="cec-${cec.originalIndex}" title="${cec.name} (${cec.appointmentDate.split(' ').pop()})">
            <div class="timeline-dot"></div>
            <div class="timeline-year-label">${cec.appointmentDate.split(' ').pop()}</div>
        </div>
    `).join('');

    const cardsHtml = cecs.map(cec => `
        <div class="card-wrapper">
            ${CommissionerCard(cec, cec.originalIndex)}
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
