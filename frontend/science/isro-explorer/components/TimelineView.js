export function TimelineView(timeline, categories) {
    const eventsHtml = timeline.map(item => {
        const cat = categories[item.type] || { label: item.type, color: '#888' };
        return `
            <div class="timeline-event" data-type="${item.type}">
                <div class="timeline-dot" style="background: ${cat.color}"></div>
                <div class="timeline-content">
                    <div class="timeline-meta">
                        <span class="timeline-year">${item.year}</span>
                        <span class="timeline-cat-badge" style="background: ${cat.color}20; color: ${cat.color}">${cat.label}</span>
                    </div>
                    <p class="timeline-text">${item.event}</p>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="isro-timeline">
            ${eventsHtml}
        </div>
    `;
}
