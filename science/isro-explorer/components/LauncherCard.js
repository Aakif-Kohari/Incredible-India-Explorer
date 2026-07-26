export function LauncherCard(launcher) {
    const variantsHtml = launcher.variants.map(v => `
        <div class="launcher-variant">
            <strong>${v.name}</strong> — ${v.payload}
            <p>${v.desc}</p>
        </div>
    `).join('');

    const missionsHtml = launcher.notableMissions.map(m => `<li>${m}</li>`).join('');
    const achievementsHtml = launcher.achievements.map(a => `<li>${a}</li>`).join('');

    return `
        <div class="launcher-card" style="--launcher-color: ${launcher.color}">
            <div class="launcher-card-header" style="background: ${launcher.color}">
                <div class="launcher-icon">${launcher.name[0]}</div>
                <div>
                    <h3>${launcher.fullName}</h3>
                    <p class="launcher-type">${launcher.type}</p>
                </div>
            </div>
            <div class="launcher-card-body">
                <div class="launcher-stats-grid">
                    <div class="launcher-stat">
                        <span class="ls-label">Height</span>
                        <span class="ls-value">${launcher.height}</span>
                    </div>
                    <div class="launcher-stat">
                        <span class="ls-label">Mass</span>
                        <span class="ls-value">${launcher.mass}</span>
                    </div>
                    <div class="launcher-stat">
                        <span class="ls-label">Total Launches</span>
                        <span class="ls-value">${launcher.totalLaunches}</span>
                    </div>
                    <div class="launcher-stat">
                        <span class="ls-label">Success Rate</span>
                        <span class="ls-value">${launcher.successRate}</span>
                    </div>
                    <div class="launcher-stat">
                        <span class="ls-label">First Flight</span>
                        <span class="ls-value">${launcher.firstFlight}</span>
                    </div>
                    <div class="launcher-stat">
                        <span class="ls-label">Stages</span>
                        <span class="ls-value">${launcher.stages}</span>
                    </div>
                </div>
                <p class="launcher-description">${launcher.description}</p>
                <div class="launcher-section">
                    <h4>Variants</h4>
                    <div class="launcher-variants">${variantsHtml}</div>
                </div>
                <div class="launcher-section">
                    <h4>Notable Missions</h4>
                    <ul>${missionsHtml}</ul>
                </div>
                <div class="launcher-section">
                    <h4>Achievements</h4>
                    <ul>${achievementsHtml}</ul>
                </div>
            </div>
        </div>
    `;
}
