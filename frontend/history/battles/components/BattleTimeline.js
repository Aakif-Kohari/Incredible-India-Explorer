export function BattleTimeline(battles, eraInfo) {
    const sorted = [...battles].sort((a, b) => a.year - b.year);

    const eventsHtml = sorted.map(battle => {
        const era = eraInfo[battle.era] || { label: battle.era, color: '#888' };
        return `
            <div class="timeline-battle-event" data-era="${battle.era}">
                <div class="tl-dot" style="background: ${era.color}"></div>
                <div class="tl-content">
                    <div class="tl-meta">
                        <span class="tl-year">${battle.date}</span>
                        <span class="tl-era-badge" style="background: ${era.color}20; color: ${era.color}">${era.label}</span>
                    </div>
                    <h4 class="tl-battle-name">${battle.name}</h4>
                    <p class="tl-location">${battle.location}</p>
                    <p class="tl-outcome">${battle.outcome}</p>
                </div>
            </div>
        `;
    }).join('');

    return `<div class="battles-timeline">${eventsHtml}</div>`;
}
