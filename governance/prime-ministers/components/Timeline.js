import { TimelineItem } from './TimelineItem.js';

export function Timeline(pms) {
    if (pms.length === 0) {
        return `<div class="no-results">No Prime Ministers found matching your criteria.</div>`;
    }
    
    const itemsHtml = pms.map((pm, index) => TimelineItem(pm, index)).join('');
    
    return `
        <div class="timeline-container">
            ${itemsHtml}
        </div>
    `;
}
