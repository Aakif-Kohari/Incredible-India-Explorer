export function BattleCard(battle, eraInfo, index) {
    const era = eraInfo[battle.era] || { label: battle.era, color: '#888' };

    return `
        <div class="battle-card" data-era="${battle.era}" data-index="${index}">
            <div class="battle-card-header" style="border-left: 4px solid ${era.color}">
                <span class="battle-era-badge" style="background: ${era.color}20; color: ${era.color}">${era.label}</span>
                <span class="battle-date">${battle.date}</span>
            </div>
            <h3 class="battle-name">${battle.name}</h3>
            <p class="battle-location">${battle.location}</p>
            <p class="battle-summary">${battle.summary.substring(0, 180)}...</p>
            <div class="battle-combatants-mini">
                <div class="cb-side">
                    <span class="cb-label">Led by</span>
                    <span class="cb-name">${battle.combatants.side1.leader}</span>
                </div>
                <span class="cb-vs">vs</span>
                <div class="cb-side">
                    <span class="cb-label">Led by</span>
                    <span class="cb-name">${battle.combatants.side2.leader}</span>
                </div>
            </div>
            <button class="battle-expand-btn" data-index="${index}" aria-expanded="false">
                <span>Full Battle Details</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"></polyline></svg>
            </button>
        </div>
    `;
}

export function BattleDetail(battle) {
    const keyEventsHtml = battle.keyEvents.map(e => `<li>${e}</li>`).join('');

    return `
        <div class="battle-detail-content">
            <div class="detail-forces">
                <div class="force-card">
                    <h4 style="color: ${battle.color}">${battle.combatants.side1.name}</h4>
                    <div class="force-info">
                        <span class="fi-label">Commander</span>
                        <span class="fi-value">${battle.combatants.side1.leader}</span>
                    </div>
                    <div class="force-info">
                        <span class="fi-label">Forces</span>
                        <span class="fi-value">${battle.combatants.side1.forces}</span>
                    </div>
                </div>
                <div class="force-vs">
                    <span>VS</span>
                </div>
                <div class="force-card">
                    <h4>${battle.combatants.side2.name}</h4>
                    <div class="force-info">
                        <span class="fi-label">Commander</span>
                        <span class="fi-value">${battle.combatants.side2.leader}</span>
                    </div>
                    <div class="force-info">
                        <span class="fi-label">Forces</span>
                        <span class="fi-value">${battle.combatants.side2.forces}</span>
                    </div>
                </div>
            </div>

            <div class="battle-detail-section">
                <h4>Outcome</h4>
                <p class="outcome-text">${battle.outcome}</p>
            </div>

            <div class="battle-detail-section">
                <h4>Casualties</h4>
                <div class="casualties-grid">
                    <div class="casualty-box">
                        <span class="cb-label">${battle.combatants.side1.name}</span>
                        <span class="cb-value">${battle.casualties.side1}</span>
                    </div>
                    <div class="casualty-box">
                        <span class="cb-label">${battle.combatants.side2.name}</span>
                        <span class="cb-value">${battle.casualties.side2}</span>
                    </div>
                </div>
            </div>

            <div class="battle-detail-section">
                <h4>Key Events</h4>
                <ol class="events-list">${keyEventsHtml}</ol>
            </div>

            <div class="battle-detail-section">
                <h4>Tactics & Strategy</h4>
                <p>${battle.tactics}</p>
            </div>

            <div class="battle-detail-section">
                <h4>Historical Impact</h4>
                <p>${battle.impact}</p>
            </div>

            <div class="battle-significance">
                <h4>Why It Matters</h4>
                <p>${battle.significance}</p>
            </div>
        </div>
    `;
}
