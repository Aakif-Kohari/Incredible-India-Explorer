export function CommandGrid(commands, filter) {
    const filtered = filter === 'All' ? commands : commands.filter(c => c.service === filter);

    if (filtered.length === 0) {
        return `<div class="no-results">No commands found for this service.</div>`;
    }

    const cardsHtml = filtered.map(cmd => `
        <div class="command-card" data-service="${cmd.service}">
            <div class="command-service-badge" data-service="${cmd.service}">${cmd.service}</div>
            <h4 class="command-name">${cmd.name}</h4>
            <div class="command-meta">
                <span class="command-hq">HQ: ${cmd.hq}</span>
                <span class="command-type">${cmd.type}</span>
            </div>
            <p class="command-responsibility">${cmd.responsibility}</p>
        </div>
    `).join('');

    return `
        <div class="command-grid">
            ${cardsHtml}
        </div>
    `;
}
