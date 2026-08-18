import { CommissionerCard } from './CommissionerCard.js';

export function TimelineItem(cec, index) {
    return `
        <div class="timeline-item" data-target="cec-${index}">
            <div class="timeline-dot"></div>
            <div class="timeline-year-label">${cec.appointmentDate.split(' ').pop()}</div>
            <div class="timeline-content">
                ${CommissionerCard(cec, index)}
            </div>
        </div>
    `;
}
