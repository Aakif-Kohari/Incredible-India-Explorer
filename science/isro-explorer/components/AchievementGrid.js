export function AchievementGrid(achievements) {
    const cardsHtml = achievements.map(a => `
        <div class="achievement-card">
            <div class="achievement-badge">${a.category}</div>
            <h4>${a.title}</h4>
            <p>${a.description}</p>
            <span class="achievement-year">${a.year}</span>
        </div>
    `).join('');

    return `
        <div class="achievement-grid">
            ${cardsHtml}
        </div>
    `;
}
