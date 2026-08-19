export function BranchOverview(branches) {
    const cardsHtml = branches.map(branch => {
        const factsHtml = branch.keyFacts.map(f => `<li>${f}</li>`).join('');
        const opsHtml = branch.notableOperations.slice(0, 3).map(o => `<li>${o}</li>`).join('');

        return `
            <div class="branch-card" style="--branch-color: ${branch.color}">
                <div class="branch-card-header">
                    <div class="branch-emblem" style="background: ${branch.color}">${branch.name.split(' ').map(w => w[0]).join('')}</div>
                    <div>
                        <h3>${branch.name}</h3>
                        <p class="branch-motto">${branch.motto}</p>
                    </div>
                </div>
                <div class="branch-card-body">
                    <div class="branch-stats">
                        <div class="branch-stat">
                            <span class="stat-value">${branch.strength.split(' ')[0]}</span>
                            <span class="stat-desc">Personnel</span>
                        </div>
                        <div class="branch-stat">
                            <span class="stat-value">${branch.founded.split(' ').pop()}</span>
                            <span class="stat-desc">Established</span>
                        </div>
                    </div>
                    <p class="branch-overview">${branch.overview}</p>
                    <div class="branch-section">
                        <h4>Key Facts</h4>
                        <ul>${factsHtml}</ul>
                    </div>
                    <div class="branch-section">
                        <h4>Notable Operations</h4>
                        <ul>${opsHtml}</ul>
                    </div>
                    <div class="branch-chief">
                        <span class="chief-label">Chief</span>
                        <span class="chief-name">${branch.chief}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="branch-overview-grid">
            ${cardsHtml}
        </div>
    `;
}
