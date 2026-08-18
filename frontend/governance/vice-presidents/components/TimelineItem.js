import { VicePresidentCard } from './VicePresidentCard.js';

export function TimelineItem(vp, index) {
    return `
        <div class="timeline-item" data-target="vp-${index}">
            <div class="timeline-dot"></div>
            <div class="timeline-year-label">${vp.electionYear.substring(0,4)}</div>
            <div class="timeline-content">
                ${VicePresidentCard(vp, index)}
            </div>
        </div>
    `;
}
