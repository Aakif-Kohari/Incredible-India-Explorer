import { getPartyBadgeClass } from '../data.js';

export function PMModal(pm) {
    if (!pm) return '';

    const partyBadgeClass = getPartyBadgeClass(pm.partyCategory);
    const achievementsHtml = pm.achievements.map(a => `<li><span class="bullet">✦</span> <span>${a}</span></li>`).join('');
    const eventsHtml = pm.events.map(e => `<li><span class="bullet">📍</span> <span>${e}</span></li>`).join('');
    const factsHtml = pm.facts.map(f => `<div class="modal-fact-item">💡 <span>${f}</span></div>`).join('');
    const quoteHtml = pm.quote ? `
        <div class="modal-quote-box">
            <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <blockquote class="modal-quote">${pm.quote}</blockquote>
        </div>
    ` : '';

    return `
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-pm-name">
            <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">&times;</button>

            <div class="modal-header">
                <div class="modal-portrait-wrapper">
                    <img 
                        src="${pm.portrait}" 
                        alt="Portrait of ${pm.name}" 
                        class="modal-portrait-img"
                        onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'120\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%232a3447\\'/><text x=\\'50%\\' y=\\'55%\\' fill=\\'%23e2e8f0\\' font-size=\\'36\\' font-family=\\'sans-serif\\' text-anchor=\\'middle\\'>🏛️</text></svg>';"
                    />
                </div>
                <div class="modal-header-info">
                    <div class="modal-term-badge">Term #${pm.number}</div>
                    <h2 id="modal-pm-name" class="modal-pm-name">${pm.name}</h2>
                    <div class="modal-tags">
                        <span class="party-badge ${partyBadgeClass}">${pm.party}</span>
                        <span class="term-duration-chip">🗓️ ${pm.start} – ${pm.end} (${pm.termDuration})</span>
                    </div>
                </div>
            </div>

            <div class="modal-body">
                ${quoteHtml}

                <div class="modal-section">
                    <h3><span class="modal-section-icon">📖</span> Biography & Overview</h3>
                    <p class="modal-bio">${pm.bio}</p>
                </div>

                <div class="modal-grid">
                    <div class="modal-section">
                        <h3><span class="modal-section-icon">🏆</span> Major Reforms & Landmark Achievements</h3>
                        <ul class="modal-list">${achievementsHtml}</ul>
                    </div>

                    <div class="modal-section">
                        <h3><span class="modal-section-icon">🌍</span> Significant Historical Events</h3>
                        <ul class="modal-list">${eventsHtml}</ul>
                    </div>
                </div>

                <div class="modal-section modal-facts-section">
                    <h3><span class="modal-section-icon">💡</span> Fascinating Historical Trivia</h3>
                    <div class="modal-facts-grid">${factsHtml}</div>
                </div>
            </div>
        </div>
    `;
}
