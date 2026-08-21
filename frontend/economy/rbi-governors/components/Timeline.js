import { GovernorCard } from './GovernorCard.js';

export function Timeline(governors) {
    if (governors.length === 0) {
        return `<div class="no-results">No Governors found matching your criteria.</div>`;
    }
    
    // Separate the dots navigation from the cards grid
    const dotsHtml = governors.map(gov => `
        <div class="timeline-nav-item" data-target="gov-${gov.originalIndex}" title="${gov.name} (${gov.appointmentDate.split(' ').pop()})">
            <div class="timeline-dot"></div>
            <div class="timeline-year-label">${gov.appointmentDate.split(' ').pop()}</div>
        </div>
    `).join('');

    const cardsHtml = governors.map(gov => `
        <div class="card-wrapper">
            ${GovernorCard(gov, gov.originalIndex)}
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
