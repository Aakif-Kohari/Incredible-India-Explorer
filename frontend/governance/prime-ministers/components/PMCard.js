import { getPartyBadgeClass } from '../data.js';

export function PMCard(pm, index) {
    const isEven = index % 2 === 0;
    const sideClass = isEven ? 'left' : 'right';
    const partyBadgeClass = getPartyBadgeClass(pm.partyCategory);

    const keyAchievements = pm.achievements.slice(0, 2).map(a => `<li>${a}</li>`).join('');
    const keyEvents = pm.events.slice(0, 2).map(e => `<li>${e}</li>`).join('');
    const keyFact = pm.facts[0] ? `<div class="pm-card-fact">💡 <span>${pm.facts[0]}</span></div>` : '';

    return `
        <div class="timeline-item ${sideClass}" data-pm-id="${pm.id}">
            <div class="timeline-dot" aria-hidden="true"></div>
            <div class="timeline-content">
                <div class="pm-card-header">
                    <div class="pm-portrait-container">
                        <img 
                            src="${pm.portrait}" 
                            alt="Portrait of ${pm.name}" 
                            class="pm-portrait-img" 
                            loading="lazy" 
                            onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%232a3447\\'/><text x=\\'50%\\' y=\\'55%\\' fill=\\'%23e2e8f0\\' font-size=\\'36\\' font-family=\\'sans-serif\\' text-anchor=\\'middle\\'>🏛️</text></svg>';"
                        />
                        <span class="pm-number-badge">#${pm.number}</span>
                    </div>
                    <div class="pm-title-block">
                        <h3 class="pm-name">${pm.name}</h3>
                        <div class="pm-badge-group">
                            <span class="party-badge ${partyBadgeClass}">${pm.party}</span>
                        </div>
                        <p class="pm-term">
                            <svg class="icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <span>${pm.start} – ${pm.end}</span>
                            <span class="pm-duration">(${pm.termDuration})</span>
                        </p>
                    </div>
                </div>

                <div class="pm-card-body">
                    <div class="pm-section">
                        <h4><span class="section-icon">🚀</span> Major Reforms & Achievements</h4>
                        <ul class="pm-list">${keyAchievements}</ul>
                    </div>
                    <div class="pm-section">
                        <h4><span class="section-icon">📜</span> Key Historical Events</h4>
                        <ul class="pm-list">${keyEvents}</ul>
                    </div>
                    ${keyFact}
                </div>

                <div class="pm-card-footer">
                    <button class="btn-view-details" data-action="open-modal" data-pm-id="${pm.id}">
                        <span>Explore Full Profile</span>
                        <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}
