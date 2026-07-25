import { PMCard } from './PMCard.js';

export function TimelineItem(pm, index) {
    const alignmentClass = index % 2 === 0 ? 'left' : 'right';
    return `
        <div class="timeline-item ${alignmentClass}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                ${PMCard(pm)}
            </div>
        </div>
    `;
}
