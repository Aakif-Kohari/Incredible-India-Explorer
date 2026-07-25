import { GovernorCard } from './GovernorCard.js';

export function TimelineItem(gov, index) {
    return `
        <div class="timeline-item" data-target="gov-${index}">
            <div class="timeline-dot"></div>
            <div class="timeline-year-label">${gov.appointmentDate.split(' ').pop()}</div>
            <div class="timeline-content">
                ${GovernorCard(gov, index)}
            </div>
        </div>
    `;
}
