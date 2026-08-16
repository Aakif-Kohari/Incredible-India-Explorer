export function BattleMap(battles, eraInfo) {
    const markersHtml = battles.map((battle, i) => {
        const era = eraInfo[battle.era] || { color: '#888' };
        return `
            <div class="map-marker" data-index="${i}"
                 style="top: ${battle.coordinates.top}; left: ${battle.coordinates.left}; background: ${era.color}"
                 title="${battle.name}" aria-label="${battle.name}">
                <span class="marker-label">${battle.name.split('(')[0].trim()}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="battle-map-container">
            <div class="india-map">
                <div class="map-outline">
                    <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" class="india-svg">
                        <path d="M120,20 L180,10 L220,15 L260,30 L280,20 L310,35 L320,60 L310,90 L330,110 L320,140 L300,160 L310,180 L290,200 L280,220 L300,240 L290,270 L270,280 L280,300 L260,320 L250,350 L230,370 L210,390 L190,400 L170,390 L150,400 L130,380 L120,360 L100,350 L80,330 L60,300 L50,270 L40,240 L50,210 L60,180 L70,160 L50,140 L60,120 L80,100 L90,80 L100,60 L110,40 Z"
                              fill="none" stroke="var(--border-color, #ddd)" stroke-width="2" opacity="0.6"/>
                        <text x="200" y="250" text-anchor="middle" fill="var(--text-secondary, #999)" font-size="14" font-weight="600" opacity="0.4">INDIA</text>
                    </svg>
                </div>
                <div class="map-markers">
                    ${markersHtml}
                </div>
            </div>
            <div class="map-legend">
                <h4>Battle Locations</h4>
                <p class="map-instruction">Click a marker to view battle details</p>
                <div class="legend-items">
                    ${Object.entries(eraInfo).map(([key, val]) => `
                        <div class="legend-item">
                            <span class="legend-dot" style="background: ${val.color}"></span>
                            <span>${val.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
