export function MissionCard(mission, index) {
    const statusClass = mission.status.toLowerCase().includes('success') ? 'success' :
                        mission.status.toLowerCase().includes('partial') ? 'partial' :
                        mission.status.toLowerCase().includes('planned') ? 'planned' :
                        mission.status.toLowerCase().includes('operational') ? 'operational' : 'active';

    return `
        <div class="isro-mission-card" data-index="${index}">
            <div class="mission-card-header">
                <span class="mission-status-badge ${statusClass}">${mission.status}</span>
                <span class="mission-type-badge">${mission.type}</span>
            </div>
            <h3 class="mission-name">${mission.name}</h3>
            <p class="mission-overview">${mission.overview.substring(0, 150)}...</p>
            <div class="mission-quick-facts">
                <div class="quick-fact">
                    <span class="fact-label">Launch</span>
                    <span class="fact-value">${mission.launchDate.split(' ').slice(-2).join(' ')}</span>
                </div>
                <div class="quick-fact">
                    <span class="fact-label">Vehicle</span>
                    <span class="fact-value">${mission.launchVehicle}</span>
                </div>
                <div class="quick-fact">
                    <span class="fact-label">Cost</span>
                    <span class="fact-value">${mission.cost}</span>
                </div>
            </div>
            <button class="mission-expand-btn" data-index="${index}" aria-expanded="false">
                <span>Explore Mission</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"></polyline></svg>
            </button>
        </div>
    `;
}

export function MissionDetail(mission) {
    const objectivesHtml = mission.objectives.map(o => `<li>${o}</li>`).join('');
    const milestonesHtml = mission.keyMilestones.map(m => `<li>${m}</li>`).join('');
    const achievementsHtml = mission.achievements.length > 0
        ? mission.achievements.map(a => `<li>${a}</li>`).join('')
        : '<li>To be updated after mission completion.</li>';
    const factsHtml = mission.facts.map(f => `<p class="mission-fact">${f}</p>`).join('');

    return `
        <div class="mission-detail-content">
            <div class="mission-detail-grid">
                <div class="detail-stat">
                    <span class="detail-stat-label">Launch Date</span>
                    <span class="detail-stat-value">${mission.launchDate}</span>
                </div>
                <div class="detail-stat">
                    <span class="detail-stat-label">Launch Vehicle</span>
                    <span class="detail-stat-value">${mission.launchVehicle}</span>
                </div>
                <div class="detail-stat">
                    <span class="detail-stat-label">Mass</span>
                    <span class="detail-stat-value">${mission.mass}</span>
                </div>
                <div class="detail-stat">
                    <span class="detail-stat-label">Cost</span>
                    <span class="detail-stat-value">${mission.cost}</span>
                </div>
            </div>
            <div class="mission-detail-section">
                <h4>Objectives</h4>
                <ul>${objectivesHtml}</ul>
            </div>
            <div class="mission-detail-section">
                <h4>Key Milestones</h4>
                <ol class="milestones-list">${milestonesHtml}</ol>
            </div>
            <div class="mission-detail-section">
                <h4>Achievements</h4>
                <ul class="achievements-list">${achievementsHtml}</ul>
            </div>
            <div class="mission-detail-section">
                <h4>Payload & Instruments</h4>
                <p>${mission.payload}</p>
            </div>
            <div class="mission-detail-section">
                <h4>Interesting Facts</h4>
                <div class="facts-container">${factsHtml}</div>
            </div>
        </div>
    `;
}
