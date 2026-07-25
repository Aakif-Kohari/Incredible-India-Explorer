export function PMCard(pm) {
    const achievementsHtml = pm.achievements.map(a => `<li>${a}</li>`).join('');
    const eventsHtml = pm.events.map(e => `<li>${e}</li>`).join('');
    const factsHtml = pm.facts.map(f => `<p>💡 ${f}</p>`).join('');

    return `
        <div class="pm-card">
            <div class="pm-card-header">
                <div class="pm-portrait">
                    <img src="${pm.portrait}" alt="Portrait of ${pm.name}" loading="lazy" />
                </div>
                <div class="pm-title">
                    <h3>${pm.name}</h3>
                    <p class="pm-party">${pm.party}</p>
                    <p class="pm-term">🗓️ ${pm.start} – ${pm.end}</p>
                </div>
            </div>
            <div class="pm-card-body">
                <div class="pm-section">
                    <h4>Major Reforms & Achievements</h4>
                    <ul>${achievementsHtml}</ul>
                </div>
                <div class="pm-section">
                    <h4>Major Events</h4>
                    <ul>${eventsHtml}</ul>
                </div>
                <div class="pm-section pm-facts">
                    <h4>Interesting Facts</h4>
                    ${factsHtml}
                </div>
            </div>
        </div>
    `;
}
